import cloud1 from "../../imports/cloud1.png";
import cloud2 from "../../imports/cloud2.png";
import islandFin from "../../imports/island-fin.png";

interface Splash3ScreenProps {
  onPrevious: () => void;
  onNext: () => void;
}

export default function Splash3Screen({ onPrevious, onNext }: Splash3ScreenProps) {
  return (
    <div className="h-full flex flex-col bg-[#EDEDEE] px-4 relative overflow-hidden justify-between">
      {/* Progress indicator - clickable */}
      <div className="flex items-center justify-center gap-1.5 pt-4 pb-2 flex-shrink-0">
        <div
          className="w-1.5 h-1.5 bg-[#7A9B5F]/30 rounded-full cursor-pointer"
          onClick={onPrevious}
        />
        <div className="w-1.5 h-1.5 bg-[#7A9B5F]/30 rounded-full" />
        <div className="w-6 h-1.5 bg-[#7A9B5F] rounded-full" />
      </div>

      {/* Illustration */}
      <div className="flex-1 flex items-center justify-center min-h-0 py-4">
        <div className="relative w-full max-w-[300px] h-[360px]">
          <img
            src={cloud1}
            alt=""
            aria-hidden="true"
            className="absolute left-[8px] top-[158px] z-20 w-[201px] object-contain"
          />
          <img
            src={cloud2}
            alt=""
            aria-hidden="true"
            className="absolute right-[-4px] top-[18px] z-20 w-[166px] object-contain"
          />
          <img
            src={islandFin}
            alt="Virtual island"
            className="absolute left-1/2 top-1/2 z-10 w-[238px] -translate-x-1/2 -translate-y-1/2 object-contain"
          />
        </div>
      </div>

      {/* Text content */}
      <div className="pb-7 flex-shrink-0">
        <h2 className="text-[27px] mb-1.5 text-black" style={{ fontWeight: 700, lineHeight: '1.2' }}>
          Build your own island.
        </h2>
        <p className="text-[17px] text-black/80 leading-relaxed" style={{ fontWeight: 400 }}>
          Use your coins to decorate and
          <br />
          grow your virtual island.
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
