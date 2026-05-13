import CoinIcon from "./CoinIcon";
import TabBar from "./TabBar";
import backIcon from "../../imports/back-icon.png";
import storeIcon from "../../imports/store-icon.png";
import tomatoImage from "../../imports/tomato.png";

interface CustomizeScreenProps {
  onStoreClick: () => void;
  onFriendsClick: () => void;
  onHomeClick: () => void;
  onMissionClick: () => void;
  onIslandClick: () => void;
  onProfileClick: () => void;
}

const purchasedItems: Array<{ id: string; name: string; preview: string }> = [];

export default function CustomizeScreen({
  onStoreClick,
  onHomeClick,
  onMissionClick,
  onIslandClick,
  onProfileClick,
}: CustomizeScreenProps) {
  return (
    <div className="relative h-full flex flex-col bg-[#8DC5E8]">
      <div className="relative bg-[#F4E4A3] px-4 py-4 flex items-center justify-between border-b-2 border-black flex-shrink-0">
        <button onClick={onIslandClick} className="w-12 h-12 flex items-center justify-center">
          <img src={backIcon} alt="Back" className="w-[41px] h-[41px] object-contain" />
        </button>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <h1
            className="text-black border-b-2 border-black leading-none"
            style={{ fontSize: "32px", fontWeight: 700 }}
          >
            Island
          </h1>
        </div>

        <button onClick={onStoreClick} className="w-12 h-12 flex items-center justify-center">
          <img src={storeIcon} alt="Store" className="w-[41px] h-[41px] object-contain" />
        </button>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="px-4 pt-5 pb-4 flex items-center justify-center">
          <div className="flex items-center justify-center gap-2">
            <CoinIcon className="w-7 h-7" />
            <span className="text-black leading-none" style={{ fontSize: "20px", fontWeight: 700 }}>
              63
            </span>
          </div>
        </div>

        <div className="px-6 pb-4 flex items-center justify-center">
          <div className="w-full max-w-[270px] aspect-[1/1.2] flex items-center justify-center">
            <img src={tomatoImage} alt="Tomato" className="w-full h-full object-contain" />
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
              <div className="grid grid-cols-3 gap-4 pb-6">
                {purchasedItems.map((item) => (
                  <div
                    key={item.id}
                    className="aspect-square rounded-2xl border-2 border-black/15 bg-[#F6F6F6] p-3 flex items-center justify-center"
                  >
                    <img src={item.preview} alt={item.name} className="max-h-full max-w-full object-contain" />
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
