import React, { useState } from 'react';
import { Header } from '../components/dashboard/Header';
import { Sidebar } from '../components/dashboard/Sidebar';
import { DashboardOverview } from '../components/dashboard/DashboardOverview';
import { AutoInsurance } from '../components/insurance/AutoInsurance';
import { ClaimsManagement } from '../components/claims/ClaimsManagement';
import { TravelInsurance } from '../components/insurance/TravelInsurance';
import { HousingInsurance } from '../components/insurance/HousingInsurance';
import { EducationInsurance } from '../components/insurance/EducationInsurance';
import { IncidentManagement } from '../components/incidents/IncidentManagement';
import { PaymentHistory } from '../components/payments/PaymentHistory';
import { DocumentManager } from '../components/documents/DocumentManager';

type DashboardSection = 'dashboard' | 'auto' | 'travel' | 'housing' | 'education' | 'incidents' | 'claims' | 'payments' | 'documents' | 'reports';

export const DashboardPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<DashboardSection>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section as DashboardSection);
    setIsMobileMenuOpen(false);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardOverview onNavigate={handleSectionChange} />;
      case 'auto':
        return <AutoInsurance />;
      case 'claims':
        return <ClaimsManagement />;
      case 'travel':
        return <TravelInsurance />;
      case 'housing':
        return <HousingInsurance />;
      case 'education':
        return <EducationInsurance />;
      case 'incidents':
        return <IncidentManagement />;
      case 'payments':
        return <PaymentHistory />;
      case 'documents':
        return <DocumentManager />;
      case 'reports':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Rapports et Statistiques</h2>
            <p className="text-slate-600">Cette section sera disponible prochainement</p>
          </div>
        );
      default:
        return <DashboardOverview onNavigate={handleSectionChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        isOpen={isMobileMenuOpen}
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          onMenuToggle={handleMenuToggle}
          isMobileMenuOpen={isMobileMenuOpen}
        />
        
        <main className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};