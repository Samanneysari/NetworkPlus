# N10-009 Tools and Lab-Environment Checklist

Network+ expects tool selection and evidence interpretation, not mastery of a specific commercial product. Never attach a tester, capture traffic, scan, or change configuration without authorization.

## Physical tools

| Tool | Best question it answers | Important limitation |
|---|---|---|
| Cable tester/wire mapper | Are copper conductors open, shorted, reversed, crossed, or split? | A basic continuity result does not certify category performance. |
| Cable certifier | Does the installed link meet a category/performance standard? | More expensive and requires correct test limits/adapters. |
| Tone generator and probe | Which unlabeled copper cable or port is this? | Does not prove link quality; disconnect from sensitive circuits as required. |
| Loopback adapter | Can an interface transmit and receive through its local port? | Tests the local path, not the remote cable/service. |
| TDR | Where is a copper impedance fault and approximately how far away? | Distance estimates depend on cable velocity and calibration. |
| OTDR | Where are fiber events, loss, connectors, and breaks along a run? | Launch/receive cables and correct wavelength improve interpretation. |
| Optical power meter and light source | Is end-to-end optical loss inside the link budget? | Power alone does not locate the fault. |
| Visual fault locator | Is there a visible break, bad splice, or incorrect strand on short fiber? | Never look into fiber; it is not a substitute for power/OTDR testing. |
| PoE tester | Which PoE type, pairs, voltage, and available power are present? | A no-load reading may not reveal failure under real device load. |
| Multimeter | Is expected electrical voltage/continuity present? | It does not certify Ethernet data performance. |
| Wi-Fi analyzer | What SSIDs, channels, RSSI, noise, and utilization are visible? | Client hardware and location affect readings. |
| Spectrum analyzer | Is non-Wi-Fi RF energy consuming the band? | It identifies energy patterns, not necessarily the exact source. |
| Network tap | Can a sensor receive a copy of link traffic? | Must match speed/media and may require a maintenance window. |

## Software tools

| Tool/category | Use | Minimum Network+ result |
|---|---|---|
| Wireshark/protocol analyzer | Decode frames and conversations | Filter ARP/DNS/TCP, identify endpoints, flags, timing, and errors. |
| tcpdump | CLI packet capture | Apply a bounded capture filter and protect sensitive output. |
| ping | ICMP reachability/RTT/loss sample | State what it proves and what a blocked ICMP response cannot prove. |
| traceroute/tracert | Observe hop-limit expiration along a path | Distinguish missing replies from definite forwarding failure. |
| dig/nslookup | Query DNS | Identify resolver, answer, authority, record type, flags, and latency. |
| ip/ipconfig/ifconfig | Inspect endpoint interfaces | Read address, prefix/mask, gateway context, state, and DNS configuration. |
| arp/ip neighbor | Inspect neighbor cache | Relate an IP-to-MAC entry to same-subnet or gateway forwarding. |
| ss/netstat | Inspect listeners and conversations | Distinguish listening, established, refused, and timed-out behavior. |
| Nmap | Authorized service discovery | Interpret `open`, `closed`, and `filtered`; use the smallest approved scope. |
| LLDP/CDP | Discover adjacent devices | Identify neighbor, port, platform, and information-exposure risk. |
| Throughput/speed tester | Measure path throughput | Select a local or controlled server and separate Internet from LAN limits. |
| SNMP manager | Poll counters and receive notifications | Compare polling with traps/informs and prefer SNMPv3. |
| Syslog collector | Centralize event messages | Preserve time zone, source, severity, and retention context. |
| Network monitor | Test availability and thresholds | Define baseline, owner, severity, and runbook for every alert. |
| Flow analyzer | Summarize conversations | Use endpoints, ports, bytes, and time without assuming payload visibility. |
| TFTP server | Simple lab transfer for supported device images/configs | Isolate it; TFTP has no built-in authentication or encryption. |
| Terminal/SSH client | Secure remote CLI | Verify host key and use least privilege. |
| Packet Tracer/GNS3/EVE-NG/CML | Authorized network simulation/emulation | Build, break, verify, and save a reproducible topology. |

## Device evidence commands

Exact syntax varies. At Network+ depth, explain the table or counter before changing anything.

| Evidence | Typical Cisco-like command | Question |
|---|---|---|
| Interface state and addressing | `show ip interface brief` | Which interface is down, unaddressed, or unexpected? |
| Detailed physical/data-link counters | `show interfaces` | Are CRC, drops, duplex, speed, or link transitions increasing? |
| VLAN membership | `show vlan brief` | Is the access port in the intended VLAN? |
| Trunk state | `show interfaces trunk` | Are native and allowed VLANs consistent? |
| MAC learning | `show mac address-table` | On which port was the source MAC learned? |
| STP state | `show spanning-tree` | Which switch is root and which port blocks? |
| EtherChannel/LACP | `show etherchannel summary` | Are members bundled and using the intended protocol? |
| IPv4 routes | `show ip route` | Which longest-prefix route and next hop win? |
| ARP/neighbor state | `show arp` | Is the local next hop resolved to a MAC? |
| OSPF neighbors | `show ip ospf neighbor` | Is adjacency established? |
| NAT state | `show ip nat translations` | Does a flow have the expected inside/outside mapping? |
| Power delivery | `show power inline` | Is the requested PoE class/power available? |
| Current configuration | `show running-config` | What is actually active now? |
| Saved configuration | `show startup-config` | What will load after restart? |
| Platform/firmware | `show version` | What model, image, uptime, and version are running? |
| Inventory | `show inventory` | Which chassis/modules/transceivers are installed? |

## Safe lab inventory

- Two Linux VMs and one optional Windows VM.
- A Packet Tracer or equivalent legal simulator.
- Wireshark and tcpdump.
- An isolated virtual router/firewall when available.
- A small managed switch and AP only if the learner owns or is authorized to use them.
- Sanitized diagrams, sample configurations, logs, captures, tickets, runbooks, and firmware-version records.

The [lab packs](../labs/packs/README.md) provide starter material, expected evidence, fault cards, and solution notes without requiring production access.
