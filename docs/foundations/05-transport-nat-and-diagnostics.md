# Foundation 5 — Ports, TCP/UDP, NAT/PAT, and Diagnostics

This lesson connects application ports to TCP and UDP, explains acknowledgments and translation, and teaches how to interpret `ping`, `tracert`/`traceroute`, and socket output without drawing conclusions that the evidence cannot support.

## TCP/IP protocol suite

**TCP/IP** is the deployed protocol suite used by the Internet and most enterprise networks. It is also the name of a four-layer model.

| TCP/IP layer | Approximate OSI mapping | Examples |
|---|---|---|
| Application | OSI 5–7 | HTTP, DNS, DHCP, SSH, TLS |
| Transport | OSI 4 | TCP, UDP |
| Internet | OSI 3 | IPv4, IPv6, ICMP |
| Link/Network Access | OSI 1–2 | Ethernet, Wi-Fi, copper, fiber |

The protocol suite includes both TCP and UDP, but IP can also carry protocols such as ICMP, GRE, and ESP without using either one.

## Port

A **TCP or UDP port** is a 16-bit number used to deliver transport-layer data to the correct application endpoint on a host. Values range from 0 through 65535.

A network connection is identified by more than one port. A TCP flow is commonly distinguished by:

```text
source IP, source port, destination IP, destination port, protocol
```

Example browser connection:

```text
192.0.2.25:51844  ->  198.51.100.80:443  TCP
```

The client usually selects a temporary **ephemeral source port**. The server listens on a known service port such as TCP 443. TCP port 53 and UDP port 53 are different transport endpoints.

`ping` does not test a TCP or UDP port; it normally uses ICMP Echo messages.

## TCP

**Transmission Control Protocol (TCP)** provides a connection-oriented byte stream. It includes:

- Connection establishment and termination.
- Sequence numbers and ordered delivery.
- Acknowledgments and retransmission.
- Receiver flow control.
- Congestion control.
- A checksum for transport-level error detection.

TCP protects delivery behavior, not confidentiality. Applications normally add TLS when encryption and authenticated peers are required.

## TCP three-way handshake

```text
Client                                      Server
SYN, Seq=x                            ->
                                      <-    SYN-ACK, Seq=y, Ack=x+1
ACK, Ack=y+1                          ->
```

1. **SYN:** the client requests a connection and advertises its initial sequence information and options.
2. **SYN-ACK:** the server acknowledges the client and supplies its own sequence information.
3. **ACK:** the client acknowledges the server; the connection is established.

A TCP timeout during the handshake can involve routing, ACL/firewall policy, the server, NAT state, or the return path. A connection refusal normally means an IP response reached the client and no service accepted that connection at the target port.

## ACK and acknowledgment numbers

The TCP **ACK flag** states that the acknowledgment field is valid. The acknowledgment number normally identifies the next byte the receiver expects.

If a sender transmits 500 bytes beginning with sequence number 1001, the next expected byte is 1501, so a cumulative acknowledgment can carry `Ack=1501`.

An ACK does not always mean an application has processed the data. It primarily confirms transport-layer receipt by the TCP stack. Packet loss can produce duplicate acknowledgments, selective acknowledgments, retransmission, and reduced sending rate.

## UDP

**User Datagram Protocol (UDP)** sends independent datagrams with minimal transport overhead. UDP provides ports, length, and a checksum, but it does not itself provide:

- A connection handshake.
- Guaranteed delivery.
- Ordering.
- Retransmission.
- Receiver flow control.
- Congestion control equivalent to TCP's built-in mechanisms.

Applications can add any reliability they need. DNS commonly uses UDP for ordinary queries and TCP when required; QUIC implements secure reliable transport features over UDP for HTTP/3.

## TCP and UDP comparison

| Requirement | TCP | UDP |
|---|---|---|
| Connection state | Yes | No built-in connection |
| Ordered byte stream | Yes | No |
| Built-in retransmission | Yes | No |
| Broadcast/multicast use | No normal TCP broadcast/multicast | Possible where the application and IP support it |
| Typical examples | HTTPS, SSH, SMB | DHCP, many DNS queries, voice/media, QUIC |

Choose according to application requirements. “UDP is faster” is incomplete: real performance depends on loss, congestion behavior, application design, CPU, latency, and security.

## NAT and PAT

**Network Address Translation (NAT)** changes IP address information as traffic crosses a translation device. **Port Address Translation (PAT)** also translates transport ports so many internal flows can share one public IPv4 address.

Example PAT entry:

```text
Inside local             Inside global          Outside
10.10.10.25:51844   ->   203.0.113.10:40001  -> 198.51.100.80:443 TCP
```

| Value | Meaning |
|---|---|
| `10.10.10.25:51844` | Client address and source port before translation |
| `203.0.113.10:40001` | Public address and translated source port |
| `198.51.100.80:443` | Destination web service |
| `TCP` | Translation state is protocol-specific |

Return traffic to `203.0.113.10:40001` is matched to the translation state and sent to `10.10.10.25:51844`.

### Common translation forms

- **Static NAT:** consistent one-to-one mapping.
- **Dynamic NAT:** mapping selected from a pool.
- **PAT/NAT overload:** many internal flows share fewer public addresses by using ports.
- **Destination NAT/port forwarding:** changes the destination so an inbound flow reaches an internal service.

NAT is not a firewall. Translation can limit unsolicited inbound reachability as a side effect of missing state, but explicit security policy is still required. NAT also complicates logging: a useful investigation may need original and translated IPs, ports, protocol, and synchronized timestamps.

## Ping

`ping` normally sends ICMP Echo Requests and measures received Echo Replies. It can provide limited evidence about name resolution, local transmission, IP reachability, loss, and round-trip time.

```powershell
ping -n 4 10.10.10.1
ping -n 4 198.51.100.80
ping -n 4 www.realsam.ir
```

| Line | Purpose |
|---|---|
| Gateway ping | Tests a small ICMP exchange with the local next hop |
| Remote-IP ping | Tests IP reachability without requiring DNS |
| Name ping | Adds name resolution before the ICMP test |

Four successful pings do not prove that an HTTPS service is healthy. The application may use a different path or address family, ICMP may be treated differently, and TCP/TLS/backend failures can still exist.

## Round-trip time

**Round-trip time (RTT)** is the elapsed time for a request to travel to a responder and for the reply to return. Ping commonly reports RTT in milliseconds.

RTT includes endpoint processing, serialization, propagation, switching/routing, security devices, queueing, and the return path. It is not one-way delay, and an average can hide spikes and jitter.

Record count, minimum, maximum, average, loss, time, packet size, source, destination, and path context. One sample is not a baseline.

## Interpret common Windows ping results

| Output | What the evidence actually says | Investigate first |
|---|---|---|
| `Reply from ...` | An ICMP Echo Reply returned from the displayed address | RTT/loss pattern and whether the real application also works |
| `Destination host unreachable` | A local or intermediate IP device reported that it could not deliver the packet | Read the address that generated the message; check ARP, link, route, gateway, or downstream route |
| `Request timed out` | No acceptable Echo Reply arrived before the wait expired | Target state, ICMP policy, route, return path, loss, and whether another protocol works |
| `PING: transmit failed. General failure.` | Windows failed locally while attempting to send; this is not a remote ICMP reply | Local interface, address, route, network stack, VPN/filter driver, and local security software |
| `TTL expired in transit` | A router discarded the packet after TTL reached zero and returned ICMP Time Exceeded | Routing loop, unexpectedly long path, or deliberate traceroute behavior |
| `Ping request could not find host` | Name resolution failed before an IP ping could begin | Spelling, suffix, hosts file, DNS configuration, and DNS response |

Do not translate `Request timed out` into “the host is down.” A firewall can silently discard ICMP while the actual application remains available.

### Evidence-first ping sequence

1. `ping 127.0.0.1` — local IPv4 stack only.
2. Ping the host's own assigned address — local interface/address behavior.
3. Ping the default gateway — local link, ARP, and gateway response.
4. Ping an approved remote IP — routing without DNS.
5. Ping a hostname — adds DNS, but still tests ICMP rather than the application.
6. Test the real service, for example `Test-NetConnection host -Port 443` or `curl -v`.

Failure at one step narrows the scope but does not automatically prove one root cause.

## TTL

IPv4 **Time to Live (TTL)** is an 8-bit field. Each router decrements it by at least one. If the value reaches zero, the router discards the packet and normally sends ICMP Time Exceeded to the source.

TTL prevents packets from circulating forever during a routing loop. Despite the name, routers commonly treat it as a hop limit. IPv6 names the equivalent field **Hop Limit**.

The received TTL is not a reliable operating-system fingerprint by itself because the sender's initial value, path length, tunneling, and middleboxes all affect it.

## Tracert and traceroute

Traceroute-style tools send probes with TTL/Hop Limit values of 1, 2, 3, and so on:

1. The first router reduces TTL 1 to zero and normally returns ICMP Time Exceeded.
2. The next probe uses TTL 2 and expires at the second router.
3. The process continues until the destination responds or the limit is reached.

Windows `tracert` normally uses ICMP Echo probes. Traditional Linux `traceroute` commonly defaults to UDP probes, although options can select ICMP or TCP. Firewalls and load balancing can therefore make their results differ.

```powershell
tracert -d 198.51.100.80
Test-NetConnection 198.51.100.80 -TraceRoute
```

| Line | Purpose |
|---|---|
| `tracert -d` | Displays responding hops without reverse-DNS lookup delays |
| `Test-NetConnection -TraceRoute` | Performs a PowerShell route trace and returns structured information |

An asterisk means that a probe response did not arrive in time. It does not prove that the router failed to forward other traffic. A later responding hop proves that packets passed beyond an earlier silent hop.

## Netstat and socket state

Windows `netstat` displays active TCP connections, listening TCP/UDP endpoints, protocol statistics, and routing information depending on its options.

```powershell
netstat -ano
netstat -anob
netstat -s
netstat -rn
Get-NetTCPConnection
```

| Line | Purpose |
|---|---|
| `netstat -ano` | Shows numeric addresses, listening/active endpoints, connection state, and PID |
| `netstat -anob` | Adds executable information when privileges allow; may be slower |
| `netstat -s` | Shows per-protocol counters |
| `netstat -rn` | Shows the numeric routing table |
| `Get-NetTCPConnection` | Provides structured PowerShell TCP connection and listener data |

Important TCP states include:

| State | Meaning |
|---|---|
| `LISTENING` | Local service is waiting for inbound TCP connections |
| `SYN_SENT` | Client sent SYN and is waiting for the handshake response |
| `ESTABLISHED` | TCP handshake completed; it does not prove application health |
| `TIME_WAIT` | Closed flow is temporarily retained to handle delayed segments safely |

UDP is connectionless, so a UDP endpoint can be displayed without an `ESTABLISHED` state.

On modern Linux, `ss` is normally preferred to the older `netstat`:

```bash
ss -lntup
ss -tn state established
ip route
```

| Line | Purpose |
|---|---|
| `ss -lntup` | Lists listening numeric TCP and UDP sockets; process data may require privilege |
| Established filter | Displays established TCP connections |
| `ip route` | Displays routes; routing is not socket state |

## End-to-end diagnostic sequence

For “the website does not open”:

1. Record exact URL, error, time, user, and scope.
2. Inspect interface, IP/prefix, gateway, DNS, and routes.
3. Inspect ARP/neighbor state for the next hop.
4. Test the gateway and an approved remote IP.
5. Resolve the hostname and record A/AAAA answers and resolver.
6. Test TCP port 443.
7. Inspect the TCP handshake or socket state.
8. Validate TLS name, chain, dates, and system time.
9. Inspect HTTP status and backend behavior.
10. Check NAT/PAT, ACL/firewall, proxy, VPN, and return path.
11. Correct one supported theory with approval and rollback.
12. Verify user behavior, monitoring, security, and documentation.

## Foundation checks

1. Identify every element of `192.0.2.25:51844 → 198.51.100.80:443 TCP`.
2. Explain what an ACK number confirms and what it does not confirm.
3. Compare static NAT, dynamic NAT, PAT, and destination NAT.
4. Explain why ping success does not prove TCP port 443 works.
5. Contrast `Destination host unreachable`, `Request timed out`, and `General failure`.
6. Explain why an asterisk at one traceroute hop does not prove that forwarding stopped there.
7. Use socket state to distinguish a listening service, an incomplete TCP handshake, and an established transport connection.
