<div dir="rtl" align="right">

# فصل ۴ — عملیات شبکه

ساخت شبکه پایان کار نیست. شبکه باید مستند، پایش، Backup، تغییر و در بحران بازیابی شود. این فصل دامنه ۳ N10-009 را پوشش می‌دهد و DNS، DHCP و زمان را از ابتدا توضیح می‌دهد.

## ۳.۱ — مستندسازی و مدیریت چرخه عمر

### مستند فیزیکی و منطقی

| سند | پاسخ به چه سؤالی؟ | محتوای نمونه |
|---|---|---|
| Physical diagram | چه چیزی کجا و با چه کابلی وصل است؟ | Rack، Port، کابل، اتاق، Patch panel |
| Logical diagram | ترافیک منطقی چگونه حرکت می‌کند؟ | VLAN، Subnet، Route، Zone، VPN |
| Rack diagram | هر تجهیز در کدام U است؟ | ارتفاع، Power feed، وزن و Airflow |
| Cable map | دو سر کابل کجاست؟ | شناسه، Port، نوع، طول، تست |
| Layer 1 diagram | Media و اتصال چیست؟ | فیبر/مس، Speed، IDF/MDF |
| Layer 2 diagram | Broadcast domain کدام است؟ | VLAN، Trunk، STP، LAG |
| Layer 3 diagram | Prefix و Next hop چیست؟ | IP، SVI، Router، WAN |

یک دیاگرام زیبا بدون تاریخ، Owner و منبع حقیقت به‌سرعت قدیمی می‌شود. هر سند باید Version، آخرین بازبینی و محدوده داشته باشد.

### Inventory و IPAM

Inventory حداقل Asset ID، نوع، Serial، مدل، محل، Owner، IP/MAC، نسخه OS/Firmware، License، قرارداد و Warranty/EOL را نگه می‌دارد. **IPAM** Prefix، Subnet، آدرس، Reservation، DNS و Owner را مدیریت می‌کند و از Spreadsheet پراکنده قابل‌اعتمادتر است.

**SLA** سطح خدمت قابل‌اندازه‌گیری مانند Availability، زمان پاسخ و جبران را تعریف می‌کند. SLA با SLO داخلی و KPI تفاوت دارد. **Wireless survey** نقشه پوشش، SNR، Channel، Noise و ظرفیت می‌سازد؛ Heatmap باید همراه زمان، باند و معیار خوانده شود.

### EOL، EOS و Decommission

- **EOL:** پایان چرخه فروش/عمر محصول طبق تعریف Vendor.
- **EOS:** پایان پشتیبانی یا Security update؛ تاریخ دقیق Vendor را بررسی کنید.
- **Software management:** Compatibility، License، Release note، Hash/signature، آزمایش، Rollback و Patch window.
- **Decommissioning:** حذف از Monitoring/DNS/IPAM، لغو Certificate/Account، پاک‌سازی امن داده و Update سند؛ فقط خاموش‌کردن دستگاه کافی نیست.

### Change management مرحله‌به‌مرحله

1. هدف، Business reason و Owner تغییر را ثبت کنید.
2. دستگاه، Interface، کاربر و سرویس تحت‌تأثیر را مشخص کنید.
3. Risk و وابستگی را تحلیل کنید.
4. دستورها، ترتیب، Pre-check و Success criteria را بنویسید.
5. Backup و Rollback عملی و زمان تصمیم برگشت را تعریف کنید.
6. Peer review، Approval و Maintenance window بگیرید.
7. به ذی‌نفعان اطلاع دهید.
8. Pre-check، تغییر کنترل‌شده و ثبت زمان را انجام دهید.
9. Post-check فنی و آزمون کاربر را اجرا کنید.
10. سند، Ticket و CMDB را Update و در شکست Postmortem بدون سرزنش بنویسید.

**Production config** تنظیم زنده، **backup config** نسخه قابل‌بازیابی و **baseline/golden config** وضعیت تأییدشده مرجع است. Backup بدون آزمون Restore اطمینان کافی نمی‌دهد. Secretها باید رمز و دسترسی‌شان محدود باشد.

## ۳.۲ — پایش شبکه

### SNMP

Manager از Agent مقدار Objectها را می‌خواند. **MIB** ساختار و معنی OIDها را تعریف می‌کند. Polling از Manager آغاز می‌شود؛ Trap/Inform رویداد را Agent می‌فرستد.

| نسخه | امنیت |
|---|---|
| SNMPv2c | Community string؛ رمزنگاری/احراز قوی ندارد |
| SNMPv3 | Authentication و Privacy قابل‌پیکربندی؛ انتخاب ترجیحی |

SNMP management را در VLAN/VRF مدیریت محدود، ACL و ترجیحاً v3 قرار دهید. Trap به‌تنهایی کافی نیست؛ گم می‌شود یا رخداد خاموشی دستگاه را نمی‌تواند از خود دستگاه اعلام کند، پس Polling هم لازم است.

### Flow، Packet capture، Log و SIEM

- **Flow data:** خلاصه مکالمه‌ها مانند Source/Destination، Port، bytes و زمان؛ سبک‌تر از Packet capture.
- **Packet capture:** جزئیات Header و در ترافیک بدون رمز Payload؛ دقیق ولی حجیم و حساس.
- **Baseline:** رفتار عادی در ساعت/روز/فصل مشخص؛ بدون آن «زیاد» معنی دقیقی ندارد.
- **Anomaly alert:** فاصله از Baseline؛ نیازمند Tuning برای کاهش False positive.
- **Syslog:** رویدادها را مرکزی می‌فرستد. Severity از 0 Emergency تا 7 Debug است؛ عدد کمتر شدیدتر است.
- **SIEM:** Logها را جمع، Normalize، Correlate و Alert می‌کند؛ جای Analyst و Retention policy نیست.
- **API integration:** داده و عمل خودکار؛ Token کم‌دسترسی، TLS، Rate limit و Audit لازم است.
- **Port mirroring/SPAN:** کپی ترافیک Port/VLAN برای Sensor؛ Oversubscription می‌تواند Packet از دست بدهد.

انواع پایش شامل Traffic، Performance، Availability و Configuration است. Discovery خودکار باید با مجوز انجام شود؛ اسکن بدون هماهنگی ممکن است Alert یا اختلال بسازد.

### Baseline پیشنهادی

برای Interface: status، speed/duplex، utilization، errors/discards، latency، loss و jitter. برای Device: CPU، memory، temperature، power و uptime. برای Service: DNS response، DHCP pool، TLS expiry، HTTP status و زمان پاسخ. Alert باید Owner، Severity، Runbook و مسیر Escalation داشته باشد.

## ۳.۳ — Disaster Recovery

| معیار | سؤال |
|---|---|
| RPO | حداکثر چه مقدار داده زمانی می‌توان از دست داد؟ |
| RTO | سرویس حداکثر چه مدت می‌تواند Down باشد؟ |
| MTTR | میانگین زمان تعمیر/بازیابی چقدر است؟ |
| MTBF | میانگین فاصله میان خرابی‌های یک جزء چقدر است؟ |

RPO پنج دقیقه یعنی Backup روزانه کافی نیست. RTO یک ساعت یعنی Runbook، دسترسی و ظرفیت جایگزین باید واقعاً در یک ساعت آماده شوند.

| Site | آمادگی | هزینه/زمان معمول نسبی |
|---|---|---|
| Cold | فضا و امکانات پایه، تجهیزات/داده نیازمند آماده‌سازی | هزینه کمتر، RTO بیشتر |
| Warm | بخشی از تجهیزات و داده آماده | میانه |
| Hot | نزدیک به Production و همگام | هزینه بیشتر، RTO کمتر |

**Active-active** چند Site هم‌زمان سرویس می‌دهند و پیچیدگی Consistency دارد. **Active-passive** Site دوم آماده Failover است و باید ظرفیت/سلامت آن آزموده شود. Tabletop فقط گفتگو روی سناریو است؛ Validation عملی Restore/Failover را ثابت می‌کند. آزمون نباید بدون کنترل، Production را به خطر اندازد.

## ۳.۴ — DHCP، SLAAC، DNS و زمان

### DHCPv4 چرا لازم است؟

DHCP آدرس، Mask، Gateway، DNS و Optionهای دیگر را با Lease می‌دهد. فرایند رایج DORA:

1. **Discover:** Client بدون IP مناسب، درخواست Broadcast می‌فرستد.
2. **Offer:** Server آدرس و Option پیشنهادی می‌دهد.
3. **Request:** Client پیشنهاد انتخابی را درخواست می‌کند.
4. **Acknowledgment:** Server Lease را تأیید می‌کند.

چون Broadcast از Router عبور نمی‌کند، **DHCP relay** درخواست را به Server شبکه دیگر Unicast می‌کند و اطلاعات Subnet مبدأ را می‌افزاید.

| اصطلاح | معنی |
|---|---|
| Scope/Pool | محدوده آدرس و Optionهای یک Subnet |
| Exclusion | آدرس‌هایی که Dynamic داده نمی‌شوند |
| Reservation | اتصال MAC/Client ID مشخص به IP ثابت |
| Lease | مدت مالکیت موقت آدرس |
| Option | Gateway، DNS، domain، NTP و اطلاعات دیگر |

Pool exhaustion، Rogue DHCP، Relay اشتباه و Scope با Mask/Gateway غلط از خطاهای رایج‌اند. DHCP Snooping روی Switch می‌تواند Server غیرمجاز را محدود کند.

نمونه Relay در Cisco:

</div>

<div dir="ltr" align="left">

```cisco
interface Vlan10
 ip address 10.10.10.1 255.255.255.0
 ip helper-address 10.10.20.53
 no shutdown
show ip interface Vlan10
```

</div>

<div dir="rtl" align="right">

| خط | کار |
|---|---|
| `interface Vlan10` | Gateway کاربران را انتخاب می‌کند |
| `ip address` | IP/Mask Interface را تعیین می‌کند |
| `ip helper-address` | Broadcastهای منتخب UDP، از جمله DHCP، را به Server می‌فرستد؛ رفتار دقیق Platform را بررسی کنید |
| `no shutdown` | Interface را اداری فعال می‌کند |
| `show` | IP و Helper را راستی‌آزمایی می‌کند |

### SLAAC در IPv6

Router با Router Advertisement، Prefix و Flagها را اعلام می‌کند. Client می‌تواند با SLAAC آدرس بسازد و Duplicate Address Detection انجام دهد. Default gateway از RA می‌آید. DHCPv6 ممکن است Stateful آدرس بدهد یا Stateless اطلاعات اضافی بدهد. SLAAC و DHCPv6 رقیب مطلق نیستند و Flagها/سیستم‌عامل رفتار را تعیین می‌کنند.

### DNS از صفر: ساختار سلسله‌مراتبی

DNS پایگاه توزیع‌شده نام‌هاست. نام `www.realsam.ir.` از راست خوانده می‌شود:

- `.` ریشه DNS؛ نقطه پایانی معمولاً در نوشتار حذف می‌شود.
- `ir` دامنه سطح بالا یا TLD.
- `realsam.ir` دامنه ثبت‌شده/Zone احتمالی.
- `www` Label یا Host/Subdomain داخل آن.

**Registrar** ثبت دامنه را مدیریت می‌کند؛ **Registry** TLD را اداره می‌کند؛ **DNS hosting/authoritative server** رکوردها را پاسخ می‌دهد. این نقش‌ها می‌توانند شرکت‌های متفاوت باشند.

### وقتی کاربر نام را وارد می‌کند چه رخ می‌دهد؟

1. برنامه URL را تجزیه و نام `www.realsam.ir` را می‌خواهد.
2. Stub resolver سیستم ابتدا Cache و hosts file را بررسی می‌کند.
3. اگر نبود، سؤال را به Recursive resolver سازمان/ISP می‌دهد.
4. Resolver اگر Cache معتبر ندارد، از Root محل Name serverهای `.ir` را می‌پرسد.
5. از Serverهای `.ir`، NSهای `realsam.ir` و Glue لازم را می‌گیرد.
6. از Authoritative server رکورد `A`/`AAAA` نام را می‌خواهد.
7. پاسخ همراه TTL Cache می‌شود و به Client می‌رسد.
8. Client IP را انتخاب و TCP/QUIC، TLS و HTTP را آغاز می‌کند.

Recursive resolver کار دنبال‌کردن زنجیره را برای Client انجام می‌دهد. Authoritative server داده Zone خود را پاسخ می‌دهد و معمولاً برای عموم Recursion باز نباید باشد. **Primary** منبع قابل‌ویرایش Zone و **Secondary** کپی منتقل‌شده است؛ هر دو می‌توانند Authoritative باشند.

### رکوردهای مهم DNS

| رکورد | کار | مثال مفهومی |
|---|---|---|
| A | نام به IPv4 | `www.realsam.ir. A 192.0.2.80` |
| AAAA | نام به IPv6 | `www.realsam.ir. AAAA 2001:db8::80` |
| CNAME | Alias یک نام به نام Canonical | `blog.realsam.ir. CNAME www.realsam.ir.` |
| MX | Mail exchanger دامنه با Priority | `realsam.ir. MX 10 mail.realsam.ir.` |
| TXT | متن برای Verification و Policyهایی مانند SPF | مقدار وابسته به کاربرد |
| NS | Name serverهای Authoritative Zone/Delegation | `realsam.ir. NS ns1.realsam.ir.` |
| SOA | مشخصات Zone، Primary، Contact، Serial و Timerها | یک رکورد در رأس Zone |
| PTR | IP به نام در Reverse DNS | `192.0.2.80 → mail.realsam.ir` |

نکته‌ها:

- CNAME را معمولاً همراه رکوردهای دیگر روی همان Owner name نمی‌گذارند؛ Apex Zone نیز محدودیت دارد.
- عدد کمتر MX اولویت بیشتر دارد. MX باید به نامی برسد که A/AAAA دارد، نه مستقیم به IP.
- TXT فقط SPF نیست و وجود آن به‌تنهایی صحت متن را ثابت نمی‌کند.
- NS در Parent عمل Delegation را می‌سازد؛ Glue وقتی نام NS زیر همان Child است، حلقه حل نام را می‌شکند.
- SOA Serial باید با تغییر Zone افزایش یابد تا Secondary تغییر را تشخیص دهد.
- TTL مدت Cache است، نه تضمین زمان دقیق انتشار جهانی.

نمونه Zone آموزشی:

</div>

<div dir="ltr" align="left">

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

</div>

<div dir="rtl" align="right">

#### توضیح خط‌به‌خط Zone

| خط | معنی |
|---|---|
| `$ORIGIN` | پسوند نام‌های نسبی بعدی |
| `$TTL` | TTL پیش‌فرض رکوردها |
| `@ IN SOA` | `@` یعنی Origin؛ شروع Authority |
| `ns1...` در SOA | Primary/master اعلام‌شده |
| `hostmaster...` | ایمیل مسئول با نقطه به‌جای `@` |
| Serial | نسخه Zone؛ قالب تاریخ قراردادی است نه الزام Protocol |
| Refresh/Retry/Expire | زمان‌بندی Secondary برای Sync/Retry/انقضا |
| Negative TTL | Cache پاسخ نبود نام |
| دو NS | افزونگی Authoritative name server |
| Aهای ns | آدرس Name serverها |
| Aهای وب | Apex و `www` را به IPv4 مستنداتی می‌برند |
| MX | Mail با Priority 10 |
| TXT | نمونه SPF سخت‌گیر؛ پیش از استفاده واقعی باید همه Senderها شناخته شوند |

### Reverse DNS و PTR کامل

Forward DNS نام را به IP می‌برد؛ Reverse DNS یا rDNS، IP را به نام می‌برد. IPv4 از Zone زیر `in-addr.arpa` و IPv6 از `ip6.arpa` با Nibbleهای معکوس استفاده می‌کند.

برای `192.0.2.80`، نام Query برابر `80.2.0.192.in-addr.arpa.` است. کنترل Reverse Zone معمولاً دست مالک Netblock/ISP است، نه لزوماً مالک دامنه؛ پس باید از Provider بخواهید PTR را بسازد یا Zone را Delegate کند.

نمونه رکورد:

</div>

<div dir="ltr" align="left">

```dns
80.2.0.192.in-addr.arpa. 3600 IN PTR mail.realsam.ir.
```

</div>

<div dir="rtl" align="right">

هر بخش:

- `80.2.0.192...` آدرس معکوس‌شده است.
- `3600` TTL یک ساعت است.
- `IN` کلاس Internet.
- `PTR` نوع رکورد.
- `mail.realsam.ir.` نام کامل مقصد؛ نقطه پایانی مهم است.

برای Mail معمولاً **forward-confirmed reverse DNS** مطلوب است: PTR آدرس به `mail.realsam.ir` برسد و A/AAAA همان نام دوباره همان IP را برگرداند. PTR به‌تنهایی مالکیت یا امنیت را ثابت نمی‌کند، اما نبود/ناسازگاری آن می‌تواند Reputation و پذیرش Mail را خراب کند. یک IP از نظر Protocol می‌تواند چند PTR داشته باشد، ولی برای Mail معمولاً یک نام پایدار و هم‌خوان بهتر است.

### DNSSEC، DoH و DoT

DNSSEC با امضای زنجیره‌ای Origin و Integrity داده DNS را اعتبارسنجی می‌کند؛ Query را محرمانه نمی‌کند. DS در Parent به DNSKEY Child متصل است. خرابی زمان/امضا می‌تواند پاسخ معتبر را Fail کند.

DoT، DNS میان Client و Resolver را داخل TLS می‌برد؛ DoH آن را داخل HTTPS می‌برد. این دو مسیر محلی را رمز می‌کنند، ولی Resolver منتخب هنوز Query را می‌بیند و صحت Zone بدون DNSSEC تضمین نمی‌شود. Policy سازمانی برای Resolver و Logging لازم است.

### ابزارهای بررسی DNS

</div>

<div dir="ltr" align="left">

```bash
dig A www.realsam.ir
dig AAAA www.realsam.ir
dig MX realsam.ir
dig NS realsam.ir +trace
dig -x 192.0.2.80
dig DNSKEY realsam.ir +dnssec
```

</div>

<div dir="rtl" align="right">

| فرمان | کار |
|---|---|
| خط ۱ | IPv4 وب را می‌پرسد |
| خط ۲ | IPv6 وب را می‌پرسد |
| خط ۳ | Mail exchangerها را می‌بیند |
| خط ۴ | Delegation را از Root مرحله‌ای دنبال می‌کند؛ Resolver محلی را دور می‌زند |
| خط ۵ | PTR آدرس را Query می‌کند |
| خط ۶ | داده DNSSEC را درخواست می‌کند؛ وجود امضا به‌تنهایی Validation محلی را ثابت نمی‌کند |

در عیب‌یابی، بخش `status`، `ANSWER`، `AUTHORITY`، `SERVER`، TTL و زمان پاسخ را بخوانید. `NXDOMAIN` یعنی نام وجود ندارد؛ `SERVFAIL` معمولاً شکست Resolver/Authoritative/DNSSEC است؛ Timeout یعنی پاسخ به‌موقع نرسیده است.

### NTP، PTP و NTS

- **NTP:** همگام‌سازی عمومی زمان با سلسله‌مراتب Stratum؛ UDP 123.
- **PTP:** دقت بالاتر در LANهای کنترل‌شده، به‌ویژه با Hardware timestamp؛ جایگزین همیشگی NTP نیست.
- **NTS:** امنیت برای NTP با ایجاد Cookie/کلید از TLS و سپس تبادل زمان محافظت‌شده.

زمان غلط Certificate، Kerberos، Log correlation و DNSSEC را خراب می‌کند. چند منبع مستقل، محدودکردن Peer، Monitoring offset و عدم استفاده کور از Server ناشناس لازم است.

## ۳.۵ — دسترسی و مدیریت

| روش | کاربرد | نکته امنیتی |
|---|---|---|
| Site-to-site VPN | اتصال دو شبکه | Route، رمز، Rekey و Redundancy |
| Client-to-site VPN | اتصال Endpoint با Client | MFA، وضعیت دستگاه، Split/full tunnel |
| Clientless VPN | دسترسی مرورگری به برنامه مشخص | سطح محدود، Session و Browser |
| SSH | CLI امن | Key، الگوریتم مدرن، AAA و ACL |
| GUI/HTTPS | مدیریت تصویری | TLS معتبر، MFA، Management network |
| API | Automation | Token کوتاه/کم‌دسترسی، Audit و TLS |
| Console | دسترسی محلی/Out-of-band | کنترل فیزیکی و Account مستقل بحران |
| Jump box | نقطه کنترل ورود مدیر | Harden، MFA، Record و Patch |

**Split tunnel** فقط ترافیک سازمان را از VPN می‌برد و اینترنت محلی را مستقیم؛ پهنای‌باند کمتر ولی Policy/دید سازمان محدودتر. **Full tunnel** همه ترافیک را از سازمان عبور می‌دهد؛ کنترل بیشتر و ظرفیت/Latency بالاتر لازم دارد.

**In-band management** از همان شبکه Production می‌گذرد و در خرابی آن ممکن است از دست برود. **Out-of-band** مسیر مدیریت جدا مانند Console server/LTE دارد؛ خود این مسیر هم باید امن و آزموده شود.

نمونه SSH روی Linux:

</div>

<div dir="ltr" align="left">

```bash
ssh-keygen -t ed25519 -a 64 -C "netadmin@realsam.ir"
ssh-copy-id netadmin@router-mgmt.realsam.ir
ssh -o IdentitiesOnly=yes netadmin@router-mgmt.realsam.ir
```

</div>

<div dir="rtl" align="right">

| خط | کار |
|---|---|
| `ssh-keygen` | کلید Ed25519 می‌سازد؛ `-a 64` KDF فایل Private key را سخت‌تر و `-C` برچسب می‌گذارد |
| `ssh-copy-id` | Public key را پس از احراز هویت روی حساب مجاز نصب می‌کند؛ Host key را بررسی کنید |
| `ssh ...` | فقط Identityهای صریح Agent/Config را محدود و Login را آغاز می‌کند |

Private key را ارسال یا در Git ذخیره نکنید. نخستین Host key را از کانال مورداعتماد Verify کنید؛ پذیرش کور، حمله On-path را ممکن می‌کند.

## تمرین پایان فصل

1. برای سناریوی مرجع یک Logical diagram، IPAM کوچک و Cable map بسازید.
2. Change request افزودن VLAN 40 را همراه Rollback و Success criteria بنویسید.
3. RPO/RTO یک فروشگاه آنلاین را با دلیل تعیین کنید.
4. DORA را Capture و Source/Destination IP/Port هر مرحله را تحلیل کنید.
5. رکوردهای Forward و Reverse `mail.realsam.ir` را طراحی و FCrDNS را بررسی کنید.
6. خروجی `dig +trace` را از Root تا Authoritative خط‌به‌خط گزارش کنید.
7. برای مدیریت در زمان قطع Production یک طرح Out-of-band بنویسید.

</div>
