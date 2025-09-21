import crypto from "crypto";
import { redirect } from "next/navigation";

function generateMD5Hash(data: string): string {
  return crypto.createHash("md5").update(data).digest("hex");
}

export const handleSubmit = async (userName: string, password: string) => {
  const passwordHash = generateMD5Hash(password); // hash raw password
  const sessionRaw = `${userName} ${passwordHash}`; // username + hashed password
  const Session = generateMD5Hash(sessionRaw); // hash the whole string again

  const jobData = { Session };

  try {
    const response = await fetch(
      "https://bi14jxn65j.execute-api.us-east-1.amazonaws.com/Dev/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData),
      }
    );

    const result = await response.json();
    if (response.ok) {
      console.log("✅ Authenticated", result);
      redirect(`/jobs-dashboard?session=${Session}`);
    } else {
      console.error("❌ Authentication failed:", result.body);
    }
  } catch (error) {
    console.error("❌ Network error:", error);
  }
};
