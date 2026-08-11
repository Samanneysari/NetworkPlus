# Chapter 4 — Network Operations

Building a network is only the beginning. It must be documented, monitored, changed safely, backed up, and recoverable. This chapter covers Domain 3 and teaches DHCP, DNS, reverse DNS, and network time from the beginning.

## 3.1 — Documentation and life-cycle management

### Physical and logical documents

| Document | Question it answers | Example contents |
|---|---|---|
| Physical diagram | What is connected where and with what? | Rooms, racks, ports, cables, and panels |
| Logical diagram | How does traffic move logically? | VLANs, subnets, routes, zones, and VPNs |
| Rack diagram | Where is each device mounted? | Rack units, power feeds, weight, and airflow |
| Cable map | Where are both ends of a cable? | ID, port, media, length, and test result |
| Layer 1 diagram | What media and physical links exist? | Copper, fiber, speed, MDF, and IDF |
| Layer 2 diagram | Where are broadcast domains and loops controlled? | VLANs, trunks, STP, and LAGs |
| Layer 3 diagram | How are prefixes routed? | IPs, SVIs, routers, WANs, and next hops |

A diagram without date, owner, version, and source of truth becomes unreliable quickly.

### Inventory, IPAM, SLA, and wireless surveys

Inventory should include asset ID, model, serial, location, owner, IP/MAC, OS/firmware, license, contract, warranty, and end-of-support dates. IP Address Management tracks prefixes, subnets, assignments, reservations, DNS names, and owners.

An SLA defines measurable service commitments such as availability and response time. It is not identical to an internal SLO or KPI. A wireless survey records signal, noise, SNR, channel use, capacity, and coverage; a heatmap must state the band, time, client, and metric.

### EOL, EOS, software management, and decommissioning

- **EOL:** vendor-defined end of a product's sales/life cycle.
- **EOS:** end of support or security updates; exact vendor dates matter.
- **Software management:** compatibility, licensing, release notes, signature/hash validation, testing, maintenance window, and rollback.
- **Decommissioning:** remove the asset from monitoring, DNS, IPAM, AAA, and diagrams; revoke credentials/certificates; erase data securely; and record disposal.

### Change management

1. Record purpose, business reason, scope, and owner.
2. Identify affected devices, interfaces, users, and services.
3. Assess risk and dependencies.
4. Write commands, order, prechecks, and success criteria.
5. Create and test backup and rollback procedures.
6. Obtain peer review, approval, and a maintenance window.
7. Notify stakeholders.
8. Run prechecks, make small controlled changes, and record time.
9. Run technical postchecks and user-facing validation.
10. Update the ticket, configuration source, CMDB, and diagrams.

Production configuration is live state. Backup configuration is a restorable copy. A baseline or golden configuration is the approved reference state. A backup that has never been restored is not proven.

## 3.2 — Monitoring

### SNMP

An SNMP manager polls agents. A Management Information Base defines object identifiers and their meaning. Polling starts at the manager; a trap or inform starts at the agent.

| Version | Security |
|---|---|
| SNMPv2c | Community string; no strong built-in confidentiality |
| SNMPv3 | Authentication and optional privacy/encryption; preferred |

Limit SNMP to the management network/VRF and permitted managers. Traps can be lost, and a failed device cannot report its own total outage, so use polling and traps together.

### Flow, packet capture, logs, and SIEM

- **Flow data:** conversation summary including endpoints, ports, bytes, and time.
- **Packet capture:** detailed headers and sometimes payload; powerful, sensitive, and storage-intensive.
- **Baseline:** normal behavior for a defined time, day, season, and workload.
- **Anomaly alert:** behavior outside the baseline; requires tuning.
- **Syslog:** standardized event severity from 0 Emergency to 7 Debug.
- **SIEM:** central collection, normalization, correlation, search, and alerting; it does not replace analysts or response procedures.
- **API integration:** automated data/action using TLS, scoped tokens, rate limits, and audit logging.
- **Port mirroring/SPAN:** copies traffic to a sensor; an oversubscribed mirror destination can drop packets.

Monitor traffic, performance, availability, and configuration. Useful interface metrics include status, utilization, errors, discards, latency, loss, and jitter. Device metrics include CPU, memory, temperature, power, and uptime. Service metrics include DNS response, DHCP pool use, TLS expiry, HTTP status, and response time.

Every alert needs an owner, severity, runbook, and escalation path.

## 3.3 — Disaster recovery

| Metric | Question |
|---|---|
| RPO | How much recent data can be lost? |
| RTO | How long can the service remain unavailable? |
| MTTR | How long does repair or recovery take on average? |
| MTBF | How much time passes between failures on average? |

An RPO of five minutes is not satisfied by a daily backup. An RTO of one hour requires that runbooks, access, replacement capacity, and restoration all work inside the hour.

| Site type | Readiness | Relative cost and recovery time |
|---|---|---|
| Cold | Facility/basic utilities; systems and data need preparation | Lower cost, longer RTO |
| Warm | Some systems and data ready | Medium |
| Hot | Close to production and continuously maintained | Higher cost, shorter RTO |

Active-active sites serve traffic simultaneously but create state and consistency complexity. Active-passive keeps a standby site for failover. A tabletop exercise tests reasoning and roles; a practical restore/failover test validates technology and timing.

## 3.4 — DHCP, SLAAC, DNS, and time

### DHCPv4

DHCP provides addresses, masks, gateways, DNS servers, and other options under a lease. The common DORA sequence is:

1. **Discover:** a client broadcasts to find servers.
2. **Offer:** a server proposes an address and options.
3. **Request:** the client requests the selected offer.
4. **Acknowledgment:** the server confirms the lease.

Broadcasts do not cross routers. A DHCP relay receives the client broadcast and sends it to a remote server, including information that identifies the source subnet.

| Term | Meaning |
|---|---|
| Scope/pool | Address range and options for a subnet |
| Exclusion | Addresses never assigned dynamically |
| Reservation | A known MAC/client ID receives a fixed address |
| Lease | Time-limited address ownership |
| Option | Gateway, DNS, domain, NTP, and other configuration |

Common failures include pool exhaustion, rogue DHCP, a wrong relay, and incorrect mask/gateway options. DHCP Snooping can restrict unauthorized server replies.

```cisco
interface Vlan10
 ip address 10.10.10.1 255.255.255.0
 ip helper-address 10.10.20.53
 no shutdown
show ip interface Vlan10
```

| Line | Purpose |
|---|---|
| `interface Vlan10` | Selects the client VLAN gateway |
| `ip address` | Configures its IP and mask |
| `ip helper-address` | Relays selected UDP broadcasts, including DHCP, to the server; platform behavior should be verified |
| `no shutdown` | Administratively enables the interface |
| Show command | Verifies IP and helper configuration |

### SLAAC

IPv6 routers send Router Advertisements containing prefixes and flags. A client can create an address with Stateless Address Autoconfiguration and perform Duplicate Address Detection. The default gateway comes from RA. DHCPv6 may assign addresses statefully or provide additional information statelessly. SLAAC and DHCPv6 can coexist.

## DNS structure from zero

DNS is a distributed hierarchy. Read the fully qualified name `www.realsam.ir.` from right to left:

- `.` is the DNS root; the final dot is often omitted in normal writing.
- `ir` is the top-level domain.
- `realsam.ir` is the registered domain and a likely zone.
- `www` is a label/host within it.

A **registrar** manages registration, a **registry** operates a TLD, and an **authoritative DNS provider** serves zone data. These roles can belong to different organizations.

## What happens during name resolution?

1. The application requests `www.realsam.ir`.
2. The operating-system stub resolver checks cache and the hosts file.
3. It asks the configured recursive resolver.
4. If the resolver has no valid cache, it asks a root server where `.ir` is served.
5. It asks a `.ir` server for the name servers of `realsam.ir`.
6. It asks an authoritative server for the A and/or AAAA record.
7. The resolver caches the answer according to TTL and returns it.
8. The client starts TCP/QUIC, TLS, and the application request.

A recursive resolver performs the search for clients. An authoritative server answers for its own zones and should not normally offer unrestricted public recursion. A primary server is the editable source; a secondary obtains a transferred copy. Both can answer authoritatively.

## DNS resource records

| Record | Purpose | Example |
|---|---|---|
| A | Name to IPv4 | `www.realsam.ir. A 192.0.2.80` |
| AAAA | Name to IPv6 | `www.realsam.ir. AAAA 2001:db8::80` |
| CNAME | Alias to canonical name | `blog.realsam.ir. CNAME www.realsam.ir.` |
| MX | Mail exchanger with priority | `realsam.ir. MX 10 mail.realsam.ir.` |
| TXT | Text for verification/policy such as SPF | Application-specific text |
| NS | Authoritative name servers/delegation | `realsam.ir. NS ns1.realsam.ir.` |
| SOA | Zone authority, primary, contact, serial, and timers | One at the zone apex |
| PTR | Reverse mapping from address to name | `192.0.2.80 → mail.realsam.ir` |

Important rules:

- A CNAME owner normally cannot have other record types; using CNAME at a zone apex is therefore problematic.
- Lower MX preference numbers are tried first. MX targets names, not raw IP addresses.
- TXT has many uses; a TXT value is not automatically trustworthy.
- Parent NS records create delegation. Glue records prevent circular lookup when the child name server is inside the delegated child.
- Increment the SOA serial when zone data changes so secondaries detect it.
- TTL controls caching, not a guaranteed global propagation time.

## Example forward zone

```dns
$ORIGIN realsam.ir.
$TTL 3600
@ IN SOA ns1.realsam.ir. hostmaster.realsam.ir. (
  2026081101 ; serial
  3600       ; refresh
  900        ; retry
  1209600    ; expire
  300        ; negative cache TTL
)
@     IN NS    ns1.realsam.ir.
@     IN NS    ns2.realsam.ir.
ns1   IN A     192.0.2.53
ns2   IN A     198.51.100.53
@     IN A     192.0.2.80
www   IN A     192.0.2.80
mail  IN A     192.0.2.25
@     IN MX 10 mail.realsam.ir.
@     IN TXT   "v=spf1 mx -all"
```

### Line-by-line explanation

| Line | Meaning |
|---|---|
| `$ORIGIN` | Suffix applied to following relative names |
| `$TTL` | Default time-to-live |
| `@ IN SOA` | `@` means the current origin; SOA begins zone metadata |
| First SOA name | Declared primary/master name server |
| Second SOA name | Responsible mailbox with the first `@` represented by a dot |
| Serial | Zone version; the date-like format is a convention |
| Refresh/retry/expire | Secondary synchronization timers |
| Negative TTL | Cache time for nonexistence responses |
| NS lines | Authoritative servers for the zone |
| A lines | Documentation IPv4 addresses for the hosts |
| MX | Mail destination with preference 10 |
| TXT | Strict SPF example; real senders must be fully inventoried before use |

## Reverse DNS and PTR

Forward DNS maps name to address. Reverse DNS maps address to name. IPv4 reverse zones use `in-addr.arpa`; IPv6 uses `ip6.arpa` with reversed hexadecimal nibbles.

For `192.0.2.80`, the query name is:

```text
80.2.0.192.in-addr.arpa.
```

The PTR record is:

```dns
80.2.0.192.in-addr.arpa. 3600 IN PTR mail.realsam.ir.
```

### Field-by-field explanation

- `80.2.0.192.in-addr.arpa.` is the reversed address name.
- `3600` is a one-hour TTL.
- `IN` is the Internet class.
- `PTR` is the record type.
- `mail.realsam.ir.` is the fully qualified target; the final dot matters in a zone file.

Control of a reverse zone normally belongs to the IP-block owner or provider, not automatically to the domain owner. Ask the provider to create the PTR or delegate the appropriate reverse zone.

For mail, forward-confirmed reverse DNS is desirable: the IP's PTR points to `mail.realsam.ir`, and that name's A/AAAA record points back to the same address. PTR is not proof of security or ownership, but missing or inconsistent reverse DNS can damage mail reputation and delivery.

## DNSSEC, DoH, and DoT

DNSSEC signs DNS data to provide origin authentication and integrity. It does not encrypt queries. A DS record in the parent links to the child's DNSKEY. Incorrect signatures, delegation, or time can make otherwise correct data fail validation.

DNS over TLS protects client-to-resolver traffic with TLS. DNS over HTTPS carries it inside HTTPS. The resolver still sees the queries, and neither technology replaces DNSSEC validation of authoritative data.

## DNS troubleshooting commands

```bash
dig A www.realsam.ir
dig AAAA www.realsam.ir
dig MX realsam.ir
dig NS realsam.ir +trace
dig -x 192.0.2.80
dig DNSKEY realsam.ir +dnssec
```

| Line | Purpose |
|---|---|
| 1 | Queries the web IPv4 address |
| 2 | Queries the web IPv6 address |
| 3 | Lists mail exchangers |
| 4 | Follows delegation from the root instead of relying only on local recursion |
| 5 | Queries reverse DNS/PTR |
| 6 | Requests DNSSEC key/signature data; presence does not by itself prove local validation |

Read `status`, `ANSWER`, `AUTHORITY`, `SERVER`, TTL, and query time. `NXDOMAIN` means the name does not exist. `SERVFAIL` often indicates resolver, authoritative, or DNSSEC failure. A timeout means no timely response, not necessarily that the name is absent.

## NTP, PTP, and NTS

- **NTP:** general network time synchronization, commonly UDP 123 and a stratum hierarchy.
- **PTP:** higher precision on controlled local networks, especially with hardware timestamps.
- **NTS:** protects NTP using a TLS-based key/cookie establishment process.

Incorrect time breaks certificate validation, Kerberos, log correlation, and DNSSEC. Use multiple approved sources, monitor offset, and restrict peers.

## 3.5 — Network access and management

| Method | Purpose | Security concern |
|---|---|---|
| Site-to-site VPN | Connect two networks | Routes, keys, rekey, and redundancy |
| Client-to-site VPN | Connect one endpoint | MFA, device posture, and tunnel policy |
| Clientless VPN | Browser access to selected applications | Session control and limited exposure |
| SSH | Secure CLI | Keys, modern algorithms, AAA, and ACLs |
| HTTPS GUI | Visual administration | Valid TLS, MFA, and management network |
| API | Automation | Scoped short-lived tokens, TLS, and audit |
| Console | Local/out-of-band access | Physical control and emergency accounts |
| Jump box | Controlled administrative entry | Hardening, MFA, recording, and patching |

Split tunnel sends only organizational traffic through the VPN, reducing central bandwidth but reducing control over direct Internet traffic. Full tunnel sends all traffic through the organization, increasing visibility and policy control but requiring more capacity.

In-band management uses the production network and may fail with it. Out-of-band management uses a separate path such as console servers and dedicated cellular access; it also needs strong security and testing.

```bash
ssh-keygen -t ed25519 -a 64 -C "netadmin@realsam.ir"
ssh-copy-id netadmin@router-mgmt.realsam.ir
ssh -o IdentitiesOnly=yes netadmin@router-mgmt.realsam.ir
```

| Line | Purpose |
|---|---|
| `ssh-keygen` | Creates an Ed25519 key; `-a 64` strengthens private-key-file password derivation and `-C` labels it |
| `ssh-copy-id` | Installs the public key after authentication; verify the host key first |
| Final SSH line | Connects using explicitly selected identities |

Never send a private key or commit it to Git. Verify the first host-key fingerprint through a trusted channel.

## End-of-chapter exercises

1. Create a logical diagram, IPAM table, and cable map for the reference network.
2. Write a change request for VLAN 40 with rollback and success criteria.
3. Choose justified RPO and RTO values for an online store.
4. Capture DORA and identify addresses and ports in every message.
5. Design forward and reverse DNS for `mail.realsam.ir` and verify FCrDNS.
6. Explain every stage of `dig +trace` from root to authoritative server.
7. Design out-of-band management that remains available during production-network failure.
