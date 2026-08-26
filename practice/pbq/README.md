# N10-009 Performance-Based Practice Set

These 12 original tasks practice configuration selection, ordering, mapping, evidence interpretation, and troubleshooting at Network+ depth. Use a 10-minute limit per task. Write the final state and verification—not only the suspected cause. Check [solutions](solutions.md) afterward.

## PBQ 01 — Cable and switchport map

Three desks must connect to access switch SW1:

| Desk | Device | Required VLAN | Power |
|---|---|---:|---|
| A-14 | PC | 10 | None |
| A-15 | Phone + PC | Voice 20, data 10 | PoE |
| A-16 | Guest AP | 30 | PoE |

Assign access/voice VLAN behavior, identify which ports need PoE, and list four verification items. The AP must not manage the switch.

## PBQ 02 — VLSM plan

Divide `10.50.0.0/24` for 100 users, 50 voice devices, 20 servers, and a two-router point-to-point link. Use the largest-first method. Record prefix, mask, network, normal host range, and broadcast (where applicable), with no overlap.

## PBQ 03 — Route-table selection

For each destination, choose the route and next hop:

```text
C 10.10.0.0/16 directly connected
S 10.10.20.0/24 via 192.0.2.2
O 10.10.20.128/25 via 192.0.2.6
S* 0.0.0.0/0 via 198.51.100.1
```

Destinations: `10.10.5.5`, `10.10.20.30`, `10.10.20.200`, `203.0.113.9`. State the selection rule.

## PBQ 04 — Trunk failure

```text
SW1 trunk: native 999, allowed 10,20,30,999
SW2 trunk: native 1,   allowed 10,30,999
```

Users in VLAN 20 fail across the link and untagged management frames appear in different VLANs. Identify both faults, write the desired consistent state, and list two switch commands plus two traffic tests.

## PBQ 05 — Wireless channel plan

Three adjacent 2.4 GHz AP cells use 20 MHz channels 1, 2, and 3. All have maximum power. Clients show strong RSSI, low SNR, high retries, and poor roaming. Propose a Network+-level correction and four measurements for the post-change survey.

## PBQ 06 — DHCP relay

Client VLAN 10 is `10.10.10.0/24`, server VLAN 20 is `10.10.20.0/24`, and DHCP server is `10.10.20.10`. Local server-VLAN clients work; VLAN 10 clients repeatedly send Discover. Specify relay placement, required route/ACL considerations, DORA evidence, and final endpoint checks.

## PBQ 07 — DNS and TLS

`dig app.lab.example A` returns `192.0.2.80`. TCP 443 connects. TLS reports that the certificate is valid for `www.lab.example` only. Determine which layer/service succeeded, which failed, two valid corrections, and commands for verification.

## PBQ 08 — Monitoring alert

Create a useful alert definition for WAN packet loss. Include metric, target, warning/critical threshold, duration, baseline context, evidence sources, owner, escalation, recovery condition, and one false-positive control.

## PBQ 09 — Recovery objectives

An order system has RPO 10 minutes and RTO 60 minutes. Current state: nightly backup, replacement hardware ships in four hours, DNS TTL 24 hours, and no restore test. Identify every objective conflict and produce a five-item improvement/test plan.

## PBQ 10 — Segmentation and ACL

Write a source-destination-service matrix for:

- Users → application server: HTTPS only.
- Application server → DNS and NTP: only approved infrastructure servers.
- Guests → DHCP, DNS, Internet; no internal networks.
- Administrators → network-device SSH from management VLAN only.
- All unspecified traffic: denied.

State where logging is most useful and why DNS may need both UDP and TCP 53.

## PBQ 11 — Tool selection

Match each problem to the best tool and one expected evidence item:

1. Unknown wall jack endpoint.
2. Suspected copper break 38 m away.
3. Fiber loss across a complete link.
4. Non-Wi-Fi interference.
5. TCP handshake retransmissions.
6. Conversation-volume summary without payload.

Tools: TDR, tone generator/probe, optical power meter+source, spectrum analyzer, protocol analyzer, flow analyzer.

## PBQ 12 — Capstone incident

A branch has three symptoms:

- Wired data works locally but not to headquarters.
- Guest Wi-Fi can reach an internal server.
- Voice calls break when all APs are active.

Evidence:

```text
Branch route table: connected LANs only; no default route
Guest ACL: permit ip any any appears before internal deny
PoE budget: 370 W; allocated: 365 W; new AP request: 30 W
```

For each symptom, identify cause, safest correction, rollback, and end-to-end verification. Then write a three-sentence executive summary without unnecessary jargon.

