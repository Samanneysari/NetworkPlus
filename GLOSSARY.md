# Plain-English Networking Glossary

| Term | Simple explanation |
|---|---|
| ACK | TCP flag indicating that the acknowledgment field is valid |
| ACL | Ordered rules that permit or deny traffic |
| Administrative distance | Local preference for a route source; lower is usually preferred |
| AP | Access point that bridges wireless clients into a LAN |
| APIPA | Automatic IPv4 link-local address in `169.254.0.0/16` |
| ARP | Maps a local IPv4 address to a MAC address |
| ARP Request/Reply | Broadcast IPv4-to-MAC question and the normally unicast answer |
| Asset | Something valuable, such as data or a device |
| Authentication | Proving an identity |
| Authorization | Determining what an authenticated identity may do |
| Anycast | One address announced by several nodes; routing selects one |
| Availability | A service is usable when required |
| Baseline | Recorded reference of normal behavior |
| Bandwidth | Nominal path capacity |
| BGP | Policy-driven path-vector routing protocol |
| Bit | One binary digit, `0` or `1` |
| Bit rate | Number of bits transmitted or represented per second |
| BSSID | Identifier of one wireless radio/cell |
| Broadcast | One sender to every member of an IPv4 broadcast domain |
| Broadcast address | IPv4 subnet address with every host bit set to one |
| Broadcast domain | The Layer 2 scope where broadcasts are flooded, normally one VLAN |
| Byte | Eight bits |
| CA | Certificate authority that signs certificates |
| CAN | Campus Area Network; confirm context because CAN can also mean Controller Area Network |
| CAM/MAC table | Switch mapping of MAC addresses to VLANs and ports |
| Captive portal | Guest acceptance/login page; it is not encryption |
| Certificate | Signed statement binding an identity to a public key |
| CIDR | Classless prefix notation such as `/24` |
| CIA triad | Confidentiality, integrity, and availability |
| Client | A role that starts a service request |
| Client-server | Model in which clients request services from a server role |
| Cloud | On-demand, automatable IT resources on shared or dedicated infrastructure |
| Collision domain | Scope where devices contend/collide; each switch port separates it |
| Congestion | Demand exceeds capacity and creates queues or drops |
| Connector | Physical cable end such as LC or RJ45 |
| Control plane | Builds routing, switching, or policy decisions |
| CRC/FCS | Frame error-detection value |
| Data plane | Forwards actual traffic according to tables |
| Decapsulation | Validating and removing layer-specific headers/trailers at a receiver or forwarding boundary |
| Default gateway | Local router used for remote destinations |
| Default route | Least-specific route, IPv4 `0.0.0.0/0` or IPv6 `::/0` |
| Destination unreachable | ICMP evidence from a device that could not deliver a packet |
| DHCP | Assigns IP configuration under a lease |
| DHCP relay | Carries DHCP between subnets |
| DNS | Distributed naming and resource-record system |
| DNSSEC | Signs DNS data for origin authentication and integrity |
| DoH/DoT | DNS over HTTPS/TLS for encrypted client-to-resolver transport |
| Domain (AD) | Centralized Windows identity and management boundary using Active Directory Domain Services |
| Duplex | Simultaneous direction mode: full or half |
| East-west | Traffic between internal data-center workloads |
| Elasticity | Capacity automatically grows and shrinks with demand |
| Encapsulation | Adding layer-specific headers and trailers |
| Endpoint | Final device such as laptop, phone, camera, or server |
| Ethernet | IEEE 802.3 Layer 1/2 networking family |
| FHRP | Redundant default-gateway protocols using a virtual IP |
| Firewall | Enforces traffic policy, often with connection state |
| Flow | Summary of one network conversation |
| Forward proxy | Intermediary acting for clients |
| Frame | Layer 2 protocol data unit |
| Full-duplex | Both sides can transmit simultaneously |
| Gateway | Device or service used to leave a local domain |
| General failure | Windows local-send failure; not a remote ICMP reply |
| Goodput | Useful application payload delivered per unit time |
| Half-duplex | Both sides can transmit, but not simultaneously |
| Honeypot | Decoy system used to detect or study activity |
| Host | Device with a network stack/address |
| Host ID | Beginner term for address bits outside the network prefix |
| HTTP/HTTPS | Web protocol; HTTPS is HTTP protected by TLS |
| Hub | Layer 1 repeater whose ports share one collision domain |
| Hypervisor | Software layer that creates and manages virtual machines |
| IaC | Infrastructure state stored as version-controlled code/files |
| ICMP | IP error/control messaging and echo functions |
| IDF/MDF | Intermediate/main distribution location for cabling and devices |
| IDS/IPS | Intrusion detection / inline detection and prevention |
| Integrity | Unauthorized change is prevented or detectable |
| IP | Layer 3 logical addressing and delivery protocol |
| IPv4 class | Historical A/B/C unicast grouping replaced by classless prefixes in modern routing |
| IPAM | Management of prefixes, subnets, addresses, and owners |
| IPsec | IP protection using IKE, AH, and/or ESP |
| Jitter | Variation in packet delay |
| Jump host | Controlled administrative entry point to other systems |
| LACP | Standard negotiation for link aggregation |
| LAN | Local-area network |
| Latency | Delivery delay |
| Layer 2 switch | Forwards frames using MAC addresses |
| Layer 3 switch | Performs switching and IP routing |
| Lease | Time-limited DHCP assignment |
| Least privilege | Only the minimum required permission |
| Load balancer | Distributes requests among backend services |
| Linux | Open-source kernel used by distributions such as Ubuntu and Debian |
| Loopback | Address that returns to the local host |
| MAC | Link-layer interface identifier |
| MAN | Metropolitan Area Network |
| Metric | Cost used inside one routing protocol |
| MFA | Authentication using independent factor types |
| MTBF/MTTR | Mean time between failures / mean time to repair |
| MTU | Maximum transmission unit for an interface/path context |
| Multicast | One sender to subscribed group members |
| NAC | Controls endpoint admission and posture |
| NAS | File-level network storage |
| NAT/PAT | Address translation / address plus port translation |
| Net ID | Beginner term for the address bits selected by the network prefix |
| Netstat | Command that reports sockets, listeners, statistics, or routes depending on options |
| Network address | IPv4 subnet identifier with all host bits set to zero |
| Neighbor Discovery | IPv6 neighbor, router, and address-resolution functions |
| NFV | Network functions implemented as software |
| North-south | Traffic entering or leaving a data center |
| NTP/NTS | Network time / security for NTP |
| OSI | Seven-layer conceptual networking model |
| Operating system | Software that manages hardware and provides services to applications |
| Octet | Eight bits; one dotted-decimal part of an IPv4 address |
| OSPF | Link-state interior routing protocol |
| Packet | Layer 3 protocol data unit |
| Packet loss | Packets fail to reach the destination |
| PAN | Personal Area Network |
| Patch panel | Organized termination point for permanent cabling |
| PBQ | Performance-based exam question |
| Peer-to-peer | Model in which peers can communicate directly and act as both clients and servers |
| PDU (power) | Power distribution unit; distinct from protocol data unit |
| PKI | Public-key infrastructure of CAs, certificates, and policy |
| PoE | Power over Ethernet |
| Port | TCP/UDP service identifier, or a physical interface by context |
| Prefix | Number of network bits, such as `/24` |
| Private IPv4 | RFC 1918 address space intended for internal use and not globally routed on the public Internet |
| Protocol | Agreed rules for communication |
| Proxy | Intermediary between client and server |
| QoS | Classifies and controls traffic behavior during congestion |
| Public IPv4 | Globally unique IPv4 address that may be publicly routed subject to route and policy |
| RADIUS/TACACS+ | AAA protocols for access and device management |
| Reverse proxy | Intermediary acting for inbound servers |
| Request timed out | No acceptable response arrived before the local wait expired |
| RFC | IETF standards or informational document |
| rDNS/PTR | Reverse mapping from an IP address to a name |
| RPO/RTO | Acceptable data loss / acceptable recovery time |
| Router | Forwards IP packets between networks |
| Routing table | Known prefixes, next hops, and outgoing interfaces |
| RTT | Round-trip time from sending a request until its response returns |
| SAN | Block-level network storage |
| SASE/SSE | WAN plus cloud security / cloud-delivered security services |
| Scalability | Ability to increase capacity |
| Segment | TCP PDU; also sometimes a logical network portion |
| Server | Role that provides a service |
| SLA | Measurable service-level agreement |
| SLAAC | IPv6 address autoconfiguration from Router Advertisements |
| Simplex | Communication in only one direction |
| SNMP | Monitoring/management using OIDs and MIBs |
| SOA | DNS record holding zone authority and timer metadata |
| Spine-leaf | Data-center topology with every leaf connected to every spine |
| SPOF | Single point of failure whose loss stops a required service |
| SSO | One sign-in used across several services |
| STP/RSTP | Layer 2 loop-prevention protocols |
| Subnet | Addresses sharing a common prefix |
| Subnet mask/netmask | IPv4 bit mask separating the network prefix from remaining address bits |
| Switch | Forwards local frames |
| Switch flooding | Copying broadcast, unknown-unicast, or selected multicast frames to eligible ports in one VLAN |
| Syslog | Event message format/transport with severity levels |
| TCP | Connection-oriented reliable ordered byte stream |
| Throughput | Actual data-transfer rate |
| TLS | Cryptographic protection for application traffic |
| TTL/Hop Limit | Limits the number of routed hops |
| UDP | Connectionless transport datagram service |
| Unicast | One source to one destination |
| VLAN | Logical Layer 2 broadcast domain |
| VLSM | Differently sized prefixes in one address plan |
| VPN | Protected tunnel across another network |
| VRF | Separate routing table on one device |
| VTEP/VXLAN | Tunnel endpoint / Layer 2 overlay across Layer 3 |
| WAN | Wide-area network connecting sites |
| Windows | Microsoft operating-system family |
| WLC | Central controller for wireless APs |
| Workgroup | Named Windows peer collection with local rather than centralized account management |
| Zero Trust | Access based on identity, posture, context, and minimal implicit trust |
