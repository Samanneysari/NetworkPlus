# Chapter 0 — Networking from Zero

This chapter assumes no IT background. By the end, you should understand what a network is, why addresses and protocols exist, and what happens after a user enters a web address.

## What is a network?

A network is a group of devices that exchange data through agreed rules. The devices may be computers, phones, servers, cameras, printers, switches, routers, or cloud systems. The connection may use copper, fiber, or radio.

Three things are required:

1. **A sender and receiver.** Something creates data and something consumes it.
2. **A path.** Copper, fiber, radio, switches, routers, and provider links carry the data.
3. **Protocols.** Both sides must agree on formats, addressing, timing, errors, and responses.

## A postal analogy

Sending data resembles sending a package:

- The application creates the content.
- A transport protocol identifies the correct service and may track delivery.
- IP writes logical source and destination addresses.
- Ethernet delivers the package to the next local stop.
- Physical media converts it into electrical, optical, or radio signals.

The analogy is not exact, but it explains why one message can carry several layers of addressing.

## Bits, bytes, and rates

A **bit** is a zero or one. Eight bits form a **byte**. Network rates are usually written in bits per second, while file sizes are usually written in bytes.

| Unit | Meaning |
|---|---:|
| 1 byte (B) | 8 bits |
| 1 megabit per second (Mb/s) | 1,000,000 bits per second |
| 1 megabyte (MB) | Commonly 1,000,000 bytes in networking/storage marketing |

A 100 MB file contains roughly 800 megabits before protocol overhead. On a perfect 100 Mb/s link it would need at least eight seconds, but real transfer takes longer because headers, acknowledgments, contention, latency, and storage also consume time.

## Data, segment, packet, frame, and signal

These words describe the data at different layers:

| Name | Layer/context | What it adds |
|---|---|---|
| Data | Application | User or application content |
| Segment | TCP transport | Source/destination ports, sequence, acknowledgments |
| Datagram | UDP transport | Source/destination ports and length with less control |
| Packet | IP network layer | Logical source/destination IP addresses |
| Frame | Data-link layer | Local source/destination MAC addresses and error check |
| Bits/signals | Physical layer | Electrical, optical, or radio representation |

Adding headers while data moves down the stack is **encapsulation**. Removing them at the destination is **decapsulation**.

## Client and server

A **client** starts a request. A **server** listens for and answers a service request. These are roles, not permanent device types. A laptop is a client when opening a website and can be a server when sharing a local file.

Examples:

- A browser is an HTTP client; a web service is an HTTP server.
- A workstation is a DNS client; a recursive resolver answers DNS queries.
- An SSH program is a client; the remote SSH daemon is a server.

## LAN, WAN, and the Internet

- A **LAN** connects devices in a limited environment such as a home, floor, or campus.
- A **WAN** connects sites across larger distances using provider or private links.
- The **Internet** is a worldwide network of networks that exchange routes and traffic.
- An **intranet** is an organization-only service using the same types of protocols.

## Basic devices

| Device | Plain-English purpose |
|---|---|
| Network interface | Connects a host to a medium and normally has a MAC address |
| Switch | Connects local devices and forwards frames by destination MAC |
| Router | Connects IP networks and forwards packets by destination IP |
| Access point | Bridges wireless clients into a wired network |
| Firewall | Allows or rejects traffic according to policy |
| Modem/ONT | Converts provider access technology into a usable local handoff |
| Server | Provides services such as DNS, web, mail, or storage |

A home device may combine a router, switch, access point, firewall, DHCP server, DNS forwarder, and modem. Combining roles does not remove the conceptual difference.

## Four identifiers beginners often confuse

| Identifier | Example | Question it answers |
|---|---|---|
| Hostname/domain | `www.realsam.ir` | What human-readable service do I want? |
| IP address | `192.0.2.80` | Which logical endpoint/network? |
| MAC address | `00:11:22:33:44:55` | Which interface on this local link? |
| TCP/UDP port | `443` | Which application service on that host? |

DNS can translate a name into an IP. ARP or IPv6 Neighbor Discovery can translate a next-hop IP into a local-link address. A port then identifies the intended process or service.

## Subnet and default gateway

A subnet groups IP addresses under a common prefix. A host uses its address and prefix to decide whether a destination is local.

Example:

- Host: `10.10.10.25/24`
- Local network: `10.10.10.0/24`
- Another local host: `10.10.10.80`
- Remote host: `10.10.20.80`
- Default gateway: `10.10.10.1`

For a local destination, the host resolves the destination's MAC and sends directly. For a remote destination, it resolves the gateway's MAC and sends the frame to the gateway. The IP destination remains the remote host; only the local frame destination is the gateway.

## What DHCP provides

Dynamic Host Configuration Protocol can provide:

- IPv4 address and subnet mask.
- Default gateway.
- DNS server addresses.
- Domain-search information.
- Lease duration and other options.

DHCP does not prove the network is secure. An unauthorized DHCP server can provide a malicious gateway or DNS resolver, which is why enterprise switches use controls such as DHCP Snooping.

## What DNS does

The Domain Name System stores distributed records. A common job is mapping a hostname to IPv4 or IPv6:

```text
www.realsam.ir → 192.0.2.80
```

DNS also publishes mail servers, authoritative name servers, aliases, text policies, zone metadata, and reverse mappings. Complete DNS and PTR/rDNS coverage appears in [Network Operations](04-network-operations.md).

## From typing a URL to seeing a page

Suppose the user enters:

```text
https://www.realsam.ir/learn
```

### Step 1: parse the URL

- `https` is the scheme.
- `www.realsam.ir` is the hostname.
- The default port is 443.
- `/learn` is the path.

### Step 2: resolve the name

The browser and operating system check caches and the hosts file. If no valid answer exists, the system asks its configured recursive DNS resolver. The resolver may query root, `.ir`, and `realsam.ir` authoritative servers before returning A and AAAA records.

### Step 3: choose the route

The client examines its routing table. If the server is remote, the selected next hop is normally the default gateway. The route with the longest matching prefix wins.

### Step 4: find the next-hop link address

For IPv4, ARP asks which MAC owns the next-hop IP. For IPv6, Neighbor Discovery performs the corresponding job with ICMPv6. The client stores the result temporarily in a neighbor table.

### Step 5: encapsulate and forward

The client creates application data, a TCP segment or QUIC datagram, an IP packet, and an Ethernet or wireless frame. The switch forwards by MAC. Each router removes the incoming Layer 2 frame, makes an IP routing decision, and creates a new Layer 2 frame for the next link.

### Step 6: translate at the edge if required

Many private IPv4 clients use PAT. The edge device replaces the private source IP and port with a public source IP and translated port, then remembers the mapping for return traffic.

### Step 7: establish transport

With HTTPS over TCP, the client sends SYN, receives SYN-ACK, and replies ACK. With HTTP/3, QUIC runs over UDP and performs transport and cryptographic setup differently.

### Step 8: establish TLS

The peers agree on cryptographic parameters. The server proves possession of the private key associated with its certificate. The client validates the chain, time, key usage, and the `www.realsam.ir` hostname in the certificate Subject Alternative Name.

### Step 9: exchange HTTP

The browser sends an HTTP request. A CDN, reverse proxy, load balancer, web server, application, and database may all participate before the response returns.

### Step 10: render

The browser interprets HTML, CSS, JavaScript, fonts, and images. Each dependency may cause additional DNS, transport, TLS, and HTTP activity, although connections and cache entries can be reused.

## First Linux diagnostic commands

```bash
ip address show
ip route show
ip neighbor show
ping -c 4 10.10.10.1
dig A www.realsam.ir
curl -v https://www.realsam.ir/
```

### Line-by-line explanation

| Line | What it does |
|---|---|
| `ip address show` | Displays interfaces, state, MAC addresses, and IP prefixes |
| `ip route show` | Displays connected, default, and learned routes |
| `ip neighbor show` | Displays IPv4 ARP and IPv6 neighbor entries |
| `ping -c 4 ...` | Sends four ICMP echo requests to the gateway; this is limited evidence, not a full service test |
| `dig A ...` | Queries the A record and shows the resolver, status, TTL, and answer |
| `curl -v ...` | Displays important DNS, TCP, TLS, and HTTP progress |

## First Windows diagnostic commands

```powershell
Get-NetIPConfiguration
Get-NetRoute
Get-NetNeighbor
ping 10.10.10.1
Resolve-DnsName www.realsam.ir -Type A
Test-NetConnection www.realsam.ir -Port 443
```

### Line-by-line explanation

| Line | What it does |
|---|---|
| `Get-NetIPConfiguration` | Shows adapter IP addresses, gateways, and DNS servers |
| `Get-NetRoute` | Shows the Windows routing table |
| `Get-NetNeighbor` | Shows ARP and IPv6 neighbor state |
| `ping` | Tests a small ICMP exchange with the gateway |
| `Resolve-DnsName` | Requests the A record for the hostname |
| `Test-NetConnection` | Tests name resolution and TCP port 443 connectivity |

## Common beginner mistakes

- **"The Internet is down"** may mean only DNS, one website, one browser, or one Wi-Fi client is failing.
- **A successful ping does not prove the application works.** It does not validate DNS, TCP/UDP ports, TLS, credentials, or HTTP.
- **A private IP is not automatically secure.** Internal threats, VPN routes, malware, and misconfigured firewalls still matter.
- **Changing a service port is not strong security.** It may reduce noise but does not replace patching, authentication, authorization, or filtering.
- **More signal bars do not guarantee good Wi-Fi.** Interference, retries, channel use, airtime, and backhaul capacity matter.
- **Restarting is not root-cause analysis.** Record evidence before clearing counters or state.

## End-of-chapter check

You are ready to continue when you can:

- Distinguish data, segment/datagram, packet, frame, and bits.
- Explain the difference between names, IPs, MAC addresses, and ports.
- Explain why a remote destination is sent to the default gateway's MAC.
- Describe the complete path from a URL to a rendered web page.
- Use basic Linux or Windows commands and state exactly what each result proves.
