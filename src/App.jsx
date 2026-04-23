// src/App.jsx
// Route definitions only. All layout and business logic lives in pages + components.
import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES }                  from '@/constants/routes';
import useAuthStore                from '@/stores/useAuthStore';
import AppShell                    from '@/components/layout/AppShell';

// Pages
import LandingPage          from '@/pages/LandingPage';
import LoginPage            from '@/pages/LoginPage';
import RegisterPage         from '@/pages/RegisterPage';
import ForgotPasswordPage   from '@/pages/ForgotPasswordPage';
import OnboardingPage       from '@/pages/OnboardingPage';
import DashboardPage        from '@/pages/DashboardPage';
import WardrobePage         from '@/pages/WardrobePage';
import SwipeSessionPage     from '@/pages/SwipeSessionPage';
import MyOutfitsPage        from '@/pages/MyOutfitsPage';
import OccasionStylingPage  from '@/pages/OccasionStylingPage';
import MixMatchPage         from '@/pages/MixMatchPage';
import OutfitCheckPage      from '@/pages/OutfitCheckPage';
import ShoppingPage         from '@/pages/ShoppingPage';
import PricingPage          from '@/pages/PricingPage';
import AccountPage          from '@/pages/AccountPage';
import PublicOutfitPage     from '@/pages/PublicOutfitPage';

/** Wraps routes that need authentication. Redirects to /login if not authenticated. */
function PrivateRoute({ children }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return isAuthenticated ? children : <Navigate to={ROUTES.LOGIN} replace />;
}

/** Authenticated routes rendered inside the persistent AppShell (sidebar + topbar). */
function AppRoutes() {
  return (
    <AppShell>
      <Routes>
        <Route path={ROUTES.DASHBOARD}  element={<DashboardPage />} />
        <Route path={ROUTES.WARDROBE}   element={<WardrobePage />} />
        <Route path={ROUTES.SWIPE}      element={<SwipeSessionPage />} />
        <Route path={ROUTES.MY_OUTFITS} element={<MyOutfitsPage />} />
        <Route path={ROUTES.OCCASION}   element={<OccasionStylingPage />} />
        <Route path={ROUTES.MIX_MATCH}  element={<MixMatchPage />} />
        <Route path={ROUTES.OUTFIT_CHECK} element={<OutfitCheckPage />} />
        <Route path={ROUTES.SHOPPING}   element={<ShoppingPage />} />
        <Route path={ROUTES.PRICING}    element={<PricingPage />} />
        <Route path={ROUTES.ACCOUNT}    element={<AccountPage />} />
        {/* Fallback inside app */}
        <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
      </Routes>
    </AppShell>
  );
}

export default function App() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return (
    <Routes>
      {/* Public routes */}
      <Route path={ROUTES.LANDING}         element={<LandingPage />} />
      <Route path={ROUTES.LOGIN}           element={<LoginPage />} />
      <Route path={ROUTES.REGISTER}        element={<RegisterPage />} />
      <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
      <Route path={ROUTES.ONBOARDING}      element={<OnboardingPage />} />
      <Route path={ROUTES.PUBLIC_OUTFIT}   element={<PublicOutfitPage />} />

      {/* Authenticated app shell */}
      <Route
        path="/*"
        element={
          <PrivateRoute>
            <AppRoutes />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
