# Film Search: Letterboxd and IMDb

A small Firefox extension. Highlight a film title, right-click, and search Letterboxd or IMDb in one click.

## The problem

I find film names all the time on Reddit and Instagram. I want them on my Letterboxd watchlist.

Firefox's "Search Google for" only led me to IMDb and Rotten Tomatoes. To reach Letterboxd, I had to retype the title and add "letterboxd". That was too many clicks.

## What it does

Select text. Right-click. Two new items appear:

- Search Letterboxd for "title"
- Search IMDb for "title"

Each one opens the search in a new tab. You pick the right film.

It does not auto-click the first result. Plenty of films share a name, so a guess would often be wrong. There are several films called Crash.

## Year handling

People often highlight the year too. Keeping it helps. On Letterboxd, searching "crash 1996" and "crash 2004" each put the right film first.

| You highlight | It searches |
| --- | --- |
| `Crash (2004)` | `Crash 2004` |
| `Yi Yi (2000), Edward Yang` | `Yi Yi 2000` |
| `Battle Royale` | `Battle Royale` |
| `Hail, Caesar!` | `Hail, Caesar!` |

Rules:

- A bracketed year is kept, and the brackets are dropped.
- Anything after a bracketed year is cut, like a director name.
- Extra spaces and line breaks are trimmed.
- Long highlights are cut to 150 characters. Change `MAX_LENGTH` in `background.js` to adjust.
- Without a bracketed year, the text is left as it is.

To remove the year from every search, set `STRIP_YEAR = true` at the top of `background.js`.

## Search addresses

```
https://letterboxd.com/search/films/<title>/
https://www.imdb.com/find/?q=<title>&s=tt
```

The title is URL encoded, so characters like `&` and `/` are safe.

## Install

**Try it from source (temporary)**

1. Download or clone this repo.
2. In Firefox, open `about:debugging#/runtime/this-firefox`.
3. Click "Load Temporary Add-on".
4. Pick `manifest.json`.

It stays until Firefox restarts.

**Keep it permanently**

Firefox only keeps signed add-ons. You can submit your own copy to addons.mozilla.org and choose "On your own" to get a signed file. Change the `id` in `manifest.json` first, because each add-on needs its own.

## Privacy

- Collects no data.
- No accounts, ads or tracking.
- Does not read the page.
- Only the text you highlight is used, and only when you click a menu item.
- That text goes only to the site you pick, as a normal search.
- The only permission is `menus`.

## Files

```
manifest.json    Extension settings
background.js    Menu items and search logic
icons/           Extension icon and menu icons
```

There is no build step. What you see is what runs.

## Design notes

- **Firefox only.** Firefox lets each menu item carry its own icon. Chrome does not.
- **Neutral extension icon.** A clapperboard with a magnifier. It does not copy either brand.
- **Site logos on the menu items.** They show where each item goes. Nothing more.
- **Extension icon.** Made with AI, then edited by hand in Figma.

## Not affiliated

Not affiliated with Letterboxd or IMDb. Their names and logos belong to their owners.

## Built with Claude

I found the problem, designed the flow and made the product choices. That covers the year handling, the sites, the icon and the privacy stance. I tested it and chased down the edge cases.

Claude, an AI model from Anthropic, wrote the code.

## Licence

MIT. See `LICENSE`.
