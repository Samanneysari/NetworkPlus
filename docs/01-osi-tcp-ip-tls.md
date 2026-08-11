<div dir="rtl" align="right">

# فصل ویژه — OSI، TCP/IP، TCP، UDP و TLS Handshake

## چرا مدل لایه‌ای داریم؟

اگر یک فناوری مجبور بود همهٔ کارها را از سیگنال کابل تا نمایش صفحه انجام دهد، تغییر هر بخش کل سیستم را عوض می‌کرد. مدل لایه‌ای مسئله را تقسیم می‌کند. هر لایه خدمتی به لایهٔ بالاتر می‌دهد و از لایهٔ پایین‌تر استفاده می‌کند.

مزیت‌ها:

- طراحی و استانداردسازی ساده‌تر؛
- امکان تغییر Media بدون بازنویسی Application؛
- همکاری تجهیزات و نرم‌افزارهای شرکت‌های مختلف؛
- عیب‌یابی مرحله‌ای؛
- تفکیک آدرس، مسیر، انتقال، رمزنگاری و Application.

مدل یک نقشهٔ ذهنی است. در پیاده‌سازی واقعی، مرزها همیشه کاملاً جدا نیستند و بعضی پروتکل‌ها چند نقش دارند.

## مدل OSI چیست؟

مدل **Open Systems Interconnection** هفت لایه دارد. شماره‌گذاری از پایین به بالا است:

| شماره | نام انگلیسی | نام فارسی | PDU رایج | شناسه یا مفهوم مهم |
|---:|---|---|---|---|
| ۷ | Application | کاربرد | Data | نام سرویس، URL، Query، Command |
| ۶ | Presentation | نمایش | Data | Encoding، Compression، Encryption |
| ۵ | Session | نشست | Data | ایجاد، نگهداری و پایان Dialog/Session |
| ۴ | Transport | انتقال | Segment/Datagram | TCP/UDP Port، Sequence، Reliability |
| ۳ | Network | شبکه | Packet | IPv4/IPv6 Address و Route |
| ۲ | Data Link | پیوند داده | Frame | MAC، VLAN، FCS و تحویل روی Link |
| ۱ | Physical | فیزیکی | Bits/Signal | کابل، نور، RF، Connector، Pin و توان |

### روش حفظ‌کردن کافی نیست

عبارت‌های حفظی برای ترتیب مفیدند، اما آزمون سناریویی می‌پرسد خرابی در کدام لایه است یا کدام دستگاه چه تصمیمی می‌گیرد. بنابراین برای هر لایه این پنج مورد را بفهمید:

۱. چه مسئله‌ای را حل می‌کند؟  
۲. چه اطلاعاتی اضافه یا بررسی می‌کند؟  
۳. خروجی آن چیست؟  
۴. چه دستگاه/پروتکلی نمونهٔ آن است؟  
۵. خرابی آن چه نشانه‌ای دارد؟

## لایه ۱ — Physical

### وظیفه

تبدیل bitها به سیگنال و انتقال آن‌ها روی Media فیزیکی. این لایه معنی IP یا Port را نمی‌فهمد.

### موضوع‌های اصلی

- ولتاژ و سیگنال الکتریکی روی Copper؛
- Pulse نور روی Fiber؛
- موج رادیویی، Frequency، Channel و Modulation در Wireless؛
- Connector، Pinout، Pin/Pair، Polarity؛
- سرعت Link، Duplex فیزیکی/Negotiation؛
- طول مجاز کابل، Attenuation و Interference؛
- Transceiver و Optical Power؛
- PoE Power و Budget.

### تجهیزات و نمونه‌ها

Cable، Patch Panel، Repeater، Hub قدیمی، Antenna، Transceiver، Media Converter و بخش Physical کارت شبکه.

### نشانه‌های خرابی

- Link Light خاموش؛
- Interface `down/down`؛
- کابل قطع یا Connector بد؛
- Fiber TX/RX جابه‌جا؛
- Optic یا Wavelength ناسازگار؛
- توان PoE ناکافی؛
- CRC و Errorهای رو‌به‌افزایش به علت نویز/کابل؛
- Signal ضعیف Wireless.

### سؤال تشخیصی

آیا دو طرف واقعاً می‌توانند bitها را روی Media ردوبدل کنند؟

## لایه ۲ — Data Link

### وظیفه

تحویل Frame در یک Link یا Broadcast Domain محلی، تشخیص مرز فریم و خطای فریم و کنترل دسترسی به Media.

### زیرلایه‌ها

- **MAC:** آدرس‌دهی و دسترسی به Media؛
- **LLC:** رابط منطقی با لایهٔ بالاتر در مدل IEEE.

### Ethernet Frame ساده‌شده

| فیلد | نقش |
|---|---|
| Preamble/SFD | هم‌زمان‌سازی و تشخیص آغاز Frame |
| Destination MAC | گیرندهٔ Layer 2 در همین Link/VLAN |
| Source MAC | فرستندهٔ Layer 2 |
| 802.1Q Tag اختیاری | VLAN ID و Priority |
| EtherType/Length | نوع Payload، مانند IPv4، ARP یا IPv6 |
| Payload | Packet لایهٔ ۳ و Padding لازم |
| FCS | تشخیص خطای فریم با CRC؛ معمولاً برای اصلاح نیست |

### تصمیم Switch

Switch از **Source MAC** یاد می‌گیرد و با **Destination MAC** ارسال می‌کند:

- Known Unicast → فقط پورت مقصد؛
- Unknown Unicast → Flood در VLAN به‌جز پورت ورودی؛
- Broadcast → Flood در همان VLAN؛
- MAC مقصد روی همان پورت ورودی → Filter؛
- Loop → STP باید مسیر افزونه را Block/Discard کند.

### مفاهیم مهم

Ethernet، Wi-Fi MAC، VLAN، Trunk 802.1Q، STP، LACP، LLDP/CDP، ARP در مرز Layer 2/3 و MAC Table.

### نشانه‌های خرابی

- VLAN اشتباه؛
- Trunk اجازهٔ VLAN را نمی‌دهد؛
- Native VLAN mismatch؛
- STP Blocking یا Loop؛
- MAC Flapping؛
- Port Security violation؛
- Frameهای Giant/Runts یا FCS Error؛
- Wi-Fi Association مشکل دارد.

### سؤال تشخیصی

آیا Frame در VLAN و Link درست به MAC درست تحویل می‌شود؟

## لایه ۳ — Network

### وظیفه

آدرس‌دهی منطقی و انتخاب مسیر میان شبکه‌های مختلف.

### IPv4 Headerهای مهم

| فیلد | کاربرد |
|---|---|
| Version | IPv4 |
| IHL | طول Header |
| DSCP/ECN | علامت‌گذاری QoS و اعلان ازدحام |
| Total Length | اندازهٔ Packet |
| Identification/Flags/Fragment Offset | Fragmentation در IPv4 |
| TTL | در هر Router کم می‌شود تا Loop بی‌نهایت نشود |
| Protocol | Payload مثل TCP=6، UDP=17، ICMP=1 |
| Header Checksum | خطای Header IPv4؛ در هر Hop با تغییر TTL بازحساب می‌شود |
| Source/Destination IP | مبدأ و مقصد منطقی |

### تصمیم Router

۱. مقصد IP را می‌خواند.  
۲. Routeهای Matching را پیدا می‌کند.  
۳. طولانی‌ترین Prefix را انتخاب می‌کند.  
۴. اگر Prefix یکسان از منابع متفاوت باشد، Preference/Administrative Distance وارد تصمیم می‌شود.  
۵. Metric مسیرهای یک Protocol مقایسه می‌شود.  
۶. Next Hop و Interface خروجی Resolve می‌شوند.  
۷. Frame جدید برای Link بعدی ساخته می‌شود.

### پروتکل و تجهیزات

IPv4، IPv6، ICMP، IPsec، GRE، OSPF، EIGRP، BGP و Router/Layer 3 Switch/Firewall.

### نشانه‌های خرابی

- IP یا Mask اشتباه؛
- Gateway اشتباه؛
- Route یا Default Route وجود ندارد؛
- Duplicate IP؛
- Route برگشت نیست؛
- ACL Layer 3 Packet را رد می‌کند؛
- TTL Expired؛
- MTU/Fragmentation مشکل دارد.

### سؤال تشخیصی

آیا Packet برای IP مقصد Route معتبر و مسیر برگشت دارد؟

## لایه ۴ — Transport

### وظیفه

رساندن داده به Process درست، تفکیک چند ارتباط هم‌زمان و در TCP ایجاد انتقال قابل‌اعتماد، مرتب و کنترل‌شده.

### شناسهٔ Flow

یک جریان معمولاً با Five-Tuple شناخته می‌شود:

- Source IP
- Destination IP
- Protocol
- Source Port
- Destination Port

مثلاً مرورگر ممکن است از Source Port موقت `53124` به Server Port `443` وصل شود. پاسخ از `443` به `53124` برمی‌گردد.

### TCP و UDP

TCP و UDP در بخش‌های بعد عمیق بررسی می‌شوند.

### نشانه‌های خرابی

- Port مقصد بسته است؛
- Firewall Session را رد می‌کند؛
- TCP SYN بی‌پاسخ؛
- Connection Reset؛
- Retransmission زیاد؛
- Window بسیار کوچک یا Zero Window؛
- UDP Response نمی‌رسد؛
- Port Exhaustion در NAT یا Client.

### سؤال تشخیصی

آیا داده به Process و Port درست با رفتار انتقال موردنیاز می‌رسد؟

## لایه ۵ — Session

### وظیفه

ایجاد، حفظ، هماهنگی و پایان گفت‌وگو یا Session میان برنامه‌ها. در دنیای TCP/IP، بسیاری از وظایف این لایه داخل Application، Library یا Transport/TLS پیاده‌سازی می‌شوند و Protocol مستقل OSI ندارند.

### نمونهٔ مفهوم

- Login Session و Token؛
- نگهداری State در یک ارتباط؛
- Checkpoint و Resume؛
- آغاز/پایان Dialog؛
- RPC Session؛
- SMB/Database Session.

### نشانه‌های خرابی

- ارتباط Transport برقرار است، اما Session منقضی شده؛
- Token نامعتبر؛
- کاربر مرتب Logout می‌شود؛
- Load Balancer بدون Session Persistence درخواست مرتبط را به Backend نامناسب می‌فرستد.

### سؤال تشخیصی

آیا دو Application دربارهٔ وضعیت و ادامهٔ گفت‌وگو توافق دارند؟

## لایه ۶ — Presentation

### وظیفه

نمایش و تبدیل داده به قالبی که دو طرف بفهمند: Encoding، Serialization، Compression و Encryption.

### نمونه‌ها

- UTF-8 و تبدیل Character؛
- JSON، XML، ASN.1؛
- JPEG/PNG و Codecها؛
- Gzip Compression؛
- TLS Encryption در نگاشت آموزشی رایج.

TLS دقیقاً فقط «لایهٔ ۶ OSI» نیست؛ در Stack واقعی میان Application و Transport عمل می‌کند. قرار‌دادن آن در Presentation یک مدل آموزشی برای نقش رمز/نمایش است.

### نشانه‌های خرابی

- Characterهای خراب به علت Encoding؛
- Certificate نامعتبر؛
- Cipher/Version مشترک وجود ندارد؛
- Decompression/Format Error؛
- Client نوع Content را نمی‌فهمد.

### سؤال تشخیصی

آیا داده با Encoding، Format، Compression و Protection قابل فهم مشترک نمایش داده می‌شود؟

## لایه ۷ — Application

### وظیفه

ارائهٔ سرویس شبکه به برنامهٔ کاربر. این لایه خود برنامهٔ GUI نیست؛ Protocol و منطق سرویس نزدیک به Application است.

### نمونه‌ها

HTTP/HTTPS، DNS، DHCP، SMTP، SMB، FTP/SFTP، SSH، SNMP، LDAP، RDP، SIP و APIها.

### نشانه‌های خرابی

- HTTP 404/500؛
- DNS `NXDOMAIN` یا `SERVFAIL`؛
- DHCP Scope خالی؛
- Authentication رد می‌شود؛
- API Schema یا Token اشتباه؛
- SMTP Relay Policy اجازه نمی‌دهد.

### سؤال تشخیصی

آیا سرویس موردنظر درخواست را می‌فهمد، اجازه می‌دهد و پاسخ معتبر می‌دهد؟

## جدول یک‌جای عیب‌یابی OSI

| لایه | اولین Evidenceها | نمونهٔ ابزار |
|---:|---|---|
| ۱ | Link، Signal، Power، Error Counter | Cable Tester، VFL، Wi-Fi Analyzer، `show interface` |
| ۲ | VLAN، MAC Table، STP، Frame | `show vlan`، `show mac-address-table`، Wireshark |
| ۳ | IP/Mask/Gateway، ARP/ND، Route | `ipconfig`، `ip route`، `traceroute`، `show route` |
| ۴ | Port، SYN/ACK/RST، Retransmission | `ss`، `netstat`، `Test-NetConnection`، Wireshark |
| ۵ | Session/Token/State | Application Log، Load Balancer Session |
| ۶ | TLS، Certificate، Encoding | Browser TLS info، `openssl`، Capture |
| ۷ | DNS/HTTP/Service Response | `dig`، `curl`، Log و API Client |

## Encapsulation خط‌به‌خط

فرض کنید مرورگر ۱۰۰ Byte دادهٔ HTTP تولید می‌کند:

۱. Application پیام HTTP می‌سازد.  
۲. TLS آن را رمز و Record ایجاد می‌کند.  
۳. TCP Header با Source/Destination Port و Sequence اضافه می‌کند.  
۴. IP Header با Source/Destination IP اضافه می‌کند.  
۵. Ethernet Header/Trailer با MAC و FCS اضافه می‌کند.  
۶. NIC فریم را به Signal می‌برد.  
۷. Switch فقط لایهٔ ۲ لازم را بررسی می‌کند.  
۸. Router Ethernet قدیمی را حذف، IP را پردازش و Ethernet جدید می‌سازد.  
۹. Server مراحل را برعکس انجام می‌دهد تا HTTP را به Web Server برساند.

اندازهٔ دقیق به Optionها، TLS Record، TCP/IP Header، VLAN Tag و Media بستگی دارد. MTU معمول Ethernet اغلب ۱۵۰۰ Byte Payload لایهٔ ۳ است، نه اندازهٔ کامل Frame و نه اندازهٔ Application Data.

## مدل TCP/IP و نگاشت آن به OSI

مدل TCP/IP عملی‌تر و معمولاً چهارلایه‌ای است:

| TCP/IP | OSI تقریبی | نمونه |
|---|---|---|
| Application | ۵، ۶، ۷ | HTTP، DNS، SSH، TLS، DHCP |
| Transport | ۴ | TCP، UDP |
| Internet | ۳ | IPv4، IPv6، ICMP |
| Network Access/Link | ۱ و ۲ | Ethernet، Wi-Fi، Fiber/Signal |

گاهی Network Access به Data Link و Physical شکسته و مدل پنج‌لایه‌ای تدریس می‌شود. این اختلاف به معنی تناقض عملکرد نیست؛ فقط سطح تفکیک مدل‌ها متفاوت است.

## TCP چیست؟

TCP یک Protocol **Connection-Oriented** برای ارائهٔ Byte Stream مرتب و قابل‌اعتماد است.

### TCP چه تضمین‌هایی می‌دهد؟

- تشخیص دادهٔ گم‌شده با Sequence/ACK؛
- Retransmission؛
- تحویل مرتب Byteها به Application؛
- جلوگیری از تحویل Duplicate؛
- Flow Control برای ظرفیت گیرنده؛
- Congestion Control برای وضعیت شبکه؛
- Checksum برای تشخیص خطای Segment.

TCP تضمین نمی‌کند Application درخواست را قبول کرده، Server سالم است یا Data روی Disk ذخیره شده؛ فقط رفتار Stream میان Endpointهای TCP را مدیریت می‌کند.

## TCP Header مهم

| فیلد | معنی |
|---|---|
| Source/Destination Port | Processهای دو طرف |
| Sequence Number | شمارهٔ اولین Byte این Segment در Stream |
| Acknowledgment Number | شمارهٔ Byte بعدی موردانتظار |
| Flags | SYN، ACK، FIN، RST، PSH و دیگر Controlها |
| Window Size | فضای دریافت اعلام‌شده برای Flow Control |
| Checksum | تشخیص خطا روی Header/Data با Pseudo Header IP |
| Options | MSS، Window Scale، SACK، Timestamp و غیره |

## TCP Three-Way Handshake دقیق

فرض کنیم Client یک Initial Sequence Number برابر ۱۰۰۰ و Server برابر ۷۰۰۰ انتخاب می‌کند.

### پیام اول — SYN

Client می‌گوید: «می‌خواهم Connection ایجاد کنم؛ Sequence اولیهٔ من ۱۰۰۰ است و Optionهای من این‌هاست.» خود SYN یک شماره از فضای Sequence مصرف می‌کند.

### پیام دوم — SYN-ACK

Server می‌گوید: «درخواستت را دیدم؛ Byte بعدی مورد انتظار من ۱۰۰۱ است. Sequence اولیهٔ من ۷۰۰۰ است.»

### پیام سوم — ACK

Client می‌گوید: «SYN تو را دیدم؛ Byte بعدی مورد انتظار من ۷۰۰۱ است.» Connection وارد حالت Established می‌شود.

نمای ساده:

</div>

<div dir="ltr" align="left">

```text
Client                                  Server
SYN, Seq=1000 ------------------------->
                 <---------------------- SYN, ACK, Seq=7000, Ack=1001
ACK, Seq=1001, Ack=7001 -------------->
```

</div>

<div dir="rtl" align="right">

توضیح خط‌به‌خط:

| خط | معنی |
|---|---|
| `SYN, Seq=1000` | Client درخواست شروع و Sequence اولیهٔ خود را اعلام می‌کند. |
| `SYN, ACK, Seq=7000, Ack=1001` | Server هم SYN خودش را می‌فرستد و SYN Client را با انتظار شمارهٔ بعد تأیید می‌کند. |
| `ACK, Seq=1001, Ack=7001` | Client SYN Server را تأیید می‌کند؛ دو جهت مستقل Sequence دارند. |

### چرا دو پیام کافی نیست؟

هر طرف باید ثابت کند هم می‌تواند پیام طرف مقابل را دریافت کند و هم Sequence اولیهٔ خودش به طرف مقابل رسیده است. سه پیام وضعیت دوطرفه را هماهنگ می‌کند و احتمال اشتباه با Segment قدیمی را کاهش می‌دهد.

## ACK، Retransmission و SACK

TCP معمولاً ACK تجمعی می‌فرستد. `Ack=5001` یعنی تمام Byteها تا ۵۰۰۰ دریافت شده و Byte ۵۰۰۱ انتظار می‌رود. اگر Segment گم شود، ACK تکراری یا Timeout می‌تواند Retransmission را تحریک کند.

**Selective Acknowledgment (SACK)** اجازه می‌دهد گیرنده Rangeهای دریافت‌شدهٔ بعد از Gap را اعلام کند تا فرستنده فقط بخش‌های واقعاً گم‌شده را دوباره بفرستد.

## Flow Control و Congestion Control

- **Flow Control:** گیرنده با Receive Window می‌گوید چه مقدار Buffer دارد. هدف جلوگیری از غرق‌کردن Endpoint است.
- **Congestion Control:** فرستنده با الگوریتم‌هایی مانند Slow Start/Congestion Avoidance نرخ را با ظرفیت شبکه تطبیق می‌دهد. هدف جلوگیری از ازدحام مسیر است.

Receive Window و Congestion Window دو محدودیت جدا هستند؛ مقدار مؤثر ارسال از محدودکننده‌تر پیروی می‌کند.

## پایان TCP

پایان عادی هر جهت جداست و معمولاً FIN/ACK در چهار پیام دیده می‌شود. `FIN` یعنی «در این جهت Data دیگری ندارم». `RST` پایان فوری و غیرعادی یا رد Connection است.

</div>

<div dir="ltr" align="left">

```text
Client                                  Server
FIN, ACK ------------------------------>
                 <---------------------- ACK
                 <---------------------- FIN, ACK
ACK ----------------------------------->
```

</div>

<div dir="rtl" align="right">

توضیح خط‌به‌خط:

| خط | معنی |
|---|---|
| `FIN, ACK` از Client | Client جهت ارسال خودش را می‌بندد و داده‌های قبلی را تأیید می‌کند. |
| `ACK` از Server | دریافت FIN را تأیید می‌کند؛ ممکن است هنوز در جهت خودش Data بفرستد. |
| `FIN, ACK` از Server | Server نیز جهت ارسال خود را می‌بندد. |
| `ACK` از Client | پایان Server را تأیید می‌کند؛ حالت TIME_WAIT از Segmentهای دیررس محافظت می‌کند. |

## UDP چیست؟

UDP یک Protocol Connectionless مبتنی بر Datagram است. Header سادهٔ آن Source Port، Destination Port، Length و Checksum دارد.

UDP به‌صورت داخلی این موارد را تضمین نمی‌کند:

- Handshake؛
- تحویل؛
- ترتیب؛
- Retransmission؛
- Flow/Congestion Control مانند TCP.

این موضوع به معنی «UDP همیشه داده گم می‌کند» نیست. شبکه ممکن است همهٔ Datagramها را تحویل دهد و Application می‌تواند Reliability خاص خودش را بسازد.

### کاربردهای UDP

- DNS Queryهای معمول؛
- DHCP؛
- NTP؛
- Voice/Video زنده که Data دیررس از Data گم‌شده بدتر است؛
- بازی آنلاین؛
- QUIC که Reliability، Security و Streamها را در User Space روی UDP پیاده می‌کند.

## مقایسه TCP و UDP

| ویژگی | TCP | UDP |
|---|---|---|
| Connection State | دارد | در Transport پایه ندارد |
| نوع داده | Byte Stream | Datagram با مرز پیام |
| ترتیب و Retransmit | دارد | Application باید تصمیم بگیرد |
| Header/Overhead | بیشتر | کمتر |
| Multicast/Broadcast | معمولاً خیر | می‌تواند استفاده شود |
| کاربرد | HTTPS سنتی، SSH، SMB، Mail | DNS، DHCP، NTP، Media و QUIC |

انتخاب بر اساس نیاز Application است، نه اینکه یکی مطلقاً بهتر یا سریع‌تر باشد.

## TLS چیست؟

TLS سه هدف اصلی دارد:

- **Confidentiality:** شنودگر محتوای Application را نخواند؛
- **Integrity:** تغییر Data تشخیص داده شود؛
- **Authentication:** معمولاً Client هویت Server را با Certificate و PKI بررسی کند؛ Client Certificate نیز اختیاری است.

TLS روی TCP معمولاً بعد از TCP Handshake آغاز می‌شود. HTTPS یعنی HTTP داخل TLS. در HTTP/3، QUIC روی UDP، TLS 1.3 را داخل طراحی خود ادغام می‌کند.

## Certificate و PKI به زبان ساده

Certificate معمولاً شامل Public Key، نام‌ها در SAN، صادرکننده، زمان اعتبار، Serial و Signature است. Client موارد زیر را بررسی می‌کند:

- زنجیره به Root CA مورد اعتماد برسد؛
- Signature هر مرحله معتبر باشد؛
- Hostname در SAN وجود داشته باشد؛
- زمان Not Before/Not After درست باشد؛
- استفادهٔ Key/Certificate مناسب باشد؛
- Revocation/Policy طبق پیاده‌سازی رعایت شود.

Certificate شامل Private Key Server نیست. Private Key باید محرمانه بماند.

## TLS 1.3 Handshake مرحله‌به‌مرحله

### ۱. ClientHello

Client نسخه‌های پشتیبانی‌شده، Cipher Suiteها، Random، Key Share موقت، SNI برای نام دامنه، ALPN برای HTTP/1.1 یا HTTP/2 و Extensionهای دیگر را می‌فرستد.

### ۲. ServerHello

Server نسخه، Cipher Suite و Key Share را انتخاب می‌کند. با ECDHE دو طرف بدون ارسال مستقیم Session Key، Secret مشترک مشتق می‌کنند. از این نقطه بخش زیادی از Handshake رمز می‌شود.

### ۳. EncryptedExtensions

Server Extensionهای مذاکره‌شده مانند ALPN را در کانال رمز‌شده اعلام می‌کند.

### ۴. Certificate و CertificateVerify

Server زنجیرهٔ Certificate را می‌فرستد. `CertificateVerify` با Private Key ثابت می‌کند Server مالک کلید متناظر Certificate است و Transcript Handshake دست‌کاری نشده است.

### ۵. Finished سرور

Server با Key مشتق‌شده MACی روی Transcript می‌سازد تا صحت Handshake تا اینجا ثابت شود.

### ۶. Validation در Client

Client Certificate، Hostname، زنجیره، زمان، Signature و Policy را بررسی می‌کند. اگر معتبر نباشد، باید Connection را متوقف یا Warning جدی نشان دهد.

### ۷. Finished کلاینت

Client پیام Finished خود را می‌فرستد. اگر Mutual TLS لازم باشد، Client نیز Certificate و اثبات مالکیت ارائه می‌کند.

### ۸. Application Data

HTTP یا Protocol برنامه با کلیدهای Application Traffic رمز می‌شود. Keyهای ارسال Client و Server جدا هستند.

نمای ساده:

</div>

<div dir="ltr" align="left">

```text
Client                                                     Server
ClientHello + supported_versions + key_share ------------->
                 <------------------------------------------ ServerHello + key_share
                 <------------------------------------------ EncryptedExtensions
                 <------------------------------------------ Certificate
                 <------------------------------------------ CertificateVerify
                 <------------------------------------------ Finished
Validate certificate and handshake transcript
Finished ------------------------------------------------->
Encrypted application data <=============================> Encrypted application data
```

</div>

<div dir="rtl" align="right">

توضیح خط‌به‌خط:

| خط | معنی |
|---|---|
| `ClientHello` | قابلیت‌ها، نام مقصد و Key Share پیشنهادی Client را آغاز می‌کند. |
| `ServerHello` | انتخاب‌ها و سهم Server برای مشتق‌کردن Secret را اعلام می‌کند. |
| `EncryptedExtensions` | نتیجهٔ Extensionهای مذاکره‌شده را در بخش رمز‌شده می‌دهد. |
| `Certificate` | هویت ادعایی Server و Public Key را در زنجیرهٔ PKI ارائه می‌کند. |
| `CertificateVerify` | مالکیت Private Key و صحت Transcript را ثابت می‌کند. |
| `Finished` سرور | ثابت می‌کند Server Keyهای Handshake درست را دارد. |
| Validation | Client باید اعتماد، نام، زمان و Signatureها را بررسی کند. |
| `Finished` کلاینت | Client نیز صحت Secret/Transcript را ثابت می‌کند. |
| Application Data | دادهٔ برنامه با AEAD رمز و Integrity-Protected می‌شود. |

### چرا Wireshark Certificate را می‌بیند ولی HTTP را نه؟

در TLS 1.3 حتی Certificate معمولاً بعد از ServerHello رمز است. بدون Session Key، Capture فقط Metadataهایی مثل IP، Port، اندازه/زمان Packet، ClientHello و بعضی Extensionهای اولیه را می‌بیند. با Key Log مجاز از Client آزمایشگاهی می‌توان رمزگشایی آموزشی انجام داد.

### TLS 1.2 چه تفاوت مهمی دارد؟

TLS 1.2 Handshake معمولاً پیام‌های بیشتری دارد، Certificate به‌صورت آشکار دیده می‌شود و Cipher Suite مفهوم گسترده‌تری شامل Key Exchange دارد. TLS 1.3 الگوریتم‌های قدیمی را حذف، Handshake را کوتاه‌تر و Forward Secrecy را در روش‌های عادی اجباری‌تر کرده است.

### Session Resumption و 0-RTT

Client می‌تواند با PSK/Ticket Session قبلی سریع‌تر Resume کند. 0-RTT امکان ارسال Early Data را می‌دهد، اما Replay Risk دارد؛ Application نباید عملیات غیرقابل‌تکرار حساس را بدون کنترل Replay در 0-RTT بپذیرد.

## بررسی TCP و TLS با ابزار

</div>

<div dir="ltr" align="left">

```bash
ss -ntp
tcpdump -ni any 'tcp port 443'
openssl s_client -connect www.realsam.ir:443 -servername www.realsam.ir
curl -v https://www.realsam.ir/
```

</div>

<div dir="rtl" align="right">

توضیح خط‌به‌خط:

| فرمان | معنی |
|---|---|
| `ss -ntp` | Socketهای TCP، State، آدرس/Port و Process را با مجوز مناسب نشان می‌دهد. |
| `tcpdump -ni any 'tcp port 443'` | روی همهٔ Interfaceها بدون Resolve نام، Packetهای TCP Port 443 را Capture می‌کند؛ Payload TLS رمز است. |
| `openssl s_client ... -servername ...` | TLS Connection می‌سازد و SNI صحیح می‌فرستد تا Certificate/Handshake Server بررسی شود. خروجی را با مفهوم Validation کامل اشتباه نگیرید. |
| `curl -v https://...` | مراحل Resolve، Connection، TLS و HTTP Headerها را Verbose نمایش می‌دهد؛ ممکن است اطلاعات حساس Header را نشان دهد. |

Filterهای آموزشی Wireshark:

| Filter | کاربرد |
|---|---|
| `arp` | ARP Request/Reply |
| `dns` | DNS Query/Response |
| `tcp.flags.syn == 1` | Packetهای دارای SYN |
| `tcp.analysis.retransmission` | Retransmission تشخیص‌داده‌شده |
| `tcp.stream eq 0` | یک Stream خاص |
| `tls.handshake` | پیام‌های Handshake قابل تشخیص |
| `icmp or icmpv6` | پیام‌های کنترلی IP |

Capture شبکه می‌تواند Credential، Token، Cookie، IP و اطلاعات شخصی داشته باشد. فقط روی سیستم/شبکهٔ مجاز Capture کنید و فایل را امن نگه دارید.

## سناریوی عیب‌یابی لایه‌ای

کاربر می‌گوید «سایت باز نمی‌شود»:

۱. لایه ۱: آیا Link و Wi-Fi Signal برقرار است؟  
۲. لایه ۲: آیا VLAN/Association درست است؟  
۳. لایه ۳: IP، Mask، Gateway، ARP و Route چیست؟  
۴. DNS: نام Resolve می‌شود؟  
۵. لایه ۴: TCP 443 SYN-ACK می‌دهد یا Timeout/RST است؟  
۶. TLS: Certificate، Hostname، Time و Cipher/Version درست است؟  
۷. HTTP: Status Code چیست؟  
۸. Application: آیا Browser/Proxy/Auth/Server Log علت را نشان می‌دهد؟

این ترتیب مانع تعویض تصادفی تنظیمات می‌شود. ممکن است با روش Divide and Conquer از میانه شروع کنید، اما هر فرض باید با Evidence آزمایش شود.

## آمادگی پایان فصل

باید بتوانید:

- هر هفت لایه را با وظیفه، PDU، آدرس، دستگاه، Protocol و خرابی توضیح دهید؛
- نگاشت OSI و TCP/IP را بدون ادعای مرز کاملاً فیزیکی بیان کنید؛
- Encapsulation را از HTTP تا Signal و برعکس دنبال کنید؛
- TCP Handshake، Sequence، ACK، Window، Retransmission، FIN و RST را بخوانید؛
- تفاوت TCP و UDP را بر اساس نیاز Application توضیح دهید؛
- TLS 1.3 Handshake و نقش Certificate/PKI/ECDHE/Finished را مرحله‌ای بیان کنید؛
- تشخیص دهید خرابی «Link»، «Route»، «Port»، «TLS» یا «Application» است.

بعدی: [دامنه ۱ — مفاهیم شبکه](02-networking-concepts.md)

</div>
