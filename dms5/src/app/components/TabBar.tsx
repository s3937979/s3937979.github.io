interface TabBarProps {
  onTab1Click?: () => void;
  onTab2Click?: () => void;
  onTab3Click?: () => void;
  onTab4Click?: () => void;
}

export default function TabBar({ onTab1Click, onTab2Click, onTab3Click, onTab4Click }: TabBarProps) {
  return (
    <div className="flex-shrink-0 px-4 pb-5">
      <div className="bg-[#7A9B5F] rounded-full h-14 w-full flex items-center justify-around px-8">
        {/* Placeholder 1 */}
        <button
          onClick={onTab1Click}
          className="w-8 h-8 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
        >
          <span className="text-white" style={{ fontSize: '14px', fontWeight: 700 }}>
            1
          </span>
        </button>
        {/* Placeholder 2 */}
        <button
          onClick={onTab2Click}
          className="w-8 h-8 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
        >
          <span className="text-white" style={{ fontSize: '14px', fontWeight: 700 }}>
            2
          </span>
        </button>
        {/* Placeholder 3 */}
        <button
          onClick={onTab3Click}
          className="w-8 h-8 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
        >
          <span className="text-white" style={{ fontSize: '14px', fontWeight: 700 }}>
            3
          </span>
        </button>
        {/* Placeholder 4 */}
        <button
          onClick={onTab4Click}
          className="w-8 h-8 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
        >
          <span className="text-white" style={{ fontSize: '14px', fontWeight: 700 }}>
            4
          </span>
        </button>
      </div>
    </div>
  );
}
