import { useEffect, useState } from 'react';
import { getAuth, confirmPasswordReset } from 'firebase/auth';

export default function PasswordReset() {
  const auth = getAuth();

  const [oobCode, setOobCode] = useState(null);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('oobCode');

    if (!code) {
      setError('Invalid or expired password reset link.');
    } else {
      setOobCode(code);
    }
  }, []);

  const handleReset = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }

    try {
      await confirmPasswordReset(auth, oobCode, password);
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError('This reset link is invalid or has expired.');
    }
  };

  if (success) {
    return (
      <div style={styles.container}>
        <h2>Password Reset</h2>
        <p>Your password has been successfully updated.</p>
        <p>You can now return to the NeighborUp app.</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2>Reset Your Password</h2>

      {error && <p style={styles.error}>{error}</p>}

      <form onSubmit={handleReset} style={styles.form}>
        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Confirm new password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Reset Password
        </button>
      </form>
    </div>
  );
}
const styles = {
    container: {
    maxWidth: 400,
    margin: '80px auto',
    padding: 24,
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  input: {
    padding: 12,
    fontSize: 16,
  },
  button: {
    padding: 12,
    fontSize: 16,
    backgroundColor: '#007AFF',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginBottom: 12,
  },
};