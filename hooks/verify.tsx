import crypto from "crypto";
import { redirect } from "next/navigation";

// ✅ MD5 hashing function — same logic as in Python
function generateMD5Hash(data: string): string {
  return crypto.createHash("md5").update(data).digest("hex");
}

// 🔐 Called on login form submit
export const handleSubmit = async (userName: string, password: string) => {
  // ✅ Hashing using "username password" format
  const raw = `${userName} ${password}`;
  const Session = generateMD5Hash(raw);

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
      console.log("✅ Authentication Success:", result);
      // 🔁 Redirect with session hash as query param
      redirect(`/jobs-dashboard?session=${Session}`);
    } else {
      console.error("❌ Authentication Failed:", result.body);
      // You could throw here or return an error to the client
    }
  } catch (error) {
    console.error("❌ Error authenticating:", error);
    // Optional: throw or notify
  }
};
