import React from 'react';

type OptionsType = {
  name: string;
  updateItemCount: (itemName: string, newItemCount: number) => void;
};

export default function Options({ name, updateItemCount }: OptionsType) {
  return (
    <form>
      <input
        type='checkbox'
        id={`${name} option`}
        onChange={(e) => {
          updateItemCount(name, e.target.checked ? 1 : 0);
        }}
      />{' '}
      <label htmlFor={`${name} option`}>{name}</label>
    </form>
  );
}
