# Prospect pages

One page per person, each with its own questions. Every answer goes straight into Supabase,
labelled with that person's name, and you read them in `Prospect_Dashboard.html` one folder up,
or just ask Claude.

| File | Who | Questions |
|---|---|---|
| `ola.html` | Ola, holiday rentals, Armação de Pêra | 11, one typed |
| `pedro.html` | Pedro, estate agent, team of three in a 70 to 80 person agency | 12, three typed |
| `helena.html` | Helena, dental clinic owner | 12, one typed |
| `lara.html` | Lara, massage and Bowen therapy plus Zigzag kids' parties and festivals | 15, two typed |
| `vision.html` | Ola's twelve month vision, for screen-sharing on the Zoom call | |
| `index.html` | A neutral front door. Nobody should need it. | |
| `assets/` | The shared engine and styles. Every page above uses them. | |

## Publishing a change

This folder is the repo. It is wired to
[Meditationgardens369/Adam-vision-pages](https://github.com/Meditationgardens369/Adam-vision-pages),
and GitHub Pages serves it at https://meditationgardens369.github.io/Adam-vision-pages/

```bash
git add . && git commit -m "Add Lara's page" && git push
```

Pages rebuilds in about a minute. There is nothing to upload by hand any more.

## The links to send

```
https://meditationgardens369.github.io/Adam-vision-pages/ola.html
https://meditationgardens369.github.io/Adam-vision-pages/pedro.html
https://meditationgardens369.github.io/Adam-vision-pages/helena.html
https://meditationgardens369.github.io/Adam-vision-pages/lara.html
```

Each page labels its own answers, so there is nothing to add to the link and no way for one
person's answers to land under someone else's name.

For testing, open a page and answer it yourself, then ask Claude to delete the test entry. Or
tell Claude before you test and it will clear it afterwards.

## Adding someone new

1. Copy the page closest to their business, for example `pedro.html` to `maria.html`
2. Change `slug`, `name` and `business` at the top of the script
3. Rewrite the questions. The types are `one` (tap one, moves on by itself), `many` (tap
   several), `number` (a plus and minus counter), and `text` (typed answer)
4. `headline` names the typed answer you want to see first. It goes on the thank-you screen
   and at the top of the dashboard card.

The dashboard reads answers through rules keyed on the exact wording of each option. If you
reword an option, the matching rule in `Prospect_Dashboard.html` needs the same wording or it
stops firing. Ask Claude to check them. There is a script for it.

## What is safe to have in here

This is a public repo, so assume anyone can read these files. What is in them: first names,
a one-line description of each business, and the questions. No answers are ever stored here.

The key in `assets/intake.js` is a Supabase **publishable** key, designed to sit in public code.
The table it writes to has row level security with a single insert policy, so that key can add
a row and cannot read a single one back. That is verified, not assumed: reading with it returns
an empty list even when rows exist.

**Never put the service role key or any `sb_secret_` key in this folder.** The dashboard asks for
it when you open it and keeps it in your own browser, which is why the dashboard file is also
safe to commit if you want to.

Every page carries `noindex` and there is a `robots.txt`, so search engines leave them alone.

## If a submission fails

Each page falls back to a WhatsApp button that sends the same answers as a message. On a
computer that opens WhatsApp Web, which may ask for a QR scan, so it is the backup rather than
the main route.

## The table

`public.intake_responses` in the Supabase project `mfyykvrwukchowlxywnz`.

| Column | Notes |
|---|---|
| `prospect_slug` | set by each page, indexed |
| `prospect_name`, `business` | set by each page |
| `answers` | jsonb, one key per question: the question text, the answer, its type, its position `n`, and any follow-up detail or unit |
| `worst_hour` | the headline typed answer, pulled out on its own |
| `source` | `questions` from these pages, `web` from the vision page |
| `properties_target` | only the vision page's slider uses it |
| `created_at` | indexed descending |

Answers keep the question text alongside the answer on purpose. When you reword a question next
month, old responses still make sense.
