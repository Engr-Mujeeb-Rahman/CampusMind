import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import DashboardPage from '../pages/DashboardPage';
import UploadPage from '../pages/UploadPage';
import LibraryPage from '../pages/LibraryPage';
import DocumentDetailPage from '../pages/DocumentDetailPage';
import ChatPage from '../pages/ChatPage';
import SummaryPage from '../pages/SummaryPage';
import RevisionNotesPage from '../pages/RevisionNotesPage';
import FlashcardsPage from '../pages/FlashcardsPage';
import MCQPage from '../pages/MCQPage';
import VivaPage from '../pages/VivaPage';
import StudyPlannerPage from '../pages/StudyPlannerPage';
import HistoryPage from '../pages/HistoryPage';
import apiClient from '../services/apiClient';

function ProtectedRoute({ children }) {
  const isAuthenticated = apiClient.auth.isAuthenticated();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/upload" element={<ProtectedRoute><UploadPage /></ProtectedRoute>} />
      <Route path="/library" element={<ProtectedRoute><LibraryPage /></ProtectedRoute>} />
      <Route path="/documents/:id" element={<ProtectedRoute><DocumentDetailPage /></ProtectedRoute>} />
      <Route path="/chat" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
      <Route path="/summary" element={<ProtectedRoute><SummaryPage /></ProtectedRoute>} />
      <Route path="/revision" element={<ProtectedRoute><RevisionNotesPage /></ProtectedRoute>} />
      <Route path="/flashcards" element={<ProtectedRoute><FlashcardsPage /></ProtectedRoute>} />
      <Route path="/mcq" element={<ProtectedRoute><MCQPage /></ProtectedRoute>} />
      <Route path="/viva" element={<ProtectedRoute><VivaPage /></ProtectedRoute>} />
      <Route path="/planner" element={<ProtectedRoute><StudyPlannerPage /></ProtectedRoute>} />
      <Route path="/history" element={<ProtectedRoute><HistoryPage /></ProtectedRoute>} />
    </Routes>
  );
};

export default AppRouter;
