# Expected Evidence — Ethernet and ARP

1. Host A calculates `192.0.2.1` as local under `/24`.
2. With no neighbor entry, it broadcasts an ARP request to `ff:ff:ff:ff:ff:ff` asking for `192.0.2.1`.
3. The gateway unicasts an ARP reply to Host A.
4. The ICMP echo request to the gateway uses gateway MAC and gateway IP.
5. For remote `198.51.100.20`, Host A still uses the gateway MAC while the IP destination remains the remote host.
6. The router removes the incoming Ethernet frame, decrements IPv4 TTL, selects a route, resolves its next hop, and builds a new frame.

The capture contains a synthetic ARP request/reply followed by ICMP echo request/reply. A valid explanation distinguishes local next-hop resolution from the end-to-end IP destination.

