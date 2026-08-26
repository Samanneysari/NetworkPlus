# Command-Output Troubleshooting Cases

For each case, write: observation, most likely fault domain, next evidence, and a safe correction/verification. Check [answers](answers.md) afterward.

## Case 01 — IPv4 endpoint

```text
IPv4 Address . . . : 169.254.44.18
Subnet Mask  . . . : 255.255.0.0
Default Gateway  . :
DHCP Enabled . . . : Yes
```

## Case 02 — Linux route lookup

```text
$ ip route get 198.51.100.80
198.51.100.80 via 10.20.30.1 dev eth0 src 10.20.30.55 uid 1000
```

State the selected next hop, interface, and source. Does this prove the gateway answered?

## Case 03 — Neighbor failure

```text
$ ip neighbor show
10.20.30.1 dev eth0 FAILED
```

## Case 04 — TCP listener

```text
$ ss -lnt
State  Recv-Q Send-Q Local Address:Port Peer Address:Port
LISTEN 0      4096   0.0.0.0:22       0.0.0.0:*
```

Can a remote client conclude TCP 22 is reachable?

## Case 05 — DNS

```text
$ dig app.lab.example A
;; ->>HEADER<<- opcode: QUERY, status: NXDOMAIN, id: 4102
;; flags: qr rd ra; QUERY: 1, ANSWER: 0
```

## Case 06 — TCP handshake

```text
10:00:00 client.51514 > server.443: Flags [S]
10:00:01 client.51514 > server.443: Flags [S]
10:00:03 client.51514 > server.443: Flags [S]
```

## Case 07 — TLS

```text
subject=CN = www.lab.example
X509v3 Subject Alternative Name:
    DNS:www.lab.example
verify error:num=62:hostname mismatch
```

The requested hostname was `app.lab.example`.

## Case 08 — Switch interface

```text
GigabitEthernet1/0/12 is up, line protocol is up
  Full-duplex, 1000Mb/s
  120400 input errors, 120400 CRC, 0 collisions
```

Ten minutes later CRC is `120400` again.

## Case 09 — Trunk

```text
Port      Mode  Encapsulation Status  Native vlan
Gi1/0/48  on    802.1q        trunking 999

Vlans allowed on trunk
Gi1/0/48  10,30,999
```

VLAN 20 users fail only across this link.

## Case 10 — MAC instability

```text
%SW_MATM-4-MACFLAP_NOTIF: Host 0011.2233.4455 in vlan 10 is flapping
between port Gi1/0/23 and port Gi1/0/24
```

## Case 11 — STP protection

```text
Gi1/0/7 err-disabled
Reason: bpduguard
```

## Case 12 — Routing table

```text
C 10.10.10.0/24 is directly connected, Vlan10
O 10.20.0.0/16 via 192.0.2.2
S* 0.0.0.0/0 via 192.0.2.1
```

Which route serves `10.20.50.5` and `203.0.113.9`?

## Case 13 — OSPF neighbor

```text
Neighbor ID     State     Dead Time Address       Interface
2.2.2.2         INIT/-    00:00:33  192.0.2.2     Gi0/0
```

## Case 14 — PoE

```text
Available: 370.0 W
Used:      362.0 W
Remaining:   8.0 W
Gi1/0/20  power-deny  Ieee PD  0.0 W  requested 25.5 W
```

## Case 15 — Web timing

```text
dns=0.012 tcp=0.031 tls=0.080 first_byte=4.920 total=4.950
```

Which stage dominates and what should be checked next?

