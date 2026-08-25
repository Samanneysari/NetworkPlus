# Foundation 1 — Computers, Operating Systems, and Number Systems

Networking commands and diagrams make more sense when you first understand the computer that runs them. This lesson separates hardware, operating systems, vendors, and virtualization, then builds the number-system skills used by Ethernet and IP.

## Hardware, software, and firmware

- **Hardware** is the physical equipment: CPU, memory, storage, network interface card (NIC), switch, router, cable, and access point.
- **Software** is executable code and data. Applications, services, utilities, and operating systems are software.
- **Firmware** is software stored on or closely associated with a device. It initializes and controls hardware such as a switch, wireless access point, NIC, or storage controller.

Firmware is not automatically safer or simpler than other software. It still needs inventory, supported releases, backups, controlled upgrades, and rollback planning.

## What is an operating system?

An **operating system (OS)** manages hardware resources and provides services that applications use. Its major responsibilities include:

- Scheduling processes and threads on the CPU.
- Allocating and protecting memory.
- Managing files, storage, users, permissions, and devices.
- Providing a network stack that implements protocols such as Ethernet, IP, ICMP, TCP, and UDP.
- Exposing interfaces such as a graphical user interface (GUI), command-line interface (CLI), and application programming interface (API).

The OS is not the same thing as an application. A browser asks the OS to resolve names, create sockets, route packets, and send frames through a NIC driver.

## Linux

**Linux** is an open-source kernel used with user-space tools and libraries to form operating-system distributions. Ubuntu, Debian, Red Hat Enterprise Linux, Fedora, Rocky Linux, and Alpine Linux are distributions; Linux is not one single vendor product.

Linux is common on servers, cloud systems, containers, firewalls, appliances, and network-management platforms. Important networking components include:

| Component | Role |
|---|---|
| Linux kernel | Implements interfaces, routing, neighbor tables, sockets, filtering hooks, and protocol behavior |
| `iproute2` tools | Inspect and configure links, addresses, routes, and neighbors |
| `systemd-networkd`, NetworkManager, or other manager | Persist and apply interface configuration |
| `ss` | Inspect sockets and listening services |
| `ping`, `traceroute`, `dig`, `tcpdump` | Test reachability, paths, DNS, and packets |

### Identify a Linux system

```bash
uname -r
cat /etc/os-release
ip -brief link
ip -brief address
```

| Line | What it proves |
|---|---|
| `uname -r` | Displays the running kernel release; it does not identify every distribution package |
| `cat /etc/os-release` | Displays distribution identity and version metadata |
| `ip -brief link` | Summarizes interfaces, link state, and MAC addresses |
| `ip -brief address` | Summarizes assigned IPv4 and IPv6 addresses |

Do not paste private keys, access tokens, or complete production configurations into public reports.

## Microsoft and Windows

**Microsoft** is a vendor. **Windows** is a family of Microsoft operating systems. Windows client editions and Windows Server share many networking concepts but provide different roles, management tools, and licensing options.

Common Windows networking interfaces include:

- Settings and Control Panel for interactive configuration.
- PowerShell cmdlets such as `Get-NetIPConfiguration` and `Get-NetRoute`.
- Traditional commands such as `ipconfig`, `ping`, `tracert`, `arp`, and `netstat`.
- Windows Server roles such as Domain Name System (DNS), Dynamic Host Configuration Protocol (DHCP), routing, and Active Directory Domain Services (AD DS).

### Identify a Windows system

```powershell
Get-ComputerInfo | Select-Object WindowsProductName, WindowsVersion, OsArchitecture
Get-NetAdapter
Get-NetIPConfiguration
```

| Line | What it proves |
|---|---|
| `Get-ComputerInfo` | Displays selected Windows edition, version, and architecture data |
| `Get-NetAdapter` | Displays network adapters, status, link speed, and MAC address |
| `Get-NetIPConfiguration` | Displays interface addresses, gateways, and DNS servers |

## Cisco and network operating systems

**Cisco** is a networking and technology vendor, not a protocol or a single operating system. Cisco platforms use several operating-system families, including IOS, IOS XE, NX-OS, and ASA software. Their syntax and available features differ by platform and release.

This course uses Cisco-style CLI examples because they make switching and routing concepts visible. The concept is more important than memorizing one vendor's syntax.

```cisco
show version
show ip interface brief
show interfaces status
show running-config
```

| Line | What it proves |
|---|---|
| `show version` | Identifies platform, software release, uptime, and boot information |
| `show ip interface brief` | Summarizes interface IP addresses and protocol state |
| `show interfaces status` | Summarizes switch-port link, VLAN, duplex, speed, and media |
| `show running-config` | Displays active configuration; sanitize secrets before sharing |

Never assume commands from one Cisco family work unchanged on another, and never make production changes without a backup, approval, validation plan, and rollback.

## What is a hypervisor?

A **hypervisor** creates and manages virtual machines (VMs). Each VM is presented with virtual CPU, memory, storage, and network interfaces while the hypervisor controls access to the physical resources.

| Type | Placement | Typical description |
|---|---|---|
| Type 1, bare-metal | Runs directly on server hardware | Common in data centers and production virtualization |
| Type 2, hosted | Runs as an application on a host OS | Common for desktop labs and development |

A VM has its own guest OS. A container normally shares the host kernel and isolates processes rather than emulating a complete machine.

### Virtual networking path

When a VM sends a frame, the path can include:

1. The application and guest OS network stack.
2. A virtual NIC inside the VM.
3. A virtual switch in the hypervisor.
4. A physical NIC or another local VM port.
5. The physical network.

A VM can have a valid IP configuration while still failing because the virtual NIC is disconnected, the wrong virtual switch is selected, the port group uses the wrong VLAN, or the physical uplink is down.

## Bit and byte

A **bit** is one binary digit: `0` or `1`. A **byte** is eight bits. Network rates are normally expressed in bits per second; file sizes are normally expressed in bytes.

| Unit | Meaning |
|---|---:|
| `b` | bit |
| `B` | byte = 8 bits |
| `Mb/s` or `Mbps` | megabits per second |
| `MB/s` | megabytes per second |

Ignoring overhead, `100 Mb/s ÷ 8 = 12.5 MB/s`. Real file-transfer speed is lower because frames, packet headers, acknowledgments, encryption, retransmissions, storage, and application behavior consume time and capacity.

## Binary, decimal, and hexadecimal

Computers store values in binary. Humans commonly write addresses in decimal or hexadecimal.

| Number system | Base | Digits | Networking use |
|---|---:|---|---|
| Binary | 2 | `0–1` | Masks, flags, and bit-level protocol fields |
| Decimal | 10 | `0–9` | IPv4 octets and port numbers |
| Hexadecimal | 16 | `0–9`, `A–F` | MAC addresses, IPv6, EtherType, and packet analysis |

One hexadecimal digit represents four bits:

| Binary | Hex | Decimal |
|---|---:|---:|
| `0000` | `0` | 0 |
| `1000` | `8` | 8 |
| `1010` | `A` | 10 |
| `1111` | `F` | 15 |

### Convert one IPv4 octet

The binary place values in an octet are:

```text
128  64  32  16   8   4   2   1
  1   1   0   0   0   0   0   0
```

The enabled positions are `128 + 64 = 192`, so binary `11000000` equals decimal `192` and hexadecimal `C0`.

### Convert a MAC byte

The MAC byte `A6` contains hexadecimal digits `A` and `6`:

```text
A    6
1010 0110
```

Therefore `A6` equals binary `10100110` and decimal `166`.

## Bit rate, bandwidth, throughput, and goodput

These terms are related but not interchangeable.

| Term | Meaning | Example |
|---|---|---|
| Bit rate | Number of bits transmitted or represented per second | A physical link signals at a stated number of bits per second |
| Bandwidth | Maximum capacity of a link or path in normal networking usage | A `1 Gb/s` Ethernet access link |
| Throughput | Actual rate successfully transferred during a measurement | An application moves `730 Mb/s` across that link |
| Goodput | Useful application payload delivered per second | A file receives `690 Mb/s` after protocol overhead and retransmissions |

In signal theory, bandwidth can also mean a frequency range measured in hertz. Network+ questions usually use bandwidth to mean capacity, so read the context.

### Bottleneck example

A path contains `1 Gb/s`, `100 Mb/s`, and `500 Mb/s` links. Its theoretical end-to-end capacity cannot exceed the `100 Mb/s` bottleneck. Throughput and goodput will be lower still.

Do not diagnose a network from one speed test. Record endpoints, protocol, direction, time, path, interface rates, errors, utilization, latency, loss, and the expected baseline.

## Foundation checks

1. Explain why Microsoft, Windows, Cisco, IOS, Linux, and Ubuntu are not equivalent categories.
2. Compare a hypervisor, VM, container, host OS, and guest OS.
3. Convert binary `11111111` to decimal and hexadecimal.
4. Explain the difference between `Mb/s` and `MB/s`.
5. A `1 Gb/s` link delivers `820 Mb/s` of traffic and `760 Mb/s` of file payload. Identify bandwidth, throughput, and goodput.
