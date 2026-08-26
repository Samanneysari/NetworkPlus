# Command-Output Case Answers

## Case 01

APIPA plus DHCP enabled and no gateway suggests DHCP configuration/reachability failure. Check link/VLAN first, then capture DORA, scope capacity, relay, ACL, and server health. Renew only after evidence and verify address, gateway, DNS, and application.

## Case 02

Next hop `10.20.30.1`, interface `eth0`, source `10.20.30.55`. It proves the kernel's selected route, not that ARP succeeded or the gateway replied.

## Case 03

Local next-hop neighbor resolution failed. Check link state, access VLAN, local prefix, gateway interface, MAC table, and ARP capture before remote routing or DNS.

## Case 04

The local host listens on TCP 22 on all IPv4 addresses. This does not prove remote routing/firewall/NAT reachability or successful SSH authentication. Test from an authorized remote source and inspect firewall/logs.

## Case 05

The resolver replied that the name does not exist; recursion was requested/available. Check spelling, search suffix, authoritative zone/record, delegation, and negative cache/TTL. This is not a generic timeout.

## Case 06

Repeated SYN with no SYN-ACK/RST indicates no response: path, firewall/filter, NAT, or unavailable endpoint. Verify route/ARP at each boundary, capture nearer the server, and inspect policy/service state.

## Case 07

TLS reached the server but hostname validation failed because SAN covers only `www`. Install/select a certificate containing `app.lab.example` or use the intended covered hostname; verify SNI and full HTTPS request.

## Case 08

The large CRC total is historical because it did not increase during the sample. Record it, generate controlled traffic, and monitor deltas. Do not replace media solely from an old total.

## Case 09

VLAN 20 is missing from the allowed list. Add only VLAN 20 under change control, confirm the far end is consistent, verify trunk/STP/MAC learning, and test VLAN 20 end to end.

## Case 10

One MAC rapidly appears on two ports: possible loop, duplicate attachment, bad topology, or misconfigured bundle. Inspect STP, physical links, port-channel state, and connected neighbors; do not merely clear the MAC table.

## Case 11

BPDU Guard received a BPDU on an edge port. Identify/remove the unauthorized or incorrect switch/bridge, confirm the port is truly an endpoint edge, then recover according to policy. Re-enabling without removing cause will repeat failure.

## Case 12

`10.20.50.5` uses the OSPF `/16` via `192.0.2.2`; `203.0.113.9` uses the default via `192.0.2.1`. Longest prefix selects the result.

## Case 13

INIT means the local router hears the neighbor but two-way communication is incomplete—the local router ID is not seen in the neighbor's hello. Check one-way path, multicast/ACL, mask/network type, and the neighbor's interface/configuration.

## Case 14

Only 8 W remains, below the 25.5 W request. Move the PD to approved capacity, reduce load, or increase budget; verify negotiated class/power and full device features. Do not force power beyond platform limits.

## Case 15

First-byte/application delay dominates after fast DNS/TCP/TLS. Check server/application/backend processing, dependency calls, and load with application/server telemetry rather than blaming DNS or the client cable.
