import { Search, MoreVertical } from 'lucide-react';

export default function ChatHeader() {
  return (
    <div className="hidden md:flex items-center justify-between px-6 h-16 bg-white shadow-[0_1px_0_0_rgba(0,0,0,0.05)] z-10 shrink-0">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center">
          <span className="text-white font-bold text-lg" aria-hidden="true">AI</span>
        </div>
        <div>
          <h2 className="font-label-md text-on-surface">CampusMind AI</h2>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-[12px] text-on-surface-variant">Online &amp; Thinking</span>
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
