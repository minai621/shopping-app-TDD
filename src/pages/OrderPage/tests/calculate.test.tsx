import { render, screen } from '../../../test-util';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { OrderContextProvider } from '../../../context/OrderContext';
import Type from '../../OrderPage/Type';
import OrderPage from '../OrderPage';

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

// eslint-disable-next-line quotes
test("update option's total when options change", async () => {
  render(<Type orderType='options' />);

  const optionsTotal = screen.getByText('옵션 총 가격:', { exact: false });
  expect(optionsTotal).toHaveTextContent('0');

  const insuranceCheckbox = await screen.findByRole('checkbox', {
    name: 'Insurance',
  });
  userEvent.click(insuranceCheckbox);
  expect(optionsTotal).toHaveTextContent('500');

  const dinnerCheckbox = await screen.findByRole('checkbox', {
    name: 'Dinner',
  });
  userEvent.click(dinnerCheckbox);
  expect(optionsTotal).toHaveTextContent('1000');

  userEvent.click(dinnerCheckbox);
  expect(optionsTotal).toHaveTextContent('500');
});

describe('total price of goods and options', () => {
  test('total proce starts with 0 and Updating total price when adding one products.', async () => {
    render(<OrderPage />);
    const total = screen.getByText('Total Price:', { exact: false });
    expect(total).toHaveTextContent('0');

    const americaInput = await screen.findByRole('spinbutton', {
      name: 'America',
    });
    userEvent.clear(americaInput);
    userEvent.type(americaInput, '1');

    expect(total).toHaveTextContent('1000');
  });
  test('updation total price when adding one option', async () => {
    render(<OrderPage />);
    const total = screen.getByText('Total Price:', { exact: false });

    const insuranceCheckbox = await screen.findByRole('checkbox', {
      name: 'Insurance',
    });
    userEvent.click(insuranceCheckbox);
    expect(total).toHaveTextContent('500');
  });
  test('updationg total price when remocing option and product', async () => {
    render(<OrderPage />);
    const total = screen.getByText('Total Price:', { exact: false });

    const insuranceCheckbox = await screen.findByRole('checkbox', {
      name: 'Insurance',
    });
    userEvent.click(insuranceCheckbox);

    const americaInput = await screen.findByRole('spinbutton', {
      name: 'America',
    });
    userEvent.clear(americaInput);
    userEvent.type(americaInput, '3');

    userEvent.clear(americaInput);
    userEvent.type(americaInput, '1');

    expect(total).toHaveTextContent('1500');
  });
});
