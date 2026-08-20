import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchContent } from '../../features/content/contentSlice';

export default function WriterDashboardPage() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.content);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchContent());
  }, [dispatch]);

  const myContent = items.filter((item) => item.authorId === user?.id);

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-8 pb-24">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Content</h1>
        <Link
          to="/writer/create"
          className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-sm font-semibold"
        >
          + New content
        </Link>
      </div>

      {status === 'loading' && <p className="text-gray-500">Loading...</p>}
      {status === 'succeeded' && myContent.length === 0 && (
        <p className="text-gray-500">
          You haven&apos;t posted anything yet. Create your first piece.
        </p>
      )}

      <div className="flex flex-col gap-3">
        {myContent.map((item) => (
          <div
            key={item.id}
            className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold">{item.title}</h2>
              <p className="text-xs text-gray-500 mt-1">
                {item.category} · {item.status || 'pending review'}
              </p>
            </div>
            <span
              className={`text-xs px-3 py-1 rounded-full ${
                item.status === 'approved'
                  ? 'bg-lime-400/20 text-lime-400'
                  : 'bg-yellow-400/20 text-yellow-400'
              }`}
            >
              {item.status || 'pending'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}