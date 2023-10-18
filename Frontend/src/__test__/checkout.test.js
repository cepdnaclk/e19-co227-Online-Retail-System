import React from 'react';
import {render, fireEvent, getByTestId} from '@testing-library/react';
import OrderDetail from '../pages/Checkout/OrderDetail';
import {MemoryRouter} from "react-router";
import Checkout from "../pages/Checkout/checkOut";
import OrderItem from "../pages/Checkout/OrderItem";


describe('OrderDetail Component', () => {

    it('renders the component without errors', () => {
        const { getByText, getByLabelText } = render(
            <MemoryRouter><Checkout handleSubmit={() => {}}/></MemoryRouter>

            );

        // Check if the component renders without errors
        expect(getByText('Billing')).toBeInTheDocument();
    });

    it('updates form input fields', () => {
        const handleSubmit = jest.fn();
        const { getByLabelText } = render(<MemoryRouter><Checkout handleSubmit={handleSubmit}/></MemoryRouter>);
        const firstNameInput = getByLabelText('First Name');

        fireEvent.change(firstNameInput, { target: { value: 'John' } });

        expect(firstNameInput.value).toBe('John');

        const lastNameInput = getByLabelText('Last Name');
        fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
        expect(lastNameInput.value).toBe('Doe');

        const emailInput = getByLabelText('E-mail');
        fireEvent.change(emailInput, { target: { value: 'example@email.com' } });
        expect(emailInput.value).toBe('example@email.com');

        const mobileInput = getByLabelText('Mobile No');
        fireEvent.change(mobileInput, { target: { value: '+94' } });
        expect(mobileInput.value).toBe('+94');

        const address1Input = getByLabelText('Address Line 1');
        fireEvent.change(address1Input, { target: { value: '123 Street' } });
        expect(address1Input.value).toBe('123 Street');

        const address2Input = getByLabelText('Address Line 2');
        fireEvent.change(address2Input, { target: { value: '123 Street' } });
        expect(address2Input.value).toBe('123 Street');

        const address3Input = getByLabelText('Address Line 3');
        fireEvent.change(address3Input, { target: { value: '123 Street' } });
        expect(address3Input.value).toBe('123 Street');
    });

    it('selects a payment method', () => {
        const handleSubmit = jest.fn();
        const { getByLabelText } = render(<MemoryRouter><Checkout handleSubmit={handleSubmit}/></MemoryRouter>);
        const creditCardRadio = getByLabelText('Credit Card');
        const paypalRadio = getByLabelText('Paypal');

        // Initially, no payment method is selected
        expect(creditCardRadio.checked).toBe(true);
        expect(paypalRadio.checked).toBe(false);

        // Select the credit card payment method
        fireEvent.click(creditCardRadio);

        // Check if the credit card payment method is selected and the others are not
        expect(creditCardRadio.checked).toBe(true);
        expect(paypalRadio.checked).toBe(false);

        // Repeat the process for the Paypal payment method
        fireEvent.click(paypalRadio);

        // Check if the Paypal payment method is selected and the others are not
        expect(creditCardRadio.checked).toBe(false);
        expect(paypalRadio.checked).toBe(true);

    });

    const cartItem = {
        productID: 1,
        productName: 'Sample Product',
        qty: 2,
        productPrice: 10,
    };

   /* it('renders product information correctly', () => {
        const { getByText } = render(<MemoryRouter><OrderItem cartItem={cartItem} setUpdateCartTrigger={() => {}} /></MemoryRouter>);

        expect(getByText('Sample Product')).toBeInTheDocument();
        expect(getByText('2')).toBeInTheDocument();
        expect(getByText('$20')).toBeInTheDocument();
    });

*/
});
