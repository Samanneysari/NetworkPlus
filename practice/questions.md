<div dir="rtl" align="right">

# ۲۰۰ سؤال تألیفی Network+ N10-009

این سؤال‌ها مستقل و تألیفی‌اند و «دامپ آزمون» نیستند. ابتدا بدون پاسخ‌نامه حل کنید. سؤال‌های چندپاسخی تعداد انتخاب را مشخص می‌کنند. در سناریوها، کم‌خطرترین و دقیق‌ترین پاسخ را انتخاب کنید.

## ۱.۱ — OSI، TCP/IP، TCP/UDP و TLS

1. کابل شبکه قطع شده است. مشکل در کدام لایه OSI آغاز می‌شود؟ الف) Physical ب) Network ج) Session د) Application
2. Switch لایه ۲ برای Forward فریم ابتدا کدام مقدار را جست‌وجو می‌کند؟ الف) Port TCP ب) Destination MAC ج) URL د) Username
3. کدام PDU در لایه Network به‌کار می‌رود؟ الف) Frame ب) Packet ج) Bit د) Segment فقط
4. سه مرحله آغاز TCP را به ترتیب بنویسید.
5. کدام ویژگی UDP را بهتر توصیف می‌کند؟ الف) ACK و Retransmission ذاتی ب) Connectionless و سربار کمتر ج) تضمین ترتیب د) TLS اجباری
6. در TLS 1.3، Client با بررسی Certificate در اصل چه چیزی را می‌سنجد؟ الف) سرعت Router ب) اتصال Identity به Public key و زنجیره اعتماد ج) MAC سرور د) Private IP
7. یک HTTPS کند است. DNS=5ms، TCP=20ms، TLS=25ms و First byte=4s است. محتمل‌ترین ناحیه مشکل کدام است؟ الف) کابل Client ب) پردازش برنامه/Backend ج) DNS د) TCP handshake
8. Encapsulation را از Application تا Wire با چهار نام اصلی مرتب کنید.

## ۱.۲ — تجهیزات و Functionها

9. برای Block storage یک Hypervisor کدام گزینه مناسب‌تر است؟ الف) NAS ب) SAN ج) Forward proxy د) AP
10. چه دستگاهی درخواست ورودی وب را میان چند Backend سالم توزیع می‌کند؟ الف) Load balancer ب) Patch panel ج) IDS passive د) Modem
11. تفاوت اصلی IDS و IPS چیست؟
12. برای اعمال Policy وب کاربران به اینترنت از طرف Client کدام مناسب‌تر است؟ الف) Forward proxy ب) Reverse proxy ج) SAN د) PDU
13. کدام دستگاه Broadcast domainهای IP را به هم Route می‌کند؟ الف) Hub ب) Router ج) Patch panel د) Repeater
14. دو کاربرد QoS و یک محدودیت آن را بنویسید.
15. TTL بسته در هر Router چه تغییری می‌کند و چرا؟
16. CDN چه دو اثر مهمی روی سرویس وب دارد؟

## ۱.۳ — Cloud

17. در IaaS، Patch سیستم‌عامل VM معمولاً مسئول چه کسی است؟ الف) مشتری ب) ISP کاربر ج) Registrar د) هیچ‌کس
18. افزایش خودکار تعداد Instanceها در بار زیاد و کاهش آن در بار کم چیست؟ الف) Multitenancy ب) Elasticity ج) Encapsulation د) Attenuation
19. Security group Stateful چه تفاوتی با Network ACL Stateless دارد؟
20. برای اتصال اختصاصی و قابل‌پیش‌بینی On-premises به Cloud کدام گزینه مناسب‌تر است؟ الف) Direct connection ب) Public DNS ج) APIPA د) Captive portal
21. مدل ترکیب Private/On-premises و Public cloud چیست؟ الف) Community string ب) Hybrid cloud ج) Full mesh د) SaaS
22. NFV را در یک جمله و با یک مثال توضیح دهید.
23. مشتری SaaS معمولاً مسئول کدام دو مورد می‌ماند؟ الف) تعویض Disk و کابل ب) داده و دسترسی کاربران ج) Hypervisor و Firmware د) برق Data center
24. تفاوت Scalability افقی و عمودی چیست؟

## ۱.۴ — پورت، پروتکل و ترافیک

25. پورت پیش‌فرض SSH/SFTP کدام است؟ الف) 21 ب) 22 ج) 23 د) 25
26. DHCPv4 Server و Client به‌ترتیب از چه پورت‌هایی استفاده می‌کنند؟ الف) 53/53 ب) 67/68 ج) 68/67 د) 161/162
27. چرا DNS علاوه بر UDP/53 به TCP/53 هم نیاز دارد؟
28. کدام جفت امن‌تر است؟ الف) Telnet/FTP ب) SSH/SFTP ج) HTTP/TFTP د) LDAP/Telnet
29. SNMP Poll و Trap به‌ترتیب معمولاً کدام پورت‌اند؟ الف) 161/162 ب) 162/161 ج) 389/636 د) 514/587
30. ارسال به نزدیک‌ترین عضو از چند سرور دارای IP مشترک چه نوع ترافیکی است؟ الف) Broadcast ب) Multicast ج) Anycast د) Unicast محلی
31. GRE چه چیزی ندارد که IPsec ESP می‌تواند فراهم کند؟ الف) Encapsulation ب) محرمانگی ج) IP header د) Tunnel
32. پورت Client موقت در اتصال HTTPS چه نام دارد و چرا لازم است؟

## ۱.۵ — Media و Connector

33. برای Backbone طولانی و مقاوم به EMI کدام رسانه مناسب‌تر است؟ الف) UTP ب) Single-mode fiber ج) Coax کوتاه د) RJ11
34. کدام Connector معمولاً روی Transceiver فیبر با تراکم بالا دیده می‌شود؟ الف) LC ب) F-type ج) RJ11 د) BNC
35. MPO چه مزیت اصلی دارد؟ الف) چند رشته فیبر در یک Connector ب) برق PoE ج) تبدیل DNS د) رمزنگاری
36. چرا شکل یکسان دو SFP سازگاری را تضمین نمی‌کند؟ دو عامل بنویسید.
37. کابل Plenum برای چه محیطی طراحی شده است؟
38. تفاوت Multimode و Single-mode را از نظر هسته و فاصله توضیح دهید.
39. کدام Connector برای Cable modem روی Coax رایج است؟ الف) ST ب) F-type ج) LC د) RJ45
40. مهم‌ترین قانون ایمنی هنگام کار با فیبر چیست؟

## ۱.۶ — Topology

41. معماری‌ای که هر Leaf به همه Spineها وصل است چیست؟ الف) Three-tier ب) Spine-leaf ج) Bus د) Ring
42. ترافیک میان دو Workload داخل Data center چه نام دارد؟ الف) North-south ب) East-west ج) Broadcast د) Out-of-band
43. یک مزیت و یک عیب Full mesh بنویسید.
44. در Collapsed core کدام دو لایه ترکیب می‌شوند؟
45. معماری شعب متصل به مرکز مشترک چیست؟ الف) Hub-and-spoke ب) Full mesh ج) Ad hoc د) SAN
46. در Star، خرابی کابل یک Client چه اثری دارد؟ خرابی دستگاه مرکزی چطور؟
47. تفاوت Point-to-point و Mesh را توضیح دهید.
48. سه لایه معماری Three-tier را نام ببرید.

## ۱.۷ — IPv4 و Subnetting

49. کدام آدرس RFC1918 است؟ الف) `172.20.5.4` ب) `172.32.1.1` ج) `192.0.2.5` د) `8.8.8.8`
50. Client آدرس `169.254.22.8` گرفته است. نخست کدام سرویس را بررسی می‌کنید؟ الف) NTP ب) DHCP ج) SMTP د) SNMP
51. شبکه آدرس `192.0.2.77/27` چیست؟
52. Broadcast شبکه `198.51.100.64/26` چیست؟
53. `/29` معمولاً چند Host قابل‌استفاده دارد؟ الف) 4 ب) 6 ج) 8 د) 14
54. VLSM چه مشکلی را حل می‌کند؟
55. چرا Private IP به‌تنهایی کنترل امنیتی کافی نیست؟
56. `/32` و `/31` معمولاً در چه سناریوهایی استفاده می‌شوند؟

## ۱.۸ — شبکه مدرن

57. انتخاب مسیر WAN بر اساس برنامه و SLA ویژگی کدام است؟ الف) SD-WAN ب) ARP ج) SAN د) STP
58. VXLAN فریم لایه ۲ را معمولاً داخل چه چیزی حمل می‌کند؟ الف) UDP روی Layer 3 ب) Coax ج) SMTP د) USB
59. VNI بیست‌وچهاربیتی چه مزیتی نسبت به VLAN ID دارد؟
60. Zero Trust بر چه اصل دسترسی‌ای تأکید دارد؟ الف) اعتماد کامل به LAN ب) هویت/وضعیت و کمترین مجوز ج) حذف Authentication د) فقط IP عمومی
61. SASE چه دو حوزه کلی را ترکیب می‌کند؟
62. دو مزیت ذخیره IaC در Source control و یک خطر آن را بنویسید.
63. Dual stack چه هزینه عملیاتی ایجاد می‌کند؟
64. NAT64/DNS64 برای چه نوع Client و مقصدی کاربرد دارد؟

## ۲.۱ — Routing

65. Router میان `/16` و `/24` مطابق مقصد، کدام را انتخاب می‌کند و چرا؟
66. اگر دو Route با Prefix یکسان از OSPF و Static باشند، کدام معیار ابتدا منبع را ترجیح می‌دهد؟ الف) MTU ب) AD ج) TTL د) VLAN ID
67. Floating static route چگونه ساخته می‌شود؟
68. PAT چگونه چند Client را با یک Public IP متمایز می‌کند؟
69. وظیفه FHRP چیست؟
70. OSPF از چه نوع پروتکل و الگوریتم کلی استفاده می‌کند؟
71. چرا Metric دو پروتکل Routing متفاوت را مستقیم مقایسه نمی‌کنیم؟
72. در Router-on-a-stick، Subinterface و 802.1Q چه نقشی دارند؟

## ۲.۲ — Switching

73. Unknown unicast در یک VLAN معمولاً چه می‌شود؟ الف) Drop همیشگی ب) Flood در همان VLAN ج) Route به اینترنت د) Encrypt
74. Trunk چه چیزی را روی یک لینک حمل می‌کند؟
75. Native VLAN mismatch چه خطر/نشانه‌ای دارد؟
76. STP چرا بعضی Portها را Blocking/Discarding می‌کند؟
77. Root port را تعریف کنید.
78. LACP چه مسئله‌ای را حل می‌کند و یک Flow چگونه میان اعضا پخش می‌شود؟
79. Jumbo frame در بخشی از مسیر فعال شده است. چه مشکلی محتمل است؟
80. PortFast و BPDU Guard را کجا و چرا با هم به‌کار می‌بریم؟

## ۲.۳ — Wireless

81. در بسیاری از نواحی، سه Channel غیرهم‌پوشان 2.4GHz با عرض 20MHz کدام‌اند؟ الف) 1/6/11 ب) 2/7/12 ج) 36/40/44 د) پاسخ همواره جهانی است
82. افزایش Channel width چه Trade-offی دارد؟
83. SSID و BSSID چه تفاوتی دارند؟
84. WPA3-Personal به‌جای PSK handshake قدیمی از چه روش اصلی استفاده می‌کند؟ الف) SAE ب) WEP ج) PAP د) GRE
85. برای هویت جداگانه کاربر در WLAN سازمانی از چه ترکیبی استفاده می‌شود؟
86. چرا Hidden SSID کنترل امنیتی قوی نیست؟
87. Antenna gain انرژی جدید تولید می‌کند؟ توضیح دهید.
88. AP lightweight چه تفاوت عملیاتی با Autonomous دارد؟

## ۲.۴ — نصب فیزیکی

89. MDF و IDF چه تفاوتی دارند؟
90. چرا تجهیزات سنگین پایین Rack نصب می‌شوند؟ دو دلیل.
91. Hot aisle/cold aisle چه مسئله‌ای را کم می‌کند؟
92. PDU و UPS چه نقش‌های متفاوتی دارند؟
93. در PoE، PSE و PD را با مثال نام ببرید.
94. AP روشن می‌شود ولی Radio محدود است. کدام مورد را ابتدا بررسی می‌کنید؟ الف) DNS MX ب) PoE class/budget ج) SOA serial د) BGP AS path
95. رطوبت خیلی کم و خیلی زیاد هر کدام چه خطر دارند؟
96. چرا برچسب یکسان دو سر کابل و Port مهم است؟

## ۳.۱ — مستندات و تغییر

97. Physical و Logical diagram چه تفاوتی دارند؟
98. IPAM چه داده‌هایی را بهتر از یک فهرست پراکنده مدیریت می‌کند؟ سه مورد.
99. EOL و EOS چه تفاوتی دارند؟
100. پیش از تغییر Production، چهار جزء ضروری Change plan را بنویسید.

101. Golden configuration چیست و چه تفاوتی با Running config دارد؟
102. Backup گرفته شده ولی هرگز Restore نشده است. مهم‌ترین Risk چیست؟
103. Wireless heatmap بدون ذکر باند و زمان چه محدودیتی دارد؟
104. در Decommission یک Router، چهار کار غیر از خاموش‌کردن را نام ببرید.

## ۳.۲ — Monitoring

105. در SNMP، MIB چه چیزی را تعریف می‌کند؟
106. چرا SNMPv3 بر v2c ترجیح دارد؟
107. تفاوت Poll و Trap چیست و چرا هر دو لازم‌اند؟
108. برای فهم «چه کسانی با چه حجمی صحبت کرده‌اند» بدون Payload، کدام داده مناسب‌تر است؟ الف) Flow data ب) Full packet capture ج) Rack diagram د) SOA
109. Port mirroring در Oversubscription چه مشکلی ایجاد می‌کند؟
110. Syslog Severity صفر و هفت به‌ترتیب چه معنایی دارند؟
111. Baseline چرا باید زمان/فصل را در نظر بگیرد؟
112. SIEM چه سه کاری روی Logها انجام می‌دهد و چه چیزی را جایگزین نمی‌کند؟

## ۳.۳ — Disaster Recovery

113. RPO ده دقیقه چه الزام کلی برای حفاظت داده ایجاد می‌کند؟
114. RTO دو ساعت به چه معناست؟
115. MTTR و MTBF را مقایسه کنید.
116. کدام Site کمترین آمادگی و معمولاً بیشترین RTO را دارد؟ الف) Hot ب) Warm ج) Cold د) Active-active
117. Active-active چه پیچیدگی داده‌ای مهمی دارد؟
118. چرا Tabletop جای Restore test واقعی را نمی‌گیرد؟
119. یک Backup آنلاین در برابر Ransomware چه ضعفی دارد؟
120. برای سرویس با RPO=5m و RTO=30m، Backup روزانه و Cold site مناسب است؟ چرا؟

## ۳.۴ — DHCP، DNS و زمان

121. چهار پیام DORA را به ترتیب بنویسید.
122. DHCP relay چرا لازم است؟
123. Reservation و Exclusion چه تفاوتی دارند؟
124. Resolver برای یافتن `www.realsam.ir` بدون Cache، کدام سه سطح را به‌ترتیب می‌پرسد؟
125. A، AAAA، MX و CNAME هر کدام چه داده‌ای دارند؟
126. PTR برای `192.0.2.80` در چه فضای نامی Query می‌شود و یک کاربرد آن چیست؟
127. DNSSEC چه چیزی را محافظت می‌کند و چه چیزی را رمز نمی‌کند؟
128. NTP، PTP و NTS را هر کدام در یک عبارت توصیف کنید.

## ۳.۵ — دسترسی و مدیریت

129. Site-to-site و Client-to-site VPN چه تفاوتی دارند؟
130. Split tunnel چه مزیت و چه Riskی دارد؟
131. Out-of-band management در چه خرابی‌ای ارزش خود را نشان می‌دهد؟
132. Jump box چه سطح حمله‌ای را متمرکز می‌کند و چگونه باید محافظت شود؟
133. چرا Host key در اولین SSH باید از کانال معتبر Verify شود؟
134. API token باید چه سه ویژگی امنیتی داشته باشد؟
135. Clientless VPN معمولاً برای چه دسترسی‌ای مناسب است؟
136. Console access چرا همچنان باید Authentication و کنترل فیزیکی داشته باشد؟

## ۴.۱ — مفاهیم امنیت

137. Threat، Vulnerability و Exploit را در یک سناریوی Firmware قدیمی جدا کنید.
138. سه عضو CIA triad را نام ببرید.
139. Encryption at rest بدون Key management مناسب چه ضعفی دارد؟
140. Client در Certificate TLS چه چهار موردی را بررسی می‌کند؟
141. دو Password متفاوت MFA محسوب می‌شوند؟ چرا؟
142. Authentication، Authorization و Accounting را مقایسه کنید.
143. Least privilege و RBAC چگونه به هم مربوط‌اند؟
144. چرا Compliance برابر Security کامل نیست؟

## ۴.۲ — حمله‌ها

145. تفاوت DoS و DDoS چیست؟
146. سه دفاع در برابر VLAN hopping بنویسید.
147. MAC flooding کدام جدول را هدف می‌گیرد و یک دفاع چیست؟
148. ARP poisoning چگونه On-path ایجاد می‌کند؟
149. Rogue DHCP چه دو Option خطرناکی می‌تواند به Client بدهد؟
150. Evil twin چیست و Enterprise Wi-Fi چگونه Risk آن را کم می‌کند؟
151. DoH به‌تنهایی چرا مانع DNS poisoning در Authoritative data نیست؟
152. برای Phishing، Tailgating و Dumpster diving هر کدام یک کنترل بنویسید.

## ۴.۳ — دفاع

153. چهار کار نخست Hardening یک Switch تازه را بنویسید.
154. سه نقش 802.1X را نام ببرید.
155. DHCP Snooping چگونه به DAI کمک می‌کند؟
156. چرا Uplink DHCP باید Trusted و Port کاربر Untrusted باشد؟
157. ACL از بالا به پایین چه دو قاعده مهم دارد؟
158. در ACL DNS چرا ممکن است هم UDP/53 و هم TCP/53 لازم باشد؟
159. Screened subnet/DMZ چه Failure domainی را جدا می‌کند؟
160. URL filtering و Content filtering را مقایسه کنید.

## ۵.۱ — روش عیب‌یابی

161. نخستین مرحله روش استاندارد چیست و سه سؤال مهم آن کدام‌اند؟
162. Divide-and-conquer چه زمانی مفید است؟
163. چرا باید پیش از Clear counter یا Restart، Evidence گرفت؟
164. یک Theory خوب چه ویژگی‌ای دارد؟
165. اگر Theory رد شد، قدم درست چیست؟ الف) تغییرهای بیشتر بی‌ثبت ب) ساخت Theory بعدی یا Escalation ج) حذف Log د) اعلام حل
166. Success criteria و Rollback چه نقشی دارند؟
167. پس از Ping موفق چرا هنوز Verify تمام نشده است؟
168. Ticket نهایی باید چه پنج داده‌ای داشته باشد؟

## ۵.۲ — کابل و Interface

169. CRC رو به افزایش معمولاً به کدام ناحیه اشاره دارد؟ سه علت بنویسید.
170. Late collision نشانه کلاسیک چیست؟
171. Cable continuity ساده چرا Certification سرعت را تضمین نمی‌کند؟
172. Link فیبر بالا نمی‌آید. چهار سازگاری را بررسی کنید.
173. `administratively down` با `down/down` چه تفاوتی دارد؟
174. Err-disabled را بدون شناخت علت فقط Bounce می‌کنید. چرا راه‌حل بدی است؟
175. PoE budget تمام شده؛ چه نشانه‌ای روی AP ممکن است ببینید؟
176. Counter قدیمی را چگونه از خطای جاری تفکیک می‌کنید؟

## ۵.۳ — Service، Switching و Routing

177. سه نشانه Loop لایه ۲ را بنویسید.
178. STP Discarding همیشه خطاست؟ توضیح دهید.
179. VLAN 20 فقط از Switch دوم قابل‌دسترسی نیست. چهار مورد Trunk/STP را بررسی کنید.
180. ACL hit counter صفر است. دو علت پیکربندی محتمل چیست؟
181. Route رفت وجود دارد اما پاسخ نمی‌آید. مهم‌ترین مسیر فراموش‌شده چیست؟
182. Client IP و Gateway درست دارد، IP اینترنت را Ping می‌کند ولی نام باز نمی‌شود. ناحیه محتمل چیست؟
183. DHCP pool exhaustion را از خرابی کامل Server چگونه تفکیک می‌کنید؟
184. Duplicate IP چه علامت ARP/اتصال می‌سازد؟

## ۵.۴ — Performance

185. Bandwidth، Throughput و Goodput را از هم جدا کنید.
186. Jitter بیشترین اثر محسوس را روی چه برنامه‌ای دارد؟ الف) Voice/video real-time ب) فایل آفلاین ج) Inventory د) DNS zone file
187. Bottleneck 100Mbps میان دو LAN یک‌گیگابیتی چه حداکثر تقریبی ایجاد می‌کند؟
188. TCP retransmission و Zero-window هر کدام به چه مشکلی اشاره می‌کنند؟
189. چرا Speed test واحد اثبات قطعی مشکل ISP نیست؟
190. در Wi-Fi، RSSI خوب ولی Performance بد است. سه علت دیگر بنویسید.
191. افزودن AP بدون Channel plan چرا ممکن است وضعیت را بدتر کند؟
192. برای کندی وب، زمان‌های DNS/TCP/TLS/First-byte چگونه محل مشکل را جدا می‌کنند؟

## ۵.۵ — ابزارها

193. برای دیدن IP و Route در Linux مدرن چه دو فرمانی مناسب‌اند؟
194. `ping` چه چیزی را اثبات می‌کند و چه چیزی را نه؟
195. تفاوت `dig` و `traceroute` از نظر سؤال عیب‌یابی چیست؟
196. برای مشاهده Socketهای Listening در Linux از چه ابزاری استفاده می‌کنید؟
197. Nmap حالت `open`، `closed` و `filtered` را چگونه تفسیر می‌کند؟
198. Cable tester، TDR و OTDR هر کدام برای چه کاری‌اند؟
199. LLDP و CDP چه اطلاعاتی می‌دهند و چرا روی Edge حساس‌اند؟
200. در سناریوی «DNS درست، TCP/443 وصل، TLS خطای نام Certificate»، کدام ابزار و کدام فیلد را بررسی می‌کنید؟

پاسخ‌ها و دلیل هر پاسخ در [پاسخ‌نامه](answers.md) آمده‌اند.

</div>
