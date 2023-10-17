/*import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Home from './Home';


test('renders Home component', () => {

    const { getByText } = render(<Home />);


    const homeElement = getByText('Elevate Your Lifestyle');
    const topSellingProduct = await findByText('Top Selling Product Name');
    const newlyAddedProduct = await findByText('Newly Added Product Name');



    // Assert
    expect(homeElement).toBeInTheDocument();
    expect(topSellingProduct).toBeInTheDocument();
    expect(newlyAddedProduct).toBeInTheDocument();
});



test('clicking on a product link navigates to the product page', async () => {
    render(<Home />);
    const productLink = screen.getByText('Product Name');
    fireEvent.click(productLink);
    await waitFor(() => {
        // Check if the URL changed to the product page
        expect(window.location.pathname).toBe('/product/123'); // Replace with the actual URL
    });
});

test('clicking on "Shop Now" in the special offer navigates to the products page', async () => {
    render(<Home />);
    const shopNowButton = screen.getByText('Shop Now');
    fireEvent.click(shopNowButton);
    await waitFor(() => {
        // Check if the URL changed to the products page
        expect(window.location.pathname).toBe('/products');
    });
});

test('displays quality badge', () => {
    render(<Home />);
    const qualityBadge = screen.getByText('Quality Product');
    expect(qualityBadge).toBeInTheDocument();
});*/
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '../pages/home-page/Home';
import {homePageService} from "../services/home-page.services";


describe('Home component', () => {
    it('renders the component', () => {
        const { getByText } = render(<Home />);
        expect(getByText('Elevate Your Lifestyle')).toBeInTheDocument();
    });

    it('fetches and displays product data', () => {
        homePageService.getTopSellingProducts.mockResolvedValue([
            // Your mock data here
        ]);

        homePageService.getNewlyAddedProducts.mockResolvedValue([
            // Your mock data here
        ]);

        // Your assertions based on the mock data
        expect(screen.findByText('Mocked Product Name')).toBeInTheDocument();
    });


    it('navigates to the product page when a product link is clicked', async () => {
        const productLink = screen.getByText('Product Name');
        fireEvent.click(productLink);
        await waitFor(() => {
            // Check if the URL changed to the product page
            expect(window.location.pathname).toBe('/product/123');
        });

    })

    it('navigates to the products page when "Shop Now" in the special offer is clicked', async () => {
        const productLink = screen.getByText('Product Name');
        fireEvent.click(productLink);
        await waitFor(() => {
            // Check if the URL changed to the product page
            expect(window.location.pathname).toBe('/product/123');
        });
    });

    it('displays quality badges and information', () => {
        const qualityBadge = screen.getByText('Quality Product');
        expect(qualityBadge).toBeInTheDocument();
    });

    it('displays free shipping indicators', () => {
        // ... Your test case for free shipping indicators ...
    });

    it('displays 14-Day return information', () => {
        // ... Your test case for 14-Day return information ...
    });

    it('displays 24/7 support information', () => {
        // ... Your test case for 24/7 support information ...
    });

    it('navigates correctly when category links are clicked', () => {
                // ... Your test case for category link navigation ...
    });

    it('manages the image carousel correctly', () => {
        // ... Your test case for image carousel interaction ...
    });

    it('displays and navigates special offers', async () => {
        // ... Your test case for special offers ...
    });
})




