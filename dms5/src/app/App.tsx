import { useEffect, useState } from "react";
import SplashScreen from "./components/SplashScreen";
import Splash1Screen from "./components/Splash1Screen";
import Splash2Screen from "./components/Splash2Screen";
import Splash3Screen from "./components/Splash3Screen";
import SigninScreen from "./components/SigninScreen";
import SignupScreen from "./components/SignupScreen";
import HomeScreen from "./components/HomeScreen";
import NotificationOverlay from "./components/NotificationOverlay";
import CalendarScreen from "./components/CalendarScreen";
import MissionScreen from "./components/MissionScreen";
import IslandMainScreen from "./components/IslandMainScreen";
import IslandDecorateScreen from "./components/IslandDecorateScreen";
import CustomizeScreen from "./components/CustomizeScreen";
import FriendsScreen from "./components/FriendsScreen";
import StoreScreen from "./components/StoreScreen";
import StoreClosetScreen from "./components/StoreClosetScreen";
import StoreAppearanceScreen from "./components/StoreAppearanceScreen";
import ProfileScreen from "./components/ProfileScreen";
import SettingsScreen from "./components/SettingsScreen";
import type { AppPage, DecorateCategory, IslandDecoration, MissionCategory, PurchasedCharacterItem, PurchasedDecorItem, SavedUser } from "./types";

const savedUserStorageKey = "wando.savedUser";

function getSavedUser(): SavedUser | null {
  try {
    const savedUser = window.localStorage.getItem(savedUserStorageKey);
    return savedUser ? JSON.parse(savedUser) : null;
  } catch {
    return null;
  }
}

function saveUser(user: SavedUser) {
  window.localStorage.setItem(savedUserStorageKey, JSON.stringify(user));
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>("logo");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [homeElapsedSeconds, setHomeElapsedSeconds] = useState(0);
  const [missionCategory, setMissionCategory] = useState<MissionCategory>("starter");
  const [decorateCategory, setDecorateCategory] = useState<DecorateCategory>("house");
  const [islandDecorations, setIslandDecorations] = useState<IslandDecoration[]>([]);
  const [purchasedDecorItems, setPurchasedDecorItems] = useState<PurchasedDecorItem[]>([]);
  const [purchasedCharacterItems, setPurchasedCharacterItems] = useState<PurchasedCharacterItem[]>([]);
  const [equippedCharacterItem, setEquippedCharacterItem] = useState<PurchasedCharacterItem | null>(null);
  const [islandName, setIslandName] = useState("Island");
  const [userName, setUserName] = useState(() => getSavedUser()?.nickname || "Tommy");

  const totalSlides = 4; // Splash1, Splash2, Splash3, Signin

  // Auto-transition from logo page to onboarding after 3 seconds
  useEffect(() => {
    if (currentPage === "logo") {
      const timer = setTimeout(() => {
        setCurrentPage("onboarding");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentPage]);

  const goToNext = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const goToPrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToHome = () => {
    setCurrentPage("home");
  };

  const handleSignin = (email: string, password: string) => {
    const savedUser = getSavedUser();

    if (!savedUser) {
      return "Please create an account first.";
    }

    if (savedUser.email !== email.trim() || savedUser.password !== password) {
      return "Email or password is incorrect.";
    }

    setUserName(savedUser.nickname);
    goToHome();
    return "";
  };

  const goToSignup = () => {
    setCurrentPage("signup");
  };

  const handleSignupComplete = (user: SavedUser) => {
    saveUser(user);
    setUserName(user.nickname);
    goToHome();
  };

  const goToSignin = () => {
    setCurrentPage("onboarding");
    setCurrentSlide(3); // Navigate to Signin screen (4th slide, index 3)
  };

  const goToCalendar = () => {
    setCurrentPage("calendar");
  };

  const handleNotificationClick = () => {
    setShowNotification(true);
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  const goToMission = (category: MissionCategory = "starter") => {
    setMissionCategory(category);
    setCurrentPage("mission");
  };

  const handleMissionCategoryChange = (category: MissionCategory) => {
    setMissionCategory(category);
  };

  const goToIslandMain = () => {
    setCurrentPage("island-main");
  };

  const goToIslandDecorate = (category: DecorateCategory = "house") => {
    setDecorateCategory(category);
    setCurrentPage("island-decorate");
  };

  const handleDecorateCategoryChange = (category: DecorateCategory) => {
    setDecorateCategory(category);
  };

  const goToStore = () => {
    setCurrentPage("store");
  };

  const goToFriends = () => {
    setCurrentPage("friends");
  };

  const goToCustomize = () => {
    setCurrentPage("customize");
  };

  const goToStoreCloset = () => {
    setCurrentPage("store-closet");
  };

  const goToStoreAppearance = () => {
    setCurrentPage("store-appearance");
  };

  const goToProfile = () => {
    setCurrentPage("profile");
  };

  const goToSettings = () => {
    setCurrentPage("settings");
  };

  const handleUserNameChange = (nextUserName: string) => {
    setUserName(nextUserName);

    const savedUser = getSavedUser();
    if (savedUser) {
      saveUser({
        ...savedUser,
        nickname: nextUserName,
      });
    }
  };

  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-black">
      {/* Mobile app container */}
      <div className="w-full max-w-[393px] h-[100dvh] relative overflow-hidden" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        {currentPage === "logo" && (
          // Logo Page - no interaction
          <SplashScreen />
        )}

        {currentPage === "onboarding" && (
          // Onboarding screens - click-based navigation
          <div className="h-full w-full relative">
            <div
              className="flex h-full transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {/* Splash1 Screen */}
              <div className="w-full h-full flex-shrink-0">
                <Splash1Screen onNext={goToNext} />
              </div>

              {/* Splash2 Screen */}
              <div className="w-full h-full flex-shrink-0">
                <Splash2Screen onPrevious={goToPrevious} onNext={goToNext} />
              </div>

              {/* Splash3 Screen */}
              <div className="w-full h-full flex-shrink-0">
                <Splash3Screen onPrevious={goToPrevious} onNext={goToNext} />
              </div>

              {/* Signin Screen */}
              <div className="w-full h-full flex-shrink-0">
                <SigninScreen onGetStarted={handleSignin} onCreateAccount={goToSignup} />
              </div>
            </div>
          </div>
        )}

        {currentPage === "signup" && <SignupScreen onComplete={handleSignupComplete} />}

        {currentPage === "home" && (
          <>
            <HomeScreen
              onNotificationClick={handleNotificationClick}
              onCalendarClick={goToCalendar}
              onMissionClick={() => goToMission()}
              onIslandClick={goToIslandMain}
              onProfileClick={goToProfile}
              elapsedSeconds={homeElapsedSeconds}
              onElapsedSecondsChange={setHomeElapsedSeconds}
            />
            {showNotification && <NotificationOverlay onClose={handleCloseNotification} />}
          </>
        )}

        {currentPage === "calendar" && <CalendarScreen onBack={goToHome} onHomeClick={goToHome} onMissionClick={() => goToMission()} onIslandClick={goToIslandMain} onProfileClick={goToProfile} />}

        {currentPage === "mission" && (
          <MissionScreen
            onHomeClick={goToHome}
            onMissionClick={() => goToMission()}
            onIslandClick={goToIslandMain}
            onProfileClick={goToProfile}
            initialCategory={missionCategory}
            onCategoryChange={handleMissionCategoryChange}
          />
        )}

        {currentPage === "island-main" && (
          <IslandMainScreen
            onStoreClick={goToStore}
            onFriendsClick={goToFriends}
            onDecorateClick={() => goToIslandDecorate()}
            onCustomizeClick={goToCustomize}
            onHomeClick={goToHome}
            onMissionClick={() => goToMission()}
            onProfileClick={goToProfile}
            islandName={islandName}
            onIslandNameChange={setIslandName}
            decorations={islandDecorations}
            equippedCharacterItem={equippedCharacterItem}
          />
        )}

        {currentPage === "island-decorate" && (
          <IslandDecorateScreen
            initialCategory={decorateCategory}
            onBack={goToIslandMain}
            onCategoryChange={handleDecorateCategoryChange}
            onHomeClick={goToHome}
            onMissionClick={() => goToMission()}
            onProfileClick={goToProfile}
            islandName={islandName}
            purchasedItems={purchasedDecorItems}
            decorations={islandDecorations}
            onDecorationsChange={setIslandDecorations}
          />
        )}

        {currentPage === "store" && (
          <StoreScreen
            onBack={goToIslandMain}
            onHomeClick={goToHome}
            onMissionClick={() => goToMission()}
            onIslandClick={goToIslandMain}
            onProfileClick={goToProfile}
            onClosetClick={goToStoreCloset}
            onAppearanceClick={goToStoreAppearance}
            purchasedDecorItems={purchasedDecorItems}
            onPurchasedDecorItemsChange={setPurchasedDecorItems}
          />
        )}

        {currentPage === "store-closet" && (
          <StoreClosetScreen
            onBack={goToIslandMain}
            onDecorClick={goToStore}
            onAppearanceClick={goToStoreAppearance}
            onHomeClick={goToHome}
            onMissionClick={() => goToMission()}
            onIslandClick={goToIslandMain}
            onProfileClick={goToProfile}
            purchasedItems={purchasedCharacterItems}
            onPurchasedItemsChange={setPurchasedCharacterItems}
          />
        )}

        {currentPage === "store-appearance" && (
          <StoreAppearanceScreen
            onBack={goToIslandMain}
            onDecorClick={goToStore}
            onClosetClick={goToStoreCloset}
            onHomeClick={goToHome}
            onMissionClick={() => goToMission()}
            onIslandClick={goToIslandMain}
            onProfileClick={goToProfile}
            purchasedItems={purchasedCharacterItems}
            onPurchasedItemsChange={setPurchasedCharacterItems}
          />
        )}

        {currentPage === "friends" && (
          <FriendsScreen
            onBack={goToIslandMain}
            onHomeClick={goToHome}
            onMissionClick={() => goToMission()}
            onIslandClick={goToIslandMain}
            onProfileClick={goToProfile}
          />
        )}

        {currentPage === "customize" && (
          <CustomizeScreen
            onStoreClick={goToStore}
            onFriendsClick={goToFriends}
            onHomeClick={goToHome}
            onMissionClick={() => goToMission()}
            onIslandClick={goToIslandMain}
            onProfileClick={goToProfile}
            purchasedItems={purchasedCharacterItems}
            equippedItem={equippedCharacterItem}
            onEquipItem={setEquippedCharacterItem}
          />
        )}

        {currentPage === "profile" && (
          <ProfileScreen
            onHomeClick={goToHome}
            onIslandClick={goToIslandMain}
            onMissionClick={() => goToMission()}
            onSettingsClick={goToSettings}
            userName={userName}
          />
        )}

        {currentPage === "settings" && (
          <SettingsScreen
            onBack={goToProfile}
            onEditProfile={goToProfile}
            onLogout={goToSignin}
            onHomeClick={goToHome}
            onMissionClick={() => goToMission()}
            onIslandClick={goToIslandMain}
            onProfileClick={goToProfile}
            userName={userName}
            onUserNameChange={handleUserNameChange}
          />
        )}
      </div>
    </div>
  );
}
