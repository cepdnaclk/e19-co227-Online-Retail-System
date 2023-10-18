import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '../pages/home-page/Home';
import {homePageService} from "../services/home-page.services";
import {MemoryRouter} from "react-router";
import {getByTestId} from "@testing-library/dom";

describe('Home component', () => {
    test('renders the component', () => {
        const { getByText } = render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );
        expect(getByText('Elevate Your Lifestyle')).toBeInTheDocument();
    });
    test('navigates to the products page when "Shop Now" in the special offer is clicked', async () => {
        render(
            <MemoryRouter> {/* Wrap your component with MemoryRouter */}
                <Home />
            </MemoryRouter>
        );
        const shopNowButton = screen.getByTestId("shop-now");
        fireEvent.click(shopNowButton);
        await waitFor(() => {
            expect(window.location.pathname).toBe('/');
        });
    });

    //test for the badges
    test('displays quality badges and information', () => {
        render(<MemoryRouter>
                <Home />
            </MemoryRouter>
        );
        const qualityBadge = screen.getByText('Quality Product');
        expect(qualityBadge).toBeInTheDocument();
    });

    test('displays quality badges and information', () => {
        render(<MemoryRouter>
                <Home />
            </MemoryRouter>
        );
        const Badge = screen.getByText('Free Shipping');
        expect(Badge).toBeInTheDocument();
    });

    test('displays quality badges and information', () => {
        render(<MemoryRouter>
                <Home />
            </MemoryRouter>
        );
        const Badge = screen.getByText('14-Day Return');
        expect(Badge).toBeInTheDocument();
    });

    test('displays quality badges and information', () => {
        render(<MemoryRouter>
                <Home />
            </MemoryRouter>
        );
        const Badge = screen.getByText('24/7 Support');
        expect(Badge).toBeInTheDocument();
    });

    // test for the connection to the database
    test('fetches and displays product data', async () => {
        // Mock the promise-returning functions to return resolved promises
        homePageService.getTopSellingProducts = jest.fn().mockResolvedValue([
            {
                productID: 1,
                productName: 'Product 1',
                productPrice: 99.99,
                productImage: 'product1.jpg',
            },
        ]);

        homePageService.getNewlyAddedProducts = jest.fn().mockResolvedValue([
            {
                productID: 3,
                productName: 'Product 3',
                productPrice: 79.99,
                productImage: 'product3.jpg',
            },
        ]);

        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        await waitFor(() => {
            // Your assertions based on the mock data
            expect(screen.getByText('Product 1')).toBeInTheDocument();
            expect(screen.getByText('$99.99')).toBeInTheDocument();

            expect(screen.getByText('Product 3')).toBeInTheDocument();
            expect(screen.getByText('$79.99')).toBeInTheDocument();
        });
    });




})




