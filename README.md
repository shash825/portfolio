# Shash Singh — Personal Portfolio

A one-page static portfolio site. Plain HTML, CSS, and a tiny bit of vanilla JS —
no framework, no build step, no dependencies. Edit the files directly and reload.

```
portfolio/
├── index.html      ← all content lives here
├── styles.css      ← all styling
├── script.js       ← scroll fade-ins + footer year (optional; site works without it)
├── resume.pdf      ← Shashwat_Singh-_Resume.pdf
├── .nojekyll       ← tells GitHub Pages to serve files as-is
└── README.md
```

---

## Content status

Everything below is filled in with real content **except** the items marked ⚠️.
Search `index.html` for `TODO` to jump to the one open item.

| Section | Status |
|---|---|
| Name, tagline, summary | ✅ Shash Singh |
| About bio | ✅ 3 paragraphs |
| MLB Picks | ✅ description + stack + GitHub link |
| Restaurant Chat Widget | ✅ description + stack + GitHub link |
| Crypto Newsletter Bot | ⚠️ **description written from the repo name — confirm or replace it** |
| Skills | ✅ 10 tags |
| Resume PDF | ✅ real resume in place |
| Email / GitHub / LinkedIn | ✅ ss44@usf.edu, shash825, in/shash28 |
| Live demo links | ⚠️ **none added — no deployed URLs yet** |
| `CNAME` + DNS | ⚠️ **not set up yet (last step)** |

### Adding a live demo link later

Each project card has a commented-out demo link showing the exact markup. Uncomment it
and drop in the URL:

```html
<a href="https://your-demo-url.com">Live Demo<span class="sr-only"> — Project Name</span></a>
```

The `sr-only` span is there so screen readers announce *which* project the link belongs
to — keep it and update the name to match the card.

### Adding a fourth project

Copy any `<li class="card">` block inside `.project-grid`, change the title, description,
tags, and links. The grid reflows on its own; no CSS changes needed.

### Updating your resume

Overwrite `resume.pdf` with the new file. The download button already renames it to
`Shashwat-Singh-Resume.pdf` on the visitor's machine, so the file in the repo can keep
the short name.

> Note: the linked PDF includes your phone number, and a public site gets crawled. If you
> ever want that off the public web, swap in a phone-free copy at `resume.pdf` and keep the
> full version for direct applications.

---

## Local preview

Just open `index.html` in a browser — double-click it, or:

```bash
start index.html
```

Everything is relative-path, so the `file://` protocol works fine. If you'd rather serve it
over HTTP (closer to production behavior):

```bash
python -m http.server 8000
```

Then visit <http://localhost:8000>. Ctrl+C to stop.

---

## Deploying to GitHub Pages

**This repo publishes from the repository root on the `main` branch** — the static files
are at the top level, so there is nothing to build and no `/docs` folder to configure.

### 1. Push the code

```bash
git init
git add .
git commit -m "Initial portfolio site"
git branch -M main
git remote add origin https://github.com/shash825/shash825.github.io.git
git push -u origin main
```

> Naming the repo `shash825.github.io` gives you `https://shash825.github.io` as the URL.
> Any other name gives you `https://shash825.github.io/REPONAME/` instead. Either works with
> a custom domain — the custom domain serves from the site root regardless.

### 2. Enable GitHub Pages

1. Go to the repo on GitHub → **Settings** → **Pages** (left sidebar).
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Set **Branch** to `main` and the folder to **`/ (root)`**. Click **Save**.
4. Wait ~1 minute, then reload the Pages settings page — it will show your live URL.

### 3. Add your custom domain

In the same **Settings → Pages** screen, under **Custom domain**, type your domain
(e.g. `example.com` or `www.example.com`) and click **Save**. GitHub commits a `CNAME`
file to the repo root for you.

If you'd rather add it by hand, create a file named exactly `CNAME` (no extension, all caps)
in the repo root containing one line — just the bare domain, no `https://`, no trailing slash:

```
example.com
```

Then `git pull` so your local copy matches whatever GitHub wrote.

### 4. DNS records at your registrar

Which records you need depends on the kind of domain you're using.

**Apex domain (`example.com`)** — add all four A records, same name, same TTL:

| Type | Name / Host | Value             |
|------|-------------|-------------------|
| A    | `@`         | `185.199.108.153` |
| A    | `@`         | `185.199.109.153` |
| A    | `@`         | `185.199.110.153` |
| A    | `@`         | `185.199.111.153` |

Optionally add the IPv6 equivalents too (recommended — some networks are IPv6-only):

| Type | Name / Host | Value                  |
|------|-------------|------------------------|
| AAAA | `@`         | `2606:50c0:8000::153`  |
| AAAA | `@`         | `2606:50c0:8001::153`  |
| AAAA | `@`         | `2606:50c0:8002::153`  |
| AAAA | `@`         | `2606:50c0:8003::153`  |

If your registrar supports `ALIAS` or `ANAME` records, you can use a single one of those
pointing at `shash825.github.io` instead of the A records.

**Subdomain (`www.example.com`, `portfolio.example.com`)** — one CNAME record:

| Type  | Name / Host | Value                  |
|-------|-------------|------------------------|
| CNAME | `www`       | `shash825.github.io`   |

Note the trailing dot some registrars require: `shash825.github.io.`

**Recommended setup for an apex domain:** add the four A records for `example.com` **and**
a `www` CNAME pointing at `shash825.github.io`. Set the custom domain in GitHub to the
apex, and GitHub will redirect `www` → apex automatically.

Delete any conflicting existing records first — a parked-page A record, a registrar's
"forwarding" record, or an old CNAME on the same host will break this.

### 5. Verify DNS and enable HTTPS

DNS propagation usually takes 10–60 minutes (can take up to 24 hours). Check it with:

```bash
dig example.com +noall +answer -t A
```

You should see the four `185.199.10x.153` addresses. For a subdomain:

```bash
dig www.example.com +noall +answer -t CNAME
```

Once DNS resolves correctly:

1. Go back to **Settings → Pages**. The custom domain field should show a green
   "DNS check successful" message.
2. GitHub provisions a Let's Encrypt certificate automatically — this takes a few more
   minutes after the DNS check passes.
3. Tick **Enforce HTTPS**. If the checkbox is greyed out, the certificate isn't ready yet;
   wait and reload. If it's still greyed out after an hour, remove the custom domain, save,
   re-add it, and save again — that re-triggers provisioning.
4. Confirm `https://example.com` loads with a valid padlock, and that `http://` redirects to it.

---

## Alternative: Netlify

If you'd rather not use GitHub Pages, Netlify hosts this exact folder with no changes:

- **Drag and drop:** log in at [app.netlify.com](https://app.netlify.com), drag the project
  folder onto the deploy area. It's live in seconds on a `*.netlify.app` URL.
- **Connected to GitHub:** *Add new site → Import an existing project → GitHub*, pick the
  repo. Leave the build command **empty** and set the publish directory to `.` (the root).
  Every push to `main` redeploys automatically.
- **Custom domain:** *Site configuration → Domain management → Add a domain*. Netlify then
  either walks you through pointing your registrar's nameservers at Netlify DNS (easiest —
  they handle records and HTTPS), or gives you the A/CNAME records to add at your existing
  registrar. HTTPS via Let's Encrypt is automatic once DNS resolves.

Don't point your domain at GitHub Pages and Netlify at the same time — pick one.

---

## Notes on how it's built

- **Accessibility:** semantic landmarks (`header`/`main`/`footer`/`section`), one `<h1>`,
  a skip link, visible focus rings, `aria-label`s on the icon lists, and screen-reader-only
  project names on the repeated "View on GitHub" links so they aren't ambiguous out of context.
- **Contrast:** all text/background pairs meet WCAG AA (body text is ~6.4:1, headings ~16:1,
  accent links ~7.9:1).
- **Motion:** the scroll fade-in is skipped entirely for anyone with
  `prefers-reduced-motion: reduce`, and sections stay visible if JS is disabled.
- **Colors** live as CSS custom properties at the top of `styles.css` — change `--accent`
  and `--accent-dk` to re-theme the whole page. If you pick a lighter accent, re-check
  contrast against the background.
