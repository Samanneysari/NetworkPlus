# Subnetting Workshop Answers

1. Five host bits and 32 total addresses.
2. `255.255.248.0`.
3. `/29`.
4. `/26`, providing 62 normal hosts.
5. `/23`, providing 510 normal hosts.
6. 62.
7. Two times: 512 versus 256 total addresses.
8. `/32`.
9. RFC 3021 permits both addresses to represent the two endpoints without traditional network/broadcast roles.
10. No. `/28` provides 14 normal hosts.
11. N=`192.0.2.0`, B=`.15`, hosts=`.1–.14`, 14.
12. N=`192.0.2.64`, B=`.127`, hosts=`.65–.126`, 62.
13. N=`192.0.2.128`, B=`.255`, hosts=`.129–.254`, 126.
14. N=`198.51.100.192`, B=`.223`, hosts=`.193–.222`, 30.
15. N=`198.51.100.4`, B=`.7`, hosts=`.5–.6`, 2; the given address is broadcast.
16. N=`203.0.113.200`, B=`.207`, hosts=`.201–.206`, 6; the given address is network.
17. N=`203.0.113.0`, B=`.255`, hosts=`.1–.254`, 254.
18. N=`10.10.32.0`, B=`10.10.47.255`, hosts=`10.10.32.1–10.10.47.254`, 4,094.
19. N=`10.10.0.0`, B=`10.10.63.255`, hosts=`10.10.0.1–10.10.63.254`, 16,382.
20. N=`10.20.128.0`, B=`10.20.255.255`, hosts=`10.20.128.1–10.20.255.254`, 32,766.
21. N=`172.16.16.0`, B=`172.16.19.255`, hosts=`172.16.16.1–172.16.19.254`, 1,022.
22. N=`172.20.248.0`, B=`172.20.255.255`, hosts=`172.20.248.1–172.20.255.254`, 2,046.
23. N=`10.0.0.0`, B=`10.1.255.255`, hosts=`10.0.0.1–10.1.255.254`, 131,070.
24. N=`198.51.100.64`, B=`.127`, hosts=`.65–.126`, 62; the given address is network.
25. Network=`192.0.2.0`, broadcast=`.31`; the given address is broadcast.
26. `10.70.0.0/25`, `10.70.0.128/26`, `10.70.0.192/27`; `.224–.255` remains.
27. `10.71.0.0/24`, `10.71.1.0/25`, `10.71.1.128/26`, `10.71.1.192/30`.
28. Four `/24`s: `172.16.8.0`, `.9.0`, `.10.0`, and `.11.0`.
29. Eight `/27`s beginning at `.0`, `.32`, `.64`, `.96`, `.128`, `.160`, `.192`, and `.224`.
30. Five `/27`s; three more `/27`s remain.
31. Yes: `10.1.0.0/25`, `10.1.0.128/26`, and `10.1.0.192/26`.
32. One `/27`, `10.70.0.224/27`, or 32 total addresses.
33. Rounded needs are 1,024+256+128=1,408; the next power of two is 2,048, a `/21` when aligned.
34. Small allocations could fragment the space needed by a large subnet.
35. No. The first is `.0–.127`; the second is `.128–.191`.
36. `10.90.0.0/22`.
37. `192.168.8.0/23`.
38. No. The common summary would also include intermediate/extra networks; separate routes are exact.
39. A sees B as remote and uses its gateway; B sees A as local and ARPs. The asymmetric belief can break communication.
40. The gateway is outside the client's `/24`, so it cannot resolve it as a local next hop. Correct the gateway or address plan.
