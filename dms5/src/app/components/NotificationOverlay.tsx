interface NotificationOverlayProps {
  onClose: () => void;
}

export default function NotificationOverlay({ onClose }: NotificationOverlayProps) {
  return (
    <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-50" onClick={onClose}>
      <div
        className="bg-[#7A9B5F] rounded-[24px] w-[220px] shadow-xl border-[3px] border-black/10"
        style={{ height: '290px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-3 pt-2.5 pb-2">
          <h2 className="text-black" style={{ fontSize: '14px', fontWeight: 700 }}>
            Notification
          </h2>
          <button onClick={onClose} className="text-black">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Notification cards */}
        <div className="px-2 space-y-2">
          {/* Card 1 */}
          <div className="bg-white rounded-lg p-2">
            <div className="flex items-start justify-between mb-1">
              <h3 className="text-black flex-1 pr-1" style={{ fontSize: '10px', fontWeight: 700, lineHeight: '1.2' }}>
                You're close to your goal!
              </h3>
              <span className="text-black/50 text-right whitespace-nowrap" style={{ fontSize: '7.5px', fontWeight: 400 }}>
                5m ago
              </span>
            </div>
            <p className="text-black/70" style={{ fontSize: '8.5px', fontWeight: 400, lineHeight: '1.2' }}>
              Only 1,572 steps left today
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-lg p-2">
            <div className="flex items-start justify-between mb-1">
              <h3 className="text-black flex-1 pr-1" style={{ fontSize: '10px', fontWeight: 700, lineHeight: '1.2' }}>
                You earned 6 coins today
              </h3>
              <span className="text-black/50 text-right whitespace-nowrap" style={{ fontSize: '7.5px', fontWeight: 400 }}>
                1h ago
              </span>
            </div>
            <p className="text-black/70" style={{ fontSize: '8.5px', fontWeight: 400, lineHeight: '1.2' }}>
              Keep walking to earn more
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-lg p-2">
            <div className="flex items-start justify-between mb-1">
              <h3 className="text-black flex-1 pr-1" style={{ fontSize: '10px', fontWeight: 700, lineHeight: '1.2' }}>
                Mission completed!
              </h3>
              <span className="text-black/50 text-right whitespace-nowrap" style={{ fontSize: '7.5px', fontWeight: 400 }}>
                3 days ago
              </span>
            </div>
            <p className="text-black/70" style={{ fontSize: '8.5px', fontWeight: 400, lineHeight: '1.2' }}>
              You earned 18 bonus coins
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
