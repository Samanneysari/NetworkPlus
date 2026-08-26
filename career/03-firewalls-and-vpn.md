# Firewalls and VPN Operations

## Network+ boundary

Understand packet direction, ordered policy, state, NAT, tunnel type, logs, and validation. Advanced vendor policy, cryptographic design, dynamic-routing-over-VPN design, and large rule-base optimization are outside scope.

## Firewall decision model

For one flow, write the five-tuple and direction:

```text
Source IP: 10.70.10.25
Destination IP: 10.70.20.80
Protocol: TCP
Source port: ephemeral
Destination port: 443
Direction: users -> servers
```

Then inspect zone/interface, route, NAT stage, ordered rule match, connection state, and return path. A stateful permit recognizes expected return traffic; a stateless ACL may require explicit reverse-direction rules.

## Safe rule change

1. State business requirement and exact source/destination/service.
2. Search for an existing matching/overlapping rule.
3. Record hit counters/log baseline and configuration backup.
4. Add the narrow permit above the final deny with owner/expiry when appropriate.
5. Test one permit and one deny; inspect state/log counters.
6. Roll back if scope exceeds the requirement or an unrelated service changes.

Avoid `any any` permits, unbounded logging, and rules justified only by “make it work.”

## VPN comparison

| Type | Use | Common evidence |
|---|---|---|
| Site-to-site | Connect routed networks | Tunnel status, selectors/routes, encryption counters, return route |
| Client-to-site | Connect one managed client | Address pool, pushed routes/DNS, identity, client logs |
| Full tunnel | Send all client traffic through VPN | Default route through tunnel, central policy, added latency |
| Split tunnel | Send selected routes through VPN | Route list, DNS behavior, direct Internet path |
| Clientless | Browser-based access to selected applications | Portal identity, application publishing, TLS |

## Lab scenario

The tunnel reports “up,” but one subnet cannot communicate. Check local/remote selectors, routes both ways, firewall rules, NAT exemption/order, overlapping prefixes, and packet counters. Tunnel establishment alone does not prove application reachability.

