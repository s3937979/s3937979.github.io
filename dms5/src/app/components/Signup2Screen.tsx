import { useState } from "react";

interface Signup2ScreenProps {
  onNext: (password: string) => void;
}

export default function Signup2Screen({ onNext }: Signup2ScreenProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleNext = () => {
    if (password.trim() && confirmPassword.trim() && password === confirmPassword) {
      onNext(password);
    }
  };

  const passwordsDoNotMatch = Boolean(password && confirmPassword && password !== confirmPassword);

  return (
    <div className="h-full flex flex-col bg-[#EDEDEE] px-4 overflow-hidden justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pt-5 pb-4 flex-shrink-0">
        <h1 className="text-black" style={{ fontSize: '35px', fontWeight: 700 }}>
          Sign Up
        </h1>
        <span className="text-black" style={{ fontSize: '21px', fontWeight: 400 }}>
          2/3
        </span>
      </div>

      {/* Form fields */}
      <div className="flex-1 min-h-0">
        {/* Password field */}
        <div className="mb-2.5">
          <label className="block mb-1 text-black" style={{ fontSize: '18px', fontWeight: 700 }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Please enter your password"
            className="w-full px-3 py-2 bg-[#D1D1D4] rounded-lg text-black placeholder:text-black/50"
            style={{ fontSize: '18px', fontWeight: 400 }}
          />
        </div>

        {/* Confirm Password field */}
        <div>
          <label className="block mb-1 text-black" style={{ fontSize: '18px', fontWeight: 700 }}>
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Please enter your password"
            className="w-full px-3 py-2 bg-[#D1D1D4] rounded-lg text-black placeholder:text-black/50"
            style={{ fontSize: '18px', fontWeight: 400 }}
          />
        </div>

        {passwordsDoNotMatch && (
          <p className="mt-2 text-[#C0392B]" style={{ fontSize: '14px', fontWeight: 700 }}>
            Passwords do not match.
          </p>
        )}
      </div>

      {/* Next button */}
      <div className="flex-shrink-0 pb-4">
        <button
          onClick={handleNext}
          disabled={!password.trim() || !confirmPassword.trim() || passwordsDoNotMatch}
          className="w-full py-2.5 bg-[#2C2C2E] text-white rounded-xl disabled:opacity-50"
          style={{ fontSize: '19px', fontWeight: 700 }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
