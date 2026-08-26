# Network+ Interview Preparation

This chapter prepares a candidate for junior network support, NOC, help-desk-with-networking, and junior administrator interviews. It stays at Network+ depth: clear fundamentals, safe troubleshooting, evidence, documentation, and communication. It does not require CCNP-level protocol design.

## What interviewers are testing

1. Can you explain a packet path without memorized buzzwords?
2. Can you narrow a symptom safely and logically?
3. Can you interpret basic endpoint, switch, router, DNS, DHCP, and packet evidence?
4. Do you know when to stop, obtain approval, or escalate?
5. Can you communicate impact and progress to technical and nontechnical people?
6. Can you prove a fix and document it?

## Answer structure

For a technical scenario, use:

> **Scope → recent change → baseline → theory → low-risk test → evidence → correction → verification → documentation.**

Avoid jumping directly to “reboot it.” State assumptions and ask one or two high-value questions. If the scenario lacks authority or production context, say you would obtain approval and prepare rollback before a disruptive change.

## Study path

1. Answer the [technical question bank](technical-questions.md) aloud.
2. Work the [ticket scenarios](ticket-scenarios.md) without solutions.
3. Practice [behavioral and communication questions](behavioral.md) with real or lab examples.
4. Present the [capstone lab](../labs/packs/capstone/README.md) as a portfolio project.
5. Use the readiness rubric below with another person or a recorded mock interview.

## Whiteboard packet path

When asked “What happens when a user opens a website?”, explain only the relevant steps and allow follow-up:

1. Client validates local IP/prefix/gateway/DNS configuration.
2. It resolves the name using cache/hosts/DNS as applicable.
3. It decides whether the destination is local or routed.
4. ARP/Neighbor Discovery resolves the local next hop.
5. Ethernet delivers the frame to the next hop; routers replace Layer 2 headers and reduce TTL/hop limit.
6. Routing/NAT/firewall policy selects and permits the path.
7. TCP establishes state when used; TLS authenticates/protects HTTPS.
8. The application sends the request and measures response.

Strong candidates distinguish DNS success, TCP reachability, TLS identity, and application response instead of calling all failures “the Internet.”

## Portfolio evidence

Bring sanitized artifacts, never employer secrets:

- Logical and physical diagram.
- Address/VLAN plan.
- Before/after command output.
- Small packet capture with filters and explanation.
- Ticket timeline and root-cause statement.
- Change/rollback plan.
- Test results and lessons learned.

## Mock-interview rubric

| Area | Points |
|---|---:|
| Fundamental explanation is accurate and appropriately scoped | 20 |
| Troubleshooting order is safe and evidence-based | 20 |
| Commands/tools are selected for a stated question | 15 |
| Output is interpreted rather than merely recited | 15 |
| Fix includes rollback and end-to-end verification | 15 |
| Communication, ticket notes, and escalation are clear | 15 |

Readiness means consistent performance on unfamiliar scenarios, not memorized answers to this bank.

