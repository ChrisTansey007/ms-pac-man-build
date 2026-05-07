# Product Roadmap

## Phase 1: Foundation (v0.1)
**Goal:** Establish core movement and basic gameplay
- [ ] Project setup and tooling configuration
- [ ] Basic maze rendering (first level)
- [ ] Pac-Man entity with 96px/s movement and wall collision
- [ ] Dot eating and scoring system (10 points per dot)
- [ ] Keyboard controls (arrow keys)
- [ ] Lives system (3 lives, reset on death)
- [ ] Basic game loop with requestAnimationFrame
- [ ] Unit tests for movement and collision

## Phase 2: Core Gameplay (v0.2)
**Goal:** Implement ghost AI and core mechanics
- [ ] Blinky ghost with direct chase AI
- [ ] Pinky ghost with ambush AI (4 tiles ahead)
- [ ] Clyde ghost with shy AI (chase when far, flee when close)
- [ ] Inky ghost with complex targeting (using Blinky's position)
- [ ] Ghost house mechanics (entrance/exit timings)
- [ ] Ghost modes: chase, scatter, frightened, eye return
- [ ] Energizer/power pellet functionality
- [ ] Ghost eating for bonus points (200,400,800,1600)
- [ ] Collision detection between Pac-Man and ghosts
- [ ] Unit tests for each ghost AI

## Phase 3: Polish and Features (v0.3)
**Goal:** Complete all remaining features and polish
- [ ] Fruit bonus system with correct sprites and timing
- [ ] Intermissions (cutscenes) between levels 1-2, 2-3, 3-4, 4-5
- [ ] Sound effects for all actions (dots, energizers, ghosts, death, etc.)
- [ ] Background music that changes with game state
- [ ] Maze levels 2, con't all four original mazes in rotation
- [ ] Extra life at 10,000 points
- [ ] High score persistence via LocalStorage
- [ ] Responsive design for mobile browsers
- [ ] Start/pause/game over screens
- [ ] Visual polish (sprite animations, color accuracy)
- [ ] Performance optimization to maintain 60fps

## Phase 4: Verification and Release (v1.0)
**Goal:** Ensure authenticity and prepare for release
- [ ] Side-by-side comparison with original arcade gameplay
- [ ] Accuracy verification (<5% tolerance for timing, movement, scoring)
- [ ] Comprehensive playtesting and bug fixing
- [ ] Documentation completion (architecture, API, contributor guide)
- [ ] Automated CI/CD pipeline with GitHub Actions
- [ ] Performance audits and optimization
- [ ] Final review against acceptance criteria
- [ ] Release to GitHub Pages
- [ ] Post-release monitoring and feedback collection

## Ongoing: Maintenance and Improvement
- [ ] Regular dependency updates
- [ ] Community feedback integration
- [ ] Potential educational extensions (seeing ghost targeting visualized, etc.)
- [ ] Bug fixes as reported