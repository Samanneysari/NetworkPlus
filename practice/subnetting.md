# Subnetting Workshop from Zero

Subnetting should not be memorized as a table only. Understand the relationship between bits, prefix, block size, and address boundaries. This file contains the method, examples, and 40 exercises. Answers are in [a separate file](subnetting-answers.md).

## Four foundations

IPv4 has 32 bits. A prefix such as `/24` says 24 bits identify the network and eight bits remain for hosts. A subnet mask expresses those bits in dotted decimal.

| Prefix | Mask | Total addresses | Normal usable hosts |
|---:|---|---:|---:|
| /8 | `255.0.0.0` | 16,777,216 | 16,777,214 |
| /16 | `255.255.0.0` | 65,536 | 65,534 |
| /20 | `255.255.240.0` | 4,096 | 4,094 |
| /22 | `255.255.252.0` | 1,024 | 1,022 |
| /24 | `255.255.255.0` | 256 | 254 |
| /25 | `255.255.255.128` | 128 | 126 |
| /26 | `255.255.255.192` | 64 | 62 |
| /27 | `255.255.255.224` | 32 | 30 |
| /28 | `255.255.255.240` | 16 | 14 |
| /29 | `255.255.255.248` | 8 | 6 |
| /30 | `255.255.255.252` | 4 | 2 |
| /31 | `255.255.255.254` | 2 | 2 on a point-to-point link |
| /32 | `255.255.255.255` | 1 | One host route |

If `h = 32 - prefix`, total addresses are `2^h`. A normal subnet has `2^h - 2` usable hosts. `/31` and `/32` are important exceptions.

## Block-size method

For `198.51.100.173/28`:

1. `/28` mask is `255.255.255.240`.
2. Interesting octet is 240; block size is `256 - 240 = 16`.
3. Boundaries are 0, 16, 32, through 160 and 176.
4. 173 falls inside 160–175.
5. Network is `198.51.100.160`.
6. Broadcast is one before the next boundary: `198.51.100.175`.
7. Host range is `.161` through `.174`, for 14 hosts.

## Prefixes shorter than /24

For `10.40.19.200/20`:

1. Mask is `255.255.240.0`; the third octet is interesting.
2. Block size is `256 - 240 = 16` in the third octet.
3. Third octet 19 lies in the 16–31 block.
4. Network is `10.40.16.0`; broadcast is `10.40.31.255`.
5. Host range is `10.40.16.1` through `10.40.31.254`.

## Choosing a prefix from host count

For 120 hosts, the smallest `h` where `2^h - 2 ≥ 120` is 7. That gives 126 hosts and prefix `32 - 7 = /25`. For 127 hosts, `/25` is too small, so `/24` is required.

## VLSM step by step

Divide `10.50.0.0/23` for 200, 100, 50, and 2 hosts:

1. Sort largest to smallest.
2. 200→`/24`, 100→`/25`, 50→`/26`, 2→`/30` or `/31` when supported.
3. Allocate `10.50.0.0/24`, `10.50.1.0/25`, `10.50.1.128/26`, and `10.50.1.192/30`.
4. Every network must start on a valid boundary and must not overlap.

## Route summarization

The four contiguous networks `10.60.0.0/24` through `10.60.3.0/24` summarize exactly as `10.60.0.0/22`. The count is a power of two, the networks are contiguous, and the starting third octet is aligned to a multiple of four.

Do not use a summary that unintentionally includes networks routed elsewhere.

## Exercises 1–10 — Prefix and capacity

1. How many host bits and total addresses are in `/27`?
2. What is the mask for `/21`?
3. What prefix matches `255.255.255.248`?
4. What is the smallest prefix for 60 hosts?
5. What is the smallest prefix for 500 hosts?
6. How many normal hosts fit in `/26`?
7. How many times larger is `/23` than `/24` by total addresses?
8. Which prefix represents one host route?
9. Why does the minus-two rule not apply normally to `/31` point-to-point links?
10. Is `/28` enough for 15 normal hosts?

## Exercises 11–25 — Network and range

For each address, find network, broadcast, first/last host, and host count:

11. `192.0.2.14/28`
12. `192.0.2.70/26`
13. `192.0.2.129/25`
14. `198.51.100.222/27`
15. `198.51.100.7/30`
16. `203.0.113.200/29`
17. `203.0.113.99/24`
18. `10.10.35.7/20`
19. `10.10.63.254/18`
20. `10.20.128.1/17`
21. `172.16.18.20/22`
22. `172.20.250.1/21`
23. `10.0.9.9/15`
24. `198.51.100.64/26`
25. `192.0.2.31/27` — also identify the address's role.

## Exercises 26–35 — VLSM design

26. Divide `10.70.0.0/24` for 100, 50, and 20 hosts.
27. Divide `10.71.0.0/23` for 200, 120, 60, and 2 hosts.
28. Divide `172.16.8.0/22` into four equal subnets.
29. Divide `192.168.50.0/24` into eight equal subnets.
30. Allocate five branches of up to 30 hosts each from one `/24`.
31. Can `10.1.0.0/24` contain one `/25` and two `/26`s? List boundaries.
32. How much unused space remains in Exercise 26?
33. For 1,000, 250, and 120 hosts, what minimum power-of-two parent capacity is required?
34. Why should VLSM allocation begin with the largest requirement?
35. Do `10.80.0.0/25` and `10.80.0.128/26` overlap?

## Exercises 36–40 — Summary and troubleshooting

36. Summarize `10.90.0.0/24` through `10.90.3.0/24`.
37. Summarize `192.168.8.0/24` and `192.168.9.0/24`.
38. Can `192.168.10.0/24` and `192.168.12.0/24` have one exact summary without extra networks?
39. Host A is `10.1.1.10/24`; Host B is `10.1.2.20/16`. Does each consider the other local or remote, and what can happen?
40. A client is `192.168.20.5/24` but its gateway is `192.168.10.1`. Why can ARP not reach the gateway?

## Checking your work

The network has every host bit zero. The broadcast has every host bit one. Normal hosts lie between them. In VLSM, each next subnet begins after the previous broadcast on a valid boundary. Calculate manually first, then verify with a tool.
