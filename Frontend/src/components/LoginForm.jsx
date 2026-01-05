
import React, { useState, useEffect } from 'react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import './LoginForm.css'; // Import this CSS file for styling

const LoginForm = ({ onClose, setAuth }) => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [accounts, setAccounts] = useState(() => JSON.parse(localStorage.getItem('accounts')) || []);
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showLoginSuccess, setShowLoginSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        localStorage.setItem('accounts', JSON.stringify(accounts));
    }, [accounts]);

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const validatePassword = (password) => /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(password);

    const handleSubmit = async (e) => {
        e.preventDefault();
        clearErrors();
        setLoading(true);

        if (!validateEmail(email)) {
            setEmailError('Invalid email format');
            setLoading(false);
            return;
        }

        if (!validatePassword(password)) {
            setPasswordError('At least 8 characters long, one uppercase, number and special character');
            setLoading(false);
            return;
        }

        if (isSignUp) {
            handleSignUp();
        } else {
            handleLogin();
        }
    };

    const handleSignUp = () => {
        const existingAccount = accounts.find(acc => acc.email === email);
        if (existingAccount) {
            setError('An account with this email already exists');
            setLoading(false);
        } else if (password === confirmPassword) {
            const newAccount = { name, email, password };
            setAccounts([...accounts, newAccount]);
            setSuccessMessage('Account created successfully');
            setTimeout(() => {
                resetForm();
                setIsSignUp(false);
                setLoading(false);
            }, 2000);
        } else {
            setError('Passwords do not match');
            setLoading(false);
        }
    };

    const handleLogin = () => {
        const account = accounts.find(acc => acc.email === email && acc.password === password);
        if (account) {
            setShowLoginSuccess(true);
            setTimeout(() => {
                setShowLoginSuccess(false);
                setAuth(true);
                onClose();
                setLoading(false);
            }, 2000);
        } else {
            setError('Invalid email or password');
            setLoading(false);
        }
    };

    const clearErrors = () => {
        setError('');
        setEmailError('');
        setPasswordError('');
    };

    const resetForm = () => {
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setName('');
        clearErrors();
    };

    return (
        <>
            <div className={`login-overlay ${showLoginSuccess ? 'hide-login' : ''}`}>
                <div className={`login-form-container ${loading ? 'loading' : ''}`}>
                    <button className="close-button" onClick={onClose} aria-label="Close login form">
                        <CloseOutlinedIcon />
                    </button>
                    <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>
                    <form onSubmit={handleSubmit} aria-live="assertive">
                        {isSignUp && (
                            <div className="form-group">
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder='User Name'
                                    required
                                    aria-label="User Name"
                                    className="form-control"
                                />
                            </div>
                        )}
                        <div className="form-group">
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value); clearErrors(); }}
                                placeholder='Email'
                                required
                                aria-label="Email"
                                className={`form-control ${emailError ? 'error-border' : ''}`}
                            />
                            {emailError && <p className="error-message">{emailError}</p>}
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value); clearErrors(); }}
                                placeholder='Password'
                                required
                                aria-label="Password"
                                className={`form-control ${passwordError ? 'error-border' : ''}`}
                            />
                            {passwordError && <p className="error-message">{passwordError}</p>}
                        </div>
                        {isSignUp && (
                            <div className="form-group">
                                <input
                                    type="password"
                                    id="confirm-password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder='Confirm Password'
                                    required
                                    aria-label="Confirm Password"
                                    className="form-control"
                                />
                            </div>
                        )}
                        {error && <p className="error-message">{error}</p>}
                        {successMessage && <p className="success-message">{successMessage}</p>}
                        <button type="submit" className='login-btn' aria-live="polite">
                            {isSignUp ? 'Sign Up' : 'Login'}
                        </button>
                        <div className='checkbox'>
                            <input type="checkbox" id="checkbox" required />
                            <p>
                                By continuing you agree to our Terms of Service and Privacy Policy.
                            </p>
                        </div>
                        <p className='signup'>
                            {isSignUp ? "Already have an account?" : "Don't have an account?"}
                            <a href="#" onClick={() => { setIsSignUp(!isSignUp); clearErrors(); }}>
                                {isSignUp ? ' Login' : ' Sign Up'}
                            </a>
                        </p>
                    </form>
                    {loading && (
                        <div className="loading-spinner">
                            <div className="spinner"></div>
                        </div>
                    )}
                </div>
            </div>
            {showLoginSuccess && (
                <div className="login-success-popup" aria-live="assertive">
                    Successfully logged in!
                </div>
            )}
        </>
    );
};

export default LoginForm;
