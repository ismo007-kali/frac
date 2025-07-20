import React, { useState } from 'react';
import { Eye, EyeOff, Phone, Lock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { PhoneInput } from './PhoneInput';

interface LoginFormProps {
  onSwitchToRegister: () => void;
  onForgotPassword: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSwitchToRegister,
  onForgotPassword
}) => {
  const { login, loading } = useAuth();
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+227');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!phone.trim()) {
      newErrors.phone = 'Le numéro de téléphone est requis';
    } else if (!/^\d{8}$/.test(phone.trim())) {
      newErrors.phone = 'Le numéro doit contenir 8 chiffres';
    }
    
    if (!password) {
      newErrors.password = 'Le mot de passe est requis';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    const fullPhone = `${countryCode}${phone}`;
    const success = await login(fullPhone, password);
    
    if (!success) {
      setErrors({ general: 'Numéro ou mot de passe incorrect' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Connexion</h1>
        <p className="text-slate-600">Accédez à votre espace FRACTALIS</p>
      </div>

      {errors.general && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-red-700 text-sm">{errors.general}</p>
        </div>
      )}

      <PhoneInput
        label="Numéro de téléphone"
        value={phone}
        onChange={setPhone}
        countryCode={countryCode}
        onCountryCodeChange={setCountryCode}
        error={errors.phone}
      />

      <Input
        type={showPassword ? 'text' : 'password'}
        label="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        leftIcon={<Lock className="w-5 h-5" />}
        rightIcon={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="hover:text-sky-600 transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        }
        error={errors.password}
      />

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-sm text-sky-600 hover:text-sky-700 font-medium"
        >
          Mot de passe oublié ?
        </button>
      </div>

      <Button
        type="submit"
        loading={loading}
        fullWidth
        size="lg"
      >
        Se connecter
      </Button>

      <div className="text-center">
        <p className="text-slate-600">
          Pas encore de compte ?{' '}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-sky-600 hover:text-sky-700 font-semibold"
          >
            S'inscrire
          </button>
        </p>
      </div>
    </form>
  );
};