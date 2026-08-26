# Solution and Validation — VLAN Routing

Run and interpret:

```text
show vlan brief
show interfaces trunk
show spanning-tree vlan 10
show mac address-table dynamic
show ip interface brief
show ip route connected
show arp
show access-lists USER_TO_SERVER
```

Expected: both trunks use native 999 and carry only 10/20/99/999; endpoint ports are access ports; router subinterfaces are up/up with connected routes; user HTTPS and DNS increment permit counters; another user-to-server port increments the deny counter. Adapt interface names to the lab platform.
