<div dir="rtl" align="right">

# فصل ۵ — امنیت شبکه

امنیت یک محصول یا یک تنظیم نیست؛ فرایند کاهش Risk با کنترل‌های انسانی، فنی و فیزیکی است. این فصل دامنه ۴ آزمون N10-009 را پوشش می‌دهد. مثال‌های دفاعی را فقط روی سامانه‌ای که مالک آن هستید یا اجازه صریح دارید اجرا کنید.

## ۴.۱ — مفاهیم و روش‌های امنیتی

### واژه‌های پایه

| واژه | تعریف ساده | مثال |
|---|---|---|
| Asset | چیزی که ارزش دارد | داده مشتری، Router، اعتبار سازمان |
| Threat | عامل/رویداد بالقوه آسیب | مهاجم، آتش‌سوزی، خطای انسانی |
| Vulnerability | ضعف قابل‌استفاده | Firmware قدیمی، Password پیش‌فرض |
| Exploit | روش/کدی که از ضعف استفاده می‌کند | ورودی ساخته‌شده برای اجرای کد |
| Risk | احتمال و اثر رخداد آسیب‌زا | توقف سرویس پس از سوءاستفاده |
| Mitigation/control | کاری برای کم‌کردن احتمال/اثر | Patch، MFA، Segmentation، Backup |

فرمول کیفی رایج `Risk ≈ Likelihood × Impact` است. CVE مساوی Risk سازمان شما نیست؛ Exposure، ارزش Asset، Control موجود و قابلیت Exploit را هم بسنجید. Risk ممکن است Mitigate، Transfer، Avoid یا با Approval پذیرفته شود.

### CIA triad

- **Confidentiality:** فقط افراد مجاز داده را ببینند؛ Encryption و Access control.
- **Integrity:** تغییر غیرمجاز کشف/جلوگیری شود؛ Hash، Signature و Change control.
- **Availability:** سرویس هنگام نیاز قابل‌استفاده باشد؛ Redundancy، ظرفیت و DR.

گاهی کنترل‌ها با هم Trade-off دارند. Encryption سنگین بدون طراحی ظرفیت می‌تواند Availability را کم کند؛ Availability بدون Authentication می‌تواند Confidentiality را نابود کند.

### Encryption در مسیر و در حالت سکون

Data in transit با TLS، IPsec یا SSH محافظت می‌شود. Data at rest با Disk/Database/Object encryption. Encryption نیازمند **Key management** است: تولید امن، نگهداری، دسترسی، Rotation، Backup، Revocation و نابودی. اگر Key کنار Data و با همان دسترسی باشد، فایده محدود می‌شود.

### Certificate و PKI

Certificate کلید عمومی را به Identity متصل و CA آن را امضا می‌کند. اجزای PKI: Root CA، Intermediate CA، Registration/validation، Repository، CRL/OCSP و Policy.

Client در TLS معمولاً بررسی می‌کند:

1. زنجیره به Root مورداعتماد برسد.
2. امضای هر Certificate درست باشد.
3. زمان اعتبار مناسب باشد.
4. نام مقصد در SAN باشد.
5. Key usage اجازه کار موردنظر دهد.
6. وضعیت Revocation طبق Policy بررسی شود.

Self-signed ذاتاً رمز ضعیف نیست، ولی اعتمادش توزیع‌شده نیست؛ برای Production باید Trust به‌طور امن مدیریت شود. خاموش‌کردن Validation برای رفع خطا، On-path attack را آسان می‌کند.

### IAM، AAA و Federation

**Identification** ادعای هویت، **Authentication** اثبات آن، **Authorization** تعیین مجوز و **Accounting** ثبت فعالیت است.

| فناوری | نقش رایج |
|---|---|
| MFA | دو یا چند عامل مستقل: دانستن، داشتن، بودن |
| SSO | یک ورود برای چند Service؛ Convenience و نقطه حساس مرکزی |
| RADIUS | AAA برای Network access/VPN/802.1X؛ Authentication/Authorization ترکیبی و Accounting |
| TACACS+ | مدیریت Device؛ جداسازی AAA و رمزکردن Payload، عمدتاً در اکوسیستم شبکه |
| LDAP | پروتکل دسترسی Directory؛ خود Directory/SSO نیست |
| SAML | Federation مبتنی بر Assertion، رایج برای Web SSO |
| Time-based authentication | OTP محدود به زمان؛ ساعت دقیق لازم است |

MFA فقط وقتی چند عامل **مستقل** است؛ دو Password دو عامل نیست. Push fatigue، SIM swap و Phishing نشان می‌دهند MFA هم باید مقاوم، Monitor و قابل‌بازیابی باشد.

**Least privilege** کمترین مجوز لازم و **RBAC** مجوز بر اساس Role. Access review، Joiner/mover/leaver، Account موقت و Break-glass باید تعریف شوند. **Geofencing** موقعیت را سیگنال Risk می‌کند ولی GPS/IP قابل‌خطا یا جعل است و نباید تنها عامل باشد.

### امنیت فیزیکی و Deception

Lock، Badge، Mantrap، دوربین، Tamper seal، نگهبان و ثبت Visitor لایه‌های فیزیکی‌اند. دوربین بدون Retention، Time sync، زاویه مناسب و واکنش عملی ارزش محدودی دارد.

**Honeypot** سامانه طعمه و **honeynet** شبکه‌ای از طعمه‌هاست. هدف کشف/مطالعه است؛ باید ایزوله و Monitor شود تا مهاجم از آن به دیگران حمله نکند. Deception جای Patch و Segmentation نیست.

### Compliance و Audit

- **Data locality/residency:** داده در چه حوزه‌ای نگهداری/پردازش می‌شود.
- **PCI DSS:** استاندارد امنیت داده کارت پرداخت؛ محدوده را با Segmentation کم می‌کنند، ولی Segmentation باید اثبات شود.
- **GDPR:** چارچوب حقوقی حفاظت داده شخصی در محدوده خود؛ مشاوره حقوقی لازم است.

Compliance حداقل الزام و Security مدیریت Risk است؛ Compliant بودن به معنی نفوذناپذیر نیست. Audit باید Evidence قابل‌تکرار، Owner و Remediation داشته باشد.

### Segmentation و انواع محیط

| محیط | ویژگی/ریسک | رویکرد |
|---|---|---|
| IoT | دستگاه متصل عمومی با Patch محدود | Inventory، VLAN، Egress محدود |
| IIoT | IoT صنعتی | Availability و Safety مهم |
| ICS/SCADA | کنترل/نظارت فرایند | تغییر بسیار کنترل‌شده، Zone/conduit |
| OT | فناوری عملیاتی فیزیکی | Safety و Legacy protocol |
| Guest | دستگاه غیرسازمانی | Internet-only و Client isolation |
| BYOD | مالکیت شخصی | NAC/MDM، Container و Policy حریم خصوصی |

Segmentation با VLAN تنها کامل نیست؛ Inter-VLAN ACL/Firewall، Identity، Route و Monitoring مرز واقعی را می‌سازند. Flat network حرکت جانبی را آسان می‌کند.

## ۴.۲ — حمله‌ها و نشانه‌ها

هدف این بخش شناخت و دفاع است، نه دستور حمله.

### DoS و DDoS

DoS منابع Bandwidth، Connection table، CPU یا برنامه را مصرف می‌کند. DDoS از مبدأهای زیاد می‌آید. نشانه: افزایش ناگهانی Traffic/Session، Timeout و اشباع. دفاع: ظرفیت و Anycast/CDN، Rate limiting، SYN protection، WAF، Autoscaling، همکاری ISP/Scrubbing و Runbook. فقط Block یک IP برای DDoS کافی نیست.

### VLAN hopping

مهاجم تلاش می‌کند ترافیک VLAN دیگری را بگیرد؛ سوءاستفاده از Dynamic trunk یا Double tagging نمونه مفهومی است. دفاع: Access mode ثابت، خاموش‌کردن DTP، Native VLAN بلااستفاده، محدودکردن Allowed VLAN، عدم استفاده VLAN 1 برای کاربر و Patch.

### MAC flooding

پرکردن CAM table می‌تواند Unknown unicast flooding را افزایش دهد. دفاع: Port security، محدودیت MAC، 802.1X، Storm control/Monitoring و Vendor protection. نتیجه دستگاه‌های مدرن یکسان نیست؛ «Switch حتماً Hub می‌شود» تعمیم دقیقی نیست.

### ARP poisoning/spoofing

ARP در IPv4 احراز هویت ذاتی ندارد؛ پاسخ جعلی می‌تواند IP Gateway را به MAC مهاجم نگاشت کند و On-path/DoS بسازد. دفاع: DHCP Snooping + Dynamic ARP Inspection، Static mapping محدود، Segmentation، TLS/SSH و Alert تغییر MAC.

### DNS poisoning/spoofing

پاسخ جعلی یا Cache مسموم نام را به IP مهاجم می‌برد. دفاع: Resolver به‌روز، Randomization، DNSSEC validation، محدودکردن Recursion، DoT/DoH طبق Policy و Monitoring تغییر رکورد. DoH به‌تنهایی صحت Authoritative data را تضمین نمی‌کند.

### Rogue service/device و Evil twin

- **Rogue DHCP:** Gateway/DNS غلط می‌دهد. DHCP Snooping و Port trusted محدود.
- **Rogue AP:** AP بدون مجوز در LAN؛ Inventory، NAC، Wireless IDS و Port control.
- **Evil twin:** SSID شبیه شبکه معتبر برای فریب؛ WPA2/3-Enterprise با Validation Certificate، آموزش و WIDS.

SSID پنهان یا MAC filtering مانع جدی مهاجم نیست.

### On-path attack

مهاجم میان دو طرف Traffic را مشاهده/تغییر می‌دهد. ممکن است از ARP، Rogue AP، DNS یا Route سوءاستفاده کند. TLS معتبر، VPN، Secure protocol، Certificate validation و Network control اثر را کم می‌کنند. اخطار Certificate را نادیده نگیرید.

### Social engineering

- **Phishing:** پیام فریبنده برای Credential/اجرای فایل.
- **Dumpster diving:** بازیابی اطلاعات از زباله؛ Shred و Disposal امن.
- **Shoulder surfing:** نگاه به صفحه/رمز؛ Privacy screen و محیط کنترل‌شده.
- **Tailgating:** ورود پشت فرد مجاز؛ Badge، Mantrap و آموزش عدم رودربایستی.

آموزش باید گزارش آسان، شبیه‌سازی اخلاقی و بازخورد داشته باشد؛ سرزنش کاربر گزارش را کم می‌کند.

### Malware

Virus به فایل میزبان، Worm خودگستر، Trojan ظاهر مشروع، Ransomware اخاذی و Spyware جمع‌آوری پنهان دارد. دفاع لایه‌ای: Patch، EDR، Allowlisting، Least privilege، Segmentation، Filter، Backup آفلاین/تغییرناپذیر و تمرین Restore. Backup متصل ممکن است همراه Production رمز شود.

## ۴.۳ — دفاع و Hardening

### Baseline سخت‌سازی Device

1. Inventory و Owner مشخص کنید.
2. Firmware/OS پشتیبانی‌شده و امضای Image را بررسی کنید.
3. Password، Community و Certificate پیش‌فرض را عوض کنید.
4. Telnet/HTTP/FTP و Service/Port بلااستفاده را خاموش کنید.
5. SSH/HTTPS، الگوریتم قوی، MFA/AAA و Management ACL فعال کنید.
6. Management plane را در VLAN/VRF و ترجیحاً OOB جدا کنید.
7. SNMPv3، NTP/NTS، Syslog مرکزی و Audit روشن کنید.
8. Config را رمز و Backup و Restore را آزمایش کنید.
9. Control plane policing/Rate limit و Banner حقوقی طبق Policy بگذارید.
10. Vulnerability و Configuration drift را دوره‌ای بررسی کنید.

Security through obscurity مانند تغییر پورت SSH می‌تواند Noise را کم کند، ولی کنترل اصلی نیست.

### NAC، 802.1X، MAC filtering و Port security

NAC قبل/حین اتصال، هویت و وضعیت دستگاه را بررسی و VLAN/ACL/Quarantine می‌دهد. در 802.1X:

- **Supplicant:** Client.
- **Authenticator:** Switch/AP که Port را کنترل می‌کند.
- **Authentication server:** معمولاً RADIUS.

MAB/MAC filtering برای دستگاه فاقد Supplicant استفاده می‌شود ولی MAC قابل جعل است. Port security تعداد/نوع MAC را محدود می‌کند و Violation می‌تواند Protect/Restrict/Shutdown باشد؛ رفتار Vendor را بررسی کنید.

### DHCP Snooping و DAI مرحله‌ای

DHCP Snooping پیام Server را فقط از Port trusted می‌پذیرد و Binding table IP-MAC-VLAN-Port می‌سازد. DAI پاسخ ARP را با همین جدول می‌سنجد. اگر Trunk به DHCP server/relay درست Trusted نشود، DHCP قطع می‌شود؛ اگر Port کاربر Trusted شود، دفاع بی‌اثر می‌شود.

</div>

<div dir="ltr" align="left">

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

</div>

<div dir="rtl" align="right">

| خط | کار |
|---|---|
| خط ۱ | قابلیت Snooping را سراسری فعال می‌کند |
| خط ۲ | VLANهای تحت محافظت را تعیین می‌کند |
| Interface uplink | مسیر معتبر پاسخ DHCP را انتخاب می‌کند |
| `trust` | فقط این Uplink را برای پیام Server مورداعتماد می‌کند |
| Interface range | Portهای کاربر را انتخاب می‌کند |
| `limit rate` | نرخ DHCP را محدود می‌کند؛ مقدار باید با محیط آزموده شود |
| `ip arp inspection` | DAI را روی VLANها فعال می‌کند |
| سه `show` | وضعیت، Binding و آمار/Dropهای ARP را بررسی می‌کند |

قبل از Production، Static IPها، Voice، PXE، Relay و Failover را آزمایش کنید.

### ACL

ACL بالا به پایین بررسی می‌شود، اولین Match برنده است و در پایان Implicit deny وجود دارد. Standard ACL معمولاً Source و Extended ACL Source/Destination/Protocol/Port را می‌سنجد. ACL Stateful نیست مگر Platform قابلیت دیگری اضافه کند.

Policy: کاربران فقط HTTPS و DNS لازم به Serverها داشته باشند:

</div>

<div dir="ltr" align="left">

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

</div>

<div dir="rtl" align="right">

| خط | کار |
|---|---|
| نام ACL | ACL خوانا می‌سازد |
| `remark`ها | دلیل Rule را مستند می‌کنند |
| Permit HTTPS | فقط TCP/443 به Web server |
| دو Permit DNS | UDP و TCP/53 به Resolver تأییدشده؛ DNS می‌تواند هر دو را لازم داشته باشد |
| Deny/log | بقیه دسترسی کاربران به Server subnet را رد و Log می‌کند |
| Permit any | ترافیک دیگر، مثلاً اینترنت از مسیر Firewall را می‌گذارد؛ Policy واقعی ممکن است محدودتر باشد |
| `ip access-group ... in` | ACL را ورودی SVI کاربران اعمال می‌کند |
| `show` | Rule و Counterها را نمایش می‌دهد |

قبل از ACL، مسیر مدیریت و سرویس‌های زیرساخت را فراموش نکنید. Log کردن همه Packetهای پرتعداد می‌تواند CPU/Storage را پر کند.

### URL/content filtering و Zoneها

URL filtering مقصد وب را بر اساس Domain/Category/URL کنترل می‌کند؛ Content filtering محتوای منتقل‌شده را تحلیل می‌کند. TLS visibility مسائل Privacy، Certificate، قانون و ظرفیت دارد. Blocklist کامل نیست و Allowlist نیز نگهداری می‌خواهد.

**Trusted zone** مجوز نامحدود نیست؛ فقط سطح اعتماد نسبی است. **Untrusted** مانند اینترنت کنترل سخت‌تر دارد. **Screened subnet/DMZ** سرویس عمومی را میان مرزها جدا می‌کند تا نفوذ به Web server مسیر مستقیم به LAN نسازد.

### دفاع در عمق برای `www.realsam.ir`

1. DNSSEC و مدیریت امن Registrar/Domain.
2. CDN/DDoS protection و WAF در Edge.
3. TLS 1.2/1.3، Certificate درست و HSTS پس از آمادگی.
4. Reverse proxy در DMZ با فقط Port لازم.
5. Backend در Zone جدا؛ فقط Reverse proxy به Port برنامه.
6. Database در Zone جدا؛ فقط Backend و Account کم‌دسترسی.
7. Secret manager، Patch، EDR و File integrity.
8. Log مرکزی، Alert، Backup تغییرناپذیر و Restore test.
9. Admin فقط از VPN/Jump box با MFA و OOB اضطراری.

هیچ لایه‌ای به‌تنهایی کافی نیست؛ هدف این است که شکست یک کنترل به شکست کامل منجر نشود.

## پاسخ به Incident در حد Network+

1. Alert را Validate و Scope را تعیین کنید.
2. Evidence را با زمان هماهنگ حفظ کنید؛ بی‌جهت سیستم را خاموش نکنید.
3. طبق اختیار، Contain کنید: Quarantine، Rule موقت، Credential revoke.
4. علت را Eradicate: Patch، حذف Persistence، اصلاح Config.
5. از منبع سالم Recover و Monitoring را تقویت کنید.
6. ذی‌نفع/حقوقی را طبق Plan مطلع کنید.
7. Lessons learned، Timeline و کنترل اصلاحی را ثبت کنید.

Network technician نباید بدون مجوز Evidence را دستکاری یا به مهاجم پاسخ تهاجمی دهد.

## تمرین پایان فصل

1. برای هر عضو CIA دو کنترل شبکه‌ای بنویسید.
2. Threat، Vulnerability، Exploit و Risk را در سناریوی Firmware قدیمی جدا کنید.
3. Trust boundary شبکه Guest، IoT و Server را طراحی کنید.
4. ACL نمونه را با یک DNS ثانویه و NTP گسترش دهید و ترتیب Rule را توضیح دهید.
5. Runbook تشخیص Rogue DHCP بنویسید.
6. Certificate `www.realsam.ir` را با `openssl s_client` فقط در محیط مجاز بررسی و Chain/SAN/Expiry را گزارش کنید.
7. یک Tabletop برای Ransomware طراحی کنید که Backup و Segmentation را هم بیازماید.

</div>
