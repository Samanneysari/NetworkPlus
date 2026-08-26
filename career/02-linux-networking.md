# Linux Endpoint and Service Networking

## Network+ boundary

Collect and interpret endpoint/service evidence, make a small temporary lab change, and identify persistence tooling. Kernel tuning, advanced policy routing, BGP daemons, container orchestration, and production firewall engineering are outside scope.

## Evidence sequence

```bash
ip -brief link
ip -brief address
ip route
ip route get 198.51.100.20
ip neighbor show
resolvectl status
ss -lntup
curl -v https://app.lab.example/
sudo tcpdump -ni any 'arp or icmp or port 53 or port 443'
```

Read each line as a question: link state, address/prefix, route, selected next hop/source, neighbor state, resolver, listener, application stages, and packet evidence.

## Temporary versus persistent configuration

`ip address` and `ip route` commands usually change the running state only. Persistence may be managed by NetworkManager, systemd-networkd, netplan, or distribution-specific files. Before a change:

1. Identify the owner with `nmcli`, `networkctl`, or local documentation.
2. Record remote-access risk and console/rollback path.
3. Validate syntax where supported.
4. Change one interface/profile.
5. Verify route, DNS, service, and reboot persistence in the lab.

## Lab scenario

A host has the correct IP but a default route through the wrong interface. Use `ip route get` to prove selection, save the original route output, apply a temporary correct route in an isolated VM, verify gateway/DNS/HTTPS, then restore. Do not experiment on the interface carrying your only production SSH session.

