import { useAuthStore } from "../../stores/authStore";

export default function SidebarProfile() {
  const { user } = useAuthStore();
  return (
    <div className="profile flex items-center gap-2 p-2 rounded-md hover:bg-black/10 cursor-pointer">
      <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-300 text-black font-medium">
        <span>{user && user.fullName?.charAt(0).toUpperCase()}</span>
      </div>
      <p>Trang cá nhân</p>
    </div>
  );
}
