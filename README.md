# Sastranidhi — React Conversion

A React.js (Vite) frontend for Sastranidhi. It includes the public landing
page, OAuth test harness, and the branded authentication pages used by the
backend OAuth flow.

## Run it

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (defaults to http://localhost:5173).

To build for production:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  main.jsx                     Mounts <App /> into #root
  App.jsx                      Composes the page, imports all global CSS
  context/
    AuthContext.jsx            Shared authentication state and API calls
    ModalContext.jsx           Shared state for the donate modal
  hooks/
    useDemoForm.js             Reproduces the original "demo" form submit behavior
  data/
    siteData.js                 Nav links, initiative cards, courses, stats, footer links
                                (verbatim text from the original HTML)
  components/
    Header/
      Header.jsx                 Sticky header: brand, desktop nav, action buttons, hamburger
      MobileNav.jsx               Collapsible mobile navigation drawer
    Hero/
      Hero.jsx                    Hero heading/copy + renders SearchCard and Initiatives
      SearchCard.jsx               Search form + result message (useState)
    Initiatives/
      Initiatives.jsx              4-card initiatives grid
    Stats/
      Stats.jsx                    Stats band (100+, 18,000+, 50+, 4)
    About/
      About.jsx                    About copy + "Guiding Vision" quote card
    Courses/
      Courses.jsx                  Featured courses grid
    Research/
      Research.jsx                 Research & publications feature grid
    Contact/
      Contact.jsx                  Donation CTA + contact form
    Footer/
      Footer.jsx                   Footer columns + copyright
    Modals/
      Modal.jsx                    Reusable modal shell (backdrop click + close button)
      DonateModal.jsx
  pages/
    OAuthTestPage.jsx              Manual PKCE/OAuth test harness
    LoginPage.jsx                  OAuth login page
    SignupWizard.jsx               Account creation flow
    ForgotPasswordPage.jsx         Password recovery request page
    ResetPasswordPage.jsx          Password reset page
  services/
    api.js                         Backend API client
  styles/
    base.css                     :root variables, resets, typography, .container
    header.css                   header, nav, buttons, hamburger, mobile drawer
    hero.css                     home-screen, hero, search card
    initiatives.css              section-title, grid, card, icon, link
    sections.css                 shared .section / .section-head wrapper rules
    stats.css                    stats band
    about.css                    split layout + quote card
    courses.css                  course grid/card
    research.css                 feature grid
    contact.css                  CTA, form, message
    footer.css                   footer layout
    modal.css                    modal overlay + box
    responsive.css                all @media rules, unchanged from the original
```

## Behavior parity notes

- **Auth routes** are available at `/login`, `/signup`, `/forgot-password`,
  `/reset-password`, and `/oauth-test`. The landing page is rendered for all
  other paths.

- **Modals** (`login`, `signup`, `donate`) are controlled by a single
  `ModalContext` instead of `data-open` attributes + `classList`. Clicking
  the backdrop (not the box) or the `×` button closes the modal, exactly
  like the original `.modal` click-outside handler.
- **Mobile nav** toggles via local `useState` in `Header`, mirroring the
  original `mobileNav.classList.toggle('open')`. Selecting a link or
  opening a modal from the drawer closes it, matching the original
  `mobile a[href^="#"]` handler.
- **Search** and all three modal forms plus the contact form reproduce the
  original "demo" submit behavior (`preventDefault` + show a message),
  now via `useState`/`useDemoForm` instead of direct DOM writes.
- All class names (`.btn`, `.card`, `.section`, `.modal`, etc.) are kept
  exactly as in the original so the CSS cascade and every visual detail
  (gradients, shadows, hover transforms, breakpoints) is unchanged.
