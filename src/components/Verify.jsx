import React, { useEffect, useState } from "react";
import { applyActionCode } from "firebase/auth";
import { auth } from "../firebase";
import ResetPassword from "./ResetPassword";

export default function Verify() {
  const [status, setStatus] = useState("Processing...");
  const [title, setTitle] = useState("Please wait");
  const [mode, setMode] = useState(null);
  const [oobCode, setOobCode] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let modeParam = params.get("mode");
    let codeParam = params.get("oobCode");

    // fallback if wrapped in link param
    if (!codeParam) {
      const wrapped = params.get("link");
      if (wrapped) {
        try {
          const url = new URL(wrapped);
          modeParam = url.searchParams.get("mode");
          codeParam = url.searchParams.get("oobCode");
        } catch (e) {
          console.error("Parse error:", e);
        }
      }
    }

    if (!modeParam || !codeParam) {
      setTitle("Invalid link");
      setStatus("❌ This link is missing required information.");
      return;
    }

    setMode(modeParam);
    setOobCode(codeParam);

    if (modeParam === "verifyEmail") {
      setTitle("Email Verification");

      applyActionCode(auth, codeParam)
        .then(() => {
          setStatus("✅ Your email has been verified successfully.");
        })
        .catch((err) => {
          console.error(err);
          setStatus("❌ Verification failed. The link may be expired or already used.");
        });
    }
  }, []);

  // ✅ Render reset password screen
  if (mode === "resetPassword" && oobCode) {
    return <ResetPassword oobCode={oobCode} />;
  }

  // ❌ Unsupported mode
  if (mode && mode !== "verifyEmail") {
    return (
      <div style={styles.container}>
        <h1>Unsupported action</h1>
        <p>❌ This action is not supported.</p>
      </div>
    );
  }

  // Default verify UI
  return (
    <div style={styles.container}>
      <h1>{title}</h1>
      <p>{status}</p>
      <p>You may now return to the NeighborUp app.</p>
      <img src="/Logo5.png" alt="NeighborUp Logo" style={styles.logo} />
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
};
