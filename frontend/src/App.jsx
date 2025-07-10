import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { GroupProvider } from './contexts/GroupContext';
import { GoalProvider } from './contexts/GoalContext';
import Login from './components/Login';
import CreateGroup from './components/CreateGroup';
import GroupList from './components/GroupList';
import GoalList from './components/GoalList';
import Register from './components/Register';
import CreateGoal from './components/CreateGoal';
import GroupDetails from './components/GroupDetails';
import { useEffect } from 'react';

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  if (!user) return null;
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  return (
    <nav className="bg-gray-800 p-4 flex gap-4 text-white">
      <Link to="/groups">Groups</Link>
      <Link to="/create-group">Create Group</Link>
      <Link to="/goals">Goals</Link>
      <Link to="/create-goal">Create Goal</Link>
      <button onClick={handleLogout} className="hover:underline focus:outline-none">Logout</button>
    </nav>
  );
}

function AppRoutes() {
 
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/groups" element={<PrivateRoute><GroupList /></PrivateRoute>} />
        <Route path="/groups/:id" element={<PrivateRoute><GroupDetails /></PrivateRoute>} />
        <Route path="/create-group" element={<PrivateRoute><CreateGroup /></PrivateRoute>} />
        <Route path="/goals" element={<PrivateRoute><GoalList /></PrivateRoute>} />
        <Route path="/create-goal" element={<PrivateRoute><CreateGoal /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/groups" />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <GroupProvider>
        <GoalProvider>
          <Router>
            <AppRoutes />
          </Router>
        </GoalProvider>
      </GroupProvider>
    </AuthProvider>
  );
}

export default App;
