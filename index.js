/* ============================================================
   LOGIN PAGE — pure JavaScript (no separate HTML/CSS files)
   Drop this into an empty HTML page as the only <script src="login-page.js">
   and it builds the entire UI at runtime.

   Edit COLORS below to restyle everything.
   ============================================================ */

(function () {
  'use strict';

  // ----------------------------------------------------------
  // 1. COLOR SCHEME — edit these to restyle the whole page
  // ----------------------------------------------------------
  const COLORS = {
    bg: '#ffffff',
    panelBg: '#f4f4f6',
    textPrimary: '#14142b',
    textSecondary: '#6b6b76',
    border: '#d9d9e0',
    borderFocus: '#14142b',
    link: '#2f6fed',
    btnGradStart: '#8a3ffc',
    btnGradEnd: '#2f6fed',
    btnText: '#ffffff',
    footerText: '#6b6b76',
    logo1: '#f6a723',
    logo2: '#ee5a6f',
    logo3: '#8a3ffc',
    logo4: '#2f6fed',
    spinnerTrack: 'rgba(0,0,0,0.1)',
    fallbackBg: '#e4e4ea'
  };

  const FONT_FAMILY = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
  const RADIUS_INPUT = '10px';
  const RADIUS_BTN = '10px';

  // Placeholder content — swap freely
  const CONTENT = {
    brandName: 'Brand',
    heading: 'Welcome back',
    subheading: "Let's get you signed in.",
    signupPrompt: 'New here?',
    signupLinkText: 'Sign up',
    copyrightStartYear: 2005,
    copyrightName: 'Brand Inc.',
    imageSrc: 'https://pubs.payoneer.com/v2/ui-assets/images/login/Sign-in-1440.png'
  };

  // ----------------------------------------------------------
  // 2. INJECT STYLES
  // ----------------------------------------------------------
  const css = `
    * { box-sizing: border-box; }
    html, body {
      margin: 0; padding: 0; height: 100%;
      font-family: ${FONT_FAMILY};
      background: ${COLORS.bg};
      color: ${COLORS.textPrimary};
    }
    .lp-layout { display: flex; min-height: 100vh; width: 100%; }

    .lp-left {
      flex: 1 1 50%;
      display: flex; flex-direction: column; justify-content: space-between;
      padding: 48px 64px; background: ${COLORS.bg};
    }
    .lp-brand { display: flex; align-items: center; gap: 10px; }
    .lp-brand-logo {
      width: 28px; height: 28px; border-radius: 50%;
      background: conic-gradient(${COLORS.logo1}, ${COLORS.logo2}, ${COLORS.logo3}, ${COLORS.logo4}, ${COLORS.logo1});
      mask: radial-gradient(farthest-side, transparent calc(100% - 6px), #000 calc(100% - 5px));
      -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 6px), #000 calc(100% - 5px));
    }
    .lp-brand-name { font-size: 20px; font-weight: 700; letter-spacing: -0.3px; }

    .lp-form-wrap { max-width: 380px; width: 100%; margin: 0 auto; }
    .lp-heading { font-size: 36px; font-weight: 800; margin: 0 0 8px 0; letter-spacing: -0.5px; }
    .lp-subheading { font-size: 16px; color: ${COLORS.textSecondary}; margin: 0 0 32px 0; }

    .lp-field { margin-bottom: 16px; position: relative; }
    .lp-field input {
      width: 100%; padding: 16px 44px 16px 16px;
      border: 1.5px solid ${COLORS.border}; border-radius: ${RADIUS_INPUT};
      font-size: 15px; font-family: ${FONT_FAMILY}; color: ${COLORS.textPrimary};
      background: ${COLORS.bg}; outline: none; transition: border-color 0.15s ease;
    }
    .lp-field input::placeholder { color: ${COLORS.textSecondary}; }
    .lp-field input:focus { border-color: ${COLORS.borderFocus}; }

    .lp-toggle-visibility {
      position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
      background: none; border: none; cursor: pointer; padding: 4px;
      color: ${COLORS.textSecondary}; display: flex; align-items: center;
    }
    .lp-toggle-visibility svg { width: 20px; height: 20px; }

    .lp-forgot-link {
      display: inline-block; margin: 4px 0 24px 0; font-size: 14px;
      color: ${COLORS.link}; text-decoration: none; font-weight: 600;
    }
    .lp-forgot-link:hover { text-decoration: underline; }

    .lp-btn-primary {
      width: 100%; padding: 16px; border: none; border-radius: ${RADIUS_BTN};
      background: linear-gradient(90deg, ${COLORS.btnGradStart}, ${COLORS.btnGradEnd});
      color: ${COLORS.btnText}; font-size: 16px; font-weight: 700;
      font-family: ${FONT_FAMILY}; cursor: pointer;
      transition: opacity 0.15s ease, transform 0.05s ease;
    }
    .lp-btn-primary:hover { opacity: 0.92; }
    .lp-btn-primary:active { transform: scale(0.99); }

    .lp-signup-row { text-align: center; margin-top: 24px; font-size: 15px; color: ${COLORS.textPrimary}; }
    .lp-signup-row a { color: ${COLORS.link}; text-decoration: none; font-weight: 700; }
    .lp-signup-row a:hover { text-decoration: underline; }

    .lp-footer {
      display: flex; align-items: center; justify-content: space-between;
      flex-wrap: wrap; gap: 16px; font-size: 14px; color: ${COLORS.footerText};
    }
    .lp-footer-links { display: flex; align-items: center; gap: 24px; }
    .lp-footer a { color: ${COLORS.textPrimary}; text-decoration: underline; font-weight: 600; font-size: 14px; }
    .lp-lang-select { display: flex; align-items: center; gap: 4px; color: ${COLORS.textPrimary}; font-weight: 600; cursor: pointer; }

    .lp-right {
      flex: 1 1 50%; background: ${COLORS.panelBg}; position: relative;
      overflow: hidden;
    }

    .lp-image-stage {
      position: absolute; inset: 0; width: 100%; height: 100%;
    }
    .lp-image-placeholder {
      width: 100%; height: 100%; border-radius: 0;
      display: flex; align-items: center; justify-content: center;
      position: relative; overflow: hidden;
    }
    .lp-spinner {
      width: 44px; height: 44px; border-radius: 50%;
      border: 3px solid ${COLORS.spinnerTrack}; border-top-color: ${COLORS.btnGradEnd};
      animation: lp-spin 0.8s linear infinite;
    }
    @keyframes lp-spin { to { transform: rotate(360deg); } }

    .lp-hero-image {
      width: 100%; height: 100%; object-fit: cover; object-position: top center;
      opacity: 0; transition: opacity 0.5s ease; display: block;
    }
    .lp-hero-image.lp-loaded { opacity: 1; }

    @media (max-width: 900px) {
      .lp-layout { flex-direction: column; }
      .lp-right { min-height: 320px; order: -1; }
      .lp-left { padding: 32px 24px; }
    }
  `;

  const styleEl = document.createElement('style');
  styleEl.setAttribute('data-source', 'login-page.js');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // ----------------------------------------------------------
  // 3. SMALL DOM-BUILD HELPER
  // ----------------------------------------------------------
  function el(tag, attrs, children) {
    const node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach((key) => {
        if (key === 'className') node.className = attrs[key];
        else if (key === 'html') node.innerHTML = attrs[key];
        else if (key.startsWith('on') && typeof attrs[key] === 'function') {
          node.addEventListener(key.slice(2).toLowerCase(), attrs[key]);
        } else {
          node.setAttribute(key, attrs[key]);
        }
      });
    }
    (children || []).forEach((child) => {
      if (child) node.appendChild(child);
    });
    return node;
  }

  const EYE_ICON_SVG =
    '<svg id="lp-eye-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" ' +
    'stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"></path>' +
    '<circle cx="12" cy="12" r="3"></circle>' +
    '<line id="lp-eye-slash" x1="3" y1="3" x2="21" y2="21" stroke="currentColor"></line>' +
    '</svg>';

  const CHEVRON_SVG =
    '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
    '<polyline points="6 9 12 15 18 9"></polyline></svg>';

  // ----------------------------------------------------------
  // 4. BUILD THE PAGE
  // ----------------------------------------------------------
  function buildPage() {
    // --- Left panel ---
    const brand = el('div', { className: 'lp-brand' }, [
      el('span', { className: 'lp-brand-logo' }),
      el('span', { className: 'lp-brand-name', html: CONTENT.brandName })
    ]);

    const emailField = el('div', { className: 'lp-field' }, [
      el('input', { type: 'email', id: 'lp-email', placeholder: 'Email', required: 'true' })
    ]);

    const passwordInput = el('input', {
      type: 'password',
      id: 'lp-password',
      placeholder: 'Password',
      required: 'true'
    });

    const toggleBtn = el('button', {
      type: 'button',
      className: 'lp-toggle-visibility',
      id: 'lp-toggle-password',
      'aria-label': 'Show password',
      html: EYE_ICON_SVG
    });

    const passwordField = el('div', { className: 'lp-field' }, [passwordInput, toggleBtn]);

    const forgotLink = el('a', { href: '#', className: 'lp-forgot-link', html: 'Forgot password?' });

    const submitBtn = el('button', { type: 'submit', className: 'lp-btn-primary', html: 'Sign in' });

    const form = el('form', { id: 'lp-login-form', autocomplete: 'off' }, [
      emailField,
      passwordField,
      forgotLink,
      submitBtn
    ]);

    const signupRow = el('p', { className: 'lp-signup-row' }, [
      document.createTextNode(CONTENT.signupPrompt + ' '),
      el('a', { href: '#', html: CONTENT.signupLinkText })
    ]);

    const formWrap = el('div', { className: 'lp-form-wrap' }, [
      el('h1', { className: 'lp-heading', html: CONTENT.heading }),
      el('p', { className: 'lp-subheading', html: CONTENT.subheading }),
      form,
      signupRow
    ]);

    const copyrightSpan = el('span', { id: 'lp-copyright-text' });

    const footer = el('div', { className: 'lp-footer' }, [
      copyrightSpan,
      el('div', { className: 'lp-footer-links' }, [
        el('span', { className: 'lp-lang-select', html: 'English ' + CHEVRON_SVG }),
        el('a', { href: '#', html: 'Contact Us' }),
        el('a', { href: '#', html: 'Get the app' })
      ])
    ]);

    const leftPanel = el('div', { className: 'lp-left' }, [brand, formWrap, footer]);

    // --- Right panel ---
    const spinner = el('div', { className: 'lp-spinner', id: 'lp-image-spinner' });

    const heroImage = el('img', {
      alt: 'Placeholder',
      className: 'lp-hero-image',
      id: 'lp-hero-image'
      // src intentionally set after 'load'/'error' listeners are attached (see loadImage below)
    });

    const imagePlaceholder = el('div', { className: 'lp-image-placeholder', id: 'lp-image-placeholder' }, [
      spinner,
      heroImage
    ]);

    const imageStage = el('div', { className: 'lp-image-stage' }, [imagePlaceholder]);

    const rightPanel = el('div', { className: 'lp-right' }, [imageStage]);

    const layout = el('div', { className: 'lp-layout' }, [leftPanel, rightPanel]);

    document.body.appendChild(layout);

    return { passwordInput, toggleBtn, form, copyrightSpan, heroImage, spinner, imagePlaceholder };
  }

  // ----------------------------------------------------------
  // 5. BEHAVIOR
  // ----------------------------------------------------------
  function wireUp(refs) {
    // Password show/hide
    refs.toggleBtn.addEventListener('click', () => {
      const isHidden = refs.passwordInput.type === 'password';
      refs.passwordInput.type = isHidden ? 'text' : 'password';
      const eyeSlash = document.getElementById('lp-eye-slash');
      if (eyeSlash) eyeSlash.style.display = isHidden ? 'none' : 'block';
      refs.toggleBtn.setAttribute('aria-label', isHidden ? 'Hide password' : 'Show password');
    });

    // Footer copyright year, auto-updating
    const currentYear = new Date().getFullYear();
    refs.copyrightSpan.textContent = '\u00A9 ' + CONTENT.copyrightStartYear + '\u2013' + currentYear + ' ' + CONTENT.copyrightName;

    // Form submit placeholder
    refs.form.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log('Sign in submitted:', {
        email: document.getElementById('lp-email').value,
        password: refs.passwordInput.value
      });
    });

    // Dynamic image load with spinner
    function showImage() {
      refs.spinner.style.display = 'none';
      refs.heroImage.classList.add('lp-loaded');
    }

    refs.heroImage.addEventListener('load', showImage);
    refs.heroImage.addEventListener('error', () => {
      refs.spinner.style.display = 'none';
      refs.heroImage.style.display = 'none';
      refs.imagePlaceholder.style.background = COLORS.fallbackBg;
    });

    // Kick off the load
    refs.heroImage.src = CONTENT.imageSrc;
  }

  // ----------------------------------------------------------
  // 6. INIT
  // ----------------------------------------------------------
  function clearExistingContent() {
    // Wipe out anything already in <body> so it can't collide with
    // (or hide behind) the elements this script is about to build.
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }

    // Also strip any inline/legacy styling on <body> and <html> that could
    // fight with the injected stylesheet (leftover margin, background, etc.)
    document.body.removeAttribute('style');
    document.documentElement.removeAttribute('style');
  }

  function init() {
    clearExistingContent();
    const refs = buildPage();
    wireUp(refs);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
