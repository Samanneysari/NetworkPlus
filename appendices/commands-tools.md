# Commands and Tools Reference

This is a review sheet. Full reasoning and output interpretation are in the chapters. Run commands with the least privilege and only in authorized environments.

## Linux

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

| Command | Main question answered |
|---|---|
| `ip address/link` | What are interface state, MAC, and IP/prefix? |
| `ip route/get` | What routes exist, and what decision will the kernel make? |
| `ip neighbor` | What ARP/ND mappings and states exist? |
| `ss` | Which sockets are listening or established? |
| `ping` | Does a sample ICMP round trip work? |
| `traceroute` | Which hops return TTL/Hop-Limit responses? |
| `dig` | What DNS record, server, status, TTL, and timing appear? |
| `curl -v` | Where does DNS/TCP/TLS/HTTP fail? |
| `openssl s_client` | Which TLS version, chain, SNI, and certificate appear? |
| `tcpdump` | What do the actual packets show? Protect sensitive data |

## Windows and PowerShell

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

These lines show IP configuration, adapters, routes, neighbors, ICMP, responding hops, DNS, TCP port reachability, socket/PID state, legacy route output, and ARP cache respectively.

## Cisco IOS concepts

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

Configuration output may contain secrets. Remove password hashes, communities, keys, sensitive public addresses, and internal names before sharing. A show command provides state; interpretation still requires a baseline and understanding of the data path.

## Physical-tool selection

| Need | Tool |
|---|---|
| Copper continuity and wire map | Cable tester |
| Approximate copper fault distance | TDR |
| Locate an unlabeled copper cable | Toner and probe |
| Certify cable category | Standards-compatible certifier |
| Fiber loss/event distance | OTDR |
| Received optical power | Optical power meter |
| Visible near fiber break | VFL with eye safety |
| Permanent controlled traffic copy | Network TAP |
| Temporary traffic copy | SPAN/port mirror and analyzer |
| Channel, RSSI, SNR, utilization | Wi-Fi analyzer/survey tool |
