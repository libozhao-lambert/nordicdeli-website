// Augment the global CloudflareEnv interface with our KV bindings and secrets.
// This file is automatically included by tsconfig.json via the **/*.ts glob.
declare global {
  interface CloudflareEnv {
    RESERVATIONS_KV: KVNamespace;
    SETTINGS_KV: KVNamespace;
    CF_TURNSTILE_SECRET_KEY_CONTACT: string;
    CF_TURNSTILE_SECRET_KEY_RESERVATIONS: string;
    RESEND_API_KEY: string;
    HMAC_SECRET: string;
    CF_WEB_ANALYTICS_TOKEN: string;
    NEXT_PUBLIC_CF_TURNSTILE_SITE_KEY_CONTACT: string;
    NEXT_PUBLIC_CF_TURNSTILE_SITE_KEY_RESERVATIONS: string;
    NEXT_PUBLIC_SITE_URL: string;
  }
}

export {};
