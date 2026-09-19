# CCNA Readiness Bridge

Network+ teaches vendor-neutral networking. CCNA expects you to apply many of the same ideas on Cisco IOS, read device output quickly, and build larger routed and switched labs. This bridge gives you the practical starting point. It does **not** replace the current official CCNA course or exam objectives.

Complete this file only after the core chapters and guided labs. Use Packet Tracer, CML, GNS3/EVE-NG with legally obtained images, or equipment you are authorized to configure.

## 1. Cisco CLI modes and safe workflow

The prompt shows the current mode:

| Prompt | Mode | Typical use |
|---|---|---|
| `R1>` | User EXEC | Limited observation |
| `R1#` | Privileged EXEC | Show, debug with care, save, and enter configuration |
| `R1(config)#` | Global configuration | Device-wide configuration |
| `R1(config-if)#` | Interface configuration | One physical or logical interface |
| `R1(config-router)#` | Routing-process configuration | OSPF and other routing settings |

### First safe session

```cisco
enable
show clock
show running-config
show ip interface brief
configure terminal
hostname R1
end
show archive config differences
copy running-config startup-config
```

| Line | Exact purpose |
|---|---|
| `enable` | Enters privileged EXEC mode. |
| `show clock` | Confirms device time before comparing logs. |
| `show running-config` | Records the active configuration before change. Protect any secrets in output. |
| `show ip interface brief` | Summarizes interface state and addresses. |
| `configure terminal` | Enters global configuration mode. |
| `hostname R1` | Changes the device name and prompt. |
| `end` | Returns directly to privileged EXEC mode. |
| `show archive config differences` | Shows configuration differences when the platform/archive feature supports it. |
| `copy running-config startup-config` | Saves active state for the next boot after verification. |

Do not save a broken change just because the command was accepted. Verify the user path, expected security behavior, and rollback first.

## 2. Build a small campus

Use this topology throughout the bridge:

| Device/interface | Address or role |
|---|---|
| SW1 access ports | VLAN 10 USERS and VLAN 20 SERVERS |
| SW1–R1 link | 802.1Q trunk, native unused VLAN 999 |
| R1 G0/0.10 | `10.10.10.1/24` |
| R1 G0/0.20 | `10.10.20.1/24` |
| R1 G0/1 | `192.0.2.1/30` to R2 |
| R1 G0/2 | `192.0.2.5/30` to an optional backup router R3 |
| R2 G0/0 | `192.0.2.2/30` to R1 |
| R2 G0/1 | `198.51.100.1/30` toward an ISP lab router |
| R3 G0/0 | `192.0.2.6/30` to R1; configure a separate working upstream path before testing failover |

Before configuration, draw the physical links, VLANs, subnets, gateways, and expected packet path.

## 3. VLANs and an access port

```cisco
enable
configure terminal
vlan 10
 name USERS
vlan 20
 name SERVERS
vlan 999
 name UNUSED_NATIVE
interface GigabitEthernet0/1
 description USER_PC
 switchport mode access
 switchport access vlan 10
 spanning-tree portfast
 spanning-tree bpduguard enable
 no shutdown
end
show vlan brief
show interfaces GigabitEthernet0/1 switchport
```

| Line | Exact purpose |
|---|---|
| `vlan 10` / `vlan 20` | Creates the two production Layer 2 broadcast domains. |
| `name ...` | Adds a human-readable label; forwarding still uses the numeric VLAN ID. |
| `vlan 999` | Creates the intentionally unused native VLAN. |
| `interface ...` | Selects the user-facing switch port. |
| `description ...` | Records the intended connection. |
| `switchport mode access` | Forces a non-trunk edge port. |
| `switchport access vlan 10` | Places untagged user frames into VLAN 10. |
| `spanning-tree portfast` | Lets an endpoint port reach forwarding quickly; use only on true edges. |
| `spanning-tree bpduguard enable` | Err-disables the edge if it unexpectedly receives a BPDU. |
| `no shutdown` | Administratively enables the port. |
| Show commands | Prove VLAN membership and operational mode. |

Verification is incomplete until a client in VLAN 10 obtains the intended address and reaches only the permitted destinations.

## 4. Trunk and router-on-a-stick

### Switch side

```cisco
configure terminal
interface GigabitEthernet0/24
 description TRUNK_TO_R1
 switchport mode trunk
 switchport trunk native vlan 999
 switchport trunk allowed vlan 10,20,999
 switchport nonegotiate
 no shutdown
end
show interfaces trunk
```

| Line | Exact purpose |
|---|---|
| `interface ...` | Selects the link to the router. |
| `description ...` | Records its neighbor and purpose. |
| `switchport mode trunk` | Carries several VLANs using 802.1Q. |
| `native vlan 999` | Assigns untagged trunk traffic to the unused VLAN on this side. |
| `allowed vlan ...` | Limits the trunk to required VLANs. |
| `nonegotiate` | Disables DTP; the other side must be configured manually. |
| `no shutdown` | Enables the physical link. |
| `show interfaces trunk` | Proves trunk state, native VLAN, allowed list, and forwarding VLANs. |

### Router side

```cisco
configure terminal
interface GigabitEthernet0/0
 no ip address
 no shutdown
interface GigabitEthernet0/0.10
 encapsulation dot1Q 10
 ip address 10.10.10.1 255.255.255.0
interface GigabitEthernet0/0.20
 encapsulation dot1Q 20
 ip address 10.10.20.1 255.255.255.0
interface GigabitEthernet0/0.999
 encapsulation dot1Q 999 native
 no ip address
end
show ip interface brief
show ip route connected
```

| Line | Exact purpose |
|---|---|
| Physical interface lines | Enable the carrier without assigning one untagged IP network. |
| `.10` / `.20` | Create logical subinterfaces. The number is a label, but matching the VLAN improves clarity. |
| `encapsulation dot1Q 10/20` | Associates tagged frames with the correct subinterface. |
| `ip address ...` | Provides the default gateway for each VLAN. |
| `.999 ... native` | Matches the switch native VLAN without offering an endpoint gateway. |
| Show commands | Prove interface state and connected routes. |

When a VLAN 10 host contacts VLAN 20, it sends the frame to R1's VLAN 10 MAC. R1 removes the frame, routes by destination IP, decrements TTL, and builds a new VLAN 20 frame.

## 5. Static, default, and floating routes

On R1:

```cisco
configure terminal
interface GigabitEthernet0/1
 ip address 192.0.2.1 255.255.255.252
 no shutdown
interface GigabitEthernet0/2
 ip address 192.0.2.5 255.255.255.252
 no shutdown
ip route 0.0.0.0 0.0.0.0 192.0.2.2
ip route 0.0.0.0 0.0.0.0 192.0.2.6 200
end
show ip route 198.51.100.2
show ip route static
ping 192.0.2.2 source 192.0.2.1
```

| Line | Exact purpose |
|---|---|
| Interface address | Creates the `/30` transit network toward R2. |
| Backup-interface lines | Create the separate `/30` path toward R3. A second next hop on the same failed link would not be real redundancy. |
| First `ip route` | Adds the normal default next hop. |
| Second `ip route` | Adds a floating default with administrative distance 200; it is used only when the preferred route disappears and its next hop is reachable. |
| Destination lookup | Shows the selected route for one test address. |
| Static-route display | Lists installed static routes. |
| Sourced ping | Tests R2 using a known source, but does not prove end-to-end application service. |

Failure drill: first give R3 a complete authorized upstream and return path. Remove or shut the preferred R2 path in the isolated topology. Predict the route table before looking, then verify the application across R3. An installed backup route is not proof that the backup path works end to end.

## 6. Single-area OSPF

Use a unique, stable router ID and make endpoint-facing interfaces passive.

```cisco
configure terminal
router ospf 10
 router-id 1.1.1.1
 passive-interface default
 no passive-interface GigabitEthernet0/1
 network 10.10.10.0 0.0.0.255 area 0
 network 10.10.20.0 0.0.0.255 area 0
 network 192.0.2.0 0.0.0.3 area 0
end
show ip ospf neighbor
show ip ospf interface brief
show ip route ospf
```

| Line | Exact purpose |
|---|---|
| `router ospf 10` | Starts the local OSPF process; process ID 10 is locally significant. |
| `router-id 1.1.1.1` | Gives the router a stable OSPF identifier; it is not a routed host address requirement. |
| `passive-interface default` | Stops neighbor formation on every interface by default while still allowing selected connected prefixes to be advertised. |
| `no passive-interface G0/1` | Permits OSPF hellos and adjacency only on the router transit link. |
| `network ... area 0` | Selects interfaces by IP/wildcard and places them in area 0. |
| Neighbor command | Proves adjacency state. |
| Interface command | Shows participating interfaces and area. |
| Route command | Shows prefixes learned through OSPF. |

Troubleshoot adjacency with both ends: address/prefix, area, timers, network type, authentication, MTU, passive state, ACLs, and duplicate router IDs. Do not fix a symptom by making every interface active.

Configure the other end on R2 before expecting a neighbor:

```cisco
configure terminal
interface GigabitEthernet0/0
 ip address 192.0.2.2 255.255.255.252
 no shutdown
router ospf 10
 router-id 2.2.2.2
 passive-interface default
 no passive-interface GigabitEthernet0/0
 network 192.0.2.0 0.0.0.3 area 0
 network 198.51.100.0 0.0.0.3 area 0
end
show ip ospf neighbor
show ip route ospf
```

| Line | Exact purpose |
|---|---|
| Interface lines | Address and enable R2's side of the shared `/30`. |
| `router ospf 10` | Starts R2's locally significant OSPF process. |
| `router-id 2.2.2.2` | Gives R2 a unique stable OSPF identity. |
| `passive-interface default` | Prevents accidental adjacency on all interfaces by default. |
| `no passive-interface G0/0` | Allows adjacency only toward R1. |
| First network statement | Enables OSPF on the R1–R2 transit link in area 0. |
| Second network statement | Advertises R2's simulated outside connected prefix without forming a neighbor there because the interface remains passive. |
| `end` | Returns to privileged EXEC mode. |
| Show commands | Prove adjacency and learned routes on R2. |

## 7. STP and EtherChannel

### Intentional root bridge

```cisco
configure terminal
spanning-tree vlan 10,20 root primary
end
show spanning-tree vlan 10
show spanning-tree vlan 20
show spanning-tree inconsistentports
```

| Line | Exact purpose |
|---|---|
| Root-primary command | Adjusts priority so this switch is likely to become root for the listed VLANs. |
| Per-VLAN show commands | Prove root ID, local bridge ID, port roles, costs, and states. |
| Inconsistent-port command | Shows ports blocked by an STP guard condition. |

### LACP bundle

```cisco
configure terminal
interface range GigabitEthernet0/21-22
 channel-group 1 mode active
 no shutdown
interface Port-channel1
 switchport mode trunk
 switchport trunk native vlan 999
 switchport trunk allowed vlan 10,20,999
end
show etherchannel summary
show interfaces Port-channel1 trunk
```

| Line | Exact purpose |
|---|---|
| `interface range` | Selects both physical members. |
| `channel-group ... active` | Uses LACP to negotiate logical Port-channel 1. |
| `interface Port-channel1` | Applies shared switching policy to the logical bundle. |
| Trunk lines | Make the bundle carry the intended VLANs. |
| Summary command | Proves protocol and member bundling state. |
| Trunk command | Proves VLAN operation on the logical interface. |

Both bundle ends must agree on compatible speed, duplex, Layer 2/3 mode, trunking, native/allowed VLANs, and channel settings.

## 8. Extended ACL with verification

Permit VLAN 10 users to reach one web server and DNS server in VLAN 20, block other VLAN 20 access, and leave other destinations available for the lab.

```cisco
configure terminal
ip access-list extended USERS_IN
 remark Permit approved DNS
 permit udp 10.10.10.0 0.0.0.255 host 10.10.20.53 eq 53
 permit tcp 10.10.10.0 0.0.0.255 host 10.10.20.53 eq 53
 remark Permit approved HTTPS
 permit tcp 10.10.10.0 0.0.0.255 host 10.10.20.80 eq 443
 deny ip 10.10.10.0 0.0.0.255 10.10.20.0 0.0.0.255 log
 permit ip 10.10.10.0 0.0.0.255 any
interface GigabitEthernet0/0.10
 ip access-group USERS_IN in
end
show access-lists USERS_IN
```

| Line | Exact purpose |
|---|---|
| Named ACL | Creates a readable ordered extended ACL. |
| UDP DNS permit | Allows ordinary DNS queries to the approved resolver. |
| TCP DNS permit | Allows retries, large answers, and other valid TCP DNS use. |
| HTTPS permit | Allows only TCP 443 to the intended web server. |
| Deny/log | Blocks other traffic into the server subnet and creates evidence. |
| Final permit | Allows other destinations for this lab; production policy may be stricter. |
| Interface application | Filters packets as they enter R1 from VLAN 10. |
| Show command | Displays order and hit counters. |

Test at least four cases: allowed DNS, allowed HTTPS, denied server SSH, and an intended non-server destination. A working permit is not enough; prove the deny too.

## 9. PAT at the edge

On R2, translate the two inside VLANs toward the simulated ISP:

```cisco
configure terminal
interface GigabitEthernet0/0
 ip address 192.0.2.2 255.255.255.252
 ip nat inside
 no shutdown
interface GigabitEthernet0/1
 ip address 198.51.100.1 255.255.255.252
 ip nat outside
 no shutdown
ip route 10.10.10.0 255.255.255.0 192.0.2.1
ip route 10.10.20.0 255.255.255.0 192.0.2.1
ip route 0.0.0.0 0.0.0.0 198.51.100.2
ip access-list standard NAT_INSIDE
 permit 10.10.10.0 0.0.0.255
 permit 10.10.20.0 0.0.0.255
ip nat inside source list NAT_INSIDE interface GigabitEthernet0/1 overload
end
show ip nat translations
show ip nat statistics
```

| Line | Exact purpose |
|---|---|
| Inside interface/address | Identifies the R1-facing private translation side. |
| Outside interface/address | Identifies the ISP-facing public side. |
| Two inside routes | Give R2 a return path to both internal VLANs. They are unnecessary if equivalent OSPF routes are already installed. |
| Default route | Sends otherwise unknown destinations to the simulated ISP next hop. |
| Standard ACL | Selects source prefixes eligible for translation; it is not a security policy. |
| NAT overload line | Translates matching sources to the outside-interface address and distinguishes flows with transport identifiers. |
| Translation display | Shows active mappings after traffic exists. |
| Statistics | Shows roles, counters, misses, and configuration summary. |

PAT needs a working forward route and return path. NAT success also does not prove that a firewall permits the application.

## 10. IPv6 dual-stack start

```cisco
configure terminal
ipv6 unicast-routing
interface GigabitEthernet0/0.10
 ipv6 address 2001:db8:10::1/64
 ipv6 address fe80::1 link-local
interface GigabitEthernet0/0.20
 ipv6 address 2001:db8:20::1/64
 ipv6 address fe80::1 link-local
end
show ipv6 interface brief
show ipv6 route
show ipv6 neighbors
```

| Line | Exact purpose |
|---|---|
| `ipv6 unicast-routing` | Enables IPv6 forwarding and router behavior. |
| Global addresses | Provide documentation prefixes and default-gateway addresses for both VLANs. |
| Link-local addresses | Give each separate link a predictable local router address; reuse across interfaces is valid because scope is per link. |
| Interface display | Shows IPv6 address and state. |
| Route display | Shows connected, local, static, and learned IPv6 routes. |
| Neighbor display | Shows IPv6 next-hop-to-MAC state learned through Neighbor Discovery. |

Do not assume IPv4 ACLs protect IPv6. Build and verify policy for both families.

## 11. A repeatable verification ladder

Use this order after every build or repair:

1. **Physical:** interface state, speed/duplex, errors, optics, PoE.
2. **Layer 2:** access VLAN, trunk list, MAC learning, STP, EtherChannel.
3. **Layer 3:** addresses, connected routes, longest match, next hop, return path.
4. **Services:** DHCP lease/options, DNS answer, NTP state.
5. **Transport:** required TCP/UDP port and state.
6. **Security:** ACL/firewall hit counters, AAA, certificate, expected deny.
7. **Application:** the real user transaction.
8. **Operations:** monitoring recovered, configuration saved, diagrams and ticket updated.

Skipping directly to ping creates false confidence. Starting every incident by changing configuration destroys evidence.

## 12. CCNA entry gate

You are ready to begin a current CCNA learning path when you can complete these tasks without copying a finished configuration:

- Subnet an address block with VLSM and explain every boundary.
- Predict the destination MAC and IP at every routed hop.
- Build access VLANs, an 802.1Q trunk, and inter-VLAN routing.
- Choose and verify an STP root and troubleshoot one blocked/inconsistent path.
- Build and verify an LACP EtherChannel.
- Configure static/default/floating routes and explain longest-prefix selection.
- Form a single-area OSPF adjacency and troubleshoot an area/passive-interface fault.
- Apply an ordered extended ACL and prove both permits and denies.
- Configure PAT and separate routing, translation, and policy failures.
- Configure basic dual-stack addressing and inspect IPv6 routes/neighbors.
- Save, compare, roll back, and document a small change.
- Explain the evidence from `show interfaces`, VLAN/trunk, STP, EtherChannel, route, OSPF-neighbor, ACL, and NAT output.

CCNA will go deeper into Cisco configuration, automation, wireless architecture, IP services, security, and routing/switching behavior. This repository should make that next step comfortable; it should not be used to claim CCNA-level mastery before completing that work.
