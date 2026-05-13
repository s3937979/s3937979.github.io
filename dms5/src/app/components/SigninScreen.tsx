import { useState } from "react";
import loginTomFin from "../../imports/login-tom-fin.png";

interface SigninScreenProps {
  onGetStarted: () => void;
  onCreateAccount: () => void;
}

export default function SigninScreen({ onGetStarted, onCreateAccount }: SigninScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="h-full flex flex-col bg-[#EDEDEE] px-4 overflow-hidden">
      {/* Top section */}
      <div className="flex-shrink-0 pt-16">
        <div className="flex items-center justify-center pb-2">
          <img
            src={loginTomFin}
            alt="Tomato character"
            className="w-[227px] h-[227px] object-contain"
          />
        </div>
      </div>

      {/* Form section */}
      <div className="flex-shrink-0">
        {/* Email field */}
        <div className="mb-2">
          <label className="block mb-1 text-black" style={{ fontSize: '18px', fontWeight: 700 }}>
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ex) wando@email.com"
            className="w-full px-3 py-2 bg-[#D1D1D4] rounded-lg text-black placeholder:text-black/40"
            style={{ fontSize: '18px', fontWeight: 400 }}
          />
        </div>

        {/* Password field */}
        <div className="mb-2.5">
          <label className="block mb-1 text-black" style={{ fontSize: '18px', fontWeight: 700 }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="ex) 123456789"
            className="w-full px-3 py-2 bg-[#D1D1D4] rounded-lg text-black placeholder:text-black/40"
            style={{ fontSize: '18px', fontWeight: 400 }}
          />
        </div>
      </div>

      {/* Bottom section */}
      <div className="flex-shrink-0 mt-3 pb-4">
        {/* Get started button */}
        <button
          onClick={onGetStarted}
          className="w-full py-2.5 bg-[#2C2C2E] text-white rounded-xl mb-2 transition-transform duration-200 ease-out hover:scale-[1.04]"
          style={{ fontSize: '19px', fontWeight: 700 }}
        >
          Get started
        </button>

        {/* Create account link */}
        <div className="text-center" style={{ fontSize: '17px' }}>
          <span className="text-black" style={{ fontWeight: 400 }}>
            Don't have an account?{" "}
          </span>
          <button
            onClick={onCreateAccount}
            className="font-normal text-black underline transition-all duration-150 hover:font-bold"
          >
            Create one
          </button>
        </div>
      </div>
    </div>
  );
}
