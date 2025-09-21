import crypto from "crypto";
import { redirect } from "next/navigation";

// ✅ MD5 hashing function — same logic as in Python
function generateMD5Hash(data: string): string {
  return crypto.createHash("md5").update(data).digest("hex");
}

export const handleSubmit = async (userName: string, password: string) => {
  // 👇 Use raw string directly — no hashing
  const Session = `${userName} ${password}`;

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
      redirect(`/jobs-dashboard?session=${encodeURIComponent(Session)}`);
    } else {
      console.error("❌ Authentication failed:", result.body || result);
    }
  } catch (error) {
    console.error("❌ Error:", error);
  }
};
