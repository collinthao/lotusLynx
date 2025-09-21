import crypto from "crypto";
import { redirect } from "next/navigation";

function generateMD5Hash(data: string): string {
  return crypto.createHash("md5").update(data).digest("hex");
}

export const handleSubmit = async (userName: string, password: string) => {
  const s = userName + " " + password; // Raw password, no hashing
  const Session = generateMD5Hash(s); // Now matches Python

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

    if (response.status === 200) {
      console.log("Authenticated", result);
    } else {
      console.error("Error Authenticating:", result.body);
      return;
    }
  } catch (error) {
    console.error("Error:", error);
    return;
  }

  redirect("/jobs-dashboard?session=" + Session);
};
