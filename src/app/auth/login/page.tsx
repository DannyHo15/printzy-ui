'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createSelectors } from '@/lib/auto-genarate-selector';
import { useAuthStore } from '@/store/auth/auth.state';

enum MODE {
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  RESET_PASSWORD = 'RESET_PASSWORD',
  EMAIL_VERIFICATION = 'EMAIL_VERIFICATION',
}

const LoginPage = () => {
  const authStore = createSelectors(useAuthStore);
  const loginAction = authStore.use.login();
  const registerAction = authStore.use.register();
  const resetAction = authStore.use.reset();
  const isLoading = authStore.use.loading();
  const isSuccess = authStore.use.isSuccess();
  const resetIsSuccess = authStore.use.setSuccess();

  const router = useRouter();

  const [mode, setMode] = useState(MODE.LOGIN);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailCode, setEmailCode] = useState('');

  let formTitle;
  if (mode === MODE.LOGIN) {
    formTitle = 'Log in';
  } else if (mode === MODE.REGISTER) {
    formTitle = 'Register';
  } else if (mode === MODE.RESET_PASSWORD) {
    formTitle = 'Reset Your Password';
  } else {
    formTitle = 'Verify Your Email';
  }

  let buttonTitle;
  if (mode === MODE.LOGIN) {
    buttonTitle = 'Login';
  } else if (mode === MODE.REGISTER) {
    buttonTitle = 'Register';
  } else if (mode === MODE.RESET_PASSWORD) {
    buttonTitle = 'Reset';
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      switch (mode) {
        case MODE.LOGIN:
          loginAction({
            email,
            password,
          });
          break;
        case MODE.REGISTER:
          registerAction({
            email,
            firstName,
            lastName,
            password,
          });
          break;
        case MODE.RESET_PASSWORD:
          resetAction({
            email,
          });
          break;
        default:
          break;
      }
    } catch (err: any) {
    } finally {
    }
  };

  useEffect(() => {
    if (isSuccess) {
      switch (mode) {
        case MODE.LOGIN:
          router.push('/');
          break;
        case MODE.REGISTER:
          setMode(MODE.LOGIN);
          router.push('/auth/login');
          break;
        case MODE.RESET_PASSWORD:
          setMode(MODE.LOGIN);
          router.push('/auth/login');
          break;
        default:
          break;
      }
      resetIsSuccess(false);
    }
  }, [isSuccess, router]);

  return (
    <div className="flex items-center justify-center  w-full px-12">
      <form className="flex flex-col gap-8 w-full" onSubmit={handleSubmit}>
        {mode === MODE.REGISTER ? (
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">First name</label>
            <input
              type="text"
              name="firstName"
              placeholder="john"
              className="ring-2 ring-gray-300 rounded-md p-4"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
        ) : null}
        {mode === MODE.REGISTER ? (
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">Last name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Williams"
              className="ring-2 ring-gray-300 rounded-md p-4"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        ) : null}

        {mode !== MODE.EMAIL_VERIFICATION ? (
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">E-mail</label>
            <input
              type="email"
              name="email"
              placeholder="john@gmail.com"
              className="ring-2 ring-gray-300 rounded-md p-4"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">Verification Code</label>
            <input
              type="text"
              name="emailCode"
              placeholder="Code"
              className="ring-2 ring-gray-300 rounded-md p-4"
              onChange={(e) => setEmailCode(e.target.value)}
            />
          </div>
        )}
        {mode === MODE.LOGIN || mode === MODE.REGISTER ? (
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="ring-2 ring-gray-300 rounded-md p-4"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        ) : null}
        {mode === MODE.LOGIN && (
          <div
            className="text-sm underline cursor-pointer"
            onClick={() => setMode(MODE.RESET_PASSWORD)}
          >
            Forgot Password?
          </div>
        )}
        <button
          className="bg-lama text-white p-2 rounded-md disabled:bg-pink-200 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : buttonTitle}
        </button>
        {mode === MODE.LOGIN && (
          <div
            className="text-sm underline cursor-pointer"
            onClick={() => setMode(MODE.REGISTER)}
          >
            {"Don't"} have an account?
          </div>
        )}
        {mode === MODE.REGISTER && (
          <div
            className="text-sm underline cursor-pointer"
            onClick={() => setMode(MODE.LOGIN)}
          >
            Have and account?
          </div>
        )}
        {mode === MODE.RESET_PASSWORD && (
          <div
            className="text-sm underline cursor-pointer"
            onClick={() => setMode(MODE.LOGIN)}
          >
            Go back to Login
          </div>
        )}
      </form>
    </div>
  );
};

export default LoginPage;
