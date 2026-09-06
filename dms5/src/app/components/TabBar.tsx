import islandIcon from "../../imports/island-icon.png";
import missionLogo from "../../imports/mission-logo.png";
import profileIcon from "../../imports/profile-icon.png";
import walkingLogo from "../../imports/walking-logo.png";

interface TabBarProps {
  onTab1Click?: () => void;
  onTab2Click?: () => void;
  onTab3Click?: () => void;
  onTab4Click?: () => void;
  activeTab?: "home" | "mission" | "island" | "profile";
}

export default function TabBar({ onTab1Click, onTab2Click, onTab3Click, onTab4Click, activeTab }: TabBarProps) {
  const getIconClass = (tab: NonNullable<TabBarProps["activeTab"]>) =>
    `h-[48px] w-[48px] object-contain transition-opacity ${activeTab && activeTab !== tab ? "opacity-50" : "opacity-100"}`;

  return (
    <div className="flex-shrink-0 px-4 pb-5">
      <div className="bg-[#7A9B5F] rounded-full h-14 w-full flex items-center justify-around px-8">
        <button
          onClick={onTab1Click}
          className="w-12 h-12 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
          aria-label="Home"
        >
          <img src={walkingLogo} alt="" className={getIconClass("home")} />
        </button>
        <button
          onClick={onTab2Click}
          className="w-12 h-12 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
          aria-label="Mission"
        >
          <img src={missionLogo} alt="" className={getIconClass("mission")} />
        </button>
        <button
          onClick={onTab3Click}
          className="w-12 h-12 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
          aria-label="Island"
        >
          <img src={islandIcon} alt="" className={getIconClass("island")} />
        </button>
        <button
          onClick={onTab4Click}
          className="w-12 h-12 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
          aria-label="Profile"
        >
          <img src={profileIcon} alt="" className={getIconClass("profile")} />
        </button>
      </div>
    </div>
  );
}
