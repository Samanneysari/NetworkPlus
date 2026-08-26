# N10-009 Full Practice Exam — Form A Answers

Score one point per numbered item. For PBQs, require the essential actions; equivalent safe wording is acceptable.

## Domain 1

1. **DNS → ARP → TCP → TLS → HTTP.** The first routed data frame uses the default gateway's MAC, not the remote server's MAC. DNS may itself trigger ARP first if no next-hop mapping exists; the logical service sequence remains name resolution before the application connection.
2. **B.** Data Link constructs Ethernet frames and uses MAC addresses.
3. **C.** Unknown unicast is flooded only within the VLAN, except back through ingress.
4. **A.** A load balancer selects healthy backends and distributes connections/requests.
5. **B.** NAS commonly exposes files; SAN commonly exposes block storage.
6. **B.** A NAT gateway supports outbound translation without directly publishing the instance.
7. **A.** Guest OS maintenance remains a customer responsibility in IaaS.
8. **B.** NTP normally uses UDP 123.
9. **C.** SSH provides encrypted remote CLI on TCP 22.
10. **A and D.** Ordinary DNS commonly uses UDP, while large/truncated responses and operations such as transfer can require TCP 53.
11. **C.** Routing directs anycast traffic to one suitable instance sharing the address.
12. **B.** Single-mode fiber supports long reach and is not affected by EMI.
13. **B.** Form factor alone does not prove speed, wavelength, fiber, reach, or device support.
14. **C.** Every leaf connects to every spine.
15. **B.** `/27` blocks are 32 addresses; 77 lies in 64–95.
16. **B.** Eight total minus network and broadcast gives six normal usable hosts.
17. **C.** `169.254.0.0/16` is IPv4 link-local/APIPA.
18. **B.** VXLAN uses a 24-bit VNI and UDP/IP overlay.
19. **B.** Zero Trust evaluates every access request using identity/context and least privilege.
20. **C.** `fe80::/10` is link-local; a zone identifies the local interface.
21. **A.** NAT64/DNS64 synthesizes/reaches IPv4 services from an IPv6-only client.

## Domain 2

22. **Add VLAN 20 to SW2's allowed list on the intended trunk.** Verify with `show interfaces trunk` and `show vlan brief` (plus interface/STP evidence if needed), then test VLAN 20 end to end without changing the native VLAN or allowing every VLAN.
23. **B.** Longest prefix wins, so `/16` is selected over `/8`.
24. **B.** The backup remains unused while the lower-AD primary exists.
25. **A.** OSPF is link-state.
26. **B.** PAT records translated source ports so many flows can share an address.
27. **A.** Clients use a resilient virtual gateway address.
28. **B.** Multiple VLANs reach tagged router subinterfaces over an 802.1Q trunk.
29. **A.** `show vlan brief` displays VLAN membership for access ports.
30. **A.** Native VLAN handling applies to untagged trunk traffic.
31. **B.** Redundant Layer 2 forwarding paths otherwise create loops/storms.
32. **B.** PortFast is intended for trusted endpoint edge ports, not switch links.
33. **A.** Member consistency is required before bundling.
34. **B.** 5 GHz normally offers more channel options and shorter propagation than 2.4 GHz.
35. **A.** Enterprise modes use 802.1X/EAP with an AAA server such as RADIUS.
36. **B.** Strong signal cannot solve crowded airtime.
37. **A.** Directional antennas focus energy toward the remote bridge.
38. **C.** `6×25 + 10×7 = 150 + 70 = 220 W`.
39. **A.** The demarc defines the service handoff/responsibility boundary.

## Domain 3

40. **Precheck:** approval/window, current config/backup, VLAN/trunk/STP state, reachability, and rollback access. **Implement:** create VLAN 40, assign required ports, add it to the intended trunk while recording commands. **Postcheck:** VLAN/trunk state, MAC learning, gateway and application path, and no impact to existing VLANs. **Trigger:** defined validation failure or unexpected impact. **Rollback:** remove the new assignment/trunk allowance or restore the saved known-good configuration, then revalidate and document.
41. **B.** A rack diagram maps devices to rack units.
42. **B.** A golden configuration is an approved restoration baseline.
43. **C.** SNMPv3 supports authentication and privacy.
44. **B.** Flow data summarizes conversations without necessarily storing payload.
45. **B.** Tune baseline/threshold and apply known maintenance context.
46. **A.** Syslog 0 is Emergency; lower numbers are more severe.
47. **A.** RPO defines tolerable data loss measured in time.
48. **B.** RTO must include usable end-to-end service restoration.
49. **C.** A hot site has the greatest readiness and normally higher cost.
50. **A.** DHCP Discover begins DORA for a client without a lease.
51. **A.** A relay/IP helper forwards the broadcast exchange to a remote server.
52. **B.** PTR is used in reverse DNS.
53. **A.** An authoritative server owns the zone's final data.
54. **A.** AD from a validating resolver indicates authenticated data validation.
55. **B.** Split tunnel sends only selected routes through the VPN.
56. **A.** OOB can remain reachable when the production network is unavailable.

## Domain 4

57. **Default deny.** Guest: DHCP/DNS and Internet only, deny internal zones. IoT: DHCP/DNS as needed plus controller and NTP only, deny user/management. Users: permit HTTPS to the stated server service, deny management plane. Management: permit authorized admin sources to device management ports. Log important denies and return traffic according to stateful/stateless behavior.
58. **A.** PKI manages certificate trust that binds identity to public keys.
59. **C and D.** Fingerprint is inherence; hardware token is possession. Password, PIN, and security question are knowledge.
60. **A.** TACACS+ is commonly used for device administration and separates AAA functions.
61. **B.** Access is limited to what the subject needs for its task and duration.
62. **A.** MAC flooding attempts to exhaust the switch table.
63. **A.** Forged ARP mappings support on-path redirection.
64. **A.** A copied SSID designed to attract clients is an evil twin.
65. **A.** DHCP snooping controls server messages and creates trusted bindings.
66. **A.** DAI uses bindings to reject inconsistent ARP messages.
67. **A.** A DMZ/screened subnet limits exposure of internal networks.
68. **A.** Disabled, unused-VLAN ports reduce unauthorized access.
69. **B.** WEP and TKIP are obsolete/insecure.

## Domain 5

70. Query the configured resolver directly with `nslookup`/`dig`; test reachability and UDP/TCP 53 to that resolver; compare another known name or query an approved alternate resolver. The likely fault domain is DNS/resolver path, not basic IP routing. After correction, verify name resolution and the actual HTTPS application, not ping alone.
71. **B.** Identify the problem before forming or testing a fix.
72. **A.** Rebooting can erase useful volatile evidence.
73. **A.** CRC growth points to physical/link corruption such as cable, termination, EMI, or duplex issues.
74. **A.** Late collisions are associated with half/full duplex mismatch or excessive collision-domain problems.
75. **A and B.** Optics/fiber compatibility and connector cleanliness directly affect light/link.
76. **A.** Administrative shutdown is intentional configuration state.
77. **A.** Trunk allowance/native/operational state is the direct evidence.
78. **A.** Direction, attachment point, or an earlier match commonly explains zero hits.
79. **A.** Two-way communication requires a valid return path.
80. **A.** APIPA commonly appears after DHCP failure.
81. **A.** Correlate ARP/MAC movement and address-assignment records.
82. **A.** Successful IP access with failed name resolution isolates DNS.
83. **A.** Jitter is delay variation and harms real-time media.
84. **A.** Retransmission is TCP's response to missing/unacknowledged data.
85. **A.** ICMP success does not prove TCP 443 or the service is permitted/listening.
86. **C.** Filtering/no response prevents a definite open/closed result.
87. **A.** TDR estimates distance to copper faults; OTDR is for fiber.
88. **A.** A protocol analyzer decodes those packet-level events.
89. **A.** Routers may suppress/limit probe replies while forwarding normal traffic.
90. **B.** Verification includes end-to-end service, expected evidence, and documentation.
