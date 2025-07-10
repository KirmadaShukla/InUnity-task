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
import { useEffect, useState } from 'react';

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  if (!user) return null;
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  const navLinks = (
    <>
      <Link to="/groups" onClick={() => setMenuOpen(false)}>Groups</Link>
      <Link to="/create-group" onClick={() => setMenuOpen(false)}>Create Group</Link>
      <Link to="/goals" onClick={() => setMenuOpen(false)}>Goals</Link>
      <Link to="/create-goal" onClick={() => setMenuOpen(false)}>Create Goal</Link>
      <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="hover:underline focus:outline-none">Logout</button>
    </>
  );
  return (
    <nav className="bg-gray-800 p-4 flex items-center justify-between text-white relative">
      <div className="text-xl font-bold tracking-tight">InUnity</div>
      {/* Desktop nav */}
      <div className="gap-4 hidden md:flex">{navLinks}</div>
      {/* Hamburger icon for mobile */}
      <button
        className="md:hidden focus:outline-none z-20"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
      >
        {menuOpen ? (
          // Close icon
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          // Hamburger icon
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>
      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-10 md:hidden" onClick={() => setMenuOpen(false)}></div>
      )}
      <div
        className={`fixed top-0 right-0 h-full w-2/3 max-w-xs bg-gray-900 shadow-lg z-30 transform transition-transform duration-300 md:hidden flex flex-col gap-6 p-8 pt-20 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ minWidth: '220px' }}
      >
        {navLinks}
      </div>
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
