# Notes for Claude working on this site

## Pretor moved out

The Pretor landing page used to live in `pretor/` and was served both at
`/pretor/` here and at pretor.ar. It now has its own repo,
[pretor-website](https://github.com/fedesapuppo/pretor-website), deployed
to pretor.ar. What is left at `pretor/index.html` is only a redirect stub
so old inbound links keep working. Do not edit the page here.

## Blog post drop cap (removed)

Blog posts previously used a `::first-letter` drop cap on the first
paragraph, styled in `styles.css` under `.post-content > p:first-child`.

We removed it after it kept misaligning: the capital letter would sit too
low/high relative to the first text line, create awkward whitespace, or
(with `initial-letter`) render a solid colored block with the text
flowing inside the glyph. We tried `line-height` tweaks, `initial-letter`,
and float-only variants. Each fix broke a different browser/font combo.

Do NOT reintroduce a pseudo-element drop cap without:

1. A `<span class="drop-cap">X</span>` wrapper in the HTML (not
   `::first-letter`) so the letter has predictable layout.
2. Visual verification on both blog posts in the actual browser. The
   first word differs per post ("The", "My", "If") and pseudo-element
   drop caps render inconsistently across glyphs.
3. A test on mobile width as well, where the content column is narrow
   and drop caps break most dramatically.

The current first-paragraph style just bumps font-size and darkens the
color slightly. It reads as a lede without the positioning nightmare.

## Blog card heights

The two-column grid at `.blog-cards` uses `align-items: stretch`, so cards
will match height only if their content is roughly the same length. If a
new card's excerpt is much longer than the others, the grid stretches to
the tallest one and the shorter card looks underfilled. Keep new excerpts
to roughly the same length as existing ones (about 3-4 lines of wrapped
text).
