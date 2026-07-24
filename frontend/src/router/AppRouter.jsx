import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import DashboardPage from '../pages/DashboardPage';
import UploadPage from '../pages/UploadPage';
import ChatPage from '../pages/ChatPage';
import SummaryPage from '../pages/SummaryPage';
import RevisionNotesPage from '../pages/RevisionNotesPage';
import FlashcardsPage from '../pages/FlashcardsPage';
import MCQPage from '../pages/MCQPage';
import VivaPage from '../pages/VivaPage';
import StudyPlannerPage from '../pages/StudyPlannerPage';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/upload" element={<UploadPage />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/summary" element={<SummaryPage />} />
      <Route path="/revision" element={<RevisionNotesPage />} />
      <Route path="/flashcards" element={<FlashcardsPage />} />
      <Route path="/mcq" element={<MCQPage />} />
      <Route path="/viva" element={<VivaPage />} />
      <Route path="/planner" element={<StudyPlannerPage />} />
    </Routes>
  );
};

export default AppRouter;
