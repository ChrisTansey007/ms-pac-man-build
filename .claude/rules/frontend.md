# Frontend Development Rules

> **Domain-specific rules for frontend work. These supplement [`AGENTS.md`](../../AGENTS.md).**

## When to Apply

Apply these rules when working on tasks that involve:
- UI components, pages, layouts.
- Client-side state management.
- Styling, responsive design.
- Client-side routing.
- Form handling, validation.
- Accessibility.

## Rules

- [ ] All interactive elements must be keyboard accessible.
- [ ] Use semantic HTML (`<button>`, `<nav>`, `<main>`, etc.). Avoid `<div>` for interactive elements.
- [ ] Ensure color contrast meets WCAG AA minimum (4.5:1 for normal text).
- [ ] All images must have `alt` attributes (descriptive or empty for decorative).
- [ ] Forms must show validation errors inline, not just in toasts.
- [ ] Loading states must be shown for all async operations.
- [ ] Error states must be handled and displayed to the user.
- [ ] Responsive design: test at 320px, 768px, 1024px, and 1440px widths.
- [ ] Avoid layout shift: set explicit dimensions on images and async content areas.
- [ ] Client-side routes must have unique, descriptive `<title>` tags.

## Related Files

- [`docs/01-product/acceptance-criteria.md`](../../docs/01-product/acceptance-criteria.md)
- [`docs/02-architecture/system-overview.md`](../../docs/02-architecture/system-overview.md)
