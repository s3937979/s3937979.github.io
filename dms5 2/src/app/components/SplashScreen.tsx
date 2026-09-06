import logoImage from "../../imports/logo.png";

export default function SplashScreen() {
  return (
    <div className="h-full flex items-center justify-center bg-[#EDEDEE]">
      <div className="flex items-center gap-3">
        <img
          src={logoImage}
          alt="Wando logo"
          className="w-[96px] h-[96px] object-contain"
        />

        {/* App name */}
        <h1 className="text-[46px] font-bold text-black" style={{ fontWeight: 700 }}>
          Wando
        </h1>
      </div>
    </div>
  );
}
