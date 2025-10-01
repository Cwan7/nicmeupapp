import React, { useEffect, useState } from "react";
import { applyActionCode } from "firebase/auth";
import { auth } from "./firebase"; // adjust path if needed

export default function Verify() {
  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let oobCode = params.get("oobCode");

    // fallback if wrapped in link= param
    if (!oobCode) {
      const wrapped = params.get("link");
      if (wrapped) {
        try {
          const url = new URL(wrapped);
          oobCode = url.searchParams.get("oobCode");
        } catch (e) {
          console.error("Parse error:", e);
        }
      }
    }

    if (!oobCode) {
      setStatus("❌ No verification code found.");
      return;
    }

    applyActionCode(auth, oobCode)
      .then(() => {
        console.log("✅ Verified");
        setStatus("✅ Your email has been verified successfully.");
      })
      .catch((err) => {
        console.error("Verification error:", err);
        setStatus("❌ Verification failed. Link may be invalid or expired.");
      });
  }, []);

  return (
    <div style={styles.container}>
      <h1>Email Verification</h1>
      <p>{status}</p>
      <p>You may now return to the NicMeUp app.</p>
      <img src="/Logo5.png" alt="NicMeUp Logo" style={styles.logo} />
    </div>
  );
}
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
    justifyContent: "center",
    textAlign: "center",
  },
  logo: {
    width: 240,
    height: "auto",
    marginTop: 20,
  },
}

