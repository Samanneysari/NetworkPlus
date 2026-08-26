# N10-009 PBQ Solutions

Equivalent safe solutions can earn credit. The evidence and final validation matter as much as the correction.

## PBQ 01

- A-14: static access VLAN 10, no PoE requirement.
- A-15: access/data VLAN 10 plus voice VLAN 20, PoE enabled/automatic within policy.
- A-16: access VLAN 30, PoE; restrict AP management so guest VLAN cannot administer infrastructure.
- Verify VLAN membership, voice VLAN, PoE negotiation/budget, MAC learning, correct DHCP address/gateway, and permitted/denied reachability.

## PBQ 02

| Need | Prefix/mask | Network | Normal host range | Broadcast |
|---|---|---|---|---|
| 100 | `/25`, `255.255.255.128` | `10.50.0.0` | `.1–.126` | `.127` |
| 50 | `/26`, `255.255.255.192` | `10.50.0.128` | `.129–.190` | `.191` |
| 20 | `/27`, `255.255.255.224` | `10.50.0.192` | `.193–.222` | `.223` |
| 2-point link | `/31`, `255.255.255.254` | `10.50.0.224` | `.224–.225` endpoints | No traditional broadcast |

Unused space begins at `10.50.0.226`; allocation is largest first and non-overlapping.

## PBQ 03

- `10.10.5.5` → connected `/16`.
- `10.10.20.30` → static `/24` via `192.0.2.2`.
- `10.10.20.200` → OSPF `/25` via `192.0.2.6`.
- `203.0.113.9` → default via `198.51.100.1`.

Longest-prefix match is evaluated before route-source preference for different prefixes.

## PBQ 04

VLAN 20 is missing from SW2's allowed list, and native VLANs mismatch. Configure both intended trunk ends with native 999 and allowed `10,20,30,999`. Verify trunk state/allowance and VLAN/STP state; then test same-VLAN traffic across the trunk and confirm untagged/native management behavior only in the intended isolated VLAN.

## PBQ 05

Use a survey-approved non-overlapping plan such as 1/6/11 at 20 MHz where regulation permits; reduce/coordinate power so cells overlap appropriately instead of maximizing every AP. Re-measure RSSI, SNR/noise, channel utilization/retry rate, throughput to a local wired server, and roaming interruption.

## PBQ 06

Place the relay/IP helper on the VLAN 10 gateway interface and target `10.10.20.10`. Verify routes both ways and ACL/firewall permission for the relayed DHCP exchange. Capture Discover at the client VLAN, relayed server traffic, Offer/Request/ACK, then verify address, `/24` mask, gateway, DNS, lease/server ID, and application reachability.

## PBQ 07

DNS succeeded, routed TCP 443 succeeded, and TLS identity validation failed. Correct the certificate/SAN to include `app.lab.example`, or intentionally redirect/use the hostname already covered while preserving application design. Verify with `dig`, `openssl s_client -connect 192.0.2.80:443 -servername app.lab.example`, and `curl -v https://app.lab.example/`.

## PBQ 08

Example: warning >2% and critical >5% loss for five minutes to two stable targets, compared with time-of-day baseline. Evidence includes local gateway, edge interface errors/discards, latency, traceroute, and a second source. Network operations owns it; escalate to provider after clean local-path evidence. Recover only below 1% for ten minutes plus application success. Suppress approved maintenance and require multiple failed samples/targets.

## PBQ 09

Nightly backup can lose 24 hours and fails RPO 10 minutes. Four-hour hardware delivery fails RTO 60 minutes. DNS TTL may delay cutover far beyond RTO. No restore test means neither objective is proven. Implement ≤10-minute protected replication/backup, ready capacity, lower planned DNS/failover mechanism, documented identity/network/dependency recovery, and timed restore/failover/failback tests with user-path validation.

## PBQ 10

Default deny. Permit users→application TCP 443; application→approved DNS UDP/TCP 53 and NTP UDP 123; guests→approved DHCP/DNS and Internet while explicitly denying internal prefixes; management VLAN→device SSH TCP 22. Log administrative permits, important segmentation denies, and final deny with rate controls. DNS uses UDP normally but TCP for truncated/large responses and operations such as transfer.

## PBQ 11

1. Tone generator/probe → identified far-end jack/port.
2. TDR → estimated distance to impedance fault.
3. Optical source+power meter → measured end-to-end loss/power.
4. Spectrum analyzer → non-Wi-Fi energy by frequency/time.
5. Protocol analyzer → SYN/retransmission/timing evidence.
6. Flow analyzer → endpoints, ports, bytes, and time without payload.

## PBQ 12

- Headquarters failure: missing default/specific route. Add the approved route with a rollback that removes it/restores prior config; verify route lookup, traceroute, return path, and headquarters application.
- Guest exposure: broad permit precedes deny. Reorder to deny internal destinations before approved Internet permit, preserving DHCP/DNS; rollback to saved ACL; verify deny/permit counters.
- Voice: 365 W allocated plus 30 W exceeds 370 W. Move load to approved capacity or increase PoE budget; rollback device move/config; verify no power-deny events, full AP/phone function, queue/call quality.

Executive example: “The branch outage was caused by a missing WAN route, guest exposure by an incorrectly ordered access rule, and voice instability by exhausted PoE capacity. We restored the approved route, corrected segmentation policy, and moved powered load within budget using documented rollback plans. Headquarters applications, guest isolation, and sustained voice calls now pass, and monitoring shows stable routing, policy counters, and power.”
