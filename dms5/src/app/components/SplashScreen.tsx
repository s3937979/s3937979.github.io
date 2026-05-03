import wandoLogoMark from "../../imports/wando-logo-mark.svg";

export default function SplashScreen() {
  return (
    <div className="h-full flex items-center justify-center bg-[#EDEDEE]">
      <div className="flex items-center gap-2">
        <img
          src={wandoLogoMark}
          alt="Wando logo"
          className="w-[48px] h-[48px] object-contain"
        />

        {/* App name */}
        <h1 className="text-[31px] font-bold text-black tracking-tight" style={{ fontWeight: 700 }}>
          Wando
        </h1>
      </div>
    </div>
  );
}
