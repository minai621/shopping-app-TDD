import React, { useState } from 'react';
import './App.css';
import { OrderContextProvider } from './context/OrderContext';
import CompeletePage from './pages/CompletePage/CompletePage';
import OrderPage from './pages/OrderPage/OrderPage';
import SummaryPage from './pages/SummaryPage/SummaryPage';

function App() {
  const [step, setStep] = useState<number>(0);

  return (
    <div style={{ padding: '4rem' }}>
      <OrderContextProvider>
        {step === 0 && <OrderPage setStep={setStep} />}
        {step === 1 && <SummaryPage setStep={setStep} />}
        {step === 2 && <CompeletePage setStep={setStep} />}
      </OrderContextProvider>
    </div>
  );
}

export default App;
