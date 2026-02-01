import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useUserStore } from "../../../stores/userStore";

export default function InfoUser() {
  const { profileUser, userPosts } = useUserStore();
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const {
    followersCount,
    followingCount,
    fullName,
    username,
    profilePicture,
    bio,
  } = profileUser;
  return (
    <>
      <Avatar className="size-37.5 flex items-center justify-center bg-black/10 rounded-full overflow-hidden">
        {profilePicture! && (
          <AvatarImage
            src={`${baseUrl}${profilePicture}`}
            className="object-cover w-full h-full"
          />
        )}

        <AvatarFallback className="font-medium text-black/80">
          {username && username.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="text-[#363636]">
        <h2 className="mb-1 text-2xl font-semibold ">{username}</h2>
        <p className="mb-4">{fullName}</p>
        <div className="flex items-center justify-between gap-4">
          <p>{userPosts.length} bài viết</p>
          <p>{followersCount} người theo dõi</p>
          <p>Đang theo dõi {followingCount} người dùng</p>
        </div>
        <p className="mt-2 text-sm max-w-106">{bio}</p>
      </div>
    </>
  );
}
