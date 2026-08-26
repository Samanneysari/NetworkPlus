# N10-009 Full Practice Exam — Form A

**Time:** 90 minutes  
**Questions:** 90  
**Materials:** closed book

Record answers separately. Do not open the [answer key](form-a-answers.md) until the timer ends.

## Domain 1 — Networking Concepts (1–21)

1. **PBQ — Packet path.** A client `10.10.10.25/24` opens `https://app.example.test` at `198.51.100.20` through gateway `10.10.10.1`. Put these events in order and name the destination MAC used in the first data frame: DNS query, ARP for next hop, TCP three-way handshake, TLS handshake, HTTP request.
2. Which OSI layer adds source and destination MAC addresses? A. Physical; B. Data Link; C. Network; D. Transport
3. A switch receives a frame whose destination MAC is absent from its table. What does it do? A. Drops it; B. Sends it only to the gateway; C. Floods it within the VLAN except the ingress port; D. Replaces the destination MAC
4. Which appliance normally distributes client connections across healthy application servers? A. Load balancer; B. IDS; C. Patch panel; D. NAS
5. Which statement correctly compares NAS and SAN? A. NAS provides blocks and SAN files; B. NAS provides files and SAN commonly provides blocks; C. Both require Fibre Channel; D. Both are routing protocols
6. A private cloud instance needs outbound IPv4 Internet access without unsolicited inbound connections. Which component is most appropriate? A. Internet gateway directly on the instance; B. NAT gateway; C. CDN; D. IDS sensor
7. In IaaS, who normally patches the guest operating system? A. Customer; B. DNS registrar; C. ISP; D. End user’s browser
8. Which service normally uses UDP 123? A. SNMP; B. NTP; C. LDAP; D. SIP
9. Which protocol provides encrypted remote CLI access on TCP 22? A. Telnet; B. TFTP; C. SSH; D. RDP
10. **Select TWO.** Which statements about DNS transport are correct? A. Ordinary queries commonly use UDP 53; B. DHCP uses TCP 53; C. HTTPS always uses UDP 53; D. Large or truncated DNS responses may use TCP 53; E. SNMP polling uses TCP 53
11. Which traffic type sends one packet to a selected nearest/appropriate member sharing an address? A. Broadcast; B. Multicast; C. Anycast; D. Flooding
12. Which medium is best for a long backbone exposed to electromagnetic interference? A. UTP; B. Single-mode fiber; C. RG-6 coax; D. Twinax
13. An SFP fits physically but the link remains down. Which check is most important first? A. DNS suffix; B. Speed/wavelength/fiber compatibility; C. DHCP lease; D. VLAN name
14. Which topology connects each leaf switch to every spine switch? A. Bus; B. Hub-and-spoke; C. Spine-leaf; D. Ring
15. What is the network address of `192.0.2.77/27`? A. `192.0.2.32`; B. `192.0.2.64`; C. `192.0.2.77`; D. `192.0.2.96`
16. How many normal usable IPv4 host addresses are in a `/29`? A. 4; B. 6; C. 8; D. 14
17. Which address indicates IPv4 link-local/APIPA behavior? A. `10.2.3.4`; B. `127.0.0.1`; C. `169.254.8.20`; D. `172.32.1.5`
18. Which technology uses a 24-bit VNI to extend Layer 2 segments over Layer 3? A. STP; B. VXLAN; C. LACP; D. GRE only
19. Which statement best represents Zero Trust? A. Internal IPs are permanently trusted; B. Trust is continuously evaluated using identity/context and least privilege; C. Every service must be public; D. Authentication is replaced by encryption
20. A host has `fe80::20`. What is true? A. It is globally routable; B. It is IPv4-compatible; C. It is link-local and may require an interface zone; D. It is multicast
21. Which transition method allows an IPv6-only client to reach an IPv4-only service? A. NAT64/DNS64; B. SLAAC only; C. STP; D. PAT on Layer 2

## Domain 2 — Network Implementation (22–39)

22. **PBQ — VLAN repair.** SW1 and SW2 should carry VLANs 10, 20, and 99. Users in VLAN 20 fail only across the inter-switch link. Output shows SW1 allows `10,20,99`; SW2 allows `10,99`. State the minimal correction, two verification commands, and one end-to-end test.
23. A router has `10.0.0.0/8` via R1 and `10.20.0.0/16` via R2. Which route is used for `10.20.5.8`? A. `/8` via R1; B. `/16` via R2; C. Both equally; D. Default route
24. What does a floating static route require? A. Lower prefix length; B. Higher administrative distance than the primary route; C. Lower MTU; D. A trunk port
25. Which dynamic routing protocol is link-state? A. OSPF; B. BGP; C. ARP; D. LACP
26. PAT primarily distinguishes simultaneous inside flows by translating which value? A. TTL; B. Source transport port; C. Destination MAC only; D. VLAN name
27. What does an FHRP provide to clients? A. A virtual default-gateway IP; B. A DNSSEC key; C. A new VLAN tag; D. A cable test
28. A router-on-a-stick design requires what on the switch link? A. Access mode; B. 802.1Q trunk; C. STP disabled; D. LACP passive only
29. Which command best verifies access-port VLAN membership? A. `show vlan brief`; B. `show ip route`; C. `show arp`; D. `tracert`
30. A native VLAN mismatch is most likely to affect which frames? A. Untagged frames on the trunk; B. All routed packets only; C. Fiber light levels; D. DHCP lease time
31. Why does STP place a redundant port into a non-forwarding state? A. To increase broadcast traffic; B. To prevent a Layer 2 loop; C. To create NAT entries; D. To encrypt frames
32. Where should PortFast normally be enabled? A. Inter-switch trunks; B. Endpoint edge ports; C. WAN router links; D. SPAN destinations only
33. Two EtherChannel member ports have different allowed VLAN lists. What is the likely outcome? A. Members may be suspended or fail to bundle; B. DNS stops globally; C. OSPF becomes BGP; D. PoE increases
34. Which Wi-Fi band generally offers more channels but usually shorter propagation than 2.4 GHz? A. 900 MHz; B. 5 GHz; C. AM radio; D. NFC
35. Which security mode uses per-user/device authentication through 802.1X and RADIUS? A. WPA3-Enterprise; B. Open captive portal only; C. WEP; D. WPA-Personal PSK only
36. Strong RSSI with poor throughput and high channel utilization indicates what? A. Insufficient IP classes; B. Airtime contention; C. Wrong fiber wavelength; D. Duplicate default route only
37. Which antenna is most appropriate for a focused point-to-point bridge? A. Directional; B. Omnidirectional ceiling antenna; C. Loopback plug; D. Diplexer
38. Six APs draw 25 W each and ten phones draw 7 W each. What minimum planned PoE load is required before headroom? A. 150 W; B. 170 W; C. 220 W; D. 250 W
39. What separates provider and customer responsibility at a site? A. Demarcation point; B. BSSID; C. VNI; D. RPO

## Domain 3 — Network Operations (40–56)

40. **PBQ — Change plan.** A change adds VLAN 40 to two switches and one trunk. List the required prechecks, implementation evidence, postchecks, rollback trigger, and rollback action in a safe order.
41. Which document shows device placement by rack unit? A. Logical diagram; B. Rack diagram; C. DNS zone; D. AUP
42. What is the best purpose of a golden configuration? A. Live packet capture; B. Approved known-good restoration baseline; C. Temporary DHCP lease; D. Wireless channel scan
43. Which SNMP version supports authentication and privacy? A. v1; B. v2c; C. v3; D. CDP
44. What does a flow record usually contain? A. Full payload only; B. Conversation endpoints, ports, bytes, and time; C. Fiber loss; D. User password
45. An alert fires every night during an approved backup. What should be improved first? A. Delete all monitoring; B. Baseline/threshold and maintenance context; C. Disable backups; D. Change every IP
46. Which syslog severity is numerically most urgent? A. 0 Emergency; B. 4 Warning; C. 6 Informational; D. 7 Debug
47. RPO answers which question? A. How much recent data loss is acceptable? B. How long until repair staff arrive? C. What is the Wi-Fi power? D. Which route wins?
48. A service has an RTO of one hour. What must a recovery test measure? A. Only backup size; B. End-to-end restoration time; C. VLAN ID count; D. DNS TTL only
49. Which recovery site has systems/data closest to production readiness and normally the highest cost? A. Cold; B. Warm; C. Hot; D. Ad hoc
50. Which DHCP message normally begins a new IPv4 lease exchange? A. Discover; B. Offer; C. Request; D. Acknowledge
51. A DHCP server is on another VLAN. What gateway function forwards the client request? A. Relay/IP helper; B. NAT64; C. STP root; D. DNSSEC
52. Which DNS record maps an IPv4 address-derived reverse name to a hostname? A. A; B. PTR; C. MX; D. TXT
53. Which DNS server is responsible for the final answer for a zone? A. Authoritative server; B. Layer 2 switch; C. NTP peer; D. DHCP client
54. What does the DNSSEC AD flag indicate when returned by a validating resolver? A. Data was authenticated by validation; B. Address is duplicated; C. DHCP is active; D. TCP is disabled
55. Which VPN sends only selected destinations through the tunnel? A. Full tunnel; B. Split tunnel; C. Site-local only; D. GRE without policy
56. Why is out-of-band management valuable? A. It provides a management path when the production path fails; B. It increases every MTU; C. It replaces backups; D. It eliminates authentication

## Domain 4 — Network Security (57–69)

57. **PBQ — Segmentation policy.** User, guest, server, IoT, and management VLANs exist. Write a least-privilege policy for guest Internet access, IoT controller/NTP access, user HTTPS-to-server access, and management-device administration. State the default rule.
58. Which control verifies a certificate chain and binds a public key to an identity? A. PKI; B. PAT; C. STP; D. PoE
59. **Select TWO.** Which are different authentication-factor categories? A. Password; B. PIN; C. Fingerprint; D. Hardware token; E. Security question
60. Which AAA protocol is commonly preferred for administrative access to network devices because it separates authorization/accounting? A. TACACS+; B. TFTP; C. ARP; D. SIP
61. What is the principle of least privilege? A. Grant all access temporarily; B. Grant only required access for the required time; C. Trust all LAN users; D. Disable logs
62. Which attack fills a switch MAC table to encourage flooding? A. MAC flooding; B. DNSSEC; C. VLAN pruning; D. NTP drift
63. Which attack sends forged ARP information to redirect local traffic? A. ARP poisoning; B. Smurf protection; C. DHCP reservation; D. DNS recursion
64. A fake AP copies the corporate SSID to attract users. What is it? A. Evil twin; B. Warm site; C. Honeynet; D. Load balancer
65. What is the main purpose of DHCP snooping? A. Build trusted bindings and block unauthorized DHCP messages; B. Encrypt DNS; C. Select OSPF routes; D. Increase PoE
66. Dynamic ARP Inspection normally validates ARP against what? A. DHCP snooping bindings; B. DNS MX records; C. NTP associations; D. Switch descriptions
67. Which design places public-facing services in a separated screened subnet? A. DMZ; B. Native VLAN 1; C. APIPA; D. Loopback
68. Why should unused switch ports be disabled and assigned to an unused VLAN? A. Reduce unauthorized attachment and exposure; B. Increase broadcast size; C. Bypass NAC; D. Enable WEP
69. Which wireless technologies should be avoided? A. WPA3 and SAE; B. WEP and TKIP; C. 802.1X and EAP; D. RADIUS and TLS

## Domain 5 — Network Troubleshooting (70–90)

70. **PBQ — Branch outage.** Users can ping `198.51.100.20` but cannot open `app.example.test`. `ipconfig` shows the expected address/gateway, while `nslookup app.example.test` times out. Provide the next three evidence-gathering actions, likely fault domain, and final verification.
71. What is the first troubleshooting stage? A. Implement a fix; B. Identify the problem; C. Replace hardware; D. Clear all counters
72. Why should evidence be captured before rebooting a device? A. A reboot can destroy transient state and counters; B. Reboots encrypt logs; C. It changes the subnet class; D. It creates fiber light
73. Increasing CRC errors on one copper link most strongly indicate what area? A. Physical/link path; B. DNS zone; C. IAM policy; D. Cloud elasticity
74. Late collisions are a classic symptom of what? A. Duplex mismatch; B. Correct full duplex; C. DNSSEC validation; D. NAT64
75. A fiber interface is down/down. **Select TWO.** Which checks are most relevant? A. Wavelength/fiber compatibility; B. Connector cleanliness; C. DHCP lease length; D. DNS MX priority; E. User password age
76. A port is `administratively down`. What does it mean? A. It was disabled by configuration; B. CRC is high; C. STP blocked it; D. DHCP failed
77. A VLAN works on SW1 but not across the trunk. Which command should be checked first? A. `show interfaces trunk`; B. `show ip nat translations`; C. `dig MX`; D. `show power inline`
78. An ACL permit rule has zero hits while traffic is denied. What is a likely cause? A. Wrong interface/direction or an earlier rule matches; B. Fiber is single-mode; C. NTP is accurate; D. LACP is active
79. A router has a forward route but replies never return. What should be checked? A. Return route; B. SSID spelling only; C. PoE class; D. Patch-panel color
80. A client receives `169.254.40.8`. Which service should be investigated first? A. DHCP; B. NTP; C. SMTP; D. SNMP
81. Two clients intermittently report an address conflict. Which evidence is most useful? A. ARP/MAC changes and DHCP logs; B. Rack height; C. DNS MX record; D. Fiber wavelength only
82. Which symptom best distinguishes DNS failure from general IP failure? A. Remote IP works but hostname lookup fails; B. Link light is off; C. No local address exists; D. Switch has no power
83. Voice calls have uneven delay but little loss. Which metric is most relevant? A. Jitter; B. MTBF; C. CIDR; D. VLAN ID
84. TCP retransmissions increase while packet loss is observed. What is the likely relationship? A. TCP is recovering missing segments; B. DNS is creating VLANs; C. STP encrypts packets; D. ARP increases MTU
85. `ping` works but TCP 443 times out. What should be tested next? A. TCP path/firewall/service on port 443; B. Replace all cabling; C. Change the DNS zone; D. Disable TLS certificates
86. What does Nmap state `filtered` mean? A. A service accepted the connection; B. A rejection proved no listener; C. Probes were blocked or no definitive response was received; D. DNS returned NXDOMAIN
87. Which tool locates the approximate distance to a copper cable fault? A. TDR; B. OTDR; C. Wi-Fi analyzer; D. Syslog
88. Which tool is best for seeing TCP SYN, SYN-ACK, retransmission, and TLS packets? A. Protocol analyzer; B. Tone probe; C. PDU; D. UPS
89. `traceroute` shows several `*` hops but the destination responds. What is the best conclusion? A. Some routers did not return probe responses; the path still delivered traffic; B. Every starred router failed forwarding; C. DNS is broken; D. The subnet mask is always wrong
90. After correcting a trunk allowed-list, what completes verification? A. One interface says up; B. End-to-end application test plus expected VLAN/trunk counters and documentation; C. Clear all logs; D. Disable STP
