import HomePage from '../pages/HomePage'
import SignupPage from '../pages/user/SignupPage'
import ProfilePage from '../pages/user/ProfilePage'
import TrackerPage from '../pages/user/TrackerPage'
import AboutPage from '../pages/AboutPage'
import VerifyEmail from '../pages/user/VerifyEmail'
import ResetPassword from '../pages/user/ResetPassword'
import PrivateJob from '../pages/job/PrivateJob'
import GovJob from '../pages/job/GovJob'
import PassionInput from '../pages/job/PassionInput'
import QualifyInput from '../pages/job/QualifyInput'
import CustomInput from '../pages/job/CustomInput'
import JobListPage from '../pages/job/JobListPage'
import RoadmapPage from '../pages/job/RoadmapPage'
import LoginPage from '../pages/user/LoginPage'
import ForgotPassword from '../pages/user/ForgotPassword'
import { useAuthStore } from '../store/AuthStore'
import { Navigate } from 'react-router-dom'


// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to='/' replace />;
  }

  return children;
};

export const authRoutes = [
  { path: '/login', element: <RedirectAuthenticatedUser><LoginPage /> </RedirectAuthenticatedUser>},
  { path: '/signup', element: <RedirectAuthenticatedUser><SignupPage /> </RedirectAuthenticatedUser>},
  { path: '/forgot-password', element: <RedirectAuthenticatedUser><ForgotPassword /></RedirectAuthenticatedUser> },
  { path: '/verify-email', element: <VerifyEmail /> },
  { path: '/reset-password/:token', element: <RedirectAuthenticatedUser><ResetPassword /></RedirectAuthenticatedUser> },
  
]

export const otherRoutes = [
  { path: '/', element: <HomePage /> },
  { path: '/profile', element: <ProfilePage /> },
  { path: '/tracker', element: <TrackerPage /> },
  { path: '/about', element: <AboutPage /> },

  { path: '/private', element: <PrivateJob /> },
  { path: '/gov', element: <GovJob /> },
  { path: '/passion', element: <PassionInput /> },
  { path: '/qualify', element: <QualifyInput /> },
  { path: '/custom', element: <CustomInput /> },
  { path: '/joblist', element: <JobListPage /> },
  { path: '/roadmap', element: <RoadmapPage /> },
]