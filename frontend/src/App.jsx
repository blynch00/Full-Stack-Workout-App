import './App.css'
import { useState } from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import CreatePage from './pages/CreatePage';
import RetrievePage from './pages/RetrievePage';
import UpdatePage from './pages/UpdatePage';
import './index.css';

function App() {
  // useState to pass exercise information between RetrievePage and UpdatePage.
  const [exerciseToEdit, setExerciseToEdit] = useState([]);

  return (
    <div>
      <header>
        <h1>Exercise Log</h1>
        <p> Demo of full stack web-application. Connect to MongoDB for functionality.</p>
      </header>
      <Router>
        <nav className='nav-bar'>
          <Link to='/'>Home</Link>
          <Link to='/create'>Add</Link>
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<RetrievePage setExerciseToEdit={setExerciseToEdit}/>}></Route>
            <Route path="/create" element={<CreatePage/>}></Route>
            <Route path="/update" element={<UpdatePage exerciseToEdit={exerciseToEdit}/>}></Route>
          </Routes>
        </main>
      </Router>
      <footer>
        <p> <a href="https://github.com/blynch00"> github.com/blynch00 </a></p>
      </footer>
    </div>
  )
}

export default App
