import { useState } from "react";
import Signup1Screen from "./Signup1Screen";
import Signup2Screen from "./Signup2Screen";
import Signup3Screen from "./Signup3Screen";
import type { SavedUser } from "../types";

interface SignupScreenProps {
  onComplete: (user: SavedUser) => void;
}

export default function SignupScreen({ onComplete }: SignupScreenProps) {
  const [signupStep, setSignupStep] = useState(1);
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    nickname: "",
  });

  const handleSignup1Next = (email: string) => {
    setSignupData({ ...signupData, email });
    setSignupStep(2);
  };

  const handleSignup2Next = (password: string) => {
    setSignupData({ ...signupData, password });
    setSignupStep(3);
  };

  const handleSignup3Complete = (nickname: string) => {
    const completedUser = {
      ...signupData,
      nickname,
    };

    setSignupData(completedUser);
    onComplete(completedUser);
  };

  return (
    <>
      {signupStep === 1 && <Signup1Screen onNext={handleSignup1Next} />}
      {signupStep === 2 && <Signup2Screen onNext={handleSignup2Next} />}
      {signupStep === 3 && <Signup3Screen onGetStarted={handleSignup3Complete} />}
    </>
  );
}
