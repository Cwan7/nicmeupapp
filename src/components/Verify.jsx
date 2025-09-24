export default function Verify() {
    return (
        <div style={styles.container}>
            <h1>Email Verification</h1>
            <p>Your email has been verified successfully</p>
            <p>You may return to the app</p>
            <img src="/Logo5.png" alt="NicMeUp Logo" style={styles.logo} />
        </div>
    )
}
const styles = {
container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', 
    height: '100vh', 
    textAlign: 'center',
  },
  logo: {
    width: 400,
    height: 'auto',
    marginBottom: 20,
  },
}