import { Search, MoreVertical, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ChatHeader({ documentId }) {
  const navigate = useNavigate();

  return (
    <div className="hidden md:flex items-center justify-between px-6 h-16 bg-white shadow-[0_1px_0_0_rgba(0,0,0,0.05)] z-10 shrink-0">
      <div className="flex items-center gap-4">
        {documentId && (
          <button
            onClick={() => navigate(-1)}
            className="p-1.5 hover:bg-surface-container-low rounded-lg transition-colors text-on-surface-variant"
            aria-label="Go back"
          >
            <ArrowLeft className="size-5" />
          </button>
        )}
        <div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center">
          <span className="text-white font-bold text-lg" aria-hidden="true">AI</span>
        </div>
        <div>
          <h2 className="font-label-md text-on-surface">
            {documentId ? 'Document Chat' : 'CampusMind AI'}
          </h2>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-[12px] text-on-surface-variant">Online &amp; Ready</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-surface-container-low rounded-full transition-colors text-on-surface-variant focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" aria-label="Search conversations">
          <Search className="size-5" aria-hidden="true" />
        </button>
        <button className="p-2 hover:bg-surface-container-low rounded-full transition-colors text-on-surface-variant focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" aria-label="More options">
          <MoreVertical className="size-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
