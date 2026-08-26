# Pack 05 — Wireless Survey and Monitoring

## Scenario

An office has three APs, 60 users, voice over Wi-Fi, and an Internet circuit. Users report good signal bars but slow meetings at 10:00–11:00.

## Survey workflow

1. Copy [survey template](survey-template.csv) and record floor position, wall material, time, client type, band, channel, width, RSSI, noise/SNR, utilization, retries, local throughput, and roaming interruption.
2. Use a local wired test server so ISP performance is a separate measurement.
3. Anonymize neighboring SSIDs/BSSIDs in published work.
4. Create one hypothesis from evidence: coverage, interference, contention/capacity, authentication, roaming, or upstream service.
5. Change one approved variable and repeat identical measurements.

## Monitoring workflow

Build a dashboard/runbook from [baseline template](baseline-template.csv). At minimum include:

- AP availability, client count, channel utilization, retries, and authentication failures.
- Switch uplink utilization/errors/discards and PoE consumption.
- WAN latency/loss/throughput and DNS/DHCP service health.
- NTP state and TLS-certificate expiry.

Use [review rubric](solution.md). No single RSSI threshold is universally correct; state requirements and tool/client limitations.

