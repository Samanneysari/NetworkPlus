# Ports and Protocols Reference

A default port is not a requirement. A service can listen elsewhere, and firewall policy must match the real design.

| Service | Port | Transport | Purpose | Security note |
|---|---:|---|---|---|
| FTP data/control | 20/21 | TCP | Legacy file transfer | Prefer SFTP or properly configured FTPS |
| SSH/SFTP | 22 | TCP | Secure administration/file transfer | Use keys, MFA/AAA, and management ACLs |
| Telnet | 23 | TCP | Clear-text CLI | Replace with SSH |
| SMTP relay | 25 | TCP | Server-to-server mail | Use appropriate TLS policy and anti-abuse controls |
| DNS | 53 | UDP/TCP | Names and zone data | Both transports matter; DNSSEC and DoH/DoT solve different problems |
| DHCPv4 | 67/68 | UDP | Server/client configuration | Use relay, Snooping, and rogue-server detection |
| TFTP | 69 | UDP | Simple transfer/boot | No built-in security; isolate it |
| HTTP | 80 | TCP | Web without TLS | Move sensitive services to HTTPS |
| NTP | 123 | UDP | Time synchronization | Restrict peers; use NTS when supported |
| SNMP | 161/162 | UDP | Poll/trap | Prefer SNMPv3 auth and privacy |
| LDAP | 389 | TCP/UDP | Directory access | Protect with StartTLS or use LDAPS where appropriate |
| HTTPS | 443 | TCP | HTTP over TLS | HTTP/3 uses QUIC over UDP 443 |
| SMB | 445 | TCP | File/print sharing | Segment, patch, sign/encrypt as required |
| Syslog | 514 | UDP | Traditional event transport | Use secure/reliable transport where the platform supports it |
| SMTP submission | 587 | TCP | Authenticated client mail | Commonly uses STARTTLS |
| LDAPS | 636 | TCP | LDAP inside TLS | Validate certificate chain and hostname |
| SQL Server | 1433 | TCP | Database | Restrict to application zones and use TLS |
| RDP | 3389 | TCP/UDP | Remote desktop | Place behind VPN/gateway with MFA |
| SIP | 5060/5061 | UDP/TCP/TLS | VoIP signaling | Media normally uses RTP; 5061 commonly means TLS |

## Important IP protocols without TCP/UDP ports

| Protocol | Purpose | Important note |
|---|---|---|
| ICMP/ICMPv6 | Errors, echo, PMTUD, and IPv6 ND | Blocking all ICMP can break networking |
| GRE | Encapsulation/tunneling | No encryption by itself |
| IPsec AH | Integrity/authentication | No payload confidentiality; NAT complications |
| IPsec ESP | Encryption and usually integrity | Common IPsec data protection |
| IKE/IKEv2 | Negotiates keys and security associations | UDP 500; NAT-T commonly UDP 4500 |

## Quick memory checks

- Secure file transfer over SSH: **SFTP 22**, not FTPS.
- Direct TLS directory service: **LDAPS 636**; LDAP with StartTLS can remain on 389.
- SNMP poll: **161**; trap: **162**.
- DHCP server: **67**; client: **68**.
- DNS uses both UDP and TCP **53**.
- Syslog severity **0 is most severe** and **7 is Debug**.
