# N10-009 Full Practice Exam — Form B

**Time:** 90 minutes | **Questions:** 90 | **Materials:** closed book

Do not open the [answer key](form-b-answers.md) until the timer ends.

## Domain 1 — Networking Concepts (1–21)

1. **PBQ — Encapsulation.** For an HTTPS packet leaving a workstation, write the encapsulation units from application to wire, then identify which source/destination addresses change at a router and which normally remain end to end before NAT.
2. Which OSI layer is responsible for routing between networks? A. Data Link; B. Network; C. Session; D. Presentation
3. A hub receives a signal on one port. What happens? A. It learns the source MAC; B. It repeats the signal to other ports; C. It routes by IP; D. It applies an ACL
4. Which device can route between VLANs at wire speed while also switching Layer 2 traffic? A. Layer 3 switch; B. Patch panel; C. Repeater; D. Modem only
5. Which security device is inline and can block malicious traffic? A. Passive IDS; B. IPS; C. Packet tap; D. CDN
6. A reverse proxy primarily represents which side? A. Internal clients making outbound requests; B. Published backend servers receiving inbound requests; C. Fiber connectors; D. DHCP relays
7. Which cloud model gives the customer the least responsibility for the application platform itself? A. IaaS; B. PaaS; C. SaaS; D. Private rack
8. Which control is commonly stateless at a cloud subnet boundary? A. Security group; B. Network ACL; C. Load balancer cookie; D. DNS resolver
9. Which protocol/port pair is correct? A. LDAP TCP/UDP 389; B. HTTPS UDP 67; C. NTP TCP 445; D. SSH TCP 23
10. Which protocol normally carries file sharing on TCP 445? A. SMB; B. SMTP; C. SNMP; D. SIP
11. What can IPsec ESP provide that GRE alone cannot? A. Encapsulation; B. Confidentiality; C. Logical addressing; D. A tunnel header
12. One sender delivers to all hosts in the local IPv4 broadcast domain. What traffic type is this? A. Anycast; B. Broadcast; C. Unicast; D. North-south
13. Which connector is common on cable-modem coax? A. LC; B. F-type; C. MPO; D. RJ45
14. Why is plenum-rated cable used? A. It supports DNSSEC; B. Its jacket meets requirements for air-handling spaces; C. It increases IP TTL; D. It replaces PoE
15. A branch design sends every remote site through headquarters. What topology is this? A. Full mesh; B. Hub-and-spoke; C. Spine-leaf; D. Bus
16. What is the broadcast address for `198.51.100.64/26`? A. `.63`; B. `.64`; C. `.126`; D. `.127`
17. Which is an RFC 1918 private address? A. `172.20.5.4`; B. `172.32.5.4`; C. `192.0.2.8`; D. `203.0.113.7`
18. Why is `/31` useful on supported point-to-point IPv4 links? A. It provides 254 hosts; B. Both addresses can represent the two endpoints; C. It creates APIPA; D. It is multicast
19. Which SD-WAN capability chooses paths based on application and policy? A. Application-aware path selection; B. ARP inspection; C. Cable certification; D. MAC flooding
20. What is the compressed form of `2001:0db8:0000:0000:0000:0000:0000:0025`? A. `2001:db8::25`; B. `2001::db8::25`; C. `2001:db8:25/4`; D. `fe80::25`
21. Which IPv6 protocol behavior replaces ARP? A. Neighbor Discovery; B. NAT; C. BGP; D. SMTP

## Domain 2 — Network Implementation (22–39)

22. **PBQ — Route choice.** A router contains `0.0.0.0/0 via A`, `10.0.0.0/8 via B`, `10.44.0.0/16 via C`, and `10.44.8.0/24 via D`. State the next hop for `8.8.8.8`, `10.3.2.1`, `10.44.7.9`, and `10.44.8.50`, and name the selection rule.
23. Which route is added automatically when an interface is up with an IP/prefix? A. Connected route; B. Floating route; C. BGP default; D. NAT route
24. Two routes to the same prefix come from OSPF and a static route. Which value first compares route-source trust? A. Metric; B. Administrative distance; C. TTL; D. MTU
25. Which protocol is primarily used between autonomous systems on the Internet? A. BGP; B. OSPF; C. STP; D. LACP
26. What must be configured correctly for NAT? A. Inside/outside roles and matching traffic; B. SSID and BSSID; C. Fiber wavelength only; D. DNS SOA serial only
27. A virtual gateway remains available after the active router fails. Which technology is responsible? A. FHRP; B. TFTP; C. SNMP trap; D. SLAAC
28. What is an SVI? A. Logical Layer 3 interface for a VLAN; B. Fiber connector; C. Wireless antenna; D. Syslog severity
29. Which trunk standard inserts a VLAN identifier into Ethernet frames? A. 802.1Q; B. 802.1X; C. 802.11ax; D. 802.3af
30. A voice phone and attached PC share one switch port. What is commonly configured? A. Data access VLAN plus voice VLAN; B. Two native VLANs; C. OSPF area; D. NAT64
31. Which switch should be intentionally given the lowest STP root priority? A. Desired central/root switch; B. Random endpoint; C. Access point; D. DHCP client
32. What does LACP active mode do? A. Initiates negotiation; B. Never sends LACP messages; C. Disables bundling; D. Encrypts members
33. Why can a jumbo-frame mismatch cause intermittent application failure? A. Large packets may be dropped while small probes work; B. It changes DNS names; C. It creates a rogue AP; D. It disables PoE
34. Which 2.4 GHz 20 MHz channels are commonly selected as non-overlapping where permitted? A. 1, 6, 11; B. 2, 3, 4; C. 36, 40, 44; D. 149, 153, 157
35. What does DFS require an AP to do on affected 5 GHz channels? A. Detect radar and move/avoid as required; B. Disable encryption; C. Increase VLAN ID; D. Use WEP
36. Which identifier normally names one specific AP radio? A. BSSID; B. SSID only; C. VLAN; D. VNI
37. Which change can improve roaming when AP cells are excessively large? A. Review/reduce transmit power with survey evidence; B. Maximize every AP; C. Add overlapping 2.4 GHz channels; D. Hide the SSID
38. A switch supports 370 W PoE and currently allocates 340 W. A new 45 W AP is connected. What is the likely issue? A. Insufficient total PoE budget; B. DNS TTL; C. OSPF metric; D. Fiber reflection
39. Which document maps permanent cables between wall jack, patch panel, and switch? A. Cable map; B. A record; C. Route table; D. RPO

## Domain 3 — Network Operations (40–56)

40. **PBQ — Monitoring triage.** A WAN alert reports 8% loss. The switch uplink has no new errors; two Internet destinations lose traffic; the local gateway does not. State the likely fault boundary, the next evidence to collect, the ticket update, and an escalation condition.
41. Which diagram primarily shows subnets, VLANs, and logical connectivity? A. Logical diagram; B. Rack elevation; C. Floor plan only; D. Purchase invoice
42. What should happen before an unsupported device reaches EOS? A. Plan upgrade/replacement and risk treatment; B. Disable monitoring; C. Publish credentials; D. Remove documentation
43. Which change item defines how to return to the prior state? A. Rollback plan; B. RPO; C. SSID; D. BSSID
44. Why should configuration backups be hashed? A. Detect unexpected modification/corruption; B. Increase bandwidth; C. Create VLANs; D. Replace encryption
45. What starts at an SNMP agent without a manager poll? A. Trap/inform; B. DNS query; C. TCP ACK; D. DHCP Discover
46. What is the primary advantage of packet capture over flow data? A. Header and possible payload detail; B. Lower sensitivity; C. No storage use; D. It never needs authorization
47. An interface utilization baseline is 25%, but it reaches 90% during business peaks with drops. What is the best conclusion? A. Capacity/congestion requires investigation; B. DNSSEC is failing; C. Fiber is always dirty; D. RPO is too short
48. Which metric measures average time between repairable failures? A. MTBF; B. MTTR; C. RTO; D. RSSI
49. Which action best validates a backup? A. Restore and test representative data/service; B. Observe a successful job status only; C. Copy it twice; D. Change its filename
50. During DHCP DORA, which server message proposes an address? A. Discover; B. Offer; C. Request; D. Acknowledge
51. Which DHCP setting prevents dynamic assignment of infrastructure addresses inside the scope? A. Exclusion; B. PTR; C. Trunk native VLAN; D. OSPF passive interface
52. Which DNS record identifies the primary authority and zone serial? A. SOA; B. CNAME; C. AAAA; D. TXT
53. Why must large DNS responses support TCP 53? A. Truncation retry and operations such as zone transfer can require TCP; B. TCP creates names; C. UDP is encrypted; D. ARP uses TCP
54. A client clock is far behind. Which failure may appear even when routing works? A. TLS certificate validation/authentication issues; B. Cable opens; C. VLAN tag removal; D. PoE overload
55. Which management method gives direct local access when IP networking is misconfigured? A. Console; B. HTTPS through production; C. SNMP over WAN; D. DoH
56. A clientless VPN most commonly uses what client interface? A. Web browser; B. Fiber tester; C. Serial console only; D. DHCP relay

## Domain 4 — Network Security (57–69)

57. **PBQ — 802.1X roles.** Map supplicant, authenticator, and authentication server to an employee laptop, access switch, and RADIUS server. Then state what EAPoL carries and one safe action for failed posture/authentication.
58. Which property ensures information is not altered without detection? A. Integrity; B. Availability; C. Scalability; D. Throughput
59. Which technique converts input to a fixed-length value for integrity checking and is not normally reversible? A. Hashing; B. NAT; C. VLAN tagging; D. Multiplexing
60. Which solution allows one identity provider login to access multiple applications? A. SSO; B. STP; C. SNMP; D. SFP
61. What does RBAC base permissions on? A. Job/functional roles; B. Cable color; C. IP class only; D. Wi-Fi band
62. A rogue DHCP server gives clients a malicious gateway. Which control blocks unauthorized server messages on user ports? A. DHCP snooping; B. Port mirroring; C. CDP; D. NAT64
63. Which attack uses double tagging or trunk negotiation abuse to reach another VLAN? A. VLAN hopping; B. DNSSEC; C. DLP; D. NTP drift
64. Deauthentication frames repeatedly disconnect wireless clients. What attack category is this? A. Wireless denial/disruption; B. Route summarization; C. File sharing; D. Recovery testing
65. Which control limits one access port to approved MAC behavior? A. Port security; B. OSPF; C. CDN; D. NTP
66. Why is a WAF different from a traditional Layer 3/4 firewall? A. It inspects web application requests at higher layers; B. It terminates fiber; C. It provides DHCP; D. It is a switch table
67. What is the purpose of a honeypot? A. Attract/observe suspicious interaction in an isolated controlled system; B. Provide production authentication; C. Replace backups; D. Route all WAN traffic
68. Which document defines permitted employee use of company systems? A. AUP; B. NDA; C. MOU; D. MX
69. Which control can identify sensitive data leaving through approved channels? A. DLP; B. STP; C. ARP; D. LACP

## Domain 5 — Network Troubleshooting (70–90)

70. **PBQ — Command interpretation.** A Linux host shows `192.0.2.50/24`, default via `192.0.2.1`, neighbor `192.0.2.1 FAILED`, and repeated ARP requests with no reply. Identify the failing stage, three likely causes, and the next physical/switch evidence.
71. After gathering facts, what is the next methodology step? A. Establish a theory of probable cause; B. Close the ticket; C. Replace every device; D. Delete logs
72. When is escalation appropriate? A. When scope/authority/skill or risk exceeds the technician after evidence is recorded; B. Before gathering any facts; C. Only after deleting configuration; D. Never
73. A cable continuity tester passes but the link negotiates only 100 Mb/s instead of 1 Gb/s. Why? A. Continuity does not prove all pairs/performance; B. DNS lowered speed; C. OSPF changed duplex; D. TLS uses 100 Mb/s
74. What does a split pair cause? A. Correct continuity may appear while crosstalk/performance fails; B. It creates a valid fiber link; C. It improves PoE; D. It adds a VLAN
75. Which optical tool measures end-to-end light level/loss with a source? A. Optical power meter; B. TDR; C. Tone probe; D. Wi-Fi analyzer
76. A switch port is err-disabled immediately after another switch is connected to an edge port. Which control likely triggered? A. BPDU Guard; B. DNSSEC; C. NAT; D. NTS
77. MAC addresses rapidly move between two switch ports and broadcasts spike. What is likely? A. Layer 2 loop; B. Correct LACP; C. DHCP reservation; D. Stable STP
78. An access port is accidentally assigned VLAN 30 instead of VLAN 20. Which symptom is likely? A. Wrong subnet/no expected gateway reachability; B. Fiber light loss only; C. DNSSEC AD flag; D. RPO violation
79. `show ip route` lacks a default route, but local subnets work. Which traffic fails? A. Unknown remote destinations; B. Same-subnet ARP; C. Local switch management only; D. Every Ethernet frame
80. DHCP clients in VLAN 10 fail; clients in server VLAN 20 work. The server is healthy. What should be checked? A. Relay/helper and routing/ACL path; B. MX record; C. Fiber wavelength on server only; D. Wi-Fi SSID everywhere
81. A DNS response is `NXDOMAIN`. What does it mean? A. The queried name does not exist according to the response; B. The port is filtered; C. DHCP failed; D. The cable is open
82. A web server accepts TCP 443 but presents a certificate for another hostname. What is wrong? A. TLS identity/SNI/certificate configuration; B. Physical duplex; C. OSPF cost; D. PoE class
83. Which metric is the useful delivered application payload rate? A. Goodput; B. Raw bit rate; C. MTBF; D. RSSI
84. A receiver advertises a TCP zero window. What is the likely issue? A. Receiving application/host cannot currently accept more data; B. Router TTL is zero; C. DNS is authoritative; D. Fiber is single-mode
85. Wi-Fi signal is strong but SNR is low. What does this imply? A. Noise is also high; B. Channel is empty; C. Authentication succeeded; D. The WAN is definitely slow
86. Which command shows listening sockets on modern Linux? A. `ss -lntup`; B. `dig -x`; C. `ip route get`; D. `traceroute`
87. Which command displays the local IPv4/IPv6 routing table on Windows? A. `route print`; B. `show vlan brief`; C. `arp -d` only; D. `nslookup -type=mx`
88. Which tool finds an unlabeled copper cable endpoint? A. Tone generator and probe; B. OTDR; C. NTP; D. Protocol analyzer
89. A ping returns `Destination host unreachable` from the local gateway. What does it indicate? A. A device reports it cannot forward/reach the destination; B. The application succeeded; C. DNS returned an A record; D. TLS is valid
90. What should final documentation include? A. Symptoms, scope, timeline, evidence, cause, change, verification, and prevention; B. Only “fixed”; C. Passwords; D. Unrelated logs
