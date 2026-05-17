import CoinIcon from "./CoinIcon";
import TabBar from "./TabBar";
import backIcon from "../../imports/back-icon.png";
import storeIcon from "../../imports/store-icon.png";
import tomatoImage from "../../imports/tomato.png";
import type { PurchasedCharacterItem } from "../types";

interface CustomizeScreenProps {
  onStoreClick: () => void;
  onFriendsClick: () => void;
  onHomeClick: () => void;
  onMissionClick: () => void;
  onIslandClick: () => void;
  onProfileClick: () => void;
  purchasedItems: PurchasedCharacterItem[];
  equippedItem: PurchasedCharacterItem | null;
  onEquipItem: (item: PurchasedCharacterItem) => void;
}

export default function CustomizeScreen({
  onStoreClick,
  onHomeClick,
  onMissionClick,
  onIslandClick,
  onProfileClick,
  purchasedItems,
  equippedItem,
  onEquipItem,
}: CustomizeScreenProps) {
  const characterImage = equippedItem?.wornImage ?? tomatoImage;

  return (
    <div className="relative h-full flex flex-col bg-[#8DC5E8]">
      <div className="relative bg-[#F4E4A3] px-4 py-4 flex items-center justify-between border-b-2 border-black flex-shrink-0">
        <button onClick={onIslandClick} className="w-12 h-12 flex items-center justify-center">
          <img src={backIcon} alt="Back" className="w-[41px] h-[41px] object-contain" />
        </button>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <h1
            className="text-black leading-none"
            style={{ fontSize: "32px", fontWeight: 700 }}
          >
            Customize
          </h1>
        </div>

        <button onClick={onStoreClick} className="w-12 h-12 flex items-center justify-center">
          <img src={storeIcon} alt="Store" className="w-[41px] h-[41px] object-contain" />
        </button>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="px-4 pt-2 pb-1 flex-shrink-0">
          <div className="flex items-start justify-end mb-1">
            <div className="flex items-center gap-2">
              <CoinIcon className="w-5 h-5" />
              <span className="text-black" style={{ fontSize: "16px", fontWeight: 700 }}>
                63
              </span>
            </div>
          </div>
        </div>

        <div className="px-6 pb-4 flex items-center justify-center">
          <div className="w-full max-w-[270px] aspect-[1/1.2] flex items-center justify-center">
            <img
              src={characterImage}
              alt={equippedItem ? `${equippedItem.name} preview` : "Tomato"}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <div className="flex-1 bg-white rounded-t-[36px] border-t-2 border-black px-5 pt-6 pb-24 overflow-y-auto">
          <div className="min-h-full">
            {purchasedItems.length === 0 ? (
              <div className="h-full min-h-[220px] flex items-center justify-center text-center">
                <p className="text-black" style={{ fontSize: "20px", fontWeight: 700 }}>
                  Buy items
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-3 pb-6">
                {purchasedItems.map((item) => (
                  <div
                    key={item.id}
                    className={`rounded-2xl border-2 bg-[#F6F6F6] p-2 flex min-h-[136px] flex-col items-center justify-between gap-2 ${
                      equippedItem?.id === item.id ? "border-[#7A9B5F]" : "border-black/15"
                    }`}
                  >
                    <div className="h-[72px] w-full flex items-center justify-center">
                      <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain" />
                    </div>
                    <button
                      onClick={() => onEquipItem(item)}
                      className={`w-full rounded-full border-2 border-black px-2 py-1 text-black ${
                        equippedItem?.id === item.id ? "bg-[#7A9B5F]" : "bg-[#F4E4A3]"
                      }`}
                      style={{ fontSize: "12px", fontWeight: 700 }}
                    >
                      {equippedItem?.id === item.id ? "Worn" : "Wear"}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <TabBar
          activeTab="island"
          onTab1Click={onHomeClick}
          onTab2Click={onMissionClick}
          onTab3Click={onIslandClick}
          onTab4Click={onProfileClick}
        />
      </div>
    </div>
  );
}
