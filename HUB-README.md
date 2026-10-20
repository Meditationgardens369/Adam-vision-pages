# Free Guides hub (`guides.html`)

The one link for every bio. It shows all the free guides on one phone-first page, lets someone
pick one in a few seconds, takes their name and email once, and opens the guide.

Live at `https://meditationgardens369.github.io/Adam-vision-pages/guides.html`

Links to use per platform (the `?s=` tag tells you which platform sent the person):

```
TikTok     https://meditationgardens369.github.io/Adam-vision-pages/guides.html?s=tt
YouTube    https://meditationgardens369.github.io/Adam-vision-pages/guides.html?s=yt
Facebook   https://meditationgardens369.github.io/Adam-vision-pages/guides.html?s=fb
Instagram  https://meditationgardens369.github.io/Adam-vision-pages/guides.html?s=ig
```

Files that belong to the hub:

| File | What it is |
|---|---|
| `guides.html` | The page. Everything is built from the `GUIDES` array at the top of its script. |
| `assets/hub/*.png` | Small logos for the cards (Grok Bots, Claude, Claude Code, Obsidian, ChatGPT). |
| `assets/hub/og.png` | The 1200 x 630 preview image shown when the link is shared. |
| `assets/hub/qr.svg` | QR code pointing at the long URL, shown at the bottom of the page. |

## How the email works

One email unlocks every guide. When someone taps "Open the ... guide" and has not signed up yet,
a small sheet asks for first name, email and consent. The row goes to `guide_signups` with slug
`guides-hub`. Then the page sets the same unlock keys the guides use (`gb-unlocked`, `sb-unlocked`,
`bw-unlocked`, `ce-unlocked`, all `"1"`, plus `hub-unlocked`) and opens the guide. The guides were
not changed: they just see their own key and skip their gate.

If storage is blocked (private mode, some in-app browsers), the guide shows its own gate. Nobody
gets stuck. If the signup request fails, the page still unlocks and opens the guide, same rule as
the guides themselves.

## How to add a guide

1. Put the guide page and its questionnaire in this repo the usual way (gate, tracking, slug).
2. Drop its logo in `assets/hub/` as a small PNG (about 160 to 200 px, transparent or white).
3. Add one object to the `GUIDES` array in `guides.html`. Copy an existing one. Fields:
   - `id` short word used in tracking labels and CSS (`grok`, `brain`, `browser`, `edit`).
   - `keyword` the Instagram comment word.
   - `href` the guide file, `storage` the guide's own unlock key.
   - `isNew: true` shows a "New" ribbon on the card.
   - `title`, `learn`, three `bullets`, `time` (keep it honest: add up the guide's own step timings).
   - `logos` as `[file, alt]`, add `true` as a third item for a wide wordmark.
   - `need`, `steps` (four, each `[title, minutes]`), `result`, `limit` for the walk-through.
4. Give the new `id` a colour: add `--<id>` and `--<id>-soft` to both the light and dark token
   blocks, and a `.card.<id>{--g:...;--g-soft:...}` line. Check contrast on the button text.
5. Add a small preview scene to `PREVIEWS` keyed by `id` (optional, the card works without it).
6. If the picker should point at it, add or change a row in `PICKS`.
7. Update the `og:description` meta line and, if you like, re-render `assets/hub/og.png`.
8. Open `guides.html` on a phone, tap through, then commit and push.

## How to read the stats

Everything is in Supabase project `mfyykvrwukchowlxywnz`. The pages can only insert; reading needs
a key with read access (the funnel dashboard asks for it and keeps it in your browser).

`page_events`, slug `guides-hub-page`:

| event | meaning | label |
|---|---|---|
| `view` | page opened | |
| `jump` | tapped a guide chip in the hero | guide id |
| `card_view` | a card scrolled into view (once per card per visit) | guide id |
| `card_click` | tapped "Open the ... guide" | guide id, with `:picker` or `:path` if it came from there |
| `picker_answer` | answered "what eats most of your week" | `option>guide` |
| `tab` | switched the walk-through | guide id |
| `gate_view` | the email sheet opened | guide id |
| `signup` / `signup_error` | the signup row was sent / failed | guide id |
| `cta_click` | YouTube or Substack link | `youtube` / `substack` |
| `qr_open` | opened the QR code | |

The platform tag is in `path`, for example `/Adam-vision-pages/guides.html?s=tt`. So "views by
platform" is: count `view` rows for this slug, grouped by the `s` value inside `path`.

`guide_signups`, slug `guides-hub`: name, email, consent, referrer, time.

Useful questions to ask Claude (it runs read-only queries for you):

- Last 7 days: views, card clicks and signups by platform and by guide.
- Which picker answer is most common, and does it lead to a click.
- How many people who opened the sheet actually signed up.

## How to roll back

The hub is one file plus one folder. To take it offline, delete `guides.html` (or rename it) and
push. The guides keep working on their own URLs and gates. To go back to an earlier version:

```bash
git log --oneline -- guides.html
git checkout <commit> -- guides.html assets/hub
git commit -m "Roll back the guides hub" && git push
```

Pages rebuilds in about a minute.

## The guides' shared look (added 20 Oct 2026)

Every public guide loads two shared files after its own styles:

- `assets/guide-skin.css`: the depth skin (cards with shadow and a soft accent gradient, numbered
  step badges, logo tiles on "What you need", the gradient closing block).
- `assets/guide-skin.js`: adds the top bar with the link back to the hub, the logo tiles (matched on
  each card's title) and the footer line. `<body data-guide="GROK">` sets the keyword in the bar.

Each guide also has a "Watch what happens" scene right under the hero, visible before the email
gate. It is plain HTML, CSS and a small script at the end of the page; it plays once when scrolled
into view and again on the button, and logs `scene_play` to `page_events`. Nothing in a scene is a
real person or a real number.

The four question pages load `assets/intake-guides.css` after `assets/intake.css`, which gives them
the same fonts and tokens as the guides. The prospect pages do not load it and are unchanged.
