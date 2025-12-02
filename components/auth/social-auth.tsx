import { FaGithub, FaGoogle } from "react-icons/fa";
import Button from "../common/button";

const SocialAuth = () => {
  return (
    <div className="flex gap-2 flex-col md:flex-row justify-between">
      <Button
        type="button"
        label="Continue with Github"
        outline
        icon={FaGithub}
        onClick={() => {}}
      />
      <Button
        type="button"
        label="Continue with Google"
        outline
        icon={FaGoogle}
        onClick={() => {}}
      />
    </div>
  );
};

export default SocialAuth;
