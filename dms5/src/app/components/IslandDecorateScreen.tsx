import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CoinIcon from "./CoinIcon";
import TabBar from "./TabBar";

type DecorateCategory = "house" | "nature";

interface IslandDecorateScreenProps {
  initialCategory?: DecorateCategory;
  onBack: () => void;
  onCategoryChange?: (category: DecorateCategory) => void;
  onHomeClick: () => void;
  onMissionClick: () => void;
  onProfileClick: () => void;
  decorations: DroppedItem[];
  onDecorationsChange: (decorations: DroppedItem[]) => void;
}

interface DroppedItem {
  id: string;
  type: string;
  x: number;
  y: number;
}

function DraggableItem({ id, type }: { id: string; type: string }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "decoration-item",
    item: { id, type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`flex-shrink-0 w-28 h-28 bg-white rounded-2xl border-2 border-black/20 flex items-center justify-center cursor-move ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div className="w-18 h-18 bg-gray-400 rounded-lg"></div>
    </div>
  );
}

function IslandDropZone({ onDrop, droppedItems, onBack }: { onDrop: (item: any, x: number, y: number) => void; droppedItems: DroppedItem[]; onBack: () => void }) {
  const [, drop] = useDrop(() => ({
    accept: "decoration-item",
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      if (offset) {
        const dropZone = document.getElementById("island-drop-zone");
        if (dropZone) {
          const rect = dropZone.getBoundingClientRect();
          const x = offset.x - rect.left;
          const y = offset.y - rect.top;
          onDrop(item, x, y);
        }
      }
    },
  }));

  return (
    <div
      id="island-drop-zone"
      ref={drop}
      onClick={onBack}
      className="w-full max-w-[260px] h-[120px] bg-[#7A9B5F] rounded-[24px] border-3 border-black relative cursor-pointer mx-auto"
    >
      {/* Tree placeholders */}
      <div className="absolute top-2 left-2 w-5 h-7 bg-[#4A7C3C] rounded-lg border-2 border-black pointer-events-none"></div>
      <div className="absolute bottom-4 right-6 w-5 h-7 bg-[#4A7C3C] rounded-lg border-2 border-black pointer-events-none"></div>

      {/* Dropped items */}
      {droppedItems.map((item) => (
        <div
          key={item.id}
          className="absolute w-4 h-4 bg-gray-600 rounded-sm border border-black pointer-events-none"
          style={{ left: `${item.x}px`, top: `${item.y}px` }}
        ></div>
      ))}
    </div>
  );
}

function IslandDecorateScreenContent({ initialCategory = "house", onBack, onCategoryChange, onHomeClick, onMissionClick, onProfileClick, decorations, onDecorationsChange }: IslandDecorateScreenProps) {
  const [category, setCategory] = useState<DecorateCategory>(initialCategory);

  const handleCategoryClick = (newCategory: DecorateCategory) => {
    setCategory(newCategory);
    if (onCategoryChange) {
      onCategoryChange(newCategory);
    }
  };

  const handleDrop = (item: any, x: number, y: number) => {
    onDecorationsChange([...decorations, { ...item, x, y, id: `${item.id}-${Date.now()}` }]);
  };

  const houseItems = [{ id: "house-1", type: "house" }];
  const natureItems = [
    { id: "nature-1", type: "palm" },
    { id: "nature-2", type: "pine" },
    { id: "nature-3", type: "bush" },
    { id: "nature-4", type: "flower" },
  ];

  const items = category === "house" ? houseItems : natureItems;

  return (
    <div className="h-full flex flex-col bg-[#8DC5E8]">
      {/* Yellow header */}
      <div className="bg-[#F4E4A3] px-4 py-3 flex items-center justify-center border-b-2 border-black flex-shrink-0">
        <h1 className="text-black" style={{ fontSize: '20px', fontWeight: 700 }}>
          Tom's Island
        </h1>
      </div>

      {/* Island area with coin counter */}
      <div className="px-4 pt-2 pb-1 flex-shrink-0">
        <div className="flex items-start justify-end mb-1">
          <div className="flex items-center gap-2">
            <CoinIcon className="w-5 h-5" />
            <span className="text-black" style={{ fontSize: '16px', fontWeight: 700 }}>63</span>
          </div>
        </div>

        <IslandDropZone onDrop={handleDrop} droppedItems={decorations} onBack={onBack} />
      </div>

      {/* White panel with horizontally scrollable items */}
      <div className="flex-1 bg-white/90 rounded-t-3xl pt-3 flex flex-col min-h-0 border-t-2 border-black/20">
        {/* Category buttons */}
        <div className="flex gap-2 mb-3 px-4 flex-shrink-0">
          <button
            onClick={() => handleCategoryClick("house")}
            className={`px-5 py-2 rounded-full border-2 border-black transition-colors ${
              category === "house" ? "bg-[#7A9B5F] text-black" : "bg-white text-black"
            }`}
            style={{ fontSize: '14px', fontWeight: 600 }}
          >
            House
          </button>
          <button
            onClick={() => handleCategoryClick("nature")}
            className={`px-5 py-2 rounded-full border-2 border-black transition-colors ${
              category === "nature" ? "bg-[#7A9B5F] text-black" : "bg-white text-black"
            }`}
            style={{ fontSize: '14px', fontWeight: 600 }}
          >
            Nature
          </button>
        </div>

        {/* Horizontally scrollable items */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden scrollbar-hide px-4 pb-24">
          <div className="flex gap-3 items-start">
            {items.map((item) => (
              <DraggableItem key={item.id} id={item.id} type={item.type} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom tab bar */}
      <div className="absolute bottom-0 left-0 right-0">
        <TabBar activeTab="island" onTab1Click={onHomeClick} onTab2Click={onMissionClick} onTab3Click={onBack} onTab4Click={onProfileClick} />
      </div>
    </div>
  );
}

export default function IslandDecorateScreen(props: IslandDecorateScreenProps) {
  return (
    <DndProvider backend={HTML5Backend}>
      <IslandDecorateScreenContent {...props} />
    </DndProvider>
  );
}
