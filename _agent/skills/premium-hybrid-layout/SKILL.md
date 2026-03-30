---
name: premium-hybrid-layout
description: "(Desktop-Grid · Mobile-Carousel · No-Overflow)"
risk: safe
source: local
date_added: "2026-03-30"
---
# Premium Hybrid Layout (Desktop-Grid / Mobile-Carousel)

This skill provides a battle-tested architecture for "card-based" sections that need to be a **static centered grid on large screens** and a **smooth horizontal swipe carrusel on mobile**, while strictly preventing horizontal scroll/overflow of the entire page.

## Core Problem solved
*   **Desktop:** Cards wrap or space out awkwardly if there are only few (like 3). We want a clean 3-column centered grid.
*   **Mobile:** 3 columns are impossible. We want a carrusel.
*   **Common Bug:** Centering titles or using `width: max-content` often forces the entire page to be wider than the phone, causing a "sideways shift" of the whole site.

---

## 1. The HTML/React Structure
Always wrap the grid in a "viewport" div to isolate the scroll logic.

```jsx
<section className="hybrid-section">
  <h2>Our Institutions</h2>
  <div className="scroll-viewport">
    <div className="content-grid">
      <div className="card-wrapper">{/* Card 1 */}</div>
      <div className="card-wrapper">{/* Card 2 */}</div>
      <div className="card-wrapper">{/* Card 3 */}</div>
    </div>
  </div>
</section>
```

---

## 2. The CSS Blueprint

### Global Reset (Mandatory for Mobile Stability)
To prevent the "sidebar shift" bug, the root must have strict constraints.

```css
html, body {
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
}
.app-container {
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
}
```

### The Section and Title
Use `clamp()` for font sizes so the title never exceeds the screen width.

```css
.hybrid-section {
  padding: 6rem 1.5rem;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  overflow: hidden; /* CRITICAL: Clips children overflow */
}

.hybrid-section h2 {
  font-size: clamp(1.8rem, 5vw, 2.8rem);
  width: 100%;
  text-align: center;
  margin: 0 auto;
}
```

### Desktop Logic (The Centered Grid)
```css
.scroll-viewport {
  width: 100%;
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;
  margin-top: 2rem;
}
```

### Mobile Logic (The Caroussel Transition)
Trigger at `1024px` or `768px`.

```css
@media (max-width: 1024px) {
  .scroll-viewport {
    width: 100vw; /* Full screen width */
    margin-left: -1.5rem; /* Match section padding to span edge-to-edge */
    padding: 0 1.5rem;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
  }

  .content-grid {
    display: flex;
    flex-wrap: nowrap;
    width: max-content; /* Allow children to drive width */
    gap: 1.5rem;
    padding: 2rem 1.5rem;
    margin: 0;
  }

  .card-wrapper {
    flex: 0 0 85vw; /* Show 85% of one card, hint next card */
    max-width: 380px;
    scroll-snap-align: center;
  }
}
```

---

## 3. Mandatory Checkpoint

Before implementing a hybrid carrusel:
1.  **Is the title font using `clamp()`?** (Prevents title-driven width overflow)
2.  **Is `overflow: hidden` on the parent section?** (Prevents leakage)
3.  **Does the viewport have `overflow-x: auto`?** (Enables the swipe)
4.  **Is the `grid-template-columns` replaced by `display: flex; flex-wrap: nowrap`?** (Creates the row)

---

## When to Use
Use this whenever a "Instituciones", "Testimonios" or "Planes" section needs to transition from a balanced grid to a mobile-friendly swipe experience without breaking the overall site responsive alignment.
