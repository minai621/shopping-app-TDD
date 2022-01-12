import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { server } from '../../../mocks/server';
import Type from '../Type';

test('display product images from server', async () => {
  render(<Type orderType='products' />);
  const productImages = await screen.findAllByRole('img', {
    name: /product$/i,
  });
  expect(productImages).toHaveLength(2);

  const altTexts = screen.getAllByAltText(/.* product/i);
  const testText = ['America product', 'England product'];
  for (let i = 0; i < testText.length; i++) {
    expect(altTexts[i]).toHaveAttribute('alt', testText[i]);
  }
});

test('fetch option information from server', async () => {
  render(<Type orderType='options' />);
  const optionCheckboxes = await screen.findAllByRole('checkbox');
  expect(optionCheckboxes).toHaveLength(2);
});

test('when fetching product datas, face an error', async () => {
  server.resetHandlers(
    rest.get('http://localhost:5000/products', (req, res, ctx) =>
      res(ctx.status(500)),
    ),
  );
  render(<Type orderType='products' />);
  const errorBanner = await screen.findByTestId('error-banner');
  expect(errorBanner).toHaveTextContent('에러가 발생했습니다.');
});
