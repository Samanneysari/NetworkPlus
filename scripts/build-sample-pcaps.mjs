import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');

function checksum(buffer) {
  let sum = 0;
  for (let offset = 0; offset < buffer.length; offset += 2) {
    sum += (buffer[offset] << 8) | (buffer[offset + 1] ?? 0);
    sum = (sum & 0xffff) + (sum >>> 16);
  }
  while (sum >>> 16) sum = (sum & 0xffff) + (sum >>> 16);
  return (~sum) & 0xffff;
}

const mac = (value) => Buffer.from(value.split(':').map((part) => Number.parseInt(part, 16)));
const ip = (value) => Buffer.from(value.split('.').map(Number));

function ethernet(destination, source, etherType, payload) {
  const header = Buffer.alloc(14);
  mac(destination).copy(header, 0);
  mac(source).copy(header, 6);
  header.writeUInt16BE(etherType, 12);
  return Buffer.concat([header, payload]);
}

function ipv4(source, destination, protocol, payload, id) {
  const header = Buffer.alloc(20);
  header[0] = 0x45;
  header.writeUInt16BE(header.length + payload.length, 2);
  header.writeUInt16BE(id, 4);
  header[8] = 64;
  header[9] = protocol;
  ip(source).copy(header, 12);
  ip(destination).copy(header, 16);
  header.writeUInt16BE(checksum(header), 10);
  return Buffer.concat([header, payload]);
}

function arp(operation, senderMac, senderIp, targetMac, targetIp) {
  const packet = Buffer.alloc(28);
  packet.writeUInt16BE(1, 0);
  packet.writeUInt16BE(0x0800, 2);
  packet[4] = 6;
  packet[5] = 4;
  packet.writeUInt16BE(operation, 6);
  mac(senderMac).copy(packet, 8);
  ip(senderIp).copy(packet, 14);
  mac(targetMac).copy(packet, 18);
  ip(targetIp).copy(packet, 24);
  return packet;
}

function icmpEcho(type) {
  const packet = Buffer.alloc(16);
  packet[0] = type;
  packet.writeUInt16BE(1, 4);
  packet.writeUInt16BE(1, 6);
  Buffer.from('NPLUSLAB').copy(packet, 8);
  packet.writeUInt16BE(checksum(packet), 2);
  return packet;
}

function udp(sourcePort, destinationPort, payload) {
  const packet = Buffer.alloc(8 + payload.length);
  packet.writeUInt16BE(sourcePort, 0);
  packet.writeUInt16BE(destinationPort, 2);
  packet.writeUInt16BE(packet.length, 4);
  payload.copy(packet, 8);
  return packet;
}

function tcp(sourceIp, destinationIp, sourcePort, destinationPort, sequence, acknowledgment, flags) {
  const packet = Buffer.alloc(20);
  packet.writeUInt16BE(sourcePort, 0);
  packet.writeUInt16BE(destinationPort, 2);
  packet.writeUInt32BE(sequence, 4);
  packet.writeUInt32BE(acknowledgment, 8);
  packet[12] = 0x50;
  packet[13] = flags;
  packet.writeUInt16BE(64240, 14);
  const pseudo = Buffer.alloc(12);
  ip(sourceIp).copy(pseudo, 0);
  ip(destinationIp).copy(pseudo, 4);
  pseudo[9] = 6;
  pseudo.writeUInt16BE(packet.length, 10);
  packet.writeUInt16BE(checksum(Buffer.concat([pseudo, packet])), 16);
  return packet;
}

function dnsName(name) {
  return Buffer.concat([
    ...name.split('.').map((label) => Buffer.concat([Buffer.from([label.length]), Buffer.from(label)])),
    Buffer.from([0])
  ]);
}

function dnsQuery() {
  const header = Buffer.alloc(12);
  header.writeUInt16BE(0x1234, 0);
  header.writeUInt16BE(0x0100, 2);
  header.writeUInt16BE(1, 4);
  const typeClass = Buffer.alloc(4);
  typeClass.writeUInt16BE(1, 0);
  typeClass.writeUInt16BE(1, 2);
  return Buffer.concat([header, dnsName('app.lab.example'), typeClass]);
}

function dnsResponse(query) {
  const header = Buffer.from(query.subarray(0, 12));
  header.writeUInt16BE(0x8180, 2);
  header.writeUInt16BE(1, 6);
  const answer = Buffer.alloc(16);
  answer.writeUInt16BE(0xc00c, 0);
  answer.writeUInt16BE(1, 2);
  answer.writeUInt16BE(1, 4);
  answer.writeUInt32BE(60, 6);
  answer.writeUInt16BE(4, 10);
  ip('192.0.2.80').copy(answer, 12);
  return Buffer.concat([header, query.subarray(12), answer]);
}

function pcap(packets) {
  const global = Buffer.alloc(24);
  global.writeUInt32LE(0xa1b2c3d4, 0);
  global.writeUInt16LE(2, 4);
  global.writeUInt16LE(4, 6);
  global.writeUInt32LE(65535, 16);
  global.writeUInt32LE(1, 20);
  const records = packets.map((packet, index) => {
    const record = Buffer.alloc(16);
    record.writeUInt32LE(1_700_000_000 + index, 0);
    record.writeUInt32LE(index * 1000, 4);
    record.writeUInt32LE(packet.length, 8);
    record.writeUInt32LE(packet.length, 12);
    return Buffer.concat([record, packet]);
  });
  return Buffer.concat([global, ...records]);
}

function save(relativePath, packets) {
  const output = join(root, relativePath);
  mkdirSync(dirname(output), { recursive: true });
  writeFileSync(output, pcap(packets));
  console.log(`${relativePath}: ${packets.length} packets`);
}

const hostMac = '00:11:22:33:44:55';
const gatewayMac = '00:66:55:44:33:22';
save('labs/packs/ethernet-arp/captures/arp-icmp.pcap', [
  ethernet('ff:ff:ff:ff:ff:ff', hostMac, 0x0806,
    arp(1, hostMac, '192.0.2.10', '00:00:00:00:00:00', '192.0.2.1')),
  ethernet(hostMac, gatewayMac, 0x0806,
    arp(2, gatewayMac, '192.0.2.1', hostMac, '192.0.2.10')),
  ethernet(gatewayMac, hostMac, 0x0800,
    ipv4('192.0.2.10', '192.0.2.1', 1, icmpEcho(8), 10)),
  ethernet(hostMac, gatewayMac, 0x0800,
    ipv4('192.0.2.1', '192.0.2.10', 1, icmpEcho(0), 11))
]);

const query = dnsQuery();
save('labs/packs/services/captures/dns-a.pcap', [
  ethernet(gatewayMac, hostMac, 0x0800,
    ipv4('192.0.2.10', '192.0.2.53', 17, udp(53000, 53, query), 20)),
  ethernet(hostMac, gatewayMac, 0x0800,
    ipv4('192.0.2.53', '192.0.2.10', 17, udp(53, 53000, dnsResponse(query)), 21))
]);

save('labs/packs/capstone/captures/tcp-handshake.pcap', [
  ethernet(gatewayMac, hostMac, 0x0800,
    ipv4('192.0.2.10', '198.51.100.20', 6,
      tcp('192.0.2.10', '198.51.100.20', 51514, 443, 1000, 0, 0x02), 30)),
  ethernet(hostMac, gatewayMac, 0x0800,
    ipv4('198.51.100.20', '192.0.2.10', 6,
      tcp('198.51.100.20', '192.0.2.10', 443, 51514, 5000, 1001, 0x12), 31)),
  ethernet(gatewayMac, hostMac, 0x0800,
    ipv4('192.0.2.10', '198.51.100.20', 6,
      tcp('192.0.2.10', '198.51.100.20', 51514, 443, 1001, 5001, 0x10), 32))
]);
