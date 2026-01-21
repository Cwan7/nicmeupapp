import { useState } from "react";
import { confirmPasswordReset } from "firebase/auth";
import { auth } from "../firebase";

export default function ResetPassword({ oobCode }) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState("");

  const handleReset = async () => {
    if (password.length < 6) {
      setStatus("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setStatus("Passwords do not match.");
      return;
    }

    try {
      await confirmPasswordReset(auth, oobCode, password);
      setStatus("✅ Password reset successful. You can now sign in.");
    } catch (err) {
      setStatus("❌ Reset failed. Link may be expired.");
    }
  };

  return (
    <div style={styles.container}>
        <h1 style={styles.title}>Reset Password</h1>
        <input
            type="password"
            placeholder="New password"
            style={styles.input}
        />
        <input
            type="password"
            placeholder="Confirm password"
            style={styles.input}
        />
        <button style={styles.button}>Reset Password</button>
        <p style={styles.status}>Status message here</p>
    </div>
  );
}
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "start",
    height: "100vh",
    padding: "24px",
    textAlign: "center",
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    backgroundColor: "#ffffff",
  },

  title: {
    fontSize: "24px",
    fontWeight: 600,
    marginBottom: "20px",
  },

  input: {
    width: "100%",
    maxWidth: "320px",
    padding: "12px 14px",
    fontSize: "16px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    boxSizing: "border-box",
  },

  button: {
    width: "100%",
    maxWidth: "320px",
    padding: "12px",
    fontSize: "16px",
    fontWeight: 600,
    color: "#fff",
    backgroundColor: "#60a8b8",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "8px",
  },

  status: {
    marginTop: "16px",
    fontSize: "14px",
    color: "#333",
    maxWidth: "320px",
  },
};

