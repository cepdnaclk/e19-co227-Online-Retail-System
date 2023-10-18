import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import SignIn from '../pages/sign-in-page/SignIn';
import {MemoryRouter, Route, Routes, useLocation} from "react-router";
import {findByText} from "@testing-library/dom";
import {manageAccount} from "../services/manage-account.service";


jest.mock('js-cookie', () => ({
    set: jest.fn(),
}));
jest.mock('../services/manage-account.service', () => ({
    loginUser: jest.fn(() =>
        Promise.resolve({ message: 'success', isSeller: false, customerID: 123, customerName: 'Test User', token: 'jwt-token' })
    ),
    getSeller: jest.fn(),
}));
jest.mock('../services/manage-account.service', () => ({
    isLoggedIn: jest.fn().mockResolvedValue(true),
}));
jest.spyOn(console, 'log').mockImplementation();




describe('SignIn Component', () => {


    it('handles successful login', async () => {
        const { getByLabelText, getByText, queryByText } = render(<MemoryRouter><SignIn /></MemoryRouter>);
        require('../services/systemService').loginUser=jest.fn().mockResolvedValue({ message: 'success' });

        const emailInput = getByLabelText('Email address');
        const passwordInput = getByLabelText('Password');
        const submitButton = getByText("Let's Go");



        // Check for the success message directly
        await waitFor(async () => {
            fireEvent.change(emailInput, { target: { value: 'viduranga@gmail.com' } });
            fireEvent.change(passwordInput, { target: { value: '12345678' } });
            fireEvent.click(submitButton);


        });
        await waitFor(async () => {
            // Check for the success message upon a successful login
            const successMessage = await queryByText('Login Failed Please Try Again!');
            expect(successMessage).toBeNull();
        });

    });

    it('handles login failure', async () => {
        // Mock systemService to return a failure response
        require('../services/systemService').loginUser=jest.fn().mockResolvedValue({ message: 'failure' });

        const { getByLabelText, getByText } = render(<MemoryRouter><SignIn /></MemoryRouter>);

        const emailInput = getByLabelText('Email address');
        const passwordInput = getByLabelText('Password');
        const submitButton = getByText("Let's Go");

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'incorrect-password' } });
        fireEvent.click(submitButton);

        // Wait for the failure behavior (e.g., displaying an error message)
        await waitFor(() => {
            expect(screen.getByText('Login Failed Please Try Again!')).toBeInTheDocument();
        });
    });
    test('renders email and password input fields', () => {
        const { getByLabelText } = render(<MemoryRouter><SignIn /></MemoryRouter>);

        const emailInput = getByLabelText('Email address');
        const passwordInput = getByLabelText('Password');

        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
    });

    test('renders "Remember Me" checkbox', () => {
        const { getByText } = render(<MemoryRouter><SignIn /></MemoryRouter>);

        const rememberMeLabel = getByText('Remember Me');

        expect(rememberMeLabel).toBeInTheDocument();
    });

    test('renders "Let\'s Go" button', () => {
        const { getByText } = render(<MemoryRouter><SignIn /></MemoryRouter>);

        const letsGoButton = getByText("Let's Go");

        expect(letsGoButton).toBeInTheDocument();
    });

});
