import { FaGithub, FaGoogle } from "react-icons/fa";
import Button from "../common/button";
import { signIn } from "next-auth/react";
import { LOGIN_REDIRECT } from "@/route";

const SocialAuth = () => {
  const handleClick = (provider: "github" | "google") => {
    signIn(provider, { callbackUrl: LOGIN_REDIRECT });
  };

  return (
    <div className="flex gap-2 flex-col md:flex-row justify-between">
      <Button
        type="button"
        label="Continue with Github"
        outline
        icon={FaGithub}
        onClick={() => {
          handleClick("github");
        }}
      />
      <Button
        type="button"
        label="Continue with Google"
        outline
        icon={FaGoogle}
        onClick={() => {
          handleClick("google");
        }}
      />
    </div>
  );
};

export default SocialAuth;
