import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { OrderContextProvider } from '../../../context/OrderContext';
import Type from '../../OrderPage/Type';

// eslint-disable-next-line quotes
test("update product's total when products change", async () => {
  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
    render(<Type orderType='products' />, { wrapper: OrderContextProvider });
  });
  const productsTotal = screen.getByText('총 가격', { exact: false });
  expect(productsTotal).toHaveTextContent('0');

  const americaInput = await screen.findByRole('spinbutton', {
    name: 'America',
  });

  userEvent.clear(americaInput);
  userEvent.type(americaInput, '1');
  expect(productsTotal).toHaveTextContent('1000');
});
