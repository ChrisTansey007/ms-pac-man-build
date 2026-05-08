# Keyboard Event Handling

## Overview
This document describes the implementation of actual keyboard event handling for the Ms. Pac-Man game, specifically uncommenting and completing the keyboard input functionality in the InputSystem.

## Current State
The InputSystem currently has placeholder code for keyboard event handling that is commented out. The system is designed to work with actual keyboard events but relies on a setter method for testing purposes.

## Planned Implementation
To enable actual keyboard event handling, we need to:

1. Uncomment the keyboard event listener in the InputSystem constructor
2. Ensure the handleKeyDown method properly updates the desired direction
3. Consider adding keyup handling for more precise control (optional, but not necessary for Pac-Man)
4. Add proper cleanup of event listeners when the game is paused or destroyed

## Implementation Details

### Uncommenting the Event Listener
In `src/game/systems/input-system.ts`, uncomment the following lines in the constructor:

```typescript
constructor() {
    // In a real game, we would listen to keyboard events here.
    // For now, we leave it empty and rely on the setter for testing.
    // Uncomment the following lines to enable keyboard input in a browser environment.
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
    // Optional: window.addEventListener('keyup', this.handleKeyUp.bind(this));
}
```

### Key Handling Logic
The existing `handleKeyDown` method already maps arrow keys and WASD to directions:
- ArrowUp / w → DIRECTION.UP
- ArrowDown / s → DIRECTION.DOWN
- ArrowLeft / a → DIRECTION.LEFT
- ArrowRight / d → DIRECTION.RIGHT

This matches the classic Pac-Man control scheme.

### Additional Considerations
1. **Preventing Scrolling**: Arrow keys can cause page scrolling. We should prevent default behavior for game keys:
   ```typescript
   private handleKeyDown(event: KeyboardEvent): void {
       // Prevent scrolling when arrow keys are pressed
       if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
           event.preventDefault();
       }
       
       switch (event.key) {
           // ... existing cases
       }
   }
   ```

2. **Key Repeat Handling**: To prevent unintended multiple inputs from key repeat, we could track currently pressed keys, but for Pac-Man's input buffering system, the current approach of setting desired direction on keydown is acceptable and matches original arcade behavior.

3. **Focus Management**: Ensure the game canvas or container has focus to receive keyboard events. This can be handled by setting tabindex and calling focus() when the game starts.

4. **Accessibility**: Consider providing alternative control schemes or remapping options for accessibility.

### Files to Modify
- `src/game/systems/input-system.ts` - Uncomment and enhance keyboard event handling

### Testing Approach
1. Manual testing: Verify that arrow keys and WASD move Pac-Man correctly
2. Edge cases: Test simultaneous key presses (should use the last pressed direction)
3. Ensure no page scrolling occurs when playing
4. Verify that input works when the game container has focus

## Integration Points
- Receives raw keyboard events from the browser
- Updates the desired direction which is consumed by the MovementSystem
- Works with the existing input buffering system for responsive controls
- No changes required to other systems - this is a leaf update to the InputSystem

## Dependencies
- None - this is a self-contained update to the InputSystem
- Depends on the Direction constants from constants.ts

## Completion Criteria
- [ ] Keyboard event listener is active (not commented out)
- [ ] Arrow keys and WASD correctly move Pac-Man in the intended directions
- [ ] No unintended page scrolling occurs during gameplay
- [ ] Input system continues to work with the setter method for testing
- [ ] The game is playable using keyboard controls

## Notes
This implementation follows the original Pac-Man arcade behavior where:
- Players can input the next direction before the current path is complete
- The input is buffered and used when possible
- If the desired direction is blocked, Pac-Man continues in the current direction until it becomes available
- The control scheme is responsive and feels faithful to the original

This is considered a leaf task that does not require changes to other systems once the InputSystem is updated.