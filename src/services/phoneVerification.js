// src/services/phoneVerification.js
//
// Phone number verification by SMS code, using Firebase Phone Auth.
// Used by LaunchRegistrationPage. The Firebase SDK is only downloaded the
// first time someone asks for a code, so it adds nothing to page load.
//
// Setup (Firebase console, one time):
//   1. Authentication > Sign-in method: enable "Phone".
//   2. Authentication > Settings > Authorized domains: add sastranidhi.org
//      (localhost is there by default).
//   3. Project settings > Your apps > Web app: copy the config into .env:
//
//   VITE_FIREBASE_API_KEY=...
//   VITE_FIREBASE_AUTH_DOMAIN=<project>.firebaseapp.com
//   VITE_FIREBASE_PROJECT_ID=<project>
//   VITE_FIREBASE_APP_ID=...

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const phoneVerificationConfigured = Boolean(config.apiKey && config.authDomain);

let authPromise = null;
let recaptcha = null;

function getAuth() {
  if (!authPromise) {
    authPromise = Promise.all([import('firebase/app'), import('firebase/auth')]).then(([app, auth]) => ({
      auth: auth.getAuth(app.initializeApp(config, 'phone-verification')),
      sdk: auth,
    }));
  }
  return authPromise;
}

const MESSAGES = {
  'auth/invalid-phone-number': 'That phone number doesn’t look right. Please check it.',
  'auth/missing-phone-number': 'Please enter your phone number.',
  'auth/too-many-requests': 'Too many attempts. Please wait a while and try again.',
  'auth/quota-exceeded': 'We can’t send more codes right now. Please try again later.',
  'auth/invalid-verification-code': 'Incorrect code. Please check the SMS and try again.',
  'auth/code-expired': 'This code has expired. Please request a new one.',
  'auth/captcha-check-failed': 'The security check failed. Please refresh the page and try again.',
};

function friendlyError(err, fallback) {
  return new Error(MESSAGES[err?.code] || fallback);
}

/**
 * Sends an SMS code to `phoneNumber` (E.164, e.g. +919876543210).
 * `recaptchaContainerId` is an empty element on the page for Firebase's
 * invisible reCAPTCHA. Resolves to a confirm(code) function.
 */
export async function sendPhoneCode(phoneNumber, recaptchaContainerId) {
  if (!phoneVerificationConfigured) {
    throw new Error('Phone verification is not available right now. Please try again later.');
  }
  const { auth, sdk } = await getAuth();
  try {
    if (!recaptcha) {
      recaptcha = new sdk.RecaptchaVerifier(auth, recaptchaContainerId, { size: 'invisible' });
    }
    const result = await sdk.signInWithPhoneNumber(auth, phoneNumber, recaptcha);
    return async (code) => {
      try {
        await result.confirm(code);
        // The sign-in itself isn't needed, only the proof the number is theirs.
        await sdk.signOut(auth);
      } catch (err) {
        throw friendlyError(err, 'We could not check the code right now. Please try again.');
      }
    };
  } catch (err) {
    // a used/failed reCAPTCHA can't be reused; make a fresh one next time
    recaptcha?.clear();
    recaptcha = null;
    throw friendlyError(err, 'We could not send the code right now. Please try again in a moment.');
  }
}

/** Removes the reCAPTCHA widget (call when the page unmounts). */
export function resetPhoneVerification() {
  recaptcha?.clear();
  recaptcha = null;
}
