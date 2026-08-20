import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

import LandingPage from '../pages/shared/LandingPage';
import LoginPage from '../pages/shared/LoginPage';
import SignUpPage from '../pages/shared/SignUpPage';
import OnboardingInterests from '../pages/shared/OnboardingInterests';
import ContentDetailPage from '../pages/shared/ContentDetailPage';

import HomeFeedPage from '../pages/user/HomeFeedPage';
import ExplorePage from '../pages/user/ExplorePage';
import ProfilePage from '../pages/user/ProfilePage';
import WishlistPage from '../pages/user/WishlistPage';
import NotificationsPage from '../pages/user/NotificationsPage';

import WriterDashboardPage from '../pages/writer/WriterDashboardPage';
import CreateContentPage from '../pages/writer/CreateContentPage';

import AdminDashboardPage from '../pages/admin/AdminDashboardPage';
import UserManagementPage from '../pages/admin/UserManagementPage';
import ContentModerationPage from '../pages/admin/ContentModerationPage';
import CategoryManagementPage from '../pages/admin/CategoryManagementPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/onboarding" element={<OnboardingInterests />} />
      <Route path="/content/:id" element={<ContentDetailPage />} />

      <Route path="/home" element={<ProtectedRoute allowedRoles={['user', 'writer', 'admin']}><HomeFeedPage /></ProtectedRoute>} />
      <Route path="/explore" element={<ProtectedRoute allowedRoles={['user', 'writer', 'admin']}><ExplorePage /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute allowedRoles={['user', 'writer', 'admin']}><ProfilePage /></ProtectedRoute>} />
      <Route path="/wishlist" element={<ProtectedRoute allowedRoles={['user', 'writer', 'admin']}><WishlistPage /></ProtectedRoute>} />
      <Route path="/notifications" element={<ProtectedRoute allowedRoles={['user', 'writer', 'admin']}><NotificationsPage /></ProtectedRoute>} />

      <Route path="/writer/dashboard" element={<ProtectedRoute allowedRoles={['writer', 'admin']}><WriterDashboardPage /></ProtectedRoute>} />
      <Route path="/writer/create" element={<ProtectedRoute allowedRoles={['writer', 'admin']}><CreateContentPage /></ProtectedRoute>} />

      <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboardPage /></ProtectedRoute>} />
      <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['admin']}><UserManagementPage /></ProtectedRoute>} />
      <Route path="/admin/moderation" element={<ProtectedRoute allowedRoles={['admin']}><ContentModerationPage /></ProtectedRoute>} />
      <Route path="/admin/categories" element={<ProtectedRoute allowedRoles={['admin']}><CategoryManagementPage /></ProtectedRoute>} />

      <Route path="*" element={<LandingPage />} />
    </Routes>
  );
}