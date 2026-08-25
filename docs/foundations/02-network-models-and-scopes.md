# Foundation 2 — Networks, Roles, Models, and Scope

This lesson defines a network, separates service roles from device types, and explains how network size and organizational control affect design.

## What is a network?

A **network** is a set of connected systems that exchange data and share services by following agreed protocols. A useful network needs more than a cable or Wi-Fi signal. It needs:

- Endpoints or services that have a reason to communicate.
- Interfaces and media that carry signals.
- Addresses and names that identify destinations.
- Protocols that define message formats and behavior.
- Forwarding devices that move frames and packets.
- Policy, security, monitoring, documentation, and recovery.

The Internet is an interconnection of many independently operated IP networks. A LAN can continue working when its Internet connection fails.

## Client and server

A **client** initiates a request for a service. A **server** listens for and responds to requests. These words describe roles in one exchange, not permanent hardware categories.

Example: when a laptop asks a DNS resolver for `www.realsam.ir`, the laptop is the DNS client and the resolver is the DNS server. The resolver can then act as a client when it queries another DNS server.

| Role | Common action | Example |
|---|---|---|
| Client | Initiates a request from a temporary source port | Browser connects to TCP port 443 |
| Server | Listens on an address and service port | Web server listens on TCP port 443 |

A server can run on physical hardware, a VM, a container, a cloud service, or even a laptop in a lab. “Server” does not automatically mean powerful, centralized, secure, or redundant.

## Client-server and peer-to-peer

### Client-server model

A centralized service provides authentication, files, applications, databases, DNS, or another function to clients.

Benefits:

- Central policy, identity, backup, logging, and updates.
- Easier discovery and consistent data.
- Clear ownership and service boundaries.

Risks:

- The service can become a bottleneck or single point of failure.
- Central compromise can have broad impact.
- Redundancy and recovery require deliberate design.

### Peer-to-peer model

In a **peer-to-peer (P2P)** design, systems can communicate or share resources directly and may act as both client and server. A small Windows workgroup with direct file sharing is one example; distributed applications are another.

Benefits include simple setup and no required central service. Costs include duplicated accounts, inconsistent permissions, weak inventory, difficult backups, and poor scalability when the number of peers grows.

Peer-to-peer describes the relationship between participants. It does not mean that security, authentication, or encryption are unnecessary.

## Windows workgroup and domain

A **workgroup** is a named collection of Windows computers without centralized Active Directory membership. Each computer controls its own local users, passwords, permissions, and policy.

An **Active Directory domain** provides a centralized identity and management boundary. Domain controllers store directory information and support authentication, authorization, Group Policy, computer accounts, and other services.

| Question | Workgroup | Active Directory domain |
|---|---|---|
| Where are users primarily managed? | Separately on each computer | Centrally in the directory |
| Policy | Local configuration | Central Group Policy plus local policy |
| Growth | Suitable for small/simple environments | Designed for managed organizational environments |
| Dependency | No domain controller required | Domain services and DNS must be designed for availability |
| Trust | Same workgroup name does not create authentication trust | Domain membership establishes managed identity relationships |

Important distinctions:

- A DNS domain such as `realsam.ir` is a naming hierarchy. An Active Directory domain uses DNS but is an identity and management system. They are related concepts, not synonyms.
- Moving a computer into another workgroup does not create VLAN isolation or a firewall boundary.
- A domain should have redundant domain controllers and healthy DNS; one domain controller is a single point of failure.

## Single point of failure

A **single point of failure (SPOF)** is one component whose failure can stop a required service because no working alternative exists.

Examples include:

- One power supply, uplink, firewall, default gateway, DNS resolver, or Internet circuit.
- Two switches that both depend on one PDU.
- A redundant application whose only database is not redundant.
- Two physical links that share one cable tray and can be cut together.

Redundancy is only useful when failures are independent enough and failover is tested.

### Find the real dependency chain

For an internal web service, trace:

1. Endpoint power and network access.
2. Access switch and uplinks.
3. Default gateway, routing, and security policy.
4. DNS and time.
5. Load balancer or reverse proxy.
6. Application and database.
7. Identity provider, storage, and backups.

If any required step has no alternative, the service still has a SPOF even if other layers are redundant.

## Network scope: PAN, LAN, CAN, MAN, and WAN

These labels describe approximate scope and ownership. They do not determine the protocol, speed, or security by themselves.

| Type | Full name | Typical scope | Example |
|---|---|---|---|
| PAN | Personal Area Network | Around one person or a few meters | Phone connected to earbuds or a personal hotspot |
| LAN | Local Area Network | Room, home, office, or building | Ethernet and Wi-Fi inside an office |
| CAN | Campus Area Network | Several nearby buildings under one organization | University or industrial campus |
| MAN | Metropolitan Area Network | City or metropolitan region | Provider metro Ethernet connecting city sites |
| WAN | Wide Area Network | Regions, countries, or continents | Branches connected with carrier, Internet VPN, or SD-WAN |

“CAN” can also mean Controller Area Network in automotive and industrial contexts. In Network+ topology discussions, confirm whether the question means Campus Area Network.

A network can be physically local but logically part of a WAN service. Ownership, provider boundaries, latency, failure domains, and service-level agreements often matter more than distance alone.

## OSI and TCP/IP models

Models divide communication into responsibilities so engineers can reason about design and failure.

| OSI layer | Main responsibility | Examples |
|---:|---|---|
| 7 Application | User-facing network services | HTTP, DNS, DHCP, SSH |
| 6 Presentation | Representation, encryption, compression | Encoding and TLS concepts |
| 5 Session | Conversation and session coordination | Session state and checkpoints |
| 4 Transport | Ports, reliability, flow, multiplexing | TCP and UDP |
| 3 Network | Logical addressing and routing | IPv4, IPv6, ICMP, router |
| 2 Data Link | Local-link framing and forwarding | Ethernet, Wi-Fi, VLAN, switch |
| 1 Physical | Signals, media, connectors | Copper, fiber, and radio |

The TCP/IP model normally groups them as Application, Transport, Internet, and Link/Network Access. The mapping is approximate because real protocols do not always fit one clean box.

Read the detailed [OSI, TCP/IP, TCP, UDP, and TLS chapter](../01-osi-tcp-ip-tls.md) after this foundation.

## Encapsulation and decapsulation

**Encapsulation** adds control information while data moves down a protocol stack. **Decapsulation** validates and removes that information while data moves up the receiving stack.

For a basic HTTPS exchange:

1. HTTP produces application data.
2. TLS protects the application records.
3. TCP adds source/destination ports, sequence information, flags, and a checksum.
4. IP adds source/destination IP addresses, TTL or Hop Limit, and other routing fields.
5. Ethernet adds source/destination MAC addresses, an EtherType, and a frame check sequence.
6. The physical interface transmits signals.

At a router, the incoming Layer 2 frame is removed, the Layer 3 packet is processed, and a new Layer 2 frame is created for the next link. The end-to-end IP addresses normally remain the same unless translation occurs; the link-layer MAC addresses change at every routed hop.

## Communication direction

| Mode | Direction | Example |
|---|---|---|
| Simplex | One direction only | A one-way sensor or broadcast feed |
| Half-duplex | Both directions, but not simultaneously | Legacy shared Ethernet or push-to-talk radio |
| Full-duplex | Both directions simultaneously | Modern switched Ethernet links |

Duplex is different from traffic type. A full-duplex link can carry unicast, multicast, and broadcast frames.

## Delivery type

| Type | Delivery intent | Example |
|---|---|---|
| Unicast | One sender to one specific receiver | Client opens SSH to one server |
| Broadcast | One sender to all members of an IPv4 broadcast domain | ARP Request or DHCP Discover |
| Multicast | One sender to interested members of a group | Routing updates or media distribution |
| Anycast | One address exists at several locations; routing selects an instance | Distributed DNS service |

IPv6 does not use broadcast. It uses multicast for Neighbor Discovery and other group communication.

## Foundation checks

1. Explain how one device can be a server in one exchange and a client in another.
2. Compare a Windows workgroup, an Active Directory domain, and a DNS domain.
3. Identify three hidden SPOFs in a supposedly redundant service.
4. Give one PAN, LAN, CAN, MAN, and WAN example without using distance as the only reason.
5. Explain what changes and what normally remains end to end when a router forwards an Ethernet-carried IPv4 packet.
