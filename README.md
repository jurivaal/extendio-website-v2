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

Upload product images manually. Do not generate them with Codex. Each product/language folder can contain:

```text
main.jpg
1.jpg
2.jpg
3.jpg
4.jpg
5.jpg
```

If a product uses different uploaded filenames, add those filenames to `productImageRegistry` in `src/main.js` so the website can load the real uploaded image. For example, the German bamboo cotton buds currently use:

```text
assets/products/bamboo-cotton-buds/de/Main.jpeg
assets/products/bamboo-cotton-buds/de/WS.1_DE.png
assets/products/bamboo-cotton-buds/de/WS.2_DE.png
assets/products/bamboo-cotton-buds/de/WS.3_DE.png
assets/products/bamboo-cotton-buds/de/WS.4_DE.png
```

Examples:

```text
assets/products/hair-brush/en/main.jpg
assets/products/hair-brush/de/main.jpg
assets/products/bamboo-cotton-buds/es/1.jpg
assets/products/hair-clips/ru/3.jpg
```

When images are missing, the website shows branded CSS placeholders instead of broken image icons.

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
