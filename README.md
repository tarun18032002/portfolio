# Portfolio — Tarunkumar, AI Engineer

Static portfolio site. No build step, no dependencies. Plain HTML + CSS + JS, so it drops straight onto GitHub Pages.

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

## Sections

1. **Hero** — animated node network, live status dot, typed role line, tilted photo card
2. **Impact band** — 400+ / 35% / 40% / 80%, counting up on scroll
3. **Stack marquee** — the tools you ship with
4. **About** — bio plus skill chips grouped by category
5. **What I build** — agentic systems, real-time voice, RAG, MCP tooling, each with its own animated visual
6. **Experience** — timeline with sticky dates: SoundHound AI, Redwoods.ai, ITMTB
7. **Projects** — BotLattice, AI Voice Tutor, SkillSync
8. **Education & certifications**
9. **Contact** — form with mailto fallback, plus footer CTA

## Still to fill in

| Where | What |
|---|---|
| `assets/profile.jpg` | Your photo (portrait, 3:4). Until it exists, the placeholder illustration shows. |
| Projects | Three `href="#"` links in the `#work` section — point them at your repos and the SkillSync live demo. |
| Socials | Two `href="#"` links in `#contact` — LinkedIn and GitHub. |

`assets/resume.pdf` is already your resume — replace the file whenever you update it; the RESUME button needs no change.

## Contact form — Web3Forms

**Live and tested** — a real submission was delivered end to end. The form posts to Web3Forms with `fetch`, so the page never navigates away; success and error both show inline under the button.

The access key sits in `index.html`:

```html
<input type="hidden" name="access_key" id="accessKey" value="…" />
```

To point messages at a different inbox, get a new key at [web3forms.com](https://web3forms.com) and swap that value. If the value is ever reset to something starting with `YOUR_`, the form detects it and falls back to opening the visitor's mail app instead.

**What is already handled**

- `subject` defaults to `Portfolio enquiry from <name>` when the visitor leaves it blank
- A hidden `botcheck` honeypot — bots fill it, the submit is silently dropped, nothing is sent
- Button disables and reads "Sending…" during the request
- On success the form clears; on failure the typed message is kept and your email address is shown as a fallback

**The key is public** — anyone can read it in view-source. That is how Web3Forms works: the key only allows submitting to your form, not reading your messages. Spam filtering plus the honeypot covers the rest; add hCaptcha from the Web3Forms dashboard if spam ever becomes a problem.

Switching to Formspree instead is a two-line change: set `action="https://formspree.io/f/XXXXXXX"` and delete the `access_key` input (the `fetch` handler and inline states work unchanged).

## Theme

Colours and spacing are CSS custom properties at the top of `css/style.css`:

```css
--bg:#f2f0ea;      /* page background      */
--ink:#0d0d0d;     /* text / dark sections */
--accent:#d8502f;  /* highlight            */
```

Change `--accent` alone to reskin the site.

The typed hero lines live in `js/main.js` as the `ROLES` array — edit them there.

## Accessibility & performance

- Everything animated is disabled under `prefers-reduced-motion`.
- No frameworks, no bundler; only Google Fonts loads from the network.

## Deploy to GitHub Pages

```bash
git init && git add . && git commit -m "portfolio"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

Then in the repo: Settings → Pages → Source: `main` / root. Site lands at `https://<you>.github.io/<repo>/`.
