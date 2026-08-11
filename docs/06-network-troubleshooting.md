<div dir="rtl" align="right">

# فصل ۶ — عیب‌یابی شبکه

عیب‌یابی حرفه‌ای حدس تصادفی و اجرای فرمان‌های زیاد نیست؛ ساختن فرضیه، گرفتن Evidence و تغییر کنترل‌شده است. این فصل دامنه ۵، یعنی پرامتیازترین بخش N10-009، را کامل پوشش می‌دهد.

## ۵.۱ — روش استاندارد عیب‌یابی

### مرحله ۱: شناسایی مشکل

از کاربر بپرسید: چه چیزی کار نمی‌کند؟ پیام دقیق چیست؟ از چه زمانی؟ برای چه کسانی؟ چه چیزی هنوز کار می‌کند؟ آخرین تغییر چه بود؟ مشکل دائمی یا مقطعی است؟

سپس Scope را با شواهد تعیین کنید:

- یک برنامه، یک Host، یک VLAN، یک Site یا همه؟
- فقط نام خراب است یا IP هم؟
- فقط Wi-Fi یا Wired هم؟
- فقط مسیر خروجی یا ارتباط محلی هم؟
- Monitoring، Log و Change calendar چه می‌گویند؟

پیش از تغییر، Config/Log/Counter و زمان را ذخیره کنید. Credential، Token و داده شخصی را در Ticket کپی نکنید.

### مرحله ۲: نظریه علت احتمالی

ساده‌ترین و محتمل‌ترین علت را بر اساس Scope انتخاب کنید. رویکردها:

- **Bottom-up:** از Power/Cable به Application؛ مناسب Link down.
- **Top-down:** از Application/DNS به پایین؛ مناسب خرابی یک Service.
- **Divide-and-conquer:** از Layer میانی مانند Ping gateway شروع و محدوده را نصف کنید.
- **Follow the path:** Hop/Zoneها را به‌ترتیب بررسی کنید.
- **Compare:** دستگاه سالم و خراب یا Baseline و اکنون.

Correlation علت را ثابت نمی‌کند؛ «بعد از تغییر» سرنخ است، نه اثبات.

### مرحله ۳: آزمایش نظریه

آزمایشی انتخاب کنید که یک فرضیه را رد/تأیید کند و کم‌خطر باشد. مثال: به‌جای Restart کل Switch، Patch cord شناخته‌شده و Counter همان Port را بررسی کنید. اگر نظریه رد شد، نظریه جدید بسازید یا Escalate کنید.

### مرحله ۴ و ۵: برنامه و اجرا

اثر، Approval، Maintenance window، Backup، Rollback و Success criteria را بنویسید. تغییر را یک‌به‌یک انجام دهید تا اثر معلوم باشد. در رخداد اضطراری نیز زمان/دستور ثبت شود.

### مرحله ۶ و ۷: تأیید و مستندسازی

فقط Ping کافی نیست؛ سرویس از دید کاربر، Monitoring، Redundancy و امنیت را آزمایش کنید. سپس علت ریشه‌ای، Evidence، اقدام، زمان، افراد، نتیجه و پیشگیری را ثبت کنید.

## ۵.۲ — کابل، Interface و Hardware

### انتخاب کابل و خطاهای رایج

| نشانه | علت‌های محتمل | آزمون |
|---|---|---|
| Link خاموش | کابل/Port/Power/Transceiver | LED، known-good، Loopback/DOM |
| سرعت پایین‌تر | Category/Pair خراب، negotiation | status، cable tester، دو سمت |
| CRC افزایشی | Noise، کابل/Connector، duplex mismatch | Counter در زمان، تعویض کنترل‌شده |
| قطع مقطعی | خم/کشش، Connector شل، گرما | Wiggle فقط با احتیاط، TDR/Log |
| فیبر بدون Link | Tx/Rx برعکس، wavelength/SM-MM/optic mismatch، کثیفی | DOM، power meter، clean/inspect |

Cat5e/6/6A/7/8 Category و Channel specification متفاوت دارند؛ Speed و فاصله را از استاندارد و Certification tester نتیجه بگیرید. Shielded cable فقط با Bonding/ground درست مفید است. UTP در برابر EMI حساس‌تر است. Split pair ممکن است Continuity ساده را پاس ولی Crosstalk را خراب کند.

**Attenuation** کاهش سیگنال با فاصله/اتصال؛ **crosstalk** نشت میان Pairها؛ **interference** انرژی بیرونی. Termination بد، untwist زیاد، bend radius کم و Patchهای متعدد Margin را کم می‌کنند.

### Counterها

- **CRC/FCS error:** Frame خراب؛ Physical/duplex محتمل.
- **Runts:** Frame کوچک‌تر از حد معتبر، گاهی collision/خرابی.
- **Giants:** بزرگ‌تر از حد؛ MTU mismatch یا خطا.
- **Drops/discards:** Buffer، congestion، policy یا سخت‌افزار.
- **Late collisions:** پس از پنجره مجاز؛ duplex mismatch/طول نامناسب در Ethernet قدیمی.

یک Counter قدیمی علت جاری نیست. Counter را یادداشت/در صورت مجاز clear، بار بازتولید و نرخ افزایش را بسنجید. پاک‌کردن Counter Evidence را از بین می‌برد؛ اول ثبت کنید.

### وضعیت Port

| Status | معنی احتمالی |
|---|---|
| Administratively down | مدیر `shutdown` کرده |
| Down/down | Physical link نیست |
| Up/down | لایه ۱ هست، Protocol/Encapsulation مشکل دارد |
| Err-disabled | حفاظت مانند BPDU Guard/port security Port را بسته |
| Suspended | ناسازگاری EtherChannel/LACP |

Restart بدون رفع علت، Port را دوباره خراب می‌کند. Log و Reason را قبل از `shutdown/no shutdown` بخوانید.

### PoE و Transceiver

برای PoE، PSE budget، استاندارد، Class/مصرف PD، Pair/cable و Log negotiation را بررسی کنید. AP ممکن است با توان کم Boot شود ولی Radio/USB را محدود کند. Injector باید استاندارد و محل کابل درست باشد.

برای Optic، Part number دو سمت، Speed، wavelength، SMF/MMF، connector/polarity، Tx/Rx power و thresholdهای DOM را مقایسه کنید. Light level خیلی زیاد نیز Receiver را overload می‌کند. ابتدا Inspect-clean-inspect؛ Connector کثیف را مستقیم وصل نکنید.

نمونه Cisco:

</div>

<div dir="ltr" align="left">

```cisco
show interfaces status
show interfaces GigabitEthernet1/0/10
show interfaces counters errors
show power inline
show interfaces transceiver detail
show logging | include Gi1/0/10
```

</div>

<div dir="rtl" align="right">

| خط | کار |
|---|---|
| ۱ | VLAN، Duplex، Speed و Type همه Portها |
| ۲ | وضعیت و Counterهای Port هدف |
| ۳ | نمای فشرده Errorها؛ نام دستور وابسته به Platform |
| ۴ | بودجه و وضعیت PoE |
| ۵ | DOM/نوع Optic در Platform پشتیبان |
| ۶ | Log مرتبط؛ Pipe/Syntax ممکن است متفاوت باشد |

## ۵.۳ — مشکل Service، Switching و Routing

### عیب VLAN و STP

**نشانه Loop:** Broadcast بالا، MAC flapping، CPU زیاد و شبکه ناپایدار. لینک را کورکورانه جدا نکنید؛ Topology/STP و Port تغییر اخیر را پیدا کنید و طبق Runbook Contain کنید.

چک‌ها:

1. VLAN روی Access port درست است؟
2. VLAN ساخته و روی Trunk Allowed است؟
3. Native VLAN دو سمت مطابق است؟
4. STP Port را Block/Discard یا Guard کرده؟
5. Root bridge همان دستگاه طراحی‌شده است؟
6. LAG عضوها Consistent هستند؟

STP blocked همیشه خطا نیست؛ جلوگیری از Loop است. مشکل وقتی است که مسیر ضروری بدون جایگزین Block یا Root/Topology غیرمنتظره باشد.

### ACL

Source، Destination، Protocol، Port، Direction و Interface را دقیق بنویسید. سپس ترتیب Rule و Counter را ببینید. Implicit deny، Return traffic در ACL Stateless و DNS روی TCP/UDP از خطاهای مشهورند. برای آزمون، ACL را حذف کامل نکنید؛ Rule محدود/موقت و شواهد بگیرید.

### Routing table و Default route

برای مقصد، نه فقط کل Table، lookup کنید. Connected route، Longest prefix، Next hop reachability، Recursive lookup، VRF، AD/metric و Default را بررسی کنید. Route در یک جهت تضمین مسیر برگشت نیست.

</div>

<div dir="ltr" align="left">

```cisco
show ip route 10.10.20.80
show ip cef 10.10.20.80 detail
show arp 10.10.10.25
ping 10.10.20.80 source 10.10.10.1
traceroute 10.10.20.80 source 10.10.10.1
```

</div>

<div dir="rtl" align="right">

| خط | کار |
|---|---|
| Route | بهترین مسیر Control plane |
| CEF | تصمیم Forwarding plane در Cisco پشتیبان |
| ARP | نگاشت IP-MAC همسایه |
| Ping source | مسیر را با Source مشخص آزمایش می‌کند |
| Traceroute source | Hopها را با Source مشخص می‌بیند؛ Firewall ممکن است پاسخ را محدود کند |

### IP، Mask و Gateway غلط

دو Host با Mask متفاوت ممکن است درباره Local بودن مقصد اختلاف داشته باشند. Gateway باید در Subnet محلی Client و قابل ARP/ND باشد. Duplicate IP باعث ARP ناپایدار و قطع مقطعی می‌شود. APIPA نشانه نبود پاسخ DHCP است، نه علت نهایی.

ترتیب Client:

1. آدرس، Prefix/Mask، Gateway و DNS را ببینید.
2. Loopback و Local IP را Ping کنید.
3. Gateway را Ping/ARP کنید.
4. یک IP دور را آزمایش کنید.
5. نام را Resolve کنید.
6. Port برنامه را آزمایش کنید.

اگر IP کار می‌کند ولی Name نه، DNS را بررسی کنید؛ اگر Name Resolve می‌شود ولی HTTPS نه، TCP/TLS/Application را دنبال کنید.

### DHCP pool exhaustion

نشانه: Client جدید Lease نمی‌گیرد ولی قدیمی‌ها کار می‌کنند. Scope utilization، Lease، Conflict، Rogue server و تعداد واقعی Client را ببینید. راه‌حل فوری ممکن است Lease کوتاه‌تر/گسترش Pool با Change باشد؛ علت ریشه‌ای می‌تواند Guest/IoT رشدکرده، Deviceهای تصادفی‌ساز MAC یا Scope کوچک باشد.

## ۵.۴ — Performance

### واژه‌ها

| معیار | معنی | مثال اثر |
|---|---|---|
| Bandwidth | ظرفیت اسمی مسیر | لینک 1 Gbps |
| Throughput | داده مفید واقعی در زمان | 780 Mbps |
| Goodput | Payload برنامه، بدون Header/retransmit | کمتر از Throughput |
| Latency | زمان رسیدن | کندی تعامل |
| Jitter | تغییر Latency | صدای شکسته VoIP |
| Packet loss | بسته نرسیده | Retransmit/افت کیفیت |
| Congestion | تقاضا بیش از ظرفیت | Queue/drop |
| Contention | رقابت اعضا برای رسانه | Wi-Fi شلوغ |
| Bottleneck | محدودکننده نهایی مسیر | WAN 100 Mbps میان LANهای 1 Gbps |

یک Speed test فقط در همان لحظه، Server و مسیر را می‌سنجد. Throughput کمتر از Link rate طبیعی است؛ Header، Protocol، CPU، Disk، RTT و جریان واحد اثر دارند.

### تحلیل مرحله‌ای کندی

1. «کند» را به Metric و Scope تبدیل کنید.
2. Baseline و زمان/الگوی بار را مقایسه کنید.
3. Link speed/duplex/error و utilization را ببینید.
4. Latency/loss را در چند Hop و چند زمان بسنجید.
5. Queue/drop/QoS و WAN را بررسی کنید.
6. DNS، TCP handshake، TLS و زمان پاسخ Server را جدا بسنجید.
7. CPU/memory/disk برنامه و Endpoint را بررسی کنید.
8. فقط پس از Evidence ظرفیت/Policy را تغییر دهید.

TCP retransmission ممکن است نشانه Loss باشد؛ Zero-window نشانه Receiver کند؛ SYN retransmit ممکن است Firewall/route/server باشد. Capture را با زمان هر دو سمت مقایسه کنید.

### Wireless performance

- **Interference:** انرژی غیر-Wi-Fi یا شبکه دیگر.
- **Channel overlap:** APهای همسایه روی Channel هم‌پوشان.
- **Low signal/SNR:** فاصله، مانع، توان یا Noise.
- **Coverage gap:** ناحیه بدون سلول کافی.
- **Client disassociation:** AP/Client Session را قطع کرده؛ Reason code مهم است.
- **Roaming issue:** Client دیر AP بهتر را انتخاب می‌کند یا Authentication کند است.

RSSI تنها کافی نیست؛ SNR، retry، channel utilization، data rate، Client capability و ظرفیت را ببینید. افزودن AP بدون Channel/Power plan ممکن است مشکل را بدتر کند.

## ۵.۵ — ابزارها و فرمان‌ها

### ابزار خط فرمان Client

</div>

<div dir="ltr" align="left">

```bash
ip address show
ip route show
ip neighbor show
ping -c 4 10.10.10.1
traceroute 192.0.2.80
dig A www.realsam.ir
ss -tupan
tcpdump -ni any 'host 192.0.2.80 and (port 53 or port 443)'
```

</div>

<div dir="rtl" align="right">

#### توضیح خط‌به‌خط Linux

| خط | کار و چیزی که باید ببینید |
|---|---|
| `ip address` | Interface، MAC، IP/Prefix و state |
| `ip route` | Connected، Default و Routeهای دیگر |
| `ip neighbor` | ARP/ND و state همسایه |
| `ping` | چهار Echo به Gateway؛ Loss/RTT، نه سلامت همه برنامه |
| `traceroute` | Hopهای پاسخ‌دهنده؛ `*` الزاماً خرابی Forwarding نیست |
| `dig` | Answer، TTL، Server و status DNS |
| `ss` | Socketهای TCP/UDP و Process؛ نیاز دسترسی ممکن است |
| `tcpdump` | Capture روی همه Interfaceها فقط برای Host و DNS/HTTPS؛ `-n` از Resolve جانبی و `-i any` از انتخاب Interface خاص جلوگیری می‌کند |

</div>

<div dir="ltr" align="left">

```powershell
Get-NetIPConfiguration
Get-NetRoute -AddressFamily IPv4
arp -a
ping 10.10.10.1
tracert 192.0.2.80
Resolve-DnsName www.realsam.ir -Type A
Test-NetConnection www.realsam.ir -Port 443
netstat -ano
```

</div>

<div dir="rtl" align="right">

#### توضیح خط‌به‌خط Windows

| خط | کار |
|---|---|
| ۱ | IP، Gateway و DNS Adapterها |
| ۲ | Routeهای IPv4 |
| ۳ | ARP cache |
| ۴ | دسترسی ICMP به Gateway |
| ۵ | Hopها در Windows |
| ۶ | Query رکورد A |
| ۷ | DNS و اتصال TCP/443 را آزمایش می‌کند |
| ۸ | Connection/Listening و PID؛ با Task Manager تطبیق دهید |

`ifconfig` و `route` در Linux قدیمی‌ترند؛ مجموعه `ip` ترجیح داده می‌شود. `nslookup` چندسکویی و ساده است؛ `dig` جزئیات DNS بیشتری می‌دهد.

### Nmap و اسکن مجاز

</div>

<div dir="ltr" align="left">

```bash
nmap -sT -Pn -p 22,53,80,443 192.0.2.80
```

</div>

<div dir="rtl" align="right">

- `-sT` اتصال کامل TCP با API سیستم‌عامل.
- `-Pn` کشف ICMP اولیه را کنار می‌گذارد؛ Host را Up فرض می‌کند.
- `-p` فقط چهار Port را بررسی می‌کند.
- مقصد IP مستنداتی است.

فقط Scope مجاز را اسکن کنید. `open` یعنی اتصال پذیرفته شد، `closed` یعنی Host پاسخ رد داد و `filtered` یعنی Filter/عدم پاسخ نتیجه را نامشخص کرده است.

### Packet analyzer

Capture باید نزدیک محل مناسب و با فیلتر انجام شود. Display filterهای Wireshark:

</div>

<div dir="ltr" align="left">

```text
arp
dns
dhcp || dhcpv6
tcp.flags.syn == 1
tcp.analysis.retransmission
icmp || icmpv6
ip.addr == 192.0.2.80 && tcp.port == 443
```

</div>

<div dir="rtl" align="right">

Capture می‌تواند Credential بدون TLS، Cookie، Query و داده شخصی داشته باشد. مجوز، کمینه‌سازی، رمز نگهداری و حذف زمان‌بندی‌شده لازم است.

### ابزار فیزیکی و Discovery

| ابزار | کاربرد | محدودیت/ایمنی |
|---|---|---|
| Cable tester | Continuity، wiremap و در مدل حرفه‌ای Certification | مدل ساده پهنای‌باند را تضمین نمی‌کند |
| Toner/probe | پیدا کردن کابل مسی | روی مدار/Port حساس طبق دستور سازنده |
| TDR | تخمین محل عیب مس | Calibration و NVP لازم |
| OTDR | رخداد/فاصله عیب فیبر | Launch cable و دانش تفسیر |
| Optical power meter | توان نور | wavelength و threshold صحیح |
| Visual fault locator | نور مرئی برای شکست نزدیک | هرگز به فیبر نگاه نکنید |
| Network tap | کپی ترافیک کنترل‌شده | ظرفیت و مجوز |
| Wi-Fi analyzer | Channel/RSSI/utilization | دید یک محل/Client، نه حقیقت کامل |
| Speed tester | Throughput تا Server | وابسته به Server، زمان و مسیر |

LLDP استاندارد چندVendor و CDP پروتکل Cisco برای کشف همسایه‌اند. اطلاعات نام، Port، Capability، VLAN/IP مدیریت می‌تواند حساس باشد؛ روی Edge نامطمئن محدود شود.

فرمان‌های رایج Device:

</div>

<div dir="ltr" align="left">

```cisco
show mac address-table
show ip route
show interfaces
show running-config
show arp
show vlan brief
show power inline
show lldp neighbors detail
show cdp neighbors detail
```

</div>

<div dir="rtl" align="right">

| فرمان | سؤال پاسخ‌داده‌شده |
|---|---|
| MAC table | کدام MAC در کدام VLAN/Port یاد گرفته شده؟ |
| Route | برای مقصد چه Next hop/Interfaceی انتخاب می‌شود؟ |
| Interfaces | Link، Speed، Duplex، MTU و Error چیست؟ |
| Running config | تنظیم زنده چیست؟ Secret خروجی را محافظت کنید |
| ARP | IP محلی به کدام MAC رسیده؟ |
| VLAN | VLAN و Access memberها چیست؟ |
| Power | PD چه توانی گرفته و Budget چقدر است؟ |
| LLDP/CDP | همسایه و Port دور چیست؟ |

## Runbook نمونه: «وب‌سایت باز نمی‌شود»

1. URL و پیام/زمان دقیق را ثبت کنید.
2. دامنه خرابی را با کاربر/شبکه/دستگاه دیگر بسنجید.
3. IP config و Default route را بررسی کنید.
4. Gateway و یک IP دور مجاز را Ping کنید.
5. `dig A/AAAA www.realsam.ir` و Resolver را بررسی کنید.
6. `Test-NetConnection` یا `nc -vz` روی 443 اجرا کنید.
7. `curl -v` زمان DNS/TCP/TLS/HTTP و Status را بررسی کنید.
8. Certificate نام/زمان/Chain را کنترل کنید.
9. Proxy/VPN/Firewall/ACL و Route برگشت را بررسی کنید.
10. Server/LB health و Log برنامه را با Request ID ببینید.
11. تغییر کم‌خطر را طبق Approval اجرا کنید.
12. از دید کاربر و Monitoring تأیید و مستند کنید.

خطاها را Layer‌بندی کنید:

- `NXDOMAIN`: نام/Zone.
- DNS timeout: Resolver/Firewall/Route.
- TCP timeout: Route/ACL/Server/return path.
- Connection refused: Host رسیده ولی Service Listen نیست/Reject شده.
- TLS name/expiry error: Certificate/time/SNI.
- HTTP 401/403: Authentication/Authorization.
- HTTP 502/503: Proxy/Backend/Capacity.

## تمرین پایان فصل

1. برای پنج Ticket مبهم، سؤال‌هایی بنویسید که Scope را مشخص کند.
2. یک Duplex mismatch آزمایشگاهی بسازید و نرخ Error را پیش/پس از اصلاح ثبت کنید.
3. با Trunk Allowed VLAN ناقص، مشکل را بدون نگاه‌کردن مستقیم به Config پیدا کنید.
4. DHCP pool را عمداً کوچک و نشانه Exhaustion را ثبت کنید.
5. در Capture آزمایشگاهی DORA، DNS، TCP handshake، TLS و HTTP را جدا علامت بزنید.
6. یک Wireless baseline در سه محل و دو زمان بسازید.
7. Runbook بالا را با Rollback و Escalation سازمان خود کامل کنید.

</div>
