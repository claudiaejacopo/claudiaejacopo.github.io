---
name: Terracotta Bloom
colors:
  surface: '#fcf9f2'
  surface-dim: '#dcdad3'
  surface-bright: '#fcf9f2'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3ec'
  surface-container: '#f1eee7'
  surface-container-high: '#ebe8e1'
  surface-container-highest: '#e5e2db'
  on-surface: '#1c1c18'
  on-surface-variant: '#56423d'
  inverse-surface: '#31312c'
  inverse-on-surface: '#f3f0e9'
  outline: '#89726c'
  outline-variant: '#ddc0b9'
  surface-tint: '#9e4127'
  primary: '#9b3f25'
  on-primary: '#ffffff'
  primary-container: '#bb563b'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb5a1'
  secondary: '#7b5455'
  on-secondary: '#ffffff'
  secondary-container: '#fdcbcb'
  on-secondary-container: '#795354'
  tertiary: '#5a5f42'
  on-tertiary: '#ffffff'
  tertiary-container: '#727759'
  on-tertiary-container: '#fcffe1'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbd1'
  primary-fixed-dim: '#ffb5a1'
  on-primary-fixed: '#3b0800'
  on-primary-fixed-variant: '#7f2a12'
  secondary-fixed: '#ffdad9'
  secondary-fixed-dim: '#ecbbba'
  on-secondary-fixed: '#2f1314'
  on-secondary-fixed-variant: '#603d3e'
  tertiary-fixed: '#e1e6c1'
  tertiary-fixed-dim: '#c5caa6'
  on-tertiary-fixed: '#191d07'
  on-tertiary-fixed-variant: '#44492e'
  background: '#fcf9f2'
  on-background: '#1c1c18'
  surface-variant: '#e5e2db'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 42px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
  body-lg:
    fontFamily: Source Sans 3
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Source Sans 3
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: Source Sans 3
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1140px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 64px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style

This design system captures the essence of a sun-drenched Mediterranean afternoon. It is crafted for a wedding invitation experience that feels organic, rustic-chic, and deeply personal. The brand personality is "refined-casual"—where the elegance of a high-end editorial meets the warmth of a terracotta patio.

The design style is **Warm Minimalism** with a **Tactile** edge. It avoids the coldness of corporate minimalism by introducing soft textures, generous whitespace, and a focus on high-end typography. The goal is to evoke an emotional response of romance, timelessness, and intimate celebration. The UI should feel like high-quality stationery brought to life on a digital screen, emphasizing breathability and graceful movement.

## Colors

The palette is inspired by natural earth pigments and coastal flora.

- **Primary (Terracotta):** Used for primary actions, key headings, and significant brand moments. It provides the "soul" of the design.
- **Secondary (Dusty Rose):** Used for accents, soft highlights, and romantic flourishes. It provides a gentle contrast to the earthy primary tone.
- **Tertiary (Olive):** Used sparingly for interactive elements like success states or as a grounding color for botanical motifs and dividers.
- **Neutral (Sand):** The foundation of the system. This off-white, warm neutral replaces pure white to reduce eye strain and enhance the rustic, paper-like feel.
- **Text:** Deep charcoal or a very dark shade of the primary color (e.g., #3E2723) should be used for body text to maintain high legibility against the sand background.

## Typography

Typography is the cornerstone of this system. It balances the authoritative, elegant weight of **Playfair Display** with the modern clarity of **Source Sans 3**.

- **Headlines:** Use Playfair Display for all major titles. It should feel editorial and romantic. Use "display-lg" for the couple's names or hero sections.
- **Body:** Source Sans 3 provides a neutral, highly readable counterpoint. It ensures that logistical details (dates, directions, RSVP info) are clear and accessible.
- **Labels:** Use "label-caps" for small metadata, form labels, or secondary navigation to provide a structured, organized feel without distracting from the headlines.

## Layout & Spacing

The layout follows a **Fluid Grid** model with generous margins to mimic the feel of a physical invitation card. 

- **Grid:** Use a 12-column grid for desktop and a 4-column grid for mobile. 
- **Rhythm:** Vertical rhythm is driven by the "stack" variables. "Stack-lg" is used between major sections to ensure the design feels airy and sun-drenched.
- **Safe Areas:** Maintain a minimum 64px margin on desktop to create a "framed" effect, centering the content as the focus of the experience.
- **Responsibility:** On mobile, margins reduce to 20px, and typography scales down to ensure the "Display" styles do not break or feel overwhelming on small screens.

## Elevation & Depth

To maintain a "rustic-chic" aesthetic, this design system avoids heavy shadows and synthetic glows. Instead, it uses **Tonal Layers** and **Soft Ambient Shadows**.

- **Surfaces:** Use subtle shifts in background color (e.g., Sand vs. a slightly lighter Cream) to separate content sections.
- **Shadows:** When depth is required (such as on cards or buttons), use very soft, diffused shadows with a slight Terracotta tint (e.g., `rgba(192, 90, 62, 0.08)`). This keeps the elevation feeling like paper sitting on a wooden table rather than an app element floating in space.
- **Interactions:** Hover states should feel organic—prefer subtle color shifts or slight upward translations over harsh outlines or glows.

## Shapes

The shape language is **Soft** and **Organic**. 

- **Corners:** Use 4px (0.25rem) for standard components like buttons and input fields. This is enough to remove the "sharpness" of digital interfaces while maintaining a clean, professional look.
- **Large Elements:** For image containers or card sections, use "rounded-lg" (8px) to emphasize the friendly, welcoming nature of the event.
- **Media:** Photography should often feature soft-focus edges or be contained in these rounded frames to align with the sun-drenched aesthetic.

## Components

- **Buttons:** Primary buttons use a solid Terracotta fill with white or cream text. Secondary buttons use an Olive or Dusty Rose outline. All buttons should have a slightly wider horizontal padding to feel more premium.
- **Cards:** Cards should have a Sand background, a subtle 1px border in a slightly darker neutral, and the soft ambient shadow mentioned in the Elevation section.
- **Input Fields:** Use "Sand" as the fill color with a bottom-only border or a very light 4-sided border to mimic traditional stationery lines. 
- **RSVP Chips:** Use rounded-pill shapes for selection states. An active "Attending" chip should use an Olive background to signal positivity.
- **Dividers:** Use thin, elegant lines in Dusty Rose or light Terracotta. Occasionally, use a small botanical icon (like a leaf or bud) as a center-point for dividers.
- **Lists:** Bullet points should be replaced with custom Olive-colored leaf icons or simple soft-edged dots to maintain the organic theme.