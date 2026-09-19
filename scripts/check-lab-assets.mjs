import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const errors = [];

const expectedCaptures = new Map([
  ['labs/packs/ethernet-arp/captures/arp-icmp.pcap', 4],
  ['labs/packs/services/captures/dns-a.pcap', 2],
  ['labs/packs/capstone/captures/tcp-handshake.pcap', 3]
]);

function parsePcap(file) {
  const data = readFileSync(resolve(root, file));
  if (data.length < 24) throw new Error('header is shorter than 24 bytes');

  const magic = data.readUInt32LE(0);
  if (magic !== 0xa1b2c3d4) throw new Error('expected little-endian microsecond PCAP magic');
  if (data.readUInt16LE(4) !== 2 || data.readUInt16LE(6) !== 4) {
    throw new Error('expected PCAP version 2.4');
  }
  if (data.readUInt32LE(20) !== 1) throw new Error('expected Ethernet link type');

  let offset = 24;
  let packets = 0;
  while (offset < data.length) {
    if (offset + 16 > data.length) throw new Error(`truncated packet header at byte ${offset}`);
    const included = data.readUInt32LE(offset + 8);
    const original = data.readUInt32LE(offset + 12);
    if (included === 0 || included > original) throw new Error(`invalid packet lengths at packet ${packets + 1}`);
    offset += 16;
    if (offset + included > data.length) throw new Error(`truncated packet data at packet ${packets + 1}`);
    offset += included;
    packets += 1;
  }
  return packets;
}

for (const [file, expected] of expectedCaptures) {
  try {
    const actual = parsePcap(file);
    if (actual !== expected) errors.push(`${file}: expected ${expected} packets, found ${actual}`);
  } catch (error) {
    errors.push(`${file}: ${error.message}`);
  }
}

const forwardZone = readFileSync(resolve(root, 'labs/packs/services/db.lab.example'), 'utf8');
const reverseZone = readFileSync(resolve(root, 'labs/packs/services/db.10.40.20'), 'utf8');
for (const required of [
  'ns1 IN A 10.40.20.10',
  'app IN A 10.40.20.80',
  'app IN AAAA 2001:db8:40:20::80',
  'www IN CNAME app.lab.example.',
  '@ IN MX 10 mail.lab.example.',
  'mail IN A 10.40.20.25'
]) {
  if (!forwardZone.includes(required)) errors.push(`Forward zone is missing: ${required}`);
}
for (const required of [
  '10 IN PTR ns1.lab.example.',
  '25 IN PTR mail.lab.example.',
  '80 IN PTR app.lab.example.'
]) {
  if (!reverseZone.includes(required)) errors.push(`Reverse zone is missing: ${required}`);
}

const dhcp = readFileSync(resolve(root, 'labs/packs/services/dhcpd-sample.conf'), 'utf8');
for (const required of [
  'subnet 10.40.10.0 netmask 255.255.255.0',
  'range 10.40.10.100 10.40.10.199;',
  'option routers 10.40.10.1;',
  'option domain-name-servers 10.40.20.10;',
  'fixed-address 10.40.10.50;'
]) {
  if (!dhcp.includes(required)) errors.push(`DHCP sample is missing: ${required}`);
}

const solutionFiles = [
  'labs/packs/vlan-routing/r1-solution.cfg',
  'labs/packs/vlan-routing/sw1-solution.cfg',
  'labs/packs/vlan-routing/sw2-solution.cfg',
  'labs/packs/ospf-nat/solution.cfg'
];
for (const file of solutionFiles) {
  const text = readFileSync(resolve(root, file), 'utf8');
  if (/TODO|CHANGEME|PLACEHOLDER/i.test(text)) errors.push(`${file}: unfinished marker in solution`);
  if (/password\s+\S+|secret\s+\S+/i.test(text)) errors.push(`${file}: credential-like value must not be stored`);
}

const starterFiles = [
  'labs/packs/vlan-routing/r1-starter.cfg',
  'labs/packs/vlan-routing/sw1-starter.cfg',
  'labs/packs/vlan-routing/sw2-starter.cfg',
  'labs/packs/ospf-nat/starter.cfg'
];
for (const file of starterFiles) {
  const text = readFileSync(resolve(root, file), 'utf8');
  if (!text.includes('TODO')) errors.push(`${file}: starter file has no learner task`);
}

if (errors.length) {
  console.error(`Lab-asset checks failed (${errors.length}):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Lab-asset checks passed: 3 parseable Ethernet PCAPs, forward/reverse DNS examples, DHCP sample, and 8 starter/solution configurations.');
