'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createSelectors } from '@/lib/auto-genarate-selector';
import { useAuthStore } from '@/store/auth/auth.state';
import { toast } from 'react-toastify';

const ResetPasswordPage = () => {
  const authStore = createSelectors(useAuthStore);
  const resetConfirmAction = authStore.use.resetConfirm();
  const isLoading = authStore.use.loading();
  const isSuccess = authStore.use.isSuccess();
  const resetIsSuccess = authStore.use.setSuccess();

  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Password and confirm password must be similar');
      return;
    }
    resetConfirmAction({ tokenReset: token || '', password });
  };

  useEffect(() => {
    if (isSuccess) {
      router.push('/auth/login');
      resetIsSuccess(false);
    }
  }, [isSuccess, router]);

  return (
    <div className="flex items-center justify-center  w-full px-12">
      <form className="flex flex-col gap-8 w-full" onSubmit={handleSubmit}>
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
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-700">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Enter your password"
            className="ring-2 ring-gray-300 rounded-md p-4"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button
          className="bg-lama text-white p-2 rounded-md disabled:bg-pink-200 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
