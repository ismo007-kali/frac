import React, { useState } from 'react';
import { CreditCard, Smartphone, Check } from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';

const paymentMethods = [
  {
    id: 'airtel',
    name: 'Airtel Money',
    icon: '📱',
    color: 'from-red-500 to-red-600',
    description: 'Paiement rapide et sécurisé'
  },
  {
    id: 'orange',
    name: 'Orange Money',
    icon: '🍊',
    color: 'from-orange-500 to-orange-600',
    description: 'Service de paiement mobile'
  },
  {
    id: 'flooz',
    name: 'Flooz',
    icon: '💳',
    color: 'from-blue-500 to-blue-600',
    description: 'Portefeuille électronique'
  },
  {
    id: 'mynita',
    name: 'Mynita Amanata',
    icon: '🏦',
    color: 'from-green-500 to-green-600',
    description: 'Solution bancaire digitale'
  }
];

interface PaymentMethodsProps {
  amount: number;
  currency: string;
  onPaymentComplete: (method: string, transactionId: string) => void;
}

export const PaymentMethods: React.FC<PaymentMethodsProps> = ({
  amount,
  currency,
  onPaymentComplete
}) => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handlePayment = async () => {
    if (!selectedMethod || !phoneNumber) return;

    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const transactionId = `TXN-${Date.now()}`;
    setIsProcessing(false);
    setShowConfirmation(true);
    
    // Simulate successful payment
    setTimeout(() => {
      onPaymentComplete(selectedMethod, transactionId);
    }, 2000);
  };

  if (showConfirmation) {
    return (
      <Card className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Paiement Confirmé</h2>
        <p className="text-slate-600 mb-4">
          Votre paiement de {amount.toLocaleString()} {currency} a été traité avec succès
        </p>
        <p className="text-sm text-slate-500">
          Vous recevrez une confirmation par SMS
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Choisir un moyen de paiement</h2>
        <p className="text-slate-600">
          Montant à payer: <span className="font-bold text-sky-600">{amount.toLocaleString()} {currency}</span>
        </p>
      </div>

      {/* Payment Methods */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {paymentMethods.map((method) => (
          <label key={method.id} className="cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value={method.id}
              checked={selectedMethod === method.id}
              onChange={(e) => setSelectedMethod(e.target.value)}
              className="sr-only"
            />
            <Card
              className={`
                transition-all duration-200 border-2
                ${selectedMethod === method.id 
                  ? 'border-sky-400 bg-sky-50' 
                  : 'border-slate-200 hover:border-sky-300'
                }
              `}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${method.color} flex items-center justify-center text-2xl`}>
                  {method.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">{method.name}</h3>
                  <p className="text-sm text-slate-600">{method.description}</p>
                </div>
                {selectedMethod === method.id && (
                  <div className="ml-auto">
                    <div className="w-6 h-6 bg-sky-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </label>
        ))}
      </div>

      {/* Phone Number Input */}
      {selectedMethod && (
        <Card>
          <h3 className="font-semibold text-slate-800 mb-4">Numéro de téléphone</h3>
          <div className="flex gap-3">
            <div className="flex items-center gap-2 px-3 py-3 border-2 border-slate-200 rounded-xl">
              <span className="text-lg">🇳🇪</span>
              <span className="text-sm font-medium">+227</span>
            </div>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="XX XX XX XX"
              className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-sky-400 focus:outline-none"
            />
          </div>
          <p className="text-sm text-slate-500 mt-2">
            Entrez le numéro associé à votre compte {paymentMethods.find(m => m.id === selectedMethod)?.name}
          </p>
        </Card>
      )}

      {/* Payment Button */}
      {selectedMethod && phoneNumber && (
        <Button
          onClick={handlePayment}
          loading={isProcessing}
          fullWidth
          size="lg"
          leftIcon={<CreditCard className="w-5 h-5" />}
        >
          {isProcessing ? 'Traitement en cours...' : `Payer ${amount.toLocaleString()} ${currency}`}
        </Button>
      )}
    </div>
  );
};