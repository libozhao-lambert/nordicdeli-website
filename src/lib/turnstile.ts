/**
 * Cloudflare Turnstile server-side verification.
 */

interface TurnstileVerifyResponse {
  success: boolean;
  "error-codes"?: string[];
  challenge_ts?: string;
  hostname?: string;
}

export async function verifyTurnstile(
  token: string,
  secretKey: string,
  remoteip?: string
): Promise<{ success: boolean; errors?: string[] }> {
  const body = new URLSearchParams({
    secret: secretKey,
    response: token,
  });

  if (remoteip) {
    body.set("remoteip", remoteip);
  }

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      }
    );

    if (!response.ok) {
      return { success: false, errors: ["turnstile-server-error"] };
    }

    const data = (await response.json()) as TurnstileVerifyResponse;

    if (data.success) {
      return { success: true };
    }

    return {
      success: false,
      errors: data["error-codes"] ?? ["unknown-error"],
    };
  } catch {
    return { success: false, errors: ["network-error"] };
  }
}
