# Chapter 3 — Network Implementation

This chapter covers Domain 2: routing, switching, wireless, and physical installation. Cisco IOS commands teach the concept; exact syntax varies by platform and version.

## Reference scenario

| VLAN | Name | Subnet | Gateway | Purpose |
|---:|---|---|---|---|
| 10 | USERS | `10.10.10.0/24` | `10.10.10.1` | User endpoints |
| 20 | SERVERS | `10.10.20.0/24` | `10.10.20.1` | Servers |
| 30 | VOICE | `10.10.30.0/24` | `10.10.30.1` | IP phones |
| 99 | MGMT | `10.10.99.0/24` | `10.10.99.1` | Management |

The documentation-only WAN link uses `198.51.100.0/30`.

## 2.1 — Routing

### How a router selects a route

1. **Longest-prefix match:** the most specific matching prefix wins. A `/24` is more specific than a `/16`.
2. If equal prefixes come from different sources, the lower **administrative distance** is normally preferred.
3. For equal prefixes inside one routing protocol, the protocol's better **metric** wins.
4. Several equal-cost routes may be installed for load sharing.

Metrics from different routing protocols are not directly comparable. Administrative distance first selects the route source. AD is local to a device and is not carried in the IP packet.

### Reading a route

```text
O 10.20.0.0/16 [110/20] via 192.0.2.2, 00:01:12, GigabitEthernet0/1
S* 0.0.0.0/0 [1/0] via 198.51.100.1
```

| Part | Meaning |
|---|---|
| `O` | Learned through OSPF |
| `10.20.0.0/16` | Destination prefix |
| `[110/20]` | Administrative distance 110 and metric 20 |
| `via 192.0.2.2` | Next hop |
| `GigabitEthernet0/1` | Outgoing interface |
| `S*` | Static candidate default route |
| `0.0.0.0/0` | Least-specific route, the gateway of last resort |

### Static routes

```cisco
enable
configure terminal
ip route 10.20.0.0 255.255.0.0 192.0.2.2
ip route 0.0.0.0 0.0.0.0 198.51.100.1
ip route 10.20.0.0 255.255.0.0 192.0.2.6 200
end
show ip route
show ip route 10.20.1.25
```

### Line-by-line explanation

| Line | Purpose |
|---|---|
| `enable` | Enters privileged EXEC mode |
| `configure terminal` | Enters global configuration mode |
| First `ip route` | Reaches `10.20.0.0/16` through the primary next hop |
| Default route | Sends otherwise unknown destinations to the WAN next hop |
| Route ending in `200` | Creates a floating static route with a high AD |
| `end` | Returns to privileged EXEC mode |
| `show ip route` | Displays the routing table |
| Final command | Displays the exact route decision for one destination |

Static routing is simple and predictable, but it does not adapt automatically to a large changing topology.

### Dynamic routing

| Protocol | Type and use | Key characteristic |
|---|---|---|
| OSPF | Open link-state IGP | Cost, areas, LSDB, and SPF calculation |
| EIGRP | Advanced distance-vector, commonly Cisco environments | Composite metric and DUAL |
| BGP | Path-vector between autonomous systems and large policy domains | Policy and path attributes |

OSPF forms neighbors, synchronizes link-state information, and calculates shortest paths. BGP is policy-driven and evaluates attributes such as AS path; it is not merely a hop-count protocol.

### NAT, PAT, FHRP, VIP, and subinterfaces

- **Static NAT:** fixed one-to-one mapping, often for an inbound service; a security rule is still required.
- **Dynamic NAT pool:** inside hosts temporarily use addresses from a public pool.
- **PAT/overload:** many clients share a public IP through translated ports.
- **FHRP:** several routers present one virtual default gateway, such as HSRP or VRRP.
- **VIP:** an address not permanently tied to one physical node, used by FHRP or load balancing.
- **Subinterface:** a logical interface carrying one 802.1Q VLAN on a physical interface, used by router-on-a-stick.

### PAT example

```cisco
access-list 1 permit 10.10.0.0 0.0.255.255
interface GigabitEthernet0/0
 ip nat inside
interface GigabitEthernet0/1
 ip nat outside
ip nat inside source list 1 interface GigabitEthernet0/1 overload
show ip nat translations
show ip nat statistics
```

| Line | Purpose |
|---|---|
| ACL | Selects inside addresses eligible for translation; this is not a complete security policy |
| Inside interface | Marks the private side of NAT |
| Outside interface | Marks the public/WAN side |
| `overload` | Enables PAT using the outside interface address |
| Show commands | Display active mappings and NAT statistics |

NAT is not a firewall and does not provide end-to-end security.

## 2.2 — Switching

### Frame forwarding

1. Learn the source MAC on the incoming port and VLAN.
2. Look up the destination MAC.
3. Forward to the known destination port.
4. Flood broadcasts and unknown unicasts only inside the VLAN.
5. Filter a frame when the known destination is on the same incoming port.
6. Age out inactive dynamic entries.

Each VLAN is a separate broadcast domain. Communication between VLANs requires a router or Layer 3 switch.

### VLAN and access-port configuration

```cisco
enable
configure terminal
vlan 10
 name USERS
vlan 20
 name SERVERS
vlan 30
 name VOICE
interface GigabitEthernet1/0/10
 description User-PC-and-IP-Phone
 switchport mode access
 switchport access vlan 10
 switchport voice vlan 30
 spanning-tree portfast
 spanning-tree bpduguard enable
end
show vlan brief
show interfaces GigabitEthernet1/0/10 switchport
```

| Line | Purpose |
|---|---|
| `vlan` and `name` | Create VLANs and assign human-readable names |
| `interface` | Select the access port |
| `description` | Document the connected devices |
| `switchport mode access` | Prevent dynamic trunk negotiation on the user port |
| `switchport access vlan 10` | Place untagged user data in VLAN 10 |
| `switchport voice vlan 30` | Advertise/use a separate voice VLAN for a compatible phone |
| `portfast` | Moves an edge port to forwarding quickly; do not use blindly between switches |
| `bpduguard` | Err-disables an edge port receiving an unexpected BPDU |
| Show commands | Verify VLAN membership and operational switchport mode |

### Trunks and 802.1Q

An 802.1Q trunk carries several VLANs by adding a VLAN tag to frames. The native VLAN is normally untagged. Both ends need matching native VLAN and allowed-VLAN configuration.

```cisco
configure terminal
vlan 999
 name NATIVE_UNUSED
interface GigabitEthernet1/0/48
 description Trunk-to-SW2
 switchport mode trunk
 switchport trunk native vlan 999
 switchport trunk allowed vlan 10,20,30,99
 switchport nonegotiate
end
show interfaces trunk
```

| Line | Purpose |
|---|---|
| VLAN 999 | Creates an unused native VLAN for the trunk |
| `mode trunk` | Statically enables trunking |
| `native vlan 999` | Separates untagged traffic from production VLANs |
| `allowed vlan` | Carries only required VLANs |
| `nonegotiate` | Disables Cisco DTP; configure the other side manually |
| Show command | Verifies native VLAN, allowed VLANs, and forwarding state |

### SVI and inter-VLAN routing

```cisco
configure terminal
ip routing
interface vlan 10
 description Users-Gateway
 ip address 10.10.10.1 255.255.255.0
 no shutdown
interface vlan 20
 description Servers-Gateway
 ip address 10.10.20.1 255.255.255.0
 no shutdown
end
show ip interface brief
show ip route connected
```

| Line | Purpose |
|---|---|
| `ip routing` | Enables Layer 3 routing on a capable switch |
| `interface vlan` | Creates the switched virtual interface for that VLAN |
| `ip address` | Defines the VLAN's default gateway |
| `no shutdown` | Administratively enables the SVI; an active VLAN/port is normally also needed |
| Show commands | Verify interface state and connected routes |

### Spanning Tree Protocol

Redundant links without STP can create broadcast storms, duplicate frames, and unstable MAC learning. STP chooses a root bridge and blocks selected forwarding paths.

Important roles and states:

- **Root port:** best path from a non-root switch to the root bridge.
- **Designated port:** best forwarding port for a segment.
- **Alternate port:** backup path.
- RSTP states: discarding, learning, and forwarding.

PortFast is for edge ports. BPDU Guard protects them from unexpected switches. Root Guard prevents an inappropriate neighbor from becoming root. Loop Guard protects against incorrect forwarding when BPDUs disappear.

```cisco
spanning-tree vlan 10,20,30 root primary
show spanning-tree vlan 10
show spanning-tree inconsistentports
```

The first line adjusts priority to make the switch the intended root candidate. The show commands verify root identity, path cost, roles, states, and guard inconsistencies.

### LACP, speed, duplex, and MTU

Link aggregation creates one logical link from several physical links. It increases aggregate capacity across several flows, but one flow is normally hashed to one member. Member speed, duplex, trunking, VLANs, and MTU must be compatible. LACP is the open negotiation protocol.

```cisco
interface range GigabitEthernet1/0/47-48
 channel-group 1 mode active
interface Port-channel1
 switchport mode trunk
 switchport trunk allowed vlan 10,20,30,99
show etherchannel summary
```

| Line | Purpose |
|---|---|
| `interface range` | Selects two physical members |
| `channel-group 1 mode active` | Creates LACP Port-channel 1 in active mode |
| `interface Port-channel1` | Selects the logical bundle |
| Trunk lines | Carry the required VLANs on the bundle |
| Show command | Verifies protocol, members, and bundled state |

Autonegotiation is normally best for modern Ethernet. A duplex mismatch produces severe performance problems, late collisions, and CRC-related symptoms. MTU is the largest packet/frame size supported in context. Jumbo frames require compatible configuration across the complete path.

## 2.3 — Wireless implementation

### Bands, channels, and width

| Band | General characteristic | Design consideration |
|---|---|---|
| 2.4 GHz | Better penetration, fewer channels, often crowded | In many regions 1/6/11 are non-overlapping at 20 MHz |
| 5 GHz | More channels, usually shorter reach | Some channels require DFS radar detection |
| 6 GHz | Newer spectrum and high capacity | Requires compatible APs/clients and current security |

Wider channels raise potential throughput but consume more spectrum. Band steering encourages capable clients toward a preferred band, but clients make many roaming decisions. IEEE 802.11h relates to spectrum management, DFS, and transmit-power control in 5 GHz.

### Wireless identifiers and modes

- **SSID:** user-visible WLAN name.
- **BSSID:** identifier for one radio/cell, normally a MAC address.
- **ESSID:** an extended service of BSS cells using a shared name and policy.
- **Infrastructure:** clients use an access point.
- **Ad hoc:** clients communicate directly without a central AP.
- **Point-to-point:** wireless bridge between two sites.
- **Mesh:** nodes use wireless backhaul and multiple paths.

### Security and authentication

WPA2/WPA3-Personal uses a shared secret. Enterprise mode uses 802.1X/EAP and RADIUS for per-user or per-device identity. WPA3-Personal uses SAE and improves resistance to offline guessing.

A captive portal is not encryption. A guest network also needs isolation, a separate VLAN, and restricted policy. Avoid WEP, original WPA, and TKIP. Use strong credentials, current firmware, protected management frames where supported, and disable WPS when it is not required.

### Antennas and AP operation

An omnidirectional antenna distributes energy around its pattern. A directional antenna concentrates it toward a target, useful for a bridge or focused coverage. Gain does not create energy; it reshapes the radiation pattern.

An autonomous AP is configured independently. A lightweight AP receives policy and radio management from a controller. Exact control and data paths vary by vendor architecture.

### WLAN design process

1. Record coverage, capacity, application, and client requirements.
2. Perform predictive planning and a physical site survey.
3. Record wall materials, interference, mounting, power, and cabling.
4. Place APs for capacity and coverage, not signal bars alone.
5. Coordinate channels and transmit power.
6. Keep SSID count reasonable and map each to appropriate VLAN/security policy.
7. Validate coverage, throughput, authentication, and roaming after installation.
8. Save a baseline and repeat surveys after meaningful changes.

Hidden SSIDs do not provide meaningful security. Maximum transmit power on every AP can worsen contention and roaming.

## 2.4 — Physical installation

### MDF, IDF, racks, and panels

The Main Distribution Frame is the central distribution and provider/backbone point. An Intermediate Distribution Frame serves a floor or area near endpoints. Rack diagrams show rack units, airflow, power, and equipment location. Permanent horizontal cabling terminates on patch panels, then patch cords connect it to switches.

### Installation checklist

1. Verify equipment weight, depth, rails, and rack capacity.
2. Install heavy equipment low in the rack.
3. Maintain correct front-to-back airflow and hot/cold aisle design.
4. Follow grounding, electrical, and fire rules.
5. Separate redundant A/B power feeds when the design provides them.
6. Calculate circuit, PDU, UPS, PoE, and device power budgets with headroom.
7. Label ports, both cable ends, and patch-panel positions consistently.
8. Monitor inlet temperature, humidity, smoke/fire systems, and physical access.

### UPS, PDU, and PoE

A UPS supplies temporary power and time to shut down or transfer. A generator provides longer-duration energy. A PDU distributes power and may measure consumption.

```text
Real power (W) ≈ Voltage (V) × Current (A) × Power factor
```

For AC systems, power factor, startup load, continuous-load limits, redundancy, and local electrical codes matter.

Power over Ethernet sends data and power over Ethernet cabling. The PSE, such as a switch, supplies power; the PD, such as an access point, receives it. Verify standard, class, per-port power, total budget, cable quality, and temperature. A device can boot with insufficient power while disabling radios or other features.

### Environment and fire protection

Hot/cold aisle design separates cool intake air from hot exhaust. Very low humidity increases electrostatic-discharge risk; very high humidity creates condensation and corrosion risk. Measure temperature at equipment inlets. Fire suppression must protect people, comply with law, fit the facility, and be tested.

## Implementation troubleshooting sequence

If a VLAN 10 user cannot reach the gateway:

1. Check link state and interface errors.
2. Verify the access VLAN and operational switchport mode.
3. Verify the VLAN exists.
4. Locate the user's MAC in the MAC table.
5. Verify SVI state and IP configuration.
6. Check the client's IP, prefix, gateway, and ARP/ND entry.
7. If a trunk is crossed, check allowed/native VLAN and STP state.
8. Retest and document after one controlled correction.

## End-of-chapter exercises

1. Build the reference topology in Packet Tracer or a similar tool.
2. Add a specific route and a default route, then prove longest-prefix selection.
3. Remove one VLAN from a trunk and collect evidence before fixing it.
4. Choose an intentional root bridge and compare STP output before and after.
5. Draft a channel plan for an 80-user office and explain why a survey is still required.
6. Calculate a PoE power budget for four APs and eight phones using their data sheets.
