# Chapter 5 — Network Security

Security is not one product or one command. It is continuous risk reduction through technical, administrative, and physical controls. Use defensive examples only on systems you own or are explicitly authorized to test.

## 4.1 — Security concepts

### Core terms

| Term | Plain-English definition | Example |
|---|---|---|
| Asset | Something valuable | Customer data, router, reputation |
| Threat | A potential harmful actor or event | Attacker, fire, human error |
| Vulnerability | A weakness that can be used | Old firmware or default password |
| Exploit | A method/code that uses a vulnerability | Crafted request that executes code |
| Risk | Likelihood and impact of harm | Service loss after compromise |
| Control/mitigation | Reduces likelihood or impact | Patch, MFA, segmentation, backup |

A qualitative model is `risk ≈ likelihood × impact`. A published vulnerability score is not the complete risk to your organization. Exposure, asset value, existing controls, and exploitability matter. Risk may be mitigated, transferred, avoided, or formally accepted.

### CIA triad

- **Confidentiality:** only authorized identities can read data.
- **Integrity:** unauthorized changes are prevented or detected.
- **Availability:** services remain usable when required.

Controls can create trade-offs. Encryption without capacity planning can hurt availability; availability without access control can destroy confidentiality.

### Encryption in transit and at rest

TLS, IPsec, and SSH can protect data in transit. Disk, database, and object encryption protect data at rest. Encryption depends on key management: secure generation, storage, access, rotation, backup, revocation, and destruction.

If a key is stored next to the data with the same permissions, protection is limited.

### Certificates and PKI

A certificate binds identity to a public key. A PKI includes root and intermediate CAs, validation/registration, certificate repositories, revocation methods such as CRL/OCSP, and policy.

During TLS validation, a client normally checks:

1. The chain reaches a trusted root.
2. Signatures are correct.
3. The certificate is currently valid.
4. The destination name appears in SAN.
5. Key usage permits the operation.
6. Revocation is handled according to policy.

A self-signed certificate is not automatically weak cryptography, but its trust is not distributed by a public or enterprise CA. Disabling validation to hide an error creates an on-path attack opportunity.

### IAM and AAA

Identification claims an identity. Authentication proves it. Authorization determines permissions. Accounting records actions.

| Technology | Common role |
|---|---|
| MFA | Uses two or more independent factor types |
| SSO | One login for several services; creates a critical central dependency |
| RADIUS | Network/VPN/802.1X AAA, commonly combines authentication and authorization |
| TACACS+ | Device administration with separated AAA functions and protected payload |
| LDAP | Directory-access protocol, not itself the directory or SSO |
| SAML | Assertion-based federation, commonly for web SSO |
| Time-based authentication | Short-lived OTP; accurate time is required |

Two passwords are not MFA because both are knowledge factors. MFA must also resist push fatigue, phishing, and weak recovery.

Least privilege grants only what is needed. Role-Based Access Control assigns permissions through job roles. Review access regularly and define joiner, mover, leaver, temporary-account, and break-glass procedures. Geofencing is a contextual signal, not a reliable single authentication factor.

### Physical security and deception

Locks, badges, cameras, mantraps, tamper seals, guards, visitor logs, and secure disposal protect physical assets. Cameras need correct placement, retention, time synchronization, and a response process.

A honeypot is a decoy system; a honeynet is a decoy network. Isolate and monitor them so an intruder cannot use them to attack other systems. Deception does not replace patching or segmentation.

### Compliance and audit

- **Data locality/residency:** where data is stored and processed.
- **PCI DSS:** security standard for payment-card data environments.
- **GDPR:** legal framework for personal-data protection within its scope.

Compliance is a minimum obligation within a defined scope. It is not proof that every security risk is controlled. Audits need repeatable evidence, owners, and remediation.

### Segmentation

| Environment | Typical risk | Approach |
|---|---|---|
| IoT | Limited patching and unmanaged behavior | Inventory, separate VLAN, limited egress |
| IIoT | Industrial devices with high availability needs | Safety-aware change control and isolation |
| ICS/SCADA | Controls and monitors processes | Zones/conduits and tightly controlled changes |
| OT | Physical operational technology | Safety, legacy-protocol, and availability focus |
| Guest | Untrusted non-corporate devices | Internet-only policy and client isolation |
| BYOD | Personally owned endpoint | NAC/MDM, privacy policy, and limited access |

A VLAN alone is not complete segmentation. Inter-VLAN ACLs or firewalls, routing, identity, and monitoring enforce the boundary.

## 4.2 — Attacks and indicators

This section teaches recognition and defense, not attack execution.

### DoS and DDoS

Denial of service consumes bandwidth, connection state, CPU, memory, or application resources. Distributed DoS uses many sources. Defenses include CDN/Anycast, rate limiting, SYN protection, WAF, capacity, autoscaling, ISP coordination, scrubbing, and a tested runbook.

### VLAN hopping

An attacker attempts to reach another VLAN through dynamic trunk negotiation or tagging behavior. Defenses include static access mode, disabling DTP, using an unused native VLAN, restricting allowed VLANs, keeping users off VLAN 1, and patching devices.

### MAC flooding

Excess source MAC addresses can pressure the switch MAC table and increase unknown-unicast flooding. Use port security, 802.1X, MAC limits, storm controls, and monitoring. Modern switch behavior varies; saying every switch simply becomes a hub is inaccurate.

### ARP poisoning/spoofing

ARP has no built-in authentication. A false reply can map the gateway IP to an attacker's MAC, creating on-path interception or denial. Defenses include DHCP Snooping plus Dynamic ARP Inspection, segmentation, TLS/SSH, and alerts for MAC changes.

### DNS poisoning/spoofing

A false DNS answer or poisoned resolver cache directs a name to the wrong address. Use patched resolvers, transaction randomization, DNSSEC validation, restricted recursion, approved DoH/DoT policy, and monitoring of authoritative changes.

### Rogue services and evil twins

- **Rogue DHCP:** gives a malicious gateway or DNS server; defend with DHCP Snooping.
- **Rogue AP:** unauthorized access point connected to the network; defend with inventory, NAC, switch controls, and wireless IDS.
- **Evil twin:** an AP imitating a trusted SSID; enterprise Wi-Fi with correct server-certificate validation greatly reduces the risk.

Hidden SSIDs and MAC filtering are not strong defenses.

### On-path attacks

An attacker observes or modifies traffic between peers through ARP, wireless, DNS, or routing manipulation. Validated TLS, VPNs, secure protocols, certificate validation, and network controls reduce impact. Never ignore a certificate warning without investigating the cause.

### Social engineering

| Attack | Description | Example control |
|---|---|---|
| Phishing | Deceptive message seeking credentials or execution | Phishing-resistant MFA, filtering, training, easy reporting |
| Dumpster diving | Retrieving discarded information | Shredding and controlled disposal |
| Shoulder surfing | Observing screens or secrets | Privacy screens and controlled workspace |
| Tailgating | Following an authorized person inside | Badges, mantraps, guards, and training |

### Malware

Viruses attach to files, worms self-propagate, Trojans appear legitimate, ransomware extorts, and spyware collects data. Use patching, EDR, application control, least privilege, segmentation, filtering, offline/immutable backups, and tested restores. A continuously connected backup can be encrypted with production data.

## 4.3 — Hardening and defensive features

### Device-hardening baseline

1. Record inventory and ownership.
2. Install a supported OS/firmware image and verify its signature.
3. Replace default passwords, communities, and certificates.
4. Disable unused services, protocols, and ports.
5. Use SSH/HTTPS, modern algorithms, AAA/MFA, and management ACLs.
6. Separate the management plane with a VLAN/VRF or out-of-band path.
7. Configure SNMPv3, trusted time, central logs, and audit.
8. Encrypt configuration backups and test restoration.
9. Protect the control plane with appropriate rate limits.
10. Monitor vulnerabilities and configuration drift.

Changing a management port may reduce automated noise but is not a primary security control.

### NAC and 802.1X

Network Access Control checks identity and sometimes device posture before or during access. It may assign a normal VLAN, restricted ACL, or quarantine network.

In 802.1X:

- **Supplicant:** endpoint software requesting access.
- **Authenticator:** switch or AP controlling the port.
- **Authentication server:** commonly RADIUS.

MAC Authentication Bypass helps devices without supplicants, but MAC addresses can be spoofed. Port security limits learned MAC addresses and defines a violation action.

### DHCP Snooping and DAI

DHCP Snooping accepts server messages only on trusted paths and builds IP-MAC-VLAN-port bindings. Dynamic ARP Inspection validates ARP against these bindings.

```cisco
ip dhcp snooping
ip dhcp snooping vlan 10,20,30
interface GigabitEthernet1/0/48
 description Uplink-to-DHCP-Relay
 ip dhcp snooping trust
interface range GigabitEthernet1/0/1-46
 ip dhcp snooping limit rate 20
ip arp inspection vlan 10,20,30
show ip dhcp snooping
show ip dhcp snooping binding
show ip arp inspection
```

| Line | Purpose |
|---|---|
| First line | Enables DHCP Snooping globally |
| VLAN line | Selects protected VLANs |
| Uplink interface | Selects the legitimate server/relay path |
| `trust` | Accepts DHCP server messages on that uplink |
| Edge range | Selects user-facing untrusted ports |
| Rate limit | Limits DHCP rate; tune for the real environment |
| ARP inspection | Enables DAI for selected VLANs |
| Show commands | Verify state, bindings, and ARP drops |

Trusting a user port defeats the defense. Failing to trust the true server/relay path breaks DHCP. Test static devices, voice, PXE, relay, and failover before production.

### ACL processing

An ACL is evaluated top to bottom. The first match wins, and an implicit deny exists at the end. A standard ACL mainly matches source address; an extended ACL can match source, destination, protocol, and ports. Traditional ACLs are stateless unless the platform adds stateful behavior.

```cisco
ip access-list extended USERS-TO-SERVERS
 remark Allow HTTPS to web server
 permit tcp 10.10.10.0 0.0.0.255 host 10.10.20.80 eq 443
 remark Allow DNS to approved resolver
 permit udp 10.10.10.0 0.0.0.255 host 10.10.20.53 eq 53
 permit tcp 10.10.10.0 0.0.0.255 host 10.10.20.53 eq 53
 deny ip 10.10.10.0 0.0.0.255 10.10.20.0 0.0.0.255 log
 permit ip 10.10.10.0 0.0.0.255 any
interface Vlan10
 ip access-group USERS-TO-SERVERS in
show access-lists USERS-TO-SERVERS
```

| Line | Purpose |
|---|---|
| ACL name | Creates a readable named extended ACL |
| Remarks | Document the reason for rules |
| HTTPS permit | Allows only TCP/443 to the web server |
| DNS permits | Allows both UDP and TCP DNS to the approved resolver |
| Deny/log | Blocks other user access to the server subnet and logs it |
| Final permit | Allows other destinations, such as Internet through a firewall; real policy may be stricter |
| `ip access-group` | Applies the ACL inbound on the user SVI |
| Show command | Displays rules and hit counters |

Before applying an ACL, preserve management, routing, DNS, DHCP, time, and return traffic. Logging every high-rate packet can overload CPU and storage.

### Filtering and zones

URL filtering controls destinations or categories. Content filtering inspects transferred content. TLS inspection introduces privacy, certificate, legal, and capacity concerns.

A trusted zone is not unlimited trust. An untrusted zone receives stricter controls. A screened subnet/DMZ isolates public services so compromise does not create a direct path to the internal LAN.

### Defense in depth for `www.realsam.ir`

1. Protect registrar and DNS accounts; use DNSSEC where appropriate.
2. Use CDN/DDoS protection and a WAF at the edge.
3. Use TLS 1.2/1.3 with a valid certificate and safe configuration.
4. Place the reverse proxy in a DMZ and expose only required ports.
5. Put backends in a separate zone accessible only from the proxy.
6. Put databases in another zone accessible only from the application.
7. Use secret management, patching, EDR, and file-integrity monitoring.
8. Centralize logs and maintain immutable, tested backups.
9. Permit administration only through VPN/jump host with MFA and tested emergency access.

## Incident-response basics

1. Validate the alert and determine scope.
2. Preserve time-synchronized evidence; do not power off systems without considering evidence loss.
3. Contain within authorization: quarantine, temporary rules, or credential revocation.
4. Eradicate the cause: patch, remove persistence, and correct configuration.
5. Recover from a trusted source and increase monitoring.
6. Notify stakeholders and legal/compliance roles according to the plan.
7. Record timeline, lessons, and corrective actions without blame.

## End-of-chapter exercises

1. Give two network controls for each CIA property.
2. Separate threat, vulnerability, exploit, and risk in an old-firmware scenario.
3. Design boundaries for guest, IoT, user, and server networks.
4. Extend the sample ACL for a secondary DNS server and NTP, then explain rule order.
5. Write a runbook for detecting rogue DHCP.
6. Inspect the certificate of an authorized test service and report chain, SAN, and expiry.
7. Design a ransomware tabletop that tests segmentation and backup restoration.
