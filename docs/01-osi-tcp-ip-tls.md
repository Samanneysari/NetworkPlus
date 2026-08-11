# Chapter 1 — OSI, TCP/IP, TCP, UDP, and TLS

This chapter explains how networking responsibilities are divided into layers, how TCP and UDP differ, and how TLS protects an application connection.

## Why use layers?

Without layers, every application would need to understand cables, radio, routing, delivery, encryption, and user data as one system. Layers provide boundaries:

- A browser can use TCP without knowing the Ethernet switch model.
- IP can cross copper, fiber, or wireless links.
- A switch can forward a frame without understanding the web page.
- Engineers can troubleshoot one responsibility at a time.

The OSI model is a teaching and design model. Real protocols do not always fit perfectly into one layer, but the model gives a consistent vocabulary.

## OSI overview

| Layer | Name | Main responsibilities | PDU/identifier | Common examples |
|---:|---|---|---|---|
| 7 | Application | Network services used by applications | Data, names, URLs | HTTP, DNS, DHCP, SMTP, SNMP |
| 6 | Presentation | Representation, encoding, encryption, compression | Data, formats | JSON, UTF-8, image formats, TLS conceptually |
| 5 | Session | Start, maintain, and resume conversations | Session state | Checkpoints, session tokens, RPC concepts |
| 4 | Transport | Ports, reliability, ordering, flow | TCP segment or UDP datagram | TCP, UDP |
| 3 | Network | Logical addressing and routing | IP packet, IP address | IPv4, IPv6, ICMP, router |
| 2 | Data Link | Delivery across a local link | Frame, MAC, VLAN | Ethernet, 802.1Q, switch |
| 1 | Physical | Signals, connectors, media, timing | Bits | Copper, fiber, radio, repeaters |

## Layer 1 — Physical

### Purpose

Layer 1 turns bits into electrical voltage changes, light pulses, or radio waves and receives those signals at the other end.

### Responsibilities

- Cable, fiber, antenna, connector, and pinout.
- Signaling, timing, frequency, wavelength, and modulation.
- Supported distance and link speed.
- Physical interface state.

### Devices and examples

Copper and fiber cabling, transceivers, patch panels, antennas, hubs, repeaters, and the physical portion of a network interface.

### Common symptoms

- Link light is off.
- Interface is down/down.
- Signal or optical power is outside limits.
- CRC errors increase because of damaged media or interference.
- The wrong optic, wavelength, or fiber type is installed.

### Diagnostic question

**Do valid signals exist at both ends of the link?**

## Layer 2 — Data Link

### Purpose

Layer 2 delivers frames across one local broadcast domain. Ethernet uses MAC addresses for local delivery.

### Ethernet frame fields

| Field | Purpose |
|---|---|
| Preamble/SFD | Synchronizes the receiver and marks the frame start |
| Destination MAC | Local-link receiver or multicast/broadcast group |
| Source MAC | Sending interface on the local link |
| Optional 802.1Q tag | VLAN ID and priority information |
| EtherType/length | Identifies the upper-layer payload |
| Payload | Usually an IP packet |
| FCS | Detects transmission errors in the frame |

### How a switch decides

1. The switch learns the **source MAC** on the incoming port and VLAN.
2. It searches the MAC table for the **destination MAC**.
3. If known on another forwarding port, it sends the frame only there.
4. If unknown, it floods within that VLAN except the incoming port.
5. Broadcasts are flooded within the VLAN.
6. Dynamic MAC entries age out after inactivity.

### Common symptoms

- Wrong access VLAN or missing VLAN on a trunk.
- Native VLAN mismatch.
- STP blocking an unexpected path or preventing a loop correctly.
- MAC flapping and broadcast storms during a Layer 2 loop.
- LACP members suspended because their settings do not match.

### Diagnostic question

**Is the correct frame reaching the correct port in the correct VLAN?**

## Layer 3 — Network

### Purpose

Layer 3 moves packets between IP networks. Routers make forwarding decisions based on destination prefixes.

### Important IPv4 header fields

| Field | Purpose |
|---|---|
| Source IP | Original logical sender; NAT may translate it |
| Destination IP | Logical destination |
| TTL | Decreases at every router to stop indefinite loops |
| Protocol | Identifies TCP, UDP, ICMP, GRE, and other payloads |
| Fragmentation fields | Support IPv4 fragmentation behavior |

IPv6 uses a fixed base header and a Hop Limit instead of IPv4 TTL. It uses extension headers for optional functions.

### How a router decides

1. Remove the incoming Layer 2 frame.
2. Validate and inspect the IP packet.
3. Decrease TTL or Hop Limit.
4. Find the longest matching destination prefix.
5. Apply relevant policy, ACL, NAT, or QoS functions.
6. Resolve the next-hop link address if needed.
7. Encapsulate the packet in a new frame for the outgoing link.

The source and destination MAC addresses normally change at every routed hop. The end-to-end IP addresses normally remain the same unless a translation technology changes them.

### Diagnostic question

**Does a valid forward and return route exist, and do policies permit both directions?**

## Layer 4 — Transport

### Purpose

The transport layer identifies application endpoints with ports. TCP adds reliable, ordered delivery and flow control. UDP provides a simpler datagram service.

A conversation is commonly identified by the five-tuple:

```text
source IP, source port, destination IP, destination port, transport protocol
```

This allows many simultaneous connections to the same server port.

### Common symptoms

- SYN packets leave but no SYN-ACK returns.
- Connection is refused because no service is listening.
- Retransmissions indicate loss, reordering, or severe delay.
- A zero window indicates the receiver cannot consume data quickly enough.
- A firewall permits the IP path but blocks the required port.

### Diagnostic question

**Can the endpoints establish and maintain the required TCP or UDP conversation?**

## Layer 5 — Session

The session layer describes management of longer conversations: establishment, maintenance, checkpoints, recovery, and orderly termination. In modern software, these functions often exist inside application protocols, libraries, authentication systems, or RPC frameworks rather than as a separate visible protocol.

A session is not the same thing as a TCP connection. A web login session can survive across several TCP connections by using a cookie or token.

## Layer 6 — Presentation

The presentation layer describes how data is represented:

- Character encoding such as UTF-8.
- Serialization such as JSON or XML.
- Image, audio, and video formats.
- Compression.
- Encryption and decryption concepts.

TLS is often placed at Layer 6 in OSI teaching, but in real implementations it sits between the application and transport APIs. It is more important to understand its job than to argue about a single layer number.

## Layer 7 — Application

Layer 7 provides application-facing network behavior:

- HTTP requests and responses.
- DNS questions and resource records.
- DHCP address-assignment messages.
- SMTP mail transfer.
- SNMP monitoring operations.

An Application-layer failure can exist while lower layers are healthy. A TCP connection to port 443 may succeed while the web service returns HTTP 503 because its backend is unavailable.

## OSI troubleshooting table

| Layer | Evidence to collect | Example problem |
|---:|---|---|
| 1 | Link state, optical levels, cable test, error counters | Broken cable or incompatible optic |
| 2 | MAC table, VLAN, trunk, STP, LACP | VLAN missing from trunk |
| 3 | IP/prefix, ARP/ND, route table, traceroute | Wrong gateway or missing return route |
| 4 | Socket state, port test, TCP flags, retransmissions | Firewall drops TCP/443 |
| 5 | Session identifiers, timeout, authentication state | Expired login session |
| 6 | Encoding, certificate, cipher, TLS alert | Hostname mismatch |
| 7 | Application log, HTTP status, DNS answer | HTTP 503 or NXDOMAIN |

## Encapsulation step by step

For an HTTPS request:

1. HTTP creates a request.
2. TLS encrypts and authenticates application records.
3. TCP adds ports, sequence numbers, flags, and checksums.
4. IP adds logical addresses and routing fields.
5. Ethernet adds local MAC addresses and an FCS.
6. The interface transmits signals.

At the server, each layer validates and removes its information before passing the payload upward.

## TCP/IP model and OSI mapping

| TCP/IP layer | Approximate OSI mapping | Examples |
|---|---|---|
| Application | OSI 5–7 | HTTP, DNS, DHCP, TLS, SSH |
| Transport | OSI 4 | TCP, UDP |
| Internet | OSI 3 | IPv4, IPv6, ICMP |
| Link/Network access | OSI 1–2 | Ethernet, Wi-Fi, fiber, copper |

The mapping is approximate. TCP/IP describes the deployed Internet architecture; OSI provides a detailed conceptual model.

## TCP in detail

TCP is connection-oriented. It provides a byte stream with ordered delivery, acknowledgments, retransmission, receiver flow control, and congestion control.

### Important TCP header fields

| Field | Purpose |
|---|---|
| Source/destination port | Identifies client and server processes |
| Sequence number | Identifies byte position in the stream |
| Acknowledgment number | Indicates the next byte expected |
| Flags | SYN, ACK, FIN, RST, PSH, URG, ECE, and CWR behavior |
| Window | Advertises receiver capacity |
| Checksum | Detects corruption across header and data |
| Options | MSS, window scaling, timestamps, SACK permission |

### TCP three-way handshake

Assume a client begins with sequence 1000 and the server with 5000:

```text
Client → Server: SYN, Seq=1000
Server → Client: SYN-ACK, Seq=5000, Ack=1001
Client → Server: ACK, Seq=1001, Ack=5001
```

#### Line-by-line explanation

| Line | Meaning |
|---|---|
| SYN | Client requests a connection and announces its initial sequence number |
| SYN-ACK | Server accepts, acknowledges 1001, and announces its own initial sequence |
| ACK | Client acknowledges 5001; both sides can now exchange data |

SYN and FIN each consume one sequence number even without application payload.

### Acknowledgment and retransmission

TCP acknowledgments are normally cumulative. If the receiver acknowledges 4001, it has accepted all earlier bytes in order and expects byte 4001. Selective Acknowledgment can identify non-contiguous blocks so the sender retransmits less data.

A retransmission does not automatically prove congestion. It may result from physical loss, overloaded queues, wireless retries, a path change, filtering, or delayed acknowledgments. Use captures from suitable points and compare timing.

### Flow control and congestion control

- **Flow control** protects the receiver. The advertised window states how much more data it can accept.
- **Congestion control** protects the network. The sender changes its transmission behavior based on signs of congestion.

A TCP zero-window event usually means the receiving application or host is not draining its buffer. Packet loss and increasing retransmissions more often point to the path or congestion.

### Normal TCP close

```text
Client → Server: FIN
Server → Client: ACK
Server → Client: FIN
Client → Server: ACK
```

Each direction closes independently. `RST` aborts a connection immediately and may be sent when a port is closed, state is invalid, or an application terminates abruptly.

## UDP in detail

UDP is connectionless. Its header contains source port, destination port, length, and checksum. It does not provide built-in:

- Connection establishment.
- Delivery acknowledgment.
- Retransmission.
- Ordering.
- Receiver flow control.

An application can build these functions above UDP when needed. QUIC, for example, implements secure reliable streams over UDP.

### TCP and UDP comparison

| Characteristic | TCP | UDP |
|---|---|---|
| Connection setup | Yes | No built-in setup |
| Reliable ordered stream | Yes | No |
| Header overhead | Higher | Lower |
| Multicast/broadcast use | No native use | Supported by suitable applications |
| Typical examples | HTTPS, SSH, SMTP, SMB | DNS queries, DHCP, NTP, voice/video |
| Best fit | Correct ordered delivery matters | Low delay, simple request/response, or application-controlled reliability |

"UDP is faster" is incomplete. UDP has less protocol machinery, but actual performance depends on the application, loss, path, and recovery design.

## TLS in detail

TLS protects application traffic by providing:

- **Confidentiality:** observers cannot read encrypted content.
- **Integrity:** unauthorized changes are detected.
- **Authentication:** usually the client authenticates the server; mutual TLS can authenticate both.

TLS does not hide every detail. An observer can still see IP addresses, timing, sizes, and often some connection metadata. TLS also does not make a vulnerable application safe.

## Certificates and PKI

A certificate binds an identity to a public key. A certificate authority signs that statement. A typical chain is:

```text
Trusted root CA
  └── Intermediate CA
        └── www.realsam.ir server certificate
```

The server keeps the private key secret and sends its certificate chain. The client checks:

1. Signatures lead to a trusted root.
2. The current time is inside each certificate's validity period.
3. The hostname appears in Subject Alternative Name.
4. Key usage and extended key usage permit the operation.
5. Revocation information is handled according to policy.

## TLS 1.3 handshake step by step

### 1. ClientHello

The client sends supported TLS versions, cipher suites, random material, key share, extensions, and usually SNI for `www.realsam.ir`. It may also offer ALPN protocols such as HTTP/2.

### 2. ServerHello

The server chooses the TLS version and cipher suite, returns its key share, and establishes shared handshake keys from the key agreement.

### 3. Encrypted server messages

The server sends EncryptedExtensions, its Certificate chain, CertificateVerify, and Finished. CertificateVerify proves possession of the private key. Finished authenticates the handshake transcript.

### 4. Client validation

The client validates chain, signatures, dates, hostname, usage, and policy. If validation fails, a secure client stops instead of silently accepting the connection.

### 5. Client Finished

The client sends its Finished message. Both sides derive application traffic keys and exchange encrypted application data.

### TLS 1.2 versus 1.3

TLS 1.3 removes obsolete algorithms, encrypts more handshake messages, and normally requires fewer round trips than TLS 1.2. Older systems may still use TLS 1.2 with strong configuration. SSL and early TLS versions should not be enabled for compatibility without a documented, risk-accepted requirement.

### Session resumption and 0-RTT

Resumption avoids repeating all work for a returning client. TLS 1.3 can support early data, but 0-RTT data can be replayed. Applications must not use replay-sensitive operations in early data unless they have explicit protection.

## Inspect TCP and TLS safely

```bash
ss -tnp
sudo tcpdump -ni any 'host 192.0.2.80 and tcp port 443'
openssl s_client -connect www.realsam.ir:443 -servername www.realsam.ir -showcerts
curl -v https://www.realsam.ir/
```

### Line-by-line explanation

| Line | What it does |
|---|---|
| `ss -tnp` | Lists TCP sockets, numeric addresses, state, and process information when permitted |
| `tcpdump` | Captures only TCP/443 traffic for the documentation address; packet capture requires authorization |
| `openssl s_client` | Opens TLS with the correct SNI and prints the certificate chain and handshake details |
| `curl -v` | Displays connection, TLS, and HTTP progress without disabling certificate validation |

Never use `-k` or `--insecure` as a general fix. It suppresses certificate validation and can hide an on-path attack.

## Useful Wireshark display filters

```text
arp
dns
tcp.flags.syn == 1
tcp.analysis.retransmission
tcp.window_size_value == 0
tls
ip.addr == 192.0.2.80 && tcp.port == 443
```

A packet capture can contain credentials, cookies, DNS names, personal data, and proprietary content. Capture the minimum required traffic, restrict access, and delete it according to policy.

## Layered web troubleshooting example

| Observation | Likely area |
|---|---|
| No link and interface down | Layer 1 |
| Wrong VLAN or missing MAC learning | Layer 2 |
| No route or wrong gateway | Layer 3 |
| SYN retransmits with no reply | Layer 3/4 path, firewall, or server |
| TLS hostname/chain failure | Layer 6 concept and PKI |
| HTTP 401/403 | Application authentication/authorization |
| HTTP 502/503 | Proxy, backend, or capacity |

## End-of-chapter check

You should be able to:

- Explain every OSI layer without relying only on a mnemonic.
- Follow encapsulation and identify which addresses change at a router.
- Read SYN, SYN-ACK, ACK, FIN, RST, retransmission, and zero-window behavior.
- Explain exactly what TCP provides and what UDP does not provide.
- Describe a TLS 1.3 handshake and the purpose of certificate validation.
- Select evidence for each layer instead of restarting devices blindly.
