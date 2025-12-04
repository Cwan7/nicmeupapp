import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Privacy from "./components/Privacy";
import Verify from "./components/Verify";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/verify"element={<Verify />}/>
        <Route
          path="/"
          element={
            <div style={styles.container}>
              <h1>Welcome to NeighborUp!</h1>
              <p>This site hosts our Privacy Policy and Verification pages.</p>
              <img src="/Logo5.png" alt="NicMeUp Logo" style={styles.logo} />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', 
    // justifyContent: 'center', 
    height: '100vh', 
    textAlign: 'center',
  },
  logo: {
    width: 400,
    height: 'auto',
    marginBottom: 20,
  },
}
