import logo from './logo.svg';
import './App.css';
import Homepage from './Homepage';
import Login from './Login';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Router>
      <Routes>
        <Route path="/" caseSensitive={false} element={
        <div className='holder'>
          <Login />
        </div>
        } />
        <Route path="/home/:passeduserid" caseSensitive={false} element={
        <div className='holder'>
          <Homepage />
        </div>
        } />
     
      </Routes>
    </Router>
      </header>
    </div>
  );
}

export default App;
