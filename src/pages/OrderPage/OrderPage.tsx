import { useContext } from 'react';
import { OrderContext } from '../../context/OrderContext';
import Type from './Type';

export default function OrderPage({
  setStep,
}: {
  setStep?: (value: number) => void;
}) {
  const [orderData] = useContext(OrderContext);
  return (
    <div>
      <h1>Travel Products</h1>
      <div>
        <Type orderType='products' />
      </div>
      <div style={{ display: 'flex', marginTop: 20 }}>
        <div style={{ width: '50%' }}>
          <Type orderType='options' />
        </div>
        <div>
          <h2>Total Price: {orderData.total.total}</h2>
          <br />
          <button
            onClick={() => {
              if (setStep) {
                setStep(1);
              }
            }}
          >
            주문 하기
          </button>
        </div>
      </div>
    </div>
  );
}
