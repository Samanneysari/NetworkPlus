# Foundation Course Map

These lessons build the prerequisite knowledge needed by the exam-domain chapters. Study them in order; later lessons assume the vocabulary and packet path established earlier.

| Order | Lesson | Main coverage |
|---:|---|---|
| 1 | [Computers and operating systems](01-computers-and-operating-systems.md) | OS, Linux, Windows, Cisco platforms, hypervisors, bits/bytes, decimal/hex, bit rate, bandwidth, throughput, and goodput |
| 2 | [Network models and scope](02-network-models-and-scopes.md) | Network, client/server, peer-to-peer, workgroup/domain, SPOF, PAN/LAN/CAN/MAN/WAN, OSI, encapsulation, and traffic direction/types |
| 3 | [Ethernet, switching, and MAC](03-ethernet-switching-and-mac.md) | MAC, hub, switch, source learning, destination forwarding, flooding, collision/broadcast domains, duplex, and Layer 3 switching |
| 4 | [IPv4, routing, and ARP](04-ipv4-routing-and-arp.md) | IP, octets, masks, network/host portions, addresses, classes, private/public space, gateways, routes, and a complete ARP scenario |
| 5 | [Transport, NAT, and diagnostics](05-transport-nat-and-diagnostics.md) | Ports, TCP/UDP, ACK, TCP/IP, NAT/PAT, ping results, RTT, TTL, tracert/traceroute, netstat, and `ss` |

## Completion standard

Before continuing, you should be able to draw and explain one packet exchange that includes:

1. An application choosing a server name and port.
2. DNS returning an IP address.
3. The host using its mask and routing table to select a local destination or gateway.
4. ARP resolving the correct next-hop MAC.
5. A switch learning the source MAC and forwarding or flooding from the destination MAC.
6. A router removing the old frame, decrementing TTL, selecting a route, and building a new frame.
7. TCP or UDP delivering data to the correct application endpoint.
8. NAT/PAT changing addresses/ports when the design requires translation.
9. `ping`, traceroute, route, neighbor, and socket evidence narrowing a failure without guessing.

Return to [Networking from Zero](../00-network-from-zero.md) for the short narrative, then continue to the detailed [OSI, TCP/IP, TCP, UDP, and TLS chapter](../01-osi-tcp-ip-tls.md).
