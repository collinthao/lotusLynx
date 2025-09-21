import crypto from "crypto";

function generateMD5Hash(data: string): string {
  return crypto.createHash("md5").update(data).digest("hex");
}

export const handleSubmit = async (userName: string, password: string) => {
  const passwordHash = generateMD5Hash(password); // hashed password
  const sessionRaw = `${userName} ${passwordHash}`;
  const Session = generateMD5Hash(sessionRaw);

  const payload = { Session };

  try {
    const response = await fetch(
      "https://bi14jxn65j.execute-api.us-east-1.amazonaws.com/Dev/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();

    if (response.ok) {
      console.log("✅ Authenticated:", result);

      // ✅ Redirect from client
      window.location.href = `/jobs-dashboard?session=${encodeURIComponent(Session)}`;
    } else {
      console.error("❌ Authentication failed:", result.body);
    }
  } catch (error) {
    console.error("❌ Network error:", error);
  }
};
