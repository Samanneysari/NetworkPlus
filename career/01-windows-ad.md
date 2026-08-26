# Windows Server, Active Directory, DNS, and DHCP Dependencies

## Network+ boundary

The goal is to recognize dependencies and collect evidence from a Windows endpoint/server. Designing forests, trusts, replication topology, Group Policy architecture, or certificate services is outside this lesson.

## Why networking teams encounter AD

An Active Directory domain depends heavily on DNS, time, routing, and allowed service ports. A user may report “the domain is down” when the actual fault is wrong DNS from DHCP, blocked traffic, time drift, or a site/VPN route.

| Component | Network dependency |
|---|---|
| Domain join/logon | Correct domain DNS discovery, reachability, time, and credentials |
| Group Policy | Domain-controller discovery, DNS, SMB/RPC-related reachability, and authentication |
| Windows DHCP | Correct scope/options, relay, authorization according to environment |
| Windows DNS | Correct zone/records, recursion/forwarding policy, and TCP/UDP 53 |

## Evidence sequence

```powershell
ipconfig /all
route print
arp -a
nslookup -type=SRV _ldap._tcp.dc._msdcs.lab.example
Test-NetConnection dc1.lab.example -Port 53
w32tm /query /status
```

| Line | Question answered |
|---|---|
| `ipconfig /all` | Address, mask, gateway, DHCP server, DNS servers, and suffix |
| `route print` | Is there a route/default path to the server network? |
| `arp -a` | Is the local gateway/neighbor resolved? |
| SRV lookup | Can DNS discover the directory service? |
| Port test | Does TCP 53 reach the intended host? Test other approved ports only when required. |
| Time status | Is the clock synchronized closely enough for authentication? |

`Test-NetConnection` success on one port does not prove the entire domain service. Do not flush caches, reset secure channels, change GPO, or restart controllers without authority and evidence.

## Lab scenario

An endpoint receives public DNS instead of the internal domain resolver. Internet names work, but the SRV query fails. Correct the DHCP DNS option in the isolated lab, renew the lease, verify SRV lookup, time, and the intended domain service. Document why changing the hosts file would hide rather than solve service discovery.

