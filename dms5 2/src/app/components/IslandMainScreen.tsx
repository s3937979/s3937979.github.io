import { useEffect, useRef, useState, type PointerEvent } from "react";
import CoinIcon from "./CoinIcon";
import TabBar from "./TabBar";
import customizeIcon from "../../imports/customize.png";
import editIcon from "../../imports/edit-icon.png";
import friendsIcon from "../../imports/friends-icon.png";
import islandImage from "../../imports/island.png";
import storeIcon from "../../imports/store-icon.png";
import tomatoImage from "../../imports/tomato.png";
import type { CharacterPosition, IslandDecoration, PurchasedCharacterItem } from "../types";

const characterSize = {
  width: 78,
  height: 92,
};

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
  equippedCharacterItem: PurchasedCharacterItem | null;
  characterPosition: CharacterPosition;
  onCharacterPositionChange: (position: CharacterPosition) => void;
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
  equippedCharacterItem,
  characterPosition,
  onCharacterPositionChange,
}: IslandMainScreenProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(islandName);
  const islandRef = useRef<HTMLDivElement>(null);
  const dragOffsetRef = useRef({ x: 0, y: 0 });

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

  const moveCharacter = (clientX: number, clientY: number) => {
    const islandRect = islandRef.current?.getBoundingClientRect();

    if (!islandRect) {
      return;
    }

    const maxX = islandRect.width - characterSize.width;
    const maxY = islandRect.height - characterSize.height;
    const nextX = clientX - islandRect.left - dragOffsetRef.current.x;
    const nextY = clientY - islandRect.top - dragOffsetRef.current.y;

    onCharacterPositionChange({
      x: Math.min(Math.max(nextX, 0), maxX),
      y: Math.min(Math.max(nextY, 0), maxY),
    });
  };

  const handleCharacterPointerDown = (event: PointerEvent<HTMLImageElement>) => {
    const characterRect = event.currentTarget.getBoundingClientRect();

    dragOffsetRef.current = {
      x: event.clientX - characterRect.left,
      y: event.clientY - characterRect.top,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
    event.preventDefault();
  };

  const handleCharacterPointerMove = (event: PointerEvent<HTMLImageElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
      return;
    }

    moveCharacter(event.clientX, event.clientY);
  };

  const handleCharacterPointerUp = (event: PointerEvent<HTMLImageElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
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
          <div ref={islandRef} className="relative w-[360px] h-[408px]">
            <img src={islandImage} alt="Island" className="absolute inset-0 h-full w-full object-contain" />

            <img
              src={equippedCharacterItem?.wornImage ?? tomatoImage}
              alt={equippedCharacterItem ? `${equippedCharacterItem.name} on island` : "Tomato on island"}
              draggable={false}
              onPointerDown={handleCharacterPointerDown}
              onPointerMove={handleCharacterPointerMove}
              onPointerUp={handleCharacterPointerUp}
              onPointerCancel={handleCharacterPointerUp}
              className="absolute z-10 h-[92px] w-[78px] touch-none cursor-grab object-contain active:cursor-grabbing"
              style={{ left: `${characterPosition.x}px`, top: `${characterPosition.y}px` }}
            />

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
