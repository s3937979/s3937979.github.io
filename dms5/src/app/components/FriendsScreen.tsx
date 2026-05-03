import { useState } from "react";
import TabBar from "./TabBar";

interface FriendsScreenProps {
  onBack: () => void;
  onHomeClick: () => void;
  onMissionClick: () => void;
  onIslandClick: () => void;
  onProfileClick: () => void;
}

interface Friend {
  id: string;
  name: string;
  status: string;
  steps: string;
}

export default function FriendsScreen({ onBack, onHomeClick, onMissionClick, onIslandClick, onProfileClick }: FriendsScreenProps) {
  const [searchCode, setSearchCode] = useState("");
  const [friends, setFriends] = useState<Friend[]>([
    { id: "mina", name: "Mina", status: "Goal completed", steps: "11,348" }
  ]);

  const handleCopy = () => {
    navigator.clipboard.writeText("WANDO-1224");
  };

  const handleShare = () => {
    navigator.clipboard.writeText("Join me on Wando! Use code: WANDO-1224");
  };

  const handleAddFriend = () => {
    if (searchCode === "111111") {
      const alexExists = friends.some(f => f.id === "alex");
      if (!alexExists) {
        setFriends([...friends, { id: "alex", name: "Alex", status: "2,100 steps left", steps: "7,900" }]);
      }
      setSearchCode("");
    }
  };

  const showAlexPreview = searchCode === "111111";

  return (
    <div className="h-full flex flex-col bg-[#C8D9B4]">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide pb-20">
        {/* Header */}
        <div className="flex items-center relative pt-5 pb-4 px-4 flex-shrink-0">
          <button onClick={onBack} className="absolute left-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <h1 className="text-black w-full text-center" style={{ fontSize: '24px', fontWeight: 700 }}>
            Friends
          </h1>
        </div>

        {/* My friend code */}
        <div className="mx-4 mb-4 bg-[#7A9B5F] rounded-2xl p-4 border-2 border-black">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-black rounded-full"></div>
            <h2 className="text-black" style={{ fontSize: '16px', fontWeight: 700 }}>
              My friend code
            </h2>
          </div>
          <div className="bg-white rounded-xl p-3 mb-2">
            <p className="text-black text-center mb-2" style={{ fontSize: '18px', fontWeight: 700 }}>
              WANDO-1224
            </p>
            <div className="flex gap-2 justify-center">
              <button
                onClick={handleCopy}
                className="bg-[#7A9B5F] text-black px-6 py-2 rounded-full border-2 border-black"
                style={{ fontSize: '14px', fontWeight: 600 }}
              >
                Copy
              </button>
              <button
                onClick={handleShare}
                className="bg-[#7A9B5F] text-black px-6 py-2 rounded-full border-2 border-black"
                style={{ fontSize: '14px', fontWeight: 600 }}
              >
                Share
              </button>
            </div>
          </div>
        </div>

        {/* Add by code */}
        <div className="mx-4 mb-4 bg-[#7A9B5F] rounded-2xl p-4 border-2 border-black">
          <h2 className="text-black mb-3" style={{ fontSize: '16px', fontWeight: 700 }}>
            Add by code
          </h2>
          <div className="relative mb-3">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-gray-400 rounded-full"></div>
            <input
              type="text"
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              placeholder=""
              className="w-full bg-white rounded-full pl-10 pr-4 py-2 border-2 border-black/20 outline-none"
              style={{ fontSize: '14px' }}
            />
          </div>

          {/* Alex preview when 111111 is typed */}
          {showAlexPreview && (
            <div className="bg-white rounded-xl p-3 mb-3 border-2 border-black/20">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#E74C3C] rounded-full border-2 border-black flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-black" style={{ fontSize: '16px', fontWeight: 700 }}>Alex</p>
                  <p className="text-black" style={{ fontSize: '11px', fontWeight: 400 }}>2,100 steps left</p>
                </div>
                <div className="text-right">
                  <p className="text-black" style={{ fontSize: '16px', fontWeight: 700 }}>7,900</p>
                  <p className="text-black" style={{ fontSize: '11px', fontWeight: 400 }}>steps today</p>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handleAddFriend}
            className="w-full bg-[#A8C88E] text-black px-6 py-2 rounded-full border-2 border-black"
            style={{ fontSize: '14px', fontWeight: 600 }}
          >
            Add friend
          </button>
        </div>

        {/* Your friends */}
        <div className="px-4">
          <h2 className="text-black mb-3" style={{ fontSize: '16px', fontWeight: 700 }}>
            Your friends
          </h2>
          <div className="space-y-3">
            {friends.map((friend) => (
              <div key={friend.id} className="bg-white rounded-2xl p-3 border-2 border-black/20 flex items-center gap-3">
                <div className="w-14 h-14 bg-[#7A9B5F] rounded-full border-2 border-black flex-shrink-0 relative">
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-white"></div>
                </div>
                <div className="flex-1">
                  <p className="text-black" style={{ fontSize: '18px', fontWeight: 700 }}>{friend.name}</p>
                  <p className="text-black" style={{ fontSize: '11px', fontWeight: 400 }}>{friend.status}</p>
                </div>
                <div className="text-right mr-2">
                  <p className="text-black" style={{ fontSize: '18px', fontWeight: 700 }}>{friend.steps}</p>
                  <p className="text-black" style={{ fontSize: '11px', fontWeight: 400 }}>steps today</p>
                </div>
                <div className="flex flex-col gap-1">
                  <button
                    className="bg-[#7A9B5F] text-black px-4 py-1 rounded-lg border-2 border-black/20"
                    style={{ fontSize: '11px', fontWeight: 600 }}
                  >
                    Cheer
                  </button>
                  <button
                    className="bg-[#7A9B5F] text-black px-4 py-1 rounded-lg border-2 border-black/20"
                    style={{ fontSize: '11px', fontWeight: 600 }}
                  >
                    Visit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed bottom tab bar */}
      <div className="absolute bottom-0 left-0 right-0">
        <TabBar onTab1Click={onHomeClick} onTab2Click={onMissionClick} onTab3Click={onIslandClick} onTab4Click={onProfileClick} />
      </div>
    </div>
  );
}
