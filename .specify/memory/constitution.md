<!--
SYNC IMPACT REPORT
==================
Version change: [INITIAL] → 1.0.0
Modified principles: N/A (initial version)
Added sections:
  - Core Principles (5 principles tailored for hackathon rapid development)
  - Development Workflow
  - Governance
Removed sections: N/A
Templates requiring updates:
  ✅ .specify/templates/plan-template.md - Constitution Check section now aligns with hackathon principles
  ✅ .specify/templates/spec-template.md - Test requirements marked as optional, UX scenarios prioritized
  ✅ .specify/templates/tasks-template.md - Test tasks clearly marked as optional, UX polish tasks added
Follow-up TODOs:
  - Project name to be determined based on hackathon submission
  - Ratification date set to today (initial creation)
-->

# Cinema Hackathon Constitution

## Core Principles

### I. Speed Over Perfection

**MUST**: Ship working features fast; iterate based on feedback rather than upfront perfection.

**MUST**: Choose libraries and frameworks that accelerate development (existing UI components, scaffolding tools, boilerplate generators).

**MUST NOT**: Spend time on premature optimization, extensive architecture planning, or over-engineering solutions.

**Rationale**: Hackathon success depends on demonstrating a working prototype within tight time constraints. Speed of iteration and visible progress trump code perfection.

### II. User Experience First

**MUST**: Every feature must have a clear, intuitive user flow designed before implementation.

**MUST**: Prioritize responsive feedback (loading states, error messages, success confirmations) in all interactions.

**MUST**: Test user flows manually as the primary validation method - if it feels broken, it is broken.

**MUST NOT**: Ship features with confusing navigation, unclear CTAs, or missing feedback states.

**Rationale**: Great UX is the primary differentiator in hackathon demos. Users forgive performance issues but not confusion or poor interaction design.

### III. Visual Polish

**MUST**: Maintain consistent spacing, typography, and color scheme throughout the application.

**MUST**: Use a design system or UI library (e.g., Tailwind, MUI, Shadcn) to ensure visual coherence.

**SHOULD**: Dedicate time for visual polish pass after core features work (alignment, spacing, transitions).

**MUST NOT**: Mix multiple design patterns or visual styles within the same application.

**Rationale**: Decent design signals professionalism and attention to detail. Consistency matters more than custom design.

### IV. Pragmatic Quality

**MUST NOT**: Write unit tests or integration tests unless explicitly requested.

**MUST**: Handle obvious error cases (network failures, empty states, invalid inputs) with user-friendly messages.

**SHOULD**: Use TypeScript or similar type systems if the project setup already includes it, but don't retrofit.

**MUST NOT**: Block features waiting for comprehensive error handling or edge case coverage.

**Rationale**: Testing and exhaustive error handling consume time better spent on features and UX. Focus on the happy path and common errors only.

### V. Scope Discipline

**MUST**: Implement the minimal feature set that demonstrates the core value proposition.

**MUST**: Cut features aggressively when time is running short - prioritize completeness of fewer features over partial implementation of many.

**MUST**: Track scope via clear user stories with priority levels (P1, P2, P3) - P1 is MVP, P2+ are stretch goals.

**MUST NOT**: Add "nice to have" features until all P1 stories are complete and polished.

**Rationale**: A polished, limited-scope demo beats a broken, feature-rich prototype. Judges and users evaluate based on what works, not what was attempted.

## Development Workflow

### Feature Implementation Process

1. **Define**: Write clear user story with acceptance criteria (what the user can do)
2. **Design UX**: Sketch the user flow, identify key interactions and feedback points
3. **Implement**: Build the feature focusing on the happy path
4. **Polish**: Add loading states, error messages, visual refinement
5. **Validate**: Manually test the complete user flow

### Scope Management

- **P1 (MVP)**: Core features that must work for a successful demo - implement first, polish fully
- **P2 (Enhanced)**: Features that improve the demo - implement only if P1 is solid
- **P3 (Stretch)**: Nice-to-have features - implement only if time permits

### Quality Gates

- **Before considering feature complete**: User flow must be manually testable end-to-end
- **Before adding new features**: All P1 features must have visual polish pass completed
- **Before demo**: Run through all user flows without code changes - only UX validation

### Technical Debt Policy

- **Document**: Keep a brief TODO.md for known shortcuts and technical debt
- **Ignore**: Defer all non-critical refactoring until after the hackathon
- **Accept**: Fast, working code with known limitations beats slow, perfect code

## Governance

### Constitution Authority

This constitution governs all development decisions during the hackathon. When time pressure conflicts with quality, these principles provide the tiebreaker.

### Amendment Process

- **During Hackathon**: Constitution can be amended by team consensus when priorities shift
- **Post-Hackathon**: If project continues, reassess principles for long-term maintenance

### Compliance

- **Feature Reviews**: Before marking any feature "done", verify it meets UX and visual polish principles
- **Scope Reviews**: At each milestone, confirm current work aligns with priority discipline (are we working on P1?)
- **No Gatekeeping**: Don't block progress for missing tests, documentation, or edge case handling unless explicitly added to constitution

**Version**: 1.0.0 | **Ratified**: 2025-10-22 | **Last Amended**: 2025-10-22
