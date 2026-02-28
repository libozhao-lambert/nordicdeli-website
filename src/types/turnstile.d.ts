// Global type declaration for the Cloudflare Turnstile widget
interface Window {
  turnstile?: {
    render: (
      container: string | HTMLElement,
      params: {
        sitekey: string;
        callback: (token: string) => void;
        "error-callback": () => void;
        "expired-callback": () => void;
        theme?: "light" | "dark" | "auto";
        size?: "normal" | "compact";
      }
    ) => string;
    reset: (widgetId: string) => void;
    remove: (widgetId: string) => void;
  };
}
