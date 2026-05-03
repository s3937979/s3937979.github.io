import { useState } from "react";

interface Signup1ScreenProps {
  onNext: (email: string) => void;
}

export default function Signup1Screen({ onNext }: Signup1ScreenProps) {
  const [email, setEmail] = useState("");

  const handleNext = () => {
    if (email.trim()) {
      onNext(email);
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#EDEDEE] px-4 overflow-hidden justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pt-5 pb-4 flex-shrink-0">
        <h1 className="text-black" style={{ fontSize: '28px', fontWeight: 700 }}>
          Sign Up
        </h1>
        <span className="text-black" style={{ fontSize: '14px', fontWeight: 400 }}>
          1/3
        </span>
      </div>

      {/* Email field */}
      <div className="flex-1 min-h-0">
        <label className="block mb-1 text-black" style={{ fontSize: '11px', fontWeight: 700 }}>
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Please enter your email"
          className="w-full px-3 py-2 bg-[#D1D1D4] rounded-lg text-black placeholder:text-black/50"
          style={{ fontSize: '11px', fontWeight: 400 }}
        />
      </div>

      {/* Next button */}
      <div className="flex-shrink-0 pb-4">
        <button
          onClick={handleNext}
          disabled={!email.trim()}
          className="w-full py-2.5 bg-[#2C2C2E] text-white rounded-xl disabled:opacity-50"
          style={{ fontSize: '12px', fontWeight: 700 }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
