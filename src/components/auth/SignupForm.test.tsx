import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignupForm from './SignupForm';
import { AuthProvider } from '@/context/AuthContext'; // Actual or mocked
import { LanguageProvider } from '@/context/LanguageContext'; // Actual or mocked
import { BrowserRouter } from 'react-router-dom';

// Mock useAuth from AuthContext
const mockSignup = vi.fn();
vi.mock('@/context/AuthContext', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as any),
    useAuth: () => ({
      signup: mockSignup,
      isLoading: false,
      // Add other properties from useAuth if SignupForm uses them
    }),
  };
});

// Mock useLanguage from LanguageContext
vi.mock('@/context/LanguageContext', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...(actual as any),
        useLanguage: () => ({
            t: (key: string) => {
                // Simple mock translation
                if (key === 'fullName') return 'Full Name';
                if (key === 'email') return 'Email';
                if (key === 'password') return 'Password';
                if (key === 'confirmPassword') return 'Confirm Password';
                if (key === 'signUp') return 'Sign Up';
                return key;
            },
            language: 'en',
            setLanguage: vi.fn(),
        }),
    };
});


describe('SignupForm', () => {
  beforeEach(() => {
    mockSignup.mockClear();
    render(
      <BrowserRouter>
        <LanguageProvider>
          <AuthProvider> {/* Ensure AuthProvider wraps if context is used for more than signup */}
            <SignupForm />
          </AuthProvider>
        </LanguageProvider>
      </BrowserRouter>
    );
  });

  test('renders all form fields and submit button', () => {
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password$/i)).toBeInTheDocument(); // Exact match for "Password"
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign Up/i })).toBeInTheDocument();
  });

  test('shows validation errors for empty fields on submit', async () => {
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /Sign Up/i }));

    // Based on zod schema in src/context/auth/validation.ts
    // (assuming standard error messages if not customized)
    expect(await screen.findAllByText(/String must contain at least 1 character/i)).toHaveLength(3);
    // Add more specific error messages if Zod schema provides them e.g. "Name is required"
    // This might appear multiple times for different fields if messages are generic
  });
  
  test('shows validation error for mismatched passwords', async () => {
    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/Full Name/i), 'Test User');
    await user.type(screen.getByLabelText(/Email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/^Password$/i), 'password123');
    await user.type(screen.getByLabelText(/Confirm Password/i), 'password456');
    await user.click(screen.getByRole('button', { name: /Sign Up/i }));

    expect(await screen.findByText(/Passwords must match/i)).toBeInTheDocument();
  });

  test('calls signup function with correct data on valid submission', async () => {
    const user = userEvent.setup();
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    };

    await user.type(screen.getByLabelText(/Full Name/i), testData.name);
    await user.type(screen.getByLabelText(/Email/i), testData.email);
    await user.type(screen.getByLabelText(/^Password$/i), testData.password);
    await user.type(screen.getByLabelText(/Confirm Password/i), testData.password); // Correct password
    
    await user.click(screen.getByRole('button', { name: /Sign Up/i }));

    await waitFor(() => {
      expect(mockSignup).toHaveBeenCalledTimes(1);
      expect(mockSignup).toHaveBeenCalledWith(expect.objectContaining({
        name: testData.name,
        email: testData.email,
        password: testData.password,
        confirmPassword: testData.password,
      }));
    });
  });
});
