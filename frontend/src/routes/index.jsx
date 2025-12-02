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


export const authRoutes = [
  { path: '/login', element: <LoginPage />},
  { path: '/signup', element: <SignupPage /> },
  { path: '/forgot-password', element: <ForgotPassword /> },
  { path: '/verify-email', element: <VerifyEmail /> },
  { path: '/reset-password/:token', element: <ResetPassword /> },
  
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