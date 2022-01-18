import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import ErrorBanner from '../../components/OrderPage/ErrorBanner';
import { OrderContext } from '../../context/OrderContext';

export default function CompeletePage({
  setStep,
}: {
  setStep?: (value: number) => void;
}) {
  const [OrderData, resetOrderData] = useContext(OrderContext);
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    orderCompleted(OrderData);
  }, [OrderData]);
  const orderCompleted = async (orderData: any) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/order',
        orderData,
      );
      setOrderHistory(response.data);
      setLoading(false);
    } catch (error) {
      setError(true);
    }
  };
  if (error) {
    return <ErrorBanner message='에러가 발생했습니다.' />;
  }

  const orderTable = orderHistory.map((item: any) => {
    return (
      <tr key={item.orderNumber}>
        <td>{item.orderNumber}</td>
        <td>{item.price}</td>
      </tr>
    );
  });
  if (loading) {
    return <div>loading</div>;
  } else {
    return (
      <div style={{ textAlign: 'center' }}>
        <h2>주문이 성공했습니다.</h2>
        <h3>지금까지 모든 주문</h3>
        <table>
          <tbody style={{ margin: 'auto' }}>
            <tr>
              <th>주문 번호</th>
              <th>주문 가격</th>
            </tr>
            {orderTable}
          </tbody>
        </table>
        <button
          onClick={() => {
            resetOrderData();
            if (setStep) {
              setStep(0);
            }
          }}
        >
          첫 페이지로
        </button>
      </div>
    );
  }
}
