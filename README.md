<div dir="rtl" align="right">

# آموزش جامع فارسی CompTIA Network+ V9 — N10-009

این مخزن یک دورهٔ آموزشی مستقل، رایگان و کاملاً فارسی برای یادگیری شبکه از صفر و آمادگی آزمون **CompTIA Network+ V9 با کد N10-009** است. متن برای کسی نوشته شده که ممکن است در شروع حتی تفاوت مودم، روتر، سوئیچ، IP و پورت را نداند.

در هر فصل ابتدا مفهوم و دلیل وجود آن توضیح داده می‌شود، سپس مسیر واقعی عبور داده، مثال، دستور، خروجی، روش بررسی، خطاهای متداول و تمرین ارائه می‌شود. کلمات فنی انگلیسی کنار معادل فارسی آمده‌اند تا خواننده هم مفهوم را بفهمد و هم بتواند مستندات و سؤال‌های انگلیسی آزمون را بخواند.

> **نسخهٔ آزمون:** این جزوه بر اساس Objectiveهای رسمی **N10-009، نسخهٔ 4.0** نوشته شده است. CompTIA ممکن است مشخصات یا تاریخ بازنشستگی آزمون را تغییر دهد؛ پیش از ثبت‌نام، صفحه و PDF رسمی موجود در [منابع](REFERENCES.md) را بررسی کنید.

## مشخصات آزمون در زمان نگارش

| مورد | مقدار |
|---|---|
| نسخه / کد | V9 / N10-009 |
| تاریخ عرضه | ۲۰ ژوئن ۲۰۲۴ |
| تعداد سؤال | حداکثر ۹۰، ترکیبی از چندگزینه‌ای و Performance-based |
| زمان | ۹۰ دقیقه |
| نمره قبولی | ۷۲۰ در مقیاس ۱۰۰ تا ۹۰۰ |
| تجربه پیشنهادی | CompTIA A+ و ۹ تا ۱۲ ماه تجربه Junior network admin/support |
| زبان‌های اعلام‌شده | انگلیسی، آلمانی، ژاپنی، پرتغالی و اسپانیایی |
| بازنشستگی | معمولاً حدود سه سال پس از عرضه؛ تاریخ جاری را پیش از ثبت‌نام Verify کنید |

آزمون فارسی نیست؛ به همین دلیل واژه انگلیسی کنار توضیح فارسی حفظ شده است. جزئیات ثبت‌نام و تاریخ Retirement ممکن است تغییر کند و مرجع نهایی CompTIA است.

## از کجا شروع کنم؟

۱. ابتدا [راهنمای استفاده و برنامهٔ مطالعه](COURSE.md) را بخوانید.  
۲. اگر هیچ پیش‌زمینه‌ای ندارید، از [شبکه از صفر و مسیر بازشدن یک وب‌سایت](docs/00-network-from-zero.md) شروع کنید.  
۳. فصل ویژهٔ [OSI، TCP/IP، TCP، UDP و TLS Handshake](docs/01-osi-tcp-ip-tls.md) را با دقت بخوانید.  
۴. پنج دامنهٔ رسمی را به‌ترتیب مطالعه کنید.  
۵. هم‌زمان [آزمایشگاه‌ها](labs/README.md) را انجام دهید.  
۶. [تمرین‌های Subnetting](practice/subnetting.md) را بدون ماشین‌حساب حل کنید.  
۷. پس از هر دامنه، [سؤال‌ها](practice/questions.md) را پاسخ دهید و سپس [پاسخ‌نامه](practice/answers.md) را ببینید.  
۸. در روزهای پایانی از [خلاصهٔ آزمون](SUMMARY.md) و برگه‌های مرجع استفاده کنید.

## نقشهٔ دوره

| بخش | وزن رسمی | محتوای اصلی |
|---|---:|---|
| پیش‌نیاز | — | شبکه چیست، بیت و بایت، کلاینت و سرور، بسته و فریم، مسیر کامل درخواست |
| مدل‌ها و انتقال | بخشی از دامنه ۱ | هفت لایه OSI، مدل TCP/IP، TCP و UDP، TLS 1.3، Encapsulation |
| ۱. مفاهیم شبکه | ۲۳٪ | تجهیزات، Cloud، پروتکل و پورت، کابل، توپولوژی، IPv4/IPv6 و شبکه‌های مدرن |
| ۲. پیاده‌سازی شبکه | ۲۰٪ | Routing، Switching، VLAN، STP، Wireless و نصب فیزیکی |
| ۳. عملیات شبکه | ۱۹٪ | مستندسازی، مانیتورینگ، DR، DHCP/DNS/NTP و مدیریت دسترسی |
| ۴. امنیت شبکه | ۱۴٪ | رمزنگاری، IAM، حملات، Segmentation، NAC، ACL و Hardening |
| ۵. عیب‌یابی شبکه | ۲۴٪ | روش استاندارد، کابل، سرویس، کارایی، Wireless و ابزارها |

## فایل‌های اصلی

| فایل | کاربرد |
|---|---|
| [OBJECTIVES.md](OBJECTIVES.md) | تطبیق تمام کدهای رسمی ۱.۱ تا ۵.۵ با فصل، Lab و سؤال |
| [docs/00-network-from-zero.md](docs/00-network-from-zero.md) | شروع مطلق برای فرد تازه‌کار |
| [docs/01-osi-tcp-ip-tls.md](docs/01-osi-tcp-ip-tls.md) | توضیح عمیق هفت لایه، TCP/UDP و TLS Handshake |
| [docs/02-networking-concepts.md](docs/02-networking-concepts.md) | دامنه ۱ — Networking Concepts |
| [docs/03-network-implementation.md](docs/03-network-implementation.md) | دامنه ۲ — Network Implementation |
| [docs/04-network-operations.md](docs/04-network-operations.md) | دامنه ۳ — Network Operations |
| [docs/05-network-security.md](docs/05-network-security.md) | دامنه ۴ — Network Security |
| [docs/06-network-troubleshooting.md](docs/06-network-troubleshooting.md) | دامنه ۵ — Network Troubleshooting |
| [labs/README.md](labs/README.md) | Labهای مرحله‌ای و سناریوهای خرابی |
| [practice/questions.md](practice/questions.md) | سؤال‌های تألیفی و سناریوهای شبیه سبک آزمون |
| [practice/answers.md](practice/answers.md) | پاسخ تشریحی جداگانه |
| [practice/subnetting.md](practice/subnetting.md) | آموزش و تمرین IPv4، CIDR و VLSM |
| [GLOSSARY.md](GLOSSARY.md) | واژه‌نامهٔ فارسی و انگلیسی |
| [appendices/ports-protocols.md](appendices/ports-protocols.md) | پورت‌ها، پروتکل‌ها و کاربرد امنیتی |
| [appendices/commands-tools.md](appendices/commands-tools.md) | فرمان‌ها و ابزارهای Windows، Linux و تجهیزات شبکه |

## شیوهٔ نمایش راست‌به‌چپ و چپ‌به‌راست

متن توضیحی با HTML سازگار با GitHub راست‌به‌چپ است. فرمان‌ها، IPها، خروجی ترمینال و Packet Captureها در بخش‌های چپ‌به‌راست قرار می‌گیرند تا ترتیب کاراکترها خراب نشود.

## محیط آزمایشگاهی پیشنهادی

- **Cisco Packet Tracer:** مناسب شروع، VLAN، Routing، Wireless و سرویس‌های ساده
- **Wireshark:** برای دیدن واقعی Ethernet، ARP، DNS، TCP و TLS
- **دو ماشین مجازی Linux:** برای DHCP/DNS، SSH، Nmap، tcpdump و سرویس‌ها
- **Windows یا Linux Host:** برای تمرین ابزارهای خط فرمان
- **GNS3/EVE-NG/CML:** برای شبیه‌سازی پیشرفته‌تر با Image قانونی

در مثال‌ها از دامنهٔ `realsam.ir`، آدرس‌های خصوصی و محدوده‌های مستندسازی استاندارد استفاده شده است. هیچ Lab مخرب یا سرقت ترافیک نباید روی شبکهٔ واقعی، سازمانی یا بدون مجوز اجرا شود.

## محدوده و اخلاق آزمون

این پروژه مستقل است و وابسته یا مورد تأیید CompTIA نیست. سؤال‌ها تألیفی هستند و Exam Dump یا بازسازی سؤال محرمانهٔ آزمون محسوب نمی‌شوند. هدف، فهم شبکه و توانایی حل مسئله است؛ نه حفظ پاسخ‌ها.

</div>
