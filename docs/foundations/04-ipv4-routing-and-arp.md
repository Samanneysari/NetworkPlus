# Foundation 4 — IPv4, Routing, Gateways, and ARP

This lesson builds IPv4 addressing from the octet upward, then follows a complete packet through switches and a router. It explains the exact address that Address Resolution Protocol (ARP) resolves for local and remote destinations.

## What is an IP address?

An **Internet Protocol (IP) address** is a Layer 3 logical address used to identify an interface and route packets between networks. IPv4 addresses are 32 bits; IPv6 addresses are 128 bits.

An IP address is assigned through configuration or an address-assignment process. A MAC address serves local-link delivery. Neither address alone proves a user's identity or authorization.

## Octet

IPv4 is normally written as four decimal **octets** separated by dots:

```text
192.0.2.77
```

Each octet contains eight bits and therefore has a decimal value from 0 through 255. Four octets provide `4 × 8 = 32` bits.

```text
192      .0        .2        .77
11000000 .00000000 .00000010 .01001101
```

## Subnet mask and prefix length

A **subnet mask** identifies which address bits form the network prefix and which bits remain available for host/interface identification.

```text
IP address:  192.0.2.77
Mask:        255.255.255.224
Prefix:      /27
```

`255.255.255.224` and `/27` represent the same mask: 27 leading network bits followed by five host bits.

Valid subnet masks contain contiguous `1` bits followed by contiguous `0` bits. A value such as `255.0.255.0` is not a valid normal IPv4 subnet mask.

## Network ID and host ID

The **network portion** identifies the subnet. The remaining **host portion** identifies an interface within that subnet. Their boundary depends on the prefix length, not only on the dotted-decimal address.

For `192.0.2.77/27`:

1. `/27` leaves five host bits.
2. Five bits provide blocks of `2^5 = 32` addresses.
3. Boundaries in the final octet are 0, 32, 64, 96, and so on.
4. 77 is inside the 64–95 block.
5. Network address: `192.0.2.64`.
6. Broadcast address: `192.0.2.95`.
7. Traditional usable host range: `192.0.2.65–192.0.2.94`.

The terms **network ID** and **host ID** are useful beginner shorthand. Modern routing operates on an address plus prefix, and an IP address is normally assigned to an interface rather than to an entire physical computer.

## Network address and broadcast address

- The **network address** has every host bit set to zero. It identifies the subnet and is not normally assigned as a host address.
- The directed **broadcast address** has every host bit set to one. It addresses all IPv4 nodes in that subnet and is not normally assigned to one host.

The common host-count formula is `2^h - 2`, where `h` is the number of host bits. `/31` point-to-point links and `/32` host routes are important exceptions, so do not apply the formula blindly.

## Historical IPv4 classes

Classful addressing is historical. Modern networks use Classless Inter-Domain Routing (CIDR), but the class names still appear in foundational material.

| Class | Historical first-octet range | Historical default mask | Original purpose |
|---|---:|---|---|
| A | 1–126 | `/8` | Very large unicast networks |
| B | 128–191 | `/16` | Medium unicast networks |
| C | 192–223 | `/24` | Smaller unicast networks |
| D | 224–239 | Not a unicast mask | Multicast |
| E | 240–255 | Not a normal unicast class | Reserved/experimental use |

`127.0.0.0/8` is loopback and is not a normal Class A host range. A modern route such as `10.20.30.0/27` must be interpreted from `/27`, not from the historical Class A default.

## Private, public, link-local, loopback, and documentation addresses

| Type | IPv4 range | Meaning |
|---|---|---|
| RFC 1918 private | `10.0.0.0/8` | Internal addressing, not globally routed on the public Internet |
| RFC 1918 private | `172.16.0.0/12` | Internal addressing |
| RFC 1918 private | `192.168.0.0/16` | Internal addressing |
| Link-local/APIPA | `169.254.0.0/16` | Same-link automatic addressing when normal configuration is unavailable |
| Loopback | `127.0.0.0/8` | The local IPv4 host |
| Documentation | `192.0.2.0/24`, `198.51.100.0/24`, `203.0.113.0/24` | Public examples that should not represent real systems |

A **public IPv4 address** is globally unique and potentially routable on the public Internet, subject to allocation, routing, and policy. Public does not mean reachable: a firewall, missing route, service state, or provider can still block it. Private does not mean secure: private networks still need access control, segmentation, patching, and monitoring.

## Default gateway

A host uses its subnet mask to decide whether a destination is local.

- If local, it resolves the destination's MAC and sends directly.
- If remote, it selects a route—usually the default route—and resolves the next-hop/default-gateway MAC.

The **default gateway** is the router used when no more specific route matches. Its IP address must normally be reachable through one of the host's directly connected subnets.

A host never ARPs across the Internet for a remote server's MAC. ARP is local-link resolution; for a remote destination, the host ARPs for its next hop.

## Routing table

A **routing table** contains destination prefixes and the next hop or outgoing interface used to reach them.

```text
Destination       Next hop       Interface      Meaning
10.10.10.0/24     connected      Ethernet0      Local subnet
10.20.0.0/16      10.10.10.254   Ethernet0      Specific remote network
0.0.0.0/0         10.10.10.1     Ethernet0      Default route
```

Route selection starts with the **longest-prefix match**. `10.20.0.0/16` is more specific than `0.0.0.0/0`, so traffic to `10.20.30.40` uses `10.10.10.254` rather than the default gateway.

Routers also compare route source preference and protocol metrics when multiple routes describe the same prefix. Read [Network Implementation](../03-network-implementation.md) for administrative distance and dynamic routing.

## What is ARP?

**Address Resolution Protocol (ARP)** maps an IPv4 address to a local-link hardware address, normally a 48-bit Ethernet MAC address. ARP is carried directly inside an Ethernet frame and does not use a TCP or UDP port.

An ARP message includes:

| Field | Ethernet/IPv4 value or purpose |
|---|---|
| Hardware type | Ethernet is commonly `1` |
| Protocol type | IPv4 EtherType is `0x0800` |
| Hardware length | Six bytes for a 48-bit MAC |
| Protocol length | Four bytes for IPv4 |
| Operation | Request `1` or reply `2` |
| Sender hardware address | Sender MAC |
| Sender protocol address | Sender IPv4 address |
| Target hardware address | Unknown/zero in a normal request; responder MAC in reply |
| Target protocol address | IPv4 address being resolved |

The Ethernet EtherType for ARP is `0x0806`.

### ARP Request

The sender asks: “Who has this target IPv4 address?” The Ethernet destination is broadcast `ff:ff:ff:ff:ff:ff`, so switches flood the request inside the VLAN.

### ARP Reply

The owner replies with its MAC address. The normal reply is unicast to the requester because the requester included its own IP and MAC in the request.

Hosts store learned mappings temporarily in an ARP/neighbor cache. Aging and state behavior vary by OS and platform.

## Complete ARP and routed-packet scenario

Use this topology:

| Device/interface | IPv4/prefix | MAC | VLAN |
|---|---|---|---:|
| Client A | `10.10.10.25/24` | `00:11:22:33:44:55` | 10 |
| Router VLAN 10 | `10.10.10.1/24` | `00:aa:aa:aa:aa:10` | 10 |
| Router VLAN 20 | `10.10.20.1/24` | `00:aa:aa:aa:aa:20` | 20 |
| Server B | `10.10.20.80/24` | `00:66:77:88:99:aa` | 20 |

Client A wants to ping Server B. Both ARP caches and switch MAC tables initially have no relevant dynamic entries.

### Phase 1: Client A chooses local or remote

Client A applies its `/24` mask:

- Local network: `10.10.10.0/24`.
- Destination: `10.10.20.80`.
- The destination is remote, so Client A selects default gateway `10.10.10.1`.

Client A must learn the gateway MAC, not Server B's MAC.

### Phase 2: Client A resolves the gateway

Client A sends:

```text
Ethernet source:      00:11:22:33:44:55
Ethernet destination: ff:ff:ff:ff:ff:ff
ARP operation:        request
ARP sender:           10.10.10.25 / 00:11:22:33:44:55
ARP target:           10.10.10.1 / 00:00:00:00:00:00
```

The access switch learns Client A's source MAC on the incoming VLAN 10 port and floods the broadcast to other eligible VLAN 10 ports. It does not send the frame into VLAN 20.

The router replies:

```text
Ethernet source:      00:aa:aa:aa:aa:10
Ethernet destination: 00:11:22:33:44:55
ARP operation:        reply
ARP sender:           10.10.10.1 / 00:aa:aa:aa:aa:10
ARP target:           10.10.10.25 / 00:11:22:33:44:55
```

Client A caches `10.10.10.1 → 00:aa:aa:aa:aa:10`.

### Phase 3: Client A sends the IP packet

Client A creates an ICMP Echo Request inside an IPv4 packet and an Ethernet frame:

```text
Ethernet source:      00:11:22:33:44:55
Ethernet destination: 00:aa:aa:aa:aa:10
IPv4 source:          10.10.10.25
IPv4 destination:     10.10.20.80
```

The Ethernet destination is the gateway, but the IP destination remains Server B. The switch forwards the known unicast toward the router.

### Phase 4: The router routes and resolves Server B

The router:

1. Validates and removes the incoming Ethernet header and trailer.
2. Examines destination IP `10.10.20.80`.
3. Selects connected route `10.10.20.0/24`.
4. Decrements IPv4 TTL and updates the IPv4 header checksum.
5. Checks its ARP table for `10.10.20.80`.

If no mapping exists, the router broadcasts an ARP Request only in VLAN 20. Server B replies, and the router caches `10.10.20.80 → 00:66:77:88:99:aa`.

### Phase 5: The router creates a new Ethernet frame

```text
Ethernet source:      00:aa:aa:aa:aa:20
Ethernet destination: 00:66:77:88:99:aa
IPv4 source:          10.10.10.25
IPv4 destination:     10.10.20.80
```

The IP addresses remain end to end because no NAT occurs here. The Ethernet addresses are new for the VLAN 20 link.

### Phase 6: Server B replies

Server B sees that `10.10.10.25` is remote and sends the Echo Reply to its own default gateway `10.10.20.1`. It may first ARP for the gateway if the mapping is absent. The router then routes the reply into VLAN 10 and uses Client A's MAC.

### What each device learns

| Device | Learned state |
|---|---|
| Client A | ARP mapping for gateway `10.10.10.1`, not normally for remote Server B |
| VLAN 10 switch | Client and router-interface MAC-to-port mappings in VLAN 10 |
| Router | ARP entries for local neighbors on each directly connected VLAN and routes for both subnets |
| VLAN 20 switch | Router-interface and Server B MAC-to-port mappings in VLAN 20 |
| Server B | ARP mapping for gateway `10.10.20.1`, not normally for remote Client A |

## Local-destination contrast

If Client A sends to `10.10.10.50/24`, it calculates that the destination is local and ARPs directly for `10.10.10.50`. The default gateway does not forward that normal same-subnet traffic.

If two hosts use inconsistent masks, one may consider the other local while the other considers the first remote. This asymmetric belief can create confusing one-way or intermittent results.

## Inspect address, route, and ARP state

### Linux

```bash
ip -brief address
ip route
ip route get 10.10.20.80
ip neighbor show
ping -c 1 10.10.20.80
ip neighbor show
```

| Line | Purpose |
|---|---|
| Address summary | Confirms interface address and prefix |
| `ip route` | Displays the routing table |
| `ip route get` | Shows the kernel's selected route, next hop, source, and interface |
| First neighbor display | Records ARP/ND state before traffic |
| One ping | Generates a small authorized test and may trigger ARP |
| Final neighbor display | Shows newly learned or changed neighbor state |

### Windows

```powershell
Get-NetIPConfiguration
Get-NetRoute -AddressFamily IPv4
Find-NetRoute -RemoteIPAddress 10.10.20.80
Get-NetNeighbor -AddressFamily IPv4
ping -n 1 10.10.20.80
Get-NetNeighbor -AddressFamily IPv4
```

| Line | Purpose |
|---|---|
| IP configuration | Confirms IPv4 address, gateway, and DNS configuration |
| Route table | Displays IPv4 routes and metrics |
| `Find-NetRoute` | Identifies the best local route and source address for the destination |
| First neighbor display | Records ARP state before the test |
| One ping | Generates a controlled ICMP test |
| Final neighbor display | Shows learned IPv4 neighbor mappings and state |

### Cisco routing device

```cisco
show ip interface brief
show ip route 10.10.20.80
show arp
show mac address-table dynamic
ping 10.10.20.80 source 10.10.10.1
```

| Line | Purpose |
|---|---|
| Interface summary | Confirms addressing and interface/protocol state |
| Route lookup | Displays the selected route for Server B |
| ARP table | Displays IPv4-to-MAC mappings on local links |
| MAC table | Displays switch forwarding entries when the platform provides switching |
| Sourced ping | Tests from a defined source; syntax varies by platform |

## Capture ARP safely

```bash
sudo tcpdump -eni any 'arp'
```

| Option | Meaning |
|---|---|
| `sudo` | Packet capture normally requires elevated privilege |
| `-e` | Includes link-layer headers such as source and destination MAC |
| `-n` | Prevents name resolution so the capture stays numeric and focused |
| `-i any` | Captures on all supported interfaces; select one interface when possible |
| `'arp'` | Limits displayed packets to ARP |

Capture only authorized systems. Packet data may reveal internal addressing and device identities.

## ARP failure modes

| Symptom | Evidence to seek | Likely area |
|---|---|---|
| Neighbor stays incomplete | Repeated requests with no reply | Wrong VLAN, target down, link problem, filtering, or wrong address |
| Gateway ARP fails | Gateway IP is not local under the configured mask | Wrong mask or gateway |
| MAC changes repeatedly | ARP table and switch logs alternate | Duplicate IP, failover, loop, or spoofing |
| Correct ARP but remote traffic fails | Gateway MAC resolves but route/application fails | Routing, ACL, NAT, return path, or service |
| Only first packet is delayed | ARP occurs before payload | Normal initial resolution can add a small delay |

ARP resolution proves only local address mapping. It does not prove that the remote service, route, return path, DNS, or firewall is healthy.

## Gratuitous ARP, duplicate detection, proxy ARP, and security

- **Gratuitous ARP** announces or checks an address without first receiving a normal request. It can update neighbor caches during failover and help detect duplicate addresses.
- **Proxy ARP** occurs when a router answers ARP on behalf of another IP destination. It can make remote destinations appear locally reachable but can hide addressing-design problems and expand Layer 2 dependency.
- **ARP spoofing/poisoning** sends false mappings to redirect or disrupt traffic. ARP has no built-in authentication.

Defenses can include DHCP Snooping with Dynamic ARP Inspection, port security, segmentation, monitoring for changes, static mappings for exceptional critical systems, and end-to-end protections such as TLS or SSH. Controls must be designed and tested for static addresses, failover, voice, PXE, and DHCP relay.

IPv6 does not use ARP. It uses ICMPv6 Neighbor Discovery, which also supports router discovery and Duplicate Address Detection.

## Foundation checks

1. Find the network, broadcast, and normal host range for `198.51.100.141/28`.
2. Explain why classful labels do not determine the mask of a modern route.
3. For a remote destination, which IP address does the sender resolve with ARP?
4. In the full scenario, list the Ethernet and IPv4 source/destination addresses on both sides of the router.
5. A host has `192.168.20.5/24` with gateway `192.168.10.1`. Explain why normal ARP cannot reach that gateway.
6. Explain why a complete ARP entry does not prove that TCP port 443 is reachable.
