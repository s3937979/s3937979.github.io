import { useState } from "react";
import TabBar from "./TabBar";

interface IslandMainScreenProps {
  onStoreClick: () => void;
  onFriendsClick: () => void;
  onDecorateClick: () => void;
  onCustomizeClick: () => void;
  onHomeClick: () => void;
  onMissionClick: () => void;
  onProfileClick: () => void;
  decorations: Array<{ id: string; type: string; x: number; y: number }>;
}

export default function IslandMainScreen({ onStoreClick, onFriendsClick, onDecorateClick, onCustomizeClick, onHomeClick, onMissionClick, onProfileClick, decorations }: IslandMainScreenProps) {
  const [islandName, setIslandName] = useState("Tom's Island");
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(islandName);

  const handleTitleClick = () => {
    setIsEditing(true);
    setEditValue(islandName);
  };

  const handleTitleBlur = () => {
    setIsEditing(false);
    if (editValue.trim()) {
      setIslandName(editValue);
    } else {
      setEditValue(islandName);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleTitleBlur();
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#8DC5E8]">
      {/* Yellow header */}
      <div className="bg-[#F4E4A3] px-4 py-4 flex items-center justify-between border-b-2 border-black flex-shrink-0">
        {/* Store icon */}
        <button onClick={onStoreClick} className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
          <div className="w-6 h-6 bg-white rounded-sm"></div>
        </button>

        {/* Title */}
        {isEditing ? (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleTitleBlur}
            onKeyDown={handleKeyDown}
            autoFocus
            className="text-black text-center bg-transparent border-b-2 border-black outline-none"
            style={{ fontSize: '20px', fontWeight: 700 }}
          />
        ) : (
          <h1
            onClick={handleTitleClick}
            className="text-black cursor-pointer"
            style={{ fontSize: '20px', fontWeight: 700 }}
          >
            {islandName}
          </h1>
        )}

        {/* Friends icon */}
        <button onClick={onFriendsClick} className="w-10 h-10 flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="black">
            <circle cx="11" cy="10" r="4" />
            <circle cx="21" cy="10" r="4" />
            <path d="M11 15c-3.5 0-6 2-6 4v3h12v-3c0-2-2.5-4-6-4z" />
            <path d="M21 15c-3.5 0-6 2-6 4v3h12v-3c0-2-2.5-4-6-4z" />
          </svg>
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 px-4 pt-4 overflow-hidden">
        {/* Coin counter and icons */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#F4C430] rounded-full border-2 border-black"></div>
            <span className="text-black" style={{ fontSize: '20px', fontWeight: 700 }}>63</span>
          </div>

          <div className="flex flex-col gap-3">
            {/* Decorate icon */}
            <button onClick={onDecorateClick} className="w-12 h-12 bg-[#7A9B5F] rounded-lg border-2 border-black flex items-center justify-center">
              <div className="w-6 h-6 bg-white rounded-sm"></div>
            </button>

            {/* Tomato Customize icon */}
            <button onClick={onCustomizeClick} className="w-12 h-12 bg-[#E74C3C] rounded-full border-2 border-black"></button>
          </div>
        </div>

        {/* Island illustration */}
        <div className="flex items-center justify-center">
          <div className="w-[280px] h-[320px] bg-[#7A9B5F] rounded-[40px] border-4 border-black relative">
            {/* Tree placeholders */}
            <div className="absolute top-8 left-8 w-10 h-12 bg-[#4A7C3C] rounded-lg border-2 border-black"></div>
            <div className="absolute bottom-16 right-16 w-10 h-12 bg-[#4A7C3C] rounded-lg border-2 border-black"></div>

            {/* Dropped decorations */}
            {decorations.map((item) => (
              <div
                key={item.id}
                className="absolute w-8 h-8 bg-gray-600 rounded-sm border border-black"
                style={{ left: `${item.x}px`, top: `${item.y}px` }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom tab bar */}
      <TabBar onTab1Click={onHomeClick} onTab2Click={onMissionClick} onTab3Click={() => {}} onTab4Click={onProfileClick} />
    </div>
  );
}
