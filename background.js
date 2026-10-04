// Film Search: Letterboxd and IMDb
// Not affiliated with Letterboxd or IMDb.
// Letterboxd, IMDb and their logos belong to their owners.
// This extension only opens a search page on each site. It collects nothing.

// Set to true to remove the year completely before searching.
// false keeps the year but drops the brackets: "Crash (2004)" -> "Crash 2004"
const STRIP_YEAR = false;

// Longest search text allowed. Longer highlights are cut to this length.
const MAX_LENGTH = 150;

function cleanTitle(raw) {
  let text = raw.replace(/\s+/g, " ").trim().slice(0, MAX_LENGTH).trim();

  // If there is a bracketed year, keep the title and the year.
  // Drop everything after it, like a director name.
  // "Yi Yi (2000), Edward Yang" -> "Yi Yi 2000"
  const m = text.match(/^(.*?)\s*[\(\[]\s*((?:18|19|20)\d{2})\s*[\)\]]/);
  if (m && m[1].trim()) {
    text = STRIP_YEAR ? m[1].trim() : m[1].trim() + " " + m[2];
  } else if (STRIP_YEAR) {
    text = text.replace(/\s+(?:18|19|20)\d{2}$/, "");
  }
  return text.trim();
}

const menus = browser.menus || browser.contextMenus;

const SITES = [
  {
    id: "search-letterboxd",
    title: 'Search Letterboxd for "%s"',
    icon: "letterboxd",
    url: (q) => "https://letterboxd.com/search/films/" + q + "/",
  },
  {
    id: "search-imdb",
    title: 'Search IMDb for "%s"',
    icon: "imdb",
    url: (q) => "https://www.imdb.com/find/?q=" + q + "&s=tt",
  },
];

function buildMenus() {
  menus.removeAll().then(() => {
    for (const site of SITES) {
      menus.create(
        {
          id: site.id,
          title: site.title,
          contexts: ["selection"],
          icons: {
            16: "icons/" + site.icon + "-16.png",
            32: "icons/" + site.icon + "-32.png",
          },
        },
        () => {
          if (browser.runtime.lastError) {
            console.error("Menu error:", browser.runtime.lastError.message);
          }
        }
      );
    }
  });
}

// Runs every time the background script starts, not only on install.
buildMenus();

menus.onClicked.addListener((info) => {
  const site = SITES.find((s) => s.id === info.menuItemId);
  if (!site || !info.selectionText) return;
  const query = encodeURIComponent(cleanTitle(info.selectionText));
  if (!query) return;
  browser.tabs.create({ url: site.url(query) });
});
