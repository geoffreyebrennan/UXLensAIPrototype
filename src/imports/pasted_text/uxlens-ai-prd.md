Product Requirements Document (PRD)
Product Name

UXLens AI (working title)

An AI-powered UX reviewer that analyzes UI screenshots or Figma designs and provides actionable usability feedback based on established design principles.

Problem Statement

Many startups and product teams lack dedicated UX researchers or senior designers. As a result:

Usability issues go unnoticed until after launch.
Accessibility problems are discovered too late.
Design reviews are inconsistent and subjective.
Teams spend significant time manually reviewing interfaces.

An AI assistant can provide fast, consistent first-pass UX feedback before human review.

Vision

Help product teams ship more usable interfaces by making UX reviews instant, scalable, and grounded in established usability principles.

Target Users
Primary
Product Managers
UX Designers
Startup founders
Indie hackers
Secondary
Frontend engineers
Design students
Agencies
User Stories
PM

As a PM, I want quick UX feedback before handing designs to engineering.

Designer

As a designer, I want another set of eyes on my mockups before presenting them.

Founder

As a solo founder, I want affordable UX reviews without hiring a consultant.

Student

As a UX student, I want to understand why a design works or doesn't.

MVP Scope
Input
Upload screenshot
Upload Figma export
Website URL (stretch goal)
Mobile app screenshot
AI Analysis

The AI reviews:

Visual hierarchy
Contrast
Typography
Spacing
Layout consistency
Navigation
CTA prominence
Form usability
Accessibility
Mobile responsiveness (if applicable)
Output

For each issue:

Category

Navigation

Severity

High

Confidence

89%

Issue

The primary navigation contains seven top-level items, increasing cognitive load.

Recommendation

Reduce to five or fewer primary options or group related items under a "More" menu.

Why it matters

Improves discoverability and reduces decision fatigue.

UX Frameworks Used

The tool should reference recognized principles such as:

Nielsen's 10 Usability Heuristics
WCAG accessibility guidelines
Gestalt principles
Hick's Law
Fitts' Law
Jakob's Law
Miller's Law

One of the product challenges is ensuring the AI cites the relevant principle rather than offering generic advice.

Feature List
1. Screenshot Upload

Drag and drop interface.

2. AI Vision Analysis

Uses a multimodal LLM to inspect the UI.

3. Severity Scoring

Low

Medium

High

Critical

4. Confidence Score

Example:

"88% confidence this CTA lacks sufficient visual prominence."

This helps users judge how much weight to give each suggestion.

5. Prioritized Issue List

Sort by:

Severity
Impact
Ease of fixing
6. Positive Feedback

Not everything should be criticism.

Example:

✓ Strong visual hierarchy

✓ Clear call-to-action

✓ Good whitespace

Balanced feedback improves trust and usability.

7. Accessibility Checker

Identify issues like:

Missing contrast
Small touch targets
Color-only indicators
Low font sizes
8. Export Report

Generate a report in:

PDF
Markdown
Jira-ready tickets
Out of Scope (MVP)
Live Figma plugin
Code generation
Heatmap prediction
User testing simulation
A/B test recommendations
Multi-screen user flow analysis

These can be future roadmap items.

Functional Requirements
FR1

User uploads image.

FR2

System validates image quality.

FR3

AI identifies UI elements.

FR4

AI maps findings to UX heuristics.

FR5

System assigns severity.

FR6

System generates recommendations.

FR7

User exports findings.

Non-Functional Requirements
Analysis completes in under 20 seconds.
Support PNG and JPG.
Images up to 20 MB.
Mobile and desktop browsers.
Secure upload and deletion of user images after analysis (or configurable retention).
Success Metrics

Activation

% of users who upload a first screenshot.

Engagement

Average analyses per user per week.

Retention

Weekly returning users.

Recommendation Acceptance

% of suggestions users mark as helpful.

Time Saved

Self-reported reduction in manual review time.

Accuracy

Agreement rate between AI findings and expert UX reviewers.
Risks & Mitigations
Risk	Mitigation
Generic advice	Ground prompts in specific UX frameworks and require evidence from the screenshot.
Hallucinated issues	Require confidence thresholds and allow users to flag incorrect findings.
Inconsistent results	Standardize prompts and evaluate against a benchmark set of annotated designs.
User distrust	Include explanations tied to recognized heuristics and show positive findings alongside critiques.
Privacy concerns	Clearly state image handling policies and avoid storing uploads by default.
Future Roadmap

V2

Figma plugin
Team workspaces
Shared reports
Version comparisons
Design history

V3

Clickable prototypes
User journey analysis
AI-generated redesign suggestions
Competitor UX benchmarking
Predictive conversion scoring
PM Interview Angle

This project becomes especially compelling if you frame it as an AI product rather than simply an AI app. In interviews, you can discuss decisions such as why you chose to analyze static screenshots before tackling multi-screen flows, how you balanced comprehensive feedback with avoiding "alert fatigue," how you evaluated AI quality against expert reviewers, and what metrics would tell you the product is actually improving design outcomes rather than just generating more comments. Those discussions demonstrate product judgment, prioritization, and an understanding of the unique challenges of shipping AI-powered features.