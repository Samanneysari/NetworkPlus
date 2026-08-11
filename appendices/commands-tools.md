<div dir="rtl" align="right">

# برگه مرجع فرمان‌ها و ابزارها

این فایل برای مرور است؛ دلیل، مثال و تفسیر کامل در فصل‌ها آمده است. فرمان‌ها را با کمترین دسترسی و فقط روی محیط مجاز اجرا کنید.

## Linux

</div>

<div dir="ltr" align="left">

```bash
ip address show
ip link show
ip route show
ip route get 192.0.2.80
ip neighbor show
ss -lntup
ping -c 4 10.10.10.1
traceroute 192.0.2.80
dig A www.realsam.ir
dig -x 192.0.2.80
curl -v https://www.realsam.ir/
openssl s_client -connect www.realsam.ir:443 -servername www.realsam.ir
tcpdump -ni any 'port 53 or port 443'
```

</div>

<div dir="rtl" align="right">

| فرمان | پاسخ اصلی |
|---|---|
| `ip address/link` | Interface، state، MAC و IP/Prefix چیست؟ |
| `ip route/get` | Table چیست و Kernel برای یک مقصد چه تصمیمی دارد؟ |
| `ip neighbor` | ARP/ND چه نگاشتی دارد؟ |
| `ss` | چه Socketی Listen/Established است؟ |
| `ping` | ICMP رفت‌وبرگشت نمونه دارد؟ |
| `traceroute` | کدام Hopها پاسخ TTL/Hop-limit می‌دهند؟ |
| `dig` | رکورد، Resolver، TTL و status چیست؟ |
| `curl -v` | DNS/TCP/TLS/HTTP کجا Fail می‌شود؟ |
| `openssl s_client` | TLS version، Chain، SAN/SNI و Certificate چیست؟ |
| `tcpdump` | Packet واقعی چه می‌گوید؟ داده حساس را محافظت کنید |

## Windows / PowerShell

</div>

<div dir="ltr" align="left">

```powershell
Get-NetIPConfiguration
Get-NetAdapter
Get-NetRoute
Get-NetNeighbor
ping 10.10.10.1
tracert 192.0.2.80
Resolve-DnsName www.realsam.ir -Type A
Test-NetConnection www.realsam.ir -Port 443
netstat -ano
route print
arp -a
```

</div>

<div dir="rtl" align="right">

هر خط به‌ترتیب Config IP، Adapter، Route، Neighbor، ICMP، Hopها، DNS، TCP port، Socket/PID، Route table قدیمی و ARP cache را نشان می‌دهد.

## Cisco IOS مفهومی

</div>

<div dir="ltr" align="left">

```cisco
show running-config
show interfaces status
show interfaces counters errors
show mac address-table
show vlan brief
show interfaces trunk
show spanning-tree
show etherchannel summary
show ip interface brief
show ip route
show arp
show access-lists
show ip nat translations
show power inline
show lldp neighbors detail
show cdp neighbors detail
show logging
```

</div>

<div dir="rtl" align="right">

خروجی Config ممکن است Secret داشته باشد. قبل از Share، Password hash، Community، Key، Public IP حساس و نام داخلی را حذف کنید. `show` فقط وضعیت را نشان می‌دهد؛ تفسیر باید با Baseline و مسیر داده باشد.

## انتخاب ابزار فیزیکی

| نیاز | ابزار |
|---|---|
| Wiremap/Pair مس | Cable tester |
| محل تقریبی شکست مس | TDR |
| پیدا کردن کابل بی‌برچسب | Toner/probe |
| Certification Category | Certifier سازگار استاندارد |
| افت/رخداد فیبر در طول | OTDR |
| توان نوری دریافت‌شده | Optical power meter |
| شکست نزدیک فیبر | VFL با محافظت چشم |
| Copy ترافیک دائم | Network TAP |
| Capture موقت | SPAN/port mirror + analyzer |
| Channel/RSSI/SNR | Wi-Fi analyzer/survey tool |

</div>
