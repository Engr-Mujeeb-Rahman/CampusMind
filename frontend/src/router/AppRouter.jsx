import { Routes, Route } from "react-router-dom";

import LandingPage from "../pages/LandingPage";
import DashboardPage from "../pages/DashboardPage";
import UploadPage from "../pages/UploadPage";
import ChatPage from "../pages/ChatPage";
import SummaryPage from "../pages/SummaryPage";
import RevisionPage from "../pages/RevisionPage";
import FlashcardsPage from "../pages/FlashcardsPage";
import MCQPage from "../pages/MCQPage";
import VivaPage from "../pages/VivaPage";
import PlannerPage from "../pages/PlannerPage";
import SettingsPage from "../pages/SettingsPage";
import NotFound from "../pages/NotFound";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/upload" element={<UploadPage />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/summary" element={<SummaryPage />} />
      <Route path="/revision" element={<RevisionPage />} />
      <Route path="/flashcards" element={<FlashcardsPage />} />
      <Route path="/mcq" element={<MCQPage />} />
      <Route path="/viva" element={<VivaPage />} />
      <Route path="/planner" element={<PlannerPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRouter;