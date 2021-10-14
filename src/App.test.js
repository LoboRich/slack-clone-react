import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';
import Login from './components/Authenticate/Login';



describe('Login page', () => {
  test('renders button with text Sign with Email', () => {
    render(<Login />);
    const linkElement = screen.getByText(/Sign In with Email/i);
    expect(linkElement).toBeInTheDocument();    
  });

  test('render error when submit', () => {
    render(<Login />);
    // expect(screen.getByRole('input', { name: 'email' })).toHaveValue('test');
    const email = screen.getByPlaceholderText('Your E-mail')
    fireEvent.change(email, { target: { value: 'test69@gmail.com' } })

    const password = screen.getByPlaceholderText('Your Password')
    fireEvent.change(email, { target: { value: '1234566' } })

    
    const submit_button = screen.getByText(/Sign In with Email/i);
    userEvent.click(submit_button);

    const noticeElement = screen.getByText(/Sign in to your account/i);
    // expect(noticeElement).toBeInTheDocument(); 
    // expect(input).toHaveValue('123')
  });

}) 