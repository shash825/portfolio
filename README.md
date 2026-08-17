# Shash Singh — Personal Portfolio

A one-page static portfolio site. Plain HTML, CSS, and a tiny bit of vanilla JS —
no framework, no build step, no dependencies. Edit the files directly and reload.

**Live:** https://portfolio-nine-woad-54.vercel.app
**Repo:** https://github.com/shash825/portfolio

```
portfolio/
├── index.html      ← all content lives here
├── styles.css      ← all styling
├── script.js       ← scroll fade-ins + footer year (optional; site works without it)
├── resume.pdf      ← Shashwat_Singh-_Resume.pdf
├── .nojekyll       ← only matters if you switch to GitHub Pages
└── README.md
```

---

## Content status

| Section | Status |
|---|---|
| Name, tagline, summary | ✅ Shash Singh |
| About bio | ✅ 3 paragraphs |
| MLB Picks | ✅ description + stack + GitHub + live demo |
| Restaurant Chat Widget | ✅ description + stack + GitHub + live demo |
| Crypto Desk | ✅ description + stack + GitHub + live demo |
| Skills | ✅ 10 tags |
| Resume PDF | ✅ real resume in place |
| Email / GitHub / LinkedIn | ✅ ss44@usf.edu, shash825, in/shash28 |
| Custom domain | ⚠️ **not set up yet — the last step** |

### Editing content

Everything lives in `index.html`. To add a project, copy any `<li class="card">` block
inside `.project-grid` and change the title, description, tags, and links — the grid
reflows on its own, no CSS changes needed.

Demo links use this shape:

```html
<a href="https://your-demo-url.com">Live Demo<span class="sr-only"> — Project Name</span></a>
```

The `sr-only` span is there so screen readers announce *which* project the link belongs
to — four identical "Live Demo" links are useless in a screen reader's link list. Keep it
and update the name to match the card.

### Updating your resume

Overwrite `resume.pdf` with the new file, then commit and push. The download button already
renames it to `Shashwat-Singh-Resume.pdf` on the visitor's machine, so the file in the repo
can keep the short name.

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

## Deployment (current setup)

The site is hosted on **Vercel**, connected to the GitHub repo. There is no build step —
Vercel serves the files as-is.

**Every push to `main` redeploys automatically:**

```bash
git add -A
git commit -m "Update project descriptions"
git push
```

Give it ~20 seconds, then reload the live URL.

To deploy manually without a push (rarely needed):

```bash
vercel --prod
```

Check what's deployed:

```bash
vercel project ls
```

---

## Adding your custom domain (last step)

Once you have the domain, this is the sequence:

1. **Vercel dashboard → your `portfolio` project → Settings → Domains → Add.**
   Enter the domain (e.g. `example.com`).
2. **Vercel then shows you the exact DNS records to add** — an `A` record for the apex
   domain, or a `CNAME` for a subdomain like `www`. Use the values Vercel displays rather
   than any you find in a blog post; the target IPs have changed over the years and the
   dashboard is the source of truth for your project.
3. **Add those records at your registrar**, deleting any conflicting existing records first
   — a parked-page A record or a registrar "forwarding" record on the same host will break it.
4. **Wait for propagation** (usually 10–60 minutes, occasionally up to 24 hours). Check with:

   ```bash
   dig example.com +noall +answer
   ```

5. **HTTPS is automatic.** Vercel issues a Let's Encrypt certificate as soon as DNS
   resolves — no button to click. Confirm `https://example.com` loads with a valid padlock.

**Apex vs. www:** add both (`example.com` and `www.example.com`) and set one as primary in
Vercel. It redirects the other automatically, so neither version 404s.

---

## Alternative: GitHub Pages

The repo is already structured for Pages if you ever want to switch hosts — static files at
the root, plus a `.nojekyll` file so Pages serves them as-is.

1. Repo → **Settings** → **Pages**.
2. **Source:** Deploy from a branch. **Branch:** `main`, folder **`/ (root)`**. Save.
3. Live at `https://shash825.github.io/portfolio/` in about a minute.

For a custom domain on Pages, the DNS records are fixed and publicly documented:

**Apex domain (`example.com`)** — all four A records, same name:

| Type | Name / Host | Value             |
|------|-------------|-------------------|
| A    | `@`         | `185.199.108.153` |
| A    | `@`         | `185.199.109.153` |
| A    | `@`         | `185.199.110.153` |
| A    | `@`         | `185.199.111.153` |

Optionally the IPv6 equivalents (`2606:50c0:8000::153` through `...8003::153`).

**Subdomain (`www.example.com`)** — one CNAME record pointing at `shash825.github.io`.

Then set the domain under Settings → Pages → Custom domain (which writes a `CNAME` file to
the repo), wait for the DNS check to go green, and tick **Enforce HTTPS**.

Don't point the domain at Vercel and GitHub Pages at the same time — pick one.

---

## Notes on how it's built

- **Accessibility:** semantic landmarks (`header`/`main`/`footer`/`section`), one `<h1>`,
  a skip link, visible focus rings, `aria-label`s on the icon lists, and screen-reader-only
  project names on the repeated GitHub/demo links so they aren't ambiguous out of context.
- **Contrast:** all text/background pairs meet WCAG AA (body text ~6.4:1, headings ~16:1,
  accent links ~7.9:1).
- **Motion:** the scroll fade-in is skipped entirely for anyone with
  `prefers-reduced-motion: reduce`, and sections stay visible if JS is disabled.
- **Colors** live as CSS custom properties at the top of `styles.css` — change `--accent`
  and `--accent-dk` to re-theme the whole page. If you pick a lighter accent, re-check
  contrast against the background.
