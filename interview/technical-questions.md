# Technical Interview Question Bank

Answer each aloud in 60–120 seconds. The “strong answer” is a compact target, not a script to memorize.

## Fundamentals

1. **What is a network?** A system of connected endpoints and intermediary devices exchanging data under protocols and policy to share services/resources.
2. **Bandwidth versus throughput versus goodput?** Bandwidth is theoretical path capacity; throughput is delivered traffic rate; goodput is useful application payload after overhead/retransmission.
3. **Hub versus switch?** A hub repeats signals to a shared collision domain; a switch learns source MACs and forwards/floods frames within VLANs.
4. **Collision versus broadcast domain?** Full-duplex switch ports isolate collisions; a VLAN is normally one Layer 2 broadcast domain, and routing separates broadcast domains.
5. **What is a MAC address used for?** Local Layer 2 frame delivery. It is not normally routed end to end.
6. **What is an IP address used for?** Logical source/destination identification and routed delivery across networks.
7. **What is encapsulation?** Each lower layer wraps higher-layer data with information needed for its scope; decapsulation reverses it.
8. **TCP versus UDP?** TCP is connection-oriented with sequence/ACK/retransmission; UDP is connectionless with lower overhead and application-managed reliability if needed.
9. **What does a port identify?** An application/service endpoint within a host and transport conversation; it is not a physical switch port in this context.
10. **What does TTL do?** Routers decrement it; expiration prevents indefinite Layer 3 loops and supports traceroute behavior.

## Addressing, ARP, and routing

11. **How does a host decide local versus remote?** Apply its prefix/mask to its address and destination; local traffic resolves the destination, remote traffic resolves the gateway.
12. **What does ARP resolve?** A local IPv4 next-hop address to a MAC. For remote traffic the target is usually the gateway, not the remote server.
13. **What is a subnet mask?** It defines which address bits are network versus host portions.
14. **Network and broadcast address?** Network identifies the subnet; broadcast targets all hosts in a traditional IPv4 subnet. Neither is a normal host address.
15. **Private versus public address?** RFC 1918 private addresses are not globally routed on the public Internet; public addressing must be globally coordinated. Private does not mean trusted.
16. **What causes APIPA?** A DHCP-enabled IPv4 client cannot obtain normal configuration and self-assigns link-local `169.254.0.0/16`.
17. **How does a router select a route?** Longest matching prefix first; route-source preference/AD for the same prefix; protocol metric among comparable paths.
18. **Default route?** A least-specific route used only when no more-specific match exists.
19. **NAT versus PAT?** NAT changes address mappings; PAT also distinguishes flows by transport ports so many clients can share an address.
20. **What changes at each router?** Layer 2 header is replaced and TTL decreases; IP endpoints normally remain unless NAT/tunneling modifies context.

## Switching and wireless

21. **What is a VLAN?** A logical Layer 2 broadcast domain on switched infrastructure.
22. **Access versus trunk port?** Access carries one endpoint VLAN normally untagged; trunk carries several VLANs, usually with 802.1Q tags and a native/untagged policy.
23. **What does STP prevent?** Layer 2 loops that cause broadcast storms, duplicate frames, and MAC instability.
24. **Why choose the root bridge intentionally?** It controls forwarding-tree shape; an unsuitable root can produce inefficient or unstable paths.
25. **What is LACP?** Standards-based negotiation of a logical Ethernet bundle; members must be consistent and one flow normally hashes to one link.
26. **What is an SVI?** Logical Layer 3 interface for a VLAN on a multilayer switch.
27. **Why can strong Wi-Fi signal still be slow?** Noise, contention, utilization, retries, client limits, channel width, roaming, or upstream bottlenecks.
28. **2.4 versus 5 versus 6 GHz?** Trade-offs include propagation, available channels, compatibility, interference, regulation, and capacity; survey evidence drives selection.
29. **WPA-Personal versus Enterprise?** Personal shares a secret; Enterprise uses 802.1X/EAP and AAA for per-user/device identity.
30. **Why is captive portal not encryption?** It controls web-based admission; link-layer protection must be configured separately.

## Services and operations

31. **Explain DHCP DORA.** Discover, Offer, Request, Acknowledge; relays carry requests across subnets.
32. **Reservation versus exclusion?** Reservation gives a known client a consistent address; exclusion prevents dynamic assignment from a range.
33. **Recursive versus authoritative DNS?** Recursive resolves for clients; authoritative publishes final data for zones it serves.
34. **A, AAAA, CNAME, MX, PTR?** IPv4, IPv6, alias, mail exchanger, and reverse pointer records.
35. **Why DNS TCP and UDP 53?** UDP is common; TCP supports truncated/large responses and transfers.
36. **Why accurate time?** Log correlation, certificate validation, authentication, and incident timelines depend on it.
37. **SNMP polling versus trap?** Manager polling checks state; agent notifications report events. Use both and prefer SNMPv3.
38. **Flow versus packet capture?** Flow summarizes conversations; capture provides packet/header and possible payload detail with greater sensitivity/storage.
39. **RPO versus RTO?** RPO is acceptable data-loss period; RTO is acceptable restoration duration.
40. **What belongs in a change?** Purpose, scope, risk/impact, approval/window, prechecks, steps, validation, rollback, owner, and record.

## Security and troubleshooting

41. **IDS versus IPS?** IDS observes/alerts; IPS is inline and can block, introducing availability considerations.
42. **Least privilege?** Grant only required access for the required task/time and review it.
43. **RADIUS versus TACACS+?** RADIUS is common for network access; TACACS+ is common for device administration and separates AAA control.
44. **DHCP snooping and DAI?** Snooping controls DHCP trust/builds bindings; DAI uses trusted bindings to reject inconsistent ARP.
45. **Port security?** Limits/learns allowed MAC behavior and reacts to violations; it is one control, not identity by itself.
46. **First troubleshooting step?** Identify problem: scope, symptoms, timeline, affected/unaffected users/services, and recent change.
47. **Why not clear counters immediately?** It destroys baseline evidence; record values and deltas first.
48. **Ping works, website fails—next?** Separate DNS, TCP port, TLS, HTTP/application, proxy, and policy using targeted tests.
49. **Connection refused versus timeout?** Refused is an active rejection/no listener; timeout is no expected response and could be filtering/path/service loss.
50. **When do you escalate?** When authority, risk, scope, time, or expertise crosses the role; include collected evidence and actions.

## Practical command follow-ups

51. **`ipconfig`/`ip address` shows what?** Interface state, addresses/prefix; combine with route and DNS evidence.
52. **`ip route get` answers what?** Selected route, next hop, interface, and source for one destination; it does not prove reachability.
53. **`arp -a`/`ip neighbor` answers what?** Neighbor-cache mapping/state for local next hops.
54. **`ss`/`netstat` answers what?** Listeners, active conversations, transport state, and sometimes processes/routes.
55. **`dig` versus `ping`?** `dig` tests name-service behavior; ping samples ICMP reachability/RTT. Neither proves the application alone.
56. **`traceroute` limitations?** Missing hop replies may reflect filtering/rate limits while forwarding still succeeds.
57. **`show interfaces trunk`?** Operational trunk, native VLAN, and allowed/forwarding VLAN evidence.
58. **`show mac address-table`?** Learned MAC-to-port/VLAN mappings and movement clues.
59. **`show ip route`?** Installed prefixes, sources, next hops, and default; it does not prove return path.
60. **How do you verify a fix?** Reproduce original user path, confirm expected counters/logs/security, test unaffected services, monitor stability, and document.

