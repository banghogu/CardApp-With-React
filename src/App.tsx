import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ScrollToTop from './components/shared/ScrollToTop';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Navbar from './components/shared/Navbar';
import PrivateRoute from './components/auth/PrivateRoute';
import Apply from './pages/Apply';
import ApplyDone from './pages/ApplyDone';
import { Suspense } from 'react';
import MyPage from './pages/Mypage';
import CardPage from './pages/Card';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/card/:id" Component={CardPage} />
        <Route path="/signin" Component={SignIn} />
        <Route path="/signup" Component={SignUp} />
        <Route
          path="/apply/:id"
          element={
            <PrivateRoute>
              <Suspense fallback={<></>}>
                <Apply />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/apply/done"
          element={
            <PrivateRoute>
              <ApplyDone />
            </PrivateRoute>
          }
        />
        <Route
          path="/mypage"
          element={
            <PrivateRoute>
              <MyPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
