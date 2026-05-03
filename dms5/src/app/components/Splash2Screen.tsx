import coinFin from "../../imports/coin-fin.png";

interface Splash2ScreenProps {
  onPrevious: () => void;
  onNext: () => void;
}

export default function Splash2Screen({ onPrevious, onNext }: Splash2ScreenProps) {
  return (
    <div className="h-full flex flex-col bg-[#EDEDEE] px-4 relative overflow-hidden justify-between">
      {/* Progress indicator - clickable */}
      <div className="flex items-center justify-center gap-1.5 pt-4 pb-2 flex-shrink-0">
        <div
          className="w-1.5 h-1.5 bg-[#7A9B5F]/30 rounded-full cursor-pointer"
          onClick={onPrevious}
        />
        <div className="w-6 h-1.5 bg-[#7A9B5F] rounded-full" />
        <div
          className="w-1.5 h-1.5 bg-[#7A9B5F]/30 rounded-full cursor-pointer"
          onClick={onNext}
        />
      </div>

      {/* Illustration */}
      <div className="flex-1 flex items-center justify-center min-h-0 py-4">
        <img
          src={coinFin}
          alt="Reward coins"
          className="w-full max-w-[312px] max-h-[504px] object-contain"
        />
      </div>

      {/* Text content */}
      <div className="pb-7 flex-shrink-0">
        <h2 className="text-[22px] mb-1.5 text-black" style={{ fontWeight: 700, lineHeight: '1.2' }}>
          Collect rewards.
        </h2>
        <p className="text-[12px] text-black/80 leading-relaxed" style={{ fontWeight: 400 }}>
          The more steps you take,
          <br />
          the more coins you collect.
        </p>
      </div>

      {/* Clickable area for previous navigation */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1/3 cursor-pointer"
        onClick={onPrevious}
      />

      {/* Clickable area for next navigation */}
      <div
        className="absolute right-0 top-0 bottom-0 w-1/3 cursor-pointer"
        onClick={onNext}
      />
    </div>
  );
}
