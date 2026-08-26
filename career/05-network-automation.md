# Network Automation Awareness

## Network+ boundary

Read structured data, understand desired state, validate a planned small change, protect secrets, and verify results. Writing production automation frameworks, advanced Python, model-driven telemetry, and CI/CD architecture are outside scope.

## Why automate

- Repeat the same intended change consistently.
- Review and approve differences before execution.
- Record who changed what and support rollback.
- Reduce typing errors while recognizing that one automation error can scale quickly.

## Simple desired-state example

```yaml
interface: GigabitEthernet0/12
description: USER_DESK_A12
mode: access
access_vlan: 10
portfast: true
bpdu_guard: true
```

Line by line: select one interface, assign an auditable description, require access mode, place it in VLAN 10, speed endpoint convergence, and protect the edge from BPDUs. Validation should reject a trunk interface, nonexistent VLAN, or infrastructure link before change.

## Safe workflow

1. Store intended non-secret configuration in version control.
2. Keep credentials in an approved secret system, never the repository.
3. Inventory exact lab targets; limit scope.
4. Run syntax/schema validation and dry-run/diff when supported.
5. Obtain approval for the displayed change.
6. Apply to one lab/canary target.
7. Verify interface/VLAN/MAC/user path and security behavior.
8. Roll back the commit/config if validation fails.

## API awareness

An API request has endpoint/URL, method, headers/authentication, request body, response status, and response data. Use TLS, scoped tokens, rate limits, input validation, logging, and timeouts. `200` may mean a request was accepted successfully, but the network service still needs end-to-end verification.

## Lab scenario

Review five access-port YAML records. Find one with `mode: trunk`, one missing VLAN 10, and one containing a plaintext password. Reject the plan before execution, correct the intended data, move the secret to an approved mechanism, and write the show commands and user tests required after a safe dry run.
