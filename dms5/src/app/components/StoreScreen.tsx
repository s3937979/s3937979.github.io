import { useState, useEffect } from "react";
import TabBar from "./TabBar";

interface StoreScreenProps {
  onBack: () => void;
  onHomeClick: () => void;
  onMissionClick: () => void;
  onIslandClick: () => void;
  onProfileClick: () => void;
  onClosetClick: () => void;
  onAppearanceClick: () => void;
}

interface StoreItem {
  id: string;
  name: string;
  price: number;
  category: "house" | "nature";
}

export default function StoreScreen({ onBack, onHomeClick, onMissionClick, onIslandClick, onProfileClick, onClosetClick, onAppearanceClick }: StoreScreenProps) {
  const [activeCategory, setActiveCategory] = useState<"decor" | "closet" | "appearance">("decor");
  const [selectedItem, setSelectedItem] = useState<StoreItem | null>(null);
  const [userCoins, setUserCoins] = useState(63);
  const [message, setMessage] = useState<"" | "not-enough" | "purchased">("");

  const houseItems: StoreItem[] = [
    { id: "h1", name: "Rock cave", price: 20, category: "house" },
    { id: "h2", name: "Tent", price: 60, category: "house" },
    { id: "h3", name: "Mailbox", price: 40, category: "house" },
  ];

  const natureItems: StoreItem[] = [
    { id: "n1", name: "Palm tree", price: 20, category: "nature" },
    { id: "n2", name: "Pine tree", price: 30, category: "nature" },
    { id: "n3", name: "Bush", price: 15, category: "nature" },
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
          onClick={() => setActiveCategory("decor")}
          className={`px-5 py-2 rounded-full border-2 border-black transition-colors ${
            activeCategory === "decor" ? "bg-[#7A9B5F] text-black" : "bg-white text-black"
          }`}
          style={{ fontSize: '14px', fontWeight: 600 }}
        >
          Decor
        </button>
        <button
          onClick={onClosetClick}
          className={`px-5 py-2 rounded-full border-2 border-black transition-colors ${
            activeCategory === "closet" ? "bg-[#7A9B5F] text-black" : "bg-white text-black"
          }`}
          style={{ fontSize: '14px', fontWeight: 600 }}
        >
          Closet
        </button>
        <button
          onClick={onAppearanceClick}
          className={`px-5 py-2 rounded-full border-2 border-black transition-colors ${
            activeCategory === "appearance" ? "bg-[#7A9B5F] text-black" : "bg-white text-black"
          }`}
          style={{ fontSize: '14px', fontWeight: 600 }}
        >
          Appearance
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide pb-20">
        {/* House section */}
        <div className="mb-6">
          <div className="px-4 py-3">
            <div className="bg-[#7A9B5F] rounded-full px-4 py-1.5 inline-block border-2 border-black">
              <span className="text-black" style={{ fontSize: '14px', fontWeight: 700 }}>House</span>
            </div>
          </div>
          <div className="overflow-x-auto overflow-y-hidden scrollbar-hide px-4">
            <div className="flex gap-4">
              {houseItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="flex-shrink-0 w-36 bg-white rounded-2xl border-2 border-black/20 p-4 cursor-pointer hover:bg-gray-50"
                >
                  <div className="w-full h-28 bg-gray-200 rounded-lg border-2 border-black/10 mb-3 flex items-center justify-center">
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

        {/* Nature section */}
        <div className="mb-6">
          <div className="px-4 py-3">
            <div className="bg-[#7A9B5F] rounded-full px-4 py-1.5 inline-block border-2 border-black">
              <span className="text-black" style={{ fontSize: '14px', fontWeight: 700 }}>Nature</span>
            </div>
          </div>
          <div className="overflow-x-auto overflow-y-hidden scrollbar-hide px-4">
            <div className="flex gap-4">
              {natureItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="flex-shrink-0 w-36 bg-white rounded-2xl border-2 border-black/20 p-4 cursor-pointer hover:bg-gray-50"
                >
                  <div className="w-full h-28 bg-gray-200 rounded-lg border-2 border-black/10 mb-3 flex items-center justify-center">
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
