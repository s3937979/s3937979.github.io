import { useMemo, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CoinIcon from "./CoinIcon";
import TabBar from "./TabBar";
import backIcon from "../../imports/back-icon.png";
import islandImage from "../../imports/island.png";
import type { DecorateCategory, IslandDecoration, PurchasedDecorItem } from "../types";

interface IslandDecorateScreenProps {
  initialCategory?: DecorateCategory;
  onBack: () => void;
  onCategoryChange?: (category: DecorateCategory) => void;
  onHomeClick: () => void;
  onMissionClick: () => void;
  onProfileClick: () => void;
  islandName: string;
  purchasedItems: PurchasedDecorItem[];
  decorations: IslandDecoration[];
  onDecorationsChange: (decorations: IslandDecoration[]) => void;
}

type DragDecorItem = PurchasedDecorItem;
type DecorateViewCategory = DecorateCategory | "all";

function DraggableItem({ item }: { item: DragDecorItem }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "decoration-item",
    item,
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
      <img src={item.image} alt={item.name} className="max-h-[84px] max-w-[84px] object-contain pointer-events-none" />
    </div>
  );
}

function IslandDropZone({
  onDrop,
  droppedItems,
}: {
  onDrop: (item: DragDecorItem, x: number, y: number) => void;
  droppedItems: IslandDecoration[];
}) {
  const [, drop] = useDrop(() => ({
    accept: "decoration-item",
    drop: (item: DragDecorItem, monitor) => {
      const offset = monitor.getClientOffset();
      const dropZone = document.getElementById("island-drop-zone");
      if (!offset || !dropZone) {
        return;
      }

      const rect = dropZone.getBoundingClientRect();
      const x = Math.max(0, Math.min(offset.x - rect.left - 24, rect.width - 48));
      const y = Math.max(0, Math.min(offset.y - rect.top - 24, rect.height - 48));
      onDrop(item, x, y);
    },
  }));

  return (
    <div id="island-drop-zone" ref={drop} className="relative w-[320px] max-w-full aspect-[360/408] mx-auto">
      <img src={islandImage} alt="Island" className="absolute inset-0 h-full w-full object-contain" />

      {droppedItems.map((item) => (
        <img
          key={item.id}
          src={item.image}
          alt={item.name}
          className="absolute w-12 h-12 object-contain pointer-events-none"
          style={{ left: `${item.x}px`, top: `${item.y}px` }}
        />
      ))}
    </div>
  );
}

function IslandDecorateScreenContent({
  onBack,
  onCategoryChange,
  onHomeClick,
  onMissionClick,
  onProfileClick,
  islandName,
  purchasedItems,
  decorations,
  onDecorationsChange,
}: IslandDecorateScreenProps) {
  const [category, setCategory] = useState<DecorateViewCategory>("all");

  const handleCategoryClick = (newCategory: DecorateViewCategory) => {
    setCategory(newCategory);
    if (newCategory !== "all") {
      onCategoryChange?.(newCategory);
    }
  };

  const handleDrop = (item: DragDecorItem, x: number, y: number) => {
    onDecorationsChange([
      ...decorations,
      {
        id: `${item.id}-${Date.now()}`,
        itemId: item.id,
        name: item.name,
        category: item.category,
        image: item.image,
        x,
        y,
      },
    ]);
  };

  const filteredItems = useMemo(
    () => (category === "all" ? purchasedItems : purchasedItems.filter((item) => item.category === category)),
    [category, purchasedItems],
  );

  const emptyMessage = category === "house" ? "Buy new house" : category === "nature" ? "Buy new nature item" : "Buy new items";

  return (
    <div className="h-full flex flex-col bg-[#8DC5E8]">
      <div className="relative bg-[#F4E4A3] px-4 py-4 flex items-center justify-between border-b-2 border-black flex-shrink-0">
        <button onClick={onBack} className="w-12 h-12 flex items-center justify-center">
          <img src={backIcon} alt="Back" className="w-[41px] h-[41px] object-contain" />
        </button>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <h1
            className="text-black leading-none"
            style={{ fontSize: "32px", fontWeight: 700 }}
          >
            Decorate
          </h1>
        </div>
        <div className="w-12 h-12" />
      </div>

      <div className="px-4 pt-2 pb-1 flex-shrink-0">
        <div className="flex items-start justify-end mb-1">
          <div className="flex items-center gap-2">
            <CoinIcon className="w-5 h-5" />
            <span className="text-black" style={{ fontSize: "16px", fontWeight: 700 }}>
              63
            </span>
          </div>
        </div>

        <IslandDropZone onDrop={handleDrop} droppedItems={decorations} />
      </div>

      <div className="flex-1 bg-white/90 rounded-t-3xl pt-3 flex flex-col min-h-0 border-t-2 border-black/20">
        <div className="flex gap-2 mb-3 px-4 flex-shrink-0">
          <button
            onClick={() => handleCategoryClick("all")}
            className={`px-5 py-2 rounded-full border-2 border-black transition-colors ${
              category === "all" ? "bg-[#7A9B5F] text-black" : "bg-white text-black"
            }`}
            style={{ fontSize: "14px", fontWeight: 600 }}
          >
            All
          </button>
          <button
            onClick={() => handleCategoryClick("house")}
            className={`px-5 py-2 rounded-full border-2 border-black transition-colors ${
              category === "house" ? "bg-[#7A9B5F] text-black" : "bg-white text-black"
            }`}
            style={{ fontSize: "14px", fontWeight: 600 }}
          >
            House
          </button>
          <button
            onClick={() => handleCategoryClick("nature")}
            className={`px-5 py-2 rounded-full border-2 border-black transition-colors ${
              category === "nature" ? "bg-[#7A9B5F] text-black" : "bg-white text-black"
            }`}
            style={{ fontSize: "14px", fontWeight: 600 }}
          >
            Nature
          </button>
        </div>

        <div className="flex-1 overflow-x-auto overflow-y-hidden scrollbar-hide px-4 pb-24">
          {filteredItems.length > 0 ? (
            <div className="flex gap-3 items-start">
              {filteredItems.map((item) => (
                <DraggableItem key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-center text-black/70 px-8">
              <p style={{ fontSize: "18px", fontWeight: 600 }}>{emptyMessage}</p>
            </div>
          )}
        </div>
      </div>

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
