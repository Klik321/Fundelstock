---
name: Fundelstock
description: A dark, terminal-grade financial-news command center for fundamental traders.
colors:
  accent-blue: "#2962ff"
  accent-blue-hover: "#1e4fd9"
  accent-green: "#26a69a"
  accent-red: "#ef5350"
  accent-amber: "#ff9800"
  accent-purple: "#7c4dff"
  bg-primary: "#0b0e17"
  bg-surface: "#131722"
  bg-surface-hover: "#1c2030"
  bg-elevated: "#1e2235"
  bg-ticker: "#0d1019"
  text-primary: "#d1d4dc"
  text-secondary: "#787b86"
  text-tertiary: "#4a4e5e"
typography:
  display:
    fontFamily: "Space Grotesk, DM Sans, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3.75rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Space Grotesk, DM Sans, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.04em"
  mono:
    fontFamily: "IBM Plex Mono, Menlo, Monaco, monospace"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "normal"
    fontFeature: "tnum"
rounded:
  md: "8px"
  lg: "12px"
  xl: "16px"
  2xl: "20px"
  3xl: "28px"
  4xl: "36px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "48px"
components:
  card:
    backgroundColor: "{colors.bg-surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.xl}"
    padding: "24px"
  button-primary:
    backgroundColor: "{colors.accent-blue}"
    textColor: "#ffffff"
    rounded: "{rounded.lg}"
    padding: "10px 20px"
  button-primary-hover:
    backgroundColor: "{colors.accent-blue-hover}"
    textColor: "#ffffff"
    rounded: "{rounded.lg}"
    padding: "10px 20px"
  pill-green:
    backgroundColor: "rgba(38,166,154,0.12)"
    textColor: "{colors.accent-green}"
    rounded: "{rounded.2xl}"
    padding: "4px 10px"
  pill-red:
    backgroundColor: "rgba(239,83,80,0.12)"
    textColor: "{colors.accent-red}"
    rounded: "{rounded.2xl}"
    padding: "4px 10px"
---

# Design System: Fundelstock

## 1. Overview

**Creative North Star: "The Trading Terminal, Refined."**

Fundelstock is what a Bloomberg terminal would look like if it were rebuilt by
the team that designs high-end consumer software. It is unapologetically dark —
not as a style trend but because its users live on dark charts during market
hours — and every surface exists to make numbers, headlines, and sentiment
faster to read and trust. The palette is lifted almost directly from
TradingView's own chart engine (the same #2962ff blue, #131722 surface, #d1d4dc
text), which gives instant credibility to an audience that recognizes those
exact values. On top of that data-dense foundation sits a restrained layer of
"Liquid Glass": precise backdrop blur, hairline borders, and soft inner
highlights that suggest depth without fog.

The system rejects the indistinct "dark SaaS template" — the purple-gradient
hero, neon glow, and floating-blob background that signals an AI-generated
landing page. It also rejects crypto-bro overstimulation. Depth and motion are
spent like currency: sparingly, and only where they add clarity or a moment of
craft.

**Key Characteristics:**
- Terminal-dark, near-black blue-tinted backgrounds layered by tone, not lines.
- TradingView-native accent semantics (green = up, red = down, blue = action).
- Tabular monospaced numerals for every metric, price, and percentage.
- Crisp Liquid Glass: 20px blur + hairline border + inner highlight, never muddy.
- Quiet by default; color and motion reserved for what's "moving now."

## 2. Colors

A near-black blue-tinted neutral base carrying a tight set of saturated,
semantically-loaded accents borrowed from financial charting convention.

### Primary
- **Terminal Blue** (#2962ff): The single action/identity color — links, primary
  buttons, focus rings, active nav, "View all" affordances. Hover deepens to
  #1e4fd9. This is TradingView's blue; its familiarity is the point.

### Secondary
- **Ticker Green** (#26a69a): Bullish sentiment, gains, positive deltas. Always
  paired with a label or arrow, never color-alone.
- **Ticker Red** (#ef5350): Bearish sentiment, losses, negative deltas.

### Tertiary
- **Alert Amber** (#ff9800): Breaking-news markers, pulse dots, caution.
- **Spectrum Purple** (#7c4dff): Reserved accent for occasional ambient mesh and
  a secondary data hue. Used sparingly — overuse drifts toward the SaaS cliché.

### Neutral
- **Void** (#0b0e17): The page background; the darkest layer.
- **Surface** (#131722): Default card/panel background — the TradingView chart bg.
- **Elevated** (#1e2235): Raised panels, feature cards, popovers.
- **Primary Text** (#d1d4dc): Body and headings — soft white, never pure #fff.
- **Secondary Text** (#787b86): Supporting copy, captions, metadata.
- **Tertiary Text** (#4a4e5e): De-emphasized labels — **contrast-risk**; use only
  on small non-essential text, never for content that must be read.

### Named Rules
**The TradingView Truth Rule.** Green is up, red is down, blue is action —
always. Never repurpose a charting color for decoration.

**The Soft-White Rule.** Text is never pure #ffffff on dark; the brightest text
is #d1d4dc. Pure white on near-black vibrates and reads cheap.

## 3. Typography

**Display / Heading Font:** Space Grotesk (with DM Sans, system-ui fallback)
**Body Font:** DM Sans (with system-ui, -apple-system fallback)
**Numeric / Mono Font:** IBM Plex Mono (with Menlo, Monaco fallback)

> Decision: the brief referenced *Poppins*, but the implemented system uses a
> three-voice pairing chosen for the "premium terminal" register — **Space
> Grotesk** for headings (a tight, slightly technical grotesk with more
> authority than Poppins's rounder humanism), **DM Sans** for body, and **IBM
> Plex Mono** for all numerals. Poppins was rejected as too templated for this
> audience.

**Character:** A tight grotesk display sets the authoritative tone; a clean
neutral sans carries body copy; a true monospace locks every number. The
pairing is "analyst, not influencer": precise, serious, unfussy.

### Hierarchy
- **Display** (Space Grotesk 600, clamp(2.25rem–3.75rem), 1.05, -0.025em): Hero headline only.
- **Headline / Section Title** (Space Grotesk 600, 1.25rem, 1.2): Section headers, marked by a
  36px blue→green gradient underline rule.
- **Title** (600, 1rem): Card titles, article headlines.
- **Body** (400, 0.875rem, 1.6): Descriptions and supporting copy.
- **Label** (600, 0.75rem, 0.04em): Uppercase eyebrows, pill text, metadata.
- **Mono** (500, tabular-nums): Every price, percent, counter, and stat value.

### Named Rules
**The Tabular Number Rule.** Every numeral that can change — price, %, counter,
timestamp — is set in IBM Plex Mono with `font-variant-numeric: tabular-nums` so
digits never jitter as values update.

## 4. Elevation

A hybrid system: depth is built primarily from **tonal layering** (Void →
Surface → Elevated) and reinforced by soft ambient shadows plus a 1px inner-top
highlight that fakes a glass bevel. Shadows are ambient (atmosphere), not hard
drop-shadows. Hover lifts a card 2px and intensifies the shadow + a 1px blue
ring.

### Shadow Vocabulary
- **Card rest** (`0 4px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)`):
  Default panel — ambient floor shadow + glass top highlight.
- **Card hover** (`0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(41,98,255,0.20)`):
  Lifted state; the blue ring signals interactivity.
- **Glow (blue/green/red/amber)** (`0 0 24px rgba(...,0.3)`): Reserved for
  emphasis on live/active elements; never ambient decoration.

### Named Rules
**The Glass-Bevel Rule.** Every elevated surface carries `inset 0 1px 0
rgba(255,255,255,0.05–0.07)` — a hairline top highlight that reads as a lit
glass edge. Without it the dark cards look flat and dead.

## 5. Components

### Buttons
- **Shape:** Gently curved (12px / `rounded-lg`).
- **Primary:** Terminal Blue (#2962ff) fill, white text, 10px 20px padding.
- **Hover / Focus:** Deepen to #1e4fd9; visible focus ring required (a11y).
- **Ghost:** Transparent with secondary text, hover lifts to surface tone.

### Chips / Pills (sentiment + filters)
- **Style:** Fully rounded (`rounded-full`), 12%-opacity tinted background, solid
  accent text, 25%-opacity matching border.
- **Variants:** green (bullish), red (bearish), blue (info), amber (breaking),
  neutral (elevated bg + secondary text). Always carry a label/icon — never
  color alone.

### Cards / Containers
- **Corner Style:** 16px (`rounded-xl`); feature cards 20px (`rounded-2xl`).
- **Background:** Surface (#131722) standard; Elevated (#1e2235) for feature cards.
- **Shadow Strategy:** See Elevation — ambient floor + inner highlight, hover lift.
- **Border:** 1px `--border-medium` (rgba(255,255,255,0.08)); hover shifts toward
  a faint blue.
- **Internal Padding:** 24px desktop.

### Navigation
- **Header:** `header-glass` — 20px backdrop blur + 180% saturate over an 86%
  opaque Void, hairline bottom border. Sticky.
- **States:** Active link in Terminal Blue; hover brightens text toward primary.
- **Mobile:** Slide-in drawer (MobileNav); must remain keyboard-traversable.

### Skeletons (signature for a data product)
- **Style:** Shimmer gradient (3%→7%→3% white) at 1.6s. Every async section must
  show a real skeleton sized to its content — never a bare spinner or "0".

## 6. Do's and Don'ts

### Do:
- **Do** keep green/red/blue locked to their charting meanings (up/down/action).
- **Do** set every changing number in IBM Plex Mono tabular-nums.
- **Do** give every elevated surface the `inset 0 1px 0 rgba(255,255,255,0.05)`
  glass-bevel highlight.
- **Do** show a content-shaped skeleton, then real data or an honest empty state.
- **Do** keep the brightest text at #d1d4dc; reserve #4a4e5e for non-essential labels.
- **Do** honor `prefers-reduced-motion` on every count-up, reveal, and aurora.

### Don't:
- **Don't** ship the "dark SaaS template" look — purple-gradient hero, neon glow,
  floating-blob backgrounds. The ambient mesh stays at ≤6% opacity.
- **Don't** use **decorative gradient text** on headings or metrics (a known AI
  tell). Solid color only on numbers and section titles.
- **Don't** let glassmorphism go muddy — keep blur crisp with a defined hairline
  edge and sufficient contrast, never washed-out fog.
- **Don't** use bounce/elastic easing; real objects decelerate (ease-out-quart/expo).
- **Don't** animate `width`/`height`/`top`/`left` (layout thrash) — transform and
  opacity only.
- **Don't** display a fake "0" or "0%". Misleading data is worse than no data.
