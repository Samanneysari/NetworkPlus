# Network+ Objective Workbook

This workbook turns every N10-009 objective into small, explained decisions. Read the matching chapter first. Then cover the explanation column, interpret each line yourself, and compare your answer.

The examples use documentation addresses and isolated lab commands. They are teaching examples, not production change instructions.

## 1.1 — OSI model and data flow

**Purpose:** Use layers to locate a failure and explain encapsulation without treating the model as a memorization exercise.

### Worked example 1 — A web request

| Evidence line | Plain-English meaning |
|---|---|
| `DNS answer: 192.0.2.80` | The application has translated the name into a Layer 3 address. |
| `SYN → 192.0.2.80:443` | TCP is trying to open a Layer 4 connection to HTTPS. |
| `ServerHello, Certificate` | TLS is negotiating protection and proving server identity. |
| `HTTP/1.1 200 OK` | The application received a successful Layer 7 response. |

### Worked example 2 — Encapsulation

| Step | Explanation |
|---|---|
| HTTP creates data | The application prepares a request. |
| TCP adds ports and sequence information | The receiver can identify the process and order bytes. |
| IP adds source and destination IP addresses | Routers can move the packet between networks. |
| Ethernet adds local source and next-hop MAC addresses | Switches can carry the frame across the current LAN. |

### Worked example 3 — Choose the layer

| Symptom | First layer to inspect and why |
|---|---|
| Link light is off | Layer 1: no physical signal is established. |
| Wrong VLAN | Layer 2: the frame is in the wrong broadcast domain. |
| No return route | Layer 3: the packet cannot find a path back. |
| HTTP 403 | Layer 7: the server answered but denied the application request. |

**Check:** A successful ping does not prove HTTPS works. Why? **Answer:** Ping tests an ICMP exchange, while HTTPS also needs TCP, TLS, and the application.

## 1.2 — Network appliances, applications, and functions

**Purpose:** Select a device by the decision it must make, not by its name or price.

### Worked example 1 — Follow one packet

| Device line | Explanation |
|---|---|
| Access switch checks destination MAC | It forwards inside the VLAN. |
| Router checks destination IP | It selects the next network path. |
| Firewall checks policy and state | It permits or rejects the flow. |
| Load balancer checks backend health | It selects a healthy application server. |

### Worked example 2 — Proxy direction

| Requirement | Correct choice and reason |
|---|---|
| Control employee web browsing | A forward proxy represents clients going outward. |
| Protect several internal web servers | A reverse proxy represents servers to outside clients. |
| Cache static content near worldwide users | A CDN reduces distance and origin load. |

### Worked example 3 — Storage

| Observation | Meaning |
|---|---|
| Client mounts an SMB share | NAS/file storage exposes files and directories. |
| Server receives an iSCSI LUN | SAN/block storage exposes blocks for the server to format. |
| Hypervisor datastore is unavailable | Check the storage path as well as the IP network and host. |

**Check:** Why can an IPS create more operational risk than an IDS? **Answer:** An IPS is inline and may block legitimate traffic; an IDS normally observes and alerts.

## 1.3 — Cloud and virtual networking

**Purpose:** Trace cloud traffic through routes and policy while keeping the shared-responsibility boundary clear.

### Worked example 1 — Private subnet update

| Path line | Explanation |
|---|---|
| `0.0.0.0/0 → NAT gateway` | The private subnet sends unknown IPv4 destinations toward translation. |
| Security group allows outbound 443 | Stateful policy permits HTTPS and recognizes the reply. |
| Network ACL permits both directions | Stateless subnet policy needs explicit forward and return allowance. |
| Internet gateway carries translated traffic | The public edge forwards the NAT gateway's Internet traffic. |

### Worked example 2 — Responsibility

| Service | Learner decision |
|---|---|
| SaaS email | Provider runs the application; customer still manages users, data, and settings. |
| PaaS application | Provider runs the platform; customer manages code, data, and app configuration. |
| IaaS VM | Customer also manages the guest OS, patches, and host firewall. |

### Worked example 3 — Isolation fault

| Evidence | Interpretation |
|---|---|
| Only one subnet fails | Inspect its effective route table and network ACL first. |
| Peering exists but prefixes overlap | Routing cannot uniquely select the remote network. |
| TCP opens but the app denies access | Network reachability works; inspect identity and application policy. |

**Check:** Does a direct cloud connection automatically encrypt traffic? **Answer:** No. Verify the service and add encryption when required.

## 1.4 — Ports, protocols, services, and traffic types

**Purpose:** Identify a service, transport, and delivery pattern, then test the real application instead of memorizing only numbers.

### Worked example 1 — A socket pair

| Line | Explanation |
|---|---|
| Client `10.0.0.25:51844` | The client selected a temporary source port. |
| Server `192.0.2.80:443` | The destination port identifies HTTPS by convention. |
| Protocol `TCP` | TCP state is separate from both port numbers. |
| State `ESTABLISHED` | Transport opened; application health is still unproven. |

### Worked example 2 — DNS transport

| Event | Explanation |
|---|---|
| Small query uses UDP 53 | UDP is efficient for an ordinary request. |
| Truncated response sets `TC=1` | The client normally retries using TCP. |
| Zone transfer uses TCP | A larger ordered exchange requires a connection. |

### Worked example 3 — Delivery type

| Destination | Type and meaning |
|---|---|
| One SSH server | Unicast: one selected destination. |
| DHCP Discover in a VLAN | Broadcast: all members of the IPv4 broadcast domain receive it. |
| Subscribed streaming group | Multicast: joined receivers receive it. |
| Shared DNS service address | Anycast: routing selects one service instance. |

**Check:** Is a changed default port a security control? **Answer:** It may reduce noise, but it does not replace authentication, patching, encryption, or filtering.

## 1.5 — Media, transceivers, and connectors

**Purpose:** Match reach, speed, environment, connector, and optic instead of selecting media by one property.

### Worked example 1 — Copper choice

| Requirement | Decision |
|---|---|
| 1 GbE office horizontal channel | Cat 5e or better can work when the installed channel passes its standard. |
| 10 GbE full 100 m channel | Cat 6A is the normal safe choice. |
| 40 GbE short data-center channel | Cat 8 or an appropriate DAC/fiber design may fit. |

### Worked example 2 — Fiber no-link record

| Evidence line | Meaning |
|---|---|
| Optic A: 850 nm MMF | It expects multimode fiber and a matching optic. |
| Optic B: 1310 nm SMF | The wavelength and fiber type do not match A. |
| Receive power: no reading | Check polarity, cleanliness, compatibility, and the far transmitter. |

### Worked example 3 — Tool selection

| Question | Tool |
|---|---|
| Are copper pairs open, shorted, or miswired? | Wire-map cable tester. |
| Where is a copper fault? | TDR. |
| Where is a fiber event or loss? | OTDR with correct launch setup. |
| Is received optical power inside the optic's range? | Optical power meter. |

**Check:** Does an SFP that physically fits necessarily work? **Answer:** No. Speed, wavelength, medium, reach, encoding, and platform support must match.

## 1.6 — Topologies, architectures, and traffic flow

**Purpose:** Recognize the failure domain and traffic direction created by a design.

### Worked example 1 — Branch WAN

| Design line | Explanation |
|---|---|
| Every branch connects to headquarters | This is hub-and-spoke. |
| Branch-to-branch traffic crosses headquarters | The hub needs enough capacity and availability. |
| A second independent hub is added | Redundancy improves only if routing and failover are tested. |

### Worked example 2 — Data center

| Flow | Meaning |
|---|---|
| User enters the data center | North-south traffic crosses the data-center boundary. |
| App server calls database | East-west traffic moves between internal workloads. |
| Each leaf connects to each spine | Spine-leaf provides predictable equal-cost paths. |

### Worked example 3 — Campus layers

| Layer | Job |
|---|---|
| Access | Connect endpoints and apply edge policy. |
| Distribution | Aggregate access and provide policy/routing boundaries. |
| Core | Move traffic quickly between major blocks. |

**Check:** What is the main trade-off of a full mesh? **Answer:** It provides many paths but link count, cost, and management complexity grow rapidly.

## 1.7 — IPv4 addressing

**Purpose:** Determine subnet boundaries, usable addresses, and efficient allocations.

### Worked example 1 — `198.51.100.141/28`

| Calculation line | Explanation |
|---|---|
| `/28` leaves 4 host bits | Each block has `2^4 = 16` addresses. |
| Boundaries are 0, 16, 32 ... 128, 144 | 141 is inside the 128–143 block. |
| Network `198.51.100.128` | All host bits are zero. |
| Broadcast `198.51.100.143` | All host bits are one. |
| Hosts `.129` through `.142` | Fourteen normal usable host addresses remain. |

### Worked example 2 — VLSM order

| Need | Allocation reason |
|---|---|
| 100 hosts | Allocate a `/25` first because it is the largest request. |
| 50 hosts | Allocate a `/26` from the next aligned boundary. |
| 12 hosts | Allocate a `/28`; it has 14 normal usable addresses. |

### Worked example 3 — Address symptom

| Address | Interpretation |
|---|---|
| `169.254.18.7/16` | The client self-assigned link-local IPv4 after normal configuration failed. |
| `127.0.0.1` | This is local loopback, not a LAN address. |
| `10.20.30.40` | It is private RFC 1918 space, but not automatically trusted. |

**Check:** Why is `2^h - 2` not universal? **Answer:** `/31` point-to-point links and `/32` host routes have special uses.

## 1.8 — Evolving networking use cases

**Purpose:** Explain what modern overlays and policy systems solve without treating them as magic.

### Worked example 1 — SD-WAN decision

| Input | Policy result |
|---|---|
| Voice has high loss on broadband | Move voice to the healthier permitted path. |
| Backup traffic is not latency-sensitive | Keep it on the lower-cost path. |
| Controller is unavailable | Existing forwarding behavior depends on product design; redundancy matters. |

### Worked example 2 — VXLAN

| Line | Explanation |
|---|---|
| Original Ethernet frame | Carries the tenant Layer 2 traffic. |
| VTEP adds VXLAN/UDP/IP headers | The frame can cross a routed underlay. |
| 24-bit VNI | Identifies a logical segment with more scale than VLAN IDs. |

### Worked example 3 — IPv6 transition

| Choice | Trade-off |
|---|---|
| Dual stack | Straightforward, but both protocol stacks need routing and security. |
| Tunnel | Crosses an incompatible region but adds overhead and MTU complexity. |
| NAT64/DNS64 | Helps IPv6-only clients reach IPv4 services; literal IPv4 assumptions can fail. |

**Check:** Is Zero Trust a product? **Answer:** No. It is an architecture using identity, device state, context, least privilege, and continuous evaluation.

## 2.1 — Routing technologies

**Purpose:** Read a route decision and explain how static and dynamic routes enter the table.

### Worked example 1 — Longest prefix

| Matching route | Result |
|---|---|
| `0.0.0.0/0 via A` | Matches every IPv4 destination. |
| `10.0.0.0/8 via B` | More specific for `10.20.30.40`. |
| `10.20.30.0/24 via C` | Most specific match, so C wins. |

### Worked example 2 — Route code

| Output part | Meaning |
|---|---|
| `O 10.20.0.0/16` | OSPF learned the prefix. |
| `[110/20]` | Administrative distance 110, OSPF metric 20. |
| `via 192.0.2.2` | This is the next-hop address. |
| `Gi0/1` | The packet leaves this interface. |

### Worked example 3 — Redundant gateway

| Event | Explanation |
|---|---|
| Hosts use one virtual IP | FHRP hides individual router addresses from clients. |
| Active router fails | A standby can take the virtual gateway role. |
| Upstream route is missing | Gateway failover alone does not restore end-to-end service. |

**Check:** Are OSPF cost and EIGRP metric compared directly? **Answer:** No. Administrative distance normally selects the source before that protocol's metric is considered.

## 2.2 — Switching technologies

**Purpose:** Configure and verify VLAN, trunk, STP, and LACP behavior safely.

### Worked example 1 — Switch forwarding

| Event | Explanation |
|---|---|
| Frame enters VLAN 10 on port 3 | Learning records the source MAC on port 3 in VLAN 10. |
| Destination MAC is unknown | The switch floods eligible VLAN 10 ports except the incoming port. |
| Reply enters port 8 | The switch learns the second MAC on port 8. |
| Next frame is known unicast | It goes only to the learned destination port. |

### Worked example 2 — Trunk fault

| Evidence | Meaning |
|---|---|
| VLAN 10 works across trunk | Physical link and trunk operation are at least partly healthy. |
| VLAN 20 missing from allowed list | VLAN 20 frames are not carried. |
| Adding VLAN 20 restores service | Verify both directions, STP state, and intended policy afterward. |

### Worked example 3 — LACP bundle

| Line | Meaning |
|---|---|
| Two members show bundled | Both links joined the logical port-channel. |
| One member is suspended | Check speed, trunk, VLAN, MTU, and channel settings. |
| One large flow uses one member | Per-flow hashing normally avoids reordering; aggregate flows use the bundle. |

**Check:** Is an STP discarding port automatically broken? **Answer:** No. It may be the intentional loop-free backup path.

## 2.3 — Wireless technologies

**Purpose:** Design and troubleshoot Wi-Fi using airtime, signal quality, security, and client behavior.

### Worked example 1 — Strong signal, poor service

| Measurement | Meaning |
|---|---|
| RSSI `-52 dBm` | Received signal is strong in this sample. |
| Noise `-58 dBm` | Noise is also strong, leaving poor SNR. |
| Channel use `92%` | Little airtime remains. |
| High retry rate | Frames are repeatedly resent; inspect interference and contention. |

### Worked example 2 — Channel plan

| Choice | Explanation |
|---|---|
| 20 MHz on crowded 2.4 GHz | Preserves more non-overlapping channel reuse. |
| Wider 5/6 GHz channel | May increase rate but consumes more spectrum. |
| Maximum power on every AP | Can enlarge overlap and make roaming worse. |

### Worked example 3 — Enterprise authentication

| Stage | Evidence |
|---|---|
| Client joins SSID | Radio association succeeded. |
| EAP exchange starts | 802.1X identity authentication is in progress. |
| RADIUS rejects certificate | Check trust chain, name, EAP method, and clock. |

**Check:** Does a captive portal encrypt Wi-Fi? **Answer:** No. Encryption and authentication come from the WLAN security design.

## 2.4 — Physical installation

**Purpose:** Install network equipment with correct power, cooling, labeling, and safety records.

### Worked example 1 — PoE budget

| Calculation | Meaning |
|---|---|
| `6 × 25.5 W = 153 W` | Six APs may require 153 W. |
| `10 × 7 W = 70 W` | Ten phones may require 70 W. |
| Total `223 W` on a `240 W` budget | Only 17 W theoretical headroom remains; redesign for growth and real negotiation. |

### Worked example 2 — Cabling record

| Field | Why it matters |
|---|---|
| `A-2-17 → IDF2-PP1-17` | Both endpoints can be found. |
| `Cat 6A, 74 m` | Media and length can be checked against the required standard. |
| `Passed, tester ID, date` | The result is traceable rather than an undocumented claim. |

### Worked example 3 — Rack placement

| Decision | Reason |
|---|---|
| Heavy UPS low in rack | Improves physical stability. |
| Front-to-back airflow aligned | Prevents hot exhaust from returning to intakes. |
| A/B feeds separated | One power-path failure should not remove both feeds. |

**Check:** What does a cable map prove? **Answer:** It proves where a cable goes; certification testing separately proves performance.

## 3.1 — Documentation and life-cycle management

**Purpose:** Keep network state understandable and make changes reversible.

### Worked example 1 — Change record

| Line | Explanation |
|---|---|
| Purpose: add VLAN 40 for printers | Defines the business and technical goal. |
| Precheck: backup config and capture trunk state | Preserves evidence and rollback material. |
| Success: test DHCP, DNS, print, and blocked user access | Defines positive and negative validation. |
| Rollback: remove VLAN 40 changes in reverse order | Makes recovery executable rather than vague. |

### Worked example 2 — Diagram type

| Question | Document |
|---|---|
| Which patch panel connects to switch port 17? | Physical diagram or cable map. |
| Which subnet and gateway serve VLAN 40? | Layer 3/logical diagram and IPAM. |
| Which trunk carries VLAN 40? | Layer 2 diagram. |

### Worked example 3 — Decommission

| Step | Reason |
|---|---|
| Remove DNS, monitoring, IPAM, and AAA entries | Prevents stale operational state. |
| Revoke keys and certificates | Stops abandoned credentials from remaining valid. |
| Erase data and record disposal | Protects information and proves custody. |

**Check:** Is a successful backup job proof of recovery? **Answer:** No. A representative restore and service validation are required.

## 3.2 — Monitoring

**Purpose:** Turn counters, logs, flows, and captures into useful alerts and evidence.

### Worked example 1 — Counter delta

| Sample | Meaning |
|---|---|
| 10:00 CRC `80000` | Old total; it does not prove a current fault. |
| 10:10 CRC `80120` | The counter increased by 120. |
| 120,000 new packets | Current CRC rate is 0.1% for the sample. |
| User impact at the same time | Correlation supports investigation of media or duplex. |

### Worked example 2 — Data source

| Need | Best starting source |
|---|---|
| Conversation volumes over hours | Flow records. |
| Exact TCP flags and timing | Packet capture. |
| Device event and severity | Syslog. |
| Interface counters and state | SNMP polling or telemetry. |

### Worked example 3 — Alert quality

| Alert line | Purpose |
|---|---|
| Loss above 3% for 5 minutes | Requires a sustained condition. |
| Compare gateway and two remote targets | Separates local and upstream scope. |
| Owner and runbook attached | Makes the alert actionable. |
| Recovery below 1% for 10 minutes | Reduces repeated open/close flapping. |

**Check:** Why use polling and traps together? **Answer:** Traps can be lost, and a completely failed device may be unable to send one.

## 3.3 — Disaster recovery

**Purpose:** Connect business recovery requirements to tested technology and people.

### Worked example 1 — Objectives

| Requirement | Meaning |
|---|---|
| RPO 15 minutes | At most 15 minutes of recent data may be lost. |
| RTO 2 hours | Service must be restored inside two hours. |
| Nightly backup | It cannot satisfy the 15-minute RPO by itself. |

### Worked example 2 — Site choice

| Site | Trade-off |
|---|---|
| Cold | Lower cost, but systems and data require more preparation. |
| Warm | Some capacity and data are ready. |
| Hot | Fastest potential recovery, with higher cost and synchronization complexity. |

### Worked example 3 — Restore proof

| Test line | Explanation |
|---|---|
| Restore representative data | Proves backup content can be read. |
| Validate permissions and integrity | Proves restored data is usable and protected. |
| Start dependencies and application | Proves more than storage recovery. |
| Test from a user path and record time | Measures the actual RTO result. |

**Check:** How does BCP differ from DR? **Answer:** BCP keeps business functions operating; DR restores technology and data.

## 3.4 — IPv4 and IPv6 network services

**Purpose:** Implement and troubleshoot addressing, naming, and time services.

### Worked example 1 — DHCP DORA

| Message | Meaning |
|---|---|
| Discover | Client looks for a server, usually by broadcast. |
| Offer | Server proposes an address and options. |
| Request | Client selects and requests an offer. |
| Acknowledgment | Server confirms the lease. |

### Worked example 2 — DNS result

| Output | Meaning |
|---|---|
| `status: NOERROR` with answer | The query succeeded and data exists. |
| `NXDOMAIN` | The queried name does not exist according to DNS. |
| `SERVFAIL` | Resolution failed; inspect resolver, authority, DNSSEC, and time. |
| Timeout | No timely response; do not interpret it as NXDOMAIN. |

### Worked example 3 — IPv6 configuration

| Evidence | Meaning |
|---|---|
| Link-local address exists | Local IPv6 interface operation started. |
| No global prefix or default route | Inspect Router Advertisements. |
| Global address exists, DNS absent | Inspect RA/DHCPv6 DNS design and resolver settings. |

**Check:** Does DNSSEC encrypt DNS? **Answer:** No. It authenticates DNS data; DoT or DoH can protect the client-to-resolver channel.

## 3.5 — Network access and management

**Purpose:** Choose a secure access path that remains manageable during failure.

### Worked example 1 — VPN type

| Need | Choice |
|---|---|
| Connect two office networks | Site-to-site VPN. |
| Give one managed laptop broad corporate access | Client-to-site VPN with MFA and posture policy. |
| Publish one browser application | Clientless/application access may reduce exposure. |

### Worked example 2 — Management path

| Path | Meaning |
|---|---|
| SSH through production VLAN | In-band; a production outage may remove access. |
| Console server on separate cellular link | Out-of-band; independent but still requires strong security. |
| Admin connects through jump host | Centralizes entry, MFA, logging, and policy. |

### Worked example 3 — SSH identity

| Line | Explanation |
|---|---|
| Verify host-key fingerprint | Confirms the server identity through a trusted channel. |
| Use a protected private key | Proves client identity without sharing the private key. |
| Restrict source and account privilege | Limits reach and damage if credentials are abused. |

**Check:** What is the main split-tunnel trade-off? **Answer:** It reduces central bandwidth use but also reduces central visibility and control over direct Internet traffic.

## 4.1 — Security concepts

**Purpose:** Apply identity, cryptography, segmentation, and governance to a stated risk.

### Worked example 1 — CIA

| Control | Property helped |
|---|---|
| TLS encryption | Confidentiality of data in transit. |
| Signed configuration and hashes | Integrity. |
| Redundant tested paths | Availability. |

### Worked example 2 — AAA

| Stage | Question |
|---|---|
| Authentication | Who are you? |
| Authorization | What may you do? |
| Accounting | What did you do and when? |

### Worked example 3 — Certificate check

| Field | Reason |
|---|---|
| Chain and signature | A trusted issuer signed the identity. |
| Subject Alternative Name | The requested hostname is covered. |
| Validity time | The certificate is currently valid. |
| Key usage | The certificate is permitted for this purpose. |

**Check:** Does encryption at rest protect data after an authorized user decrypts it? **Answer:** Not by itself; access control and application security still matter.

## 4.2 — Attacks and impact

**Purpose:** Recognize the evidence of an attack and select a control without performing the attack.

### Worked example 1 — Rogue DHCP

| Evidence | Interpretation |
|---|---|
| Clients receive unexpected gateway | A wrong server may be answering DHCP. |
| Two Offers appear after one Discover | Identify both server sources and switch locations. |
| Snooping drops offer on untrusted port | The edge control is blocking unauthorized server traffic. |

### Worked example 2 — ARP poisoning

| Evidence | Meaning |
|---|---|
| Gateway IP changes between MAC addresses | The local mapping is unstable or being spoofed. |
| Switch port and DHCP binding disagree | Investigate the connected device and source validation. |
| DAI drop counter rises | Dynamic ARP Inspection rejected invalid ARP against its trusted binding source. |

### Worked example 3 — Wireless evil twin

| Evidence | Meaning |
|---|---|
| Familiar SSID has unexpected BSSID/channel | The radio may not be an approved AP. |
| Certificate warning appears on enterprise login | Stop; do not accept an unknown authentication server. |
| Controller/WIDS lacks the BSSID | Locate and contain according to policy. |

**Check:** Why is MAC flooding different from a broadcast storm? **Answer:** MAC flooding targets the switch table; a broadcast storm is excessive replicated broadcast traffic, often from a loop.

## 4.3 — Defensive features

**Purpose:** Apply layered edge, segmentation, and device-hardening controls.

### Worked example 1 — ACL order

| Rule line | Result |
|---|---|
| Permit users to DNS server TCP/UDP 53 | Approved name resolution matches first. |
| Permit users to web server TCP 443 | Approved HTTPS matches next. |
| Deny users to server subnet and log | Other server access is blocked. |
| Permit users to other destinations | Remaining allowed traffic continues; real policy may be stricter. |

### Worked example 2 — Switch edge

| Control | Purpose |
|---|---|
| Port security | Limits expected MAC behavior on an access port. |
| DHCP Snooping | Builds bindings and blocks server replies on untrusted ports. |
| DAI | Validates ARP using trusted bindings. |
| BPDU Guard | Disables an edge port receiving an unexpected BPDU. |

### Worked example 3 — NAC result

| Endpoint state | Policy |
|---|---|
| Managed and compliant | Place in the normal authorized segment. |
| Known but missing updates | Place in remediation with limited services. |
| Guest | Isolate from internal networks and permit only intended Internet services. |

**Check:** Why should DHCP Snooping trust be rare? **Answer:** Trusting a user port lets rogue server replies bypass the protection.

## 5.1 — Troubleshooting methodology

**Purpose:** Solve faults with evidence, safe tests, verification, and documentation.

### Worked example 1 — Scope first

| Question | Value |
|---|---|
| Who is affected? | Separates one endpoint, VLAN, site, or global failure. |
| What still works? | Provides a healthy boundary for comparison. |
| What changed and when? | Produces a theory, not proof. |

### Worked example 2 — Test one theory

| Step | Explanation |
|---|---|
| Theory: DNS is failing | Based on IP access working while name access fails. |
| Test: query the configured resolver directly | Confirms or rejects name-resolution failure. |
| Result: correct answer received | Reject the theory and inspect TCP/TLS/application next. |

### Worked example 3 — Finish the incident

| Line | Explanation |
|---|---|
| Apply authorized correction | Make the smallest relevant change. |
| Test user service and monitoring | Prove the actual outcome, not just ping. |
| Check negative security behavior | Ensure the fix did not permit forbidden access. |
| Record root cause and prevention | Make the next incident less likely or faster to solve. |

**Check:** What should happen when a theory fails? **Answer:** Form the next evidence-based theory or escalate with the evidence collected.

## 5.2 — Cabling, interfaces, and hardware

**Purpose:** Interpret physical symptoms, counters, optics, and PoE evidence.

### Worked example 1 — Interface state

| State | Meaning |
|---|---|
| Administratively down | Configuration disabled the interface. |
| Down/down | No physical link is detected. |
| Up/down | Physical signal exists but the line protocol/encapsulation is not working. |
| Err-disabled | A protection mechanism shut the port. |

### Worked example 2 — Error pattern

| Counter | First interpretation |
|---|---|
| CRC increases with traffic | Inspect medium, termination, interference, and duplex. |
| Late collisions | Strong evidence of duplex mismatch or invalid collision behavior. |
| Output drops under peak load | Inspect congestion, queues, and capacity. |

### Worked example 3 — PoE failure

| Evidence | Meaning |
|---|---|
| Link present, AP radios disabled | The device may be operating in reduced-power mode. |
| Switch total budget nearly exhausted | New powered devices may be denied or limited. |
| Class/standard mismatch | Verify both PSE and PD capability plus cable quality. |

**Check:** Why should counters be sampled over time? **Answer:** A large old total does not prove errors are still increasing.

## 5.3 — Network services, switching, and routing

**Purpose:** Isolate service, VLAN, route, address, and return-path faults.

### Worked example 1 — Partial VLAN failure

| Evidence | Interpretation |
|---|---|
| Same-switch VLAN 20 hosts communicate | Access VLAN and local switching probably work. |
| VLAN 10 crosses the trunk | The trunk physical link is up. |
| VLAN 20 absent from trunk list | The allowed-VLAN policy is the specific fault. |

### Worked example 2 — One-way routing

| Path line | Explanation |
|---|---|
| Client route reaches server | Forward routing works. |
| Server gateway lacks client prefix | Reply follows the wrong path or is dropped. |
| Adding the correct approved return route works | Verify policy, route persistence, and monitoring. |

### Worked example 3 — DHCP exhaustion

| Evidence | Meaning |
|---|---|
| Existing clients remain online | Their leases are still valid. |
| New clients fail to receive offers | Inspect pool availability and relay/server path. |
| Pool is full of randomized client IDs | Address planning and lease policy may be the root cause. |

**Check:** Is an APIPA address itself the root cause? **Answer:** No. It is evidence that normal IPv4 configuration failed.

## 5.4 — Performance problems

**Purpose:** Convert “slow” into measurable scope, timing, loss, and resource evidence.

### Worked example 1 — Web timing

| Measurement | Meaning |
|---|---|
| DNS `0.012 s` | Name resolution is fast in this sample. |
| TCP connect `0.030 s` | Network and server handshake completed quickly. |
| TLS complete `0.090 s` | Cryptographic handshake added 60 ms after TCP. |
| First byte `2.400 s` | Most delay is likely application/backend processing. |

### Worked example 2 — Voice quality

| Metric | Effect |
|---|---|
| High latency | Conversation becomes delayed. |
| High jitter | Packet arrival variation strains the jitter buffer. |
| Packet loss | Audio gaps appear; retransmission is usually too late for real-time media. |

### Worked example 3 — Bottleneck

| Link | Observed rate |
|---|---|
| Client access 1 Gb/s | Not the smallest capacity. |
| WAN 100 Mb/s at 98% | Likely path bottleneck during the sample. |
| Server NIC 10 Gb/s | Extra server link capacity cannot remove the WAN limit. |

**Check:** Why is one speed test insufficient? **Answer:** It measures one server, path, protocol, load, and moment.

## 5.5 — Troubleshooting tools and commands

**Purpose:** Select the smallest tool that answers the current question and interpret its limits.

### Worked example 1 — Endpoint sequence

| Command | Question answered |
|---|---|
| `ip address show` | What addresses and interface state exist? |
| `ip route get 192.0.2.80` | Which route, source, and interface will this destination use? |
| `ip neighbor show` | Is the local next hop resolved? |
| `dig A www.realsam.ir` | What does the selected DNS path return? |

### Worked example 2 — Port test

| Result | Meaning |
|---|---|
| TCP connection accepted | A listener and return path worked at that moment. |
| Connection refused | The target responded but nothing accepted the port, or it actively rejected it. |
| Timeout | Filtering, routing, server state, or return path may be involved. |

### Worked example 3 — Capture filter

| Filter | Purpose |
|---|---|
| `arp` | Shows IPv4 local-link resolution. |
| `dns` | Shows name-resolution messages. |
| `tcp.flags.syn == 1` | Shows TCP connection attempts and SYN/ACK replies. |
| `tcp.analysis.retransmission` | Highlights likely retransmitted TCP segments. |

**Check:** What does a traceroute asterisk mean? **Answer:** No matching reply arrived for that probe; it does not by itself prove forwarding stopped there.

## Workbook completion test

For every objective, you should now be able to:

1. Explain the purpose without reading the chapter.
2. Interpret all three examples without the explanation column.
3. Name one similar-looking failure and the evidence that separates it.
4. Perform the matching lab safely and record before/after evidence.
5. Explain why a successful low-layer test does not automatically prove the application.
