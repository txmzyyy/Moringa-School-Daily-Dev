import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login, clearAuthError } from '../../features/auth/authSlice';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearAuthError());
    const result = await dispatch(login({ email, password }));
    if (login.fulfilled.match(result)) {
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-gray-900 p-8 rounded-xl border border-gray-800"
      >
        <h1 className="text-2xl font-bold mb-1">Sign in</h1>
        <p className="text-gray-400 text-sm mb-6">Welcome back.</p>

        {error && (
          <div className="bg-red-900/40 border border-red-700 text-red-300 text-sm rounded-md p-3 mb-4">
            {error}
          </div>
        )}

        <label className="block text-sm text-gray-400 mb-1">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 mb-4 outline-none focus:border-indigo-500"
          placeholder="you@example.com"
        />

        <label className="block text-sm text-gray-400 mb-1">Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 mb-6 outline-none focus:border-indigo-500"
          placeholder="••••••••"
        />

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-md py-2 font-semibold"
        >
          {status === 'loading' ? 'Signing in...' : 'Sign in'}
        </button>

        <p className="text-gray-500 text-sm text-center mt-6">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="text-indigo-400 underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}