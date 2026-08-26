# N10-009 Full Practice Exam — Form D

**Time:** 90 minutes | **Questions:** 90 | **Materials:** closed book

Do not open the [answer key](form-d-answers.md) until the timer ends.

## Domain 1 — Networking Concepts (1–21)

1. **PBQ — Same versus remote subnet.** Host A is `10.1.10.20/24`, Host B is `10.1.10.80/24`, gateway is `10.1.10.1`, and Server C is `10.1.20.40/24`. For A→B and A→C, state the ARP target, Ethernet destination MAC, IP destination, and whether the gateway routes the packet.
2. Which OSI layer converts frames into signals/bits on media? A. Physical; B. Network; C. Transport; D. Application
3. Which duplex mode permits simultaneous sending and receiving? A. Simplex; B. Half-duplex; C. Full-duplex; D. Anycast
4. Each switch port in full-duplex Ethernet is normally what? A. Its own collision domain; B. One shared collision domain for the building; C. A routing protocol; D. A DNS zone
5. Which appliance stores files for users over SMB/NFS-like protocols? A. NAS; B. SAN block fabric only; C. IDS; D. Router
6. What does a passive IDS normally do? A. Observe and alert; B. Drop all matching traffic inline; C. Translate addresses; D. Supply DHCP
7. Which cloud model lets the customer deploy code while the provider manages OS/runtime infrastructure? A. PaaS; B. IaaS; C. DAS; D. On-premises only
8. What is multitenancy? A. Multiple customers share provider infrastructure with logical isolation; B. One cable has many pairs; C. One VLAN has many IP classes; D. One user has MFA
9. Which service normally receives SNMP traps on UDP 162? A. SNMP manager; B. DHCP client; C. DNS authoritative server; D. SMTP relay
10. Which protocol is an insecure clear-text remote terminal on TCP 23? A. Telnet; B. SSH; C. HTTPS; D. SFTP
11. Which protocol has lower overhead but no built-in delivery/order guarantee? A. UDP; B. TCP; C. TLS; D. SMB
12. Which traffic type delivers to subscribed group members? A. Multicast; B. Broadcast to everyone; C. Anycast to one; D. Unicast only
13. Which fiber type generally has the smaller core and longer reach? A. Single-mode; B. Multimode; C. Coax; D. Twinax
14. Which connector is compact and common on modern fiber transceivers? A. LC; B. BNC; C. F-type; D. RJ11
15. Workloads communicating inside a data center create what traffic? A. East-west; B. North-south; C. Broadcast only; D. Out-of-band only
16. What is the network address of `10.20.30.190/28`? A. `10.20.30.176`; B. `10.20.30.180`; C. `10.20.30.190`; D. `10.20.30.192`
17. What is the broadcast address of `192.0.2.208/28`? A. `.208`; B. `.222`; C. `.223`; D. `.224`
18. Which prefix identifies exactly one IPv4 host route? A. `/32`; B. `/31`; C. `/24`; D. `/0`
19. What does SSE represent within SASE? A. Cloud-delivered security services; B. Copper cable type; C. IPv4 class; D. STP state
20. Which technology separates/centralizes logical network control from forwarding? A. SDN; B. SMTP; C. SAN; D. SNMP trap
21. Which IPv6 prefix is reserved for documentation? A. `2001:db8::/32`; B. `ff00::/8`; C. `fe80::/10`; D. `::1/128`

## Domain 2 — Network Implementation (22–39)

22. **PBQ — OSPF adjacency.** Two lab routers on the same subnet fail to become neighbors. One is area 0 with hello/dead 10/40; the other is area 1 with 10/40. Identify the first mismatch, correction, verification command/output, and one additional adjacency check.
23. Which route sends all unknown traffic toward an ISP? A. Default route; B. Connected LAN only; C. Host route to gateway MAC; D. VLAN database
24. Why might a floating static route remain absent? A. A preferred route exists; B. DNS is cached; C. Wi-Fi uses WPA3; D. Fiber is clean
25. Which protocol uses a link-state database and SPF calculation? A. OSPF; B. BGP; C. RIP; D. ARP
26. What is the key difference between NAT and PAT? A. PAT also tracks transport ports so many flows can share an address; B. NAT is Layer 2; C. PAT encrypts; D. NAT creates SSIDs
27. What is a VIP in a first-hop redundancy design? A. Shared logical gateway address; B. Physical cable label; C. DNS text; D. SNMP version
28. Which switch interface supplies routing for a VLAN on a multilayer switch? A. SVI; B. SPAN destination; C. Access port only; D. Console cable
29. A trunk should carry VLANs 10 and 20 only. Which configuration is safest? A. Allowed list 10,20; B. Allow all forever; C. Disable tagging; D. Use two native VLANs
30. Why choose an unused native VLAN? A. Reduce exposure/mistakes involving untagged trunk traffic; B. Increase channel width; C. Replace STP; D. Provide DNS
31. Which STP protection should disable an edge port receiving a BPDU? A. BPDU Guard; B. DHCP snooping; C. DAI; D. NAT
32. An LACP bundle has four links. Will one flow normally use all four simultaneously? A. No, a flow is normally hashed to one member; B. Yes, every packet is copied to all members; C. Only with DNSSEC; D. Only at half-duplex
33. A switch and server disagree on speed/duplex. What should be done? A. Configure compatible settings, preferably matching auto-negotiation where supported; B. Change subnet mask; C. Add DNS record; D. Lower RTO
34. Which wireless width usually consumes the least spectrum? A. 20 MHz; B. 40 MHz; C. 80 MHz; D. 160 MHz
35. What is the purpose of SAE in WPA3-Personal? A. Stronger shared-secret authentication resistant to offline guessing; B. Assign IP addresses; C. Select channels; D. Route multicast
36. Which mode lets wireless clients communicate directly without an AP? A. Ad hoc; B. Infrastructure; C. Lightweight; D. Captive
37. What should a post-install WLAN survey validate? A. Coverage, capacity, authentication, roaming, and performance; B. SSID visibility only; C. Maximum AP power only; D. Internet speed once
38. Which power device provides short-term battery power during an outage? A. UPS; B. PDU only; C. Patch panel; D. Smart jack
39. Which environmental condition increases electrostatic-discharge risk? A. Very low humidity; B. Correct inlet temperature; C. Redundant power; D. Clean grounding

## Domain 3 — Network Operations (40–56)

40. **PBQ — Recovery selection.** Service X requires RPO 5 minutes and RTO 30 minutes. Compare nightly backup+cold site, five-minute replication+warm site, and synchronous/near-real-time replication+hot or active-passive service. Choose the plausible design and list three dependencies a test must include.
41. Which diagram is best for AP locations and wall materials? A. Floor plan/heat-map source; B. Route table; C. DNS zone; D. MAC table
42. What is an SLA? A. Measurable service commitment and responsibility agreement; B. IPv6 address method; C. Fiber connector; D. Attack
43. What should a decommission plan include? A. Data/config handling, inventory update, credential removal, disposal, and rollback/dependency checks; B. Leave the device powered forever; C. Publish configuration; D. Remove all logs first
44. Which configuration is currently active on many network devices? A. Running configuration; B. Startup only; C. Golden copy only; D. DNS SOA
45. Why use SNMP polling and traps together? A. Polling verifies state while traps provide event notification; either alone can miss failures; B. Both encrypt payload by default; C. They replace syslog; D. They configure VLANs
46. Which telemetry source centralizes timestamped device events? A. Syslog; B. TDR; C. PoE; D. BSSID
47. What should every alert runbook contain? A. Meaning, evidence, safe actions, owner, and escalation; B. Only severity; C. Passwords in clear text; D. No recovery condition
48. MTTR is six hours. What does it measure? A. Average repair/restoration duration; B. Data-loss window; C. Time between failures; D. Wi-Fi delay variation
49. Active-active means what? A. Multiple sites/nodes serve traffic simultaneously; B. One powered-off cold site; C. One manual backup; D. Two DNS records only
50. Which DHCP message confirms the lease parameters to the client? A. Acknowledge; B. Discover; C. Offer; D. Decline only
51. What happens if two DHCP scopes overlap? A. Duplicate/conflicting address assignment risk; B. Higher encryption; C. Faster STP; D. Lower fiber loss
52. Which DNS record identifies mail exchangers and priority? A. MX; B. A; C. PTR; D. TXT only
53. What does a recursive resolver do? A. Obtains answers on behalf of clients using cache/delegation; B. Hosts every zone authoritatively; C. Routes Ethernet; D. Provides PoE
54. Why increment an SOA serial after a zone change? A. Secondary servers use it to detect newer data; B. It changes TCP ports; C. It clears ARP; D. It raises MTU
55. Which VPN mode sends all client traffic through the tunnel? A. Full tunnel; B. Split tunnel; C. Clientless DNS; D. GRE-only local
56. What is in-band management? A. Management shares the production data network/path; B. Dedicated console network; C. Physical access only; D. No authentication

## Domain 4 — Network Security (57–69)

57. **PBQ — Firewall rule order.** Required policy: users may reach server TCP 443 and DNS UDP/TCP 53; guests may use DHCP/DNS and Internet but no internal subnets; all else denied. Write an ordered high-level rule set and state how counters/logs verify one permit and one deny.
58. What is a vulnerability? A. Weakness that could be exploited; B. Actor intent; C. Confirmed outage only; D. A backup
59. Which certificate field must match the requested hostname? A. Subject Alternative Name; B. TTL; C. VLAN ID; D. DHCP option
60. Which authentication factor is “something you know”? A. Password/PIN; B. Smart card; C. Fingerprint; D. Location
61. Which protocol carries identity assertions for federation/SSO? A. SAML; B. SNMP; C. SMTP; D. SLAAC
62. Which attack poisons a resolver/cache with false name data? A. DNS poisoning; B. MAC flooding; C. RF jamming; D. Cable short
63. What is RF jamming? A. Intentional interference that disrupts wireless availability; B. Correct channel planning; C. TLS encryption; D. VLAN tagging
64. Malware that encrypts files for payment is what? A. Ransomware; B. Ad hoc WLAN; C. Route leak; D. CDN
65. Which switch control validates ARP against trusted bindings? A. DAI; B. BPDU Guard; C. LACP; D. QoS
66. Which access approach evaluates endpoint health before full network admission? A. NAC posture assessment; B. NAT; C. DNS recursion; D. Anycast
67. Why segment IoT devices? A. Limit trust and lateral movement; B. Increase broadcast access; C. Disable monitoring; D. Avoid passwords
68. Which standard is specifically associated with payment-card data security? A. PCI DSS; B. GDPR only; C. EULA; D. MOU
69. What is the safest response to a suspected credential-phishing email? A. Do not use its links; report through the approved process and verify independently; B. Reply with password; C. Forward externally; D. Disable logs

## Domain 5 — Network Troubleshooting (70–90)

70. **PBQ — Multi-fault branch.** Voice VLAN phones lose calls; data clients are normal. Switch shows PoE allocated 99%, AP/phone power-deny events, voice queue drops, and no CRC growth. Prioritize the faults, state two immediate low-risk actions, and define verification.
71. Which troubleshooting method starts at Physical and moves upward? A. Bottom-up; B. Top-down; C. Divide-and-conquer at Layer 7 only; D. Random replacement
72. A theory test would disrupt production. What should happen? A. Assess impact, obtain approval/use maintenance or safer test, and prepare rollback; B. Run it secretly; C. Delete the ticket; D. Change several systems
73. Which cable fault means one conductor has no end-to-end continuity? A. Open; B. Short; C. Reversed pair only; D. Attenuation only
74. CRC errors increase after a patch cable is moved. What is the first low-risk action? A. Inspect/reseat or replace the suspect patch cable after recording counters; B. Rebuild DNS; C. Change OSPF; D. Disable firewall
75. Which tool visually identifies a short fiber break but must never be viewed directly? A. Visual fault locator; B. TDR; C. Multimeter; D. Nmap
76. A port shows `down/down`, no light, and zero received signal. Which layer should be checked first? A. Physical; B. Application; C. Session; D. DNS
77. An STP port is discarding on a redundant link but users work. Is this necessarily a fault? A. No, it may be preventing a loop; B. Yes, every port must forward; C. It proves DHCP failure; D. It is NAT
78. VLAN 20 is allowed on both trunk ends but fails; STP shows the VLAN blocked on the only intended path. What should be investigated? A. Topology/root/path design and STP state; B. DNS TTL; C. PoE budget; D. TLS SNI
79. A route for `10.0.0.0/8` exists, but `10.50.0.0/16` traffic follows another route. Why? A. The `/16` is more specific; B. `/8` always wins; C. ARP decides remote route; D. DNS chose it
80. Clients get correct IP/mask but wrong default gateway from DHCP. Where is the likely error? A. DHCP option/scope configuration; B. Cable length; C. AP channel; D. OSPF hello
81. A DNS server answers authoritatively with the wrong address. What should be corrected? A. Zone record/source data, then serial/cache considerations; B. Client cable; C. STP root; D. PoE class
82. NTP is blocked. Which operational evidence may become unreliable? A. Cross-system log correlation; B. Cable continuity; C. Fiber wavelength; D. VLAN tagging
83. Which performance issue is delay variation? A. Jitter; B. Latency average only; C. Bandwidth; D. Goodput
84. Which condition causes TCP retransmissions without physical CRC errors? A. Congestion/packet loss elsewhere in the path; B. DNS alias only; C. Correct full duplex; D. Strong Wi-Fi automatically
85. A Wi-Fi channel has low RSSI and low noise. What should be evaluated? A. AP placement/power/obstruction and client location; B. DNS MX; C. NAT translation; D. RPO
86. Which command displays Windows neighbor/ARP cache? A. `arp -a`; B. `tracert -d`; C. `netstat -r` only; D. `nslookup`
87. Which Linux command predicts the selected route/source/interface for one destination? A. `ip route get <address>`; B. `ss -lnt`; C. `dig SOA`; D. `tcpdump -D` only
88. Which tool tests whether copper pairs are correctly wired? A. Cable tester/wire mapper; B. Spectrum analyzer; C. Flow collector; D. Syslog
89. `Request timed out` means what? A. No expected reply arrived before the timer; it does not identify one unique cause; B. DNS definitely failed; C. Gateway definitely failed; D. Service definitely works
90. Which closure statement is best? A. “Corrected DHCP gateway option at 14:20, renewed two test clients, verified DNS/HTTPS and monitored 30 minutes; change CHG-42 documented”; B. “Network fixed”; C. “Rebooted everything”; D. “User stopped calling”
