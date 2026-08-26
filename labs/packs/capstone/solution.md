# Capstone Solution

## Root causes

1. The branch has no route for headquarters or default path. Local routes explain why printers work.
2. The broad guest permit at sequence 20 matches before the internal deny, so the deny is unreachable for that traffic.
3. `352 W + 30 W = 382 W`, exceeding the 370 W PoE budget; power denial explains feature/device instability.

## Corrections

- Add the approved specific headquarters route or approved default route with verified return routing. Rollback removes/restores it.
- Place explicit internal deny before the approved Internet permit while retaining DHCP/DNS requirements. Save the original ACL and verify counters.
- Move powered load to an approved switch/injector/circuit or expand capacity. Do not force delivery beyond the platform budget.

## Verification

Validate route lookup/traceroute and return path; DNS query and TLS/application; guest permit and internal-deny counters; PoE allocation/no new denial logs; call quality/queue metrics; and stable monitoring. Record exact timestamps and configuration references.

## Executive example

Branch users lost headquarters access because a WAN route was missing, guests bypassed isolation because one firewall rule was ordered incorrectly, and the new access point exceeded available switch power. The approved route, access-policy order, and power allocation were corrected with tested rollback plans. Application access, guest isolation, and voice service now pass end-to-end checks and monitoring remains stable.
