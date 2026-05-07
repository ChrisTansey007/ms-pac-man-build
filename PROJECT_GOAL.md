# PROJECT_GOAL.md — Guided Intake Form

> **Complete this file before inviting any AI worker to your project.**
> **This is the single most important document for bootstrapping your project. Workers use it to decompose the goal into actionable tasks.**

---

## Project Name
Ms. Pac-Man Build

*Replace with the name of your project. Keep it short and memorable.*

---

## One-Sentence Goal
A faithful recreation of the classic Ms. Pac-Man arcade game using modern web technologies and the agent-os workflow system for coordinated AI development.

*Describe what this project will do in exactly one sentence. Example: "A personal finance dashboard that aggregates bank accounts and categorizes spending automatically."*

---

## Long-Form Goal
This project aims to recreate the authentic Ms. Pac-Man arcade experience from 1982 with pixel-perfect accuracy while leveraging modern development practices. The goal is to build a playable web-based version that captures all the original gameplay mechanics, including Pac-Man movement, ghost AI behaviors with their distinct personalities (Blinky, Pinky, Inky, and Clyde), fruit bonuses, intermissions, sound effects, and scoring system.

The project serves as both a tribute to a classic game and a demonstration of the agent-os workflow system for coordinating multiple AI workers on a complex software project. Success will be measured by creating a version that feels identical to the original when played side-by-side, with all the subtle nuances that make Ms. Pac-Man unique (such as the different maze layouts, ghost behavior patterns, and intermission cutscenes).

By using the agent-os system, we can decompose this complex project into manageable tasks that can be worked on by specialized AI workers (movement implementation, ghost AI, rendering, audio, testing, etc.) while maintaining consistency through the repository-as-source-of-truth approach. This creates a reusable template for future game recreation projects.

*Expand on the one-sentence goal. Describe the problem you are solving, why it matters, and what success looks like. Aim for 3–5 paragraphs.*

---

## Target Users
*Who will use this? Describe the primary user persona(s). Include their goals, frustrations, and context.*

- **Primary persona:** Retro gaming enthusiasts who want to play an authentic Ms. Pac-Man experience in their browser without needing emulators or original hardware. They value gameplay fidelity, authentic feel, and the ability to share high scores with friends.
- **Secondary persona:** Game developers and AI researchers interested in studying classic game implementations and observing how multi-agent AI systems can collaborate on complex software projects.

- **Primary persona:** Individuals aged 25-45 who grew up playing arcade games in the 80s and 90s. They seek nostalgic experiences that accurately capture the original gameplay, not modern reinterpretations. Their frustration points include inaccurate ports, wrong physics, missing features, or altered difficulty curves.
- **Secondary persona:** Technical professionals interested in the agent-os workflow system as a case study in distributed AI software development. They want to examine how the system handles task decomposition, worker coordination, verification gates, and handoffs in a well-defined project like a game clone.

---

## Primary Outcomes
*What must this project deliver to be considered successful? List measurable outcomes.*

1. Playable web-based Ms. Pac-Man game that matches original arcade behavior within 5% tolerance for timing, movement, and scoring
2. Complete implementation of all four ghosts with their distinct targeting algorithms and personalities
3. All four original maze layouts with correct intermissions between levels
4. Fruit bonus system that appears at correct intervals with proper scoring
5. Sound effects and music that closely match the original arcade cabinet
6. Responsive design that works on desktop and mobile browsers
7. Source code organized using agent-os workflow with clear task separation, verification gates, and handoff documentation

---

## Non-Goals
*What is explicitly out of scope for this project? Listing non-goals prevents scope creep.*

1. Adding new gameplay features not present in the original Ms. Pac-Man (e.g., power-ups, multiplayer, level editors)
2. Changing the core gameplay mechanics or difficulty balance from the original
3. Implementing online leaderboards or social features beyond local high score storage
4. Creating versions for native mobile app stores or desktop platforms (web-only focus)
5. Adding modern monetization features like ads or in-app purchases
6. Supporting game controllers beyond keyboard input (focus on authentic keyboard controls)

---

## Constraints
*What constraints must the project operate within?*

- **Budget:** $0 (open source, volunteer effort)
- **Timeline:** Flexible - priority on quality over speed
- **Team size:** Solo developer + AI workers (human provides guidance and final review)
- **Platform:** Web browsers (HTML5, TypeScript, Canvas/WebGL)
- **Compliance:** None (game is for educational/personal use only)
- **Other:** Must maintain original aspect ratio and 60fps target for authentic feel

---

## Preferred Tech Stack
*What technologies do you prefer or require? Workers will respect these preferences unless a task explicitly proposes a change.*

- **Frontend:** TypeScript, HTML5 Canvas, CSS3
- **Backend:** None (client-side only)
- **Database:** LocalStorage for high score persistence
- **Hosting:** GitHub Pages
- **CI/CD:** GitHub Actions for automated testing
- **Other:** Jest for unit testing, ESLint for code quality

---

## Deployment Target
*Where will this project run in production? Be specific.*

- **Environment:** Web application (single-page application)
- **Hosting provider:** GitHub Pages (https://ChrisTansey007.github.io/ms-pac-man-build)
- **Domain (if applicable):** ms-pac-man-build.christansev007.github.io (GitHub Pages default)

---

## Success Criteria
*How will you know the project is done? Define concrete, measurable criteria.*

1. Gameplay matches original Ms. Pac-Man within 5% tolerance when comparing side-by-side footage of Level 1
2. All four ghosts exhibit correct individual behaviors (Blinky direct chase, Pinky ambush, Inky complex targeting, Clyde shy)
3. Fruit bonuses appear at correct intervals (levels 1, 2, 3, 4, then every 8 levels after) with correct sprites and scoring
4. Intermissions (cutscenes) play correctly between levels as in original
5. Sound effects trigger correctly for all actions (eating dots, power pellets, ghosts, dying, etc.)
6. Score matches original exactly for all actions
7. All automated tests pass (unit tests for movement, collision, ghost AI)
8. Manual playtesting confirms no obvious deviations from original behavior
9. Code follows agent-os workflow with proper task claiming, locks, handoffs, and verification
10. Repository maintains clean git history with meaningful commits

---

## First Milestone
*What is the smallest useful thing you can ship first? Define the MVP or v0.1 scope.*

The first milestone is a playable prototype featuring:
- Pac-Man character that can move through the maze with basic wall collision
- Dot eating and scoring system
- Basic maze rendering (first level layout)
- Keyboard controls (arrow keys)
- No ghosts, no fruit, no intermissions, no sound
- But core movement mechanics feel authentic (96px/s speed, grid-based turning, collision)

This establishes the foundation upon which all other systems (ghosts, fruit, etc.) can be built.

---

## Initial Risks
*What risks do you anticipate? Listing them early helps workers plan mitigations.*

1. **Movement timing accuracy:** Extracting exact original movement constants may be difficult; mitigated by using community-discovered frame-perfect analyses and MAME disassembly references
2. **Ghost AI complexity:** The targeting algorithms (especially Inky's) are notoriously complex; mitigated by implementing one ghost at a time starting with simplest (Clyde) and using existing disassembly resources
3. **Sprite and animation timing:** Getting animation frames correct for Pac-Man mouth, ghost eyes, etc.; mitigated by extracting from original ROMs or using verified sprite sheets
4. **Scope creep:** Temptation to add features; mitigated by strict adherence to Non-Goals list and regular reviews against PROJECT_GOAL.md
5. **Browser performance:** Maintaining 60fps in browser; mitigated by efficient rendering techniques and requestAnimationFrame usage
6. **Legal concerns:** Using Pac-Man IP; mitigated by keeping project non-commercial, educational, and clearly attributing to original creators (Namco/Bandai)

---

## Preferred Execution Mode
*How do you want AI workers to operate on this project?*

- **Hybrid Mode** — One primary worker drives the project with specialized support workers.

See [`agent-os/execution-modes.md`](./agent-os/execution-modes.md) for details on each mode.

---

## Worker Preferences
*Which AI workers do you prefer for this project? These are recommendations, not hard requirements.*

### Preferred Workers
- **Primary:** Hermes (for coordination and workflow management)
- **For architecture:** Claude (for system design decisions)
- **For implementation:** Codex (for movement and game systems code)
- **For research:** Gemini (for extracting accurate game data from ROMs/disassembly)
- **For UI verification:** Antigravity (for visual fidelity testing)
- **For testing:** Any worker with strong test-writing capabilities

### Workers Not Available
None currently unavailable - all standard Hermes agent workers should be accessible.

### Human Review Preference
- **Review everything** — I want to approve every task before it is marked done.

### Worker Autonomy
- **Confirm before major changes** — Workers should ask before large refactors or architecture changes.

---

## Human Owner Notes
*Anything else workers should know. Your communication preferences, review cadence, areas where you want extra caution, etc.*

- Please communicate primarily through task handoffs and verification evidence in the repository
- I will review completed tasks asynchronously via GitHub issues and PRs
- Pay extra attention to gameplay fidelity - this is the most important aspect
- When in doubt about original behavior, consult verified sources like The Cutting Room Floor, TCRF.net, or MAME disassembly
- Maintain clean, readable code with good documentation as this serves as a showcase for the agent-os system
- Regularly run npm test to ensure nothing breaks during development
- Feel free to ask for clarification on any ambiguous aspects of the goal

---