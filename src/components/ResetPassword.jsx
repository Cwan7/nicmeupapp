import { useState } from "react";
import { confirmPasswordReset } from "firebase/auth";
import { auth } from "../firebase";

const passwordRegex =
  /^(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};:'",.<>/?\\|`~]).{8,}$/;

export default function ResetPassword({ oobCode }) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    setStatus("");

    if (!passwordRegex.test(password)) {
      setStatus(
        "Password must be at least 8 characters and include a number and a special character."
      );
      return;
    }

    if (password !== confirm) {
      setStatus("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      await confirmPasswordReset(auth, oobCode, password);
      setStatus("✅ Password reset successful. You can now sign in.");
    } catch (err) {
      console.error(err);
      setStatus("❌ Reset failed. Link may be expired or already used.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>NeighborUp</h1>
      <h2 style={styles.title}>Reset Password</h2>

      <input
        type="password"
        placeholder="New password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
        disabled={loading}
      />

      <input
        type="password"
        placeholder="Confirm password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        style={styles.input}
        disabled={loading}
      />

      <button
        onClick={handleReset}
        style={{
          ...styles.button,
          opacity: loading ? 0.6 : 1,
          pointerEvents: loading ? "none" : "auto",
        }}
      >
        {loading ? "Resetting..." : "Reset Password"}
      </button>

      {status && (
        <p
          style={{
            ...styles.status,
            color: status.startsWith("✅") ? "green" : "#c00",
          }}
        >
          {status}
        </p>
      )}
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
    marginBottom: "10px",
  },
  heading: {
    marginBottom: "0px",
    fontSize: "32px",
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

