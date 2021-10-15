import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';
import Login from './components/Authenticate/Login';


describe('Login page', () => {
  
  test('renders button with text Sign with Email if not login', () => {
    render(<Login />);
    const linkElement = screen.getByText(/Sign In with Email/i);
    expect(linkElement).toBeInTheDocument();    
  });

  test('Must fail to login with invalid credentials', async () => {
    render(<Login />);
    const email = screen.getByPlaceholderText('Your E-mail')
    fireEvent.change(email, { target: { value: 'test69@gmail.com' } })

    const password = screen.getByPlaceholderText('Your Password')
    fireEvent.change(email, { target: { value: '1234566' } })

    
    const submit_button = screen.getByText(/Sign In with Email/i);
    userEvent.click(submit_button);

    await waitFor(() => {
      expect(screen.getByText('Invalid login credentials. Please try again.')).toBeInTheDocument()
    })
  });

  test('Must redirect to home page after login with valid credentials', async () => {
    render(<Login />);
    const email = screen.getByPlaceholderText('Your E-mail')
    fireEvent.change(email, { target: { value: 'test69@gmail.com' } })

    const password = screen.getByPlaceholderText('Your Password')
    fireEvent.change(email, { target: { value: '123456' } })

    const submit_button = screen.getByText(/Sign In with Email/i);
    userEvent.click(submit_button);

    await screen.findByText('Welcome to Slack!')
  });

}) 