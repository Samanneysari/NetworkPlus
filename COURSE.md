# Course Guide

## How each topic is taught

Every major topic follows this order:

1. **Definition:** what the technology is.
2. **Purpose:** the problem it solves.
3. **Operation:** how frames, packets, sessions, or messages move.
4. **Components:** addresses, headers, tables, devices, and roles.
5. **Implementation:** small, ordered configuration or testing steps.
6. **Line-by-line explanation:** what each important command does.
7. **Verification:** positive and negative tests that prove the result.
8. **Failure modes:** symptoms, likely causes, and safe isolation steps.
9. **Exam practice:** questions, labs, and PBQ-style scenarios.

Do not memorize a command before understanding the path of the data. For every problem, ask:

- Which layer is currently responsible?
- Which address or identifier is used for the decision?
- Which table or policy is consulted?
- What evidence would prove the theory?

## Suggested 16-week plan

| Week | Topic | Measurable outcome |
|---:|---|---|
| 1 | Computing and network foundations | Explain OS/VM roles, Ethernet/IP addressing, ARP, routing, transport, and a complete web request |
| 2 | OSI and encapsulation | Name each layer, PDU, identifier, device, and common fault |
| 3 | TCP/IP, TCP, UDP, ICMP, and ports | Explain handshakes, acknowledgments, windows, and UDP trade-offs |
| 4 | IPv4, binary, CIDR, and VLSM | Correctly solve at least 30 subnetting problems without tools |
| 5 | IPv6, cabling, fiber, connectors, and topology | Select appropriate media and addressing for a scenario |
| 6 | Routing, NAT/PAT, and FHRP | Read a route table and explain longest-prefix selection |
| 7 | Switching, VLANs, trunks, LACP, and STP | Build a multi-VLAN network without a loop |
| 8 | Wireless and physical installation | Choose bands, channels, security, antennas, power, and placement |
| 9 | Documentation and change management | Write an executable change and rollback plan |
| 10 | Monitoring, SNMP, flow, logs, and capture | Build a baseline and identify a real anomaly |
| 11 | DHCP, DNS, NTP/PTP/NTS, VPNs, and management | Troubleshoot address assignment and name resolution end to end |
| 12 | Security, PKI, IAM, attacks, and segmentation | Match threats to preventive, detective, and corrective controls |
| 13 | Troubleshooting methodology and tools | Resolve five faults using evidence instead of guesses |
| 14 | Capstone lab and timed review | Complete the final lab, PBQs, and first full timed exam |
| 15 | Exam remediation | Review weak domains and complete two unseen full timed exams |
| 16 | Interview and career extension | Present a lab incident, solve ticket scenarios, and complete the relevant job-facing lessons |

After week 16, complete the [CCNA readiness bridge](docs/07-ccna-readiness-bridge.md) if CCNA is your next goal. It is an entry gate, not a replacement for a current CCNA course.

## How to perform a lab correctly

Record the following for every lab:

| Section | What to record |
|---|---|
| Objective | Official objective code and intended behavior |
| Topology | Devices, interfaces, VLANs, subnets, and media |
| Prediction | What should happen before you run the test |
| Baseline | Initial tables, counters, logs, and state |
| Execution | Small changes and the reason for each one |
| Verification | A successful test, a negative test, and useful output |
| Fault injection | One controlled failure and its symptoms |
| Root cause | The underlying cause, not only the command that hid it |
| Prevention | Documentation, monitoring, policy, or design improvement |

## How to answer scenario questions

1. Identify whether the question asks for the **first**, **best**, **most secure**, or **most likely** action.
2. Determine the layer and scope of the problem.
3. Remove options contradicted by the evidence.
4. Separate a symptom from a root cause.
5. For a first action, prefer low-risk evidence collection.
6. For a solution, consider side effects and verification.

## Completion standard

Reading alone is not enough. You should be able to:

- Distinguish an OS, vendor, hypervisor, VM, container, and network operating system.
- Explain bandwidth, bit rate, throughput, and goodput with units and a bottleneck example.
- Compare client-server, peer-to-peer, workgroup, domain, and PAN/LAN/CAN/MAN/WAN scope.
- Follow switch learning, unknown-unicast flooding, ARP, gateway selection, and routed re-encapsulation.
- Explain a web request from DNS through TLS and HTTP.
- Identify Ethernet, IP, TCP, UDP, DNS, and TLS in a packet capture.
- Calculate networks, gateways, broadcasts, host ranges, and summaries.
- Diagnose VLANs, trunks, STP, routes, ACLs, and DHCP from tables and counters.
- Distinguish bandwidth, throughput, goodput, latency, jitter, and loss.
- Treat `ping` as limited evidence rather than a universal answer.
- Design a change with backup, rollback, validation, and documentation.
- Recommend multiple defensive controls for a stated threat.

## Readiness gates

### N10-009 exam gate

- Every row in the [detailed v6.0 objective map](objectives/n10-009-v6-detailed-map.md) is explainable at its stated depth.
- At least three unseen [90-question forms](practice/exams/README.md) score 85% or higher under the course timer.
- PBQs and multi-select questions are completed without leaving required parts blank.
- Subnetting, common ports, acronyms, route choice, and troubleshooting output are handled under time pressure.

The 85% threshold is a conservative course benchmark, not CompTIA's unpublished scoring formula.

### Practical gate

- Complete all six [executable lab packs](labs/packs/README.md) with before/after evidence.
- Diagnose at least one hidden fault without the solution file.
- Interpret ARP/ICMP, DNS, and TCP PCAPs and protect sensitive capture data.
- Produce a diagram, address plan, change/rollback, ticket timeline, and end-to-end validation.

### CCNA entry gate

- Complete the [CCNA readiness bridge](docs/07-ccna-readiness-bridge.md) from a blank topology.
- Explain every configuration line before entering it.
- Predict routes, frame destinations, STP state, ACL matches, and NAT behavior before viewing show output.
- Inject and diagnose one VLAN/trunk, one OSPF, one ACL, and one return-path fault.
- Treat this as permission to **start learning CCNA**, not as evidence that CCNA is already complete.

### Interview gate

- Answer unfamiliar questions using scope, evidence, safe test, correction, and verification.
- Explain one real or clearly identified lab incident using STAR and technical evidence.
- Know the boundary of your authority and experience; escalate instead of bluffing.
- Complete only the [Career Extension](career/README.md) lessons relevant to the target role.
