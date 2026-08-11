<div dir="rtl" align="right">

# برگه مرجع پورت‌ها و پروتکل‌ها

پورت پیش‌فرض را با الزام اشتباه نگیرید. Server می‌تواند روی پورت دیگری Listen کند و Firewall باید مطابق طراحی واقعی باشد.

| سرویس | پورت | Transport | کاربرد | انتخاب امن/نکته |
|---|---:|---|---|---|
| FTP data/control | 20/21 | TCP | انتقال فایل قدیمی | SFTP/FTPS؛ Active/Passive را تفکیک کنید |
| SSH/SFTP | 22 | TCP | مدیریت/فایل امن | Key، MFA/AAA، ACL |
| Telnet | 23 | TCP | CLI متن واضح | SSH |
| SMTP relay | 25 | TCP | Mail server-to-server | STARTTLS Policy و ضدSpam |
| DNS | 53 | UDP/TCP | نام و Zone | هر دو Transport؛ DNSSEC/DoT/DoH مفاهیم جدا |
| DHCPv4 | 67/68 | UDP | Server/Client config | Snooping، Relay و Rogue detection |
| TFTP | 69 | UDP | فایل ساده/Boot | بدون امنیت ذاتی؛ Management network |
| HTTP | 80 | TCP | وب | Redirect به HTTPS پس از طراحی |
| NTP | 123 | UDP | زمان | Peer محدود، NTS در صورت پشتیبانی |
| SNMP | 161/162 | UDP | Poll/Trap | SNMPv3 auth+privacy |
| LDAP | 389 | TCP/UDP | Directory | StartTLS/LDAPS و Certificate معتبر |
| HTTPS | 443 | TCP | HTTP روی TLS | HTTP/3 از QUIC/UDP 443 استفاده می‌کند |
| SMB | 445 | TCP | فایل/چاپ | Segment، Sign/encrypt و Patch |
| Syslog | 514 | UDP | Log سنتی | انتقال امن/قابل‌اعتماد طبق Platform |
| SMTP submission | 587 | TCP | ارسال Mail Client | Authentication + STARTTLS |
| LDAPS | 636 | TCP | LDAP داخل TLS | Chain/نام Certificate |
| SQL Server | 1433 | TCP | Database | فقط App zone، TLS، Account محدود |
| RDP | 3389 | TCP/UDP | Desktop remote | پشت VPN/Gateway با MFA، نه اینترنت باز |
| SIP | 5060/5061 | UDP/TCP/TLS | Signaling VoIP | RTP Media جدا؛ 5061 معمولاً TLS |

## پروتکل‌های IP مهم بدون Port TCP/UDP

| پروتکل | کار | نکته |
|---|---|---|
| ICMP/ICMPv6 | خطا، Echo، PMTUD و ND در IPv6 | Block کامل می‌تواند شبکه را خراب کند |
| GRE | Tunnel/Encapsulation | Encryption ندارد |
| IPsec AH | Integrity/authentication | Payload را محرمانه نمی‌کند، NAT دشوارتر |
| IPsec ESP | Encryption و معمولاً Integrity | رایج‌ترین بخش Data plane IPsec |
| IKE/IKEv2 | مذاکره Key/SA | معمولاً UDP 500؛ NAT-T روی UDP 4500 |

## فلش‌کارت‌های سریع

- File امن روی SSH: **SFTP 22**، نه FTPS.
- Directory امن مستقیم: **LDAPS 636**؛ LDAP با StartTLS می‌تواند 389 بماند.
- SNMP Manager از **161** می‌خواند؛ Trap به **162** می‌رود.
- DHCP Server **67** و Client **68**.
- DNS UDP و TCP **53**؛ «DNS همیشه UDP است» غلط است.
- Syslog Severity **0 شدیدترین** و **7 Debug**.

</div>
