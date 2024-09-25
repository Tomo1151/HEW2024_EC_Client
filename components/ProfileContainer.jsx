import { fetchBaseURL } from "@/config/fetchConfig";
import Image from "next/image";

const ProfileContainer = ({ user, posts }) => {
  const profile_image = "https://placeholder.com/150";

  return (
    <section className="flex w-full p-8 shadow-lg rounded-md bg-white">
      <Image
        src={profile_image}
        width={175}
        height={175}
        alt="ユーザーアイコン"
        className="rounded-full shadow-lg"
      />
      <div className="px-12 py-4 grow">
        <p className={"font-bold text-2xl pb-1 border-b-4 tracking-[.075em]"}>
          {user.username}
        </p>
        <p
          className={`${false ? "" : "opacity-35 select-none "}font-bold mt-4`}
        >
          {user.bio || "ここには何も書かれていないようだ"}
        </p>
      </div>
    </section>
  );
};

export default ProfileContainer;
