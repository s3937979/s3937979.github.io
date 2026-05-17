import { useState, useEffect } from "react";
import CoinIcon from "./CoinIcon";
import TabBar from "./TabBar";
import flower1 from "../../imports/flower-1.png";
import house1 from "../../imports/house-1.png";
import house2 from "../../imports/house-2.png";
import house3 from "../../imports/house-3.png";
import palmTree from "../../imports/palm-tree.png";
import pineTree from "../../imports/pine-tree.png";
import backIcon from "../../imports/back-icon.png";
import type { PurchasedDecorItem } from "../types";

interface StoreScreenProps {
  onBack: () => void;
  onHomeClick: () => void;
  onMissionClick: () => void;
  onIslandClick: () => void;
  onProfileClick: () => void;
  onClosetClick: () => void;
  onAppearanceClick: () => void;
  purchasedDecorItems: PurchasedDecorItem[];
  onPurchasedDecorItemsChange: (items: PurchasedDecorItem[]) => void;
}

interface StoreItem extends PurchasedDecorItem {
  id: string;
}

export default function StoreScreen({
  onBack,
  onHomeClick,
  onMissionClick,
  onIslandClick,
  onProfileClick,
  onClosetClick,
  onAppearanceClick,
  purchasedDecorItems,
  onPurchasedDecorItemsChange,
}: StoreScreenProps) {
  const [activeCategory, setActiveCategory] = useState<"decor" | "closet" | "appearance">("decor");
  const [selectedItem, setSelectedItem] = useState<StoreItem | null>(null);
  const [userCoins, setUserCoins] = useState(63);
  const [message, setMessage] = useState<"" | "not-enough" | "purchased">("");

  const houseItems: StoreItem[] = [
    { id: "h1", name: "Rock cave", price: 20, category: "house", image: house1 },
    { id: "h2", name: "Tent", price: 60, category: "house", image: house2 },
    { id: "h3", name: "Mailbox", price: 40, category: "house", image: house3 },
  ];

  const natureItems: StoreItem[] = [
    { id: "n1", name: "Palm tree", price: 20, category: "nature", image: palmTree },
    { id: "n2", name: "Pine tree", price: 30, category: "nature", image: pineTree },
    { id: "n3", name: "Flower", price: 15, category: "nature", image: flower1 },
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
        if (!purchasedDecorItems.some((item) => item.id === selectedItem.id)) {
          onPurchasedDecorItemsChange([...purchasedDecorItems, selectedItem]);
        }
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
        <button onClick={onBack} className="w-12 h-12 flex items-center justify-center">
          <img src={backIcon} alt="Back" className="w-[41px] h-[41px] object-contain" />
        </button>
        <h1 className="text-black" style={{ fontSize: '24px', fontWeight: 700 }}>
          Store
        </h1>
        <div className="flex items-center gap-2">
          <CoinIcon className="w-6 h-6" />
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
                    <img src={item.image} alt={item.name} className="max-h-[96px] max-w-[96px] object-contain" />
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <CoinIcon className="w-5 h-5" />
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
                    <img src={item.image} alt={item.name} className="max-h-[96px] max-w-[96px] object-contain" />
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <CoinIcon className="w-5 h-5" />
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
              <img src={selectedItem.image} alt={selectedItem.name} className="max-h-32 max-w-32 object-contain" />
            </div>

            <div className="flex items-center justify-center gap-2 mb-4">
              <CoinIcon className="w-6 h-6" />
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
        <TabBar activeTab="island" onTab1Click={onHomeClick} onTab2Click={onMissionClick} onTab3Click={onIslandClick} onTab4Click={onProfileClick} />
      </div>
    </div>
  );
}
