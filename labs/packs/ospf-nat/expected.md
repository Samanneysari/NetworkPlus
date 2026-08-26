# Expected Evidence — OSPF and PAT

- R1/R2 show a full adjacency on `192.0.2.0/30`.
- R1 installs a default route learned from OSPF after R2 has a usable default.
- R2 has a route back to `10.30.0.0/24`.
- Traffic from two LAN clients creates distinct PAT transport mappings using `198.51.100.1`.
- Removing the return route breaks replies even if forward translation exists.

Useful evidence: `show ip ospf neighbor`, `show ip route`, `show ip protocols`, `show ip nat translations`, `show ip nat statistics`, interface counters, ping/traceroute, and a packet capture on inside/outside links.

