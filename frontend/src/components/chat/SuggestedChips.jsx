import { CHAT_SUGGESTED_CHIPS } from '../../constants/chat';

export default function SuggestedChips({ onChipClick }) {
  return (
    <div className="max-w-3xl mx-auto flex gap-2 mb-4 overflow-x-auto no-scrollbar pb-1">
      {CHAT_SUGGESTED_CHIPS.map((chip) => {
        const IconComponent = chip.icon;
        return (
          <button
            key={chip.id}
            onClick={() => onChipClick?.(chip)}
            className="whitespace-nowrap px-4 py-2 bg-white border border-outline-variant rounded-full text-on-surface hover:bg-primary-container hover:text-white hover:border-primary transition-all duration-200 text-label-md flex items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <IconComponent className="size-4 shrink-0" />
            {chip.label}
          </button>
        );
      })}
    </div>
  );
}
