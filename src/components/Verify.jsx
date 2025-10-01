import React, { useEffect, useState } from "react";
import { getAuth, applyActionCode } from "firebase/auth";

export default function Verify() {
  const [status, setStatus] = useState("Verifying...");
  const auth = getAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const oobCode = urlParams.get("oobCode");

    if (oobCode) {
      applyActionCode(auth, oobCode)
        .then(() => {
          console.log("✅ Email verified!");
          setStatus("✅ Your email has been verified successfully.");
        })
        .catch((err) => {
          console.error("❌ Verification error:", err);
          setStatus("❌ Verification failed. The link may have expired or is invalid.");
        });
    } else {
      setStatus("❌ No verification code found in the URL.");
    }
  }, [auth]);

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
    width: 400,
    height: "auto",
    marginTop: 20,
  },
};
