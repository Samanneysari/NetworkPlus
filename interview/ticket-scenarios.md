# Interview Ticket Scenarios

For each ticket, speak through scope, questions, evidence, likely layers, safe tests, escalation, and verification. Do not invent a root cause before evidence.

1. **One user has no network; neighbors work.** Check link, interface state, address/gateway/DNS, access VLAN, MAC learning, and recent desk/patch changes.
2. **One floor receives APIPA addresses.** Compare affected VLAN/relay path, DHCP scope availability, trusted DHCP source, ACL, and server health.
3. **IP access works but all names fail.** Query configured resolver, compare another name, test UDP/TCP 53, inspect DHCP DNS option and resolver logs.
4. **Only one application hostname fails.** Compare DNS record, TCP port, TLS certificate/SNI, proxy/firewall, and server health without declaring an Internet outage.
5. **VLAN works on one switch only.** Verify VLAN existence, access assignment, trunk allowance/native consistency, STP state, and MAC learning.
6. **Calls break every morning.** Correlate utilization, queue drops, jitter/loss, Wi-Fi airtime/retries, PoE events, WAN metrics, and scheduled jobs.
7. **Remote site unreachable after change.** Confirm change scope, route/default/return path, tunnel status, ACL/NAT, rollback trigger, and alternate management.
8. **Guest reaches internal server.** Preserve evidence, review rule order/state and VLAN mapping, contain exposure under approval, verify guest DHCP/DNS/Internet and internal deny.
9. **New AP will not power.** Inspect total/per-port PoE budget, requested class, cable/pairs, port state, and platform support before replacing the AP.
10. **Monitoring says WAN down but users work.** Validate probe target/source, maintenance, DNS dependency, multiple paths/targets, thresholds, and false-positive logic.

## Ticket-note template

```text
Impact/scope:
First observed and recent change:
Affected/unaffected:
Baseline and evidence:
Theory and test:
Result:
Change/approval/rollback:
End-to-end verification:
Monitoring period:
Root cause and prevention:
```

