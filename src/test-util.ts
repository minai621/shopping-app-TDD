import { render } from '@testing-library/react'
import { OrderContextProvider } from './context/OrderContext'

const customRender = (ui: any, options?: any) => 
    render(ui, {wrapper: OrderContextProvider, ...options});


export * from '@testing-library/react';
export { customRender as render };