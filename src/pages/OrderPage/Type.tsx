import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ErrorBanner from '../../components/OrderPage/ErrorBanner';
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

  useEffect(() => {
    loadItems(orderType);
  }, [orderType]);

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
    />
  ));

  return (
    <>
      <h2>주문 종류</h2>
      <p>하나의 가격:</p>
      <p>총 가격:</p>
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
