import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchContent, toggleWishlist } from '../../features/content/contentSlice';

export default function WishlistPage() {
  const dispatch = useDispatch();
  const { items, wishlist, status } = useSelector((state) => state.content);

  useEffect(() => {
    dispatch(fetchContent());
  }, [dispatch]);

  const saved = items.filter((item) => wishlist.includes(item.id));

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-8 pb-24">
      <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>

      {status === 'loading' && <p className="text-gray-500">Loading...</p>}
      {status === 'succeeded' && saved.length === 0 && (
        <p className="text-gray-500">
          Nothing saved yet. Tap &quot;Save&quot; on any content to add it here.
        </p>
      )}

      <div className="flex flex-col gap-4">
        {saved.map((item) => (
          <div
            key={item.id}
            className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex justify-between items-start"
          >
            <Link to={`/content/${item.id}`} className="flex-1">
              <span className="text-xs uppercase text-lime-400 font-semibold">
                {item.category}
              </span>
              <h2 className="text-lg font-semibold mt-1">{item.title}</h2>
              <p className="text-gray-500 text-xs mt-1">{item.author}</p>
            </Link>
            <button
              onClick={() => dispatch(toggleWishlist(item.id))}
              className="text-xs text-red-400 border border-red-800 px-3 py-1.5 rounded-md ml-3"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}