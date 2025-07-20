import React, { useState } from 'react';
import { Eye, EyeOff, User, Phone, Lock, Check } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { PhoneInput } from './PhoneInput';
import { SMSService, generateOTP } from '../../services/smsService';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
  onVerifyOTP: (phone: string) => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSwitchToLogin,
  onVerifyOTP
}) => {
  const { register, loading } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [countryCode, setCountryCode] = useState('+227');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Le prénom est requis';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Le nom est requis';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Le numéro de téléphone est requis';
    } else if (!/^\d{8}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Le numéro doit contenir 8 chiffres';
    }
    
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }
    
    if (!acceptTerms) {
      newErrors.terms = 'Vous devez accepter les conditions générales';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    // Générer et envoyer l'OTP
    const otp = generateOTP();
    const fullPhone = `${countryCode}${formData.phone}`;
    await SMSService.sendOTP(fullPhone, otp);
    
    onVerifyOTP(fullPhone);
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Inscription</h1>
        <p className="text-slate-600">Créez votre compte FRACTALIS</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="text"
          label="Prénom"
          value={formData.firstName}
          onChange={(e) => updateFormData('firstName', e.target.value)}
          leftIcon={<User className="w-5 h-5" />}
          error={errors.firstName}
        />

        <Input
          type="text"
          label="Nom"
          value={formData.lastName}
          onChange={(e) => updateFormData('lastName', e.target.value)}
          leftIcon={<User className="w-5 h-5" />}
          error={errors.lastName}
        />
      </div>

      <PhoneInput
        label="Numéro de téléphone"
        value={formData.phone}
        onChange={(value) => updateFormData('phone', value)}
        countryCode={countryCode}
        onCountryCodeChange={setCountryCode}
        error={errors.phone}
      />

      <Input
        type={showPassword ? 'text' : 'password'}
        label="Mot de passe"
        value={formData.password}
        onChange={(e) => updateFormData('password', e.target.value)}
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
        helperText="Au moins 6 caractères"
      />

      <Input
        type={showConfirmPassword ? 'text' : 'password'}
        label="Confirmer le mot de passe"
        value={formData.confirmPassword}
        onChange={(e) => updateFormData('confirmPassword', e.target.value)}
        leftIcon={<Lock className="w-5 h-5" />}
        rightIcon={
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="hover:text-sky-600 transition-colors"
          >
            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        }
        error={errors.confirmPassword}
      />

      <div className="space-y-2">
        <label className="flex items-start gap-3 cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="sr-only"
            />
            <div className={`
              w-5 h-5 rounded border-2 flex items-center justify-center transition-colors
              ${acceptTerms 
                ? 'bg-sky-500 border-sky-500' 
                : 'border-slate-300 hover:border-sky-400'
              }
            `}>
              {acceptTerms && <Check className="w-3 h-3 text-white" />}
            </div>
          </div>
          <span className="text-sm text-slate-600 leading-relaxed">
            J'accepte les{' '}
            <button type="button" className="text-sky-600 hover:text-sky-700 font-medium">
              conditions générales d'utilisation
            </button>
            {' '}et la{' '}
            <button type="button" className="text-sky-600 hover:text-sky-700 font-medium">
              politique de confidentialité
            </button>
          </span>
        </label>
        {errors.terms && (
          <p className="text-sm text-red-600">{errors.terms}</p>
        )}
      </div>

      <Button
        type="submit"
        loading={loading}
        fullWidth
        size="lg"
      >
        Créer mon compte
      </Button>

      <div className="text-center">
        <p className="text-slate-600">
          Déjà un compte ?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-sky-600 hover:text-sky-700 font-semibold"
          >
            Se connecter
          </button>
        </p>
      </div>
    </form>
  );
};