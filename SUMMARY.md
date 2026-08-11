# Network+ N10-009 Final Review

Use this sheet only after studying the full lessons. If you cannot explain why a line is true, return to the linked chapter.

## A complete web request

1. The client separates the URL into scheme, hostname, port, and path.
2. It checks browser and operating-system caches, the hosts file, and then DNS.
3. The recursive resolver follows the root, TLD, and authoritative hierarchy when needed.
4. The client decides whether the destination is local or remote and resolves the next-hop MAC with ARP or Neighbor Discovery.
5. A switch forwards the Ethernet frame; routers forward the IP packet using longest-prefix match.
6. NAT/PAT may translate the source address and port at the network edge.
7. TCP performs its three-way handshake, or QUIC starts over UDP.
8. TLS negotiates keys and validates the server certificate and hostname.
9. HTTP carries the request through a proxy or load balancer to the application.
10. The browser parses the response, requests dependencies, and renders the page.

## OSI at a glance

| Layer | Main job | Identifier or PDU | Examples |
|---:|---|---|---|
| 7 Application | User-facing network services | Data | HTTP, DNS, DHCP, SMTP |
| 6 Presentation | Representation, encryption, compression | Data | Encoding; TLS conceptually |
| 5 Session | Establish and maintain conversations | Data | Sessions and checkpoints |
| 4 Transport | Ports, reliability, flow | Segment or datagram | TCP and UDP |
| 3 Network | Route between IP networks | Packet and IP | IPv4, IPv6, router |
| 2 Data Link | Local-link delivery | Frame and MAC | Ethernet, VLAN, switch |
| 1 Physical | Signals and media | Bits | Copper, fiber, and RF |

TCP opens with `SYN → SYN-ACK → ACK`. A normal close uses `FIN → ACK → FIN → ACK`. UDP has no built-in connection, ordering, acknowledgment, or retransmission. TLS 1.3 broadly uses ClientHello, ServerHello, encrypted server parameters and certificate proof, Finished messages, then application data.

## Numbers worth knowing

- Domain weights: Concepts 23%, Implementation 20%, Operations 19%, Security 14%, Troubleshooting 24%.
- Syslog: 0 is Emergency and most severe; 7 is Debug.
- RFC 1918: `10.0.0.0/8`, `172.16.0.0/12`, and `192.168.0.0/16`.
- IPv4 link-local/APIPA: `169.254.0.0/16`; loopback: `127.0.0.0/8`.
- Documentation ranges: `192.0.2.0/24`, `198.51.100.0/24`, `203.0.113.0/24`, and `2001:db8::/32`.
- Review service ports in [Ports and Protocols](appendices/ports-protocols.md).

## Fast technology selection

| Need | First technology to consider |
|---|---|
| Shared files | NAS |
| Block storage | SAN |
| Control outbound user web traffic | Forward proxy |
| Protect or distribute inbound web traffic | Reverse proxy and load balancer |
| Redundant default gateway | FHRP and a virtual IP |
| Carry several VLANs on one link | 802.1Q trunk |
| Bundle links | LACP/LAG |
| Prevent Layer 2 loops | STP/RSTP |
| Central, application-aware policy across several WAN transports | SD-WAN |
| Layer 2 overlay across Layer 3 | VXLAN |
| Automatic cloud scale-out and scale-in | Elasticity |
| Choose among different prefixes | Longest-prefix match |
| Choose among route sources for the same prefix | Administrative distance |
| Choose within one routing protocol | Metric |

## Switching and wireless

A switch learns the source MAC and looks up the destination MAC. It floods broadcasts and unknown unicasts only inside the VLAN. An 802.1Q trunk carries several VLANs, and the native VLAN must match on both ends. STP selects a root bridge and blocks redundant forwarding paths. Use PortFast only on edge ports and pair it with BPDU Guard when appropriate.

Wi-Fi is a shared medium. Wider channels can increase potential throughput but consume more spectrum. In many regulatory domains, 1, 6, and 11 are the non-overlapping 20 MHz channels in 2.4 GHz. Five GHz offers more channels and may use DFS. Six GHz requires compatible clients and current security. SSID is the network name, BSSID identifies a radio/cell, and SNR compares signal to noise.

## Operations

- Physical diagrams show racks, ports, cables, and rooms; logical diagrams show VLANs, subnets, routes, and zones.
- A change needs purpose, scope, risk, approval, steps, backup, rollback, success criteria, and documentation updates.
- SNMPv3 is preferred to v2c; polling and traps complement each other.
- Flow records summarize conversations; packet captures are more detailed and more sensitive.
- RPO is acceptable data loss; RTO is acceptable recovery time; MTTR is repair time; MTBF is time between failures.
- DHCP commonly follows Discover, Offer, Request, Acknowledgment.
- DNS records: A=IPv4, AAAA=IPv6, CNAME=alias, MX=mail, TXT=text/policy, NS=authority, SOA=zone metadata, PTR=reverse mapping.
- IPv4 reverse DNS uses `in-addr.arpa`; forward-confirmed reverse DNS means PTR and A/AAAA agree.
- DNSSEC provides origin authentication and integrity, not confidentiality. DoH and DoT encrypt the client-to-resolver path.
- NTP provides general network time, PTP provides high precision in controlled environments, and NTS secures NTP.

## Security

A threat can act on a vulnerability by using an exploit, creating risk. The CIA triad is confidentiality, integrity, and availability. AAA is authentication, authorization, and accounting. Defense in depth uses identity, MFA, patching, segmentation, filtering, logging, backups, and recovery together.

| Attack | Key defenses |
|---|---|
| DDoS | CDN/Anycast, rate limiting, scrubbing, capacity, and a runbook |
| VLAN hopping | Static access mode, DTP disabled, unused native VLAN, restricted allowed list |
| MAC flooding | Port security, 802.1X, and monitoring |
| ARP spoofing | DHCP Snooping, DAI, TLS, and segmentation |
| Rogue DHCP | DHCP Snooping and correctly trusted uplinks |
| Evil twin | WPA2/3-Enterprise, certificate validation, and wireless IDS |
| DNS poisoning | Patched resolvers, restricted recursion, and DNSSEC validation |
| Malware | Patching, EDR, least privilege, segmentation, and immutable backups |

ACLs are processed top to bottom, first match wins, and an implicit deny exists at the end. Always identify source, destination, protocol, port, direction, and interface. NAT and VLANs are not substitutes for a firewall.

## Troubleshooting

1. Identify the problem and scope.
2. Establish a likely theory.
3. Test the theory safely.
4. Create a plan with approval and rollback.
5. Implement the change.
6. Verify full functionality.
7. Document findings and prevention.

| Symptom | First area to investigate |
|---|---|
| Link down | Power, cable, optic, or interface |
| Increasing CRC errors | Physical media or duplex |
| `169.254.x.x` | DHCP path, pool, relay, or server |
| IP works but hostname does not | DNS |
| TCP timeout | Route, ACL, server, or return path |
| Connection refused | Host reached, but service is not listening or rejects it |
| TLS hostname error | URL, SNI, SAN, or certificate |
| HTTP 502/503 | Proxy, backend health, or capacity |
| MAC flapping and broadcast surge | Layer 2 loop or STP |
| Broken real-time audio | Jitter, loss, queues, or wireless retries |

Bandwidth is capacity, throughput is actual transfer, goodput is useful application data, latency is delay, jitter is changing delay, and loss is missing packets. A baseline and counter rate are more useful than one isolated snapshot.

## Readiness checklist

- I can explain DNS through TLS and HTTP without notes.
- I can identify protocol layers and handshakes in a capture.
- I can solve subnetting problems under time pressure.
- I can read MAC, ARP, routing, and ACL tables.
- I have built and deliberately broken VLAN, STP, routing, NAT, DHCP, and DNS labs.
- I can propose layered controls and explain trade-offs.
- I completed the 200 questions and explained why wrong options are wrong.
- I completed the capstone with evidence, rollback, and a clear report.
