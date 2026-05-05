import { useEffect, useState } from "react";
import CoinIcon from "./CoinIcon";
import TabBar from "./TabBar";
import customizeIcon from "../../imports/customize.png";
import editIcon from "../../imports/edit-icon.png";
import friendsIcon from "../../imports/friends-icon.png";
import islandImage from "../../imports/island.png";
import storeIcon from "../../imports/store-icon.png";
import type { IslandDecoration } from "../types";

interface IslandMainScreenProps {
  onStoreClick: () => void;
  onFriendsClick: () => void;
  onDecorateClick: () => void;
  onCustomizeClick: () => void;
  onHomeClick: () => void;
  onMissionClick: () => void;
  onProfileClick: () => void;
  islandName: string;
  onIslandNameChange: (name: string) => void;
  decorations: IslandDecoration[];
}

export default function IslandMainScreen({
  onStoreClick,
  onFriendsClick,
  onDecorateClick,
  onCustomizeClick,
  onHomeClick,
  onMissionClick,
  onProfileClick,
  islandName,
  onIslandNameChange,
  decorations,
}: IslandMainScreenProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(islandName);

  useEffect(() => {
    if (!isEditing) {
      setEditValue(islandName);
    }
  }, [isEditing, islandName]);

  const handleTitleClick = () => {
    setIsEditing(true);
    setEditValue(islandName);
  };

  const handleTitleBlur = () => {
    setIsEditing(false);
    if (editValue.trim()) {
      onIslandNameChange(editValue.trim());
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
      <div className="relative bg-[#F4E4A3] px-4 py-4 flex items-center justify-between border-b-2 border-black flex-shrink-0">
        {/* Store icon */}
        <button onClick={onStoreClick} className="w-12 h-12 flex items-center justify-center">
          <img src={storeIcon} alt="Store" className="w-[41px] h-[41px] object-contain" />
        </button>

        {/* Title */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {isEditing ? (
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={handleTitleBlur}
              onKeyDown={handleKeyDown}
              autoFocus
              className="w-40 bg-transparent text-center text-black outline-none border-b-2 border-black"
              style={{ fontSize: '32px', fontWeight: 700 }}
            />
          ) : (
            <h1
              onClick={handleTitleClick}
              className="text-black cursor-pointer border-b-2 border-black leading-none"
              style={{ fontSize: '32px', fontWeight: 700 }}
            >
              {islandName}
            </h1>
          )}
        </div>

        {/* Friends icon */}
        <button onClick={onFriendsClick} className="w-12 h-12 flex items-center justify-center">
          <img src={friendsIcon} alt="Friends" className="w-[41px] h-[41px] object-contain" />
        </button>
      </div>

      {/* Main content */}
      <div className="relative flex-1 px-4 pt-4 overflow-hidden">
        {/* Coin counter and icons */}
        <div className="absolute left-4 right-4 top-4 z-10 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <CoinIcon className="w-7 h-7" />
            <span className="text-black" style={{ fontSize: '20px', fontWeight: 700 }}>63</span>
          </div>

          <div className="flex flex-col gap-3">
            {/* Decorate icon */}
            <button onClick={onDecorateClick} className="w-14 h-14 flex items-center justify-center">
              <img src={editIcon} alt="Decorate" className="w-[51px] h-[51px] object-contain" />
            </button>

            {/* Tomato Customize icon */}
            <button onClick={onCustomizeClick} className="w-14 h-14 flex items-center justify-center">
              <img src={customizeIcon} alt="Customize" className="w-[51px] h-[51px] object-contain" />
            </button>
          </div>
        </div>

        {/* Island illustration */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[360px] h-[408px]">
            <img src={islandImage} alt="Island" className="absolute inset-0 h-full w-full object-contain" />

            {/* Dropped decorations */}
            {decorations.map((item) => (
              <img
                key={item.id}
                src={item.image}
                alt={item.name}
                className="absolute w-12 h-12 object-contain pointer-events-none"
                style={{ left: `${item.x}px`, top: `${item.y}px` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom tab bar */}
      <TabBar activeTab="island" onTab1Click={onHomeClick} onTab2Click={onMissionClick} onTab3Click={() => {}} onTab4Click={onProfileClick} />
    </div>
  );
}
