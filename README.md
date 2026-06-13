# Extendio static multilingual website

A clean static brand website for Extendio, a European brand based in Alicante, Spain, focused on practical beauty products, hygiene essentials, hair accessories and everyday care products.

## File structure

```text
index.html
src/styles.css
src/main.js
README.md
.nojekyll
assets/logo/.gitkeep
assets/company/.gitkeep
assets/products/<product>/<language>/.gitkeep
```

Product folders are prepared for:

- `hair-brush`
- `mini-brush`
- `bamboo-cotton-buds`
- `hair-clips`

Languages are `en`, `de`, `es`, and `ru`.

## Editing translations

All visible website text is stored in the `translations` object in `src/main.js`. Edit the matching language block (`en`, `de`, `es`, or `ru`) to update navigation, SEO text, product copy, contact labels and footer text.

## Shopify placeholder links

`src/main.js` contains a `productLinks` / `shopifyLinks` object with temporary values:

```js
hairBrush: '#shopify-hair-brush'
miniBrush: '#shopify-mini-brush'
bambooCottonBuds: '#shopify-bamboo-cotton-buds'
hairClips: '#shopify-hair-clips'
```

Replace these values with real Shopify product URLs when the store is ready. No Shopify API, Buy Button script or checkout logic is integrated yet.

## Logo upload

Upload the real logo manually to:

```text
assets/logo/extendio-logo.jpg
```

If this file is missing, the header automatically shows the text logo `Extendio`.

## Product image upload

Upload product images manually. Do not generate them with Codex and do not rename uploaded files just to match a fixed naming pattern. Product image loading is controlled by:

```text
assets/products/manifest.json
```

The product folders can contain any image filenames and common image extensions, for example `Main.jpeg`, `WS.1_DE.png`, `28788.jpg`, or names that include spaces. The website does **not** require product images to be named `main.jpg`, `1.jpg`, `2.jpg`, etc.

When new images are uploaded later, update `assets/products/manifest.json` so the relevant product and language list includes the new filenames. The first image in each manifest list is used as the main product image. The remaining images are displayed as a supporting gallery strip.

The manifest is organized by product slug and language:

```json
{
  "bamboo-cotton-buds": {
    "de": ["Main.jpeg", "WS.1_DE.png"],
    "en": [],
    "es": [],
    "ru": []
  }
}
```

The website first tries images for the currently selected language, then falls back through English, German, Spanish and Russian. If no usable image exists, or if an image fails to load, the site shows branded CSS placeholders instead of broken image icons.

## GitHub Pages

To publish:

1. Open the repository on GitHub.
2. Go to **Settings → Pages**.
3. Set the source to **Deploy from branch**.
4. Select branch **main** and folder **root**.
5. Save.

The `.nojekyll` file is included so GitHub Pages serves the static files directly.

## Notes

- Plain HTML, CSS and JavaScript only.
- No build system or npm dependencies.
- Uses relative paths for GitHub Pages compatibility.
- Images should be uploaded manually by the repository owner, not created by Codex.
