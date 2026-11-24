# Portfolio — Tarunkumar, AI Engineer

Static site. No build step, no dependencies — plain HTML, CSS and JS, so it deploys straight to GitHub Pages.

```
index.html        all content (text lives here — edit it directly)
css/style.css     design tokens at the top of the file
js/main.js        nav, reveals, counters, typed line, node canvas, form
assets/           resume.pdf, profile.svg (placeholder), profile.jpg (add yours)
```

## Run locally

```bash
python -m http.server 5500
```

Then open http://localhost:5500.

## Structure

The site leads with **featured case studies** rather than a project list — the work carries the pitch.

1. **Hero** — engineering headline, animated node network, typed role line, tilted photo card
2. **Impact band** — 400+ / 35% / 40% / 80%, each with the method line under it
3. **Featured work** — three case studies, each with problem, approach, an inline SVG architecture diagram, and what shipped. Compass and the MCP toolkit each end in a deep dive: a stack of collapsed problem rows (native `<details>`, so keyboard and screen readers work without JS) that open to show the root cause and the fix.
   - Compass — real-time healthcare voice agent (production)
   - Amelia MCP Toolkit — internal product, ~80% team adoption
   - BotLattice — full-stack RAG SDK (open source)
4. **Also built** — SupportDesk, Voice Tutor, SkillSync, supplier onboarding agents
5. **Experience** — timeline, SoundHound AI / Redwoods.ai / ITMTB
6. **About** — bio plus a four-row stack summary (agents, voice, retrieval, platform)
7. **Contact** — Web3Forms-backed form, plus footer CTA

## Still to fill in

| Where | What |
|---|---|
| `assets/profile.jpg` | Your photo (portrait, 3:4). Until it exists, the placeholder illustration shows. |

All project and social links are now live — no `href="#"` placeholders remain.

`assets/resume.pdf` is your resume — replace the file whenever you update it; the RESUME button needs no change.

## Architecture diagrams

The three diagrams are hand-written inline SVG in `index.html` — no library, no image files, and they re-colour with the theme tokens. Each has a `<title>` and `<desc>` for screen readers and pans horizontally on narrow screens.

To edit one, find its `<figure class="diagram">` block. Boxes live in `.dg-box`, connectors in `.dg-line`, labels in `.dg-text`, all styled from CSS rather than inline attributes.

## Contact form — Web3Forms

**Live and tested** — a real submission was delivered end to end. The form posts with `fetch`, so the page never navigates away; success and error both show inline under the button.

The access key sits in `index.html`:

```html
<input type="hidden" name="access_key" id="accessKey" value="…" />
```

To point messages at a different inbox, get a new key at [web3forms.com](https://web3forms.com) and swap that value. If the value is ever reset to something starting with `YOUR_`, the form detects it and falls back to opening the visitor's mail app.

**What is already handled**

- `subject` defaults to `Portfolio enquiry from <name>` when left blank
- A hidden `botcheck` honeypot — bots fill it, the submit is silently dropped
- Button disables and reads "Sending…" during the request
- On success the form clears; on failure the typed message is kept and your email is shown as a fallback

**The key is public** — that is how Web3Forms works. It only allows submitting to your form, never reading messages.

## Accessibility

- Skip-to-content link, visible focus rings on every interactive element
- Drawer menu closes on `Escape` and returns focus to the toggle
- Diagrams are keyboard-scrollable and labelled
- Everything animated is disabled under `prefers-reduced-motion`

## Theme

```css
--bg:#f2f0ea;      /* page background      */
--ink:#0d0d0d;     /* text / dark sections */
--accent:#d8502f;  /* highlight            */
```

Change `--accent` alone to reskin the site. The typed hero lines are the `ROLES` array in `js/main.js`.

## Deploy to GitHub Pages

```bash
git add . && git commit -m "Case studies and diagrams"
git push
```

In the repo: Settings → Pages → Source: `main` / root. Site lands at `https://<you>.github.io/<repo>/`.

Pages caches hard — hard-refresh (Ctrl+Shift+R) after a deploy before assuming something is broken.

`.claude/` holds the local dev-server config and is git-ignored.
