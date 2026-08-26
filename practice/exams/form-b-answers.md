# N10-009 Full Practice Exam — Form B Answers

## Domain 1

1. **Data → TCP segment → IP packet → Ethernet frame → bits/signals.** At each router the Layer 2 source/destination addresses change for the next link; the IP endpoints normally remain until NAT changes an IP/transport mapping. TTL also decreases at each router.
2. **B.** Layer 3 performs logical routing.
3. **B.** A hub repeats at Layer 1 and does not learn MACs.
4. **A.** A Layer 3 switch combines switching and routing functions.
5. **B.** An IPS is inline and can block; IDS normally observes/alerts.
6. **B.** A reverse proxy fronts servers; a forward proxy represents clients.
7. **C.** SaaS delivers the finished application.
8. **B.** Cloud network ACLs are commonly stateless.
9. **A.** LDAP normally uses 389.
10. **A.** SMB commonly uses TCP 445.
11. **B.** ESP can encrypt; GRE alone does not.
12. **B.** Broadcast targets all members of the local broadcast domain.
13. **B.** F-type is common for coax cable services.
14. **B.** Plenum jacket ratings address fire/smoke requirements in air spaces.
15. **B.** Sites connect through a central hub.
16. **D.** The `/26` range is 64–127.
17. **A.** `172.16.0.0/12` is private.
18. **B.** RFC 3021-style `/31` links use both addresses for endpoints.
19. **A.** SD-WAN applies application-aware policy across transports.
20. **A.** Remove leading zeroes and compress the one longest zero run once.
21. **A.** IPv6 Neighbor Discovery replaces ARP behavior.

## Domain 2

22. `8.8.8.8→A`, `10.3.2.1→B`, `10.44.7.9→C`, `10.44.8.50→D`. **Longest-prefix match** selects the most specific route.
23. **A.** An operational addressed interface installs a connected route.
24. **B.** Administrative distance compares route sources for the same prefix.
25. **A.** BGP exchanges routes between autonomous systems.
26. **A.** Roles and matching rules define translation behavior.
27. **A.** FHRP maintains a virtual first-hop gateway.
28. **A.** An SVI is a logical VLAN Layer 3 interface.
29. **A.** 802.1Q adds a VLAN tag.
30. **A.** The phone uses a voice VLAN while the attached PC uses the access/data VLAN.
31. **A.** Root selection should be intentional on an appropriate central switch.
32. **A.** Active sends LACP negotiation messages.
33. **A.** Small packets may pass while oversized packets drop.
34. **A.** 1/6/11 are commonly non-overlapping at 20 MHz where permitted.
35. **A.** DFS responds to radar requirements.
36. **A.** BSSID identifies a specific radio/cell.
37. **A.** Survey-driven power/cell adjustment can improve roaming.
38. **A.** `340+45=385 W`, which exceeds 370 W.
39. **A.** A cable map records the physical termination path.

## Domain 3

40. Likely boundary: beyond the local gateway and toward/upstream WAN because multiple remote destinations lose traffic while the local path is clean. Collect edge/provider handoff counters, latency/loss over time, traceroutes, and a second circuit/source if available. Update the ticket with scope, timestamps, tests, and unaffected local gateway. Escalate to the provider when local equipment/handoff evidence is clean and loss is reproduced upstream.
41. **A.** Logical diagrams show subnets, VLANs, and relationships.
42. **A.** Lifecycle risk needs a planned replacement/upgrade.
43. **A.** Rollback restores the prior state after failure/unexpected impact.
44. **A.** A hash helps prove integrity.
45. **A.** Traps/informs originate at agents.
46. **A.** Packet capture provides packet/header detail and possibly payload.
47. **A.** Sustained peak use plus drops indicates congestion/capacity concern.
48. **A.** MTBF is average time between failures.
49. **A.** Restore testing proves usability better than job status.
50. **B.** Offer proposes an address.
51. **A.** Exclusions protect addresses from dynamic allocation.
52. **A.** SOA includes primary authority and serial/timers.
53. **A.** DNS must support TCP for truncated/large responses and transfers.
54. **A.** Time errors break certificate validity and time-sensitive authentication.
55. **A.** Console does not depend on correct IP routing.
56. **A.** Clientless VPN access commonly uses a browser portal.

## Domain 4

57. Laptop = **supplicant**; switch = **authenticator**; RADIUS = **authentication server**. EAPoL carries EAP between supplicant and authenticator. Failed devices should be denied or placed in a limited remediation/quarantine network according to policy, with useful logs.
58. **A.** Integrity detects unauthorized alteration.
59. **A.** A cryptographic hash is fixed-length and one-way in normal use.
60. **A.** SSO shares an authenticated identity session across services.
61. **A.** RBAC assigns permissions to roles.
62. **A.** DHCP snooping blocks untrusted server replies.
63. **A.** Those are VLAN-hopping techniques.
64. **A.** Deauthentication disrupts WLAN availability.
65. **A.** Port security controls MAC use at an access port.
66. **A.** WAF understands web application requests at higher layers.
67. **A.** Honeypots attract/observe attacks in controlled isolation.
68. **A.** AUP defines acceptable system use.
69. **A.** DLP detects/controls sensitive data movement.

## Domain 5

70. ARP/neighbor resolution for the default gateway is failing before routed traffic. Causes include wrong VLAN, gateway interface down/wrong IP, bad local link/switchport, or ARP filtering. Check link/interface counters, access VLAN/MAC table, and gateway interface/ARP evidence before changing DNS or remote routes.
71. **A.** Facts support a probable-cause theory.
72. **A.** Escalate with evidence when risk/scope/authority exceeds the role.
73. **A.** Gigabit copper depends on all required pairs and acceptable performance.
74. **A.** A split pair can pass simple continuity yet fail due to crosstalk.
75. **A.** A light source plus power meter measures link loss.
76. **A.** BPDU Guard protects edge ports from connected switches.
77. **A.** MAC flapping and broadcast spikes indicate a possible Layer 2 loop.
78. **A.** The host lands in the wrong broadcast domain/address service.
79. **A.** Destinations without a more-specific route need the default.
80. **A.** Cross-VLAN DHCP depends on relay, routing, and permitted UDP 67/68 path.
81. **A.** NXDOMAIN states the name does not exist.
82. **A.** Connection works, but TLS identity selection/configuration is wrong.
83. **A.** Goodput counts useful application payload.
84. **A.** A zero receive window advertises no current buffer space.
85. **A.** SNR is low because noise is high relative to signal.
86. **A.** `ss -lntup` lists listening TCP/UDP sockets.
87. **A.** `route print` shows Windows routes.
88. **A.** A toner/probe traces copper.
89. **A.** A router/host explicitly reports no reachable forwarding path.
90. **A.** Complete records support audit, learning, and recurrence prevention.
