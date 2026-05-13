import { useState } from "react";

interface Signup3ScreenProps {
  onGetStarted: () => void;
}

export default function Signup3Screen({ onGetStarted }: Signup3ScreenProps) {
  const [nickname, setNickname] = useState("");

  const handleGetStarted = () => {
    if (nickname.trim()) {
      onGetStarted();
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#EDEDEE] px-4 overflow-hidden justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pt-5 pb-4 flex-shrink-0">
        <h1 className="text-black" style={{ fontSize: '35px', fontWeight: 700 }}>
          Sign Up
        </h1>
        <span className="text-black" style={{ fontSize: '21px', fontWeight: 400 }}>
          3/3
        </span>
      </div>

      {/* Nickname field */}
      <div className="flex-1 min-h-0">
        <label className="block mb-1 text-black" style={{ fontSize: '18px', fontWeight: 700 }}>
          Nickname
        </label>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="Please enter your nickname"
          className="w-full px-3 py-2 bg-[#D1D1D4] rounded-lg text-black placeholder:text-black/50"
          style={{ fontSize: '18px', fontWeight: 400 }}
        />
      </div>

      {/* Get started button */}
      <div className="flex-shrink-0 pb-4">
        <button
          onClick={handleGetStarted}
          disabled={!nickname.trim()}
          className="w-full py-2.5 bg-[#2C2C2E] text-white rounded-xl disabled:opacity-50"
          style={{ fontSize: '19px', fontWeight: 700 }}
        >
          Get started
        </button>
      </div>
    </div>
  );
}
