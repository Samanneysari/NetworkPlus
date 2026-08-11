# 200 Original Network+ N10-009 Practice Questions

These questions are independently written and are not exam dumps. Complete them before opening the answer key. When a question asks for the first action, choose the safest evidence-gathering step.

## 1.1 — OSI, TCP/IP, TCP/UDP, and TLS

1. A network cable is disconnected. At which OSI layer does the problem begin? A) Physical B) Network C) Session D) Application
2. Which value does a Layer 2 switch use to forward a known unicast frame? A) TCP port B) Destination MAC C) URL D) Username
3. What is the Layer 3 protocol data unit? A) Frame B) Packet C) Bit D) Session
4. Write the three TCP opening messages in order.
5. Which statement best describes UDP? A) Built-in acknowledgments B) Connectionless with less overhead C) Guaranteed ordering D) TLS is mandatory
6. What does a TLS client primarily establish by validating a certificate? A) Router speed B) The identity-to-public-key trust chain C) Server MAC D) Private IP ownership
7. HTTPS timing shows DNS=5 ms, TCP=20 ms, TLS=25 ms, and first byte=4 seconds. Which area is most likely slow? A) Client cable B) Application/backend C) DNS D) TCP handshake
8. Put application data, segment/datagram, packet, frame, and bits in encapsulation order.

## 1.2 — Appliances and functions

9. Which technology best provides block storage to a hypervisor? A) NAS B) SAN C) Proxy D) AP
10. Which component distributes web requests among healthy backends? A) Load balancer B) Patch panel C) Passive IDS D) Modem
11. State the primary operational difference between IDS and IPS.
12. Which component enforces outbound web policy on behalf of clients? A) Forward proxy B) Reverse proxy C) SAN D) PDU
13. Which device routes between IP broadcast domains? A) Hub B) Router C) Patch panel D) Repeater
14. Give two QoS functions and one limitation.
15. What happens to TTL at each router, and why?
16. Name two important effects of a CDN.

## 1.3 — Cloud

17. In IaaS, who normally patches the guest operating system? A) Customer B) Registrar C) End user's ISP D) Nobody
18. Automatically adding instances under load and removing them afterward is: A) Multitenancy B) Elasticity C) Encapsulation D) Attenuation
19. How does a stateful security group differ from a stateless network ACL?
20. Which option provides dedicated on-premises-to-cloud connectivity? A) Direct connection B) Public DNS C) APIPA D) Captive portal
21. Which deployment combines private/on-premises and public cloud? A) Hybrid B) SaaS C) Full mesh D) Community string
22. Define NFV and give one example.
23. In SaaS, which items usually remain customer responsibilities? A) Disks and cabling B) Data and user access C) Hypervisor and firmware D) Data-center power
24. Explain horizontal versus vertical scalability.

## 1.4 — Ports, protocols, and traffic

25. What is the default SSH/SFTP port? A) 21 B) 22 C) 23 D) 25
26. Which ports are used by DHCPv4 server and client respectively? A) 53/53 B) 67/68 C) 68/67 D) 161/162
27. Why does DNS need TCP 53 as well as UDP 53?
28. Which pair is the safer default choice? A) Telnet/FTP B) SSH/SFTP C) HTTP/TFTP D) LDAP/Telnet
29. What are the normal SNMP poll and trap ports? A) 161/162 B) 162/161 C) 389/636 D) 514/587
30. Sending to one selected instance among servers sharing an address is: A) Broadcast B) Multicast C) Anycast D) Local unicast
31. What can IPsec ESP provide that GRE alone cannot? A) Encapsulation B) Confidentiality C) IP addressing D) A tunnel
32. What is an ephemeral client port, and why is it needed?

## 1.5 — Media and connectors

33. Which medium is best for a long EMI-resistant backbone? A) UTP B) Single-mode fiber C) Short coax D) RJ11
34. Which compact connector is common on fiber transceivers? A) LC B) F-type C) RJ11 D) BNC
35. What is the main benefit of MPO/MTP? A) Multiple fibers in one connector B) PoE C) DNS conversion D) Encryption
36. Why do identically shaped SFPs not guarantee compatibility? Give two factors.
37. Where is plenum-rated cable intended to be used?
38. Compare multimode and single-mode fiber by core and distance.
39. Which connector is common on cable modems? A) ST B) F-type C) LC D) RJ45
40. State the most important fiber-safety rule.

## 1.6 — Topology

41. In which architecture does every leaf connect to every spine? A) Three-tier B) Spine-leaf C) Bus D) Ring
42. Traffic between workloads inside a data center is: A) North-south B) East-west C) Broadcast D) Out-of-band
43. Give one advantage and one disadvantage of full mesh.
44. Which layers are combined in a collapsed core?
45. Branches connected through a common central site form: A) Hub-and-spoke B) Full mesh C) Ad hoc D) SAN
46. Compare the effect of one endpoint-cable failure and the central-device failure in a star.
47. Explain point-to-point versus mesh.
48. Name the three layers of three-tier architecture.

## 1.7 — IPv4

49. Which address is RFC 1918 private? A) `172.20.5.4` B) `172.32.1.1` C) `192.0.2.5` D) `8.8.8.8`
50. A client has `169.254.22.8`. Which service should be investigated first? A) NTP B) DHCP C) SMTP D) SNMP
51. What is the network address of `192.0.2.77/27`?
52. What is the broadcast of `198.51.100.64/26`?
53. How many normal usable hosts fit in `/29`? A) 4 B) 6 C) 8 D) 14
54. What problem does VLSM solve?
55. Why is a private IP not a complete security control?
56. What are common uses of `/32` and `/31`?

## 1.8 — Modern networking

57. Application-aware WAN path selection is a feature of: A) SD-WAN B) ARP C) SAN D) STP
58. VXLAN normally carries a Layer 2 frame inside: A) UDP over Layer 3 B) Coax C) SMTP D) USB
59. What advantage does a 24-bit VNI have over a VLAN ID?
60. Zero Trust emphasizes: A) Trust every LAN host B) Identity, posture, and least privilege C) No authentication D) Public IP only
61. Which two broad areas does SASE combine?
62. Give two source-control benefits for IaC and one risk.
63. What operational cost does dual stack create?
64. Which client/destination combination is served by NAT64/DNS64?

## 2.1 — Routing

65. A destination matches both `/16` and `/24`. Which route wins, and why?
66. Which value selects between route sources advertising the same prefix? A) MTU B) Administrative distance C) TTL D) VLAN ID
67. How is a floating static route created?
68. How does PAT distinguish several clients sharing one public IP?
69. What problem does FHRP solve?
70. What routing type and algorithm does OSPF use?
71. Why are metrics from different routing protocols not directly compared?
72. What roles do subinterfaces and 802.1Q play in router-on-a-stick?

## 2.2 — Switching

73. What normally happens to an unknown unicast? A) Always drop B) Flood inside its VLAN C) Route to Internet D) Encrypt
74. What does a trunk carry on one physical link?
75. What symptoms or risks can a native-VLAN mismatch create?
76. Why does STP place some ports in discarding/blocking state?
77. Define a root port.
78. What does LACP solve, and how is one flow normally distributed?
79. Jumbo frames are enabled on only part of a path. What problem is likely?
80. Where and why are PortFast and BPDU Guard commonly paired?

## 2.3 — Wireless

81. In many regulatory domains, which 20 MHz 2.4 GHz channels do not overlap? A) 1/6/11 B) 2/7/12 C) 36/40/44 D) The answer is globally identical
82. What trade-off comes with greater channel width?
83. Explain SSID versus BSSID.
84. WPA3-Personal primarily uses: A) SAE B) WEP C) PAP D) GRE
85. Which technologies provide individual enterprise WLAN identity?
86. Why is a hidden SSID not strong security?
87. Does antenna gain create energy? Explain.
88. How does a lightweight AP differ operationally from an autonomous AP?

## 2.4 — Physical installation

89. Compare MDF and IDF.
90. Give two reasons to install heavy devices low in a rack.
91. What problem does hot-aisle/cold-aisle design reduce?
92. Compare PDU and UPS roles.
93. Define PSE and PD with examples.
94. An AP boots but limits radio features. What should be checked first? A) DNS MX B) PoE class/budget C) SOA serial D) BGP AS path
95. What risks come from very low and very high humidity?
96. Why is consistent labeling at both cable ends important?

## 3.1 — Documentation and change

97. Compare physical and logical diagrams.
98. Name three types of data that IPAM should manage.
99. Distinguish EOL from EOS.
100. Name four essential elements of a production change plan.

101. What is a golden configuration, and how does it differ from running configuration?
102. A backup has never been restored. What is the main risk?
103. Why is a wireless heatmap incomplete without band and time information?
104. Name four decommissioning tasks besides powering off a router.

## 3.2 — Monitoring

105. What does an SNMP MIB define?
106. Why is SNMPv3 preferred to v2c?
107. Compare polling and traps, and explain why both are useful.
108. Which data best shows who communicated and how much without full payload? A) Flow data B) Full capture C) Rack diagram D) SOA
109. What can happen when a port-mirror destination is oversubscribed?
110. What do Syslog severities 0 and 7 mean?
111. Why should a baseline include time and season?
112. Name three SIEM functions and one thing it does not replace.

## 3.3 — Disaster recovery

113. What general data-protection requirement follows from a 10-minute RPO?
114. What does a two-hour RTO mean?
115. Compare MTTR and MTBF.
116. Which recovery site has the lowest readiness and usually longest RTO? A) Hot B) Warm C) Cold D) Active-active
117. What important data challenge exists in active-active designs?
118. Why does a tabletop not replace a practical restore test?
119. What ransomware weakness affects always-connected backups?
120. Are daily backup and a cold site suitable for RPO=5 minutes and RTO=30 minutes? Explain.

## 3.4 — DHCP, DNS, and time

121. Write the four DORA messages in order.
122. Why is a DHCP relay needed?
123. Compare a reservation and an exclusion.
124. Without cache, which three DNS hierarchy levels are asked for `www.realsam.ir`?
125. What data do A, AAAA, MX, and CNAME records contain?
126. In which namespace is the PTR for `192.0.2.80` queried, and name one use.
127. What does DNSSEC protect, and what does it not encrypt?
128. Describe NTP, PTP, and NTS in one phrase each.

## 3.5 — Access and management

129. Compare site-to-site and client-to-site VPNs.
130. Give one benefit and one risk of split tunneling.
131. During what failure is out-of-band management most valuable?
132. Why is a jump host a sensitive asset, and how should it be protected?
133. Why must an SSH host key be verified through a trusted channel?
134. Name three security characteristics of an API token.
135. What type of access is a clientless VPN best suited for?
136. Why do console connections still need physical control and authentication?

## 4.1 — Security concepts

137. Separate threat, vulnerability, and exploit in an old-firmware scenario.
138. Name the three members of the CIA triad.
139. What weakness remains when data-at-rest encryption lacks key management?
140. Name four TLS certificate checks.
141. Are two different passwords MFA? Explain.
142. Compare authentication, authorization, and accounting.
143. How do least privilege and RBAC relate?
144. Why does compliance not equal complete security?

## 4.2 — Attacks

145. Compare DoS and DDoS.
146. Give three defenses against VLAN hopping.
147. Which table does MAC flooding target, and name one defense.
148. How can ARP poisoning create an on-path position?
149. Name two dangerous options a rogue DHCP server can supply.
150. What is an evil twin, and how does enterprise Wi-Fi reduce the risk?
151. Why does DoH alone not prevent poisoned authoritative DNS data?
152. Give one control each for phishing, tailgating, and dumpster diving.

## 4.3 — Defensive features

153. Name four early hardening actions for a new switch.
154. Name the three 802.1X roles.
155. How does DHCP Snooping help DAI?
156. Why must the DHCP uplink be trusted while user ports remain untrusted?
157. State two important top-to-bottom ACL processing rules.
158. Why might an ACL need both UDP/53 and TCP/53 for DNS?
159. What failure domain does a screened subnet/DMZ isolate?
160. Compare URL filtering and content filtering.

## 5.1 — Troubleshooting methodology

161. What is the first troubleshooting stage, and name three key questions.
162. When is divide-and-conquer useful?
163. Why collect evidence before clearing counters or restarting?
164. What makes a good troubleshooting theory?
165. If a theory is rejected, what is the correct next step? A) Make many undocumented changes B) Build the next theory or escalate C) Delete logs D) Claim success
166. What roles do success criteria and rollback play?
167. Why is verification incomplete after one successful ping?
168. Name five items for the final ticket.

## 5.2 — Cabling and interfaces

169. Increasing CRC errors point to which area? Give three causes.
170. Late collisions are a classic sign of what?
171. Why does simple cable continuity not certify network speed?
172. A fiber link stays down. Name four compatibility checks.
173. Compare `administratively down` and `down/down`.
174. Why is bouncing an err-disabled port without finding the cause a poor fix?
175. What AP symptoms may appear when the PoE budget is exhausted?
176. How do you distinguish an old counter from a current fault?

## 5.3 — Services, switching, and routing

177. Name three Layer 2 loop symptoms.
178. Is STP discarding always a fault? Explain.
179. VLAN 20 fails only beyond the second switch. Name four trunk/STP checks.
180. An ACL hit counter is zero. Give two likely configuration causes.
181. A forward route exists but no reply returns. Which route is often forgotten?
182. A client can ping a remote IP but cannot open names. Which area is most likely?
183. How can DHCP pool exhaustion be distinguished from complete server failure?
184. What ARP/connection symptoms can a duplicate IP create?

## 5.4 — Performance

185. Distinguish bandwidth, throughput, and goodput.
186. Which application is most sensitive to jitter? A) Real-time voice/video B) Offline file C) Inventory D) Zone file
187. What approximate upper limit does a 100 Mb/s bottleneck impose between gigabit LANs?
188. What do TCP retransmission and zero-window events suggest respectively?
189. Why is one speed test not proof of an ISP fault?
190. Wi-Fi RSSI is good but performance is poor. Name three other causes.
191. Why can adding APs without a channel plan make performance worse?
192. How do DNS, TCP, TLS, and first-byte timings isolate web slowness?

## 5.5 — Tools

193. Which two modern Linux commands display addresses and routes?
194. What does ping prove, and what does it not prove?
195. What different troubleshooting questions do `dig` and `traceroute` answer?
196. Which Linux tool displays listening sockets?
197. Interpret Nmap states `open`, `closed`, and `filtered`.
198. What are cable tester, TDR, and OTDR used for?
199. What information do LLDP/CDP reveal, and why can that be sensitive on edge ports?
200. DNS works and TCP/443 connects, but TLS reports a hostname mismatch. Which tool and certificate field should be checked?

Review the [explained answer key](answers.md) only after completing the questions.
