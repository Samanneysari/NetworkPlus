# Foundation 3 — Ethernet, MAC Addresses, Hubs, and Switches

Ethernet carries frames across a local link. This lesson explains how hubs and switches treat those frames, how switches build a MAC address table, and exactly when flooding occurs.

## Ethernet frame and MAC address

A **Media Access Control (MAC) address** identifies an interface for Layer 2 delivery on a local network. Ethernet MAC addresses are normally 48 bits and written as 12 hexadecimal digits, for example:

```text
00:25:96:12:34:56
```

A MAC address is not a routable Internet address. Routers use destination IP addresses to select a path and then use an appropriate Layer 2 address on each local link.

Important Ethernet frame fields include:

| Field | Purpose |
|---|---|
| Preamble/start delimiter | Helps the receiver synchronize and identifies frame start |
| Destination MAC | Determines intended local-link receiver or group |
| Source MAC | Identifies the transmitting interface on this link |
| Optional 802.1Q tag | Carries VLAN and priority information |
| EtherType/length | Identifies the carried protocol or frame interpretation |
| Payload | Carries data such as an IPv4 packet or ARP message |
| Frame Check Sequence (FCS) | Detects corruption across the link |

An Ethernet FCS detects errors; it does not provide authentication or encryption.

## Unicast, multicast, and broadcast MAC addresses

- A **unicast MAC** represents one interface.
- A **multicast MAC** represents a group of interested receivers.
- The Ethernet **broadcast MAC** is `ff:ff:ff:ff:ff:ff` and reaches every forwarding port in the VLAN, except the incoming port.

A broadcast is limited by the VLAN/broadcast domain. A router does not normally forward a Layer 2 broadcast into another IP network.

## Hub

An Ethernet **hub** is a Layer 1 multiport repeater. It repeats received signals toward the other ports without learning MAC addresses or understanding frames.

Consequences:

- All hub ports share one collision domain.
- Only one station can successfully transmit at a time on classic shared Ethernet.
- Half-duplex and Carrier Sense Multiple Access with Collision Detection (CSMA/CD) are associated with this shared design.
- Every attached station can physically receive repeated signals, although the NIC normally discards frames not addressed to it.

Hubs are obsolete in modern production networks but remain useful for understanding collision domains.

## Switch

A Layer 2 **switch** receives complete frames, learns source MAC locations, and uses the destination MAC to make a forwarding decision inside a VLAN.

Each normal switch port is its own collision domain. Modern switched Ethernet normally uses full-duplex, so collisions should not occur. A broadcast domain still spans all relevant ports in one VLAN until a router or Layer 3 boundary separates it.

## MAC address table

The switch stores dynamic mappings similar to:

| VLAN | MAC address | Port | Type |
|---:|---|---|---|
| 10 | `00:11:22:33:44:55` | Gi1/0/1 | Dynamic |
| 10 | `00:aa:bb:cc:dd:ee` | Gi1/0/24 | Dynamic |

The MAC address table is also called a forwarding database (FDB) and is often implemented with Content Addressable Memory (CAM). The terms are closely related, but platform documentation determines the exact implementation and command name.

### Learning and forwarding algorithm

When a frame enters a switch:

1. Identify the ingress port and VLAN.
2. Learn or refresh the **source MAC** on that port and VLAN.
3. Examine the **destination MAC**.
4. If the destination is known on another forwarding port, send the frame only there.
5. If the destination is known on the same ingress port, filter the frame because the destination is already on that segment.
6. If the destination is an unknown unicast, flood it to eligible ports in the same VLAN except the ingress port.
7. Flood broadcast and relevant multicast traffic according to VLAN and multicast policy.

The switch learns from the source address, not the destination address.

## What is switch flooding?

**Flooding** means copying a frame to multiple eligible ports in the same Layer 2 domain. It is not the same as sending traffic through a router, and it does not mean every frame is always copied everywhere.

Normal flooding cases include:

- Broadcast frames such as an ARP Request.
- Unknown-unicast frames when the destination MAC is not yet in the table.
- Some multicast traffic when no more specific multicast forwarding state exists.

Once the destination sends a reply, the switch learns its source MAC and later unicast traffic can be forwarded to one port.

### Unknown-unicast scenario

Host A (`00:11:22:33:44:55`) on Gi1/0/1 sends to Host B (`00:aa:bb:cc:dd:ee`) on Gi1/0/8. The switch table is initially empty.

1. The frame enters Gi1/0/1.
2. The switch learns A on Gi1/0/1.
3. B is unknown, so the switch floods the frame inside the VLAN.
4. B accepts the frame; other hosts discard it.
5. B replies.
6. The reply enters Gi1/0/8, so the switch learns B on Gi1/0/8.
7. Future A-to-B frames are known unicasts and go only to Gi1/0/8 until the entry ages out or changes.

Flooding one unknown unicast does not turn the entire switch into a hub. Other known flows are still switched normally, and each switch port remains a separate collision domain.

## MAC aging, movement, and flapping

Dynamic MAC entries age out after a platform-defined inactive period. If a device moves, the switch can relearn its source MAC on a new port.

Rapidly learning the same MAC on different ports is **MAC flapping**. Likely causes include:

- A Layer 2 loop.
- An incorrectly built link aggregation group.
- A host, hypervisor, or redundant device moving traffic between paths.
- Duplicate or virtual MAC behavior that is not operating as designed.

Do not clear the MAC table before recording VLAN, port, time, topology, logs, and spanning-tree state. Clearing evidence can temporarily hide the symptom without fixing the cause.

## Collision domain and broadcast domain

| Device/boundary | Collision behavior | Broadcast behavior |
|---|---|---|
| Hub | All ports share one collision domain | Repeats broadcasts and all other signals |
| Layer 2 switch | Each port is a separate collision domain | Floods broadcasts only inside the VLAN |
| VLAN | Separates Layer 2 broadcast domains | Broadcast remains inside that VLAN |
| Router or Layer 3 switch | Each routed interface/SVI is a Layer 3 boundary | Does not normally forward Layer 2 broadcasts |

A switch does not eliminate broadcasts. A VLAN does not automatically provide the security policy of a firewall.

## Simplex, half-duplex, and full-duplex Ethernet

- **Simplex:** data travels only one way; uncommon for normal Ethernet communication.
- **Half-duplex:** each side can transmit, but not simultaneously. Collisions and CSMA/CD apply on shared classic Ethernet.
- **Full-duplex:** both sides transmit simultaneously on a point-to-point link. CSMA/CD is not used and collisions are not expected.

A duplex mismatch can create poor throughput, late collisions on the half-duplex side, FCS errors, and intermittent application performance even while the link remains up.

## Layer 3 switch

A **Layer 3 switch** performs normal Layer 2 switching and can also route IP traffic in hardware. A Switch Virtual Interface (SVI) commonly acts as the default gateway for a VLAN.

Example:

| VLAN | Subnet | SVI/default gateway |
|---:|---|---|
| 10 | `10.10.10.0/24` | `10.10.10.1` |
| 20 | `10.10.20.0/24` | `10.10.20.1` |

Traffic inside VLAN 10 uses Layer 2 forwarding. Traffic from VLAN 10 to VLAN 20 is sent to the SVI MAC, routed at Layer 3, and then re-encapsulated in a new Ethernet frame for VLAN 20. An ACL or firewall policy should control which inter-VLAN flows are allowed.

## Practical switch inspection

```cisco
show mac address-table
show mac address-table dynamic vlan 10
show interfaces status
show interfaces counters errors
show spanning-tree vlan 10
```

| Line | What to inspect |
|---|---|
| `show mac address-table` | Learned MAC-to-port mappings and associated VLANs |
| Dynamic VLAN filter | Current dynamic entries only for VLAN 10 |
| `show interfaces status` | Link, VLAN, duplex, speed, and media summary |
| Error counters | CRC/FCS, collision, and drop evidence; exact columns vary |
| STP command | Root, port roles, and forwarding/blocking state for VLAN 10 |

### Controlled verification

1. Record the current MAC table.
2. Generate one authorized ping between two lab hosts in the same VLAN.
3. Display the table again and identify both learned source MAC addresses.
4. Shut down one lab host or wait for aging, then observe table changes.
5. Capture `arp` in Wireshark and distinguish the broadcast request from the unicast reply.

Never create a production loop or deliberately fill a switch MAC table. Perform fault injection only in an isolated lab.

## Encapsulation through a switch and router

For a local destination, the sender creates an Ethernet frame addressed directly to the destination MAC. A Layer 2 switch forwards the frame without changing the source or destination IP or MAC addresses.

For a remote destination, the sender creates a frame addressed to the default gateway's MAC. The router removes that Ethernet frame, decrements IPv4 TTL, consults its routing table, and creates a new Layer 2 frame for the next link. This is decapsulation followed by new encapsulation at the router.

Read the [IPv4, routing, gateway, and ARP foundation](04-ipv4-routing-and-arp.md) for the complete packet path.

## Foundation checks

1. Which address does a switch learn, and which address does it use to forward?
2. Compare a hub, a Layer 2 switch, and a Layer 3 switch.
3. Explain known unicast, unknown unicast, broadcast, and multicast forwarding.
4. Why can a full-duplex switch port show CRC errors but should not show normal collisions?
5. Explain why a VLAN is both a MAC-table scope and a broadcast-domain boundary.
