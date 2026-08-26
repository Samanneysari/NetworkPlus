# Expected Evidence — Services

- Client Discover is broadcast in VLAN 10; the relay forwards it to `10.40.20.10` with gateway information.
- Offer/Request/Acknowledge provide an address in `.100–.199`, gateway `.1`, DNS `10.40.20.10`, and domain `lab.example`.
- The reserved client receives `.50` when its identifier matches.
- A/AAAA/CNAME/MX/TXT/NS/SOA/PTR queries return the configured values.
- `dig -x 10.40.20.80` returns `app.lab.example`, and forward lookup returns `10.40.20.80`.
- Time evidence identifies source, offset, delay, synchronization state, and time zone.

Successful ping to the DNS server does not prove DNS answers. Successful DNS does not prove TLS/application health. Verify each service separately.
