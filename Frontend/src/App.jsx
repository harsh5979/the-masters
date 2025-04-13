import { Suspense, useEffect, useState } from "react";
import "./App.css";
import {
  Routes,
  Route,
  BrowserRouter,
  useLocation,
  Navigate,
} from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Index from "./pages/Index";
import Ticket from "./pages/Ticket";
import EventsPage from "./pages/Events";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import LogoutPage from "./pages/Logout";
import ProfilePage from "./pages/ProfilePage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import CompleteProfilePage from "./pages/CompleteProfilePage";
import ClientDashboard from "./pages/ClientDashborad";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import EventDetails from "./components/EventDetails";
import ChildEventCard from "./components/ChildEventCard";

// Others
import { useAuthStore } from "../store/AuthStore";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import FreelancerDashboard from "./pages/FreelancerDashboard";
import JobsPage from "./pages/JobsPage";
import ContactPage from "./pages/contectPage";

const Show = ({ children }) => {
  const { user } = useAuthStore();
  if (user?.isVerified) {
    return <Navigate to="/complete-profile" replace />;
  }
  return children;
};

const RoleBasedRoute = ({ allowedRole, children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }
  if (!user?.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }
  if (!user?.profileCompleted) {
    return <Navigate to="/complete-profile" replace />;
  }
  if (user?.profile?.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }
  return children;
};


const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (isAuthenticated && user?.isVerified && user?.profileCompleted) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated && !user) {
    return <Navigate to="/login" replace />;
  }
  if (user?.isVerified && !user?.profileCompleted) {
    return <Navigate to="/complete-profile" replace />;
  }
  return children;
};

const VerifyedRoute = ({ children }) => {
  const { isEmail, user ,isprofileCompleted} = useAuthStore();
  if (!isEmail && !user?.isVerified && !isprofileCompleted ) {
    return <Navigate to="/signup" replace />;
  }
  if (user?.isVerified && !user?.profileCompleted ) {
    return <Navigate to="/complete-profile" replace />;
  }
  return children;
};

const ProfileCompletionRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (!user?.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }
  if (isAuthenticated && user?.isVerified && user?.profileCompleted) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  const { checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="animate-spin w-20 h-20" />
        <h1 className="text-2xl ml-4">Loading</h1>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <MainContent />
    </BrowserRouter>
  );
}

function MainContent() {
  const [stars, setStars] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const generateStars = (numStars) => {
      return Array.from({ length: numStars }, (_, i) => {
        const style = {
          top: `${Math.random() * 100}vh`,
          left: `${Math.random() * 100}vw`,
          animationDelay: `${Math.random() * 2}s`,
        };
        return <div key={i} className="star" style={style}></div>;
      });
    };
    setStars(generateStars(190));
  }, []);

  return (
    <div className="no-scrollbar overflow-x-hidden h-screen">
      <Suspense
        fallback={
          <div className="flex justify-center items-center min-h-screen">
            <Loader className="animate-spin w-20 h-20" />
            <h1 className="text-2xl ml-4">Loading</h1>
          </div>
        }
      >
        <div className="background-stars">{stars}</div>

        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <Routes>
            <Route
              path="/contactus"
              element={
                  <ContactPage />
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route path="/clientdashboard" element={
              <RoleBasedRoute allowedRole={"Client"}>
                <ClientDashboard />

              </RoleBasedRoute>
              } />
            <Route path="/jobs" element={
              // <RoleBasedRoute allowedRole={"Client"}>
                <JobsPage />

              // </RoleBasedRoute>
              } />
            <Route path="/dashboard" element={
              <RoleBasedRoute allowedRole={"Freelancer"}>

              <FreelancerDashboard />
              </RoleBasedRoute>
              } />

            <Route
              path="/login"
              element={
                <RedirectAuthenticatedUser>
                  <LoginPage />
                </RedirectAuthenticatedUser>
              }
            />
            <Route
              path="/signup"
              element={
                <Show>
                  <SignUpPage />
                </Show>
              }
            />
            <Route
              path="/verify-email"
              element={
                <VerifyedRoute>
                  <EmailVerificationPage />
                </VerifyedRoute>
              }
            />
            <Route
              path="/complete-profile"
              element={
                <ProfileCompletionRoute>
                  <CompleteProfilePage />
                </ProfileCompletionRoute>
              }
            />
            <Route path="/join" element={<Index />} />
            <Route path="/events" element={<EventsPage />} />
            <Route
              path="/forgot-password"
              element={
                <RedirectAuthenticatedUser>
                  <ForgotPasswordPage />
                </RedirectAuthenticatedUser>
              }
            />
            <Route
              path="/reset-password/:token"
              element={<ResetPasswordPage />}
            />
            <Route path="/events/:eventName" element={<ChildEventCard />} />
            <Route
              path="/events/:eventName/:activityName"
              element={<EventDetails />}
            />
            <Route path="/ticket" element={<Ticket />} />
            <Route path="/logout" element={<LogoutPage />} />
          </Routes>
        </div>

        <Footer />
        <Toaster />
      </Suspense>
    </div>
  );
}

export default App;
