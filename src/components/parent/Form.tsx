import { useState } from "react";
import LoginForm from "../children/auth/LoginForm";
import RegisterForm from "../children/auth/RegisterForm";
import { AuthContext } from "../../contexts/AuthContext";

export default function Form() {
  const [triggerRegister, setTriggerRegister] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        triggerRegister,
        setTriggerRegister,
      }}
    >
      {!triggerRegister ? <LoginForm /> : <RegisterForm />}
    </AuthContext.Provider>
  );
}
