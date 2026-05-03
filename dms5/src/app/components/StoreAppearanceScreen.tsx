import { useState, useEffect } from "react";
import TabBar from "./TabBar";

interface StoreAppearanceScreenProps {
  onBack: () => void;
  onDecorClick: () => void;
  onClosetClick: () => void;
  onHomeClick: () => void;
  onMissionClick: () => void;
  onIslandClick: () => void;
  onProfileClick: () => void;
}

type SubCategory = "hair" | "face" | "body";

interface AppearanceItem {
  id: string;
  name: string;
  price: number;
  subcategory: SubCategory;
}

export default function StoreAppearanceScreen({ onBack, onDecorClick, onClosetClick, onHomeClick, onMissionClick, onIslandClick, onProfileClick }: StoreAppearanceScreenProps) {
  const [activeSubcategory, setActiveSubcategory] = useState<SubCategory>("hair");
  const [userCoins, setUserCoins] = useState(63);
  const [selectedItem, setSelectedItem] = useState<AppearanceItem | null>(null);
  const [message, setMessage] = useState<"" | "not-enough" | "purchased">("");
  const [wornItem, setWornItem] = useState<AppearanceItem | null>(null);

  const hairItems: AppearanceItem[] = [
    { id: "h1", name: "Bowl cut", price: 20, subcategory: "hair" },
    { id: "h2", name: "Top knot", price: 30, subcategory: "hair" },
    { id: "h3", name: "Wavy hair", price: 25, subcategory: "hair" },
  ];

  const faceItems: AppearanceItem[] = [
    { id: "f1", name: "Sunglasses", price: 15, subcategory: "face" },
    { id: "f2", name: "Mustache", price: 10, subcategory: "face" },
    { id: "f3", name: "Freckles", price: 8, subcategory: "face" },
  ];

  const bodyItems: AppearanceItem[] = [
    { id: "bo1", name: "Spots", price: 12, subcategory: "body" },
    { id: "bo2", name: "Stripes", price: 18, subcategory: "body" },
    { id: "bo3", name: "Stars", price: 15, subcategory: "body" },
  ];

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleBuy = () => {
    if (selectedItem) {
      if (userCoins >= selectedItem.price) {
        setUserCoins(userCoins - selectedItem.price);
        setMessage("purchased");
        setSelectedItem(null);
      } else {
        setMessage("not-enough");
      }
    }
  };

  const handleCancel = () => {
    setSelectedItem(null);
  };

  const getCurrentItems = () => {
    switch (activeSubcategory) {
      case "hair":
        return hairItems;
      case "face":
        return faceItems;
      case "body":
        return bodyItems;
      default:
        return hairItems;
    }
  };

  const items = getCurrentItems();

  return (
    <div className="h-full flex flex-col bg-[#EDEDEE]">
      {/* Header */}
      <div className="bg-[#F4E4A3] px-4 py-4 flex items-center justify-between border-b-2 border-black flex-shrink-0">
        <button onClick={onBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <h1 className="text-black" style={{ fontSize: '24px', fontWeight: 700 }}>
          Store
        </h1>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-[#F4C430] rounded-full border-2 border-black"></div>
          <span className="text-black" style={{ fontSize: '18px', fontWeight: 700 }}>{userCoins}</span>
        </div>
      </div>

      {/* Category buttons */}
      <div className="flex gap-2 px-4 py-3 border-b-2 border-black flex-shrink-0">
        <button
          onClick={onDecorClick}
          className="px-5 py-2 rounded-full border-2 border-black transition-colors bg-white text-black"
          style={{ fontSize: '14px', fontWeight: 600 }}
        >
          Decor
        </button>
        <button
          onClick={onClosetClick}
          className="px-5 py-2 rounded-full border-2 border-black transition-colors bg-white text-black"
          style={{ fontSize: '14px', fontWeight: 600 }}
        >
          Closet
        </button>
        <button
          className="px-5 py-2 rounded-full border-2 border-black transition-colors bg-[#7A9B5F] text-black"
          style={{ fontSize: '14px', fontWeight: 600 }}
        >
          Appearance
        </button>
      </div>

      {/* Tomato character */}
      <div className="flex items-center justify-center py-6 flex-shrink-0">
        <div className="w-[180px] h-[180px] bg-[#E74C3C] rounded-full border-4 border-black relative">
          {/* Visual changes based on worn item */}
          {wornItem && wornItem.subcategory === "hair" && wornItem.id === "h1" && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-12 bg-black border-2 border-white rounded-b-full"></div>
          )}
          {wornItem && wornItem.subcategory === "hair" && wornItem.id === "h2" && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-black border-2 border-white rounded-full"></div>
          )}
          {wornItem && wornItem.subcategory === "face" && wornItem.id === "f1" && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-6 bg-black border-2 border-white rounded-lg"></div>
          )}
        </div>
      </div>

      {/* Separator line */}
      <div className="w-full h-0.5 bg-black flex-shrink-0"></div>

      {/* Subcategory buttons */}
      <div className="flex gap-2 px-4 py-3 flex-shrink-0">
        <button
          onClick={() => setActiveSubcategory("hair")}
          className={`px-5 py-2 rounded-full border-2 border-black transition-colors ${
            activeSubcategory === "hair" ? "bg-[#7A9B5F] text-black" : "bg-white text-black"
          }`}
          style={{ fontSize: '14px', fontWeight: 600 }}
        >
          Hair
        </button>
        <button
          onClick={() => setActiveSubcategory("face")}
          className={`px-5 py-2 rounded-full border-2 border-black transition-colors ${
            activeSubcategory === "face" ? "bg-[#7A9B5F] text-black" : "bg-white text-black"
          }`}
          style={{ fontSize: '14px', fontWeight: 600 }}
        >
          Face
        </button>
        <button
          onClick={() => setActiveSubcategory("body")}
          className={`px-5 py-2 rounded-full border-2 border-black transition-colors ${
            activeSubcategory === "body" ? "bg-[#7A9B5F] text-black" : "bg-white text-black"
          }`}
          style={{ fontSize: '14px', fontWeight: 600 }}
        >
          Body
        </button>
      </div>

      {/* Horizontally scrollable items */}
      <div className="flex-1 pb-24 overflow-hidden">
        <div className="overflow-x-auto overflow-y-hidden scrollbar-hide px-4 h-full">
          <div className="flex gap-4 items-start pt-2">
            {items.map((item) => (
              <div
                key={item.id}
                onClick={() => setWornItem(item)}
                className="flex-shrink-0 w-36 bg-white rounded-2xl border-2 border-black/20 p-4 cursor-pointer hover:bg-gray-50"
              >
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedItem(item);
                  }}
                  className="w-full h-28 bg-gray-200 rounded-lg border-2 border-black/10 mb-3 flex items-center justify-center cursor-pointer hover:bg-gray-300"
                >
                  <div className="w-20 h-20 bg-gray-400 rounded"></div>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <div className="w-5 h-5 bg-[#F4C430] rounded-full border-2 border-black"></div>
                  <span className="text-black" style={{ fontSize: '16px', fontWeight: 700 }}>{item.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Purchase popup */}
      {selectedItem && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-6 mx-4 max-w-sm w-full border-2 border-black/20">
            <div className="bg-gray-100 rounded-2xl p-6 mb-4 flex items-center justify-center border-2 border-black/10">
              <div className="w-32 h-32 bg-gray-400 rounded-lg"></div>
            </div>

            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-6 h-6 bg-[#F4C430] rounded-full border-2 border-black"></div>
              <span className="text-black" style={{ fontSize: '20px', fontWeight: 700 }}>{selectedItem.price}</span>
            </div>

            <div className="border-t-2 border-dashed border-gray-300 pt-4 mb-4">
              <p className="text-black text-center" style={{ fontSize: '14px', fontWeight: 600 }}>
                Your coins : <span style={{ fontWeight: 700 }}>{userCoins}</span>
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                className="flex-1 bg-white text-black px-6 py-3 rounded-xl border-2 border-black"
                style={{ fontSize: '14px', fontWeight: 600 }}
              >
                Cancel
              </button>
              <button
                onClick={handleBuy}
                className="flex-1 bg-[#F4E4A3] text-black px-6 py-3 rounded-xl border-2 border-black"
                style={{ fontSize: '14px', fontWeight: 600 }}
              >
                Buy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Message notifications */}
      {message === "not-enough" && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="bg-[#E74C3C] text-black px-8 py-4 rounded-2xl border-2 border-black shadow-lg">
            <p style={{ fontSize: '18px', fontWeight: 700 }}>Not enough coins !</p>
          </div>
        </div>
      )}

      {message === "purchased" && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="bg-[#F4E4A3] text-black px-8 py-4 rounded-2xl border-2 border-black shadow-lg">
            <p style={{ fontSize: '18px', fontWeight: 700 }}>Purchased !</p>
          </div>
        </div>
      )}

      {/* Fixed bottom tab bar */}
      <div className="absolute bottom-0 left-0 right-0">
        <TabBar onTab1Click={onHomeClick} onTab2Click={onMissionClick} onTab3Click={onIslandClick} onTab4Click={onProfileClick} />
      </div>
    </div>
  );
}
