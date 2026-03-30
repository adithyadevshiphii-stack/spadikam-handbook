# Spadikam Handbook — Design Brainstorm

<response>
<text>
## Idea 1 — "Classified Operations Dossier"

**Design Movement:** Military Intelligence / Tactical Ops Aesthetic
**Core Principles:**
1. Monochromatic dark base with high-contrast accent splashes — feels like a classified briefing document
2. Asymmetric left-sidebar navigation with section markers, like a field manual
3. Rule cards use a "redacted file" motif — bordered, stamped, with status badges
4. Typography hierarchy mimics military reports: condensed headers, clean body text

**Color Philosophy:** Deep charcoal (#0D0F14) base, near-black panels, with electric blue (#1E90FF) for City/STCF, blood red (#C0392B) for Outlands/Gangs, emerald green (#27AE60) for SMU, amber (#F39C12) for warnings, and muted slate-purple (#6C5CE7) for lore/definitions.

**Layout Paradigm:** Fixed left sidebar (collapsible on mobile) with scrollable main content area. Section headers use a horizontal rule with a colored left-border accent. Rule cards are stacked in a two-column grid on desktop.

**Signature Elements:**
- Hexagonal section badges with faction colors
- Thin colored left-border on rule cards (color-coded by type)
- "CLASSIFIED" / "RESTRICTED" watermark-style labels on sensitive sections

**Interaction Philosophy:** Accordion-style expandable rule blocks. Sidebar highlights active section on scroll. Hover states reveal subtle glow effects.

**Animation:** Smooth fade-in for section content on scroll. Sidebar active indicator slides vertically. Card expand/collapse with spring physics.

**Typography System:** "Rajdhani" (condensed, military feel) for headers + "IBM Plex Mono" for rule IDs and codes + "Source Sans Pro" for body text.
</text>
<probability>0.08</probability>
</response>

<response>
<text>
## Idea 2 — "Neon Noir Ops Terminal" ← CHOSEN

**Design Movement:** Cyberpunk Noir / Dark Ops Dashboard
**Core Principles:**
1. Deep void-black background with subtle scanline texture — immersive, game-admin feel
2. Neon accent colors used sparingly as borders, glows, and highlights — not as fills
3. Monospace + display font pairing creates a "live ops terminal" atmosphere
4. Content organized in card-based panels with colored left-border faction coding

**Color Philosophy:** True near-black (#080B10) canvas. Faction colors as neon accents: City Blue (#3B82F6), Outlands Red (#EF4444), SMU Green (#22C55E), Warning Amber (#F59E0B), Lore Purple (#8B5CF6). White text at 90% opacity for readability. Muted grey (#94A3B8) for secondary text.

**Layout Paradigm:** Persistent left sidebar (280px) with icon + label nav items. Main content scrolls independently. Section anchors with smooth scroll. Mobile: sidebar becomes a slide-in drawer triggered by hamburger.

**Signature Elements:**
- Colored left-border accent bars on all rule cards (faction-coded)
- Glowing dot indicators on active nav items
- Section dividers with faction color gradient lines

**Interaction Philosophy:** Expandable accordion rule blocks with smooth height animation. Active section highlighted in sidebar via scroll spy. Quick-reference tables with hover row highlights.

**Animation:** Page entrance fade-up. Sidebar active state transitions. Card hover: subtle border glow intensifies. Accordion: smooth height transition with icon rotation.

**Typography System:** "Orbitron" for main title/logo + "Space Grotesk" for section headers + "JetBrains Mono" for rule codes/IDs + "Inter" for body text (exception here for readability).
</text>
<probability>0.09</probability>
</response>

<response>
<text>
## Idea 3 — "Faction War Room"

**Design Movement:** Tactical Command Center / Intelligence Briefing
**Core Principles:**
1. Split-panel design reflecting the City vs Outlands duality
2. Dark slate background with faction-colored zone indicators
3. Rule content presented as "intelligence reports" with structured data tables
4. Navigation uses a top command bar + left section tree

**Color Philosophy:** Dark navy (#0A0E1A) base. City panels have blue-tinted backgrounds; Outlands panels have red-tinted backgrounds. Neutral sections use dark grey. Accent colors match faction identities.

**Layout Paradigm:** Top navigation bar for major sections + left collapsible tree for subsections. Main content area uses full-width panels with alternating faction-colored left borders.

**Signature Elements:**
- Zone indicator badges (CITY / OUTLANDS) on every relevant rule
- Comparison tables for City vs Outlands rules
- "War Room" grid overlay texture on hero section

**Interaction Philosophy:** Tab-based navigation for City vs Outlands comparisons. Expandable rule trees. Sticky section headers.

**Animation:** Slide-in from left for sidebar. Fade transitions between sections. Tab switch animations.

**Typography System:** "Bebas Neue" for section titles + "Roboto Condensed" for subheadings + "Roboto" for body.
</text>
<probability>0.07</probability>
</response>

---

## Selected Design: Idea 2 — "Neon Noir Ops Terminal"

This approach best captures the "official RP operations handbook for players and staff" feel — dark, immersive, faction-coded, with a game-admin dashboard atmosphere. The persistent sidebar with scroll-spy navigation, neon accent borders, and expandable rule cards create exactly the tactical premium experience requested.
