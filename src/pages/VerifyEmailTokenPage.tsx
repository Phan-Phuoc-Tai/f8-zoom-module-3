import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { Spinner } from "../components/ui/spinner";
import { useEffect } from "react";

export default function VerifyEmailTokenPage() {
  const { token } = useParams();
  const { handleVerifyEmail, isVerified } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isVerified) {
      if (handleVerifyEmail && token) {
        handleVerifyEmail(token);
      }
      return;
    }
    if (isVerified) {
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
  }, [isVerified]);
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white border border-black/10 shadow-md p-8 rounded-lg">
        <div className="flex items-center justify-center h-20">
          <img src="/images/ins-logo.svg" className="object-cover" />
        </div>
        <div className="flex items-center justify-center flex-col w-[500px]">
          {isVerified ? (
            <p className="text-xl text-green-500 font-medium text-center">
              Email đã xác thực thành công. Đang chuyển đến trang đăng nhập...
            </p>
          ) : (
            <div className="flex items-center gap-2 text-xl font-medium">
              <Spinner />
              <p>Đang xác thực...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
