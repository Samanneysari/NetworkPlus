# N10-009 Full Practice Exam — Form C Answers

## Domain 1

1. Managed switch for wired clients; AP/controller function for Wi-Fi; router/firewall for Internet routing/security; forward proxy/UTM or secure web function for policy; NAS for shared files; UPS/PDU for power. Redundancy should address the Internet edge, central switch, AP coverage/capacity, storage/data backup, and power according to impact—not blindly duplicate every endpoint.
2. **A.** Layer 4 uses segments/datagrams.
3. **A.** The NIC/data-link layer removes the frame wrapper before IP processing.
4. **A.** Switches learn source MAC-to-port mappings in CAM/MAC tables.
5. **A.** A forward proxy represents outbound clients.
6. **A.** CDN caches reduce user latency and origin load.
7. **A.** Direct connectivity uses a dedicated provider path.
8. **A.** Horizontal scale adds instances/nodes.
9. **A.** SNMP polling normally targets UDP 161.
10. **A.** LDAPS commonly uses TCP 636.
11. **A.** TCP implements reliability/order/acknowledgment.
12. **A.** IKE negotiates IPsec associations/keys.
13. **A.** DAC/twinax is common for short data-center connections.
14. **A.** MPO/MTP carries several fibers.
15. **A.** Collapsed core combines distribution/core.
16. **C.** `/26` is `255.255.255.192`.
17. **B.** Network is `.128`; first normal host is `.129`.
18. **A.** Different subnet sizes match different requirements.
19. **A.** SASE combines WAN and cloud-delivered security.
20. **A.** Versioned code supports repeatability/review/audit.
21. **A.** `::1` is loopback.

## Domain 2

22. Configure the switch link as an 802.1Q trunk allowing VLANs 10/20. Create router subinterfaces (for example `.10` and `.20`), tag each with its VLAN ID, and assign the VLAN gateway IP/prefix. Verify trunk/allowed VLANs, subinterface line/protocol/address state, routes/ARP, and endpoint gateway reachability/inter-VLAN policy.
23. **A.** `0.0.0.0/0` is the IPv4 default.
24. **A.** A normal static route has lower AD than OSPF.
25. **A.** A protocol's metric selects among its candidate paths.
26. **A.** Inside local is the address seen on the inside network.
27. **A.** Subinterfaces logically divide a physical interface.
28. **A.** Access mode carries one endpoint VLAN untagged.
29. **A.** Restriction limits unintended VLAN reach/failure domains.
30. **A.** A root port is the best path toward root.
31. **A.** RSTP shortens convergence.
32. **A.** At least one LACP side must be active; active-active works.
33. **A.** MTU mismatch drops oversized traffic.
34. **A.** Wi-Fi 6E extends Wi-Fi 6 into 6 GHz.
35. **A.** MIMO uses multiple spatial paths/antennas.
36. **A.** Portal login is not link-layer radio encryption.
37. **A.** Central control helps policy consistency and RF coordination.
38. **A.** Heavy devices belong low with correct rails/capacity.
39. **A.** Partial-power symptoms require PoE negotiation/budget evidence.

## Domain 3

40. `app` = A and AAAA; `www` = CNAME to app; mail host = A/AAAA plus domain MX; verification = TXT; authoritative servers = NS (with address/glue as required); reverse = PTR. Validate with `dig <name> <type>` and `dig -x <address>` against authoritative and recursive resolvers.
41. **A.** IPAM tracks address-plan state and ownership.
42. **A.** Version inventory supports lifecycle/security/compatibility decisions.
43. **A.** It is measurable, user-path validation.
44. **A.** Drift is deviation from approved intended state.
45. **A.** SNMP management should be restricted and protected.
46. **A.** SPAN copies traffic for observation.
47. **A.** A mirror destination can be oversubscribed.
48. **A.** Six hours exceeds the four-hour objective.
49. **A.** Tabletop exercises roles/decisions without system failover.
50. **A.** Reservations bind a client identity to an address.
51. **A.** The router/default-gateway DHCP option supplies it.
52. **A.** CNAME creates an alias.
53. **A.** AAAA stores IPv6.
54. **A.** DoH uses HTTPS; DoT uses a dedicated TLS port/service.
55. **A.** PTP is designed for high precision.
56. **A.** Jump hosts centralize controlled/logged administration.

## Domain 4

57. MAC-table growth = **MAC flooding → port security/rate/segmentation**. User-port DHCP offers = **rogue DHCP → DHCP snooping, trust only legitimate uplinks**. Inconsistent ARP = **ARP spoofing → DAI using bindings, trust only required infrastructure links**. User access ports remain untrusted.
58. **A.** Availability keeps services usable.
59. **A.** Encryption primarily protects confidentiality.
60. **A.** RADIUS commonly supports enterprise WLAN AAA.
61. **A.** Geofencing adds location context to policy.
62. **A.** DDoS uses many sources.
63. **A.** On-path attackers intercept/alter between endpoints.
64. **A.** Fake credential collection is phishing.
65. **A.** Port security reacts to MAC violations.
66. **A.** Static access mode/no negotiation reduces VLAN-hopping risk.
67. **A.** Content filters inspect characteristics beyond a URL category.
68. **A.** NDA governs confidential disclosure.
69. **A.** Telnet lacks modern confidentiality/integrity.

## Domain 5

70. Scope is one destination/service because IP, DNS, and another HTTPS site work. Refusal indicates the destination or an intermediate policy actively rejects/no listener rather than general Internet failure. Test the resolved IP/port with a TCP client and inspect TLS/HTTP using `curl -v` or equivalent; compare from another authorized source and check service/firewall logs.
71. **A.** A useful theory is specific and testable.
72. **A.** One change preserves causal evidence.
73. **A.** A short connects conductors.
74. **A.** Excess length increases attenuation/timing risk.
75. **A.** OTDR locates fiber events.
76. **A.** Machinery correlation suggests EMI/cabling.
77. **A.** Bridge IDs/priorities and topology-change evidence explain root churn.
78. **A.** Bundle members require consistent interface/channel settings.
79. **A.** `192.0.2.0/24` does not match `192.0.3.8`; no default means no route.
80. **A.** Lease inventory plus repeated client requests proves exhaustion.
81. **A.** Competing hosts cause ARP ownership changes/intermittence.
82. **A.** Old cached data persists according to TTL/cache behavior.
83. **A.** Latency is end-to-end delay.
84. **A.** The slowest 100 Mb/s link limits the path before overhead.
85. **A.** High utilization, queuing delay, and drops indicate congestion.
86. **A.** `dig` exposes record/flags/server details.
87. **A.** Windows uses `tracert`.
88. **A.** Spectrum analyzers show non-Wi-Fi RF energy.
89. **A.** Refusal is active response; timeout is absence/filtered/path ambiguity.
90. **A.** Sustained observation proves stability better than one success.
