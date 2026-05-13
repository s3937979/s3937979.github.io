import { useState, useRef } from "react";
import TabBar from "./TabBar";
import settingIcon from "../../imports/setting-icon.png";

interface ProfileScreenProps {
  onHomeClick: () => void;
  onIslandClick: () => void;
  onMissionClick: () => void;
  onSettingsClick: () => void;
  userName: string;
}

interface Photo {
  id: string;
  url: string;
  date: string;
}

export default function ProfileScreen({ onHomeClick, onIslandClick, onMissionClick, onSettingsClick, userName }: ProfileScreenProps) {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const profileInputRef = useRef<HTMLInputElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const now = new Date();
        const dateStr = `${now.getMonth() + 1}.${now.getDate()}`;
        const newPhoto: Photo = {
          id: Date.now().toString(),
          url: reader.result as string,
          date: dateStr,
        };
        setPhotos([newPhoto, ...photos]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#EDEDEE]">
      {/* Header */}
      <div className="bg-[#7A9B5F] px-4 py-4 flex items-center justify-between border-b-2 border-black flex-shrink-0">
        <h1 className="text-black flex-1 text-center" style={{ fontSize: '24px', fontWeight: 700 }}>
          Profile
        </h1>
        <button onClick={onSettingsClick} className="w-8 h-8 flex items-center justify-center">
          <img src={settingIcon} alt="" className="w-full h-full object-contain" />
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide pb-20">
        {/* Profile section */}
        <div className="flex flex-col items-center pt-6 pb-4">
          {/* Profile image */}
          <div className="w-36 h-36 rounded-full border-4 border-black bg-white mb-3 overflow-hidden flex items-center justify-center">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-[#E74C3C] rounded-full"></div>
            )}
          </div>

          {/* Name */}
          <h2 className="text-black mb-3" style={{ fontSize: '20px', fontWeight: 700 }}>
            {userName}
          </h2>

          {/* Edit profile button */}
          <input
            ref={profileInputRef}
            type="file"
            accept="image/*"
            onChange={handleProfileImageChange}
            className="hidden"
          />
          <button
            onClick={() => profileInputRef.current?.click()}
            className="bg-[#7A9B5F] text-black px-6 py-2 rounded-lg border-2 border-black"
            style={{ fontSize: '14px', fontWeight: 600 }}
          >
            Edit profile
          </button>
        </div>

        {/* Stats card */}
        <div className="mx-4 mb-6 bg-white rounded-2xl p-4 border-2 border-black/20">
          <div className="grid grid-cols-4 divide-x-2 divide-black/20">
            <div className="text-center px-2">
              <p className="text-black mb-1" style={{ fontSize: '10px', fontWeight: 600 }}>Total steps</p>
              <p className="text-black mb-0.5" style={{ fontSize: '16px', fontWeight: 700 }}>65,122</p>
              <p className="text-black" style={{ fontSize: '10px', fontWeight: 400 }}>steps</p>
            </div>
            <div className="text-center px-2">
              <p className="text-black mb-1" style={{ fontSize: '10px', fontWeight: 600 }}>Total coins</p>
              <p className="text-black mb-0.5" style={{ fontSize: '16px', fontWeight: 700 }}>63</p>
              <p className="text-black" style={{ fontSize: '10px', fontWeight: 400 }}>coins</p>
            </div>
            <div className="text-center px-2">
              <p className="text-black mb-1" style={{ fontSize: '10px', fontWeight: 600 }}>Tomato level</p>
              <p className="text-black mb-0.5" style={{ fontSize: '16px', fontWeight: 700 }}>Lv. 8</p>
              <p className="text-black" style={{ fontSize: '10px', fontWeight: 400 }}>Growing</p>
            </div>
            <div className="text-center px-2">
              <p className="text-black mb-1" style={{ fontSize: '10px', fontWeight: 600 }}>Missions</p>
              <p className="text-black mb-0.5" style={{ fontSize: '16px', fontWeight: 700 }}>3</p>
              <p className="text-black" style={{ fontSize: '10px', fontWeight: 400 }}>Completed</p>
            </div>
          </div>
        </div>

        {/* History section */}
        <div className="px-4">
          <h2 className="text-black mb-3" style={{ fontSize: '20px', fontWeight: 700 }}>
            History
          </h2>

          <div className="bg-white rounded-2xl p-4 border-2 border-black/20">
            {/* Upload button */}
            <input
              ref={photoInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
            <button
              onClick={() => photoInputRef.current?.click()}
              className="w-full h-32 bg-gray-200 rounded-2xl border-2 border-black/20 flex items-center justify-center mb-3 hover:bg-gray-300 transition-colors"
            >
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>

            {/* Photo grid */}
            {photos.length > 0 && (
              <div className="grid grid-cols-2 gap-3">
                {photos.map((photo) => (
                  <div
                    key={photo.id}
                    onClick={() => setSelectedPhoto(photo)}
                    className="aspect-square bg-white rounded-2xl border-2 border-black/20 overflow-hidden cursor-pointer hover:opacity-80 transition-opacity relative"
                  >
                    <img src={photo.url} alt={`Photo ${photo.date}`} className="w-full h-full object-cover" />
                    <div className="absolute top-2 left-2 bg-white/90 px-2 py-1 rounded">
                      <span className="text-black" style={{ fontSize: '10px', fontWeight: 600 }}>{photo.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Photo modal */}
      {selectedPhoto && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-md h-[80vh] relative border-2 border-black/20 flex items-center justify-center">
            {/* Close button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Photo */}
            <img src={selectedPhoto.url} alt="Selected" className="max-w-full max-h-full object-contain rounded-2xl" />
          </div>
        </div>
      )}

      {/* Fixed bottom tab bar */}
      <div className="absolute bottom-0 left-0 right-0">
        <TabBar activeTab="profile" onTab1Click={onHomeClick} onTab2Click={onMissionClick} onTab3Click={onIslandClick} onTab4Click={() => {}} />
      </div>
    </div>
  );
}
