# Design System Specification: Editorial Logistics

## 1. Overview & Creative North Star
**Creative North Star: "The Precision Architect"**

This design system moves beyond the generic utility of logistics software to create a high-trust, editorial-grade digital environment. It treats data not as a burden, but as a premium asset. The visual language is defined by "The Precision Architect"—a philosophy that balances the industrial reliability of a global supply chain with the refined sophistication of high-end Swiss typography and minimalist architecture.

To break the "template" look, this system utilizes intentional white space (the "Breathing Room"), sophisticated layering, and a hierarchy that prioritizes information density without visual clutter. We avoid the rigidity of traditional grids by allowing components to overlap and using tonal depth to define boundaries rather than heavy lines.

---

## 2. Colors: Tonal Architecture
The palette is rooted in a deep, vibrant Emerald and a range of "Mineral" grays. 

### The Palette (Core Tokens)
*   **Primary (`#006a45`):** The "Emerald Anchor." Used for main actions and brand presence.
*   **Primary Container (`#008558`):** Use for subtle gradients or high-visibility highlights.
*   **Surface (`#f5fbf4`):** A soft, "minted" white that reduces eye strain compared to pure `#FFFFFF`.
*   **Secondary (`#3e6751`):** A muted, professional forest green for supporting elements.

### The Rules of Engagement
*   **The "No-Line" Rule:** 1px solid borders are strictly prohibited for sectioning. Structural boundaries must be defined solely by background shifts. For example, a `surface-container-low` card sitting on a `surface` background creates a natural edge.
*   **Surface Hierarchy & Nesting:** Treat the UI as physical layers.
    *   **Level 0 (Base):** `surface`
    *   **Level 1 (Sections):** `surface-container-low`
    *   **Level 2 (Cards):** `surface-container-lowest` (pure white) to provide a "lifted" feel.
*   **The "Glass & Gradient" Rule:** To reflect the "Precision Architect" persona, floating navigation or quick-action panels should use Glassmorphism: `surface` color at 80% opacity with a `20px` backdrop-blur. 
*   **Signature Textures:** Hero sections and primary buttons should utilize a subtle linear gradient from `primary` to `primary-container` at a 135-degree angle to add a "soul" to the digital interface.

---

## 3. Typography: Editorial Authority
We use **Manrope** exclusively. Its geometric yet approachable nature perfectly bridges the gap between modern tech and human reliability.

*   **Display (L/M/S):** Large, bold, and authoritative. Use `display-lg` (3.5rem) with negative letter-spacing (-0.02em) for hero headlines to create a bespoke, "magazine" feel.
*   **Headline & Title:** Use for section headings. Maintain high contrast between the `on-surface` color (for text) and the background.
*   **Body (L/M/S):** The workhorse. `body-lg` (1rem) is the default for readability. Ensure line heights are generous (1.5x - 1.6x) to maintain the premium, open feel.
*   **Label (M/S):** All-caps labels should be used sparingly for "over-titles" or technical metadata, using `label-md` with 0.05em letter spacing for an architectural touch.

---

## 4. Elevation & Depth: Tonal Layering
Depth is not a drop-shadow; it is a relationship between light and surface.

*   **The Layering Principle:** Avoid elevation shadows where possible. Instead, stack `surface-container` tiers. A `surface-container-highest` element feels closer to the user than a `surface-container-low` element.
*   **Ambient Shadows:** For floating elements (like the "HÀNH ĐỘNG NHANH" card in the reference), use a shadow tinted with the `on-surface` color. 
    *   *Spec:* `0px 12px 32px rgba(23, 29, 25, 0.06)`
*   **The "Ghost Border" Fallback:** If a divider is essential for accessibility, use the `outline-variant` token at **15% opacity**. This creates a "suggestion" of a line rather than a hard break.
*   **Backdrop Blurs:** Use blurs on modal backgrounds or sticky headers to allow the vibrant primary emerald to bleed through softly, ensuring the interface feels integrated.

---

## 5. Components
Each component must feel custom-machined.

*   **Buttons:**
    *   **Primary:** Emerald gradient (`primary` to `primary-container`), `xl` roundedness (0.75rem), and a soft ambient shadow.
    *   **Tertiary:** No background, `on-surface` text. On hover, a `surface-container-high` subtle background appears.
*   **Input Fields:** Use `surface-container-lowest` as the fill. The label should sit above the field in `label-md`. Forbid heavy borders; use a 1px `outline-variant` at 20% opacity that transitions to a 2px `primary` bottom-border on focus.
*   **Cards:** Forbid divider lines within cards. Use `spacing-lg` (vertical white space) to separate header, body, and footer sections.
*   **Progress Indicators:** Use the Emerald `primary` against a `surface-variant` track. The transition should be fluid and eased, never "snapping" into place.
*   **Data Tables:** Avoid the "excel" look. Use `surface-container-low` for every second row instead of grid lines. The header row should use `label-md` with a subtle `primary` accent mark.

---

## 6. Do's and Don'ts

### Do
*   **Do** embrace asymmetry. Align a headline to the left but a CTA to the right to create a dynamic visual flow.
*   **Do** use the `xl` (0.75rem) corner radius for large cards to soften the industrial logistics feel.
*   **Do** prioritize "Type-as-UI." Let the scale and weight of Manrope do the heavy lifting of organization.

### Don't
*   **Don't** use pure black (#000000). Always use `on-surface` (#171d19) for text to maintain the premium "Mineral" tone.
*   **Don't** use standard 1px borders. If you find yourself reaching for a border tool, try a background color shift first.
*   **Don't** crowd the edges. The "Precision Architect" requires at least 48px of padding for major section containers to maintain high-trust authority.