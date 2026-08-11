# Chapter 6 — Network Troubleshooting

Professional troubleshooting is not random guessing or running many commands. It is a controlled process of forming a theory, collecting evidence, making a safe change, and proving the result. Domain 5 has the largest exam weight.

## 5.1 — Standard troubleshooting methodology

### 1. Identify the problem

Ask:

- What exactly fails, and what exact message appears?
- When did it begin?
- Who and what locations are affected?
- What still works?
- Is the failure constant or intermittent?
- What was the most recent change?

Then establish scope:

- One application, one host, one VLAN, one site, or everyone?
- Does access by IP work while access by name fails?
- Is only Wi-Fi affected, or wired clients too?
- Is local communication healthy while remote access fails?
- What do monitoring, logs, and the change calendar show?

Save relevant configuration, logs, counters, and timestamps before changing state. Do not copy credentials, tokens, or unnecessary personal data into a ticket.

### 2. Establish a theory

Choose the simplest likely cause supported by the scope.

- **Bottom-up:** physical toward application; useful for a down link.
- **Top-down:** application toward physical; useful for one service.
- **Divide and conquer:** start in the middle, such as pinging the gateway, to split the problem domain.
- **Follow the path:** inspect each hop and security zone in order.
- **Compare:** healthy versus failed device, or current behavior versus baseline.

Correlation is not proof. A failure after a change is strong evidence, but the change still needs testing.

### 3. Test the theory

Choose a low-risk test that can confirm or reject one theory. Check a known-good patch cable and interface counters instead of restarting an entire switch. If the theory fails, build the next theory or escalate with evidence.

### 4–5. Plan and implement

Record impact, authorization, maintenance window, backup, rollback, and success criteria. Change one relevant variable at a time. Even during an incident, record commands and timestamps.

### 6–7. Verify and document

Ping alone is not complete verification. Test the actual user service, monitoring, redundancy, and security behavior. Document the root cause, evidence, action, timeline, result, and prevention.

## 5.2 — Cabling, interfaces, and hardware

### Common physical symptoms

| Symptom | Likely causes | Tests |
|---|---|---|
| No link | Cable, port, power, or transceiver | LEDs, known-good component, DOM/loopback |
| Lower speed | Category/pair failure or negotiation | Both-end status and cable test |
| Increasing CRC | Noise, cable/connector, duplex mismatch | Counter rate and controlled replacement |
| Intermittent link | Loose connector, bend, tension, heat | Logs, TDR, and physical inspection |
| Fiber no link | Tx/Rx crossed, wrong wavelength, SM/MM mismatch, dirt | DOM, power meter, clean/inspect |

Cat 5e, 6, 6A, 7, and 8 have different specifications. Shielding only helps when installed and bonded correctly. A split pair may pass simple continuity while failing because of crosstalk.

**Attenuation** is signal loss with distance and connections. **Crosstalk** is unwanted energy between pairs. **Interference** comes from external sources. Excess untwist, sharp bends, poor termination, and too many connectors reduce margin.

### Interface counters

- **CRC/FCS errors:** corrupted frames; physical media or duplex is likely.
- **Runts:** frames below valid minimum size; can indicate collisions or faults.
- **Giants:** oversized frames; may indicate MTU mismatch or faults.
- **Drops/discards:** buffer, congestion, policy, or hardware pressure.
- **Late collisions:** classic duplex mismatch or invalid collision-domain conditions.

An old counter is not proof of a current fault. Record the value and time, clear only when authorized, reproduce traffic, and measure the rate of increase.

### Interface states

| State | Likely meaning |
|---|---|
| Administratively down | Disabled by configuration |
| Down/down | No physical link |
| Up/down | Physical exists but protocol/encapsulation fails |
| Err-disabled | A protection feature shut the port |
| Suspended | EtherChannel/LACP inconsistency |

Bouncing a port without correcting the reason only hides the fault temporarily and may erase evidence.

### PoE and transceivers

For PoE, inspect PSE budget, standard, class, actual PD consumption, cable pairs, and negotiation logs. An AP may boot with reduced power but disable radios or USB.

For optics, compare part numbers, speed, wavelength, SMF/MMF, connector/polarity, supported reach, transmit power, receive power, and thresholds. Too much optical power can also overload a receiver. Follow inspect-clean-inspect practice.

```cisco
show interfaces status
show interfaces GigabitEthernet1/0/10
show interfaces counters errors
show power inline
show interfaces transceiver detail
show logging | include Gi1/0/10
```

| Line | Purpose |
|---|---|
| 1 | Displays VLAN, duplex, speed, and port type |
| 2 | Displays detailed state and counters for the target port |
| 3 | Summarizes errors; command varies by platform |
| 4 | Displays PoE budget and device state |
| 5 | Displays optic type and DOM values when supported |
| 6 | Filters logs for the port; pipe syntax varies by platform |

## 5.3 — Service, switching, and routing problems

### VLAN and STP

Loop symptoms include high broadcast rate, MAC flapping, high CPU, duplicate frames, and broad instability. Follow the topology and recent change rather than disconnecting random links.

Check:

1. Correct access VLAN.
2. VLAN exists on each relevant switch.
3. VLAN is allowed across both trunk ends.
4. Native VLAN matches.
5. STP role/state and guard condition.
6. Intended root bridge.
7. LAG member consistency.

An STP discarding state is not automatically a fault; it is how STP prevents loops. It is a problem only when topology or redundancy differs from design.

### ACL troubleshooting

Write source, destination, protocol, port, direction, and interface. Check rule order and hit counters. Frequent mistakes include implicit deny, wrong direction, stateless return traffic, and permitting only UDP DNS when TCP DNS is also required.

Do not remove all security policy as a test. Use a narrowly scoped temporary rule with authorization and evidence.

### Routing and return path

Look up the destination rather than only reading the whole table. Check connected routes, longest prefix, next-hop reachability, recursive lookup, VRF, AD, metric, and default route. A forward route does not guarantee a return route.

```cisco
show ip route 10.10.20.80
show ip cef 10.10.20.80 detail
show arp 10.10.10.25
ping 10.10.20.80 source 10.10.10.1
traceroute 10.10.20.80 source 10.10.10.1
```

| Line | Purpose |
|---|---|
| Route lookup | Displays the control-plane route |
| CEF lookup | Displays the Cisco forwarding-plane decision when supported |
| ARP lookup | Displays local IPv4-to-MAC state |
| Source ping | Tests with a defined source address |
| Source traceroute | Observes responding hops with that source; filtering can hide replies |

### Wrong IP, mask, or gateway

Two hosts with different masks can disagree about whether a destination is local. The gateway must be reachable on the client's local subnet. A duplicate IP creates unstable ARP mappings and intermittent sessions. An APIPA address is a symptom of failed normal configuration, not the root cause itself.

Endpoint sequence:

1. Inspect address, prefix/mask, gateway, and DNS.
2. Test loopback and local address.
3. Test and inspect ARP/ND for the gateway.
4. Test a permitted remote IP.
5. Resolve a hostname.
6. Test the application port and protocol.

If IP works but name does not, investigate DNS. If DNS works but HTTPS fails, follow TCP, TLS, and the application.

### DHCP pool exhaustion

New clients fail while existing leased clients continue working. Check pool utilization, leases, conflicts, rogue servers, and actual client count. A short-term change may expand the pool or adjust lease time, but the root cause may be guest growth, randomized MAC addresses, or poor capacity planning.

## 5.4 — Performance problems

| Metric | Meaning | User effect |
|---|---|---|
| Bandwidth | Nominal path capacity | Maximum possible rate |
| Throughput | Actual transferred data rate | Real transfer performance |
| Goodput | Useful application payload rate | Effective user data |
| Latency | Delivery delay | Slow interaction |
| Jitter | Variation in delay | Broken voice/video |
| Packet loss | Missing packets | Retransmission and quality loss |
| Congestion | Demand exceeds capacity | Queues and drops |
| Contention | Devices compete for shared media | Wireless slowdown |
| Bottleneck | Component limiting the path | Caps end-to-end throughput |

One speed test measures one server, path, protocol, and moment. Throughput below link rate is normal because of headers, acknowledgments, RTT, CPU, storage, encryption, and contention.

### Structured performance analysis

1. Convert "slow" into a metric and scope.
2. Compare current behavior to a time-relevant baseline.
3. Check link speed, duplex, errors, and utilization.
4. Measure latency and loss across several times and path points.
5. Inspect queues, drops, QoS, and WAN use.
6. Separate DNS, TCP connect, TLS, and server first-byte time.
7. Inspect endpoint and server CPU, memory, storage, and application dependencies.
8. Change capacity or policy only after evidence.

TCP retransmissions suggest loss or reordering. A zero window suggests a slow receiver. SYN retransmissions may point to route, firewall, or server state.

### Wireless performance

- Interference from Wi-Fi or non-Wi-Fi sources.
- Overlapping or overused channels.
- Low signal or poor SNR.
- Coverage gaps.
- Client disassociation and reason codes.
- Slow roaming or slow enterprise reauthentication.
- High retries, low data rates, or incapable clients.

Good RSSI alone is not enough. Also inspect SNR, channel utilization, retries, client capability, AP load, and wired backhaul. Adding APs without channel and power planning can make performance worse.

## 5.5 — Tools and commands

### Linux

```bash
ip address show
ip route show
ip neighbor show
ping -c 4 10.10.10.1
traceroute 192.0.2.80
dig A www.realsam.ir
ss -tupan
tcpdump -ni any 'host 192.0.2.80 and (port 53 or port 443)'
```

| Line | What to inspect |
|---|---|
| `ip address` | Interface state, MAC, address, and prefix |
| `ip route` | Connected, default, and learned routes |
| `ip neighbor` | ARP/ND entries and state |
| `ping` | Four ICMP samples to the gateway |
| `traceroute` | Responding hops; an asterisk does not always mean forwarding failure |
| `dig` | DNS status, answer, TTL, server, and time |
| `ss` | TCP/UDP sockets and processes when permitted |
| `tcpdump` | DNS/HTTPS packets for one host; `-n` avoids extra resolution |

`ifconfig` and `route` are older Linux tools; the `ip` suite is preferred. `nslookup` is simple and widely available; `dig` provides richer DNS details.

### Windows and PowerShell

```powershell
Get-NetIPConfiguration
Get-NetRoute -AddressFamily IPv4
arp -a
ping 10.10.10.1
tracert 192.0.2.80
Resolve-DnsName www.realsam.ir -Type A
Test-NetConnection www.realsam.ir -Port 443
netstat -ano
```

| Line | Purpose |
|---|---|
| 1 | Displays adapter IP, gateway, and DNS configuration |
| 2 | Displays IPv4 routes |
| 3 | Displays ARP cache |
| 4 | Tests ICMP to the gateway |
| 5 | Displays responding route hops |
| 6 | Queries the A record |
| 7 | Tests name resolution and TCP/443 |
| 8 | Displays sockets and process IDs |

### Authorized Nmap use

```bash
nmap -sT -Pn -p 22,53,80,443 192.0.2.80
```

- `-sT` uses a full TCP connection.
- `-Pn` skips initial host discovery and treats the host as up.
- `-p` limits the test to four ports.
- The destination is a documentation address.

Run scans only inside authorized scope. `open` means a connection was accepted, `closed` means the host actively rejected it, and `filtered` means filtering or missing responses prevent a firm result.

### Packet analyzer filters

```text
arp
dns
dhcp || dhcpv6
tcp.flags.syn == 1
tcp.analysis.retransmission
icmp || icmpv6
ip.addr == 192.0.2.80 && tcp.port == 443
```

Packet captures can contain credentials, cookies, names, and personal data. Obtain permission, minimize scope, protect storage, and delete according to policy.

### Physical tools and discovery protocols

| Tool | Purpose | Limitation/safety |
|---|---|---|
| Cable tester | Continuity and wire map; advanced models certify performance | Simple testers do not guarantee category speed |
| Toner/probe | Locate an unidentified copper cable | Follow device instructions on active circuits |
| TDR | Estimate copper fault distance | Requires correct NVP/calibration |
| OTDR | Locate fiber events and loss | Requires launch cable and interpretation skill |
| Optical power meter | Measure received optical power | Use the correct wavelength and thresholds |
| Visual fault locator | Show near fiber breaks with visible light | Never look into fiber |
| Network tap | Controlled traffic copy | Requires capacity and authorization |
| Wi-Fi analyzer | Channel, signal, and utilization | One location/client is not the whole WLAN |
| Speed tester | Throughput to one server | Depends on time, server, and path |

LLDP is multi-vendor; CDP is Cisco. They can reveal neighbor name, port, capabilities, VLAN, and management address, so limit them on untrusted edge ports when appropriate.

```cisco
show mac address-table
show ip route
show interfaces
show running-config
show arp
show vlan brief
show power inline
show lldp neighbors detail
show cdp neighbors detail
```

| Command | Question answered |
|---|---|
| MAC table | Which MAC is learned on which port and VLAN? |
| Route | Which next hop/interface is selected? |
| Interfaces | What are link, speed, duplex, MTU, and counters? |
| Running config | What is the live configuration? Protect secrets in output |
| ARP | Which MAC maps to a local IPv4 address? |
| VLAN | Which VLANs and access members exist? |
| Power | Which PD receives power and what budget remains? |
| LLDP/CDP | Which device and remote port are connected? |

## Runbook: website does not open

1. Record exact URL, message, and time.
2. Determine whether the scope is one user, device, network, or everyone.
3. Inspect endpoint IP configuration and default route.
4. Test the gateway and an approved remote IP.
5. Query A/AAAA and identify the resolver.
6. Test TCP/443.
7. Use `curl -v` to separate DNS, TCP, TLS, and HTTP.
8. Verify certificate chain, name, and time.
9. Check proxy, VPN, firewall, ACL, NAT, and return route.
10. Check load balancer/backend health and application logs.
11. Make a low-risk authorized correction with rollback.
12. Verify from the user perspective and monitoring, then document.

| Error | Likely layer/area |
|---|---|
| NXDOMAIN | Name or zone data |
| DNS timeout | Resolver, route, firewall, or authoritative reachability |
| TCP timeout | Route, ACL, server, or return path |
| Connection refused | Host reached but service is not listening/accepting |
| TLS name/expiry error | Certificate, time, URL, or SNI |
| HTTP 401/403 | Authentication or authorization |
| HTTP 502/503 | Proxy, backend, or capacity |

## End-of-chapter exercises

1. Turn five vague user complaints into questions that establish scope.
2. Create a duplex mismatch in a lab and record error rates before and after correction.
3. Diagnose a missing allowed VLAN without looking directly at the intended answer.
4. Make a DHCP scope too small and document exhaustion symptoms.
5. Mark DORA, DNS, TCP, TLS, and HTTP phases in an authorized capture.
6. Create a wireless baseline in three locations at two different times.
7. Extend the website runbook with your own escalation and rollback rules.
