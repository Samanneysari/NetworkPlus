<div dir="rtl" align="right">

# فصل صفر — شبکه از صفر مطلق

## شبکه چیست؟

شبکه یا **Network** مجموعه‌ای از دستگاه‌هاست که می‌توانند با استفاده از یک روش توافق‌شده با هم داده ردوبدل کنند. این دستگاه‌ها ممکن است لپ‌تاپ، تلفن، دوربین، پرینتر، سرور، ماشین مجازی، سنسور یا تجهیزات صنعتی باشند.

برای ایجاد ارتباط فقط کابل کافی نیست. طرفین باید دربارهٔ چند موضوع توافق داشته باشند:

- داده چگونه به صفر و یک تبدیل شود؛
- آغاز و پایان پیام کجاست؛
- فرستنده و گیرنده چگونه شناخته شوند؛
- اگر گیرنده در شبکهٔ دیگری بود، مسیر چگونه پیدا شود؛
- اگر بخشی از داده گم شد، چه کسی آن را دوباره بفرستد؛
- آیا داده باید رمز شود؛
- برنامهٔ مقصد کدام است؛
- خطا چگونه تشخیص داده شود.

مجموعهٔ قوانین یک ارتباط را **Protocol** یا پروتکل می‌نامیم. Ethernet، Wi-Fi، IP، TCP، UDP، DNS، HTTP و TLS هرکدام فقط بخشی از این مسئله را حل می‌کنند.

## یک مثال انسانی

ارسال بستهٔ پستی را تصور کنید:

- متن داخل بسته مانند دادهٔ برنامه است؛
- جعبه و بسته‌بندی مانند Encapsulation است؛
- نام فرد و شمارهٔ واحد مانند Port است؛
- آدرس ساختمان مانند IP است؛
- مسیر شرکت پست مانند Routing است؛
- پلاک یا نشانی محلی هر مرحله شبیه آدرس Layer 2 است؛
- رسید تحویل شبیه Acknowledgment در TCP است؛
- صندوق قفل‌شده و احراز هویت گیرنده شبیه Encryption و Authentication است.

این تشبیه کامل نیست، اما نشان می‌دهد چرا یک آدرس به‌تنهایی برای ارتباط کافی نیست.

## بیت، بایت و واحد سرعت

کامپیوتر در پایین‌ترین سطح با دو حالت کار می‌کند: صفر و یک. هر صفر یا یک یک **bit** است. هشت bit یک **Byte** می‌سازد.

| واحد | معنی |
|---|---|
| `b` کوچک | bit؛ معمولاً در سرعت شبکه |
| `B` بزرگ | Byte؛ معمولاً در اندازهٔ فایل |
| `Mbps` | میلیون bit در ثانیه |
| `MB/s` | میلیون Byte در ثانیه، با تفاوت مبنای ده‌دهی/دودویی در نمایش ابزارها |
| `Gbps` | میلیارد bit در ثانیه |

یک لینک `100 Mbps` در بهترین حالت نظری حدود `12.5 MB/s` دادهٔ خام حمل می‌کند، زیرا هر Byte هشت bit است. سرعت واقعی کمتر است؛ Headerها، فاصلهٔ فریم، کنترل ازدحام، خطا، Media مشترک، Disk و محدودیت سرور نیز اثر دارند.

## داده، بسته، فریم و سیگنال

یک داده در مسیر نام‌های متفاوتی می‌گیرد:

| محدوده | نام رایج | چه چیزی اضافه می‌شود؟ |
|---|---|---|
| برنامه | Data/Message | محتوای HTTP، DNS، فایل یا صدا |
| Transport | TCP Segment یا UDP Datagram | Port، Sequence/Checksum و اطلاعات انتقال |
| Network | IP Packet | IP مبدأ و مقصد و اطلاعات مسیریابی |
| Data Link | Ethernet/Wi-Fi Frame | MAC مبدأ و مقصد و کنترل خطای فریم |
| Physical | Bits/Signal | سیگنال الکتریکی، نوری یا رادیویی |

قرارگرفتن Header هر لایه دور دادهٔ لایهٔ بالاتر **Encapsulation** نام دارد. در سمت گیرنده Headerها به‌ترتیب بررسی و حذف می‌شوند که **Decapsulation** است.

## کلاینت و سرور

**Client** برنامه یا دستگاهی است که درخواست یک خدمت را آغاز می‌کند. **Server** برنامه یا دستگاهی است که روی یک سرویس منتظر می‌ماند و پاسخ می‌دهد.

مثال‌ها:

- مرورگر Client و وب‌سرور Server است؛
- `dig` یک DNS Client و Resolver یک DNS Server است؛
- لپ‌تاپ هنگام گرفتن IP یک DHCP Client است؛
- همان لپ‌تاپ می‌تواند هم‌زمان فایل را برای دستگاه دیگری Share کند و در آن رابطه نقش Server داشته باشد.

Client و Server نقش هستند، نه الزاماً نوع سخت‌افزار. یک سیستم می‌تواند در چند ارتباط نقش‌های مختلف داشته باشد.

## LAN، WAN و Internet

- **LAN:** شبکهٔ محلی در خانه، دفتر، طبقه یا Campus؛ معمولاً Ethernet و Wi-Fi.
- **WAN:** ارتباط میان موقعیت‌های جغرافیایی دور، معمولاً با سرویس Provider، Internet، MPLS، Leased Line یا VPN.
- **Internet:** مجموعه‌ای جهانی از شبکه‌های مستقل که با IP و Routing بین‌دامنه‌ای به هم متصل‌اند.
- **Intranet:** سرویس‌های خصوصی داخل سازمان با فناوری مشابه Web/Internet.

Internet یک شبکهٔ واحد با یک مالک نیست؛ شبکه‌های زیادی است که دربارهٔ تبادل Route و Packet توافق کرده‌اند.

## تجهیزات پایه

| دستگاه | کار اصلی | چیزی که برای تصمیم می‌بیند |
|---|---|---|
| NIC | اتصال دستگاه به Media | Frame و تنظیمات Link |
| Switch | اتصال دستگاه‌های یک VLAN/LAN | MAC مقصد و MAC Table |
| Router | اتصال شبکه‌های IP مختلف | IP مقصد و Routing Table |
| Access Point | اتصال Wireless به Wired LAN | Frameهای 802.11 و Policy WLAN |
| Firewall | اجازه/رد جریان بر اساس Policy و State | IP، Port، Protocol، Session و گاهی Application/User |
| Modem/ONT | تبدیل یا پایان‌دادن فناوری دسترسی ISP | DSL، Cable، Fiber یا Cellular |
| Server | ارائهٔ سرویس | درخواست‌های یک Application/Port |

دستگاه خانگی که «مودم» نامیده می‌شود اغلب چند نقش را هم‌زمان دارد: Modem یا ONT، Router، NAT، Firewall، Switch، AP و DHCP Server.

## چهار شناسه‌ای که نباید با هم اشتباه شوند

### نام

نامی مثل `www.realsam.ir` برای انسان قابل فهم است. DNS آن را به اطلاعاتی مثل IP تبدیل می‌کند.

### IP Address

آدرس منطقی Layer 3 است و برای انتخاب مسیر میان شبکه‌ها استفاده می‌شود. IP ممکن است با DHCP تغییر کند.

### MAC Address

شناسهٔ Layer 2 برای تحویل Frame در یک Link/VLAN محلی است. Router آدرس MAC را در هر Hop عوض می‌کند؛ MAC مقصد وب‌سرور از خانه تا اینترنت همراه Packet نمی‌رود.

### Port Number

شمارهٔ منطقی Transport برای رساندن داده به برنامهٔ درست است. یک سرور می‌تواند با یک IP، SSH روی Port 22 و HTTPS روی Port 443 ارائه دهد.

## Subnet و Default Gateway به زبان ساده

Subnet تعیین می‌کند کدام IPها از نگاه Host «محلی» هستند. Host با IP و Subnet Mask خودش محاسبه می‌کند مقصد محلی است یا دور.

- اگر مقصد محلی باشد، Host مستقیماً MAC مقصد را با ARP یا ND پیدا می‌کند.
- اگر مقصد دور باشد، Host MAC **Default Gateway** را پیدا می‌کند و Frame را به Router می‌دهد.

در حالت دوم، IP مقصد همچنان IP نهایی است؛ فقط MAC مقصد Frame برابر MAC Gateway می‌شود.

## DHCP چه می‌دهد؟

DHCP معمولاً این اطلاعات را به Client می‌دهد:

- IP Address
- Subnet Mask یا Prefix
- Default Gateway
- DNS Server
- Lease Time
- Domain/Search Options و گزینه‌های دیگر

اگر Windows بدون DHCP و بدون IP دستی بماند، ممکن است APIPA از `169.254.0.0/16` بسازد. داشتن چنین IP معمولاً نشان می‌دهد Host به DHCP نرسیده، نه اینکه اینترنت به‌طور عادی آماده است.

## DNS چه می‌کند؟

DNS فقط «نام را به IP تبدیل» نمی‌کند؛ یک پایگاه دادهٔ سلسله‌مراتبی برای انواع Record است. نمونه‌ها:

- `A`: نام به IPv4
- `AAAA`: نام به IPv6
- `CNAME`: Alias
- `MX`: Mail Server
- `NS`: Name Server معتبر Zone
- `SOA`: اطلاعات مرجع و Serial/Timerهای Zone
- `PTR`: IP به نام در Reverse DNS
- `TXT`: متن Policy یا Verification

DNS و rDNS در فصل عملیات به‌صورت کامل بررسی می‌شوند.

## از واردکردن آدرس تا دیدن وب‌سایت چه اتفاقی می‌افتد؟

فرض کنید کاربر این آدرس را وارد می‌کند:

</div>

<div dir="ltr" align="left">

```text
https://www.realsam.ir/learn
```

</div>

<div dir="rtl" align="right">

### مرحله ۱ — مرورگر URL را می‌شکند

- Scheme: `https`
- Hostname: `www.realsam.ir`
- Port پیش‌فرض HTTPS: `443`
- Path: `/learn`

هنوز هیچ Packetی لزوماً ارسال نشده است.

### مرحله ۲ — پیدا کردن IP با DNS

مرورگر و سیستم Cache را بررسی می‌کنند؛ Hosts File هم ممکن است بررسی شود. اگر پاسخ موجود نباشد، Stub Resolver از DNS Resolver تنظیم‌شده، Recordهای `A` و `AAAA` را می‌پرسد.

Resolver در Cache Miss ممکن است از Root به `.ir` و سپس Authoritative Server دامنه برسد. پاسخ با TTL Cache می‌شود.

### مرحله ۳ — تصمیم محلی یا دور

Host IP مقصد را با Mask خودش مقایسه می‌کند. وب‌سرور معمولاً دور است، بنابراین Next Hop همان Default Gateway است.

### مرحله ۴ — پیدا کردن MAC Gateway

در IPv4، Host با ARP می‌پرسد چه MACی IP Gateway را دارد. در IPv6، Neighbor Discovery با ICMPv6 این نقش را دارد.

### مرحله ۵ — ساخت داده از بالا به پایین

برای HTTPS معمول روی TCP:

۱. برنامه قصد اتصال به مقصد Port 443 می‌کند.  
۲. TCP ابتدا SYN می‌سازد.  
۳. IP، IP مبدأ و سرور را اضافه می‌کند.  
۴. Ethernet، MAC مبدأ Host و MAC مقصد Gateway را اضافه می‌کند.  
۵. NIC فریم را به Signal تبدیل می‌کند.

### مرحله ۶ — Switch و Router

Switch با MAC Table فریم را به پورت Gateway می‌فرستد. Router فریم را باز می‌کند، TTL را کم می‌کند، Longest Prefix Match انجام می‌دهد و Frame جدیدی برای Link بعدی می‌سازد.

IP مبدأ ممکن است در NAT/PAT روتر خانگی به Public IP ترجمه شود. Firewall نیز State و Policy را بررسی می‌کند.

### مرحله ۷ — TCP Three-Way Handshake

Client `SYN`، Server `SYN-ACK` و Client `ACK` می‌فرستد. اکنون دو طرف Sequence Number و پارامترهای TCP را هماهنگ کرده‌اند؛ هنوز HTTP رمز‌شده شروع نشده است.

### مرحله ۸ — TLS Handshake

Client و Server نسخهٔ TLS، Cipher Suite و Key Share را هماهنگ می‌کنند. Server Certificate ارائه می‌کند. Client زنجیرهٔ اعتماد، نام دامنه، زمان اعتبار و امضای Certificate را بررسی می‌کند. سپس کلیدهای Session مشتق می‌شوند و پیام‌های Finished صحت Handshake را ثابت می‌کنند.

### مرحله ۹ — HTTP داخل TLS

مرورگر درخواست HTTP را به‌صورت رمز‌شده می‌فرستد. Server پاسخ HTML، Headerها و Status Code را برمی‌گرداند.

### مرحله ۱۰ — Render

مرورگر HTML را Parse می‌کند، فایل‌های CSS، JavaScript، Font و Image را با درخواست‌های بیشتر دریافت می‌کند، DOM/CSSOM را می‌سازد، Layout/Paint انجام می‌دهد و نتیجه روی صفحه دیده می‌شود.

پس «بازشدن سایت» یک کار واحد نیست؛ زنجیره‌ای از DNS، ARP/ND، Switching، Routing، NAT، Firewall، TCP/QUIC، TLS، HTTP و Rendering است.

## اولین فرمان‌های بررسی

</div>

<div dir="ltr" align="left">

```bash
ip address show
ip route show
resolvectl status
ping -c 4 192.0.2.1
dig A www.realsam.ir
curl -I https://www.realsam.ir/
```

</div>

<div dir="rtl" align="right">

توضیح خط‌به‌خط:

| فرمان | دقیقاً چه چیزی را بررسی می‌کند؟ |
|---|---|
| `ip address show` | Interfaceها، وضعیت Link و IPv4/IPv6های Linux را نشان می‌دهد. |
| `ip route show` | Routeهای IPv4 و Default Route انتخابی را نشان می‌دهد. |
| `resolvectl status` | DNS Server و وضعیت Resolver را در سیستم‌های مبتنی بر systemd-resolved نشان می‌دهد. |
| `ping -c 4 192.0.2.1` | چهار ICMP Echo برای یک مقصد آزمایشگاهی می‌فرستد؛ موفقیت فقط ICMP همان مسیر را ثابت می‌کند. |
| `dig A www.realsam.ir` | Record نوع A، Server پاسخ‌دهنده، Status و بخش‌های DNS را نمایش می‌دهد. |
| `curl -I https://www.realsam.ir/` | با TLS/HTTP فقط Header پاسخ را می‌گیرد؛ موفقیت به DNS، Route، TCP، TLS و HTTP وابسته است. |

برای Windows:

</div>

<div dir="ltr" align="left">

```powershell
ipconfig /all
route print
arp -a
nslookup www.realsam.ir
Test-NetConnection www.realsam.ir -Port 443
tracert www.realsam.ir
```

</div>

<div dir="rtl" align="right">

توضیح خط‌به‌خط:

| فرمان | دقیقاً چه چیزی را بررسی می‌کند؟ |
|---|---|
| `ipconfig /all` | IP، Mask، Gateway، DHCP، DNS و MAC همهٔ Adapterها را نشان می‌دهد. |
| `route print` | Routing Tableهای IPv4/IPv6 Windows را نمایش می‌دهد. |
| `arp -a` | Cache نگاشت IPv4 به MAC را نشان می‌دهد. |
| `nslookup www.realsam.ir` | DNS Resolver تنظیم‌شده و پاسخ نام را آزمایش می‌کند. |
| `Test-NetConnection ... -Port 443` | Resolve، IP مقصد و امکان اتصال TCP به Port 443 را بررسی می‌کند. |
| `tracert www.realsam.ir` | با افزایش TTL، Hopهای پاسخ‌دهنده در مسیر را تخمین می‌زند؛ نبود پاسخ یک Hop الزاماً به معنی قطع مسیر نیست. |

## اشتباه‌های رایج تازه‌کارها

- «Wi-Fi وصل است» یعنی فقط Association/Link ممکن است برقرار باشد؛ DHCP، DNS یا Internet ممکن است خراب باشد.
- `ping` موفق یعنی همهٔ برنامه‌ها کار می‌کنند؟ خیر؛ TCP Port، TLS، DNS و Application جدا هستند.
- Public IP و Private IP یکسان نیستند.
- Port فیزیکی Switch با TCP/UDP Port یکی نیست.
- Bandwidth با سرعت دانلود واقعی برابر نیست.
- MAC در کل Internet مسیر‌یابی نمی‌شود.
- DNS یک Connection دائمی به Web Server نیست؛ فقط اطلاعات نام را فراهم می‌کند.
- HTTPS محتوای مسیر را رمز می‌کند، اما لزوماً وجود Malware یا معتبر بودن کسب‌وکار را تضمین نمی‌کند.

## آمادگی پایان فصل

باید بتوانید بدون حفظ متن توضیح دهید:

- چرا برای ارتباط هم IP و هم MAC و هم Port لازم می‌شود؛
- تفاوت Client/Server، LAN/WAN، Frame/Packet و Switch/Router چیست؛
- Host چگونه تصمیم می‌گیرد مستقیم یا از Gateway ارسال کند؛
- از لحظهٔ واردکردن URL تا Render چه مرحله‌هایی رخ می‌دهد؛
- هر فرمان پایه کدام بخش مسیر را ثابت می‌کند و چه چیزی را ثابت نمی‌کند.

فصل بعد: [OSI، TCP/IP، TCP، UDP و TLS](01-osi-tcp-ip-tls.md)

</div>
