<div dir="rtl" align="right">

# آزمایشگاه‌های عملی Network+ N10-009

این ۲۶ Lab از مقدماتی تا سناریوی ترکیبی مرتب شده‌اند. محیط پیشنهادی: دو VM لینوکس، یک Windows اختیاری، Wireshark و Packet Tracer/GNS3/EVE-NG. همه اسکن‌ها و Captureها فقط در شبکه آزمایشگاهی یا با مجوز صریح انجام شوند.

## قواعد مشترک

برای هر Lab یک گزارش با این بخش‌ها بسازید:

1. هدف و کد Objective؛
2. Topology، IP plan و نسخه ابزار؛
3. وضعیت قبل و فرضیه؛
4. دستورها و خروجی مهم؛
5. نتیجه مورد انتظار در برابر واقعی؛
6. یک خرابی عمدی، تشخیص و اصلاح؛
7. Rollback و چیزی که آموختید.

آدرس عمومی مثال فقط از `192.0.2.0/24`، `198.51.100.0/24`، `203.0.113.0/24` و IPv6 `2001:db8::/32` باشد.

## Lab 01 — مشاهده Encapsulation و OSI

**هدف:** ۱.۱، ۱.۴. یک درخواست DNS و HTTPS را به Frame/Packet/Segment/Application مرتبط کنید.

1. Wireshark را روی Interface آزمایشگاهی شروع کنید.
2. Cache DNS را در صورت مجاز خالی و `https://www.realsam.ir` را باز کنید.
3. با فیلترهای `dns`، `tcp.flags.syn == 1` و `tls` بسته‌ها را جدا کنید.
4. MAC، IP، Port و نام پروتکل هر لایه را یادداشت کنید.
5. توضیح دهید در عبور از Router کدام آدرس عوض و کدام مقصد End-to-end می‌ماند.

**مدرک:** Screenshot/فایل Capture پاک‌سازی‌شده و جدول پنج بسته. **خرابی:** DNS را به Resolver ناموجود بدهید، فقط در VM، و تفاوت با TLS failure را ثبت کنید.

## Lab 02 — TCP، UDP و TLS handshake

**هدف:** ۱.۱، ۱.۴. Handshakeها را از Capture بخوانید.

</div>

<div dir="ltr" align="left">

```bash
sudo tcpdump -ni any -w nplus-tls.pcap 'host 192.0.2.80 and (port 53 or port 443)'
curl -v --resolve www.realsam.ir:443:192.0.2.80 https://www.realsam.ir/
openssl s_client -connect 192.0.2.80:443 -servername www.realsam.ir -brief
```

</div>

<div dir="rtl" align="right">

| خط | کار |
|---|---|
| ۱ | Capture را روی همه Interfaceها در فایل می‌نویسد؛ مقصد مستنداتی فقط وقتی Lab server شماست |
| ۲ | برای همین اجرای Curl، DNS را Override می‌کند؛ `-v` مراحل TCP/TLS/HTTP را نشان می‌دهد |
| ۳ | TLS با SNI را بررسی و خلاصه Version/Cipher/Certificate می‌دهد |

**خرابی:** SNI را حذف و تفاوت Certificate/Virtual host را بررسی کنید. Private key یا Cookie را تحویل ندهید.

## Lab 03 — IPv4 و Subnetting

**هدف:** ۱.۷. شبکه `10.20.0.0/16` را برای ۴۰۰، ۱۲۰، ۵۰ و ۲ Host با VLSM تقسیم کنید.

1. نیازها را از بزرگ به کوچک مرتب کنید.
2. Prefix، mask، network، broadcast و range هر بخش را بنویسید.
3. Overlap و فضای باقی‌مانده را کنترل کنید.
4. دو Interface VM را در یکی از Subnetها تنظیم و Local routing را ببینید.

**خرابی:** به یک Host Mask اشتباه بدهید و توضیح دهید چرا فقط بعضی مقصدها قطع‌اند.

## Lab 04 — IPv6، SLAAC و Neighbor Discovery

**هدف:** ۱.۸، ۳.۴. Link-local، Global، RA و ND را ببینید.

</div>

<div dir="ltr" align="left">

```bash
ip -6 address show
ip -6 route show
ip -6 neighbor show
ping -6 -c 4 fe80::1%eth0
```

</div>

<div dir="rtl" align="right">

| خط | کار |
|---|---|
| ۱ | Scope و Lifetime آدرس‌های IPv6 |
| ۲ | Prefix و Default route آموخته‌شده |
| ۳ | جدول Neighbor Discovery |
| ۴ | Ping به Link-local همراه Zone/interface؛ نام Interface را مطابق VM عوض کنید |

**خرابی:** RA را در شبکه ایزوله متوقف و اثرش بر Default route را بررسی کنید.

## Lab 05 — پورت‌ها و جریان‌ها

**هدف:** ۱.۴، ۵.۵. Client/server port و TCP state را بشناسید.

</div>

<div dir="ltr" align="left">

```bash
ss -lntup
ss -tn state established
curl -I https://www.realsam.ir
ss -tnp '( dport = :443 or sport = :443 )'
```

</div>

<div dir="rtl" align="right">

خط‌ها به‌ترتیب Listeningها، اتصال‌های Established، Header وب و Socketهای 443 را نشان می‌دهند. PID ممکن است نیازمند دسترسی باشد. **خرابی:** Service آزمایشگاهی را Stop و تفاوت `refused` و timeout فایروال را مقایسه کنید.

## Lab 06 — کابل، Speed، Duplex و MTU

**هدف:** ۱.۵، ۲.۲، ۵.۲. Cable tester و Interface counter را به‌کار ببرید.

1. Cable map و Category هر Patch را ثبت کنید.
2. Speed/duplex دو سمت و Error baseline را بگیرید.
3. انتقال کنترل‌شده انجام و Counter delta را حساب کنید.
4. در شبیه‌ساز Duplex mismatch بسازید.
5. با Ping دارای DF، Path MTU را مرحله‌ای بیازمایید.

**ایمنی:** فیبر روشن را نگاه نکنید. **مدرک:** before/after counter و علت نتیجه.

## Lab 07 — VLAN، Access و Trunk

**هدف:** ۲.۲، ۵.۳. VLANهای 10/20/99 سناریوی مرجع را بسازید.

1. VLAN و نام‌ها را بسازید.
2. Access portها را ثابت تنظیم کنید.
3. Trunk با Native 999 و Allowed محدود بسازید.
4. با `show vlan brief` و `show interfaces trunk` Verify کنید.
5. Ping داخل VLAN و جداسازی بین VLAN را آزمایش کنید.

**خرابی:** VLAN 20 را از Allowed list یک سمت حذف و Evidence بگیرید.

## Lab 08 — Inter-VLAN routing و ACL

**هدف:** ۲.۱، ۴.۳، ۵.۳. SVIها را Gateway کنید و Users-to-Servers را محدود کنید.

1. `ip routing` و SVIها را طبق [فصل پیاده‌سازی](../docs/03-network-implementation.md) بسازید.
2. قبل از ACL، Reachability baseline بگیرید.
3. ACL HTTPS/DNS فصل امنیت را اعمال کنید.
4. Counter Ruleها و TCP/443 را Verify کنید.
5. یک اتصال مجاز و یک اتصال ردشده ثبت کنید.

**خرابی:** ACL را در Direction اشتباه بگذارید و با Counter صفر علت را پیدا کنید.

## Lab 09 — STP و Root bridge

**هدف:** ۲.۲، ۵.۳. سه Switch مثلثی بسازید.

1. Root فعلی، Port role/state و Cost را ثبت کنید.
2. Root primary/secondary را آگاهانه تعیین کنید.
3. یک لینک را قطع و Convergence را اندازه بگیرید.
4. PortFast+BPDU Guard را فقط روی Edge آزمایش کنید.

**خرابی:** Switch آزمایشگاهی را به Edge protected وصل و Err-disable/Log را تحلیل کنید؛ سپس علت را رفع و Recovery مجاز انجام دهید.

## Lab 10 — LACP

**هدف:** ۲.۲. دو لینک را Port-channel کنید.

1. Config اعضا را یکسان کنید.
2. LACP active در دو سمت و Trunk روی Port-channel بسازید.
3. Summary و load distribution را ببینید.
4. یک عضو را قطع و Traffic را Verify کنید.

**خرابی:** Allowed VLAN یا speed یک عضو را ناسازگار و Suspended state را ثبت کنید.

## Lab 11 — Static، Default و Floating route

**هدف:** ۲.۱، ۵.۳. سه Router و دو مسیر بسازید.

1. Connected routeها را ثبت کنید.
2. Network route و Default route بسازید.
3. Floating route با AD بالاتر اضافه کنید.
4. Lookup یک مقصد و traceroute را ثبت کنید.
5. لینک اصلی را قطع و Failover/Failback را بسنجید.

**خرابی:** Next hop درست ولی Return route را حذف کنید؛ یک‌طرفه‌بودن را ثابت کنید.

## Lab 12 — OSPF و انتخاب Route

**هدف:** ۲.۱. OSPF کوچک Single-area بسازید؛ اگر شبیه‌ساز ندارید خروجی آماده را تحلیل کنید.

1. Router IDها و Networkها را مستند کنید.
2. Neighbor state و LSDB/route را Verify کنید.
3. Cost یک Link را تغییر و مسیر را مقایسه کنید.
4. Longest prefix و AD را با Static route کنترل‌شده آزمایش کنید.

**خرابی:** Area یا Timer را یک سمت ناسازگار و علت عدم Adjacency را از Log/neighbor پیدا کنید.

## Lab 13 — NAT/PAT

**هدف:** ۲.۱. LAN خصوصی را با PAT به Outside آزمایشگاهی وصل کنید.

1. Inside/Outside و ACL match را تنظیم کنید.
2. از دو Client اتصال بیرونی بسازید.
3. Translation table را با Source portها مقایسه کنید.
4. Timeout و Clear کنترل‌شده را مشاهده کنید.

**خرابی:** جهت Inside/Outside را جابه‌جا و با آمار NAT مشکل را تشخیص دهید.

## Lab 14 — Wi-Fi survey و طراحی

**هدف:** ۲.۳، ۳.۱، ۵.۴. در سه محل RSSI/SNR/channel utilization را ثبت کنید.

1. نقشه، دیوار، AP و ساعت اندازه‌گیری را بنویسید.
2. 2.4/5/6 GHz و Channel width را ثبت کنید.
3. Speed test محلی به Server سیمی و Latency را بسنجید.
4. Coverage gap و overlap را روی Heatmap علامت بزنید.
5. پیشنهاد Channel/Power/AP placement را با دلیل بنویسید.

**حریم خصوصی:** MAC/SSID همسایه را در گزارش عمومی ناشناس کنید.

## Lab 15 — WPA2/WPA3 و Guest

**هدف:** ۲.۳، ۴.۳. دو SSID آزمایشگاهی سازمانی و Guest بسازید.

1. Guest را VLAN جدا، Internet-only و Client isolation کنید.
2. WPA2/WPA3 مناسب و Passphrase آزمایشی قوی تعریف کنید.
3. دسترسی Guest به Management/Server را رد کنید.
4. Roaming و Captive portal را، اگر موجود، جدا از Encryption بسنجید.

**خرابی:** VLAN mapping اشتباه را بسازید و با IP/route/ACL تشخیص دهید.

## Lab 16 — DHCP DORA و Relay

**هدف:** ۳.۴، ۵.۳. Server در VLAN 20 و Client در VLAN 10.

1. Scope، exclusion، gateway، DNS و lease را بسازید.
2. Relay را روی Gateway Client تنظیم کنید.
3. DORA را Capture و Portهای 67/68 را مشخص کنید.
4. Reservation بسازید و Renewal را Verify کنید.
5. Utilization و Lease table را ثبت کنید.

**خرابی:** Helper را حذف یا Pool را پر کنید و تفاوت نشانه‌ها را بنویسید.

## Lab 17 — DNS Forward، Recursive و Reverse

**هدف:** ۳.۴، ۵.۵. با BIND/Unbound در شبکه ایزوله یا سرویس آماده.

1. Zone آموزشی `lab.realsam.ir` و A/AAAA/CNAME/MX/TXT/NS/SOA بسازید.
2. Serial را افزایش و Zone syntax را Validate کنید.
3. Forward lookup را از Client انجام دهید.
4. Reverse zone/PTR آدرس Lab و FCrDNS را بسازید.
5. Authoritative پاسخ را با Recursive cache مقایسه کنید.

**خرابی:** نقطه انتهای FQDN یا Serial را غلط و اثر را تحلیل کنید. Zone عمومی واقعی را بدون اختیار تغییر ندهید.

## Lab 18 — DNSSEC، DoH و DoT مشاهده‌ای

**هدف:** ۳.۴. هدف راه‌اندازی Public DNS نیست؛ مشاهده و Validation است.

</div>

<div dir="ltr" align="left">

```bash
dig org DNSKEY +dnssec
dig org SOA +dnssec
dig +tcp A www.realsam.ir
```

</div>

<div dir="rtl" align="right">

خط اول Key/Signature، دوم SOA امضاشده و سوم DNS روی TCP را می‌بیند. AD flag فقط وقتی Resolver واقعاً Validate می‌کند معنی دارد. با Browser/Resolver Lab، DoH/DoT را Capture و تفاوت Visibility را شرح دهید.

## Lab 19 — NTP، Log و Timeline

**هدف:** ۳.۲، ۳.۴. دو Host را به منبع زمان Lab وصل کنید.

1. Source، offset، delay و sync state را ثبت کنید.
2. یک رویداد SSH/Firewall ایجاد کنید.
3. Log دو Host را با Timestamp مرتبط کنید.
4. در VM ایزوله زمان را کمی نادرست و اثر TLS/Log را مشاهده کنید؛ سپس Rollback.

**مدرک:** Timeline با UTC و Timezone مشخص.

## Lab 20 — SNMPv3، Syslog و Baseline

**هدف:** ۳.۲. Device/VM را فقط در Management network پایش کنید.

1. SNMPv3 auth+privacy و Account کم‌دسترسی بسازید.
2. Interface counters را Poll کنید.
3. یک Link event بسازید و Trap/Syslog را ببینید.
4. پنج Metric و Threshold اولیه تعریف کنید.
5. False positive و Runbook هر Alert را ثبت کنید.

Community یا Credential را در گزارش نگذارید.

## Lab 21 — Backup، Change و Restore

**هدف:** ۳.۱، ۳.۳. تغییر VLAN 40 را مانند Production مدیریت کنید.

1. Running config و Hash/زمان Backup بگیرید.
2. Change request، Impact و Approval فرضی بنویسید.
3. Pre-check، تغییر و Post-check اجرا کنید.
4. Rollback را واقعاً در Lab اجرا کنید.
5. تفاوت Production/backup/golden config را نشان دهید.

**موفقیت:** Restore باید سرویس و امنیت را، نه فقط Syntax، برگرداند.

## Lab 22 — SSH، Key و Jump host

**هدف:** ۳.۵، ۴.۱. Client → Jump → Server را بسازید.

1. کلید Ed25519 با Passphrase بسازید.
2. Host key را از کانال Lab Verify کنید.
3. Password login مستقیم Server را پس از اثبات Key و داشتن Recovery غیرفعال کنید.
4. فقط Jump host را در ACL Server مجاز کنید.
5. Log ورود و Failure را مرکزی بفرستید.

**خرابی:** Known-host mismatch کنترل‌شده بسازید؛ هشدار را حذف کور نکنید، علت را Verify کنید.

## Lab 23 — ACL، Segmentation و NAC مفهومی

**هدف:** ۴.۱، ۴.۳. User/Server/Guest/IoT zone بسازید.

1. ماتریس Source-Destination-Service بنویسید.
2. Default deny میان Zoneها و Permitهای لازم را اعمال کنید.
3. Guest فقط DNS/DHCP/Internet و IoT فقط Controller/NTP لازم داشته باشد.
4. Rule counter و Log یک Allow/deny را ثبت کنید.
5. Quarantine VLAN برای Endpoint ناسازگار طراحی کنید.

**خرابی:** Return rule یا DNS TCP را جا بیندازید و با Capture پیدا کنید.

## Lab 24 — DHCP Snooping، DAI و Port security

**هدف:** ۴.۲، ۴.۳. فقط در Switch Lab.

1. Binding baseline بسازید.
2. Uplink درست را Trusted و Edgeها را Untrusted بگذارید.
3. DAI و rate limit را فعال کنید.
4. Rogue DHCP شبیه‌سازی‌شده را از Edge وصل و Drop/Log را ثبت کنید.
5. Port security را با MAC مجاز و Violation مناسب آزمایش کنید.

**Rollback:** Recovery Port و Console پیش از تغییر آماده باشد.

## Lab 25 — Packet capture و عیب‌یابی وب

**هدف:** ۵.۱، ۵.۴، ۵.۵. مسیر DNS → TCP/QUIC → TLS → HTTP را زمان‌بندی کنید.

</div>

<div dir="ltr" align="left">

```bash
curl -sS -o /dev/null -w 'dns=%{time_namelookup} tcp=%{time_connect} tls=%{time_appconnect} first_byte=%{time_starttransfer} total=%{time_total}\n' https://www.realsam.ir/
```

</div>

<div dir="rtl" align="right">

`-sS` خروجی عادی را ساکت ولی خطا را نگه می‌دارد؛ `-o /dev/null` Body را دور می‌ریزد؛ `-w` زمان‌های DNS، TCP، TLS، نخستین Byte و کل را چاپ می‌کند. **خرابی:** Resolver کند، Port بسته و Certificate نامعتبر را فقط در سرویس Lab جدا بسازید و Signature هر خطا را ثبت کنید.

## Lab 26 — سناریوی نهایی Performance-Based

**هدف:** همه دامنه‌ها. یک شعبه نمی‌تواند به `app.realsam.ir` وصل شود؛ Guest گاهی Server را می‌بیند و تماس Wi-Fi قطع می‌شود.

**Topology:** دو Switch، یک Router/Firewall، DHCP/DNS/NTP، دو AP، User/Voice/Guest/Server VLAN و یک WAN شبیه‌سازی‌شده.

خرابی‌های پنهان را یکی‌یکی از این فهرست انتخاب کنید: Native mismatch، VLAN حذف‌شده از Trunk، Default route غلط، DHCP pool پر، PTR ناسازگار، NTP ناهماهنگ، ACL با ترتیب غلط، PoE budget ناکافی، Channel overlap، Duplex mismatch.

1. Ticket و Scope را بدون دیدن پاسخ ثبت کنید.
2. با روش استاندارد فقط Evidence لازم بگیرید.
3. نظریه و آزمون کم‌خطر بنویسید.
4. Change/rollback، اصلاح و Verify End-to-end انجام دهید.
5. Executive summary یک‌پاراگرافی و Technical timeline تحویل دهید.

## معیار ارزیابی Labها

| معیار | امتیاز |
|---|---:|
| طراحی و IP plan صحیح | ۲۰ |
| Evidence و تفسیر، نه فقط Screenshot | ۲۰ |
| توضیح فرمان/Packet/Counter | ۲۰ |
| خرابی عمدی و روش علمی اصلاح | ۲۰ |
| امنیت، Rollback و مستندسازی | ۲۰ |

پاسخ یکتا برای Topologyها وجود ندارد؛ پاسخ خوب فرض‌ها و Trade-off را روشن می‌کند.

</div>
