import { useState, useEffect } from "react";
import CoinIcon from "./CoinIcon";
import TabBar from "./TabBar";
import hair1 from "../../imports/hair-1.png";
import hair2 from "../../imports/hair-2.png";
import hair3 from "../../imports/hair-3.png";
import hairPreview1 from "../../imports/hair-1-1.png";
import hairPreview2 from "../../imports/hair-2-1.png";
import hairPreview3 from "../../imports/hair-3-1.png";
import face1 from "../../imports/face-1.png";
import face2 from "../../imports/face-2.png";
import face3 from "../../imports/face-3.png";
import facePreview1 from "../../imports/face-1-1.png";
import facePreview2 from "../../imports/face-2-1.png";
import facePreview3 from "../../imports/face-3-1.png";
import body1 from "../../imports/body-1.png";
import body2 from "../../imports/body-2.png";
import body3 from "../../imports/body-3.png";
import bodyPreview1 from "../../imports/body-1-1.png";
import bodyPreview2 from "../../imports/body-2-1.png";
import bodyPreview3 from "../../imports/body-3-1.png";
import tomato from "../../imports/tomato.png";
import backIcon from "../../imports/back-icon.png";
import type { PurchasedCharacterItem } from "../types";

interface StoreAppearanceScreenProps {
  onBack: () => void;
  onDecorClick: () => void;
  onClosetClick: () => void;
  onHomeClick: () => void;
  onMissionClick: () => void;
  onIslandClick: () => void;
  onProfileClick: () => void;
  purchasedItems: PurchasedCharacterItem[];
  onPurchasedItemsChange: (items: PurchasedCharacterItem[]) => void;
}

type SubCategory = "hair" | "face" | "body";

interface AppearanceItem {
  id: string;
  name: string;
  price: number;
  subcategory: SubCategory;
  image: string;
  wornImage: string;
}

export default function StoreAppearanceScreen({
  onBack,
  onDecorClick,
  onClosetClick,
  onHomeClick,
  onMissionClick,
  onIslandClick,
  onProfileClick,
  purchasedItems,
  onPurchasedItemsChange,
}: StoreAppearanceScreenProps) {
  const [activeSubcategory, setActiveSubcategory] = useState<SubCategory>("hair");
  const [userCoins, setUserCoins] = useState(63);
  const [selectedItem, setSelectedItem] = useState<AppearanceItem | null>(null);
  const [message, setMessage] = useState<"" | "not-enough" | "purchased">("");
  const [wornItem, setWornItem] = useState<AppearanceItem | null>(null);

  const hairItems: AppearanceItem[] = [
    { id: "h1", name: "Thin hair", price: 20, subcategory: "hair", image: hair1, wornImage: hairPreview1 },
    { id: "h2", name: "Bowl cut", price: 30, subcategory: "hair", image: hair2, wornImage: hairPreview2 },
    { id: "h3", name: "Curly hair", price: 25, subcategory: "hair", image: hair3, wornImage: hairPreview3 },
  ];

  const faceItems: AppearanceItem[] = [
    { id: "f1", name: "Star eyes", price: 15, subcategory: "face", image: face1, wornImage: facePreview1 },
    { id: "f2", name: "Round eyes", price: 10, subcategory: "face", image: face2, wornImage: facePreview2 },
    { id: "f3", name: "Sleepy eyes", price: 8, subcategory: "face", image: face3, wornImage: facePreview3 },
  ];

  const bodyItems: AppearanceItem[] = [
    { id: "bo1", name: "Round body", price: 12, subcategory: "body", image: body1, wornImage: bodyPreview1 },
    { id: "bo2", name: "Long arms", price: 18, subcategory: "body", image: body2, wornImage: bodyPreview2 },
    { id: "bo3", name: "Small legs", price: 15, subcategory: "body", image: body3, wornImage: bodyPreview3 },
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
        if (!purchasedItems.some((item) => item.id === selectedItem.id)) {
          onPurchasedItemsChange([
            ...purchasedItems,
            {
              ...selectedItem,
              source: "appearance",
            },
          ]);
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

      <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide pb-24">
        {/* Tomato character */}
        <div className="flex items-center justify-center py-1">
          <div className="relative flex h-[292px] w-[282px] items-center justify-center">
            {wornItem?.wornImage ? (
              <img
                src={wornItem.wornImage}
                alt={`${wornItem.name} preview`}
                className="h-full w-full object-contain"
              />
            ) : (
              <img src={tomato} alt="Tomato preview" className="h-full w-full object-contain" />
            )}
          </div>
        </div>

        {/* Separator line */}
        <div className="w-full h-0.5 bg-black"></div>

        {/* Subcategory buttons */}
        <div className="flex gap-2 px-4 py-3">
          <button
            onClick={() => {
              setActiveSubcategory("hair");
              setWornItem(null);
            }}
            className={`px-5 py-2 rounded-full border-2 border-black transition-colors ${
              activeSubcategory === "hair" ? "bg-[#7A9B5F] text-black" : "bg-white text-black"
            }`}
            style={{ fontSize: '14px', fontWeight: 600 }}
          >
            Hair
          </button>
          <button
            onClick={() => {
              setActiveSubcategory("face");
              setWornItem(null);
            }}
            className={`px-5 py-2 rounded-full border-2 border-black transition-colors ${
              activeSubcategory === "face" ? "bg-[#7A9B5F] text-black" : "bg-white text-black"
            }`}
            style={{ fontSize: '14px', fontWeight: 600 }}
          >
            Face
          </button>
          <button
            onClick={() => {
              setActiveSubcategory("body");
              setWornItem(null);
            }}
            className={`px-5 py-2 rounded-full border-2 border-black transition-colors ${
              activeSubcategory === "body" ? "bg-[#7A9B5F] text-black" : "bg-white text-black"
            }`}
            style={{ fontSize: '14px', fontWeight: 600 }}
          >
            Body
          </button>
        </div>

        {/* Horizontally scrollable items */}
        <div className="overflow-x-auto overflow-y-hidden scrollbar-hide px-4">
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
                    setWornItem(item);
                    setSelectedItem(item);
                  }}
                  className="w-full h-28 bg-gray-200 rounded-lg border-2 border-black/10 mb-3 flex items-center justify-center cursor-pointer hover:bg-gray-300"
                >
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="max-h-[104px] max-w-[104px] object-contain" />
                  ) : (
                    <div className="w-20 h-20 bg-gray-400 rounded"></div>
                  )}
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

      {/* Purchase popup */}
      {selectedItem && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-6 mx-4 max-w-sm w-full border-2 border-black/20">
            <div className="bg-gray-100 rounded-2xl p-6 mb-4 flex items-center justify-center border-2 border-black/10">
              {selectedItem.image ? (
                <img src={selectedItem.image} alt={selectedItem.name} className="h-32 w-32 object-contain" />
              ) : (
                <div className="w-32 h-32 bg-gray-400 rounded-lg"></div>
              )}
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
