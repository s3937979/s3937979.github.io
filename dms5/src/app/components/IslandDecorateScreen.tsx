import { useEffect, useMemo, useRef, useState, type PointerEvent } from "react";
import CoinIcon from "./CoinIcon";
import TabBar from "./TabBar";
import backIcon from "../../imports/back-icon.png";
import islandImage from "../../imports/island.png";
import storeIcon from "../../imports/store-icon.png";
import type { DecorateCategory, IslandDecoration, PurchasedDecorItem } from "../types";

interface IslandDecorateScreenProps {
  initialCategory?: DecorateCategory;
  onBack: () => void;
  onStoreClick: () => void;
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

function DraggableItem({
  item,
  onDragStart,
  onDragMove,
  onDragEnd,
}: {
  item: DragDecorItem;
  onDragStart: (event: PointerEvent<HTMLDivElement>, item: DragDecorItem) => void;
  onDragMove: (event: PointerEvent<HTMLDivElement>) => void;
  onDragEnd: (event: PointerEvent<HTMLDivElement>) => void;
}) {
  return (
    <div
      onPointerDown={(event) => onDragStart(event, item)}
      onPointerMove={onDragMove}
      onPointerUp={onDragEnd}
      onPointerCancel={onDragEnd}
      className="flex-shrink-0 w-24 h-24 bg-white rounded-2xl border-2 border-black/20 flex items-center justify-center cursor-grab touch-none active:cursor-grabbing"
    >
      <img src={item.image} alt={item.name} className="max-h-[72px] max-w-[72px] object-contain pointer-events-none" />
    </div>
  );
}

function IslandDropZone({
  droppedItems,
  onMoveDecorationStart,
  onMoveDecorationMove,
  onMoveDecorationEnd,
}: {
  droppedItems: IslandDecoration[];
  onMoveDecorationStart: (event: PointerEvent<HTMLImageElement>, item: IslandDecoration) => void;
  onMoveDecorationMove: (event: PointerEvent<HTMLImageElement>) => void;
  onMoveDecorationEnd: (event: PointerEvent<HTMLImageElement>) => void;
}) {
  return (
    <div id="island-drop-zone" className="relative w-[300px] max-w-full aspect-[360/408] mx-auto">
      <img src={islandImage} alt="Island" className="absolute inset-0 h-full w-full object-contain" />

      {droppedItems.map((item) => (
        <img
          key={item.id}
          src={item.image}
          alt={item.name}
          draggable={false}
          onPointerDown={(event) => onMoveDecorationStart(event, item)}
          onPointerMove={onMoveDecorationMove}
          onPointerUp={onMoveDecorationEnd}
          onPointerCancel={onMoveDecorationEnd}
          className="absolute w-12 h-12 object-contain cursor-grab touch-none active:cursor-grabbing"
          style={{ left: `${item.x}px`, top: `${item.y}px` }}
        />
      ))}
    </div>
  );
}

function IslandDecorateScreenContent({
  onBack,
  onStoreClick,
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
  const [showGuide, setShowGuide] = useState(true);
  const [draggingItem, setDraggingItem] = useState<{
    item: DragDecorItem;
    pointerId: number;
    clientX: number;
    clientY: number;
  } | null>(null);
  const [movingDecoration, setMovingDecoration] = useState<{ id: string; pointerId: number } | null>(null);
  const dropZoneRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowGuide(false);
    }, 3000);

    return () => window.clearTimeout(timer);
  }, []);

  const handleCategoryClick = (newCategory: DecorateViewCategory) => {
    setCategory(newCategory);
    if (newCategory !== "all") {
      onCategoryChange?.(newCategory);
    }
  };

  const addDecoration = (item: DragDecorItem, x: number, y: number) => {
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

  const getDropPosition = (clientX: number, clientY: number) => {
    const rect = dropZoneRef.current?.getBoundingClientRect();

    if (!rect) {
      return null;
    }

    const isInside = clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom;

    if (!isInside) {
      return null;
    }

    return {
      x: Math.max(0, Math.min(clientX - rect.left - 24, rect.width - 48)),
      y: Math.max(0, Math.min(clientY - rect.top - 24, rect.height - 48)),
    };
  };

  const handlePaletteDragStart = (event: PointerEvent<HTMLDivElement>, item: DragDecorItem) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    setDraggingItem({
      item,
      pointerId: event.pointerId,
      clientX: event.clientX,
      clientY: event.clientY,
    });
    event.preventDefault();
  };

  const handlePaletteDragMove = (event: PointerEvent<HTMLDivElement>) => {
    setDraggingItem((current) => current && current.pointerId === event.pointerId
      ? { ...current, clientX: event.clientX, clientY: event.clientY }
      : current);
  };

  const handlePaletteDragEnd = (event: PointerEvent<HTMLDivElement>) => {
    const currentDrag = draggingItem;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    setDraggingItem(null);

    if (!currentDrag || currentDrag.pointerId !== event.pointerId) {
      return;
    }

    const position = getDropPosition(event.clientX, event.clientY);
    if (position) {
      addDecoration(currentDrag.item, position.x, position.y);
    }
  };

  const moveDecoration = (id: string, clientX: number, clientY: number) => {
    const rect = dropZoneRef.current?.getBoundingClientRect();

    if (!rect) {
      return;
    }

    const nextX = Math.max(0, Math.min(clientX - rect.left - 24, rect.width - 48));
    const nextY = Math.max(0, Math.min(clientY - rect.top - 24, rect.height - 48));

    onDecorationsChange(
      decorations.map((decoration) => decoration.id === id ? { ...decoration, x: nextX, y: nextY } : decoration),
    );
  };

  const handleMoveDecorationStart = (event: PointerEvent<HTMLImageElement>, item: IslandDecoration) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    setMovingDecoration({ id: item.id, pointerId: event.pointerId });
    moveDecoration(item.id, event.clientX, event.clientY);
    event.preventDefault();
  };

  const handleMoveDecorationMove = (event: PointerEvent<HTMLImageElement>) => {
    if (!movingDecoration || movingDecoration.pointerId !== event.pointerId) {
      return;
    }

    moveDecoration(movingDecoration.id, event.clientX, event.clientY);
  };

  const handleMoveDecorationEnd = (event: PointerEvent<HTMLImageElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    setMovingDecoration(null);
  };

  const filteredItems = useMemo(
    () => (category === "all" ? purchasedItems : purchasedItems.filter((item) => item.category === category)),
    [category, purchasedItems],
  );

  const emptyMessage = category === "house" ? "Buy new house" : category === "nature" ? "Buy new nature item" : "Buy new items";

  return (
    <div className="relative h-full flex flex-col bg-[#8DC5E8]">
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
        <button onClick={onStoreClick} className="w-12 h-12 flex items-center justify-center">
          <img src={storeIcon} alt="Store" className="w-[41px] h-[41px] object-contain" />
        </button>
      </div>

      <div className="px-4 pt-2 pb-0 flex-shrink-0">
        <div className="flex items-start justify-end mb-1">
          <div className="flex items-center gap-2">
            <CoinIcon className="w-5 h-5" />
            <span className="text-black" style={{ fontSize: "16px", fontWeight: 700 }}>
              63
            </span>
          </div>
        </div>

        {showGuide && (
          <div className="absolute left-1/2 top-[92px] z-20 -translate-x-1/2 rounded-full border-2 border-black bg-white px-4 py-2 shadow-lg">
            <p className="whitespace-nowrap text-black" style={{ fontSize: "14px", fontWeight: 700 }}>
              Drag items onto your island
            </p>
          </div>
        )}

        <div ref={dropZoneRef}>
          <IslandDropZone
            droppedItems={decorations}
            onMoveDecorationStart={handleMoveDecorationStart}
            onMoveDecorationMove={handleMoveDecorationMove}
            onMoveDecorationEnd={handleMoveDecorationEnd}
          />
        </div>
      </div>

      <div className="mt-[-8px] flex-1 min-h-0 bg-white rounded-t-[36px] pt-4 flex flex-col border-t-2 border-black">
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
                <DraggableItem
                  key={item.id}
                  item={item}
                  onDragStart={handlePaletteDragStart}
                  onDragMove={handlePaletteDragMove}
                  onDragEnd={handlePaletteDragEnd}
                />
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

      {draggingItem && (
        <div
          className="pointer-events-none fixed z-50 h-12 w-12 -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${draggingItem.clientX}px`, top: `${draggingItem.clientY}px` }}
        >
          <img src={draggingItem.item.image} alt="" className="h-full w-full object-contain" />
        </div>
      )}
    </div>
  );
}

export default function IslandDecorateScreen(props: IslandDecorateScreenProps) {
  return <IslandDecorateScreenContent {...props} />;
}
