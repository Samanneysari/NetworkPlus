<div dir="rtl" align="right">

# فصل ۲ — مفاهیم شبکه

این فصل دامنه‌ی ۱ آزمون N10-009 را، به‌جز مدل OSI که در [فصل قبل](01-osi-tcp-ip-tls.md) با جزئیات آمده است، پوشش می‌دهد. هدف فقط حفظ‌کردن واژه‌ها نیست؛ باید بتوانید برای یک نیاز واقعی ابزار، رسانه، آدرس و معماری مناسب را انتخاب کنید.

## ۱.۲ — تجهیزات، سرویس‌ها و کارکردهای شبکه

### روتر و سوئیچ چه فرقی دارند؟

سوئیچ لایه ۲ معمولاً فریم را با جدول MAC داخل یک LAN جابه‌جا می‌کند. روتر بسته را با جدول مسیریابی بین شبکه‌های IP می‌فرستد. سوئیچ لایه ۳ هر دو قابلیت را دارد و می‌تواند برای VLANها دروازه بسازد.

| جزء | کار اصلی | تصمیم بر اساس | نمونه کاربرد |
|---|---|---|---|
| Router | اتصال شبکه‌های IP | مقصد IP و جدول Route | اتصال LAN به اینترنت |
| Layer 2 switch | اتصال اعضای یک LAN/VLAN | MAC مقصد | اتصال رایانه‌ها به شبکه اداره |
| Layer 3 switch | Switching و Routing سریع | MAC و IP | مسیریابی میان VLANها |
| Firewall | اجازه یا رد ترافیک طبق Policy | آدرس، پورت، برنامه، هویت | جداکردن اینترنت از LAN |
| IDS | تشخیص و هشدار | امضا و رفتار | مشاهده حمله بدون مسدودسازی مستقیم |
| IPS | تشخیص و جلوگیری | امضا و رفتار | Drop کردن ترافیک مخرب در مسیر |
| Load balancer | پخش درخواست بین Backendها | سلامت، Session و الگوریتم | توزیع HTTPS میان چند وب‌سرور |
| Proxy | واسطه Client و مقصد | Policy، URL و Cache | کنترل وب‌گردی کاربران |
| NAS | فایل روی شبکه | SMB/NFS | پوشه اشتراکی و Backup |
| SAN | Block storage | iSCSI/FC | Disk برای Hypervisor یا Database |
| Access point | پل بی‌سیم به LAN | SSID، BSSID و Association | اتصال Wi-Fi |
| Wireless controller | مدیریت متمرکز APها | Policy و RF | WLAN سازمانی |

**Firewall با IDS/IPS:** فایروال نسل جدید می‌تواند با شناخت برنامه، کاربر، TLS و تهدید، امکانات IDS/IPS را هم داشته باشد. IDS معمولاً خارج از مسیر و فقط ناظر است؛ IPS در مسیر قرار می‌گیرد و می‌تواند بسته را Drop کند. قرار دادن IPS در مسیر، محافظت مستقیم ولی حساسیت بیشتر به خطای تشخیص دارد.

**Load balancer:** الگوریتم‌هایی مانند Round Robin، Least Connections یا Hash درخواست را انتخاب می‌کنند. Health Check باید سرور خراب را از Pool خارج کند. اگر TLS روی Load balancer خاتمه یابد، به آن TLS termination می‌گویند؛ مسیر تا Backend نیز در صورت نیاز باید دوباره رمز شود.

**Proxyها:** Forward proxy از طرف کاربر به اینترنت می‌رود؛ Reverse proxy از طرف سرورها درخواست ورودی را می‌گیرد. `proxy.realsam.ir` می‌تواند Forward proxy و `www.realsam.ir` پشت Reverse proxy باشد.

**NAS و SAN:** NAS فایل تحویل می‌دهد و Client فایل‌سیستم را می‌بیند؛ SAN بلوک خام تحویل می‌دهد و سیستم‌عامل روی آن فایل‌سیستم می‌سازد. Ethernet معمولی برای iSCSI و شبکه اختصاصی Fibre Channel برای FC رایج است.

### CDN، VPN، QoS و TTL

- **CDN:** نسخه Cacheشده محتوا را در نقطه‌ای نزدیک کاربر ارائه می‌کند؛ تأخیر و بار Origin کم می‌شود. DNS یا Anycast می‌تواند کاربر را به Edge مناسب ببرد.
- **VPN:** روی شبکه‌ای نامطمئن تونل رمز‌شده می‌سازد. VPN حریم مسیر را بهتر می‌کند، اما Endpoint آلوده را سالم نمی‌کند.
- **QoS:** ترافیک را Classify و Mark می‌کند و در ازدحام به صف‌های مهم‌تر اولویت می‌دهد. QoS پهنای‌باند خلق نمی‌کند.
- **TTL در IPv4 / Hop Limit در IPv6:** هر روتر مقدار را یک واحد کم می‌کند. در صفر، بسته حذف می‌شود تا حلقه بی‌پایان نشود. `traceroute` از همین رفتار کمک می‌گیرد.

## ۱.۳ — مفاهیم Cloud و Virtual Networking

### Virtualization و NFV

Hypervisor منابع یک میزبان را میان ماشین‌های مجازی تقسیم می‌کند. Containerها Kernel میزبان را به‌اشتراک می‌گذارند و معمولاً سبک‌ترند. **NFV** وظایفی مانند Router، Firewall یا Load balancer را به نرم‌افزار تبدیل می‌کند. مجازی‌بودن مسئولیت امنیت، ظرفیت و افزونگی را حذف نمی‌کند.

### VPC و کنترل‌های امنیتی

VPC یک شبکه منطقی جدا در Cloud است و معمولاً Subnet، Route table، Gateway و کنترل دسترسی دارد. نام دقیق قابلیت‌ها میان ارائه‌دهندگان فرق می‌کند:

- **Security group:** معمولاً Stateful است؛ پاسخ یک ارتباط مجاز خودکار پذیرفته می‌شود.
- **Network ACL:** معمولاً Stateless و در مرز Subnet است؛ مسیر رفت و برگشت جداگانه تعریف می‌شود.
- **Internet gateway:** اتصال منابع مجاز VPC به اینترنت.
- **NAT gateway:** خروج منابع Private بدون پذیرش مستقیم اتصال ورودی ناخواسته.
- **Cloud VPN:** تونل رمز‌شده روی اینترنت.
- **Direct connection:** پیوند اختصاصی سازمان تا Cloud؛ معمولاً قابل‌پیش‌بینی‌تر، ولی گران‌تر است. رمزنگاری را نباید بدون بررسی فرض کرد.

### مدل‌های استقرار و خدمت

| مدل | مفهوم | مسئولیت بیشتر مشتری |
|---|---|---|
| Public cloud | زیرساخت مشترک ارائه‌دهنده با جداسازی منطقی | داده، هویت و پیکربندی |
| Private cloud | Cloud مختص یک سازمان | زیرساخت تا برنامه، بسته به قرارداد |
| Hybrid cloud | اتصال Private/On-premises به Public | یکپارچگی، Route، هویت و Policy |
| SaaS | برنامه آماده | داده، کاربر و تنظیمات |
| PaaS | محیط اجرای مدیریت‌شده | کد، داده و تنظیم برنامه |
| IaaS | VM، شبکه و Disk | سیستم‌عامل، Patch و برنامه |

**Scalability** یعنی توان رشد ظرفیت؛ Vertical با بزرگ‌ترکردن یک ماشین و Horizontal با افزودن نمونه‌ها. **Elasticity** یعنی افزایش و کاهش خودکار ظرفیت بر حسب بار. **Multitenancy** یعنی چند مشتری از زیرساخت مشترک با جداسازی منطقی استفاده می‌کنند.

## ۱.۴ — پورت‌ها، پروتکل‌ها و نوع ترافیک

پورت منطقی، سرویس را در یک Host مشخص می‌کند. پورت `443` پریز فیزیکی نیست؛ عددی در Header TCP/UDP است. Client معمولاً یک Ephemeral port موقت انتخاب می‌کند و به Well-known port سرور وصل می‌شود.

| سرویس | پورت پیش‌فرض | انتقال | کاربرد و نکته |
|---|---:|---|---|
| FTP | 20/21 | TCP | داده/کنترل؛ رمزنگاری پیش‌فرض ندارد |
| SFTP / SSH | 22 | TCP | انتقال فایل روی SSH / مدیریت امن |
| Telnet | 23 | TCP | مدیریت متن ساده و ناامن |
| SMTP | 25 | TCP | انتقال Mail بین سرورها |
| DNS | 53 | UDP/TCP | Query عادی بیشتر UDP؛ پاسخ بزرگ/Zone transfer روی TCP |
| DHCPv4 | 67/68 | UDP | Server/Client |
| TFTP | 69 | UDP | انتقال ساده بدون امنیت ذاتی |
| HTTP | 80 | TCP | وب بدون TLS |
| NTP | 123 | UDP | همگام‌سازی زمان |
| SNMP | 161/162 | UDP | Poll/Trap؛ نسخه 3 امن‌تر است |
| LDAP | 389 | TCP/UDP | Directory؛ بدون TLS ذاتی |
| HTTPS | 443 | TCP و در HTTP/3، UDP | HTTP امن با TLS |
| SMB | 445 | TCP | اشتراک فایل/چاپ |
| Syslog | 514 | UDP | ثبت رویداد؛ TLS معمولاً روی پورت دیگری پیکربندی می‌شود |
| SMTP submission | 587 | TCP | ارسال Mail از Client، معمولاً STARTTLS |
| LDAPS | 636 | TCP | LDAP داخل TLS |
| SQL Server | 1433 | TCP | Microsoft SQL Server |
| RDP | 3389 | TCP/UDP | Remote Desktop |
| SIP | 5060/5061 | UDP/TCP / TLS | سیگنالینگ VoIP؛ Media معمولاً RTP است |

پورت پیش‌فرض الزام نیست؛ مدیر می‌تواند پورت را تغییر دهد. تغییر پورت، جای احراز هویت و Patch را نمی‌گیرد.

### پروتکل‌های بدون مفهوم Port

- **ICMP:** گزارش خطا و عیب‌یابی؛ `ping` از Echo استفاده می‌کند. مسدودکردن کامل آن می‌تواند Path MTU و عیب‌یابی را خراب کند.
- **GRE:** Encapsulation ساده برای تونل؛ به‌تنهایی رمزنگاری و صحت‌سنجی ندارد.
- **IPsec AH:** صحت و احراز اصالت، بدون محرمانگی Payload؛ با NAT سازگاری دشوارتری دارد.
- **IPsec ESP:** محرمانگی و معمولاً صحت؛ گزینه رایج IPsec.
- **IKE:** مذاکره همتا، الگوریتم و کلیدهای IPsec؛ IKEv2 معمولاً UDP 500 و با NAT-T روی UDP 4500 است.

### Unicast، Broadcast، Multicast و Anycast

| نوع | یک مبدأ به | مثال |
|---|---|---|
| Unicast | یک مقصد مشخص | SSH به یک سرور |
| Broadcast | همه اعضای Broadcast domain در IPv4 | DHCP Discover |
| Multicast | اعضای یک گروه | پخش کنترل‌شده و بعضی پروتکل‌های Routing |
| Anycast | نزدیک‌ترین/بهترین عضو از چند مقصد با یک IP | DNS و CDN توزیع‌شده |

IPv6 Broadcast ندارد و برای کارهای مشابه از Multicast استفاده می‌کند. Anycast معمولاً با Routing پیاده می‌شود، نه با تکثیر یک بسته برای همه مقصدها.

## ۱.۵ — رسانه انتقال، Transceiver و Connector

### مس در برابر فیبر

| ویژگی | Twisted-pair copper | Multimode fiber | Single-mode fiber |
|---|---|---|---|
| سیگنال | الکتریکی | نور، هسته بزرگ‌تر | نور، هسته کوچک‌تر |
| فاصله معمول | کوتاه‌تر | متوسط | بلند |
| EMI | حساس | مقاوم | مقاوم |
| هزینه | معمولاً کمتر | میانه | تجهیزات نوری معمولاً گران‌تر |
| کاربرد | میز کار و Access | ساختمان/Data center | Backbone و WAN |

حد دقیق فاصله به استاندارد Ethernet، سرعت، نوع کابل و Optic وابسته است؛ عددی را بدون ذکر استاندارد تعمیم ندهید.

### Categoryهای رایج مس

| Category | کاربرد معمول آموزشی | نکته |
|---|---|---|
| Cat 5e | 1GbE تا 100 متر Channel در شرایط استاندارد | کیفیت Termination حیاتی است |
| Cat 6 | 1GbE و 10GbE در فاصله کوتاه‌تر طبق نصب | Crosstalk و Bundle مهم‌اند |
| Cat 6A | 10GbE تا 100 متر Channel | ضخیم‌تر و مدیریت کابل مهم‌تر |
| Cat 7 | کابل Shielded تحت استانداردهای ISO/IEC | Connector/استاندارد نصب را بررسی کنید؛ نام بازاری کافی نیست |
| Cat 8 | 25/40GbE در Channel کوتاه Data center | برای Horizontal office عمومی طراحی اصلی نیست |

عدد ۱۰۰ متر معمولاً شامل ۹۰ متر Permanent link و Patch cordهاست. Tester ساده Wiremap، عملکرد کامل Category را تأیید نمی‌کند؛ Certification tester لازم است. Straight-through/Crossover تاریخی با جابه‌جایی Pairهای Tx/Rx مطرح بود؛ Auto-MDI/MDIX در تجهیزات مدرن معمولاً آن را خودکار می‌کند، ولی Objective عیب‌یابی هنوز TX/RX transposed را می‌سنجد.

### نام سرعت‌های Ethernet

| نام | سرعت | رسانه نمونه |
|---|---:|---|
| 100BASE-TX | 100 Mb/s | مس |
| 1000BASE-T | 1 Gb/s | مس |
| 1000BASE-SX/LX | 1 Gb/s | فیبر کوتاه/بلندتر طبق Optic |
| 10GBASE-T | 10 Gb/s | مس سازگار |
| 10GBASE-SR/LR | 10 Gb/s | MMF/SMF طبق Optic |
| 25/40/100GbE | سرعت‌های Data center/backbone | DAC یا Opticهای گوناگون |

در نام‌ها، `BASE` یعنی Baseband و بخش پایانی Media/reach را مشخص می‌کند؛ فاصله را از استاندارد و Datasheet همان Transceiver بخوانید.

**DAC/Twinax** کابل مسی کوتاه با Transceiver متصل است و در رک Data center کاربرد دارد. **Coaxial** رسانای مرکزی و Shield دارد و در Cable broadband یا سامانه‌های قدیمی دیده می‌شود. کابل **Plenum-rated** روکش کم‌دود/کم‌سم برای فضای عبور هوای ساختمان دارد و باید با مقررات محلی هماهنگ باشد.

### Wireless

- **802.11 Wi-Fi:** LAN بی‌سیم؛ Shared medium و Half-duplex عملی.
- **Cellular:** پوشش اپراتور و سلول‌ها؛ 4G/5G نمونه‌اند.
- **Satellite:** پوشش نقاط دور؛ فاصله زیاد می‌تواند Latency را بالا ببرد، به‌خصوص مدار زمین‌ثابت.

### Transceiver و Connector

SFP/SFP+/SFP28 و QSFPها ماژول‌هایی برای سرعت‌ها و فیبر/مس متفاوت‌اند. شکل یکسان سازگاری را تضمین نمی‌کند؛ Speed، wavelength، fiber type، reach و پشتیبانی Vendor باید مطابق باشند. Fibre Channel نیز Transceiver دارد، ولی پروتکل ذخیره‌سازی است و نباید هر Optic آن را Ethernet فرض کرد.

| اتصال | کاربرد متداول |
|---|---|
| RJ45 (نام رایج 8P8C) | Ethernet روی Twisted pair |
| RJ11 | تلفن/DSL |
| LC | فیبر کوچک و رایج در Transceiver |
| SC | فیبر Push-pull با اندازه بزرگ‌تر |
| ST | فیبر قفل چرخشی، بیشتر قدیمی |
| MPO/MTP | چند رشته فیبر در یک Connector |
| F-type | Coax تلویزیون/Cable modem |
| BNC | Coax قفل Bayonet، ابزار و شبکه‌های قدیمی |

هرگز به انتهای فیبر روشن نگاه نکنید؛ نور نامرئی می‌تواند به چشم آسیب بزند. از Dust cap و ابزار تمیزکاری مناسب استفاده کنید.

## ۱.۶ — Topology و جریان ترافیک

- **Star:** همه Endpointها به دستگاه مرکزی وصل‌اند. خرابی یک کابل فقط همان عضو؛ خرابی مرکز گسترده است.
- **Mesh:** چند مسیر میان گره‌ها؛ افزونگی خوب و هزینه/پیچیدگی بیشتر. Full mesh همه‌به‌همه و Partial mesh محدود است.
- **Hybrid:** ترکیب چند Topology.
- **Hub-and-spoke:** شعب به Hub مرکزی؛ ساده‌تر ولی Hub می‌تواند گلوگاه/نقطه خرابی باشد.
- **Point-to-point:** پیوند مستقیم دو نقطه.
- **Three-tier:** Access، Distribution و Core.
- **Collapsed core:** Distribution و Core در یک لایه؛ مناسب شبکه کوچک‌تر.
- **Spine-leaf:** هر Leaf به همه Spineها وصل است؛ مسیرهای هم‌طول و مناسب East-west در Data center.

**North-south traffic** میان Data center و بیرون است؛ **East-west** میان Workloadهای داخل Data center. این جهت‌ها جغرافیایی نیستند.

## ۱.۷ — IPv4 از صفر تا Subnetting

IPv4 سی‌ودو بیت و معمولاً چهار Octet ده‌دهی دارد. Prefix مشخص می‌کند چند بیت اول شبکه‌اند. در `192.0.2.10/24`، ۲۴ بیت شبکه و ۸ بیت Host است.

### دامنه‌های مهم

| نوع | محدوده | کاربرد |
|---|---|---|
| Private RFC1918 | `10.0.0.0/8` | شبکه داخلی |
| Private RFC1918 | `172.16.0.0/12` | شبکه داخلی |
| Private RFC1918 | `192.168.0.0/16` | شبکه داخلی |
| APIPA/Link-local | `169.254.0.0/16` | انتخاب خودکار هنگام نبود DHCP؛ Route نمی‌شود |
| Loopback | `127.0.0.0/8` | خود Host؛ معمولاً `127.0.0.1` |
| Documentation | `192.0.2.0/24`، `198.51.100.0/24`، `203.0.113.0/24` | مثال امن در مستندات |

Private مساوی امن نیست؛ Firewall و کنترل دسترسی همچنان لازم است. برای دسترسی اینترنت معمولاً NAT/PAT انجام می‌شود. Public IP نیز ممکن است پشت Firewall باشد.

### محاسبه Subnet مرحله‌به‌مرحله

مسئله: `192.0.2.77/27` در چه Subnetی است؟

1. `/27` یعنی ۵ بیت Host.
2. تعداد کل آدرس‌ها برابر `2^5 = 32` است.
3. گام Subnet در Octet آخر ۳۲ است: ۰، ۳۲، ۶۴، ۹۶ و ... .
4. عدد ۷۷ میان ۶۴ و ۹۵ است.
5. Network برابر `192.0.2.64` و Broadcast برابر `192.0.2.95` است.
6. بازه Host معمولی `192.0.2.65` تا `192.0.2.94` و تعداد آن ۳۰ است.

فرمول معمول Hostهای قابل‌استفاده `2^h - 2` است؛ `/31` در پیوند Point-to-point استثنا و `/32` یک Host route است.

**CIDR** وابستگی Prefix به Class قدیمی را برداشت. **VLSM** اجازه می‌دهد داخل یک طرح از Prefixهای متفاوت استفاده کنیم تا آدرس هدر نرود. Class A/B/C برای تاریخچه و سؤال آزمون مهم است، ولی Routing مدرن Classless است؛ D و E به‌ترتیب Multicast و Experimental/Reserved شناخته می‌شوند.

## ۱.۸ — شبکه مدرن

### IPv6 از صفر

IPv6 صدوبیست‌وهشت بیت دارد و به هشت گروه Hex شانزده‌بیتی نوشته می‌شود. صفرهای ابتدای هر گروه حذف و فقط یک‌بار می‌توان طولانی‌ترین زنجیره گروه‌های صفر را با `::` فشرده کرد.

</div>

<div dir="ltr" align="left">

```text
2001:0db8:0000:0000:0000:0000:0000:0080
2001:db8::80
```

</div>

<div dir="rtl" align="right">

دو خط یک آدرس‌اند. Prefix رایج LAN برابر `/64` است؛ ۶۴ بیت Network و ۶۴ بیت Interface identifier. نوع‌های مهم:

| نوع | محدوده/نمونه | کاربرد |
|---|---|---|
| Global unicast | معمولاً `2000::/3` | Route عمومی؛ Documentation=`2001:db8::/32` |
| Link-local | `fe80::/10` | ارتباط همان Link، ND و Default gateway؛ Router آن را Forward نمی‌کند |
| Unique local | `fc00::/7`، معمولاً `fd...` | شبکه خصوصی‌مانند، ولی NAT الزام/هدف نیست |
| Loopback | `::1/128` | خود Host |
| Unspecified | `::/128` | هنوز آدرس مشخص نیست؛ مقصد معتبر عادی نیست |
| Multicast | `ff00::/8` | Group؛ IPv6 Broadcast ندارد |
| Anycast | آدرس Unicast روی چند Interface | Routing نزدیک‌ترین/بهترین را انتخاب می‌کند |

Neighbor Discovery با ICMPv6 کارهای ARP، Router discovery و Duplicate Address Detection را انجام می‌دهد. Link-local یکسان روی Interfaceهای مختلف ممکن است وجود داشته باشد، پس در فرمان مقصدی مانند `fe80::1%eth0` Zone/interface لازم است.

SLAAC Interface identifier را از روش Privacy/random یا الگوریتم‌هایی مانند Modified EUI-64 می‌سازد. در Modified EUI-64، MAC 48-bit با افزودن `ff:fe` و تغییر بیت U/L به 64-bit تبدیل می‌شد؛ Privacy addressها برای جلوگیری از Tracking رایج‌ترند. حفظ‌کردن EUI-64 نباید باعث فرض شود همه Clientهای جدید از MAC آدرس می‌سازند.

### SDN و SD-WAN

SDN کنترل منطقی را از Forwarding جدا و Policy را متمرکز می‌کند. Controller دید مرکزی دارد و دستگاه‌ها طبق Rule بسته را می‌فرستند. SD-WAN این ایده را برای WAN به‌کار می‌گیرد:

- **Application-aware:** مسیر بر اساس نوع برنامه و SLA انتخاب می‌شود.
- **Zero-touch provisioning:** دستگاه شعبه با کمترین تنظیم محلی Policy می‌گیرد.
- **Transport agnostic:** MPLS، Broadband و Cellular می‌توانند هم‌زمان Underlay باشند.
- **Central policy management:** Policy از مرکز تعریف و توزیع می‌شود.

Controller نقطه حساس است و باید افزونه، امن و قابل‌دسترسی طراحی شود.

### VXLAN و DCI

VXLAN فریم لایه ۲ را داخل UDP روی شبکه لایه ۳ حمل می‌کند و با شناسه ۲۴ بیتی VNI دامنه‌های بیشتری از VLAN می‌دهد. VTEP عمل Encapsulation/Decapsulation را انجام می‌دهد. **Data Center Interconnect** اتصال امن و دارای ظرفیت میان Data centerهاست؛ کش‌دادن لایه ۲ فقط در صورت نیاز و با شناخت Failure domain انجام می‌شود.

### ZTA، SASE و SSE

- **Zero Trust Architecture:** به مکان شبکه اعتماد دائمی نمی‌کند؛ هویت، وضعیت دستگاه، کمترین دسترسی و ارزیابی پیوسته مهم‌اند.
- **SSE:** مجموعه خدمات امنیتی Cloud مانند Secure Web Gateway، CASB و ZTNA.
- **SASE:** قابلیت‌های WAN و SSE را به‌صورت Cloud-delivered نزدیک کاربر ترکیب می‌کند.

Zero Trust یک محصول واحد نیست و جمله «هرگز اعتماد نکن» به معنی سؤال‌کردن رمز در هر بسته نیست؛ تصمیم دسترسی با Context و Session کنترل می‌شود.

### Infrastructure as Code

IaC وضعیت مطلوب شبکه را در فایل قابل نسخه‌بندی تعریف می‌کند. مزایا: تکرارپذیری، Review، Audit و Rollback. Secret نباید داخل Git ذخیره شود. Pipeline باید Syntax، Policy و تغییر برنامه‌ریزی‌شده را قبل از Production آزمایش کند.

### چالش IPv6 و راه‌های گذار

IPv4 محدود است؛ IPv6 فضای آدرس بزرگ‌تر و Neighbor Discovery دارد. راهکارهای گذار:

- **Dual stack:** اجرای هم‌زمان IPv4 و IPv6؛ روشن ولی نیازمند مدیریت هر دو.
- **Tunneling:** حمل یک پروتکل داخل دیگری؛ MTU و پیچیدگی را در نظر بگیرید.
- **NAT64 + DNS64:** Client فقط IPv6 را به مقصد IPv4 می‌رساند؛ با بعضی برنامه‌های دارای IPv4 literal مشکل دارد.

IPv6 به‌صورت خودکار امن‌تر نیست؛ Firewall، Patch، Monitoring و دانش تیم برای هر دو Stack لازم است.

### نسل‌های رایج Wi-Fi برای تطبیق نام‌ها

| IEEE | نام بازاری | باند اصلی | نکته |
|---|---|---|---|
| 802.11a | Wi-Fi قدیمی | 5 GHz | قدیمی، OFDM |
| 802.11b/g | Wi-Fi قدیمی | 2.4 GHz | سرعت/سازگاری قدیمی می‌تواند Airtime را مصرف کند |
| 802.11n | Wi-Fi 4 | 2.4/5 GHz | MIMO و Channel bonding |
| 802.11ac | Wi-Fi 5 | 5 GHz | Channel عریض و MU-MIMO در نسل‌ها |
| 802.11ax | Wi-Fi 6/6E | 2.4/5 و برای 6E، 6 GHz | OFDMA، کارایی بهتر محیط متراکم |
| 802.11be | Wi-Fi 7 | 2.4/5/6 GHz | Multi-Link و Channel عریض در تجهیزات سازگار |

حداکثر تبلیغ‌شده با Throughput واقعی برابر نیست و به تعداد Spatial stream، Channel width، Modulation، Signal، Client و مقررات بستگی دارد.

## جمع‌بندی تشخیصی

| اگر سؤال می‌گوید... | ابتدا به این فکر کنید |
|---|---|
| نزدیک‌کردن محتوای وب به کاربر | CDN |
| Block storage برای Hypervisor | SAN |
| فایل اشتراکی ساده | NAS |
| چند مسیر مساوی در Data center | Spine-leaf |
| رشد و کاهش خودکار Cloud | Elasticity |
| خط‌مشی WAN مرکزی و چند Underlay | SD-WAN |
| حمل Layer 2 روی Layer 3 | VXLAN |
| کمترین اعتماد بر اساس هویت/وضعیت | ZTA |
| Client بدون DHCP و آدرس `169.254.x.x` | APIPA و مشکل DHCP |

## تمرین پایان فصل

1. برای دفتر ۴۰ نفره، نقش Router، Switch، AP، Firewall و NAS را در یک جمله بنویسید.
2. تفاوت Stateful security group و Stateless ACL را با مسیر برگشت توضیح دهید.
3. مشخص کنید کدام سرویس‌های جدول پورت به‌صورت پیش‌فرض متن واضح یا فاقد احراز هویت امن‌اند.
4. شبکه، Broadcast و Host range آدرس `198.51.100.141/28` را حساب کنید.
5. برای ارتباط دو Data center بگویید چرا «فقط کش‌دادن VLAN» ممکن است خطرناک باشد.
6. بین Dual stack و NAT64 برای یک شبکه تازه، مزایا و محدودیت‌ها را مقایسه کنید.

پاسخ تشریحی تمرین‌ها در [پاسخ‌نامه](../practice/answers.md) و تمرین بیشتر در [کارگاه Subnetting](../practice/subnetting.md) قرار دارد.

</div>
