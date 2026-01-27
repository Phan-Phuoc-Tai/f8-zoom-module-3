import { Button } from "../components/ui/button";
import { Spinner } from "../components/ui/spinner";
import { useAuthStore } from "../stores/authStore";

export default function VerifyEmailPage() {
  const { user, handleResendVerificationEmail, isLoading } = useAuthStore();
  const handleResend = () => {
    if (handleResendVerificationEmail && user?.email) {
      handleResendVerificationEmail(user?.email);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white border border-black/10 shadow-md p-8 rounded-lg">
        <div className="flex items-center justify-center h-20">
          <img src="/images/ins-logo.svg" className="object-cover" />
        </div>
        <div className="flex items-center justify-center flex-col">
          <h1 className="text-3xl font-semibold">Xác thực email</h1>
          <p className="mt-3 mb-5 text-xl font-normal">
            Chúng tôi đã gửi link xác thực đến email của bạn.
            <br />
            Vui lòng kiểm tra hộp thư để kích hoạt tài khoản.
          </p>
          <Button
            type="submit"
            size={null}
            disabled={isLoading}
            className="mt-3 bg-blue-600/90 text-base px-4 py-3 h-auto hover:bg-blue-700 cursor-pointer"
            onClick={handleResend}
          >
            {isLoading ? (
              <>
                <Spinner />
                <span>Đang gửi lại mã xác thực email...</span>
              </>
            ) : (
              "Gửi lại xác thực email"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
