import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import ErrorBanner from '../../components/OrderPage/ErrorBanner';
import { OrderContext } from '../../context/OrderContext';
import Options from './Options';
import Products from './Products';

export type Item = {
  name: string;
  imagePath: string;
};

export type OrderType = {
  orderType: string;
};

export default function Type({ orderType }: OrderType): React.ReactElement {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState(false);
  const [orderData, updateItemCount] = useContext(OrderContext);

  useEffect(() => {
    loadItems(orderType);
  }, []);

  const loadItems = async (orderType: string) => {
    try {
      const response = await axios.get(`http://localhost:5000/${orderType}`);
      setItems(response.data);
    } catch (error) {
      setError(true);
    }
  };

  if (error) {
    return <ErrorBanner message='에러가 발생했습니다.' />;
  }

  const ItemComponents = orderType === 'products' ? Products : Options;
  const optionItems = items.map((item) => (
    <ItemComponents
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
      updateItemCount={(itemName, newItemCount) =>
        updateItemCount(itemName, newItemCount, orderType)
      }
    />
  ));

  const orderTypeKorean = orderType === 'products' ? '상품' : '옵션';
  return (
    <>
      <h2>주문 종류</h2>
      <p>하나의 가격:</p>
      <p data-testid='price'>
        {orderTypeKorean} 총 가격: {orderData.total.total}
      </p>
      <div
        style={{
          display: 'flex',
          flexDirection: orderType === 'options' ? 'column' : 'row',
        }}
      >
        {optionItems}
      </div>
    </>
  );
}
