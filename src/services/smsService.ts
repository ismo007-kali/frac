// Service SMS pour l'envoi d'OTP
export class SMSService {
  private static readonly API_URL = import.meta.env.VITE_SMS_API_URL || 'https://api.sms-niger.com/v1'; // URL fictive pour l'exemple
  private static readonly API_KEY = import.meta.env.VITE_SMS_API_KEY || 'demo-key';

  static async sendOTP(phoneNumber: string, code: string): Promise<boolean> {
    try {
      // Simulation d'envoi SMS réel
      console.log(`Envoi SMS OTP vers ${phoneNumber}: ${code}`);
      
      // Pour la démo, on simule toujours un succès
      return true;
    } catch (error) {
      console.error('Erreur envoi SMS:', error);
      return false;
    }
  }

  static async sendNotification(phoneNumber: string, message: string): Promise<boolean> {
    try {
      console.log(`Notification SMS vers ${phoneNumber}: ${message}`);
      return true;
    } catch (error) {
      console.error('Erreur notification SMS:', error);
      return false;
    }
  }
}

// Générateur d'OTP
export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};