import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { UserProvider } from './containers/UserContext.jsx';

import ProtectedRoute from './containers/ProtectedRoute.jsx';

const HomePage = lazy(() => import('./pages/HomePage.jsx'));
const LoginPage = lazy(() => import('./pages/LoginPage.jsx'));
const AdminPage = lazy(() => import('./pages/AdminPage.jsx'));

import './App.css';

function App() {
  return (
    <>
      <UserProvider>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />

            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </UserProvider>
    </>
  );
}

export default App;
