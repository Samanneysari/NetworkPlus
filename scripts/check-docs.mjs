import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, extname, join, normalize, relative, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const errors = [];

function walk(directory) {
  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry);
    if (path === join(root, '.git')) return [];
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

const markdownFiles = walk(root)
  .filter((path) => extname(path) === '.md');

const required = [
  'README.md', 'COURSE.md', 'OBJECTIVES.md', 'SUMMARY.md', 'GLOSSARY.md',
  'REFERENCES.md', 'docs/00-network-from-zero.md', 'docs/01-osi-tcp-ip-tls.md',
  'REVIEW.md', 'docs/objective-workbook.md', 'docs/07-ccna-readiness-bridge.md',
  'docs/foundations/README.md',
  'docs/foundations/01-computers-and-operating-systems.md',
  'docs/foundations/02-network-models-and-scopes.md',
  'docs/foundations/03-ethernet-switching-and-mac.md',
  'docs/foundations/04-ipv4-routing-and-arp.md',
  'docs/foundations/05-transport-nat-and-diagnostics.md',
  'docs/02-networking-concepts.md', 'docs/03-network-implementation.md',
  'docs/04-network-operations.md', 'docs/05-network-security.md',
  'docs/06-network-troubleshooting.md', 'labs/README.md',
  'practice/questions.md', 'practice/answers.md', 'practice/subnetting.md',
  'practice/subnetting-answers.md', 'appendices/ports-protocols.md',
  'appendices/commands-tools.md', 'appendices/acronyms.md',
  'appendices/tools-lab-checklist.md',
  'objectives/n10-009-v6-detailed-map.md',
  'practice/exams/README.md', 'practice/exams/form-a.md',
  'practice/exams/form-a-answers.md', 'practice/exams/form-b.md',
  'practice/exams/form-b-answers.md', 'practice/exams/form-c.md',
  'practice/exams/form-c-answers.md', 'practice/exams/form-d.md',
  'practice/exams/form-d-answers.md', 'practice/pbq/README.md',
  'practice/pbq/solutions.md', 'practice/command-output/README.md',
  'practice/command-output/answers.md', 'labs/packs/README.md',
  'labs/packs/ethernet-arp/README.md', 'labs/packs/vlan-routing/README.md',
  'labs/packs/ospf-nat/README.md', 'labs/packs/services/README.md',
  'labs/packs/wireless-monitoring/README.md', 'labs/packs/capstone/README.md',
  'interview/README.md', 'interview/technical-questions.md',
  'interview/ticket-scenarios.md', 'interview/behavioral.md',
  'career/README.md', 'career/01-windows-ad.md', 'career/02-linux-networking.md',
  'career/03-firewalls-and-vpn.md', 'career/04-cloud-networking.md',
  'career/05-network-automation.md'
];

for (const file of required) {
  if (!existsSync(join(root, file))) errors.push(`Missing required file: ${file}`);
}

for (const path of markdownFiles) {
  const file = relative(root, path);
  const text = readFileSync(path, 'utf8');
  if (!text.endsWith('\n')) errors.push(`${file}: missing final newline`);
  if ((text.match(/```/g) ?? []).length % 2 !== 0) errors.push(`${file}: unbalanced code fences`);
  if (/[\u0600-\u06ff]/u.test(text)) errors.push(`${file}: contains Persian/Arabic-script characters`);
  if (/<div\s+dir=["']rtl["']/i.test(text)) errors.push(`${file}: contains an RTL wrapper`);

  const links = [...text.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)].map((match) => match[1]);
  for (const target of links) {
    if (/^(https?:|mailto:|#)/.test(target)) continue;
    const pathOnly = target.split('#')[0];
    if (!pathOnly) continue;
    const local = normalize(resolve(dirname(path), pathOnly));
    if (!local.startsWith(root) || !existsSync(local)) {
      errors.push(`${file}: broken local link ${target}`);
    }
  }
}

const objectives = readFileSync(join(root, 'OBJECTIVES.md'), 'utf8');
const expectedObjectives = [
  '1.1','1.2','1.3','1.4','1.5','1.6','1.7','1.8',
  '2.1','2.2','2.3','2.4','3.1','3.2','3.3','3.4','3.5',
  '4.1','4.2','4.3','5.1','5.2','5.3','5.4','5.5'
];
for (const code of expectedObjectives) {
  const count = (objectives.match(new RegExp(`\\| ${code.replace('.', '\\.')} \\|`, 'g')) ?? []).length;
  if (count !== 1) errors.push(`OBJECTIVES.md: objective ${code} appears ${count} times`);
}

const detailedObjectives = readFileSync(join(root, 'objectives/n10-009-v6-detailed-map.md'), 'utf8');
for (const code of expectedObjectives) {
  const count = (detailedObjectives.match(new RegExp(`^### ${code.replace('.', '\\.')} `, 'gm')) ?? []).length;
  if (count !== 1) errors.push(`Detailed v6.0 map: objective ${code} appears ${count} times`);
}

const objectiveWorkbook = readFileSync(join(root, 'docs/objective-workbook.md'), 'utf8');
for (const [index, code] of expectedObjectives.entries()) {
  const heading = new RegExp(`^## ${code.replace('.', '\\.')} `, 'gm');
  const count = (objectiveWorkbook.match(heading) ?? []).length;
  if (count !== 1) errors.push(`Objective workbook: objective ${code} appears ${count} times`);

  const start = objectiveWorkbook.search(heading);
  if (start < 0) continue;
  const nextCode = expectedObjectives[index + 1];
  const next = nextCode
    ? objectiveWorkbook.slice(start + 1).search(new RegExp(`^## ${nextCode.replace('.', '\\.')} `, 'm'))
    : objectiveWorkbook.slice(start + 1).search(/^## Workbook completion test/m);
  const end = next < 0 ? objectiveWorkbook.length : start + 1 + next;
  const section = objectiveWorkbook.slice(start, end);

  for (const example of [1, 2, 3]) {
    if (!new RegExp(`^### Worked example ${example} `, 'm').test(section)) {
      errors.push(`Objective workbook ${code}: missing Worked example ${example}`);
    }
  }
  if ((section.match(/^### Worked example /gm) ?? []).length !== 3) {
    errors.push(`Objective workbook ${code}: expected exactly three worked examples`);
  }
  if (!section.includes('**Purpose:**')) errors.push(`Objective workbook ${code}: missing purpose`);
  if (!section.includes('**Check:**') || !section.includes('**Answer:**')) {
    errors.push(`Objective workbook ${code}: missing explained check`);
  }
}

const ccnaBridge = readFileSync(join(root, 'docs/07-ccna-readiness-bridge.md'), 'utf8');
for (let number = 1; number <= 12; number += 1) {
  if (!new RegExp(`^## ${number}\\. `, 'm').test(ccnaBridge)) {
    errors.push(`CCNA bridge: missing numbered section ${number}`);
  }
}

const ciscoBlocks = [...ccnaBridge.matchAll(/```cisco\n([\s\S]*?)\n```/g)];
if (ciscoBlocks.length < 8) errors.push(`CCNA bridge: expected at least 8 Cisco worked examples`);
for (const block of ciscoBlocks) {
  const after = ccnaBridge.slice(block.index + block[0].length, block.index + block[0].length + 1800);
  if (!/\| Line \| Exact purpose \|/.test(after)) {
    const firstLine = block[1].split('\n')[0];
    errors.push(`CCNA bridge: Cisco block beginning "${firstLine}" lacks a nearby explanation table`);
  }
  const commandLines = block[1].split('\n').filter((line) => line.trim() && !line.trim().startsWith('!')).length;
  const tableRows = (after.match(/^\|[^\n]+\|[^\n]+\|$/gm) ?? []).length - 2;
  if (tableRows < Math.ceil(commandLines / 2)) {
    const firstLine = block[1].split('\n')[0];
    errors.push(`CCNA bridge: explanation table is too shallow for block beginning "${firstLine}"`);
  }
}

const corpus = markdownFiles.map((path) => readFileSync(path, 'utf8')).join('\n').toLowerCase();
const requiredTerms = [
  'osi', 'router', 'layer 2 switch', 'layer 3 switch', 'firewall', 'ids', 'ips',
  'load balancer', 'forward proxy', 'reverse proxy', 'nas', 'san', 'access point',
  'wireless controller', 'cdn', 'vpn', 'qos', 'ttl', 'nfv', 'vpc', 'security group',
  'network acl', 'internet gateway', 'nat gateway', 'multitenancy', 'saas', 'paas', 'iaas',
  'ftp', 'sftp', 'ssh', 'telnet', 'smtp', 'dns', 'dhcp', 'tftp', 'http', 'https',
  'ntp', 'snmp', 'ldap', 'smb', 'syslog', 'sql server', 'rdp', 'sip', 'icmp',
  'gre', 'ipsec ah', 'ipsec esp', 'ike', 'unicast', 'multicast', 'anycast', 'broadcast',
  'single-mode fiber', 'multimode fiber', 'twinax', 'coaxial', 'plenum', 'transceiver',
  'spine-leaf', 'hub-and-spoke', 'three-tier', 'collapsed core', 'north-south', 'east-west',
  'rfc 1918', 'apipa', 'vlsm', 'cidr', 'sdn', 'sd-wan', 'vxlan', 'zero trust', 'sase',
  'sse', 'infrastructure as code', 'dual stack', 'nat64', 'bgp', 'eigrp', 'ospf', 'pat',
  'fhrp', 'virtual ip', 'subinterface', '802.1q', 'spanning tree', 'lacp', 'jumbo frame',
  'wpa2', 'wpa3', 'captive portal', 'autonomous ap', 'lightweight ap', 'mdf', 'idf',
  'ups', 'pdu', 'poe', 'change management', 'golden configuration', 'snmpv3', 'flow data',
  'port mirroring', 'siem', 'rpo', 'rto', 'mttr', 'mtbf', 'cold', 'warm', 'hot',
  'slaac', 'dnssec', 'doh', 'dot', 'ptr', 'reverse dns', 'forward-confirmed reverse dns', 'ptp', 'nts',
  'jump host', 'out-of-band', 'confidentiality', 'integrity', 'availability', 'pki', 'mfa',
  'sso', 'radius', 'tacacs+', 'saml', 'least privilege', 'rbac', 'geofencing', 'honeypot',
  'pci dss', 'gdpr', 'iot', 'iiot', 'scada', 'ics', 'ot', 'byod', 'ddos', 'vlan hopping',
  'mac flooding', 'arp poisoning', 'evil twin', 'on-path', 'phishing', 'malware',
  '802.1x', 'dhcp snooping', 'dynamic arp inspection', 'port security', 'screened subnet',
  'troubleshooting methodology', 'crosstalk', 'attenuation', 'crc', 'runts', 'giants',
  'err-disabled', 'poe budget', 'pool exhaustion', 'duplicate ip', 'latency', 'jitter',
  'packet loss', 'wireshark', 'tcpdump', 'nmap', 'lldp', 'cdp', 'tdr', 'otdr',
  'hypervisor', 'operating system', 'linux', 'windows', 'cisco', 'bit rate',
  'decimal', 'hexadecimal', 'peer-to-peer', 'workgroup', 'single point of failure',
  'personal area network', 'campus area network', 'metropolitan area network',
  'decapsulation', 'simplex', 'half-duplex', 'full-duplex', 'collision domain',
  'unknown unicast', 'switch flooding', 'network address', 'broadcast address',
  'subnet mask', 'arp request', 'arp reply', 'general failure',
  'destination host unreachable', 'request timed out', 'round-trip time',
  'netstat', 'ack flag'
];
for (const term of requiredTerms) {
  if (!corpus.includes(term)) errors.push(`Official coverage term is missing: ${term}`);
}

const foundationCoverage = {
  'docs/foundations/01-computers-and-operating-systems.md': [
    'operating system', 'linux', 'microsoft', 'cisco', 'hypervisor', 'virtual machine',
    'bit', 'byte', 'binary', 'decimal', 'hexadecimal', 'bit rate', 'bandwidth', 'throughput'
  ],
  'docs/foundations/02-network-models-and-scopes.md': [
    'client', 'server', 'peer-to-peer', 'workgroup', 'active directory domain',
    'single point of failure', 'personal area network', 'local area network',
    'campus area network', 'metropolitan area network', 'wide area network',
    'encapsulation', 'decapsulation', 'simplex', 'half-duplex', 'full-duplex'
  ],
  'docs/foundations/03-ethernet-switching-and-mac.md': [
    'mac address', 'hub', 'switch', 'unknown-unicast', 'flood', 'collision domain',
    'broadcast domain', 'mac address table', 'layer 3 switch'
  ],
  'docs/foundations/04-ipv4-routing-and-arp.md': [
    'ip address', 'octet', 'subnet mask', 'network portion', 'host portion',
    'network address', 'broadcast address', 'private', 'public', 'routing table',
    'default gateway', 'arp request', 'arp reply', 'complete arp'
  ],
  'docs/foundations/05-transport-nat-and-diagnostics.md': [
    'port', 'tcp', 'udp', 'ack flag', 'nat', 'pat', 'ping', 'ttl', 'tracert',
    'general failure', 'destination host unreachable', 'request timed out',
    'round-trip time', 'netstat'
  ]
};

for (const [file, terms] of Object.entries(foundationCoverage)) {
  const path = join(root, file);
  if (!existsSync(path)) continue;
  const text = readFileSync(path, 'utf8').toLowerCase();
  if (!text.includes('## foundation checks')) errors.push(`${file}: missing Foundation checks`);
  for (const term of terms) {
    if (!text.includes(term)) errors.push(`${file}: missing foundation topic ${term}`);
  }
}

function numberedEntries(file) {
  const text = readFileSync(join(root, file), 'utf8');
  return [...text.matchAll(/^(\d+)\. /gm)].map((match) => Number(match[1]));
}

for (const file of ['practice/questions.md', 'practice/answers.md']) {
  const numbers = numberedEntries(file);
  const expected = Array.from({ length: 200 }, (_, index) => index + 1);
  if (numbers.length !== expected.length || numbers.some((number, index) => number !== expected[index])) {
    errors.push(`${file}: expected one ordered entry for every number 1..200`);
  }
}

for (const file of ['practice/subnetting.md', 'practice/subnetting-answers.md']) {
  const numbers = numberedEntries(file);
  const unique = [...new Set(numbers.filter((number) => number <= 40))].sort((a, b) => a - b);
  if (unique.length !== 40 || unique.some((number, index) => number !== index + 1)) {
    errors.push(`${file}: expected entries 1..40`);
  }
}

for (const form of ['a', 'b', 'c', 'd']) {
  for (const suffix of ['', '-answers']) {
    const file = `practice/exams/form-${form}${suffix}.md`;
    const numbers = numberedEntries(file);
    const expected = Array.from({ length: 90 }, (_, index) => index + 1);
    if (numbers.length !== 90 || numbers.some((number, index) => number !== expected[index])) {
      errors.push(`${file}: expected one ordered entry for every number 1..90`);
    }
  }
}

for (const [file, pattern, expectedCount] of [
  ['practice/pbq/README.md', /^## PBQ \d{2} /gm, 12],
  ['practice/pbq/solutions.md', /^## PBQ \d{2}$/gm, 12],
  ['practice/command-output/README.md', /^## Case \d{2} /gm, 15],
  ['practice/command-output/answers.md', /^## Case \d{2}$/gm, 15]
]) {
  const text = readFileSync(join(root, file), 'utf8');
  const count = (text.match(pattern) ?? []).length;
  if (count !== expectedCount) errors.push(`${file}: expected ${expectedCount} numbered sections, found ${count}`);
}

const officialAcronyms = `A ACL AES AH AP API APIPA APU ARP AUP BCP BGP BNC BPDU BSSID BYOD CAM CDN CDP CIA CIDR CLI CNAME CPU CRC DAC DAS DCI DDoS DHCP DLP DNS DNSSEC DoH DoS DoT DR EAP EAPoL EIGRP EOL EOS ESP ESSID EULA FC FHRP FQDN FTP FTPS GDPR GRE GUI HTTP HTTPS HSRP IaaS IaC IAM iBGP ICMP ICS IDF IDS IGMP IGP IIoT IIS IKE IoT IP IPAM IPS IPsec IS-IS ISP LACP LAN LC LDAP LDAPS LLDP LTE MAC MDF MDIX MFA MIB MIMO MOU MPLS MPO MTBF MTTR MTU MX NaaS NAC NAS NAT NDA NFV NIC NS NTP NTS OOB OS OSPF OSI OT PaaS PAT PCI_DSS PDU PKI PoE PPTP PSK PSU PTP PTR QoS QSFP RADIUS RDP RFID RIP RPO RSSI RSTP RTO RTP RX SaaS SAML SAN SASE SC SCADA SCTP SDN SD-WAN SFP SFTP SIP SIEM SLA SLAAC SMB SMTP SMTPS SNMP SOA SPAN SQL SSE SSH SSID SSL SSO ST STP SVI TACACS+ TCP TFTP TKIP TLS TTL TX TXT UDP UPS URL USB UTM UTP VIP VLAN VLSM VM VNC VoIP VPC VPN VRF VRRP VTP VXLAN WAN WAF WAP WEP WLAN WPA WPS XML ZTA`
  .split(/\s+/).map((value) => value.replace('_', ' '));
const acronymGuide = readFileSync(join(root, 'appendices/acronyms.md'), 'utf8');
for (const acronym of officialAcronyms) {
  if (!acronymGuide.includes(`| ${acronym} |`)) errors.push(`Acronym guide is missing ${acronym}`);
}

for (const asset of [
  'labs/packs/ethernet-arp/captures/arp-icmp.pcap',
  'labs/packs/services/captures/dns-a.pcap',
  'labs/packs/capstone/captures/tcp-handshake.pcap',
  'labs/packs/vlan-routing/sw1-starter.cfg',
  'labs/packs/vlan-routing/sw1-solution.cfg',
  'labs/packs/ospf-nat/starter.cfg',
  'labs/packs/ospf-nat/solution.cfg',
  'labs/packs/services/dhcpd-sample.conf',
  'labs/packs/wireless-monitoring/survey-template.csv'
]) {
  const path = join(root, asset);
  if (!existsSync(path) || statSync(path).size === 0) errors.push(`Missing or empty lab-pack asset: ${asset}`);
}

const labs = readFileSync(join(root, 'labs/README.md'), 'utf8');
for (let number = 1; number <= 26; number += 1) {
  const id = String(number).padStart(2, '0');
  if (!labs.includes(`## Lab ${id} `)) errors.push(`labs/README.md: missing Lab ${id}`);
}

if (errors.length) {
  console.error(`Documentation checks failed (${errors.length}):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Documentation checks passed: ${markdownFiles.length} English Markdown files, 25 objectives with 75 workbook examples, 200 topic questions, 4x90 exams, 12 PBQs, 15 command cases, 26 guided labs, 6 executable lab packs, and a 12-part CCNA bridge.`);
