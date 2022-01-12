import React from 'react';

type option = {
  name: string;
};

export default function Options({ name }: option) {
  return (
    <form>
      <input type='checkbox' id={`${name} option`} />{' '}
      <label htmlFor={`${name} option`}>{name}</label>
    </form>
  );
}
