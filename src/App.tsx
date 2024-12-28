import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Onboarding from './pages/Onboarding';
import SignUp from './pages/auth/SignUp';
import Login from './pages/auth/Login';
import FaceSetup from './pages/auth/FaceSetup';
import PinSetup from './pages/auth/PinSetup';
import PinScreen from './components/auth/PinScreen';
import HomePage from './pages/Home';

interface PrivateRouteProps {
  children: React.ReactNode;
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const { session, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return session ? children : <Navigate to="/onboarding" />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/auth">
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="face-setup" element={<FaceSetup />} />
          <Route path="pin-setup" element={<PinSetup />} />
        </Route>
        <Route path="/pin" element={<PinScreen />} />
        <Route 
          path="/home" 
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          } 
        />
        <Route path="/" element={<Navigate to="/onboarding" />} />
      </Routes>
    </Router>
  );
}