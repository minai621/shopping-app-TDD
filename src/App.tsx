import React from 'react';
import './App.css';
import { OrderContextProvider } from './context/OrderContext';
import OrderPage from './pages/OrderPage/OrderPage';

function App() {
  return (
    <div style={{ padding: '4rem' }}>
      <OrderContextProvider>
        <OrderPage />
      </OrderContextProvider>
    </div>
  );
}

export default App;
