# Explained Answer Key

Compare the reasoning, not only the final letter.

## Answers 1–25

1. **A, Physical.** Missing media or signal begins at Layer 1 and affects every higher layer.
2. **B, destination MAC.** The source MAC is learned; the destination MAC drives forwarding.
3. **B, packet.** Frame is Layer 2; packet is Layer 3; segment/datagram is Layer 4.
4. **SYN → SYN-ACK → ACK.** Sequence and acknowledgment values establish two-way TCP state.
5. **B.** UDP is connectionless and has no built-in acknowledgment, ordering, or retransmission.
6. **B.** The certificate and CA chain bind a verified identity/hostname to a public key.
7. **B.** Four seconds after TLS but before the first byte points to application/backend processing.
8. **Data → segment/datagram → packet → frame → bits/signals.** Decapsulation is the reverse.
9. **B, SAN.** SAN provides blocks; NAS provides files.
10. **A, load balancer.** Health checks should remove unhealthy backends.
11. IDS generally observes and alerts; IPS is inline and can block/drop traffic.
12. **A, forward proxy.** A reverse proxy represents inbound servers.
13. **B, router.** A capable Layer 3 switch can also route.
14. Classification/marking and queue priority are examples; QoS cannot create bandwidth.
15. TTL decreases by one per router and is discarded at zero to stop endless loops.
16. It lowers user latency and origin load; it can also improve scale and DDoS absorption.
17. **A, customer.** In IaaS the customer manages guest OS and applications.
18. **B, elasticity.** Scalability permits growth; elasticity adjusts capacity dynamically.
19. Stateful groups recognize return traffic; stateless ACLs need explicit rules in both directions.
20. **A, direct connection.** It is dedicated; encryption still needs explicit verification.
21. **A, hybrid.** It integrates private/on-premises and public cloud.
22. NFV implements a network function in software, such as a virtual firewall.
23. **B, data and user access.** The shared-responsibility model never removes those duties.
24. Horizontal scaling adds nodes; vertical scaling adds resources to one node.
25. **B, 22.** Both SSH and SFTP normally use TCP/22.

## Answers 26–50

26. **B, server 67 and client 68.** A relay carries the exchange across subnets.
27. Large answers, DNSSEC, truncation retry, and zone transfer can require TCP.
28. **B, SSH/SFTP.** The other pairs include clear-text or unprotected protocols.
29. **A, 161/162.** Polls normally reach agents on 161; traps reach managers on 162.
30. **C, anycast.** Routing selects one suitable instance.
31. **B, confidentiality.** GRE encapsulates but does not encrypt or authenticate by itself.
32. It is a temporary client port that distinguishes simultaneous conversations in the five-tuple.
33. **B, single-mode fiber.** It supports long distances and is immune to EMI.
34. **A, LC.** It is compact and common on SFP-family optics.
35. **A.** MPO/MTP carries several fibers in one connector.
36. Speed, wavelength, fiber type, reach, encoding, and vendor support may differ.
37. Air-handling/plenum spaces, subject to local fire and building rules.
38. Multimode has a larger core and shorter typical reach; single-mode has a smaller core and longer reach.
39. **B, F-type.** BNC is also coaxial but less common for consumer cable modems.
40. Never look into a fiber; disconnect and inspect with approved tools.
41. **B, spine-leaf.** Each leaf receives paths through every spine.
42. **B, east-west.** North-south enters or leaves the data center.
43. Advantage: redundancy and many paths. Disadvantage: link, port, cost, and management growth.
44. Distribution and core.
45. **A, hub-and-spoke.** The hub needs redundancy and capacity.
46. One endpoint cable affects one endpoint; central-device failure can affect the entire star.
47. Point-to-point directly joins two endpoints; mesh creates several paths among several nodes.
48. Access, distribution, and core.
49. **A, `172.20.5.4`.** The private block is `172.16.0.0/12`.
50. **B, DHCP.** APIPA commonly appears when normal address configuration fails.

## Answers 51–75

51. **`192.0.2.64/27`.** A `/27` block size is 32; 77 lies in 64–95.
52. **`198.51.100.127`.** The `/26` block runs from 64 through 127.
53. **B, 6.** Eight total addresses minus network and broadcast.
54. It permits differently sized subnets to reduce address waste.
55. Internal threats, malware, VPNs, and routing can still reach private addresses; policy is required.
56. `/32` is one host route; `/31` is commonly a two-endpoint point-to-point link.
57. **A, SD-WAN.** It applies central policy across several transports.
58. **A, UDP over Layer 3.** A VTEP encapsulates and decapsulates.
59. It provides roughly 16 million segment identifiers, far more than 12-bit VLAN IDs.
60. **B.** Decisions use identity, posture, context, and least privilege.
61. WAN/SD-WAN capabilities and cloud-delivered security/SSE.
62. Review/audit and rollback/repeatability are benefits; committed secrets or harmful automation are risks.
63. Both stacks require routing, firewalling, monitoring, and troubleshooting skills.
64. An IPv6-only client reaching an IPv4-only destination.
65. `/24` wins because it is the longest, most specific matching prefix.
66. **B, administrative distance.** It compares route-source preference locally.
67. Configure a backup static route with an AD higher than the primary source.
68. It translates and tracks unique source ports with the public address.
69. It provides a virtual default gateway and router failover.
70. OSPF is a link-state IGP using SPF calculation over the LSDB.
71. Each protocol defines a different metric scale; AD selects the source first.
72. Each subinterface represents a VLAN, and 802.1Q identifies that VLAN on the trunk.
73. **B.** It is flooded to forwarding ports in the same VLAN except the incoming port.
74. Several VLANs, normally identified by 802.1Q tags.
75. Untagged traffic may enter the wrong VLAN, creating connectivity or security problems.

## Answers 76–100

76. To break Layer 2 loops and prevent storms, duplicate frames, and MAC instability.
77. The best port from a non-root switch toward the root bridge.
78. LACP forms a logical bundle; one flow is normally hashed to one member.
79. Large packets may be dropped or fragmented, producing PMTUD black holes.
80. On endpoint edge ports; PortFast speeds forwarding and BPDU Guard blocks unexpected switches.
81. **A, 1/6/11** where local regulation permits. The regulatory domain always matters.
82. More potential capacity but more spectrum use, overlap, and contention.
83. SSID is the WLAN name; BSSID identifies one radio/cell.
84. **A, SAE.** It improves resistance to offline shared-secret guessing.
85. WPA2/3-Enterprise, 802.1X/EAP, RADIUS, and correct certificate validation.
86. It does not add authentication or encryption and the name can still be discovered.
87. No. It reshapes the radiation pattern, increasing energy in some directions at the expense of others.
88. A lightweight AP receives policy from a controller; an autonomous AP is configured independently.
89. MDF is the central distribution/backbone point; IDF serves a nearer floor or area.
90. It lowers the center of gravity and reduces fall/rail-loading risk.
91. It reduces mixing of hot exhaust and cool intake air.
92. A PDU distributes/measures power; a UPS supplies temporary protected power.
93. PSE supplies PoE, such as a switch; PD consumes it, such as an AP.
94. **B, PoE class/budget.** Insufficient power can disable features.
95. Very low humidity increases ESD; very high humidity causes condensation and corrosion.
96. It speeds safe troubleshooting and prevents disconnecting the wrong circuit.
97. Physical shows location/media/ports; logical shows VLANs/subnets/routes/zones.
98. Prefixes/subnets, address assignments, reservations, DNS names, and owners are valid examples.
99. EOL is the vendor life/sales stage; EOS is the end of support/security updates.
100. Scope/impact, procedure, approval/window, backup/rollback, and success criteria; any four.

## Answers 101–125

101. Golden configuration is an approved reference; running configuration is current live state and may drift.
102. The backup may be incomplete, unreadable, dependency-missing, or too slow to meet RTO.
103. Different bands, clients, times, and loads produce different coverage and capacity results.
104. Remove from DNS/IPAM/monitoring, revoke accounts/certificates, erase data, update records, and dispose securely; any four.
105. It defines the structure and meaning of SNMP object identifiers and their data.
106. SNMPv3 supports authentication and privacy; v2c relies on a weak community string.
107. The manager initiates polls; the agent sends traps on events. Traps can be lost and failed devices cannot report total failure.
108. **A, flow data.** It summarizes conversations without full packet payload.
109. Mirrored packets may be dropped, making the capture incomplete.
110. 0 is Emergency/most severe; 7 is Debug/least severe.
111. Normal business-hour, backup-window, and seasonal behavior differ.
112. Collection, normalization, and correlation/alerting; it does not replace analysts or response procedures.
113. Backup/replication intervals and recovery must limit data loss to ten minutes.
114. The service must be restored within two hours of the incident.
115. MTTR is average repair time and lower is better; MTBF is time between failures and higher is better.
116. **C, cold.** It requires the most preparation.
117. State consistency, replication, split brain, and session ownership.
118. A tabletop cannot prove real backup integrity, dependencies, or restoration timing.
119. The same malware or stolen credentials can encrypt/delete the connected backup.
120. No. Daily backup violates the RPO, and a cold site is unlikely to meet the RTO.
121. Discover, Offer, Request, Acknowledgment.
122. DHCP client broadcasts do not cross routers; the relay forwards them with source-subnet information.
123. A reservation gives a specific client a fixed lease; an exclusion prevents dynamic assignment.
124. Root, `.ir` TLD, and authoritative `realsam.ir` servers.
125. A=IPv4, AAAA=IPv6, MX=mail target plus preference, CNAME=alias target.

## Answers 126–150

126. `80.2.0.192.in-addr.arpa`; mail reputation and troubleshooting are common uses.
127. It authenticates origin and integrity of DNS data; it does not encrypt the query.
128. NTP=general time, PTP=high-precision local time, NTS=security for NTP.
129. Site-to-site joins networks through gateways; client-to-site joins one endpoint.
130. Benefit: less central bandwidth. Risk: reduced visibility/control and dual-path exposure.
131. When production routing or the management data network is unavailable.
132. It concentrates administrative access, so harden, patch, MFA-protect, restrict, record, and monitor it.
133. Otherwise an attacker can present a false key and become an accepted on-path endpoint.
134. Scoped least privilege, short lifetime/rotation, protected storage, and auditability; any three.
135. Browser-based access to a limited application without a full network client.
136. Physical access can expose configuration and secrets; console requires control, AAA, and logs.
137. Threat=attacker/worm, vulnerability=old firmware flaw, exploit=method or request using it.
138. Confidentiality, integrity, and availability.
139. The key can be stolen with the data or lost; rotation, access, recovery, and revocation are unmanaged.
140. Chain/signature, validity dates, SAN/hostname, key usage, and revocation; any four.
141. No. Both are the same knowledge factor.
142. Authentication proves identity, authorization grants permissions, accounting records actions.
143. RBAC manages permissions through roles; the roles must be designed for least privilege.
144. Compliance covers minimum requirements and defined scope, not every threat or misconfiguration.
145. DoS uses one or limited sources; DDoS uses many distributed sources.
146. Static access mode/DTP disabled, unused native VLAN, restricted allowed list, and patching; any three.
147. The CAM/MAC table; port security or 802.1X is a defense.
148. A false ARP mapping sends gateway-bound frames to the attacker's MAC.
149. A malicious default gateway and DNS server.
150. It is an AP imitating a trusted SSID; enterprise authentication plus correct server-certificate validation prevents trusting a false authentication server.

## Answers 151–175

151. DoH encrypts only client-to-resolver transport; DNSSEC or resolver trust validates authoritative data.
152. Phishing: resistant MFA/filtering; tailgating: badge/mantrap; dumpster diving: shredding.
153. Inventory/owner, supported firmware, replace defaults, disable unused services, then secure AAA/management.
154. Supplicant, authenticator, and authentication server.
155. It builds trusted IP-MAC-VLAN-port bindings that DAI uses to validate ARP.
156. Only real server replies should arrive through the trusted path; trusting users permits rogue replies.
157. First match wins, and an implicit deny exists at the end.
158. Large responses, DNSSEC, retry after truncation, and transfers can require TCP.
159. It isolates public-facing services from internal LAN/backend systems.
160. URL filtering controls destinations/categories; content filtering analyzes transferred content.
161. Identify the problem; ask what fails, who is affected, when it began, what still works, and what changed.
162. When the responsible layer is unclear; a middle test divides the search space.
163. Clearing/restarting destroys state, trends, and root-cause evidence.
164. It is specific, evidence-based, testable, and can be rejected by a low-risk test.
165. **B.** Build the next theory from the result or escalate with evidence.
166. Success criteria define proof; rollback restores safe state if the change fails.
167. Ping tests limited ICMP behavior, not DNS, ports, TLS, authentication, or the application.
168. Scope/impact, timeline, evidence/root cause, action, verification, and prevention; any five.
169. Physical/duplex: damaged cable/connector, EMI/crosstalk, or duplex mismatch.
170. Duplex mismatch or invalid old collision-domain conditions.
171. Continuity does not measure crosstalk, insertion loss, return loss, and frequency performance.
172. Speed, wavelength, fiber type, reach/platform support, and polarity; any four.
173. Administratively down is configured off; down/down is enabled but has no physical link.
174. The protective cause remains, the port will fail again, and evidence may be lost.
175. Partial boot, radio/USB disabled, restart loops, or insufficient-power logs.

## Answers 176–200

176. Record value/time, clear only when authorized, reproduce traffic, and measure new increase rate.
177. High broadcasts/CPU, MAC flapping, duplicate frames, and broad instability; any three.
178. No. Discarding is normal loop prevention unless the topology or necessary path is wrong.
179. VLAN existence, allowed list on both ends, native match, STP state/guard, and LAG consistency.
180. Wrong interface/direction, an earlier rule matched, or traffic did not use that path.
181. The return route, plus return ACL/state/NAT.
182. DNS resolver, records, or UDP/TCP 53 path.
183. Existing leases continue while new clients fail and the scope shows full; total server failure affects renewals and all new requests.
184. Changing ARP-to-MAC mappings, duplicate warnings, and intermittent sessions.
185. Bandwidth is capacity, throughput is actual transfer, and goodput is useful application payload.
186. **A, real-time voice/video.** Changing delay disrupts playout buffers.
187. Less than 100 Mb/s of useful goodput because of the bottleneck and overhead.
188. Retransmission suggests loss/reordering; zero window means the receiver buffer is full.
189. Server, time, Wi-Fi/LAN, CPU, route, and protocol all influence one test.
190. Channel contention, retries/interference, client capability, AP load, backhaul, or roaming; any three.
191. It can increase co-channel/adjacent interference and contention; excess power also harms roaming.
192. The largest timing component points toward resolution, path/handshake, cryptography, or backend processing.
193. `ip address show` and `ip route show`.
194. It proves a sample ICMP exchange; it does not prove DNS, TCP/UDP ports, TLS, application, or complete MTU behavior.
195. `dig` tests name-resolution data; `traceroute` observes responding IP hops.
196. `ss -lntup`; `netstat` is an older alternative.
197. Open=accepted, closed=actively rejected, filtered=no conclusive reply due to filtering/loss.
198. Cable tester checks wire map/performance, TDR locates copper faults, OTDR locates fiber events.
199. Neighbor name, port, capabilities, VLAN, and management address; this can expose internal details.
200. Use `openssl s_client -connect IP:443 -servername name` or browser tools and inspect SAN/hostname validation.

## Score guide

- 170–200: strong foundation; focus on labs and time management.
- 140–169: good progress; revisit missed objectives with hands-on evidence.
- 100–139: reread weak chapters and perform matching labs.
- Below 100: restart with Chapter 0 and OSI in smaller study units.

This score does not officially predict exam results. Performance-based questions require practical skill.
