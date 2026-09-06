import { useEffect } from "react";
import TabBar from "./TabBar";
import calendarFin from "../../imports/calendar-fin.png";
import colorLayer from "../../imports/color-layer.png";
import homeTomato from "../../imports/home-tomato.png";
import notifiBlack from "../../imports/notifi-black.png";

interface HomeScreenProps {
  onNotificationClick: () => void;
  onCalendarClick: () => void;
  onMissionClick: () => void;
  onIslandClick?: () => void;
  onProfileClick?: () => void;
  elapsedSeconds: number;
  onElapsedSecondsChange: React.Dispatch<React.SetStateAction<number>>;
}

export default function HomeScreen({
  onNotificationClick,
  onCalendarClick,
  onMissionClick,
  onIslandClick,
  onProfileClick,
  elapsedSeconds,
  onElapsedSecondsChange,
}: HomeScreenProps) {
  const goalSteps = 10000;
  const secondsPerStepBatch = 30;
  const stepsPerBatch = 1000;
  const maxKcal = 400;
  const stepsPerSecond = stepsPerBatch / secondsPerStepBatch;

  // Calculate current values continuously instead of jumping every 30 seconds.
  const currentSteps = Math.min(goalSteps, Math.floor(elapsedSeconds * stepsPerSecond));
  const currentKm = currentSteps / stepsPerBatch;
  const currentKcal = Math.floor((currentSteps / goalSteps) * maxKcal);
  const currentCoins = Math.floor(currentSteps / stepsPerBatch);
  const stepsLeft = Math.max(0, goalSteps - currentSteps);

  // Progress bar percentage (0-100%)
  const progressPercent = Math.min(100, (currentSteps / goalSteps) * 100);
  const tomatoBodyColor = blendHexColor("#BCD9A2", "#BB362E", progressPercent / 100);

  // Timer to increment once per second for a live counter effect.
  useEffect(() => {
    const interval = setInterval(() => {
      onElapsedSecondsChange((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [onElapsedSecondsChange]);

  return (
    <div className="h-full flex flex-col bg-[#EDEDEE] overflow-hidden">
      {/* Header section */}
      <div className="flex items-start justify-between px-4 pt-5 pb-3 flex-shrink-0">
        <div>
          <p className="text-black mb-1" style={{ fontSize: '17px', fontWeight: 400 }}>
            Today's Steps
          </p>
          <h1 className="numeric-italic text-black mb-0.5" style={{ fontSize: '39px', fontWeight: 700, lineHeight: '1' }}>
            {currentSteps.toLocaleString()}
          </h1>
          <p className="numeric-italic text-black mb-0.5" style={{ fontSize: '16px', fontWeight: 400 }}>
            {currentKm.toFixed(1)} km / {currentKcal} kcal
          </p>
          <p className="numeric-italic text-black" style={{ fontSize: '16px', fontWeight: 400 }}>
            {currentCoins} coins earned today
          </p>
        </div>

        {/* Bell notification button */}
        <button onClick={onNotificationClick} className="relative mt-1">
          <img src={notifiBlack} alt="Notifications" className="w-[35px] h-[35px] object-contain" />
          <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full"></div>
        </button>
      </div>

      {/* Character illustration placeholder */}
      <div className="flex-1 flex items-center justify-center min-h-0 px-4">
        <div className="relative w-[299px] h-[309px]">
          <div
            className="absolute inset-0 h-full w-full transition-colors duration-1000 ease-linear"
            style={{
              backgroundColor: tomatoBodyColor,
              WebkitMaskImage: `url(${colorLayer})`,
              maskImage: `url(${colorLayer})`,
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskSize: "100% 100%",
              maskSize: "100% 100%",
              WebkitMaskPosition: "center",
              maskPosition: "center",
            }}
          />
          <img
            src={homeTomato}
            alt="Tomato character"
            className="absolute inset-0 z-10 h-full w-full object-contain"
          />
        </div>
      </div>

      {/* Progress bar section */}
      <div className="flex-shrink-0 px-4 pb-3">
        <div className="relative">
          {/* Progress bar background */}
          <div className="relative h-5 bg-white rounded-full border-2 border-black overflow-hidden">
            {/* Green progress fill */}
            <div
              className="h-full bg-[#7A9B5F] transition-all duration-1000 ease-linear"
              style={{ width: `${progressPercent}%` }}
            />
            {/* White indicator circle */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-black transition-all duration-1000 ease-linear"
              style={{ left: `calc(${progressPercent}% - 8px)` }}
            />
          </div>

          {/* Labels */}
          <div className="flex justify-between mt-0.5">
            <span className="numeric-italic text-black" style={{ fontSize: '15px', fontWeight: 400 }}>0</span>
            <span className="numeric-italic text-black" style={{ fontSize: '15px', fontWeight: 400 }}>10,000</span>
          </div>
        </div>

        {/* Steps left text */}
        <p className="numeric-italic text-right text-black mt-1" style={{ fontSize: '16px', fontWeight: 400 }}>
          {stepsLeft.toLocaleString()} steps left
        </p>
      </div>

      {/* Calendar button */}
      <div className="flex-shrink-0 px-4 pb-2">
        <button
          onClick={onCalendarClick}
          className="w-14 h-14 flex items-center justify-center"
        >
          <img src={calendarFin} alt="Calendar" className="w-[49px] h-[49px] object-contain" />
        </button>
      </div>

      {/* Bottom tab bar */}
      <TabBar activeTab="home" onTab1Click={() => {}} onTab2Click={onMissionClick} onTab3Click={onIslandClick} onTab4Click={onProfileClick} />
    </div>
  );
}

function blendHexColor(from: string, to: string, amount: number) {
  const start = hexToRgb(from);
  const end = hexToRgb(to);
  const ratio = Math.min(1, Math.max(0, amount));

  const mixed = start.map((channel, index) =>
    Math.round(channel + (end[index] - channel) * ratio)
  );

  return `rgb(${mixed[0]}, ${mixed[1]}, ${mixed[2]})`;
}

function hexToRgb(hex: string) {
  const value = hex.replace("#", "");
  return [
    Number.parseInt(value.slice(0, 2), 16),
    Number.parseInt(value.slice(2, 4), 16),
    Number.parseInt(value.slice(4, 6), 16),
  ];
}
