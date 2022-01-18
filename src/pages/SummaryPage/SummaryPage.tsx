import React, { FormEvent, useContext, useState } from 'react';
import { OrderContext } from '../../context/OrderContext';

export default function SummaryPage({
  setStep,
}: {
  setStep?: (value: number) => void;
}) {
  const [checked, setChecked] = useState(false);
  const [orderData] = useContext(OrderContext);
  const productArray = Array.from(orderData.products);
  const productList = productArray.map(([key, value]: any) => (
    <li key={key}>
      {value} {key}
    </li>
  ));

  const hasOptions = orderData.options.size > 0;
  let optionsRender;
  if (hasOptions) {
    const optionsArray = Array.from(orderData.options.keys());
    const optionList = optionsArray.map((key: any) => {
      return <li key={key}>{key}</li>;
    });
    optionsRender = (
      <>
        <h2>옵션: {orderData.total.options}</h2>
        <ul>{optionList}</ul>
      </>
    );
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (setStep) {
      setStep(2);
    }
  };
  return (
    <div>
      <h1>주문 확인</h1>
      <h2>여행 상품: {orderData.total.products}</h2>
      <ul>{productList}</ul>
      {optionsRender}
      <form onSubmit={handleSubmit}>
        <input
          type='checkbox'
          checked={checked}
          id='confirm-checkbox'
          onChange={(e) => setChecked(e.target.checked)}
        />
        <label htmlFor='confirm-checkbox'>주문하려는 것을 확인하셨나요?</label>
        <br />
        <button disabled={!checked} type='submit'>
          주문 확인
        </button>
      </form>
    </div>
  );
}
