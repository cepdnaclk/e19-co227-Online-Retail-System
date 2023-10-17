import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '../pages/home-page/Home';
import {homePageService} from "../services/home-page.services";


describe('Home component', () => {
    test('renders the component', () => {
        const { getByText } = render(<Home />);
        expect(getByText('Elevate Your Lifestyle')).toBeInTheDocument();
    });

    test('fetches and displays product data',async () => {
        homePageService.getTopSellingProducts.mockResolvedValue([
            {
                productID: 1,
                productName: 'Product 1',
                productPrice: 99.99,
                productImage: 'product1.jpg',
            }

        ]);

        homePageService.getNewlyAddedProducts.mockResolvedValue([
            {
                productID: 3,
                productName: 'Product 3',
                productPrice: 79.99,
                productImage: 'product3.jpg',
            }
        ]);
        render(<Home />);
        await waitFor(() => {
            // Your assertions based on the mock data
            expect(screen.getByText('Product 1')).toBeInTheDocument();
            expect(screen.getByText('$99.99')).toBeInTheDocument();

            expect(screen.getByText('Product 3')).toBeInTheDocument();
            expect(screen.getByText('$79.99')).toBeInTheDocument();

        });
    });


    test('navigates to the product page when a product link is clicked', async () => {
        render(<Home />);
        const productLink = screen.getByText('IPHONE 14 PLUS');
        fireEvent.click(productLink);
        await waitFor(() => {
            // Check if the URL changed to the product page
            expect(window.location.pathname).toBe('/product/29');
        });

    })

    test('navigates to the products page when "Shop Now" in the special offer is clicked', async () => {
        render(<Home />);
        const shopNowButton = screen.getByText('Shop Now');
        fireEvent.click(shopNowButton);
        await waitFor(() => {
            // Check if the URL changed to the products page
            expect(window.location.pathname).toBe('/products');
        });
    });

    test('displays quality badges and information', () => {
        render(<Home />);
        const qualityBadge = screen.getByText('Quality Product');
        expect(qualityBadge).toBeInTheDocument();
    });


})




