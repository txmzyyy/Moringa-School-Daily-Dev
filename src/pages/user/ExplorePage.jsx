import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchContent } from '../../features/content/contentSlice';

export default function ExplorePage() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.content);
  const [query, setQuery] = useState('');

  useEffect(() => {
    dispatch(fetchContent());
  }, [dispatch]);

  const results = items.filter(
    (item) =>
      item.title?.toLowerCase().includes(query.toLowerCase()) ||
      item.category?.toLowerCase().includes(query.toLowerCase()) ||
      item.author?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-8 pb-24">
      <h1 className="text-2xl font-bold mb-4">Explore</h1>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search articles, videos, authors, categories..."
        className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 mb-6 outline-none focus:border-indigo-500"
      />

      {status === 'loading' && <p className="text-gray-500">Loading...</p>}
      {status === 'succeeded' && results.length === 0 && (
        <p className="text-gray-500">No results for &quot;{query}&quot;.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {results.map((item) => (
          <Link
            to={`/content/${item.id}`}
            key={item.id}
            className="bg-gray-900 border border-gray-800 rounded-xl p-4 hover:border-gray-600"
          >
            <span className="text-xs uppercase text-lime-400 font-semibold">
              {item.category}
            </span>
            <h2 className="text-base font-semibold mt-1">{item.title}</h2>
            <p className="text-gray-500 text-xs mt-2">{item.author}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}