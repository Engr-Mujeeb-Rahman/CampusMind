import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GraduationCap, Sparkles, Eye, EyeOff } from 'lucide-react';
import apiClient from '../services/apiClient';

export default function SignupPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password) return;

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await apiClient.auth.signup(email.trim(), password);
      if (data.session) {
        navigate('/dashboard');
      } else {
        setSuccess(true);
      }
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl shadow-lg mb-4">
            <GraduationCap className="size-8 text-on-primary" />
          </div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface mb-2">Check your email</h1>
          <p className="font-body-md text-on-surface-variant mb-6">
            We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account.
          </p>
          <Link to="/login" className="text-primary font-label-md hover:underline">Go to Sign In</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl shadow-lg mb-4">
            <GraduationCap className="size-8 text-on-primary" />
          </div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface">Create your account</h1>
          <p className="font-body-md text-on-surface-variant mt-2">Start your AI-powered study journey</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-8 space-y-5">
          {error && (
            <div className="bg-error-container text-on-error-container px-4 py-3 rounded-lg text-sm flex items-center gap-2">
              <span>{error}</span>
              <button type="button" onClick={() => setError(null)} className="ml-auto font-medium underline text-sm">Dismiss</button>
            </div>
          )}

          <div>
            <label htmlFor="email" className="font-label-md text-on-surface block mb-1.5">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@university.edu"
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 font-body-md text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/30"
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="font-label-md text-on-surface block mb-1.5">Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 pr-12 font-body-md text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/30"
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="font-label-md text-on-surface block mb-1.5">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repeat your password"
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 font-body-md text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/30"
              autoComplete="new-password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !email.trim() || !password || !confirmPassword}
            className="w-full bg-primary text-on-primary font-label-md py-3.5 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-on-primary border-t-transparent rounded-full animate-spin" />
                Creating account...
              </>
            ) : (
              <>
                <Sparkles className="size-5" />
                Create Account
              </>
            )}
          </button>

          <p className="text-center font-body-sm text-on-surface-variant mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-label-md hover:underline">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
