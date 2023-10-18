import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import ProductDetails from '../pages/productDetails/ProductDetails';
import {useManageCart} from "../services/useManageCart"; // Adjust the import path as needed

// Mock the useManageCart hook
jest.mock('../services/useManageCart', () => {
    return {
        useManageCart: () => ({
            qty: 1,
            errQty: '',
            handleQty: jest.fn(),
            handleChange: jest.fn(),
            productDetails: jest.fn((id) => ({
                productID: id,
                productPrice: 10, // Replace with actual product data
            })),
            isInCart: false,
            setIsInCart: jest.fn(),
        }),
    };
});

describe('ProductDetails Component', () => {
    it('renders product details',async () => {
        render(
            <MemoryRouter initialEntries={['/product/29']}>
                <ProductDetails />
            </MemoryRouter>
        );

        // Add your assertions here
        await waitFor(() => {
            expect(screen.getByText('Product Description')).toBeInTheDocument();
            expect(screen.getByText('Seller:')).toBeInTheDocument();
        })
    });

    it('clicks "Add to Cart" button', () => {
        render(
            <MemoryRouter initialEntries={['/product/29']}>
                <ProductDetails />
            </MemoryRouter>
        );

        const addToCartButton = screen.getByText('Add To Cart');
        fireEvent.click(addToCartButton);

        // You can add assertions for the expected behavior when the button is clicked.
    });

    it('clicks "+" button for qty up', () => {
        render(
            <MemoryRouter initialEntries={['/product/29']}>
                <ProductDetails />
            </MemoryRouter>
        );

        const plusButton = screen.getByTestId('plus');
        fireEvent.click(plusButton);

        // You can add assertions for the expected behavior when the button is clicked.
    });

    it('clicks "-" button for qty down', () => {
        render(
            <MemoryRouter initialEntries={['/product/29']}>
                <ProductDetails />
            </MemoryRouter>
        );

        const minusButton = screen.getByTestId('minus');
        fireEvent.click(minusButton);

        // You can add assertions for the expected behavior when the button is clicked.
    });

});
