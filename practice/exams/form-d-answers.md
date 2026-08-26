# N10-009 Full Practice Exam — Form D Answers

## Domain 1

1. A→B: ARP for B, frame destination B's MAC, IP destination B, no gateway routing. A→C: ARP for `10.1.10.1`, frame destination gateway MAC, IP destination remains C, and the gateway routes toward `10.1.20.0/24` then builds a new frame for C.
2. **A.** Physical transmits signals/bits.
3. **C.** Full-duplex sends/receives simultaneously.
4. **A.** Each switched full-duplex port is an independent collision domain.
5. **A.** NAS provides network file access.
6. **A.** Passive IDS detects/alerts rather than inline blocking.
7. **A.** PaaS provides managed runtime/platform.
8. **A.** Tenants share infrastructure with logical separation.
9. **A.** Managers receive traps on UDP 162.
10. **A.** Telnet is clear-text TCP 23.
11. **A.** UDP is connectionless with no built-in delivery/order guarantee.
12. **A.** Multicast targets group members.
13. **A.** Single-mode has a smaller core and longer typical reach.
14. **A.** LC is compact and common with SFP-family optics.
15. **A.** Internal workload traffic is east-west.
16. **A.** `/28` blocks are 16; 190 falls in 176–191.
17. **C.** The range is 208–223.
18. **A.** `/32` identifies one IPv4 address.
19. **A.** SSE is the cloud security service portion.
20. **A.** SDN separates logical control from forwarding.
21. **A.** `2001:db8::/32` is documentation space.

## Domain 2

22. The area mismatch prevents adjacency: place both interfaces in the intended same area (area 0 here). Verify `show ip ospf neighbor` reaches a full adjacency and routes appear. Also check subnet, hello/dead timers, authentication, network type, interface/passive state, MTU, and router IDs as appropriate.
23. **A.** A default route covers otherwise unmatched traffic.
24. **A.** The higher-AD backup is unused while primary exists.
25. **A.** OSPF uses LSDB/SPF.
26. **A.** PAT adds transport-port translation/tracking.
27. **A.** VIP is the shared gateway address.
28. **A.** An SVI routes for a VLAN.
29. **A.** Permit only required VLANs.
30. **A.** Unused native VLAN reduces unintended untagged access.
31. **A.** BPDU Guard protects edge ports.
32. **A.** Per-flow hashing normally selects one member.
33. **A.** Compatible negotiation/settings are required on both ends.
34. **A.** 20 MHz consumes the least listed spectrum.
35. **A.** SAE improves shared-secret authentication.
36. **A.** Ad hoc does not require an AP.
37. **A.** Validation includes coverage, capacity, security, roaming, and performance.
38. **A.** UPS provides temporary battery power.
39. **A.** Very dry air raises ESD risk.

## Domain 3

40. Nightly+cold fails both objectives. Five-minute replication may meet RPO but a warm site may or may not meet 30-minute RTO. Near-real-time replication with a ready hot/active-passive service is the plausible choice, validated rather than assumed. Test identity/credentials, DNS/routing/firewall, application/data integrity, capacity, staff access, and measured failover/failback.
41. **A.** Floor plans support AP placement/wall survey evidence.
42. **A.** SLA defines service commitments.
43. **A.** Decommissioning must safely remove data/access and update records/dependencies.
44. **A.** Running config is active now.
45. **A.** Polling checks state; notifications report events; both have failure modes.
46. **A.** Syslog centralizes device messages.
47. **A.** A runbook needs meaning, evidence, action, ownership/escalation, and recovery.
48. **A.** MTTR measures average repair duration.
49. **A.** Active-active serves from multiple nodes/sites.
50. **A.** ACK confirms lease parameters.
51. **A.** Overlap can assign the same address twice.
52. **A.** MX selects mail exchangers by priority.
53. **A.** Recursive resolvers obtain/cache answers for clients.
54. **A.** Secondaries compare SOA serials.
55. **A.** Full tunnel carries all client traffic.
56. **A.** In-band shares production transport.

## Domain 4

57. Order explicit permits before final deny: established return traffic if stateful policy requires it; users→server TCP 443; clients→approved DNS UDP/TCP 53; guests→DHCP/DNS and approved Internet; explicit guest→internal deny; final deny/log. Verify a user HTTPS permit counter and a guest internal deny counter/log with source/destination/port and timestamp.
58. **A.** Vulnerability is an exploitable weakness.
59. **A.** SAN must contain the requested hostname.
60. **A.** Password/PIN is knowledge.
61. **A.** SAML carries identity assertions.
62. **A.** DNS poisoning inserts false name data.
63. **A.** Jamming disrupts RF availability.
64. **A.** File-encrypting extortion malware is ransomware.
65. **A.** DAI validates ARP using trusted bindings.
66. **A.** NAC can evaluate posture before admission.
67. **A.** Segmentation limits compromise spread.
68. **A.** PCI DSS applies to payment-card environments.
69. **A.** Report and independently verify; do not interact with suspect links.

## Domain 5

70. Power denial is an immediate availability fault: stop adding load, move approved devices to available power/PSE or restore budget with change control. Queue drops are a performance/QoS/capacity symptom and should be investigated after stable power. Verify no power-deny events, negotiated device power/features, voice VLAN/addressing, call quality, queue counters, and monitoring over time.
71. **A.** Bottom-up starts at Layer 1.
72. **A.** Risky testing requires approval, safe window/alternative, and rollback.
73. **A.** Open means broken continuity.
74. **A.** Record baseline, then inspect/reseat/replace the changed patch cable.
75. **A.** VFL emits visible light; never look into fiber.
76. **A.** No light/signal starts at Physical.
77. **A.** A discarding redundant port is normal loop prevention.
78. **A.** Investigate STP topology/root/path; do not disable STP blindly.
79. **A.** Longest-prefix `/16` beats `/8`.
80. **A.** The gateway option is wrong in DHCP scope/policy.
81. **A.** Correct authoritative zone data, increment serial where needed, then handle caches/TTL.
82. **A.** Unsynchronized timestamps harm log correlation.
83. **A.** Jitter is delay variation.
84. **A.** Loss/congestion elsewhere can trigger retransmission without local CRC.
85. **A.** Low RSSI with low noise points to weak coverage/path conditions.
86. **A.** `arp -a` shows Windows ARP cache.
87. **A.** `ip route get` predicts the selected path/source/interface.
88. **A.** A wire mapper checks pair order/continuity.
89. **A.** Timeout is nonspecific absence of expected reply.
90. **A.** It records exact cause/change, tests, duration, and reference.
