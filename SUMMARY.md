<div dir="rtl" align="right">

# خلاصه نهایی Network+ N10-009

این فایل برای مرور پس از مطالعه است، نه جایگزین درس. اگر دلیل یک خط را نمی‌دانید، به فصل اصلی برگردید.

## مسیر یک درخواست وب

1. URL به Scheme، Host، Port و Path تجزیه می‌شود.
2. Cache/hosts سپس Recursive DNS، Root، TLD و Authoritative بررسی می‌شوند.
3. Client تصمیم Local/remote می‌گیرد و MAC Gateway را با ARP/ND می‌یابد.
4. Ethernet frame به Switch و IP packet به Router می‌رود؛ Route با Longest prefix انتخاب می‌شود.
5. NAT/PAT در مرز ممکن است Source IP/port را ترجمه کند.
6. TCP سه‌مرحله‌ای یا QUIC آغاز می‌شود.
7. TLS الگوریتم/Key را توافق و Certificate/نام را Validate می‌کند.
8. HTTP درخواست را می‌فرستد؛ LB/Proxy/Backend پاسخ می‌دهند.
9. Browser محتوا را Parse و Resourceهای دیگر را درخواست و Render می‌کند.

## هفت لایه در یک نگاه

| لایه | وظیفه | شناسه/PDU | نمونه |
|---:|---|---|---|
| 7 Application | سرویس کاربر | Data | HTTP، DNS، DHCP، SMTP |
| 6 Presentation | نمایش، رمز/فشرده‌سازی | Data | Encoding، TLS به‌صورت مفهومی |
| 5 Session | ایجاد/حفظ گفت‌وگو | Data | Session/checkpoint |
| 4 Transport | Port، قابلیت اطمینان/سرعت | Segment/datagram | TCP، UDP |
| 3 Network | Route میان شبکه‌ها | Packet، IP | IPv4/IPv6، Router |
| 2 Data Link | Delivery محلی | Frame، MAC | Ethernet، VLAN، Switch |
| 1 Physical | Signal و Media | Bits | مس، فیبر، RF |

ترتیب TCP: SYN، SYN-ACK، ACK. ترتیب بستن معمولی: FIN، ACK، FIN، ACK. UDP ACK/ترتیب ذاتی ندارد. TLS 1.3: ClientHello، ServerHello، پیام‌های رمز‌شده Server و Certificate/Finished، Finished Client، Application data.

## عددهایی که باید بدانید

- وزن دامنه‌ها: مفاهیم ۲۳٪، پیاده‌سازی ۲۰٪، عملیات ۱۹٪، امنیت ۱۴٪، عیب‌یابی ۲۴٪.
- Syslog: 0 شدیدترین/Emergency تا 7 Debug.
- RFC1918: `10/8`، `172.16/12`، `192.168/16`.
- APIPA: `169.254/16`؛ Loopback IPv4: `127/8`.
- Documentation: `192.0.2/24`، `198.51.100/24`، `203.0.113/24`؛ IPv6 `2001:db8::/32`.
- پورت‌ها در [برگه پورت](appendices/ports-protocols.md).

## تصمیم‌های مهم

| نیاز | انتخاب نخستین برای مقایسه |
|---|---|
| فایل روی شبکه | NAS |
| Block storage | SAN |
| Policy خروجی کاربران | Forward proxy |
| حفاظت/توزیع ورودی وب | Reverse proxy / Load balancer |
| مسیر افزونه Gateway | FHRP/VIP |
| چند VLAN روی لینک | 802.1Q trunk |
| چند لینک منطقی یکجا | LACP/LAG |
| جلوگیری Loop L2 | STP/RSTP |
| WAN چندTransport با Policy مرکزی | SD-WAN |
| L2 overlay روی L3 | VXLAN |
| Cloud growth خودکار بالا/پایین | Elasticity |
| Route خاص‌تر | Longest prefix |
| منبع Route یک Prefix | AD |
| بهترین Route همان Protocol | Metric |

## Switching و Wireless

Switch Source MAC را یاد و Destination را Lookup می‌کند؛ Unknown/Broadcast را در VLAN Flood می‌کند. Trunk Tag 802.1Q دارد و Native دو سمت باید مطابق باشد. STP Root، Root port و Designated/Alternate می‌سازد. PortFast فقط Edge و BPDU Guard کنار آن.

Wi-Fi رسانه مشترک است. Channel width بیشتر ظرفیت بالقوه و تداخل بیشتر می‌دهد. 2.4 GHz در بسیاری نواحی 1/6/11 با 20MHz؛ مقررات محلی مقدم. 5GHz Channel بیشتر/DFS احتمالی، 6GHz Client و WPA3 سازگار می‌خواهد. SSID نام، BSSID Cell/Radio و SNR کیفیت Signal نسبت به Noise است.

## عملیات

- مستند فیزیکی: Rack/کابل/Port؛ منطقی: VLAN/Subnet/Route/Zone.
- Change: دلیل، Scope، Risk، Approval، Steps، Backup، Rollback، Success و Update سند.
- SNMP v3 بر v2c؛ Poll و Trap مکمل.
- Flow خلاصه مکالمه، Capture Packet کامل‌تر و حساس‌تر.
- RPO مقدار داده ازدست‌رفته؛ RTO زمان بازگشت؛ MTTR تعمیر؛ MTBF فاصله خرابی.
- DHCP DORA و Relay برای عبور از Router.
- DNS: A IPv4، AAAA IPv6، CNAME Alias، MX Mail، TXT Policy/Verification، NS Authority، SOA Zone metadata، PTR Reverse.
- rDNS IPv4 زیر `in-addr.arpa`؛ FCrDNS یعنی PTR و A/AAAA هم‌خوان.
- DNSSEC صحت/مبدأ، نه محرمانگی؛ DoH/DoT رمز مسیر Client-resolver.
- NTP زمان عمومی، PTP دقت محلی، NTS امنیت NTP.

## امنیت

Threat عامل، Vulnerability ضعف، Exploit روش سوءاستفاده، Risk احتمال×اثر. CIA: محرمانگی، صحت، دسترس‌پذیری. AAA: احراز، مجوز و ثبت. Least privilege، MFA مستقل، Patch، Segmentation و Log پایه‌اند.

| حمله | دفاع‌های کلیدی |
|---|---|
| DDoS | CDN/Anycast، Rate limit، Scrubbing، ظرفیت/Runbook |
| VLAN hopping | Access ثابت، DTP خاموش، Native بلااستفاده، Allowed محدود |
| MAC flooding | Port security، 802.1X، Monitoring |
| ARP spoofing | DHCP Snooping+DAI، TLS، Segmentation |
| Rogue DHCP | Snooping، trusted uplink |
| Evil twin | WPA2/3-Enterprise، Validation Certificate، WIDS |
| DNS poisoning | Resolver امن، DNSSEC، Recursion محدود |
| Malware | Patch/EDR، Least privilege، Segmentation، immutable backup |

ACL: بالا به پایین، First match و Implicit deny. Source/Destination/Protocol/Port/Direction/Interface را بنویسید. NAT و VLAN به‌تنهایی Firewall نیستند.

## عیب‌یابی

1. مشکل/Scope و تغییر اخیر؛
2. Theory محتمل؛
3. Test کم‌خطر؛
4. Plan/approval/rollback؛
5. اجرا؛
6. Verify کامل؛
7. Document.

| نشانه | نخستین ناحیه |
|---|---|
| Link down | Power/cable/optic/port |
| CRC افزایشی | Physical/duplex |
| `169.254.x.x` | DHCP path/pool/server |
| IP کار می‌کند، نام نه | DNS |
| TCP timeout | Route/ACL/server/return path |
| Refused | Host رسیده، Port Listen/accept نیست |
| TLS name error | SNI/SAN/Certificate/URL |
| 502/503 | Proxy/backend/capacity |
| MAC flapping/broadcast | Loop/STP |
| Voice شکسته | Jitter/loss/queue/Wi-Fi retry |

Bandwidth ظرفیت، Throughput واقعی، Goodput Payload مفید، Latency تأخیر، Jitter تغییر تأخیر، Loss گم‌شدن Packet. Baseline و Counter delta از Snapshot بهترند.

## چک‌لیست آمادگی

- می‌توانم مسیر DNS تا TLS/HTTP را بدون نگاه توضیح دهم.
- از روی Capture لایه‌ها و Handshake را پیدا می‌کنم.
- Subnetting را در زمان محدود دستی حل می‌کنم.
- جدول MAC/ARP/Route و ACL counter را می‌خوانم.
- VLAN/Trunk/STP/LACP/NAT/DHCP/DNS را در Lab ساخته و خراب کرده‌ام.
- برای Security سناریو چند کنترل و Trade-off می‌گویم.
- ۲۰۰ سؤال را حل و علت گزینه غلط را توضیح داده‌ام.
- Lab نهایی را با Evidence، Rollback و گزارش کامل انجام داده‌ام.

</div>
