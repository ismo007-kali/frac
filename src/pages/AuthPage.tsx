import React, { useState } from 'react';
import { LoginForm } from '../components/auth/LoginForm';
import { RegisterForm } from '../components/auth/RegisterForm';
import { OTPVerification } from '../components/auth/OTPVerification';

type AuthMode = 'login' | 'register' | 'otp' | 'forgot-password';

export const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [otpPhone, setOtpPhone] = useState('');

  const handleOTPSuccess = () => {
    // Redirect will be handled by AuthContext
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
          {mode === 'login' && (
            <LoginForm
              onSwitchToRegister={() => setMode('register')}
              onForgotPassword={() => setMode('forgot-password')}
            />
          )}
          
          {mode === 'register' && (
            <RegisterForm
              onSwitchToLogin={() => setMode('login')}
              onVerifyOTP={(phone) => {
                setOtpPhone(phone);
                setMode('otp');
              }}
            />
          )}
          
          {mode === 'otp' && (
            <OTPVerification
              phone={otpPhone}
              onBack={() => setMode('register')}
              onSuccess={handleOTPSuccess}
            />
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 space-y-2">
          <p className="text-sm text-slate-500">
            © 2024 FRACTALIS COURTAGE - Tous droits réservés
          </p>
          <p className="text-xs text-slate-400">
            Assurance et courtage au Niger - Agrément n° XXX/2024
          </p>
        </div>
      </div>
    </div>
  );
};