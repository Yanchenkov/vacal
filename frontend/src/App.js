import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainComponent from './components/MainComponent';
import Login from './components/login/Login';
import './styles.css';
import {useAuth} from './contexts/AuthContext';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        <Route index element={
          !isAuthenticated ?
          <Navigate to="/login" /> :
          <Navigate to="/main" />
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/main/*" element={<MainComponent />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
