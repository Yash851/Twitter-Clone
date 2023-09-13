import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Leftbar from './components/Leftbar';
import Explore from './pages/Explore'
import Home from './pages/Home'
import Rightbar from './components/Rightbar';
import Modal from './components/Modal';
import { useAuthContext } from './hooks/useAuthContext';
import Tweetpage from './pages/Tweetpage';
function App() {
  const { user } = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
        <div className="container">
          <Leftbar />
          <Routes>
            <Route path="/" element={<Home title="Home" />} />
            <Route path="/explore" element={<Explore title="Explore" />} />
            <Route path="/:name/status/:id" element={<Tweetpage title="Tweet" />} />
            <Route path="/signup" element={!user ? <Modal /> : <Navigate to="/" />} />
          </Routes>
          <Rightbar />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
