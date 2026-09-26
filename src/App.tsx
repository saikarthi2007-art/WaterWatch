import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { CitizenPortal } from './components/CitizenPortal';
import { AuthorityPortal } from './components/AuthorityPortal';
import { OfficerPortal } from './components/OfficerPortal';
import { LoginScreen } from './components/LoginScreen';

const MainContent: React.FC = () => {
  const { role } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col justify-between">
      <div>
        <Navbar />
        {role === 'LOGIN' && <LoginScreen />}
        {role === 'LANDING' && <LandingPage />}
        {role === 'CITIZEN' && <CitizenPortal />}
        {role === 'AUTHORITY' && <AuthorityPortal />}
        {role === 'OFFICER' && <OfficerPortal />}
      </div>
      
      {/* Global Footer info bar */}
      <footer className="bg-slate-900 text-slate-400 text-[11px] py-3 px-4 border-t border-slate-800 text-center">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div>
            <strong>WaterWatch TN</strong> &bull; Tamil Nadu Water Resources Department & Environmental Protection Agency
          </div>
          <div className="text-slate-500">
            Sentinel-2 MSI Analysis &bull; McFeeters NDWI Index &bull; Random Forest ML Classifier
          </div>
        </div>
      </footer>
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
