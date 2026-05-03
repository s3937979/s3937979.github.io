import footFin from "../../imports/foot-fin.png";

interface Splash1ScreenProps {
  onNext: () => void;
}

export default function Splash1Screen({ onNext }: Splash1ScreenProps) {
  return (
    <div className="h-full flex flex-col bg-[#EDEDEE] px-4 relative overflow-hidden justify-between">
      {/* Progress indicator - clickable */}
      <div className="flex items-center justify-center gap-1.5 pt-4 pb-2 flex-shrink-0">
        <div className="w-6 h-1.5 bg-[#7A9B5F] rounded-full" />
        <div
          className="w-1.5 h-1.5 bg-[#7A9B5F]/30 rounded-full cursor-pointer"
          onClick={onNext}
        />
        <div className="w-1.5 h-1.5 bg-[#7A9B5F]/30 rounded-full" />
      </div>

      {/* Illustration */}
      <div className="flex-1 flex items-center justify-center min-h-0 py-4">
        <img
          src={footFin}
          alt="Tomato character walking"
          className="w-full max-w-[260px] max-h-[420px] object-contain"
        />
      </div>

      {/* Text content */}
      <div className="pb-7 flex-shrink-0">
        <h2 className="text-[22px] mb-1.5 text-black" style={{ fontWeight: 700, lineHeight: '1.2' }}>
          Track your steps.
        </h2>
        <p className="text-[12px] text-black/80 leading-relaxed" style={{ fontWeight: 400 }}>
          Turn your daily walks into progress
          <br />
          and stay motivated every day.
        </p>
      </div>

      {/* Clickable area for next navigation */}
      <div
        className="absolute right-0 top-0 bottom-0 w-1/3 cursor-pointer"
        onClick={onNext}
      />
    </div>
  );
}
