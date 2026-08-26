# Executable Network+ Lab Packs

These packs turn the guided labs into reproducible build–break–fix exercises. They use documentation ranges and generic Cisco-like syntax suitable for Packet Tracer or adaptation to another authorized lab. Commands vary by platform; the concepts and evidence are vendor-neutral.

| Pack | Skills | Starter assets | Solution/evidence |
|---|---|---|---|
| [Ethernet and ARP](ethernet-arp/README.md) | MAC learning, ARP, ICMP, same/remote subnet | Topology and generated PCAP | Packet walk and filters |
| [VLAN and inter-VLAN routing](vlan-routing/README.md) | Access/voice VLAN, trunk, SVI, ACL | Starter configs | Solution configs and validation |
| [OSPF and NAT/PAT](ospf-nat/README.md) | Route choice, adjacency, default route, PAT | Starter configs | Solution configs and fault cards |
| [DHCP, DNS, and time](services/README.md) | Relay, DORA, records, reverse DNS, clock evidence | Service snippets | Expected output and faults |
| [Wireless and monitoring](wireless-monitoring/README.md) | Survey, baseline, SNMP/syslog/alerting | Survey templates | Review rubric |
| [Capstone branch incident](capstone/README.md) | Multi-domain PBQ and ticket | Faulted configs/evidence | Restricted solution file |

## Standard workflow

1. Copy the pack to a new working directory; keep the original unchanged.
2. Draw or import the topology and assign the documented addresses.
3. Save a baseline and prediction before changing configuration.
4. Apply starter configuration only in the isolated lab.
5. Complete the task, capture output, and inject one fault card.
6. Restore service using the smallest justified change.
7. Compare with expected evidence and the solution only afterward.
8. Submit a report using the [main lab template](../README.md).

Generated captures are intentionally tiny and contain synthetic documentation addresses only. Rebuild them with `npm run build:pcaps`.

