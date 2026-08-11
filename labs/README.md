# Network+ N10-009 Hands-On Labs

These 26 labs progress from fundamentals to a capstone incident. Suggested tools: two Linux VMs, an optional Windows VM, Wireshark, and Packet Tracer, GNS3, EVE-NG, or CML.

Only scan, capture, or disrupt systems you own or have explicit permission to test.

## Report template for every lab

1. Objective and official code.
2. Topology, IP plan, and tool versions.
3. Prediction and baseline.
4. Commands and important output.
5. Expected versus actual result.
6. One controlled fault, diagnosis, and correction.
7. Rollback and lessons learned.

Use only RFC 1918, `2001:db8::/32`, and the IPv4 documentation ranges for public examples.

## Lab 01 — Encapsulation and OSI

**Objectives:** 1.1 and 1.2.

1. Start Wireshark on the lab interface.
2. Open an authorized HTTPS site or local `www.realsam.ir` lab service.
3. Filter `dns`, `tcp.flags.syn == 1`, and `tls` separately.
4. Record MAC addresses, IP addresses, ports, and protocols for five packets.
5. Explain which addresses change at a router and which remain end to end.

**Fault:** Point the VM at a nonexistent DNS resolver and distinguish DNS failure from TLS failure.

## Lab 02 — TCP, UDP, and TLS

**Objectives:** 1.1 and 1.4.

```bash
sudo tcpdump -ni any -w nplus-tls.pcap 'host 192.0.2.80 and (port 53 or port 443)'
curl -v --resolve www.realsam.ir:443:192.0.2.80 https://www.realsam.ir/
openssl s_client -connect 192.0.2.80:443 -servername www.realsam.ir -brief
```

| Line | Purpose |
|---|---|
| 1 | Writes only DNS/HTTPS traffic for the lab host to a capture file |
| 2 | Overrides DNS only for this curl request and displays TCP/TLS/HTTP progress |
| 3 | Performs TLS with the correct SNI and summarizes version, cipher, and certificate |

**Fault:** Remove SNI in the isolated lab and compare the certificate or virtual-host response. Never submit private keys, credentials, or session cookies.

## Lab 03 — IPv4 and subnetting

**Objective:** 1.7.

Divide `10.20.0.0/16` using VLSM for 400, 120, 50, and 2 hosts.

1. Sort requirements largest to smallest.
2. Record prefix, mask, network, broadcast, and host range.
3. Check for overlap and document unused space.
4. Configure two VM interfaces in one subnet and inspect local routes.

**Fault:** Give one host an incorrect mask and explain why only some destinations fail.

## Lab 04 — IPv6, SLAAC, and Neighbor Discovery

**Objectives:** 1.8 and 3.4.

```bash
ip -6 address show
ip -6 route show
ip -6 neighbor show
ping -6 -c 4 fe80::1%eth0
```

| Line | Purpose |
|---|---|
| 1 | Displays IPv6 addresses, scope, and lifetimes |
| 2 | Displays IPv6 prefixes and default route |
| 3 | Displays Neighbor Discovery state |
| 4 | Tests a link-local destination with an interface zone; change `eth0` as needed |

**Fault:** Stop Router Advertisements in the isolated network and observe the effect on addressing and default route.

## Lab 05 — Ports and socket flows

**Objectives:** 1.4 and 5.5.

```bash
ss -lntup
ss -tn state established
curl -I https://www.realsam.ir
ss -tnp '( dport = :443 or sport = :443 )'
```

The commands show listening services, established TCP connections, HTTP headers, and port 443 sockets. Process information may require privileges.

**Fault:** Stop an authorized lab service and compare `connection refused` with a firewall timeout.

## Lab 06 — Cable, speed, duplex, and MTU

**Objectives:** 1.5, 2.2, and 5.2.

1. Record cable map and category.
2. Capture speed, duplex, and error-counter baseline on both ends.
3. Run controlled traffic and calculate counter deltas.
4. Create a duplex mismatch in a simulator.
5. Use a don't-fragment test where supported to estimate path MTU.

**Safety:** Never look into fiber. Record before/after counters and the reason for each change.

## Lab 07 — VLANs, access ports, and trunks

**Objectives:** 2.2 and 5.3.

1. Create VLANs 10, 20, and 99.
2. Configure static access ports.
3. Build a trunk with unused native VLAN 999 and a restricted allowed list.
4. Verify with `show vlan brief` and `show interfaces trunk`.
5. Prove same-VLAN connectivity and inter-VLAN separation.

**Fault:** Remove VLAN 20 from one end's allowed list and collect evidence before correcting it.

## Lab 08 — Inter-VLAN routing and ACLs

**Objectives:** 2.1 and 4.3.

1. Build SVIs using [Chapter 3](../docs/03-network-implementation.md).
2. Record reachability before the ACL.
3. Apply the HTTPS/DNS policy from [Chapter 5](../docs/05-network-security.md).
4. Verify rule counters and TCP/443.
5. Record one permitted and one denied connection.

**Fault:** Apply the ACL in the wrong direction and use zero or unexpected counters to identify the mistake.

## Lab 09 — STP and root bridge

**Objective:** 2.2.

1. Build a triangle of three switches.
2. Record root, port roles/states, and path costs.
3. Set intentional primary and secondary roots.
4. Disconnect one link and measure convergence.
5. Test PortFast plus BPDU Guard only on an edge port.

**Fault:** Connect a lab switch to the protected edge, examine err-disable evidence, remove the cause, then recover safely.

## Lab 10 — LACP

**Objective:** 2.2.

1. Make two member links consistent.
2. Configure LACP active mode and an 802.1Q trunk on the port-channel.
3. Verify protocol, members, and logical state.
4. Remove one member and confirm traffic continues.

**Fault:** Make one member's VLAN or speed configuration inconsistent and explain the suspended state.

## Lab 11 — Static, default, and floating routes

**Objectives:** 2.1 and 5.3.

1. Build three routers with two possible paths.
2. Record connected routes.
3. Add a network route, default route, and higher-AD floating route.
4. Record destination lookup and traceroute.
5. Fail the primary link and measure failover/failback.

**Fault:** Remove the return route and prove that forward reachability alone is insufficient.

## Lab 12 — OSPF and route selection

**Objective:** 2.1.

1. Build a small single-area OSPF topology.
2. Document router IDs and advertised networks.
3. Verify neighbors, LSDB, and installed routes.
4. Change one link cost and compare the selected path.
5. Add a controlled static route to demonstrate AD and longest prefix.

**Fault:** Mismatch area or timers on one link and diagnose the missing adjacency.

## Lab 13 — NAT/PAT

**Objective:** 2.1.

1. Connect a private LAN to an isolated outside network.
2. Configure inside/outside roles and the translation ACL.
3. Generate connections from two clients.
4. Compare private source ports to translated public mappings.
5. Observe translation timeout and authorized clearing.

**Fault:** Reverse inside and outside roles and diagnose from NAT statistics.

## Lab 14 — Wireless survey and design

**Objectives:** 2.3 and 5.4.

1. Record floor plan, wall types, AP positions, band, and time.
2. Measure RSSI, noise/SNR, channel, width, and utilization in three locations.
3. Test to a local wired server to avoid confusing Internet performance.
4. Mark coverage gaps and overlap.
5. Recommend channel, power, or placement changes with evidence.

Anonymize neighboring SSIDs and MAC addresses in public reports.

## Lab 15 — WPA2/WPA3 and guest access

**Objectives:** 2.3 and 4.3.

1. Create corporate and guest SSIDs in a lab.
2. Map guest to a separate VLAN with Internet-only policy and client isolation.
3. Use WPA2/WPA3 appropriate to the lab and a strong test secret.
4. Prove guests cannot reach management or servers.
5. Test roaming and captive-portal behavior separately from encryption.

**Fault:** Map the guest SSID to the wrong VLAN and diagnose through IP, route, and ACL evidence.

## Lab 16 — DHCP DORA and relay

**Objective:** 3.4.

1. Place the server in VLAN 20 and client in VLAN 10.
2. Create a scope, exclusions, gateway, DNS options, and lease.
3. Configure a relay on the client gateway.
4. Capture DORA and identify UDP 67/68.
5. Add a reservation and verify renewal.

**Fault:** Remove the helper or exhaust the pool and compare symptoms.

## Lab 17 — Forward, recursive, and reverse DNS

**Objective:** 3.4.

1. In an isolated lab, create `lab.realsam.ir` with A, AAAA, CNAME, MX, TXT, NS, and SOA records.
2. Increment the serial and validate zone syntax.
3. Query the authoritative server directly and through a recursive resolver.
4. Create a reverse zone and PTR.
5. Verify forward-confirmed reverse DNS.

**Fault:** Remove a final FQDN dot or fail to increment the serial and explain the result. Do not modify public DNS without authority.

## Lab 18 — DNSSEC, DoH, and DoT observation

**Objective:** 3.4.

```bash
dig org DNSKEY +dnssec
dig org SOA +dnssec
dig +tcp A www.realsam.ir
```

The first two commands request DNSSEC-related data; the third forces TCP DNS. An AD flag matters only when the resolver actually validates. Observe approved DoH/DoT in a lab capture and explain what metadata remains visible.

## Lab 19 — NTP, logs, and timelines

**Objectives:** 3.2 and 3.4.

1. Point two hosts to an approved lab time source.
2. Record source, offset, delay, and synchronization state.
3. Generate an SSH or firewall event.
4. Correlate both hosts' logs with explicit UTC/time-zone notation.
5. In an isolated VM, change time slightly and observe TLS/log effects, then roll back.

## Lab 20 — SNMPv3, syslog, and baseline

**Objective:** 3.2.

1. Create a least-privilege SNMPv3 account with authentication and privacy.
2. Poll interface counters.
3. Generate a link event and observe trap and syslog.
4. Define five baseline metrics and initial thresholds.
5. Write an owner and runbook for each alert.

Do not place communities or credentials in the report.

## Lab 21 — Backup, change, and restore

**Objectives:** 3.1 and 3.3.

1. Back up running configuration with time and hash.
2. Write a change for adding VLAN 40, including impact and approval.
3. Execute prechecks, change, and postchecks.
4. Perform the rollback in the lab.
5. Explain running, backup, and golden configuration.

Success means service and security behavior are restored, not merely that syntax loads.

## Lab 22 — SSH keys and jump host

**Objectives:** 3.5 and 4.1.

1. Build client → jump host → server.
2. Create an Ed25519 key protected by a passphrase.
3. Verify host-key fingerprints through the lab's trusted channel.
4. After proving key access and recovery, disable direct password access to the server.
5. Permit the server only from the jump host and centralize login logs.

**Fault:** Create a controlled host-key mismatch. Verify the cause instead of deleting the warning blindly.

## Lab 23 — ACLs, segmentation, and NAC design

**Objectives:** 4.1 and 4.3.

1. Create user, server, guest, and IoT zones.
2. Write a source-destination-service matrix.
3. Apply default deny and explicit required permits.
4. Give guest only DHCP, DNS, and Internet; give IoT only controller and time access.
5. Record one permit and one deny counter/log.
6. Design a quarantine VLAN for a noncompliant endpoint.

**Fault:** Omit TCP DNS or a return rule and identify the problem in a capture.

## Lab 24 — DHCP Snooping, DAI, and port security

**Objectives:** 4.2 and 4.3.

1. Build a valid DHCP binding baseline.
2. Trust only the legitimate server/relay uplink.
3. Enable DAI and appropriate rate limits.
4. Connect a simulated rogue DHCP server to an edge port and record the drop/log.
5. Test port security with a known MAC and suitable violation mode.

Prepare console access and a rollback before applying the controls.

## Lab 25 — Packet capture and web timing

**Objectives:** 5.1, 5.4, and 5.5.

```bash
curl -sS -o /dev/null -w 'dns=%{time_namelookup} tcp=%{time_connect} tls=%{time_appconnect} first_byte=%{time_starttransfer} total=%{time_total}\n' https://www.realsam.ir/
```

`-sS` hides normal progress but retains errors, `-o /dev/null` discards the body, and `-w` prints DNS, TCP, TLS, first-byte, and total timing.

**Fault:** In lab services, create a slow resolver, blocked port, and invalid certificate separately. Record the signature of each failure.

## Lab 26 — Final performance-based scenario

**Objectives:** All domains.

A branch cannot reach `app.realsam.ir`; guests occasionally reach servers; Wi-Fi calls disconnect.

**Topology:** two switches, router/firewall, DHCP/DNS/NTP, two APs, user/voice/guest/server VLANs, and an emulated WAN.

Choose hidden faults from: native-VLAN mismatch, missing allowed VLAN, wrong default route, exhausted DHCP pool, inconsistent PTR, bad time, misordered ACL, insufficient PoE budget, overlapping channels, and duplex mismatch.

1. Record ticket and scope without reading the answer.
2. Gather only evidence relevant to a theory.
3. Propose and run a low-risk test.
4. Write change, rollback, correction, and end-to-end validation.
5. Deliver a one-paragraph executive summary and a technical timeline.

## Lab grading rubric

| Criterion | Points |
|---|---:|
| Correct design and IP plan | 20 |
| Evidence and interpretation | 20 |
| Explanation of commands, packets, and counters | 20 |
| Controlled failure and scientific diagnosis | 20 |
| Security, rollback, and documentation | 20 |

A good answer states assumptions and trade-offs. Many design scenarios have more than one valid solution.
