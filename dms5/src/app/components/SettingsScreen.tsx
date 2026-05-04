import { useState } from "react";
import TabBar from "./TabBar";

interface SettingsScreenProps {
  onBack: () => void;
  onEditProfile: () => void;
  onLogout: () => void;
  onHomeClick: () => void;
  onMissionClick: () => void;
  onIslandClick: () => void;
  onProfileClick: () => void;
  userName: string;
  onUserNameChange: (name: string) => void;
}

export default function SettingsScreen({
  onBack,
  onEditProfile,
  onLogout,
  onHomeClick,
  onMissionClick,
  onIslandClick,
  onProfileClick,
  userName,
  onUserNameChange
}: SettingsScreenProps) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [tempName, setTempName] = useState(userName);

  const handleSaveName = () => {
    onUserNameChange(tempName);
    setShowEditModal(false);
  };

  const handleCancelEdit = () => {
    setTempName(userName);
    setShowEditModal(false);
  };

  const handleShowEditModal = () => {
    setTempName(userName);
    setShowEditModal(true);
  };

  return (
    <div className="h-full flex flex-col bg-[#EDEDEE]">
      {/* Header */}
      <div className="bg-[#7A9B5F] px-4 py-4 flex items-center justify-center relative border-b-2 border-black flex-shrink-0">
        <button onClick={onBack} className="absolute left-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <h1 className="text-black" style={{ fontSize: '24px', fontWeight: 700 }}>
          Settings
        </h1>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide pb-20 px-4 pt-6">
        {/* Settings options */}
        <div className="space-y-3">
          {/* Edit profile */}
          <button
            onClick={handleShowEditModal}
            className="w-full bg-white rounded-2xl p-4 border-2 border-black/20 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#7A9B5F] rounded-full flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <span className="text-black" style={{ fontSize: '16px', fontWeight: 600 }}>
                Edit profile
              </span>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Notifications */}
          <div className="w-full bg-white rounded-2xl p-4 border-2 border-black/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#7A9B5F] rounded-full flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              </div>
              <span className="text-black" style={{ fontSize: '16px', fontWeight: 600 }}>
                Notifications
              </span>
            </div>
            <button
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className={`w-14 h-8 rounded-full border-2 border-black/20 transition-colors ${
                notificationsEnabled ? 'bg-[#7A9B5F]' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-6 h-6 bg-white rounded-full border-2 border-black/20 transition-transform ${
                  notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Sound */}
          <div className="w-full bg-white rounded-2xl p-4 border-2 border-black/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#7A9B5F] rounded-full flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
              </div>
              <span className="text-black" style={{ fontSize: '16px', fontWeight: 600 }}>
                Sound
              </span>
            </div>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`w-14 h-8 rounded-full border-2 border-black/20 transition-colors ${
                soundEnabled ? 'bg-[#7A9B5F]' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-6 h-6 bg-white rounded-full border-2 border-black/20 transition-transform ${
                  soundEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Privacy */}
          <button className="w-full bg-white rounded-2xl p-4 border-2 border-black/20 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#7A9B5F] rounded-full flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <span className="text-black" style={{ fontSize: '16px', fontWeight: 600 }}>
                Privacy
              </span>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Help */}
          <button className="w-full bg-white rounded-2xl p-4 border-2 border-black/20 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#7A9B5F] rounded-full flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              <span className="text-black" style={{ fontSize: '16px', fontWeight: 600 }}>
                Help
              </span>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Log out */}
          <button
            onClick={onLogout}
            className="w-full bg-white rounded-2xl p-4 border-2 border-red-200 flex items-center justify-between hover:bg-red-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
              </div>
              <span className="text-red-600" style={{ fontSize: '16px', fontWeight: 600 }}>
                Log out
              </span>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="red" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Edit name modal */}
      {showEditModal && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm border-2 border-black/20">
            <h2 className="text-black mb-4" style={{ fontSize: '20px', fontWeight: 700 }}>
              Edit profile
            </h2>

            <div className="mb-6">
              <label className="block text-black mb-2" style={{ fontSize: '14px', fontWeight: 600 }}>
                Name
              </label>
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-black/20 text-black"
                style={{ fontSize: '16px', fontWeight: 400 }}
                placeholder="Enter your name"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleCancelEdit}
                className="flex-1 bg-white text-black px-6 py-3 rounded-xl border-2 border-black"
                style={{ fontSize: '14px', fontWeight: 600 }}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveName}
                className="flex-1 bg-[#7A9B5F] text-black px-6 py-3 rounded-xl border-2 border-black"
                style={{ fontSize: '14px', fontWeight: 600 }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fixed bottom tab bar */}
      <div className="absolute bottom-0 left-0 right-0">
        <TabBar activeTab="profile" onTab1Click={onHomeClick} onTab2Click={onMissionClick} onTab3Click={onIslandClick} onTab4Click={onProfileClick} />
      </div>
    </div>
  );
}
