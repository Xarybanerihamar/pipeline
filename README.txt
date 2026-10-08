PIPELINE PACKAGING — SIX-PAGE CORPORATE WEBSITE
================================================

Pages included
- index.html       Home
- products.html    Product categories with live filtering
- services.html    Packaging services
- industries.html  Industries served
- about.html       Company history, HQ and distribution locations
- contact.html     Interactive inquiry form

HOW TO PREVIEW
1. Unzip this folder.
2. Open index.html in Chrome or Edge. Navigate through all six pages.
3. The font (Google Fonts) and optional enhanced background photography use
   online services; the website still shows fallback artwork without internet.

GITHUB PAGES UPLOAD
1. Open your GitHub repository.
2. Upload the CONTENTS of this folder to the repository root, not the outer
   folder. Keep css/, js/, and assets/ alongside the six HTML files.
3. In Settings > Pages, select the deployment branch/main and /(root).
4. Check your GitHub Pages URL, then connect your domain after approval.
5. You do not need a CNAME file before selecting the final custom domain.

CONTACTS / FORM SETUP
- The official business address supplied is shown: 100 Executive Parkway,
  Hudson, OH 44236.
- No email address or phone number has been published, by request.
- The quote form is a working FRONT-END PREVIEW, not a live delivery service:
  visitors can validate, preview and copy their inquiry, but nothing is
  stored or sent. The site explains this clearly.
- After you give the receiving email/form handler, add the verified HTTPS form
  endpoint in js/main.js as FORM_ENDPOINT, and adjust form wording accordingly.
- For a true email submission from GitHub Pages, use a service like Formspree,
  Netlify Forms (Netlify hosting), or a custom backend. Static HTML alone
  cannot send secure email or store submissions.
- For production, also add your reviewed Privacy Policy, consent and spam
  protection appropriate to your usage.

BRANDING / ASSETS
- This is an original visual redesign CONCEPT, with a custom 'P' mark,
  local custom SVG product illustrations, and fallback warehouse art.
  It does not claim that the custom P mark is an official company logo.
- Optional warehouse/factory photographic backgrounds pull from Unsplash CDN;
  replace them with Pipeline-owned approved photos for launch, or remove the
  .photo-overlay classes in HTML to use packaged artwork entirely offline.
- Local SVG product images are illustrative, not exact stocked SKU photos.
- Product categories and services reflect the public company website.
- Quantities like 9 distribution sites and 1M+ square feet were sourced
  from public company material and should be checked before launch.
- All links and asset paths are relative and suited to GitHub project pages.

EDITING QUICKLY
- Colors/fonts/layout: css/styles.css
- Form handler and interactions: js/main.js
- Business copy/contact details: six HTML pages
- Brand mark/favicon: assets/mark.svg and assets/favicon.svg

NOTE: Do not deploy to an existing production domain without reviewing,
editing and authorizing this concept. No customer portal is included.
