# N10-009 Full Practice Exam — Form C

**Time:** 90 minutes | **Questions:** 90 | **Materials:** closed book

Do not open the [answer key](form-c-answers.md) until the timer ends.

## Domain 1 — Networking Concepts (1–21)

1. **PBQ — Office design.** A 30-user office needs wired clients, Wi-Fi, Internet routing, web filtering, shared files, and resilient power. Select one appropriate device/function for each requirement and identify the single points of failure that need redundancy.
2. Which PDU is created at OSI Layer 4? A. Segment/datagram; B. Packet; C. Frame; D. Bit
3. During decapsulation, what does a host remove immediately before processing the IP packet? A. Ethernet frame header/trailer; B. TLS certificate; C. DNS zone; D. Application user
4. Which table does a Layer 2 switch build from source MAC addresses? A. MAC/CAM table; B. Routing table; C. DNS cache; D. ARP table only
5. Which device enforces outbound web policy on behalf of clients? A. Forward proxy; B. Reverse proxy; C. NAS; D. AP controller
6. What is the primary benefit of a CDN? A. Place content closer to users and reduce origin load; B. Replace all DNS; C. Create VLAN trunks; D. Supply PoE
7. Which cloud connectivity option normally uses a provider/private circuit rather than the public Internet? A. Direct connection; B. Clientless VPN; C. NAT64; D. APIPA
8. Horizontal scalability means what? A. Add more nodes; B. Add CPU/RAM to one node; C. Reduce address space; D. Use half-duplex
9. Which protocol/port pair is correct? A. SNMP poll UDP 161; B. Syslog TCP 25 only; C. RDP UDP 53; D. DHCP server TCP 68
10. Which service normally uses TCP 636? A. LDAPS; B. HTTPS; C. SMTPS; D. TFTP
11. Which transport protocol provides sequence numbers, acknowledgments, and retransmission? A. TCP; B. UDP; C. ICMP; D. GRE
12. Which IPsec component negotiates keys/security associations? A. IKE; B. AH; C. TTL; D. ARP
13. Which copper medium is common for short high-speed direct-attach switch/server connections? A. Twinax/DAC; B. RG-6; C. Single-mode fiber without transceivers; D. Telephone cable
14. Which fiber connector combines many strands in one high-density connector? A. MPO/MTP; B. BNC; C. F-type; D. RJ11
15. Which architecture combines distribution and core functions? A. Collapsed core; B. Full mesh; C. Ad hoc; D. Point-to-point
16. What is the subnet mask for `/26`? A. `255.255.255.0`; B. `255.255.255.128`; C. `255.255.255.192`; D. `255.255.255.224`
17. What is the first usable host in `203.0.113.128/28`? A. `.128`; B. `.129`; C. `.142`; D. `.143`
18. Why does VLSM reduce waste? A. It assigns different prefix sizes to different needs; B. It removes subnet masks; C. It encrypts addresses; D. It replaces routing
19. Which architecture combines WAN connectivity with cloud-delivered security services? A. SASE; B. STP; C. SAN; D. SLAAC
20. What does IaC improve? A. Repeatability, review, and audit of intended configuration; B. Wireless signal; C. Fiber loss; D. Password sharing
21. Which IPv6 address is loopback? A. `::1`; B. `fe80::1`; C. `ff02::1`; D. `2001:db8::1`

## Domain 2 — Network Implementation (22–39)

22. **PBQ — Router-on-a-stick.** VLANs 10 and 20 use one router interface. Describe the switchport mode, two router subinterfaces, tag association, gateway addresses, and three verification checks. No vendor-specific advanced features are required.
23. Which static route catches destinations not matched by more-specific entries? A. Default route; B. Host route only; C. Connected route; D. Multicast group
24. A static route and OSPF route have equal prefix length. What normally wins with default preferences? A. Static route because of lower AD; B. OSPF because of higher metric; C. Both are VLANs; D. DNS decides
25. What does a routing metric compare? A. Paths learned by the same routing protocol; B. Cable connector color; C. User privileges; D. DNS records
26. In NAT terminology, what is the private address assigned to the inside host called? A. Inside local; B. Outside global; C. Virtual IP; D. Link-local MAC
27. What is a subinterface? A. Logical interface under a physical interface, often per VLAN; B. Separate power supply; C. Fiber strand; D. DNS alias
28. Which switchport mode carries one untagged endpoint VLAN? A. Access; B. Trunk; C. Routed WAN; D. SPAN destination only
29. Why should the allowed VLAN list be restricted? A. Limit unnecessary broadcast domains/exposure across the trunk; B. Increase every MTU; C. Disable STP; D. Replace ACLs
30. Which STP port is the best path from a non-root switch toward the root? A. Root port; B. Designated port on root only; C. Disabled port; D. Access VLAN
31. RSTP primarily improves what? A. Convergence after topology change; B. DNS security; C. PoE class; D. Fiber wavelength
32. Which EtherChannel mode pair can form an LACP bundle? A. Active-active; B. Passive-passive; C. On-PAgP only; D. Access-routed
33. Which maximum frame setting must be consistent across a jumbo-frame path? A. MTU; B. RPO; C. TTL start value only; D. DNS serial
34. Which band introduced Wi-Fi 6E operation? A. 6 GHz; B. 2.4 GHz only; C. 900 MHz; D. 60 kHz
35. What does MIMO use? A. Multiple radio paths/antennas; B. Multiple subnet masks on one packet; C. Two DNS zones; D. Serial console
36. Why is a captive portal not sufficient Wi-Fi security? A. Portal authentication does not itself encrypt the radio link; B. It blocks all users; C. It is a fiber connector; D. It always uses WPA3
37. A controller centrally manages many lightweight APs. What is the main operational benefit? A. Consistent policy and coordinated radio management; B. No cabling required; C. No security required; D. Infinite capacity
38. Which rack practice is safest? A. Install heavy equipment low and verify rails/capacity; B. Block exhaust; C. Mix A/B power into one failure path; D. Leave cables unlabeled
39. What should be checked when a PoE camera boots but disables features? A. Negotiated power/class and total budget; B. DNS MX priority; C. OSPF area only; D. TLS hostname

## Domain 3 — Network Operations (40–56)

40. **PBQ — DNS service.** Create a record plan for `app.lab.example` IPv4/IPv6, `www` alias, mail server, verification text, authoritative servers, and reverse lookup. Name the record type for each and give two validation commands.
41. Which document maps IP addresses, prefixes, owners, and status? A. IPAM record; B. Heat map only; C. Rack PDU; D. EULA
42. Why record firmware versions in inventory? A. Support lifecycle, vulnerability, compatibility, and change planning; B. Increase throughput; C. Resolve ARP; D. Choose DNS names
43. Which is a valid change-validation criterion? A. Users in VLAN 40 receive the expected address and reach the approved service; B. The command entered without error only; C. No one complained in one minute; D. Logs were deleted
44. What is configuration drift? A. Actual configuration departs from approved intended state; B. Wi-Fi client moves; C. NTP synchronizes; D. Fiber bends
45. Which protocol data should be restricted to a management network/VRF? A. SNMP management traffic; B. Public HTTP only; C. ARP inside one host; D. Audio files
46. What can SPAN/port mirroring do? A. Copy selected switch traffic to a sensor; B. Prevent every attack; C. Add PoE; D. Create backups
47. Why can a mirror destination miss packets? A. Oversubscription/drops at the mirror path; B. DNS TTL; C. Correct VLAN ID; D. NTS
48. RTO is four hours and actual test recovery is six hours. What is true? A. The design/test fails the RTO; B. RPO passed automatically; C. MTBF is four; D. No action is needed
49. Which continuity exercise discusses a scenario without switching production systems? A. Tabletop; B. Full interruption; C. Cable certification; D. Packet capture
50. A DHCP reservation primarily maps what? A. Client identifier/MAC to a consistent address; B. DNS alias to mail server; C. Port to VLAN; D. Fiber to wavelength
51. Which DHCP option normally supplies the default gateway? A. Router option; B. Lease-time only; C. DNSSEC key; D. NTP stratum only
52. Which DNS record points an alias to a canonical hostname? A. CNAME; B. PTR; C. MX; D. SOA
53. Which query asks for the IPv6 address of a name? A. AAAA; B. A; C. PTR; D. NS
54. What is the key difference between DoH and DoT? A. DoH uses HTTPS, while DoT uses a dedicated TLS service; B. Only DoT encrypts; C. DoH is DHCP; D. Both are routing protocols
55. Which time protocol is designed for higher precision in controlled networks? A. PTP; B. FTP; C. PPTP; D. PAT
56. A jump host should provide what? A. Controlled, logged administrative path; B. Anonymous Internet access; C. Broadcast amplification; D. Unencrypted passwords

## Domain 4 — Network Security (57–69)

57. **PBQ — Incident controls.** A switch log shows rapid MAC-table growth, DHCP offers from a user port, and ARP replies inconsistent with leases. Match each symptom to attack and defensive control, then state which port types should be trusted.
58. Which security objective keeps services usable when needed? A. Availability; B. Integrity; C. Confidentiality; D. Non-repudiation only
59. Encryption of stored configuration primarily protects what? A. Confidentiality; B. Route metric; C. VLAN membership; D. Signal strength
60. Which protocol commonly centralizes authentication for enterprise Wi-Fi? A. RADIUS; B. TDR; C. RTP; D. RIP
61. What is geofencing? A. Apply policy based partly on geographic location; B. Ground a rack; C. Shape fiber; D. Create a subnet mask
62. Which attack overwhelms a target from many distributed systems? A. DDoS; B. DAI; C. DNSSEC; D. DoT
63. What is an on-path attack? A. Attacker positions to observe/alter traffic between parties; B. Router selects longest prefix; C. AP uses 6 GHz; D. Switch learns MAC
64. A user is tricked into entering credentials on a fake login page. What is this? A. Phishing; B. LACP; C. FHRP; D. NTP
65. Which control shuts or restricts an access port after a MAC violation? A. Port security; B. DNSSEC; C. QoS; D. CDN
66. Which control prevents an endpoint from negotiating an unauthorized trunk? A. Explicit access mode and disabled negotiation; B. Higher TTL; C. Larger MTU; D. Public DNS
67. What does content filtering inspect beyond a destination URL? A. Content/type/payload characteristics according to policy; B. Fiber wavelength only; C. STP cost; D. PoE voltage only
68. Which agreement protects confidential information shared between parties? A. NDA; B. AUP; C. SLAAC; D. BCP
69. Why should legacy protocols such as Telnet be disabled? A. They expose credentials/data without modern protection; B. They reduce rack space; C. They create IPv6; D. They require fiber

## Domain 5 — Network Troubleshooting (70–90)

70. **PBQ — Layered diagnosis.** A user reports “the Internet is down.” Link is up, `ipconfig` shows `10.20.30.55/24` gateway `10.20.30.1`, gateway ping works, `ping 1.1.1.1` works, `nslookup` returns an address, but TCP 443 is refused by one site and works for another. Define scope, likely cause, and next two tests.
71. Which theory is best? A. Specific, evidence-based, and safely testable; B. “The network is broken”; C. The most expensive component failed; D. Several simultaneous undocumented guesses
72. Why change one variable at a time? A. Preserve cause-and-effect evidence; B. Slow every repair; C. Increase broadcast; D. Avoid documentation
73. Which fault creates a direct conductor-to-conductor connection? A. Short; B. Open; C. Attenuation; D. Dirty fiber only
74. Excessive cable length primarily increases what? A. Attenuation and timing risk; B. DNS records; C. VLAN IDs; D. RPO
75. Which tool locates events along a fiber run? A. OTDR; B. TDR; C. Tone probe; D. Netstat
76. Interface counters show rising input errors only during nearby machinery operation. What is likely? A. EMI/cabling susceptibility; B. DNS cache; C. OSPF AD; D. DHCP scope
77. STP root changes repeatedly. Which evidence helps most? A. Topology-change logs and bridge IDs/priorities; B. DNS MX records; C. NTP stratum only; D. PoE class
78. An EtherChannel has one suspended member. What should be compared? A. Speed, duplex, VLAN/trunk, and channel settings; B. DNS zones; C. User passwords; D. Rack temperature only
79. The route table contains `192.0.2.0/24` but destination is `192.0.3.8`. No default exists. What happens? A. No matching route; B. `/24` matches; C. ARP resolves remote directly; D. DNS adds route
80. A DHCP scope is exhausted. What evidence confirms it? A. No free leases plus Discover/repeated failure; B. Strong RSSI; C. CRC zero; D. TLS certificate
81. A duplicate IP may cause what? A. Intermittent ARP ownership and connectivity; B. Stable unique neighbor mapping; C. Higher throughput; D. Longer RTO only
82. DNS A record is correct but clients retain an old answer. What should be checked? A. Cache and TTL; B. Cable pair order only; C. STP priority; D. PoE budget
83. Which metric includes serialization/propagation/queue/application delay? A. Latency; B. Bandwidth only; C. CIDR; D. MTBF
84. A 1 Gb/s client transfers through a 100 Mb/s uplink. What is the approximate path ceiling before overhead? A. 100 Mb/s; B. 1 Gb/s; C. 10 Gb/s; D. Unlimited
85. Which evidence points to congestion? A. High utilization, queue drops, and increased latency; B. Clean idle interface only; C. Valid DNSSEC; D. Correct certificate
86. Which command asks DNS directly for a record type and shows detailed flags? A. `dig`; B. `ping`; C. `ip link`; D. `show power inline`
87. Which command shows the path through routers on Windows? A. `tracert`; B. `netstat -ano`; C. `arp -a`; D. `hostname`
88. Which tool measures non-Wi-Fi energy in wireless spectrum? A. Spectrum analyzer; B. Cable mapper; C. TFTP server; D. PDU
89. `Connection refused` usually means what compared with a timeout? A. A reachable endpoint actively rejected/no listener, while timeout suggests no response/filter/path issue; B. Both prove DNS failure; C. Refused proves cable open; D. Timeout proves application success
90. After a fix, why monitor for a defined period? A. Confirm stability and prevent a transient success from closing the incident; B. Increase MTU; C. Hide logs; D. Change IP class
