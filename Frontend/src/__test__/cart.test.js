import React from 'react';
import { render, screen,waitFor } from '@testing-library/react';
import CartDetail from '../pages/cartDetails/CartDetail';
import {MemoryRouter} from "react-router-dom";
import CartItem from "../pages/cartDetails/CartItem";
import {Axios as axios} from "axios";
import {cartService} from "../services/cart.service";
import {fireEvent} from "@testing-library/dom";

describe('CartDetail Component', () => {
    const mockCartItems = [
        {
            productID: 1,
            productName: 'Product 1',
            productPrice: 10,
            productImage1: 'product-image1.jpg',
            qty: 2,
        },
        {
            productID: 2,
            productName: 'Product 2',
            productPrice: 15,
            productImage1: 'product-image2.jpg',
            qty: 3,
        },
    ];
    it('displays an empty cart message when the cart is empty', () => {
        render(
            <MemoryRouter><CartDetail /></MemoryRouter>
            );
        const emptyCartMessage = screen.getByText('Your Cart is Empty');
        expect(emptyCartMessage).toBeInTheDocument();
    });

    it('displays an empty cart message and "Shop Now" button when the cart is empty', () => {
        render(
            <MemoryRouter>
                <CartDetail />
            </MemoryRouter>
        );

        const emptyCartMessage = screen.getByText('Your Cart is Empty');
        const shopNowButton = screen.getByText('Shop Now');

        expect(emptyCartMessage).toBeInTheDocument();
        expect(shopNowButton).toBeInTheDocument();


    });



    it('displays cart items when the cart is not empty', async () => {
        // Mock the cartService to return mockCartItems
        cartService.getFromCart=jest.fn().mockResolvedValue({ data: mockCartItems });

        render(
            <MemoryRouter>
                <CartDetail />
            </MemoryRouter>
        );

        // Wait for the component to render with the mocked data
        await waitFor(() => {
            // Query for elements you expect to be displayed
            const productName1 = screen.getByText('Product 1');
            const productName2 = screen.getByText('Product 2');

            expect(productName1).toBeInTheDocument();
            expect(productName2).toBeInTheDocument();
        });


    });
    it('displays a "Proceed To Checkout" button when the cart is not empty',async () => {
        cartService.getFromCart=jest.fn().mockResolvedValue({ data: mockCartItems });

        render(
            <MemoryRouter>
                <CartDetail />
            </MemoryRouter>
        );

        await waitFor(()=>{
            const proceedToCheckoutButton = screen.getByTestId('buy');

            expect(proceedToCheckoutButton).toBeInTheDocument();
        })

    });
    it('displays a "Proceed To Checkout" button when the cart is not empty', async () => {
        // Mock the cartService to return mockCartItems
        cartService.getFromCart.mockResolvedValue({ data: mockCartItems });


        render(
            <MemoryRouter>
                <CartDetail />
            </MemoryRouter>
        );

        await waitFor(() => {
            const proceedToCheckoutButton = screen.getByTestId('buy');
            expect(proceedToCheckoutButton).toBeInTheDocument();


            fireEvent.click(proceedToCheckoutButton);

            expect(window.location.pathname).toBe('/');
        });

    });

});
