import { Navigate, Route, Routes } from 'react-router-dom'
import {authRoutes, otherRoutes} from './routes/index.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import { useAuthStore } from './store/AuthStore.js';
import { useEffect } from 'react';
import {Toaster} from 'react-hot-toast'
import NotFoundPage from './pages/NotFoundPage.jsx';

// protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  

  if (!isAuthenticated) {
    
    return <Navigate to='/login' replace />;
  }

  if (!user.isVerified) {

    return <Navigate to='/verify-email' replace />;
  }

  return children;
};

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to='/' replace />;
  }

  return children;
};




const App = () => {
  const {checkAuth} = useAuthStore();
  useEffect(() => {
    checkAuth()
  }, [checkAuth]);
  
  return (
    <div >
      <div className='relative flex flex-col min-h-screen bg-black text-white  bg-radial-[at_50%_90%] from-violet-400/70 via-violet-900/70 to-violet-950/20'>

      <Navbar/>

      <main className="flex-grow">
        <Routes>
        {
        authRoutes.map(({path, element}, i) =>(
          <Route key={i} path={path} element={<RedirectAuthenticatedUser>{element}</RedirectAuthenticatedUser>}/>
        ))
        }
        {
        otherRoutes.map(({path, element}, i) =>(
          <Route key={i} path={path} element={<ProtectedRoute>{element}</ProtectedRoute>} />
        ))
        }
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
      </main>
      
     
      <Footer/>

      </div>
      <Toaster />
    </div>
  )
}

export default App