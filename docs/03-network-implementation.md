<div dir="rtl" align="right">

# فصل ۳ — پیاده‌سازی شبکه

این فصل دامنه ۲ آزمون را پوشش می‌دهد: Routing، Switching، Wireless و نصب فیزیکی. دستورهای Cisco IOS برای یادگیری مفهوم‌اند؛ Syntax دقیق ممکن است با مدل و نسخه سیستم‌عامل فرق کند. آدرس‌های عمومی مثال از محدوده مستندسازی و دامنه از `realsam.ir` هستند.

## سناریوی مرجع

یک شرکت سه VLAN دارد:

| VLAN | نام | Subnet | Gateway | کاربرد |
|---:|---|---|---|---|
| 10 | USERS | `10.10.10.0/24` | `10.10.10.1` | کاربران |
| 20 | SERVERS | `10.10.20.0/24` | `10.10.20.1` | سرورها |
| 30 | VOICE | `10.10.30.0/24` | `10.10.30.1` | تلفن IP |
| 99 | MGMT | `10.10.99.0/24` | `10.10.99.1` | مدیریت |

پیوند WAN مستنداتی `198.51.100.0/30` است و نباید در اینترنت واقعی Route شود.

## ۲.۱ — Routing

### Router چگونه Route را انتخاب می‌کند؟

ترتیب فکری درست:

1. **Longest prefix match:** خاص‌ترین Prefix مقصد انتخاب می‌شود؛ `/24` از `/16` خاص‌تر است.
2. اگر Prefix یکسان از منابع متفاوت باشد، **Administrative Distance** کمتر ترجیح دارد.
3. اگر پروتکل و Prefix یکسان باشند، **Metric** بهتر همان پروتکل انتخاب می‌شود.
4. ممکن است چند مسیر هم‌هزینه برای Load sharing نصب شوند.

Metric پروتکل‌های مختلف را مستقیم مقایسه نکنید؛ ابتدا AD منبع تصمیم می‌گیرد. AD یک مفهوم محلی و Vendor-specific است، نه چیزی که در Packet حمل شود.

### اجزای Routing table

نمونه مفهومی:

</div>

<div dir="ltr" align="left">

```text
O 10.20.0.0/16 [110/20] via 192.0.2.2, 00:01:12, GigabitEthernet0/1
S* 0.0.0.0/0 [1/0] via 198.51.100.1
```

</div>

<div dir="rtl" align="right">

| بخش | معنی |
|---|---|
| `O` | مسیر آموخته‌شده از OSPF |
| `10.20.0.0/16` | Prefix مقصد |
| `[110/20]` | AD برابر ۱۱۰ و Metric برابر ۲۰ |
| `via 192.0.2.2` | Next hop |
| `GigabitEthernet0/1` | رابط خروجی |
| `S*` | Static و نامزد Default route |
| `0.0.0.0/0` | کم‌خاص‌ترین مسیر؛ Gateway of last resort |

### Static routing مرحله‌به‌مرحله

</div>

<div dir="ltr" align="left">

```cisco
enable
configure terminal
ip route 10.20.0.0 255.255.0.0 192.0.2.2
ip route 0.0.0.0 0.0.0.0 198.51.100.1
ip route 10.20.0.0 255.255.0.0 192.0.2.6 200
end
show ip route
show ip route 10.20.1.25
```

</div>

<div dir="rtl" align="right">

#### توضیح خط‌به‌خط

| خط | کار |
|---|---|
| `enable` | ورود به حالت Privileged EXEC |
| `configure terminal` | ورود به تنظیم سراسری |
| Route اول | مسیر شبکه `10.20.0.0/16` از Next hop اصلی |
| Route دوم | Default route برای مقصدهای ناشناخته |
| Route سوم | Floating static با AD=200؛ فقط هنگام نبود مسیر بهتر فعال می‌شود |
| `end` | بازگشت به Privileged EXEC |
| `show ip route` | دیدن جدول Routing |
| دستور آخر | دیدن تصمیم دقیق برای یک مقصد |

Static route ساده و قابل‌پیش‌بینی است، اما در شبکه بزرگ خودکار با تغییر Topology سازگار نمی‌شود.

### Dynamic routing

| پروتکل | نوع/کاربرد | Metric/ویژگی کلیدی |
|---|---|---|
| OSPF | Link-state و IGP باز | Cost، Area و SPF |
| EIGRP | Advanced distance-vector، عمدتاً Cisco | Composite metric و DUAL |
| BGP | Path-vector میان Autonomous Systemها و در شبکه‌های بزرگ | Policy و Path attributes |

OSPF همسایه می‌سازد، Link-state database را همگام و بهترین مسیر را با SPF محاسبه می‌کند. BGP صرفاً «کوتاه‌ترین مسیر عددی» نیست؛ Policy و Attributeهایی مانند AS path اهمیت دارند. EIGRP را با «فقط Hop count» اشتباه نگیرید.

### NAT، PAT، FHRP، VIP و Subinterface

- **Static NAT:** نگاشت ثابت یک Private به یک Public؛ مناسب سرویس ورودی، با Rule امنیتی جدا.
- **Dynamic NAT pool:** Privateها موقتاً از Pool عمومی می‌گیرند.
- **PAT/NAT overload:** چند Client با یک Public IP و Portهای متفاوت خروج می‌روند.
- **FHRP:** چند Router یک Virtual gateway می‌سازند. Host یک Virtual IP دارد و خرابی Router فعال را کمتر حس می‌کند. HSRP/VRRP نمونه‌اند.
- **VIP:** آدرس مجازی که به یک Node فیزیکی محدود نیست؛ در FHRP یا Load balancing دیده می‌شود.
- **Subinterface:** یک Interface فیزیکی به چند Interface منطقی با 802.1Q تقسیم می‌شود؛ Router-on-a-stick.

نمونه PAT:

</div>

<div dir="ltr" align="left">

```cisco
access-list 1 permit 10.10.0.0 0.0.255.255
interface GigabitEthernet0/0
 ip nat inside
interface GigabitEthernet0/1
 ip nat outside
ip nat inside source list 1 interface GigabitEthernet0/1 overload
show ip nat translations
show ip nat statistics
```

</div>

<div dir="rtl" align="right">

| خط | کار |
|---|---|
| ACL | شبکه‌های داخلی مجاز برای ترجمه را Match می‌کند؛ ACL امنیت کامل نیست |
| Interface اول | سمت داخل NAT را مشخص می‌کند |
| Interface دوم | سمت بیرون NAT را مشخص می‌کند |
| `overload` | PAT را با IP رابط بیرونی فعال می‌کند |
| دو `show` | نگاشت‌های زنده و آمار را نمایش می‌دهند |

NAT جای Firewall نیست و امنیت End-to-end را تضمین نمی‌کند.

## ۲.۲ — Switching و VLAN

### Switch چگونه Frame را جابه‌جا می‌کند؟

1. Source MAC را روی Port ورودی یاد می‌گیرد.
2. Destination MAC را در MAC table جست‌وجو می‌کند.
3. اگر مقصد شناخته‌شده و روی Port دیگری باشد، فقط همان‌جا Forward می‌کند.
4. Unknown unicast و Broadcast را در همان VLAN Flood می‌کند.
5. اگر Source و Destination روی همان Port باشند، Frame را Filter می‌کند.
6. Entryهای Dynamic پس از مدت Aging حذف می‌شوند.

هر VLAN یک Broadcast domain جداست. ارتباط میان VLANها به Router یا Layer 3 switch نیاز دارد.

### ساخت VLAN و Access port

</div>

<div dir="ltr" align="left">

```cisco
enable
configure terminal
vlan 10
 name USERS
vlan 20
 name SERVERS
vlan 30
 name VOICE
interface GigabitEthernet1/0/10
 description User-PC-and-IP-Phone
 switchport mode access
 switchport access vlan 10
 switchport voice vlan 30
 spanning-tree portfast
 spanning-tree bpduguard enable
end
show vlan brief
show interfaces GigabitEthernet1/0/10 switchport
```

</div>

<div dir="rtl" align="right">

#### توضیح خط‌به‌خط

| خط | کار |
|---|---|
| `vlan 10/20/30` | VLANها را در Database محلی می‌سازد |
| `name` | نام انسانی؛ forwarding به نام وابسته نیست |
| `interface ...` | Port مورد نظر را انتخاب می‌کند |
| `description` | مستندسازی اتصال |
| `switchport mode access` | Port را Access و نه Dynamic trunk می‌کند |
| `switchport access vlan 10` | Data بدون Tag را عضو VLAN 10 می‌کند |
| `switchport voice vlan 30` | Voice VLAN را به تلفن سازگار اعلام می‌کند |
| `portfast` | برای Endpoint سریع به Forwarding می‌رود؛ روی لینک Switch-to-switch بی‌محابا استفاده نشود |
| `bpduguard` | دریافت BPDU غیرمنتظره را با Err-disable پاسخ می‌دهد |
| دو `show` | عضویت VLAN و Operational mode را راستی‌آزمایی می‌کند |

### Trunk و 802.1Q

Trunk چند VLAN را روی یک لینک حمل می‌کند. 802.1Q یک Tag شامل VLAN ID به Frame اضافه می‌کند. Native VLAN معمولاً Untagged است؛ دو سمت باید Native VLAN یکسان و فهرست Allowed هماهنگ داشته باشند.

</div>

<div dir="ltr" align="left">

```cisco
configure terminal
vlan 999
 name NATIVE_UNUSED
interface GigabitEthernet1/0/48
 description Trunk-to-SW2
 switchport mode trunk
 switchport trunk native vlan 999
 switchport trunk allowed vlan 10,20,30,99
 switchport nonegotiate
end
show interfaces trunk
```

</div>

<div dir="rtl" align="right">

| خط | کار |
|---|---|
| VLAN 999 | Native VLAN بلااستفاده برای کاهش سوءاستفاده؛ باید در دو سمت مطابق باشد |
| `mode trunk` | Trunk را ثابت فعال می‌کند |
| `native vlan 999` | Native را از VLANهای کاری جدا می‌کند |
| `allowed vlan` | فقط VLANهای لازم را حمل می‌کند |
| `nonegotiate` | DTP را در دستگاه Cisco خاموش می‌کند؛ سمت مقابل هم دستی Trunk شود |
| `show interfaces trunk` | Native، Allowed و VLANهای Forwarding را بررسی می‌کند |

### SVI و Inter-VLAN routing

</div>

<div dir="ltr" align="left">

```cisco
configure terminal
ip routing
interface vlan 10
 description Users-Gateway
 ip address 10.10.10.1 255.255.255.0
 no shutdown
interface vlan 20
 description Servers-Gateway
 ip address 10.10.20.1 255.255.255.0
 no shutdown
end
show ip interface brief
show ip route connected
```

</div>

<div dir="rtl" align="right">

| خط | کار |
|---|---|
| `ip routing` | Routing را روی Multilayer switch فعال می‌کند |
| `interface vlan` | SVI لایه ۳ آن VLAN را می‌سازد |
| `ip address` | Default gateway اعضای VLAN را تنظیم می‌کند |
| `no shutdown` | Interface اداری را فعال می‌کند؛ برای Up شدن معمولاً VLAN و Port فعال نیز لازم است |
| `show ...` | وضعیت Interface و Connected routeها را بررسی می‌کند |

### STP

لینک افزونه بدون STP می‌تواند Broadcast storm، Duplicate frame و MAC flapping بسازد. STP یک Root bridge انتخاب و بعضی مسیرها را Block می‌کند. هزینه مسیر کمتر به Root بهتر است. RSTP همگرایی سریع‌تر از STP کلاسیک دارد.

نقش‌های مهم: Root port بهترین مسیر هر Switch غیرRoot به Root؛ Designated port بهترین خروجی هر Segment؛ Alternate مسیر پشتیبان. حالت‌های RSTP شامل Discarding، Learning و Forwarding است.

PortFast فقط برای Edge port است. BPDU Guard Edge آلوده را قطع می‌کند. Root Guard مانع Root شدن همسایه نامناسب و Loop Guard مانع Forwarding اشتباه هنگام گم‌شدن BPDU می‌شود.

</div>

<div dir="ltr" align="left">

```cisco
spanning-tree vlan 10,20,30 root primary
show spanning-tree vlan 10
show spanning-tree inconsistentports
```

</div>

<div dir="rtl" align="right">

خط اول Priority را طوری تنظیم می‌کند که دستگاه نامزد Root اصلی باشد؛ دو دستور بعد Root، Cost، Role/State و ناسازگاری Guardها را نشان می‌دهند. Root باید آگاهانه و نزدیک مرکز ترافیک انتخاب شود.

### Link Aggregation، MTU، speed و duplex

LAG چند لینک فیزیکی را یک لینک منطقی می‌کند. پهنای‌باند مجموع برای جریان‌های متعدد بیشتر می‌شود، ولی یک Flow معمولاً روی یک عضو Hash می‌شود. همه اعضا باید Speed، Duplex، VLAN/Trunk و MTU سازگار داشته باشند. LACP استاندارد باز برای مذاکره LAG است.

</div>

<div dir="ltr" align="left">

```cisco
interface range GigabitEthernet1/0/47-48
 channel-group 1 mode active
interface Port-channel1
 switchport mode trunk
 switchport trunk allowed vlan 10,20,30,99
show etherchannel summary
```

</div>

<div dir="rtl" align="right">

| خط | کار |
|---|---|
| `interface range` | دو عضو فیزیکی را انتخاب می‌کند |
| `channel-group ... active` | LACP فعال را برای Port-channel 1 می‌سازد |
| `interface Port-channel1` | تنظیم منطقی Bundle |
| دو `switchport` | Trunk و VLANهای لازم را روی Bundle می‌گذارد |
| `show` | Protocol، اعضا و حالت Bundled را بررسی می‌کند |

Auto-negotiation معمولاً بهترین انتخاب Ethernet مدرن است. Duplex mismatch سبب Late collision، CRC و کارایی بد می‌شود. **MTU** بزرگ‌ترین Packet قابل حمل در Interface است؛ Jumbo frame فقط وقتی کار می‌کند که تمام مسیر سازگار باشد. Packet بزرگ‌تر می‌تواند Fragment یا Drop شود و PMTUD به ICMP وابسته است.

## ۲.۳ — Wireless

### فرکانس، Channel و عرض Channel

| باند | ویژگی کلی | نکته طراحی |
|---|---|---|
| 2.4 GHz | نفوذ/برد بهتر، Channel کم و شلوغ | در بسیاری مناطق 1/6/11 برای 20 MHz هم‌پوشانی ندارند؛ مقررات محل تعیین‌کننده است |
| 5 GHz | Channel بیشتر، برد معمولاً کمتر | بعضی Channelها DFS و وابسته به تشخیص Radar هستند |
| 6 GHz | طیف تازه و ظرفیت زیاد | Client و AP سازگار و مقررات محلی لازم؛ WPA3 اهمیت دارد |

Channel width بزرگ‌تر Throughput بالقوه را بالا می‌برد ولی طیف بیشتری می‌گیرد و در محیط شلوغ تداخل را بیشتر می‌کند. **Band steering** Client دو/سه‌باند را به باند مناسب تشویق می‌کند؛ تصمیم نهایی اغلب با Client است. 802.11h برای Spectrum management در 5 GHz و DFS/TPC مرتبط است.

### شناسه‌ها و نوع شبکه

- **SSID:** نام قابل‌مشاهده WLAN.
- **BSSID:** شناسه یک Radio/Cell، معمولاً MAC.
- **ESSID:** مجموعه BSSها با SSID و Policy مشترک برای Roaming.
- **Infrastructure:** Client از AP استفاده می‌کند.
- **Ad hoc:** Clientها مستقیم، بدون AP مرکزی.
- **Point-to-point:** Bridge بی‌سیم دو محل.
- **Mesh:** AP/Nodeها Backhaul چندمسیری می‌سازند.

### Authentication و Encryption

WPA2/WPA3-Personal از PSK استفاده می‌کند. Enterprise از 802.1X/EAP و RADIUS برای هویت جداگانه کاربران استفاده می‌کند. WPA3-Personal از SAE استفاده و در برابر حدس آفلاین PSK مقاوم‌تر است. Open guest network بدون Captive portal امن نمی‌شود؛ Portal فقط پذیرش/ورود است و جای Encryption را نمی‌گیرد. برای مهمان جداسازی Client، VLAN جدا و Policy محدود لازم است.

از WEP، WPA قدیمی و TKIP استفاده نکنید. رمز قوی، Firmware به‌روز، خاموش‌کردن WPS و Management frame protection در صورت پشتیبانی مهم‌اند.

### آنتن و AP

Omnidirectional انرژی را پیرامون خود پخش می‌کند؛ Directional آن را در جهت خاص متمرکز می‌کند و برای Bridge یا پوشش هدفمند مناسب است. Gain انرژی تولید نمی‌کند؛ Pattern را تغییر می‌دهد. dBm توان مطلق و dBi Gain نسبت به آنتن فرضی Isotropic است.

AP **autonomous** مستقل تنظیم می‌شود. AP **lightweight** Policy را از Controller می‌گیرد. Controller ظرفیت، Channel، توان، Roaming و Policy را مرکزی مدیریت می‌کند؛ Control plane و Data path دقیق به معماری Vendor وابسته است.

### روش طراحی WLAN

1. نیاز ظرفیت، پوشش، نوع Client و برنامه را ثبت کنید.
2. Predictive survey اولیه و سپس بازدید Site انجام دهید.
3. منابع تداخل، جنس دیوار، ارتفاع و برق/کابل را ثبت کنید.
4. AP را برای پوشش و ظرفیت، نه صرفاً «آنتن کامل»، جای‌گذاری کنید.
5. Channel و Power را هماهنگ کنید.
6. SSID کم، VLAN و امنیت مناسب تعریف کنید.
7. پس از نصب Active/passive survey و آزمون Roaming/Throughput انجام دهید.
8. Baseline را ثبت و دوره‌ای بازبینی کنید.

Hidden SSID امنیت واقعی ایجاد نمی‌کند و افزایش حداکثری توان همه APها معمولاً Roaming و تداخل را بدتر می‌کند.

## ۲.۴ — نصب فیزیکی

### MDF، IDF و Rack

**MDF** نقطه توزیع اصلی و اتصال Backbone/Provider است. **IDF** توزیع طبقه یا ناحیه را نزدیک کاربران انجام می‌دهد. Rack diagram محل Unitها، جهت Airflow، توان و Patch panel را ثبت می‌کند. کابل‌های Horizontal به Patch panel خاتمه و با Patch cord به Switch وصل می‌شوند.

### چک‌لیست نصب

1. وزن، عمق و Rail تجهیزات و ظرفیت Rack را بررسی کنید.
2. تجهیزات سنگین را پایین Rack و مسیر هوای سرد/گرم را درست بگذارید.
3. اتصال زمین و مقررات برق/آتش را رعایت کنید.
4. A/B power feed را در صورت طراحی افزونه جدا کنید.
5. توان نامی، مصرف واقعی و ظرفیت Circuit/PDU/UPS را محاسبه کنید.
6. کابل Power و Data را مرتب، برچسب‌دار و بدون خم شدید نگه دارید.
7. Port، دو سر کابل و Patch panel را یکسان نام‌گذاری کنید.
8. دما، رطوبت، دود/حریق و دسترسی فیزیکی را پایش کنید.

### UPS، PDU و PoE

UPS برای زمان محدود برق و فرصت خاموشی/انتقال فراهم می‌کند؛ ژنراتور نقش طولانی‌تر دارد. PDU برق را توزیع و مدل هوشمند مصرف را اندازه می‌گیرد. توان با رابطه تقریبی زیر سنجیده می‌شود:

</div>

<div dir="ltr" align="left">

```text
Power (W) = Voltage (V) × Current (A) × Power Factor
```

</div>

<div dir="rtl" align="right">

برای AC واقعی Power factor و حاشیه ایمنی مهم است؛ از برق‌کار و مقررات محلی کمک بگیرید.

PoE داده و برق را روی Ethernet می‌رساند. **PSE** مانند Switch برق می‌دهد و **PD** مانند AP می‌گیرد. باید استاندارد، Class، توان هر Port و کل Power budget سازگار باشد. کابل معیوب یا طول زیاد می‌تواند Voltage drop/گرما بسازد. دستگاه Passive PoE نامطابق ممکن است آسیب ببیند.

### محیط و حریق

Hot aisle/cold aisle هوای ورودی سرد را از خروجی گرم جدا می‌کند. Humidity بسیار پایین خطر ESD و بسیار بالا خطر Condensation/خوردگی دارد. دما را در ورودی تجهیزات بسنجید، نه فقط دیوار اتاق. نوع Fire suppression باید با افراد، تجهیزات و قانون سازگار و دوره‌ای آزمایش شود.

## سناریوی عیب‌یابی پیاده‌سازی

کاربر VLAN 10 به Gateway دسترسی ندارد:

1. Link LED و `show interfaces status` را ببینید.
2. Access VLAN Port را با `show interfaces ... switchport` بررسی کنید.
3. وجود VLAN را با `show vlan brief` ببینید.
4. MAC کاربر را با `show mac address-table` پیدا کنید.
5. وضعیت SVI را با `show ip interface brief` بررسی کنید.
6. IP/mask/gateway Client را بررسی کنید.
7. در صورت عبور از Trunk، Allowed/native و STP state را ببینید.
8. پس از تغییر، Ping و مسیر را دوباره آزمایش و نتیجه را مستند کنید.

## تمرین پایان فصل

1. سناریوی مرجع را در Packet Tracer یا ابزار مشابه بسازید.
2. یک Route خاص و Default route تعریف کنید و با حذف Route خاص اثر Longest prefix را مشاهده کنید.
3. Trunk را عمداً با Allowed VLAN ناقص خراب و شواهد عیب را ثبت کنید.
4. Root bridge را آگاهانه انتخاب و قبل/بعد را در خروجی STP مقایسه کنید.
5. برای دفتر ۸۰ کاربره یک Channel plan اولیه بنویسید و توضیح دهید چرا Survey لازم است.
6. Power budget چهار AP و هشت تلفن را با اعداد Datasheet محاسبه کنید.

آزمایشگاه‌های هدایت‌شده در [فهرست Labs](../labs/README.md) آمده‌اند.

</div>
