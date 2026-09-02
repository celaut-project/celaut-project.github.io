# scripts/

Maintenance tooling for the site's seventeen dictionaries. None of it
ships — nothing here is imported by `src/`.

The site has one copy of every component and seventeen copies of every
string. Components index into translated arrays positionally, so a
locale that is one array element short doesn't fall back to English, it
renders nothing. These scripts exist so that can't happen quietly.

## `check-i18n-keys.mjs` — the gate

```
node scripts/check-i18n-keys.mjs            # every locale
node scripts/check-i18n-keys.mjs de id      # just these
node scripts/check-i18n-keys.mjs --verbose  # list every problem key
```

Structural diff of every dictionary against `en.js`, which is the source
of truth. Reports missing keys, extra keys, array-length mismatches, and
strings left byte-identical to English. Exits non-zero on the first
three. **Run this after any edit to `en.js`.**

A small number of `identical-to-en` hits are correct and expected —
`viz.home.zoom.source` is `celaut.proto · message Service`, a schema
reference rather than prose, and the `viz.home.nets*` entries are
network identifiers (`bitcoin-mainnet`, `api.weather.gov`). Those never
fail the run.

## `migrate-locales.mjs` — restructuring `en.js`

```
node scripts/migrate-locales.mjs            # every locale
node scripts/migrate-locales.mjs es ar      # just these
```

For when a structural change to `en.js` has to land identically in
sixteen other files: a section renamed, a block moved to a different
page, a key set reshaped. It walks `en.js` as the shape and resolves
each leaf in order:

1. `scripts/locale-new/<code>.json` — new or rewritten strings, written
   by hand for the migration, keyed by the same dotted paths
   `check-i18n-keys.mjs` reports.
2. The `MOVES` table at the top of the script — a key whose sentence did
   not change, only its path. The existing translation is carried over
   from the locale's old dictionary instead of being retranslated.
3. The same path in the old dictionary — the ordinary untouched string.
4. English, **reported loudly**, because that is a hole in the
   translation rather than a result.

Each dictionary's hand-written header comment is preserved. The script
exits non-zero if any locale fell through to English, so "0 fell back"
across the board is the pass condition before committing.

`scripts/locale-new/` is kept as the record of what each migration
actually said in each language.

## `build-locale.mjs` — adding a language

```
node scripts/build-locale.mjs de scripts/locale-data/de.json
```

Generates a whole new dictionary from `en.js`'s structure plus a flat
map of translations, so a new language starts in parity by construction.

## `show-keys.mjs` — spot checks

```
node scripts/show-keys.mjs es zh -- home.applications.intro
```

Prints the current value of specific dotted key paths, per locale.
Useful when reviewing one sentence across several languages at once.

## `perf-measure.mjs` — memory and CPU, separated honestly

```
npx vite preview --port 4174 &
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --remote-debugging-port=9225 \
  --user-data-dir=/tmp/chrome-perf --hide-scrollbars
node scripts/perf-measure.mjs --label baseline --dpr 2
```

Walks each route at idle / mid-scroll / bottom / back-to-top and reports
three numbers that people routinely conflate:

* **jsHeapMB** — what the site's own JavaScript allocated. Small.
* **canvasMB** — the sum of every `<canvas>` backing store
  (`width * height * 4`). This is invisible to heap profilers, and on a
  page of full-bleed scenes it is the dominant cost.
* **rendererRssMB** — real resident memory of the renderer process,
  including the browser baseline the site cannot control.

`--dpr 2` matters: a canvas costs four times as much on a retina panel
as it does in default headless, so measuring only at DPR 1 hides most
of the problem.

## `perf-profile.mjs` — where the CPU actually goes

```
node scripts/perf-profile.mjs --route / --at top --ms 5000
```

Sampling profile aggregated by function and by file, so "the page idles
at 11%" can be attributed rather than guessed at.

## `perf-shots.mjs` — before/after visual comparison

```
node scripts/perf-shots.mjs --label before --dpr 2
```

Screenshots at fixed absolute scroll offsets, so the same offset lands
on the same story beat in two different builds. The scenes animate on a
clock, so two captures are never byte-identical — these are for looking
at, not for diffing.
