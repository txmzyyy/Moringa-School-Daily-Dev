import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white px-6 text-center">
      <h1 className="text-4xl font-bold mb-4">
        Moringa School <span className="text-lime-400">daily.dev</span>
      </h1>
      <p className="text-gray-400 max-w-md mb-8">
        Authentic, verified tech content from the Moringa School community —
        articles, videos, and interviews with industry experts.
      </p>
      <div className="flex gap-4">
        <Link
          to="/signup"
          className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg font-semibold"
        >
          Create account
        </Link>
        <Link
          to="/login"
          className="border border-gray-600 hover:border-gray-400 px-6 py-3 rounded-lg font-semibold"
        >
          Sign in
        </Link>
      </div>
      <Link to="/home" className="text-gray-500 mt-6 underline text-sm">
        Continue as guest
      </Link>
    </div>
  );
}