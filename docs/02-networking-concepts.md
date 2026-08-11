# Chapter 2 — Networking Concepts

This chapter covers Domain 1 except Objective 1.1, which is taught in the dedicated OSI chapter. The goal is to select the correct appliance, service, medium, address, and architecture for a real requirement.

## 1.2 — Appliances, applications, and functions

### Routers, switches, and security devices

| Component | Primary job | Decision basis | Example use |
|---|---|---|---|
| Router | Connect IP networks | Destination IP and route table | Connect a LAN to a WAN |
| Layer 2 switch | Connect devices in a VLAN | Destination MAC | Access switching |
| Layer 3 switch | Switch and route at high speed | MAC and IP | Inter-VLAN routing |
| Firewall | Enforce traffic policy | Address, port, application, identity, and state | Separate trusted and untrusted zones |
| IDS | Detect and alert | Signatures and behavior | Out-of-band attack visibility |
| IPS | Detect and block | Signatures and behavior | In-line threat prevention |
| Load balancer | Distribute requests | Health, sessions, and algorithms | Share HTTPS across web servers |
| Forward proxy | Act for clients | URL, policy, cache, and identity | Control outbound web access |
| Reverse proxy | Act for servers | Hostname, path, health, and policy | Protect `www.realsam.ir` |
| NAS | Provide file storage | SMB or NFS files | Shared folders and backups |
| SAN | Provide block storage | iSCSI or Fibre Channel blocks | Hypervisor or database disks |
| Access point | Bridge wireless clients | SSID, BSSID, authentication | Wi-Fi access |
| Wireless controller | Manage APs centrally | RF and security policy | Enterprise WLAN |

An IDS usually observes and alerts. An IPS is in the forwarding path and can drop traffic, which provides direct protection but also makes false positives more operationally important.

A load balancer may use round robin, least connections, or hashing. A health check removes failed backends. If TLS ends at the load balancer, this is TLS termination; the backend path may still require re-encryption.

NAS exposes files and directories. SAN exposes raw blocks so the client system creates a filesystem. They solve different storage problems.

### CDN, VPN, QoS, and TTL

- A **CDN** caches content at edge locations near users, reducing latency and origin load.
- A **VPN** creates a protected tunnel across an untrusted or shared network. It does not make an infected endpoint safe.
- **QoS** classifies, marks, queues, polices, or shapes traffic. It controls behavior during congestion; it does not create bandwidth.
- IPv4 **TTL** and IPv6 **Hop Limit** decrease at each router. A packet is discarded at zero to prevent indefinite routing loops. Traceroute uses this behavior.

## 1.3 — Cloud and virtual networking

### Virtualization and NFV

A hypervisor divides a physical host among virtual machines. Containers normally share the host kernel and are lighter. Network Functions Virtualization runs firewalls, routers, load balancers, and similar functions as software rather than dedicated appliances.

Virtualization does not remove the need for capacity planning, segmentation, patching, monitoring, and redundancy.

### VPC and cloud controls

A Virtual Private Cloud is a logically isolated cloud network containing subnets, routes, gateways, and security policy.

- **Security group:** commonly stateful; return traffic for an allowed connection is recognized.
- **Network ACL:** commonly stateless at a subnet boundary; both directions require rules.
- **Internet gateway:** connects eligible cloud resources to the Internet.
- **NAT gateway:** gives private resources outbound IPv4 access without directly accepting unsolicited inbound sessions.
- **Cloud VPN:** encrypted tunnel over the Internet.
- **Direct connection:** dedicated private connectivity with more predictable performance; encryption must not be assumed without verification.

### Deployment and service models

| Model | Meaning | Typical customer responsibility |
|---|---|---|
| Public cloud | Provider infrastructure shared with logical isolation | Data, identity, configuration, and workloads |
| Private cloud | Cloud environment dedicated to one organization | More of the platform and infrastructure stack |
| Hybrid cloud | Integrated private/on-premises and public cloud | Identity, routing, policy, and data integration |
| SaaS | Finished application | Users, data, and application settings |
| PaaS | Managed application platform | Code, data, and application configuration |
| IaaS | Compute, storage, and virtual networking | Guest OS, patching, applications, data, and access |

**Scalability** is the ability to grow. Vertical scaling makes one node larger; horizontal scaling adds nodes. **Elasticity** changes capacity up and down with demand. **Multitenancy** serves several customers on shared infrastructure while maintaining logical isolation.

## 1.4 — Ports, protocols, services, and traffic types

A logical port identifies a service on a host. Server port 443 is not a physical socket. A client normally chooses a temporary ephemeral port and connects to the server's known port.

| Service | Default port | Transport | Purpose and note |
|---|---:|---|---|
| FTP | 20/21 | TCP | Data/control; no default confidentiality |
| SSH/SFTP | 22 | TCP | Secure management and file transfer |
| Telnet | 23 | TCP | Insecure clear-text management |
| SMTP | 25 | TCP | Mail transfer between servers |
| DNS | 53 | UDP/TCP | Normal queries often UDP; large answers and transfers use TCP |
| DHCPv4 | 67/68 | UDP | Server/client configuration |
| TFTP | 69 | UDP | Simple transfer without built-in security |
| HTTP | 80 | TCP | Web without TLS |
| NTP | 123 | UDP | Time synchronization |
| SNMP | 161/162 | UDP | Poll/trap; prefer SNMPv3 |
| LDAP | 389 | TCP/UDP | Directory access; protect with TLS where required |
| HTTPS | 443 | TCP; HTTP/3 uses UDP | HTTP protected by TLS |
| SMB | 445 | TCP | File and printer sharing |
| Syslog | 514 | UDP | Traditional event transport |
| SMTP submission | 587 | TCP | Authenticated client mail submission, commonly with STARTTLS |
| LDAPS | 636 | TCP | LDAP inside TLS |
| SQL Server | 1433 | TCP | Microsoft SQL Server |
| RDP | 3389 | TCP/UDP | Remote desktop |
| SIP | 5060/5061 | UDP/TCP/TLS | VoIP signaling; media normally uses RTP |

Default ports can be changed. Changing a port does not replace authentication, patching, and filtering.

### Protocols without TCP/UDP ports

- **ICMP/ICMPv6:** errors, echo, path MTU, and critical IPv6 neighbor functions. Blocking all ICMP can break networking.
- **GRE:** simple encapsulation; no confidentiality or integrity by itself.
- **IPsec AH:** integrity and source authentication without payload confidentiality; less NAT-friendly.
- **IPsec ESP:** confidentiality and usually integrity; common for IPsec data protection.
- **IKE/IKEv2:** negotiates IPsec peers, algorithms, and keys, commonly on UDP 500 and UDP 4500 for NAT Traversal.

### Unicast, broadcast, multicast, and anycast

| Type | One source sends to | Example |
|---|---|---|
| Unicast | One specific destination | SSH to one server |
| Broadcast | All members of an IPv4 broadcast domain | DHCP Discover |
| Multicast | Members of a subscribed group | Routing or media distribution |
| Anycast | One selected instance sharing an address | Distributed DNS or CDN edge |

IPv6 has no broadcast and uses multicast for equivalent functions. Anycast is normally a routing selection, not a copy delivered to every instance.

## 1.5 — Media, transceivers, and connectors

### Copper and fiber

| Characteristic | Twisted-pair copper | Multimode fiber | Single-mode fiber |
|---|---|---|---|
| Signal | Electrical | Light with a larger core | Light with a smaller core |
| Typical relative distance | Shorter | Medium | Long |
| EMI sensitivity | Yes | No | No |
| Typical use | Access and desks | Building/data center | Backbone and WAN |

Exact distance depends on Ethernet standard, speed, cable, optic, and installation quality.

### Copper categories

| Category | Common use | Important note |
|---|---|---|
| Cat 5e | 1 GbE channels | Termination and pair quality matter |
| Cat 6 | 1 GbE and shorter 10 GbE runs | Crosstalk limits high-speed reach |
| Cat 6A | 10 GbE up to a 100 m channel | Larger cable and bundle management |
| Cat 7 | Shielded ISO/IEC systems | Verify connector and installation standard |
| Cat 8 | 25/40 GbE short data-center channels | Not intended as general office horizontal cabling |

A basic continuity tester does not certify category performance. A certification tester measures parameters such as insertion loss, return loss, and crosstalk.

### Other media

- **DAC/Twinax:** short copper assemblies with attached transceiver ends, common inside racks.
- **Coaxial:** central conductor and shielding, used for cable broadband and some legacy systems.
- **Plenum-rated cable:** low-smoke jacket for air-handling spaces, subject to local building rules.
- **802.11 wireless:** a shared radio LAN medium.
- **Cellular:** carrier-operated radio access such as 4G and 5G.
- **Satellite:** broad coverage; distance and orbit affect latency.

### Transceivers and connectors

SFP, SFP+, SFP28, and QSFP families support different speeds and media. A matching shape does not guarantee compatibility. Verify speed, wavelength, fiber type, reach, connector, encoding, and platform support.

| Connector | Common use |
|---|---|
| RJ45/8P8C | Ethernet over twisted pair |
| RJ11 | Telephone and some DSL connections |
| LC | Compact fiber connection on transceivers |
| SC | Larger push-pull fiber connector |
| ST | Twist-lock fiber connector, often legacy |
| MPO/MTP | Several fiber strands in one connector |
| F-type | Cable television and cable modem coax |
| BNC | Bayonet coax connection for tools and legacy systems |

Never look into a fiber end. Invisible optical energy can damage eyes. Inspect and clean connectors with approved procedures.

## 1.6 — Topologies, architectures, and traffic flow

- **Star:** endpoints connect to a central device. One access cable failure affects one endpoint; central failure has wide impact.
- **Mesh:** nodes have several paths. Full mesh maximizes connectivity but greatly increases links and cost.
- **Hybrid:** combines topologies.
- **Hub-and-spoke:** branches connect through a central hub; simple but the hub needs capacity and redundancy.
- **Point-to-point:** a direct link between two endpoints.
- **Three-tier:** access, distribution, and core.
- **Collapsed core:** combines distribution and core for a smaller network.
- **Spine-leaf:** every leaf connects to every spine, creating predictable equal-cost paths for data-center traffic.

**North-south traffic** enters or leaves a data center. **East-west traffic** moves between internal workloads. The names describe logical direction, not geography.

## 1.7 — IPv4, CIDR, VLSM, and classes

IPv4 contains 32 bits, normally shown as four decimal octets. A prefix states how many leading bits identify the network. In `192.0.2.10/24`, 24 bits are the network portion and eight are the host portion.

### Important ranges

| Type | Range | Use |
|---|---|---|
| RFC 1918 private | `10.0.0.0/8` | Internal addressing |
| RFC 1918 private | `172.16.0.0/12` | Internal addressing |
| RFC 1918 private | `192.168.0.0/16` | Internal addressing |
| Link-local/APIPA | `169.254.0.0/16` | Automatic local address when normal configuration fails |
| Loopback | `127.0.0.0/8` | The local host |
| Documentation | `192.0.2.0/24`, `198.51.100.0/24`, `203.0.113.0/24` | Safe examples |

Private does not mean secure. A firewall and access controls are still required.

### Subnet example

Find the subnet for `192.0.2.77/27`:

1. `/27` leaves five host bits.
2. Each block contains `2^5 = 32` addresses.
3. Boundaries in the last octet are 0, 32, 64, 96, and so on.
4. 77 falls between 64 and 95.
5. Network: `192.0.2.64`; broadcast: `192.0.2.95`.
6. Normal host range: `192.0.2.65` through `192.0.2.94`, for 30 hosts.

The usual host formula is `2^h - 2`; `/31` point-to-point links and `/32` host routes are important exceptions.

CIDR removed the fixed relationship between prefix and historical class. VLSM uses different prefix lengths in one plan to reduce waste. Class A, B, and C remain historical exam vocabulary; Class D is multicast and Class E is experimental/reserved. Modern routing is classless.

## IPv6 from zero

IPv6 is 128 bits and uses eight hexadecimal groups. Leading zeroes in a group may be removed, and one continuous sequence of zero groups may be replaced by `::` once.

```text
2001:0db8:0000:0000:0000:0000:0000:0080
2001:db8::80
```

These lines represent the same address.

| Type | Range/example | Purpose |
|---|---|---|
| Global unicast | Commonly `2000::/3` | Publicly routed; documentation uses `2001:db8::/32` |
| Link-local | `fe80::/10` | Same-link communication, ND, and gateway use |
| Unique local | `fc00::/7`, commonly `fd...` | Private internal use without a NAT requirement |
| Loopback | `::1/128` | Local host |
| Unspecified | `::/128` | No address selected yet |
| Multicast | `ff00::/8` | Group delivery; IPv6 has no broadcast |
| Anycast | A unicast address on several interfaces | Routing selects an instance |

Neighbor Discovery uses ICMPv6 for address resolution, router discovery, and Duplicate Address Detection. A link-local destination may require an interface zone such as `fe80::1%eth0`.

SLAAC can create an address from Router Advertisements. An interface identifier may be stable, private/randomized, or historically derived with Modified EUI-64. Modern clients often use privacy addresses, so do not assume an IPv6 address contains the MAC.

## 1.8 — Modern networking

### SDN and SD-WAN

Software-Defined Networking separates logical control from packet forwarding and centralizes policy. SD-WAN applies centralized, application-aware policy to WAN links:

- Application-aware path selection.
- Zero-touch provisioning.
- Transport independence across MPLS, broadband, and cellular.
- Central policy management.

Controllers are critical systems and require redundancy, authentication, logging, and secure management.

### VXLAN and DCI

VXLAN encapsulates Layer 2 frames inside UDP over Layer 3. A 24-bit VNI supports far more logical segments than the 12-bit VLAN ID. A VTEP performs encapsulation and decapsulation. Data Center Interconnect links facilities; extending Layer 2 between sites should be a deliberate decision because it expands the failure domain.

### ZTA, SSE, and SASE

- **Zero Trust Architecture:** no permanent trust based only on network location; use identity, device posture, context, least privilege, and continuous evaluation.
- **Security Service Edge:** cloud-delivered security functions such as secure web gateway, CASB, and ZTNA.
- **Secure Access Service Edge:** combines WAN capabilities with SSE services.

Zero Trust is an architecture, not a single product.

### Infrastructure as Code

IaC stores intended infrastructure state in version-controlled files. Benefits include review, repeatability, auditability, and rollback. Secrets must not be committed to Git. A pipeline should validate syntax, policy, and planned changes before production.

### IPv6 transition

- **Dual stack:** run IPv4 and IPv6 together; clear but requires operating both securely.
- **Tunneling:** carry one protocol through another; adds MTU and troubleshooting complexity.
- **NAT64 with DNS64:** allows IPv6-only clients to reach IPv4-only services; applications using literal IPv4 addresses may fail.

IPv6 is not automatically secure. Firewalling, patching, logging, and monitoring are required for both stacks.

### Wi-Fi generations

| IEEE | Common name | Main bands | Key idea |
|---|---|---|---|
| 802.11a | Legacy | 5 GHz | OFDM |
| 802.11b/g | Legacy | 2.4 GHz | Older rates consume airtime |
| 802.11n | Wi-Fi 4 | 2.4/5 GHz | MIMO and channel bonding |
| 802.11ac | Wi-Fi 5 | 5 GHz | Wider channels and MU-MIMO evolution |
| 802.11ax | Wi-Fi 6/6E | 2.4/5/6 GHz | OFDMA and dense-environment efficiency |
| 802.11be | Wi-Fi 7 | 2.4/5/6 GHz | Multi-Link Operation and wider channels |

Advertised maximum rate is not real throughput. Spatial streams, channel width, modulation, signal, interference, client capability, and regulatory rules all matter.

## End-of-chapter exercises

1. Describe the role of a router, switch, access point, firewall, and NAS in a 40-person office.
2. Explain stateful security groups versus stateless ACLs, including return traffic.
3. Identify which listed legacy protocols lack default confidentiality.
4. Calculate the network, broadcast, and host range for `198.51.100.141/28`.
5. Explain why extending one VLAN between data centers can create a large failure domain.
6. Compare dual stack with NAT64 for a new network.
