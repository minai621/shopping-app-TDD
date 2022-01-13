import { createContext, useEffect, useMemo, useState } from 'react';

export const OrderContext = createContext('props');

type OrderType = 'products' | 'options';
type OrderCount = Record<OrderType, Map<string, number>>;

const procePerItem: Record<string, number> = {
  products: 1000,
  options: 500,
};

function calculateSubTotal(
  orderType: OrderType,
  orderCount: OrderCount,
): number {
  let optionCount = 0;
  for (const count of orderCount[orderType].values()) {
    optionCount += count;
  }
  return optionCount * procePerItem[orderType];
}

export function OrderContextProvider(props: any) {
  const [orderCount, setOrderCount] = useState<OrderCount>({
    products: new Map<string, number>(),
    options: new Map<string, number>(),
  });

  const [total, setTotal] = useState<Record<string, number>>({
    products: 0,
    options: 0,
    total: 0,
  });

  useEffect(() => {
    const productTotal = calculateSubTotal('products', orderCount);
    const optionTotal = calculateSubTotal('options', orderCount);
    const total = productTotal + optionTotal;
    setTotal({
      products: productTotal,
      options: optionTotal,
      total,
    });
  }, [orderCount]);

  const value = useMemo(() => {
    function updateItemCount(
      itemName: string,
      newItemCount: string,
      orderType: OrderType,
    ) {
      const newOrderCounts = { ...orderCount };

      const orderCountsMap = orderCount[orderType];
      orderCountsMap.set(itemName, parseInt(newItemCount));

      setOrderCount(newOrderCounts);
    }

    return [{ ...orderCount, total }, updateItemCount];
  }, [orderCount, total]);

  return <OrderContext.Provider value={value} {...props} />;
}
