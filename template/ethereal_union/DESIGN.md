---
name: Ethereal Union
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e4e2e1'
  on-surface: '#1b1c1c'
  on-surface-variant: '#49473d'
  inverse-surface: '#303030'
  inverse-on-surface: '#f3f0f0'
  outline: '#7a776c'
  outline-variant: '#cbc6b9'
  surface-tint: '#635f40'
  primary: '#635f40'
  on-primary: '#ffffff'
  primary-container: '#b2ac88'
  on-primary-container: '#444024'
  inverse-primary: '#cec7a2'
  secondary: '#9f402d'
  on-secondary: '#ffffff'
  secondary-container: '#fd876f'
  on-secondary-container: '#732010'
  tertiary: '#5f5e59'
  on-tertiary: '#ffffff'
  tertiary-container: '#adaba5'
  on-tertiary-container: '#40403b'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#eae3bc'
  primary-fixed-dim: '#cec7a2'
  on-primary-fixed: '#1f1c04'
  on-primary-fixed-variant: '#4b472b'
  secondary-fixed: '#ffdad3'
  secondary-fixed-dim: '#ffb4a5'
  on-secondary-fixed: '#3e0500'
  on-secondary-fixed-variant: '#802918'
  tertiary-fixed: '#e5e2db'
  tertiary-fixed-dim: '#c9c6c0'
  on-tertiary-fixed: '#1c1c18'
  on-tertiary-fixed-variant: '#474742'
  background: '#fcf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e1'
typography:
  display:
    fontFamily: Playfair Display
    fontSize: 64px
    fontWeight: '400'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '400'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Montserrat
    fontSize: 18px
    fontWeight: '300'
    lineHeight: '1.6'
  body-md:
    fontFamily: Montserrat
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-lg:
    fontFamily: Montserrat
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.1em
  label-sm:
    fontFamily: Montserrat
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 64px
  max-width: 1280px
---

## Brand & Style

The design system is centered on a romantic, editorial aesthetic that balances modern minimalism with classic elegance. It targets wedding guests seeking a seamless, high-end digital experience that reflects the intimacy and sophistication of Claudia and Jacopo's union.

The visual style utilizes a **Minimalist-Editorial** approach. It prioritizes generous white space, intentional asymmetry, and a focus on high-quality photography. To evoke an airy, botanical feel, the interface uses soft transitions and light-weight structural elements rather than heavy borders, ensuring the content feels curated and timeless.

## Colors

The palette is inspired by natural Mediterranean landscapes. 

*   **Primary (Sage Green):** Used for primary actions, success states, and botanical decorative elements.
*   **Secondary (Terracotta):** Used for accents, highlights, and secondary calls-to-action to provide warmth.
*   **Background (Off-white Cream):** The foundational canvas for the entire experience, replacing pure white to reduce eye strain and add a "paper" quality.
*   **Typography (Dark Charcoal):** Ensures high legibility while appearing softer and more sophisticated than pure black.

## Typography

This design system employs a high-contrast typographic pairing. **Playfair Display** provides an authoritative, romantic presence for headings, while **Montserrat** is used for body text and labels to maintain a contemporary, clean edge. 

For all display and headline levels, keep letter-spacing tight for a modern look. For labels and navigation items, use increased letter-spacing and uppercase styling to create a sense of breathability and hierarchy.

## Layout & Spacing

The design system follows a **Fluid Grid** model with an emphasis on "negative space as a design element."

*   **Desktop:** 12-column grid with 24px gutters. Use wide 64px outer margins to frame content like a luxury magazine.
*   **Mobile:** 4-column grid with 20px margins.
*   **Spacing Rhythm:** Use the 8px base unit. Sections should be separated by large vertical gaps (80px+) to allow the photography and elegant typography to breathe. Content groups within sections should use medium (24px) spacing.

## Elevation & Depth

To maintain the "airy" feel, this design system avoids heavy shadows. Depth is achieved through **Tonal Layers** and **Low-contrast Outlines**.

*   **Surfaces:** Use the Off-white cream as the base. For floating elements like modals or dropdowns, use a pure white surface with a very soft, high-diffusion shadow (Opacity: 5%, Blur: 20px, Color: #B2AC88/Sage).
*   **Borders:** Use thin, 1px lines in a desaturated version of Sage Green or 10% opacity Charcoal to define sections without creating visual "weight."
*   **Glassmorphism:** Apply a subtle backdrop blur (4px) on navigation bars when scrolling to maintain context of the underlying imagery.

## Shapes

The design system utilizes **Soft** roundedness. Sharp edges are avoided to maintain a romantic, approachable feel, but extreme rounding is also avoided to keep the look sophisticated and modern. 

Consistent 4px (0.25rem) radii are applied to buttons, input fields, and small cards. Large image containers or feature sections may use a slightly larger 8px radius to feel more organic.

## Components

*   **Buttons:** Primary buttons use a solid Sage Green background with white text, no border. Secondary buttons use a transparent background with a 1px Charcoal border and a slight hover lift.
*   **Input Fields:** Minimalist design—bottom border only (1px Charcoal) or a very light Sage-tinted background. Labels should be uppercase `label-lg`.
*   **Cards:** For events or RSVP details, use "Ghost Cards" with no background and a thin 1px border, or a subtle tonal shift to a slightly darker cream.
*   **Chips/Labels:** Used for dietary requirements or "Coming Soon" tags. Rounded-pill shape with Terracotta pink background and white text.
*   **RSVP Form:** Focus on clarity. Large checkboxes and high-contrast focus states using Sage Green.
*   **Botanical Accents:** Non-functional components such as SVG line-art leaves or vines should be placed asymmetrically in the background of sections, using the Primary color at 15% opacity.