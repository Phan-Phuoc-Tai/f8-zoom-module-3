import Form from "../components/parent/Form";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex justify-center">
      <div className="flex items-center justify-center">
        <div className="grid grid-cols-2 gap-12 w-full">
          <div className="flex items-center justify-center">
            <img
              src="/images/login_img.png"
              className="max-w-130 object-cover"
            />
          </div>

          <div className="flex items-center justify-center flex-col gap-3">
            <div className="h-15 flex items-center justify-center">
              <img src="/images/ins-logo.svg" />
            </div>
            <div className="flex items-center justify-center w-full mx-auto flex-col">
              <Form />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
