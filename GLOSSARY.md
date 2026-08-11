# Plain-English Networking Glossary

| Term | Simple explanation |
|---|---|
| ACL | Ordered rules that permit or deny traffic |
| Administrative distance | Local preference for a route source; lower is usually preferred |
| AP | Access point that bridges wireless clients into a LAN |
| APIPA | Automatic IPv4 link-local address in `169.254.0.0/16` |
| ARP | Maps a local IPv4 address to a MAC address |
| Asset | Something valuable, such as data or a device |
| Authentication | Proving an identity |
| Authorization | Determining what an authenticated identity may do |
| Anycast | One address announced by several nodes; routing selects one |
| Availability | A service is usable when required |
| Baseline | Recorded reference of normal behavior |
| Bandwidth | Nominal path capacity |
| BGP | Policy-driven path-vector routing protocol |
| BSSID | Identifier of one wireless radio/cell |
| Broadcast | One sender to every member of an IPv4 broadcast domain |
| Broadcast domain | The Layer 2 scope where broadcasts are flooded, normally one VLAN |
| CA | Certificate authority that signs certificates |
| CAM/MAC table | Switch mapping of MAC addresses to VLANs and ports |
| Captive portal | Guest acceptance/login page; it is not encryption |
| Certificate | Signed statement binding an identity to a public key |
| CIDR | Classless prefix notation such as `/24` |
| CIA triad | Confidentiality, integrity, and availability |
| Client | A role that starts a service request |
| Cloud | On-demand, automatable IT resources on shared or dedicated infrastructure |
| Collision domain | Scope where devices contend/collide; each switch port separates it |
| Congestion | Demand exceeds capacity and creates queues or drops |
| Connector | Physical cable end such as LC or RJ45 |
| Control plane | Builds routing, switching, or policy decisions |
| CRC/FCS | Frame error-detection value |
| Data plane | Forwards actual traffic according to tables |
| Default gateway | Local router used for remote destinations |
| Default route | Least-specific route, IPv4 `0.0.0.0/0` or IPv6 `::/0` |
| DHCP | Assigns IP configuration under a lease |
| DHCP relay | Carries DHCP between subnets |
| DNS | Distributed naming and resource-record system |
| DNSSEC | Signs DNS data for origin authentication and integrity |
| DoH/DoT | DNS over HTTPS/TLS for encrypted client-to-resolver transport |
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
| Gateway | Device or service used to leave a local domain |
| Goodput | Useful application payload delivered per unit time |
| Honeypot | Decoy system used to detect or study activity |
| Host | Device with a network stack/address |
| HTTP/HTTPS | Web protocol; HTTPS is HTTP protected by TLS |
| IaC | Infrastructure state stored as version-controlled code/files |
| ICMP | IP error/control messaging and echo functions |
| IDF/MDF | Intermediate/main distribution location for cabling and devices |
| IDS/IPS | Intrusion detection / inline detection and prevention |
| Integrity | Unauthorized change is prevented or detectable |
| IP | Layer 3 logical addressing and delivery protocol |
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
| Loopback | Address that returns to the local host |
| MAC | Link-layer interface identifier |
| Metric | Cost used inside one routing protocol |
| MFA | Authentication using independent factor types |
| MTBF/MTTR | Mean time between failures / mean time to repair |
| MTU | Maximum transmission unit for an interface/path context |
| Multicast | One sender to subscribed group members |
| NAC | Controls endpoint admission and posture |
| NAS | File-level network storage |
| NAT/PAT | Address translation / address plus port translation |
| Neighbor Discovery | IPv6 neighbor, router, and address-resolution functions |
| NFV | Network functions implemented as software |
| North-south | Traffic entering or leaving a data center |
| NTP/NTS | Network time / security for NTP |
| OSI | Seven-layer conceptual networking model |
| OSPF | Link-state interior routing protocol |
| Packet | Layer 3 protocol data unit |
| Packet loss | Packets fail to reach the destination |
| Patch panel | Organized termination point for permanent cabling |
| PBQ | Performance-based exam question |
| PDU (power) | Power distribution unit; distinct from protocol data unit |
| PKI | Public-key infrastructure of CAs, certificates, and policy |
| PoE | Power over Ethernet |
| Port | TCP/UDP service identifier, or a physical interface by context |
| Prefix | Number of network bits, such as `/24` |
| Protocol | Agreed rules for communication |
| Proxy | Intermediary between client and server |
| QoS | Classifies and controls traffic behavior during congestion |
| RADIUS/TACACS+ | AAA protocols for access and device management |
| Reverse proxy | Intermediary acting for inbound servers |
| RFC | IETF standards or informational document |
| rDNS/PTR | Reverse mapping from an IP address to a name |
| RPO/RTO | Acceptable data loss / acceptable recovery time |
| Router | Forwards IP packets between networks |
| Routing table | Known prefixes, next hops, and outgoing interfaces |
| SAN | Block-level network storage |
| SASE/SSE | WAN plus cloud security / cloud-delivered security services |
| Scalability | Ability to increase capacity |
| Segment | TCP PDU; also sometimes a logical network portion |
| Server | Role that provides a service |
| SLA | Measurable service-level agreement |
| SLAAC | IPv6 address autoconfiguration from Router Advertisements |
| SNMP | Monitoring/management using OIDs and MIBs |
| SOA | DNS record holding zone authority and timer metadata |
| Spine-leaf | Data-center topology with every leaf connected to every spine |
| SSO | One sign-in used across several services |
| STP/RSTP | Layer 2 loop-prevention protocols |
| Subnet | Addresses sharing a common prefix |
| Switch | Forwards local frames |
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
| WLC | Central controller for wireless APs |
| Zero Trust | Access based on identity, posture, context, and minimal implicit trust |
