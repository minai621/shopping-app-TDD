import userEvent from '@testing-library/user-event';
import App from './App';
import { render, screen } from './test-util';

test('From order to order completion', async () => {
  render(<App />);

  const americaInput = await screen.findByRole('spinbutton', {
    name: 'America',
  });
  userEvent.clear(americaInput);
  userEvent.type(americaInput, '2');

  const englandInput = await screen.findByRole('spinbutton', {
    name: 'England',
  });
  userEvent.clear(englandInput);
  userEvent.type(englandInput, '3');

  const insuranceCheckbox = await screen.findByRole('checkbox', {
    name: 'Insurance',
  });
  userEvent.click(insuranceCheckbox);

  const orderButton = screen.getByRole('button', {
    name: '주문 하기',
  });
  userEvent.click(orderButton);

  // 주문 확인 페이지
  const summaryHeading = screen.getByRole('heading', {
    name: '주문 확인',
  });
  expect(summaryHeading).toBeInTheDocument();

  const productsHeading = screen.getByRole('heading', {
    name: '여행 상품: 5000',
  });
  expect(productsHeading).toBeInTheDocument();

  const optionsHeading = screen.getByRole('heading', {
    name: '옵션: 500',
  });
  expect(optionsHeading).toBeInTheDocument();

  expect(screen.getByText('2 America')).toBeInTheDocument();
  expect(screen.getByText('3 England')).toBeInTheDocument();
  expect(screen.getByText('Insurance')).toBeInTheDocument();

  const confirmCheckbox = screen.getByRole('checkbox', {
    name: '주문하려는 것을 확인하셨나요?',
  });
  userEvent.click(confirmCheckbox);

  const confirmOrderButton = screen.getByRole('button', {
    name: '주문 확인',
  });
  userEvent.click(confirmOrderButton);
});
