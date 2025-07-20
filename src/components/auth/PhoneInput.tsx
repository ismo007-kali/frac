import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  countryCode: string;
  onCountryCodeChange: (code: string) => void;
  error?: string;
  label?: string;
}

const countries = [
  { code: '+227', country: 'NE', flag: '🇳🇪', name: 'Niger' },
  { code: '+33', country: 'FR', flag: '🇫🇷', name: 'France' },
  { code: '+234', country: 'NG', flag: '🇳🇬', name: 'Nigeria' },
  { code: '+1', country: 'US', flag: '🇺🇸', name: 'United States' },
];

export const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  countryCode,
  onCountryCodeChange,
  error,
  label
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const selectedCountry = countries.find(c => c.code === countryCode) || countries[0];

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-2">
          {label}
        </label>
      )}
      <div className="flex gap-2">
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`
              flex items-center gap-2 px-3 py-3 border-2 rounded-xl transition-all duration-200
              ${error 
                ? 'border-red-300 focus:border-red-500' 
                : 'border-slate-200 focus:border-sky-400'
              }
              hover:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-100
            `}
          >
            <span className="text-lg">{selectedCountry.flag}</span>
            <span className="text-sm font-medium">{selectedCountry.code}</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          
          {isOpen && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-10 min-w-[200px]">
              {countries.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => {
                    onCountryCodeChange(country.code);
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-sky-50 first:rounded-t-xl last:rounded-b-xl transition-colors"
                >
                  <span className="text-lg">{country.flag}</span>
                  <div className="flex-1 text-left">
                    <div className="text-sm font-medium">{country.name}</div>
                    <div className="text-xs text-slate-500">{country.code}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
        
        <input
          type="tel"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="XX XX XX XX"
          className={`
            flex-1 px-4 py-3 text-base border-2 rounded-xl transition-all duration-200
            ${error 
              ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
              : 'border-slate-200 focus:border-sky-400 focus:ring-sky-100'
            }
            focus:outline-none focus:ring-2 placeholder:text-slate-400
          `}
        />
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};