import { Navigate, Route, Routes } from 'react-router-dom'
import {authRoutes, otherRoutes} from './routes/index.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import { useAuthStore } from './store/AuthStore.js';
import { useEffect } from 'react';
import {Toaster} from 'react-hot-toast'

// protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  

  if (!isAuthenticated) {
    return children;
    return <Navigate to='/login' replace />;
  }

  if (!user.isVerified) {
    return children;
    return <Navigate to='/verify-email' replace />;
  }

  return children;
};



const App = () => {
  const {checkAuth} = useAuthStore();
  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  
  return (
    <div >
      <div className='relative flex flex-col min-h-screen bg-black text-white  bg-radial-[at_50%_90%] from-violet-400/70 via-violet-900/70 to-violet-950/20'>

      <Navbar/>

      <main className="flex-grow">
        <Routes>
        {
        authRoutes.map(({path, element}, i) =>(
          <Route key={i} path={path} element={element}/>
        ))
        }
        {
        otherRoutes.map(({path, element}, i) =>(
          <Route key={i} path={path} element={<ProtectedRoute>{element}</ProtectedRoute>} />
        ))
        }
      </Routes>
      </main>
      
     
      <Footer/>

      </div>
      <Toaster />
    </div>
  )
}

export default App