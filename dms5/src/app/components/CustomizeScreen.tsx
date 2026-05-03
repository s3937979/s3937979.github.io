import { useState } from "react";
import TabBar from "./TabBar";

interface CustomizeScreenProps {
  onStoreClick: () => void;
  onFriendsClick: () => void;
  onHomeClick: () => void;
  onMissionClick: () => void;
  onIslandClick: () => void;
  onProfileClick: () => void;
}

export default function CustomizeScreen({ onStoreClick, onFriendsClick, onHomeClick, onMissionClick, onIslandClick, onProfileClick }: CustomizeScreenProps) {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const items = [
    { id: 1, name: "Blue Pants" },
    { id: 2, name: "Black Shoes" },
    { id: 3, name: "Black Hair" },
  ];

  const handleWear = (itemId: number) => {
    setSelectedItem(itemId);
  };

  return (
    <div className="h-full flex flex-col bg-[#EDEDEE]">
      {/* Yellow header */}
      <div className="bg-[#F4E4A3] px-4 py-4 flex items-center justify-between border-b-2 border-black flex-shrink-0">
        {/* Store icon */}
        <button onClick={onStoreClick} className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
          <div className="w-6 h-6 bg-white rounded-sm"></div>
        </button>

        {/* Title */}
        <h1
          onClick={onIslandClick}
          className="text-black cursor-pointer hover:font-extrabold transition-all"
          style={{ fontSize: '20px', fontWeight: 700 }}
        >
          Tom's Island
        </h1>

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

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Coin counter */}
        <div className="flex justify-end px-4 pt-3 pb-2 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#F4C430] rounded-full border-2 border-black"></div>
            <span className="text-black" style={{ fontSize: '18px', fontWeight: 700 }}>63</span>
          </div>
        </div>

        {/* Tomato character */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-[200px] h-[200px] relative">
            {/* Default tomato placeholder */}
            <div className="w-full h-full bg-[#E74C3C] rounded-full border-4 border-black relative">
              {/* Visual changes based on selected item */}
              {selectedItem === 1 && (
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-24 h-16 bg-blue-600 border-2 border-black rounded-sm"></div>
              )}
              {selectedItem === 2 && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-20 h-8 bg-black border-2 border-white rounded-lg"></div>
              )}
              {selectedItem === 3 && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-16 bg-black border-2 border-white rounded-b-full"></div>
              )}
            </div>
          </div>
        </div>

        {/* Separator line */}
        <div className="w-full h-0.5 bg-black flex-shrink-0"></div>

        {/* White scrollable items panel */}
        <div className="bg-white/90 pt-4 pb-24 flex-shrink-0">
          <div className="overflow-x-auto overflow-y-hidden scrollbar-hide px-4">
            <div className="flex gap-4 items-start">
              {items.map((item) => (
                <div
                  key={item.id}
                  className={`flex-shrink-0 w-36 rounded-2xl border-2 border-black/20 p-3 transition-colors ${
                    selectedItem === item.id ? 'bg-gray-300' : 'bg-white'
                  }`}
                >
                  {/* Item image placeholder */}
                  <div className="w-full h-24 bg-gray-200 rounded-lg border-2 border-black/20 mb-3 flex items-center justify-center">
                    <div className="w-16 h-16 bg-gray-400 rounded"></div>
                  </div>

                  {/* Wear button */}
                  <button
                    onClick={() => handleWear(item.id)}
                    className="w-full bg-[#7A9B5F] text-black px-4 py-2 rounded-lg border-2 border-black/20"
                    style={{ fontSize: '12px', fontWeight: 600 }}
                  >
                    Wear
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fixed bottom tab bar */}
      <div className="absolute bottom-0 left-0 right-0">
        <TabBar onTab1Click={onHomeClick} onTab2Click={onMissionClick} onTab3Click={onIslandClick} onTab4Click={onProfileClick} />
      </div>
    </div>
  );
}
