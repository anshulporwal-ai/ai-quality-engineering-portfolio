# Quality architecture

The framework applies fast, independent quality checks to each change. GitHub Actions runs the layers in a repeatable environment and retains evidence for investigation.

![AI Quality Engineering architecture](assets/quality-architecture.svg)

## Test layers

| Layer | Purpose | Evidence |
| --- | --- | --- |
| UI | Validate a critical authenticated shopping journey | HTML report, traces and screenshots on failure |
| API | Validate status codes, headers, response shape and negative paths | HTML and JUnit results |
| Accessibility | Detect critical WCAG-related issues with axe-core | Violation details in the report |
| AI quality | Check grounding, unsafe disclosure and unsupported absolute claims | Deterministic assertion results |

## Quality-gate flow

1. A push or pull request starts the workflow.
2. TypeScript compilation catches structural errors.
3. Playwright executes the UI, API, accessibility and AI quality layers.
4. Reports and failure diagnostics are retained as build artifacts.
5. A failed layer blocks the green quality signal and directs investigation.

This public project deliberately uses synthetic data and public demonstration services. It does not reproduce an employer or client implementation.
