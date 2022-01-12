import Type from './Type';

export default function OrderPage() {
  return (
    <div>
      <h1>Travel Products</h1>
      <div>
        <Type orderType='products' />
      </div>
      <div style={{ display: 'flex', marginTop: 20 }}>
        <Type orderType='options' />
      </div>
      <div>
        <h2>Total Price:</h2>
        <br />
        <button>주문</button>
      </div>
    </div>
  );
}
