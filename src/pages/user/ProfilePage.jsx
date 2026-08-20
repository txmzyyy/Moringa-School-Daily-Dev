import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../features/auth/authSlice';
import {
  fetchCategories,
  subscribeToCategory,
  unsubscribeFromCategory,
} from '../../features/categories/categorySlice';

export default function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { list, subscribed } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const toggle = (id) => {
    if (subscribed.includes(id)) {
      dispatch(unsubscribeFromCategory(id));
    } else {
      dispatch(subscribeToCategory(id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-8 pb-24 max-w-lg mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center text-2xl font-bold">
          {user?.name?.[0]?.toUpperCase() || '?'}
        </div>
        <div>
          <h1 className="text-xl font-bold">{user?.name}</h1>
          <p className="text-gray-500 text-sm capitalize">{user?.role}</p>
        </div>
      </div>

      <h2 className="text-lg font-semibold mb-3">My interests</h2>
      <div className="flex flex-wrap gap-2 mb-8">
        {list.map((cat) => (
          <button
            key={cat.id}
            onClick={() => toggle(cat.id)}
            className={`px-3 py-1.5 rounded-full text-sm border ${
              subscribed.includes(cat.id)
                ? 'bg-lime-400 text-black border-lime-400'
                : 'border-gray-700 text-gray-300'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <button
        onClick={handleLogout}
        className="w-full border border-red-800 text-red-400 hover:bg-red-950 rounded-lg py-3 font-semibold"
      >
        Log out
      </button>
    </div>
  );
}