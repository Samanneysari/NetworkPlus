# Complete CompTIA Network+ V9 Course — N10-009

This repository is a free, independent, beginner-friendly course for **CompTIA Network+ V9 (N10-009)**. It starts with the meaning of a network and builds toward implementation, operations, security, and structured troubleshooting.

The course uses plain English. Each major topic follows the same learning pattern:

1. What the technology is.
2. Why it exists.
3. How data moves through it.
4. How to configure or test it.
5. What every important command line means.
6. How to verify the result.
7. How it commonly fails.
8. How to troubleshoot it with evidence.

Examples use the domain `realsam.ir`, RFC 1918 private addresses, and documentation-only public ranges. Never run scanning, interception, or disruptive labs on systems you do not own or have explicit permission to test.

> This course follows the **N10-009 V9 Exam Objectives document, version 6.0**. CompTIA can change availability, policies, and retirement dates. Always verify current registration information on the [official CompTIA page](https://www.comptia.org/certifications/network) before registering.

## Exam details at the time of writing

| Item | Value |
|---|---|
| Version and code | V9 / N10-009 |
| Launch date | June 20, 2024 |
| Questions | Up to 90, including multiple-choice and performance-based questions |
| Duration | 90 minutes |
| Passing score | 720 on a scale of 100–900 |
| Recommended experience | CompTIA A+ plus 9–12 months in junior network administration or support |
| Published languages | English, German, Japanese, Portuguese, and Spanish |
| Retirement | Commonly about three years after launch; confirm the current date with CompTIA |

## Where to start

1. Read the [course guide and study plan](COURSE.md).
2. If you are completely new, begin with [Networking from Zero](docs/00-network-from-zero.md).
3. Complete the five foundation lessons in order:
   - [Computers, operating systems, hypervisors, number systems, and network rates](docs/foundations/01-computers-and-operating-systems.md)
   - [Networks, client/server, peer-to-peer, domains/workgroups, scope, and OSI](docs/foundations/02-network-models-and-scopes.md)
   - [Ethernet, MAC addresses, hubs, switching, flooding, and collision domains](docs/foundations/03-ethernet-switching-and-mac.md)
   - [IPv4, masks, routing tables, gateways, and a complete ARP scenario](docs/foundations/04-ipv4-routing-and-arp.md)
   - [Ports, TCP/UDP, ACK, NAT/PAT, ping, TTL, traceroute, and netstat](docs/foundations/05-transport-nat-and-diagnostics.md)
4. Study [OSI, TCP/IP, TCP, UDP, and TLS](docs/01-osi-tcp-ip-tls.md) carefully.
5. Complete the five exam-domain chapters in order.
6. Use the [objective workbook](docs/objective-workbook.md) to interpret three explained examples for every official objective.
7. Perform the matching [hands-on labs](labs/README.md).
8. Practice [IPv4 subnetting](practice/subnetting.md) without a calculator.
9. Complete the [200 original topic questions](practice/questions.md), then review the [explained answers](practice/answers.md).
10. Complete the [12 PBQs](practice/pbq/README.md), [command-output cases](practice/command-output/README.md), and [executable lab packs](labs/packs/README.md).
11. Take all [four 90-question timed exams](practice/exams/README.md) without notes.
12. Use the [final review sheet](SUMMARY.md) during the last stage of preparation.
13. Before beginning CCNA, complete the [CCNA readiness bridge](docs/07-ccna-readiness-bridge.md) without copying its configurations.
14. For job preparation, complete [Interview Preparation](interview/README.md) and the separate [Career Extension](career/README.md).

## Course map

| Section | Official weight | Main coverage |
|---|---:|---|
| Foundations | — | OS/VM basics, number systems, network scope, Ethernet, IPv4, ARP, transport, NAT, diagnostics, and a complete request path |
| OSI and transport | Part of Domain 1 | Seven OSI layers, TCP/IP, TCP, UDP, TLS 1.3, and encapsulation |
| 1. Networking Concepts | 23% | Appliances, cloud, protocols, media, topology, IPv4/IPv6, and modern networking |
| 2. Network Implementation | 20% | Routing, switching, VLANs, STP, LACP, wireless, and physical installation |
| 3. Network Operations | 19% | Documentation, monitoring, disaster recovery, DHCP, DNS, time, and management access |
| 4. Network Security | 14% | Cryptography, IAM, attacks, segmentation, NAC, ACLs, and hardening |
| 5. Network Troubleshooting | 24% | Methodology, cabling, services, performance, wireless, and diagnostic tools |

## Main files

| File | Purpose |
|---|---|
| [OBJECTIVES.md](OBJECTIVES.md) | Maps every official objective from 1.1 through 5.5 to lessons, labs, and questions |
| [Detailed v6.0 map](objectives/n10-009-v6-detailed-map.md) | Maps nested objective bullets to content and required depth |
| [docs/00-network-from-zero.md](docs/00-network-from-zero.md) | Absolute beginner starting point |
| [docs/foundations/README.md](docs/foundations/README.md) | Computing, Ethernet, IPv4, ARP, transport, NAT, and diagnostic foundations |
| [docs/01-osi-tcp-ip-tls.md](docs/01-osi-tcp-ip-tls.md) | Deep explanation of OSI, TCP/UDP, and TLS |
| [docs/02-networking-concepts.md](docs/02-networking-concepts.md) | Domain 1 |
| [docs/03-network-implementation.md](docs/03-network-implementation.md) | Domain 2 |
| [docs/04-network-operations.md](docs/04-network-operations.md) | Domain 3, including complete DNS and reverse DNS coverage |
| [docs/05-network-security.md](docs/05-network-security.md) | Domain 4 |
| [docs/06-network-troubleshooting.md](docs/06-network-troubleshooting.md) | Domain 5 |
| [docs/objective-workbook.md](docs/objective-workbook.md) | Three explained examples and a knowledge check for every N10-009 objective |
| [docs/07-ccna-readiness-bridge.md](docs/07-ccna-readiness-bridge.md) | Practical Cisco bridge and measurable CCNA entry gate |
| [labs/README.md](labs/README.md) | 26 guided labs with controlled fault injection |
| [practice/questions.md](practice/questions.md) | 200 original practice questions |
| [practice/answers.md](practice/answers.md) | Separate explained answer key |
| [practice/subnetting.md](practice/subnetting.md) | CIDR, VLSM, and 40 subnetting exercises |
| [practice/exams/README.md](practice/exams/README.md) | Four weighted, full-length 90-question exams with answer keys |
| [practice/pbq/README.md](practice/pbq/README.md) | 12 independent performance-based scenarios |
| [practice/command-output/README.md](practice/command-output/README.md) | 15 command-output troubleshooting cases |
| [labs/packs/README.md](labs/packs/README.md) | Reproducible topologies, configs, PCAPs, fault cards, and solutions |
| [interview/README.md](interview/README.md) | Technical, ticket, behavioral, and portfolio interview preparation |
| [career/README.md](career/README.md) | Clearly separated junior-job extensions at Network+ depth |
| [GLOSSARY.md](GLOSSARY.md) | Plain-English networking glossary |
| [appendices/ports-protocols.md](appendices/ports-protocols.md) | Port and protocol reference |
| [appendices/commands-tools.md](appendices/commands-tools.md) | Linux, Windows, Cisco, and physical-tool reference |
| [appendices/acronyms.md](appendices/acronyms.md) | Complete v6.0 acronym working-knowledge guide |
| [appendices/tools-lab-checklist.md](appendices/tools-lab-checklist.md) | Expanded tool-selection and evidence checklist |
| [REVIEW.md](REVIEW.md) | Honest course-completeness assessment and validation limits |

## Suggested lab environment

- **Cisco Packet Tracer** for VLANs, routing, switching, and basic wireless.
- **Wireshark** for Ethernet, ARP, DNS, TCP, UDP, and TLS inspection.
- **Two Linux virtual machines** for DNS, DHCP, SSH, packet capture, and service testing.
- **One Windows or Linux client** for endpoint troubleshooting commands.
- **GNS3, EVE-NG, or CML** for advanced emulation using legally obtained images.

## Ethics and exam integrity

This project is not affiliated with or endorsed by CompTIA. All questions are original. It does not contain exam dumps, leaked questions, or reconstructed confidential exam material. The goal is to understand networking well enough to explain, build, verify, and troubleshoot it.
