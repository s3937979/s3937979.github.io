import { useState, useEffect } from "react";
import CoinIcon from "./CoinIcon";
import TabBar from "./TabBar";
import bottoms1 from "../../imports/bottoms-1.png";
import bottoms2 from "../../imports/bottoms-2.png";
import bottoms3 from "../../imports/bottoms-3.png";
import bottomsPreview1 from "../../imports/bottoms-1-1.png";
import bottomsPreview2 from "../../imports/bottoms-2-1.png";
import bottomsPreview3 from "../../imports/bottoms-3-1.png";
import shoes1 from "../../imports/shoes-1.png";
import shoes2 from "../../imports/shoes-2.png";
import shoes3 from "../../imports/shoes-3.png";
import shoesPreview1 from "../../imports/shoes-1-1.png";
import shoesPreview2 from "../../imports/shoes-2-1.png";
import shoesPreview3 from "../../imports/shoes-3-1.png";
import acc1 from "../../imports/acc-1.png";
import acc2 from "../../imports/acc-2.png";
import acc3 from "../../imports/acc-3.png";
import accPreview1 from "../../imports/acc-1-1.png";
import accPreview2 from "../../imports/acc-2-1.png";
import accPreview3 from "../../imports/acc-3-1.png";
import tomato from "../../imports/tomato.png";
import backIcon from "../../imports/back-icon.png";
import type { PurchasedCharacterItem } from "../types";

interface StoreClosetScreenProps {
  onBack: () => void;
  onDecorClick: () => void;
  onAppearanceClick: () => void;
  onHomeClick: () => void;
  onMissionClick: () => void;
  onIslandClick: () => void;
  onProfileClick: () => void;
  purchasedItems: PurchasedCharacterItem[];
  onPurchasedItemsChange: (items: PurchasedCharacterItem[]) => void;
}

type SubCategory = "bottoms" | "shoes" | "accessories";

interface ClosetItem {
  id: string;
  name: string;
  price: number;
  subcategory: SubCategory;
  image: string;
  wornImage: string;
}

export default function StoreClosetScreen({
  onBack,
  onDecorClick,
  onAppearanceClick,
  onHomeClick,
  onMissionClick,
  onIslandClick,
  onProfileClick,
  purchasedItems,
  onPurchasedItemsChange,
}: StoreClosetScreenProps) {
  const [activeSubcategory, setActiveSubcategory] = useState<SubCategory>("bottoms");
  const [userCoins, setUserCoins] = useState(63);
  const [selectedItem, setSelectedItem] = useState<ClosetItem | null>(null);
  const [message, setMessage] = useState<"" | "not-enough" | "purchased">("");
  const [wornItem, setWornItem] = useState<ClosetItem | null>(null);

  const bottomsItems: ClosetItem[] = [
    { id: "b1", name: "Blue pants", price: 20, subcategory: "bottoms", image: bottoms1, wornImage: bottomsPreview1 },
    { id: "b2", name: "Striped pants", price: 30, subcategory: "bottoms", image: bottoms2, wornImage: bottomsPreview2 },
    { id: "b3", name: "Yellow pants", price: 25, subcategory: "bottoms", image: bottoms3, wornImage: bottomsPreview3 },
  ];

  const shoesItems: ClosetItem[] = [
    { id: "s1", name: "Black shoes", price: 15, subcategory: "shoes", image: shoes1, wornImage: shoesPreview1 },
    { id: "s2", name: "Red shoes", price: 20, subcategory: "shoes", image: shoes2, wornImage: shoesPreview2 },
    { id: "s3", name: "Striped shoes", price: 18, subcategory: "shoes", image: shoes3, wornImage: shoesPreview3 },
  ];

  const accessoriesItems: ClosetItem[] = [
    { id: "a1", name: "Glasses", price: 10, subcategory: "accessories", image: acc1, wornImage: accPreview1 },
    { id: "a2", name: "Headband", price: 12, subcategory: "accessories", image: acc2, wornImage: accPreview2 },
    { id: "a3", name: "Headphones", price: 8, subcategory: "accessories", image: acc3, wornImage: accPreview3 },
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
              source: "closet",
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
      case "bottoms":
        return bottomsItems;
      case "shoes":
        return shoesItems;
      case "accessories":
        return accessoriesItems;
      default:
        return bottomsItems;
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
          className="px-5 py-2 rounded-full border-2 border-black transition-colors bg-[#7A9B5F] text-black"
          style={{ fontSize: '14px', fontWeight: 600 }}
        >
          Closet
        </button>
        <button
          onClick={onAppearanceClick}
          className="px-5 py-2 rounded-full border-2 border-black transition-colors bg-white text-black"
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
              setActiveSubcategory("bottoms");
              setWornItem(null);
            }}
            className={`px-5 py-2 rounded-full border-2 border-black transition-colors ${
              activeSubcategory === "bottoms" ? "bg-[#7A9B5F] text-black" : "bg-white text-black"
            }`}
            style={{ fontSize: '14px', fontWeight: 600 }}
          >
            Bottoms
          </button>
          <button
            onClick={() => {
              setActiveSubcategory("shoes");
              setWornItem(null);
            }}
            className={`px-5 py-2 rounded-full border-2 border-black transition-colors ${
              activeSubcategory === "shoes" ? "bg-[#7A9B5F] text-black" : "bg-white text-black"
            }`}
            style={{ fontSize: '14px', fontWeight: 600 }}
          >
            Shoes
          </button>
          <button
            onClick={() => {
              setActiveSubcategory("accessories");
              setWornItem(null);
            }}
            className={`px-5 py-2 rounded-full border-2 border-black transition-colors ${
              activeSubcategory === "accessories" ? "bg-[#7A9B5F] text-black" : "bg-white text-black"
            }`}
            style={{ fontSize: '14px', fontWeight: 600 }}
          >
            Accessories
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
