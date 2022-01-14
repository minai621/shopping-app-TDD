import React, { ChangeEvent } from 'react';

export type ProductsType = {
  name: string;
  imagePath: string;
  updateItemCount: (itemName: string, newItemCount: number) => void;
};

export default function Products({
  name,
  imagePath,
  updateItemCount,
}: ProductsType) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const currentValue = Number(event.target.value);
    updateItemCount(name, currentValue);
  };
  return (
    <div style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%' }}
        src={`http://localhost:5000/${imagePath}`}
        alt={`${name} product`}
      />
      <form style={{ marginTop: '10px' }}>
        <label htmlFor={name} style={{ textAlign: 'right' }}>
          {name}
        </label>
        <input
          id={name}
          style={{ marginLeft: 7 }}
          type='number'
          name='quantity'
          min='0'
          defaultValue={0}
          onChange={handleChange}
        />
      </form>
    </div>
  );
}
