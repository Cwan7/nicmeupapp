import React, { useEffect, useState } from "react";
import { applyActionCode } from "firebase/auth";
import { auth } from "../firebase";
import ResetPassword from "./ResetPassword";

export default function Verify() {
  const [status, setStatus] = useState("Processing...");
  const [title, setTitle] = useState("Please wait");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const mode = params.get("mode");
    let oobCode = params.get("oobCode");

    // fallback if wrapped in link param
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

    if (!oobCode || !mode) {
      setTitle("Invalid link");
      setStatus("❌ This link is missing required information.");
      return;
    }
    if (mode === "resetPassword") {
      return <ResetPassword oobCode={oobCode} />;
    }

    if (mode !== "verifyEmail") {
      setTitle("Unsupported action");
      setStatus("❌ This action is not supported on this page.");
      return;
    }

    setTitle("Email Verification");

    applyActionCode(auth, oobCode)
      .then(() => {
        console.log("✅ Email verified");
        setStatus("✅ Your email has been verified successfully.");
      })
      .catch((err) => {
        console.error("Verification error:", err);
        setStatus("❌ Verification failed. The link may be expired or already used.");
      });
  }, []);

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
