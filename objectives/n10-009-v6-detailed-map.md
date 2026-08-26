# N10-009 V9 Detailed Objective Map — Document Version 6.0

This checklist paraphrases the published exam scope and maps each nested topic to this course. It is a navigation and quality-control document, not a replacement for CompTIA's objective document. Examples in the official document are not exhaustive.

Depth labels:

- **Explain:** describe purpose, behavior, trade-offs, and failure symptoms.
- **Select:** choose an appropriate technology for a stated requirement.
- **Configure:** perform a basic vendor-neutral or Cisco-like lab task at Network+ depth.
- **Verify:** interpret status, counters, tables, logs, or packet evidence.
- **Troubleshoot:** isolate a fault using the standard methodology.

## 1.0 Networking Concepts — 23%

### 1.1 OSI model and data flow

| Scope item | Depth | Course and practice |
|---|---|---|
| Physical: signals, media, interfaces, and Layer 1 faults | Explain, troubleshoot | [OSI lesson](../docs/01-osi-tcp-ip-tls.md), [Lab 06](../labs/README.md) |
| Data Link: frames, MAC addressing, switching, and VLAN behavior | Explain, verify | [Ethernet foundation](../docs/foundations/03-ethernet-switching-and-mac.md), [Lab 01](../labs/README.md) |
| Network: logical addressing, routing, and packets | Explain, troubleshoot | [IPv4 foundation](../docs/foundations/04-ipv4-routing-and-arp.md), [Labs 03–04](../labs/README.md) |
| Transport: TCP, UDP, ports, reliability, and flow behavior | Explain, verify | [Transport foundation](../docs/foundations/05-transport-nat-and-diagnostics.md), [Lab 02](../labs/README.md) |
| Session, Presentation, and Application responsibilities | Explain | [OSI lesson](../docs/01-osi-tcp-ip-tls.md) |
| Encapsulation, decapsulation, and PDU names | Explain, verify | [Network models](../docs/foundations/02-network-models-and-scopes.md), [Lab 01](../labs/README.md) |

### 1.2 Network appliances, applications, and functions

| Scope item | Depth | Course and practice |
|---|---|---|
| Routers, Layer 2 switches, and Layer 3 switches | Explain, select | [Concepts](../docs/02-networking-concepts.md), [switching foundation](../docs/foundations/03-ethernet-switching-and-mac.md) |
| Firewalls, IDS/IPS, and unified threat management | Explain, select | [Concepts](../docs/02-networking-concepts.md), [Security](../docs/05-network-security.md) |
| Load balancers, proxies, and content delivery networks | Explain, select | [Concepts](../docs/02-networking-concepts.md) |
| NAS, SAN, and direct-attached storage | Compare | [Concepts](../docs/02-networking-concepts.md), [Acronyms](../appendices/acronyms.md) |
| Wireless access points and controllers | Explain, select | [Implementation](../docs/03-network-implementation.md), [Labs 14–15](../labs/README.md) |
| VPN concentrators and tunneling functions | Explain, select | [Operations](../docs/04-network-operations.md), [Security](../docs/05-network-security.md) |
| Quality of service and time-to-live | Explain, troubleshoot | [Concepts](../docs/02-networking-concepts.md), [Diagnostics foundation](../docs/foundations/05-transport-nat-and-diagnostics.md) |

### 1.3 Cloud and virtual networking

| Scope item | Depth | Course and practice |
|---|---|---|
| NFV, VPC/VNet-style isolation, and virtual network interfaces | Explain | [Cloud section](../docs/02-networking-concepts.md) |
| Security groups, network ACLs, Internet gateways, and NAT gateways | Compare, select | [Cloud section](../docs/02-networking-concepts.md), [Career cloud lab](../career/04-cloud-networking.md) |
| Public, private, hybrid, and community deployment models | Compare | [Cloud section](../docs/02-networking-concepts.md) |
| SaaS, PaaS, IaaS, and shared responsibility | Compare, select | [Cloud section](../docs/02-networking-concepts.md) |
| Elasticity, scalability, multitenancy, and Network as a Service | Explain | [Cloud section](../docs/02-networking-concepts.md), [Acronyms](../appendices/acronyms.md) |
| Internet VPN, direct connection, and cloud peering | Compare, select | [Cloud section](../docs/02-networking-concepts.md) |

### 1.4 Ports, protocols, services, and traffic types

| Scope item | Depth | Course and practice |
|---|---|---|
| FTP/FTPS, SFTP, SSH, Telnet, SMTP/SMTPS, and TFTP | Explain, select | [Concepts](../docs/02-networking-concepts.md), [port appendix](../appendices/ports-protocols.md) |
| DNS, DHCP, HTTP/HTTPS, NTP/NTS/PTP, SNMP, LDAP/LDAPS, SMB, syslog, SQL Server, RDP, and SIP | Explain, select | [Concepts](../docs/02-networking-concepts.md), [port appendix](../appendices/ports-protocols.md) |
| ICMP, TCP, UDP, GRE, and IPsec AH/ESP/IKE | Compare, troubleshoot | [OSI lesson](../docs/01-osi-tcp-ip-tls.md), [Concepts](../docs/02-networking-concepts.md) |
| Unicast, multicast, anycast, and broadcast | Compare | [Network models](../docs/foundations/02-network-models-and-scopes.md) |

### 1.5 Media, transceivers, and connectors

| Scope item | Depth | Course and practice |
|---|---|---|
| Copper categories, coaxial cable, twinaxial cable, and plenum ratings | Compare, select | [Concepts](../docs/02-networking-concepts.md), [Lab 06](../labs/README.md) |
| Single-mode and multimode fiber characteristics | Compare, select | [Concepts](../docs/02-networking-concepts.md) |
| DAC, SFP/SFP+/QSFP, speed, wavelength, reach, and compatibility | Compare, select | [Concepts](../docs/02-networking-concepts.md), [tool checklist](../appendices/tools-lab-checklist.md) |
| RJ45, LC, SC, ST, MPO/MTP, BNC, and F-type connectors | Identify, select | [Concepts](../docs/02-networking-concepts.md) |

### 1.6 Topologies, architectures, and traffic flow

| Scope item | Depth | Course and practice |
|---|---|---|
| Star, mesh, hybrid, hub-and-spoke, and point-to-point | Compare, select | [Concepts](../docs/02-networking-concepts.md) |
| Three-tier, collapsed core, and spine-leaf | Compare | [Concepts](../docs/02-networking-concepts.md) |
| North-south and east-west traffic | Explain | [Concepts](../docs/02-networking-concepts.md) |

### 1.7 IPv4 addressing

| Scope item | Depth | Course and practice |
|---|---|---|
| Public/private, APIPA/link-local, loopback, and documentation ranges | Identify, select | [IPv4 foundation](../docs/foundations/04-ipv4-routing-and-arp.md) |
| Network and host portions, subnet masks, CIDR, and address classes | Calculate, explain | [IPv4 foundation](../docs/foundations/04-ipv4-routing-and-arp.md), [subnetting drills](../practice/subnetting.md) |
| VLSM, network address, broadcast address, host range, /31, and /32 | Calculate, select | [IPv4 foundation](../docs/foundations/04-ipv4-routing-and-arp.md), [Lab 03](../labs/README.md) |

### 1.8 Evolving networking use cases

| Scope item | Depth | Course and practice |
|---|---|---|
| SDN, SD-WAN, VXLAN, and data-center interconnect | Explain, compare | [Concepts](../docs/02-networking-concepts.md) |
| Zero Trust, SASE, and security service edge | Explain | [Concepts](../docs/02-networking-concepts.md), [Security](../docs/05-network-security.md) |
| Infrastructure as code: repeatability, review, secrets, and rollback | Explain | [Concepts](../docs/02-networking-concepts.md), [Career automation](../career/05-network-automation.md) |
| IPv6 addressing, dual stack, tunneling, and NAT64 | Explain, verify | [IPv6 expansion](../docs/02-networking-concepts.md), [Lab 04](../labs/README.md) |

## 2.0 Network Implementation — 20%

### 2.1 Routing technologies

| Scope item | Depth | Course and practice |
|---|---|---|
| Connected, static, default, and floating static routes | Explain, configure, verify | [Implementation](../docs/03-network-implementation.md), [Lab 11](../labs/README.md) |
| BGP, EIGRP, and OSPF purposes at Network+ depth | Compare, identify | [Implementation](../docs/03-network-implementation.md) |
| Longest prefix, administrative distance, and metric | Select, troubleshoot | [Implementation](../docs/03-network-implementation.md), [Lab 12](../labs/README.md) |
| NAT, PAT, translation state, and inside/outside roles | Configure, troubleshoot | [Implementation](../docs/03-network-implementation.md), [Lab 13](../labs/README.md) |
| FHRP and virtual IP behavior | Explain | [Implementation](../docs/03-network-implementation.md) |
| Router subinterfaces and router-on-a-stick | Configure, verify | [Implementation](../docs/03-network-implementation.md), [Lab 08](../labs/README.md) |

### 2.2 Switching technologies

| Scope item | Depth | Course and practice |
|---|---|---|
| VLAN database, access VLANs, voice VLANs, and SVIs | Configure, verify | [Implementation](../docs/03-network-implementation.md), [Labs 07–08](../labs/README.md) |
| 802.1Q trunks, native VLAN, and allowed VLAN list | Configure, troubleshoot | [Implementation](../docs/03-network-implementation.md), [Lab 07](../labs/README.md) |
| Speed, duplex, MTU, and jumbo frames | Configure, troubleshoot | [Implementation](../docs/03-network-implementation.md), [Lab 06](../labs/README.md) |
| STP root, roles, states, PortFast, and BPDU Guard | Configure, troubleshoot | [Implementation](../docs/03-network-implementation.md), [Lab 09](../labs/README.md) |
| LACP link aggregation | Configure, verify | [Implementation](../docs/03-network-implementation.md), [Lab 10](../labs/README.md) |

### 2.3 Wireless technologies

| Scope item | Depth | Course and practice |
|---|---|---|
| 2.4, 5, and 6 GHz bands; channels; width; DFS; and regulatory limits | Compare, select | [Implementation](../docs/03-network-implementation.md), [Lab 14](../labs/README.md) |
| SSID, BSSID, ESSID, infrastructure, ad hoc, bridge, and mesh | Explain, identify | [Implementation](../docs/03-network-implementation.md) |
| WPA2/WPA3 Personal and Enterprise, SAE, EAP, RADIUS, and captive portal | Select, configure | [Implementation](../docs/03-network-implementation.md), [Lab 15](../labs/README.md) |
| Omnidirectional/directional antennas, gain, placement, power, and roaming | Select, troubleshoot | [Implementation](../docs/03-network-implementation.md), [Lab 14](../labs/README.md) |
| Autonomous and controller-based APs | Compare | [Implementation](../docs/03-network-implementation.md) |

### 2.4 Physical installation

| Scope item | Depth | Course and practice |
|---|---|---|
| MDF/IDF, racks, patch panels, cable management, and port labeling | Explain, document | [Implementation](../docs/03-network-implementation.md), [Lab pack](../labs/packs/README.md) |
| UPS, PDU, PoE standards/budget, power redundancy, and grounding | Explain, calculate | [Implementation](../docs/03-network-implementation.md), [Lab 06](../labs/README.md) |
| Temperature, humidity, fire suppression, and physical access | Explain | [Implementation](../docs/03-network-implementation.md) |
| Intermediate distribution, demarcation, smart jack, and cross-connect concepts | Explain | [Implementation](../docs/03-network-implementation.md) |

## 3.0 Network Operations — 19%

### 3.1 Documentation and life-cycle management

| Scope item | Depth | Course and practice |
|---|---|---|
| Physical/logical diagrams, rack diagrams, cable maps, asset inventory, and IPAM | Create, maintain | [Operations](../docs/04-network-operations.md), [Lab 21](../labs/README.md) |
| SLA, wireless survey/heat map, and baseline documentation | Explain, create | [Operations](../docs/04-network-operations.md), [Lab 14](../labs/README.md) |
| EOL/EOS, firmware/software management, decommissioning, and disposal | Explain | [Operations](../docs/04-network-operations.md) |
| Change request, risk, approval, maintenance window, validation, rollback, and record | Apply | [Operations](../docs/04-network-operations.md), [Lab 21](../labs/README.md) |
| Running, startup, backup, and golden configurations | Compare, restore | [Operations](../docs/04-network-operations.md) |

### 3.2 Monitoring

| Scope item | Depth | Course and practice |
|---|---|---|
| SNMP polling, traps/informs, MIB/OID, and SNMPv3 security | Explain, verify | [Operations](../docs/04-network-operations.md), [Lab 20](../labs/README.md) |
| Flow records, packet capture, port mirroring, logs, syslog severity, and SIEM | Compare, select | [Operations](../docs/04-network-operations.md), [Labs 19–20](../labs/README.md) |
| Baselines, thresholds, anomalies, alert ownership, and escalation | Apply | [Operations](../docs/04-network-operations.md), [Monitoring pack](../labs/packs/wireless-monitoring/README.md) |
| Interface, device, service, availability, and configuration metrics | Interpret | [Operations](../docs/04-network-operations.md) |

### 3.3 Disaster recovery

| Scope item | Depth | Course and practice |
|---|---|---|
| RPO, RTO, MTTR, and MTBF | Calculate, interpret | [Operations](../docs/04-network-operations.md) |
| Cold, warm, and hot recovery sites | Compare, select | [Operations](../docs/04-network-operations.md) |
| Active-active and active-passive availability | Compare | [Operations](../docs/04-network-operations.md) |
| Tabletop, restore, failover, and validation testing | Plan, verify | [Operations](../docs/04-network-operations.md), [Lab 21](../labs/README.md) |
| BCP, backup dependencies, communications, and lessons learned | Explain | [Operations](../docs/04-network-operations.md), [Acronyms](../appendices/acronyms.md) |

### 3.4 IPv4 and IPv6 network services

| Scope item | Depth | Course and practice |
|---|---|---|
| DHCP scopes, exclusions, reservations, options, leases, and relay | Configure, troubleshoot | [Operations](../docs/04-network-operations.md), [Lab 16](../labs/README.md) |
| SLAAC, Router Advertisement, Neighbor Discovery, and IPv6 gateways | Explain, verify | [Operations](../docs/04-network-operations.md), [Lab 04](../labs/README.md) |
| DNS A/AAAA/CNAME/MX/TXT/NS/PTR/SOA records | Configure, query | [Operations](../docs/04-network-operations.md), [Lab 17](../labs/README.md) |
| Forward/reverse, primary/secondary, authoritative/recursive, hosts file | Compare, troubleshoot | [Operations](../docs/04-network-operations.md) |
| DNSSEC, DoH, and DoT | Explain, verify | [Operations](../docs/04-network-operations.md), [Lab 18](../labs/README.md) |
| NTP, PTP, and NTS | Compare, troubleshoot | [Operations](../docs/04-network-operations.md), [Lab 19](../labs/README.md) |

### 3.5 Network access and management

| Scope item | Depth | Course and practice |
|---|---|---|
| Site-to-site and client-to-site VPNs | Compare, select | [Operations](../docs/04-network-operations.md), [Career firewall/VPN](../career/03-firewalls-and-vpn.md) |
| Clientless, full tunnel, and split tunnel | Compare, troubleshoot | [Operations](../docs/04-network-operations.md) |
| SSH, GUI, API, and console management | Compare, select | [Operations](../docs/04-network-operations.md), [command appendix](../appendices/commands-tools.md) |
| Jump host and in-band/out-of-band management | Explain, select | [Operations](../docs/04-network-operations.md), [Lab 22](../labs/README.md) |

## 4.0 Network Security — 14%

### 4.1 Security concepts

| Scope item | Depth | Course and practice |
|---|---|---|
| Confidentiality, integrity, availability, risk, threat, vulnerability, and exploit | Explain | [Security](../docs/05-network-security.md) |
| Encryption, hashing, PKI, certificates, and key management | Explain, select | [Security](../docs/05-network-security.md), [TLS lesson](../docs/01-osi-tcp-ip-tls.md) |
| IAM, MFA, SSO, RADIUS, TACACS+, LDAP, SAML, and 802.1X/EAP | Compare, select | [Security](../docs/05-network-security.md) |
| Least privilege, RBAC, geofencing, segmentation, and Zero Trust | Apply | [Security](../docs/05-network-security.md), [Lab 23](../labs/README.md) |
| Honeypots/honeynets, deception, and common policy documents | Explain | [Security](../docs/05-network-security.md), [Acronyms](../appendices/acronyms.md) |
| PCI DSS, GDPR, data locality, and regulated-environment awareness | Explain | [Security](../docs/05-network-security.md) |

### 4.2 Attacks and impact

| Scope item | Depth | Course and practice |
|---|---|---|
| DoS/DDoS, VLAN hopping, MAC flooding, ARP poisoning, and rogue DHCP | Identify, mitigate | [Security](../docs/05-network-security.md), [Lab 24](../labs/README.md) |
| Rogue AP, evil twin, deauthentication, RF jamming, and on-path attacks | Identify, mitigate | [Security](../docs/05-network-security.md) |
| DNS poisoning, spoofing, phishing, social engineering, and malware | Identify, mitigate | [Security](../docs/05-network-security.md) |

### 4.3 Defensive features

| Scope item | Depth | Course and practice |
|---|---|---|
| Device hardening, secure protocols, firmware, credentials, and unused services | Apply | [Security](../docs/05-network-security.md) |
| Network segmentation, screened subnet, ACLs, URL/content filtering | Configure, verify | [Security](../docs/05-network-security.md), [Labs 08 and 23](../labs/README.md) |
| Port security, DHCP snooping, Dynamic ARP Inspection, and BPDU Guard | Configure, troubleshoot | [Security](../docs/05-network-security.md), [Lab 24](../labs/README.md) |
| NAC posture, guest/IoT isolation, and quarantine | Explain, design | [Security](../docs/05-network-security.md), [Lab 23](../labs/README.md) |

## 5.0 Network Troubleshooting — 24%

### 5.1 Troubleshooting methodology

| Scope item | Depth | Course and practice |
|---|---|---|
| Identify problem, question users, gather information, reproduce, and separate symptoms | Apply | [Troubleshooting](../docs/06-network-troubleshooting.md), [all labs](../labs/README.md) |
| Establish theory using obvious checks, OSI direction, or divide-and-conquer | Apply | [Troubleshooting](../docs/06-network-troubleshooting.md) |
| Test theory safely, form a new theory, or escalate | Apply | [Troubleshooting](../docs/06-network-troubleshooting.md) |
| Plan fix, consider impact, implement, verify, prevent recurrence, and document | Apply | [Troubleshooting](../docs/06-network-troubleshooting.md), [Interview tickets](../interview/README.md) |

### 5.2 Cabling, interfaces, and hardware

| Scope item | Depth | Course and practice |
|---|---|---|
| Incorrect cable/connector, damaged cable, distance, attenuation, crosstalk, and interference | Troubleshoot | [Troubleshooting](../docs/06-network-troubleshooting.md), [Lab 06](../labs/README.md) |
| Open/short/reversed/split pair, dirty fiber, bend loss, and transceiver mismatch | Troubleshoot | [Troubleshooting](../docs/06-network-troubleshooting.md) |
| Interface errors, CRC, runts, giants, drops, link state, speed, duplex, and err-disable | Interpret | [Troubleshooting](../docs/06-network-troubleshooting.md), [command cases](../practice/command-output/README.md) |
| PoE standard, class, negotiation, and budget faults | Troubleshoot | [Troubleshooting](../docs/06-network-troubleshooting.md), [Implementation](../docs/03-network-implementation.md) |

### 5.3 Services, switching, and routing

| Scope item | Depth | Course and practice |
|---|---|---|
| STP loop/root/role/state and incorrect VLAN/trunk/ACL behavior | Troubleshoot | [Troubleshooting](../docs/06-network-troubleshooting.md), [Labs 07–10](../labs/README.md) |
| Route table, default route, return route, longest match, and route source | Troubleshoot | [Troubleshooting](../docs/06-network-troubleshooting.md), [Labs 11–12](../labs/README.md) |
| DHCP pool/relay failures, incorrect gateway/IP/mask, and duplicate address | Troubleshoot | [Troubleshooting](../docs/06-network-troubleshooting.md), [Lab 16](../labs/README.md) |
| DNS record, resolver, authoritative, cache, and encrypted-DNS issues | Troubleshoot | [Troubleshooting](../docs/06-network-troubleshooting.md), [Labs 17–18](../labs/README.md) |
| NTP/time, NAT/PAT, firewall, and VPN reachability issues | Troubleshoot | [Troubleshooting](../docs/06-network-troubleshooting.md), [command cases](../practice/command-output/README.md) |

### 5.4 Performance

| Scope item | Depth | Course and practice |
|---|---|---|
| Congestion, contention, bottleneck, bandwidth, throughput, latency, jitter, loss, and goodput | Interpret, troubleshoot | [Troubleshooting](../docs/06-network-troubleshooting.md), [Lab 25](../labs/README.md) |
| Wireless signal, SNR, interference, channel overlap, utilization, roaming, and capacity | Troubleshoot | [Troubleshooting](../docs/06-network-troubleshooting.md), [Lab 14](../labs/README.md) |
| CPU, memory, disk/service delay, retransmission, and receiver-window symptoms | Troubleshoot | [Troubleshooting](../docs/06-network-troubleshooting.md), [command cases](../practice/command-output/README.md) |

### 5.5 Tools and commands

| Scope item | Depth | Course and practice |
|---|---|---|
| Protocol analyzer, packet capture, ping, traceroute/tracert, nslookup, dig, tcpdump | Select, use, interpret | [Troubleshooting](../docs/06-network-troubleshooting.md), [command appendix](../appendices/commands-tools.md) |
| ip/ifconfig/ipconfig, arp/neighbor, netstat/ss, Nmap, LLDP/CDP, and speed test | Select, use, interpret | [command appendix](../appendices/commands-tools.md), [command cases](../practice/command-output/README.md) |
| Cable tester, toner/probe, TDR, OTDR, optical power meter, visual fault locator, PoE tester | Select | [tool checklist](../appendices/tools-lab-checklist.md) |
| Wi-Fi/spectrum analyzer, network tap, port mirror, and flow analyzer | Select, interpret | [tool checklist](../appendices/tools-lab-checklist.md), [Monitoring pack](../labs/packs/wireless-monitoring/README.md) |
| Switch/router show commands for MAC, ARP, route, interfaces, VLANs, configuration, and PoE | Interpret | [command appendix](../appendices/commands-tools.md), [command cases](../practice/command-output/README.md) |

## Completion rule

An item is not complete because its word appears in a file. It is complete only when the learner can perform the stated depth without the answer key, explain the evidence, and distinguish at least one similar failure. Use the [readiness gates](../COURSE.md) before scheduling an exam or claiming interview readiness.
