import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  fetchCategories,
  subscribeToCategory,
  unsubscribeFromCategory,
} from '../../features/categories/categorySlice';

export default function OnboardingInterests() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, subscribed, status } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const toggle = (id) => {
    if (subscribed.includes(id)) {
      dispatch(unsubscribeFromCategory(id));
    } else {
      dispatch(subscribeToCategory(id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-16 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-2">What are you into?</h1>
      <p className="text-gray-400 mb-8 text-center max-w-md">
        Pick a few categories so we can personalize your feed. You can change
        this anytime in your profile.
      </p>

      {status === 'loading' && <p className="text-gray-500">Loading categories...</p>}

      <div className="flex flex-wrap gap-3 max-w-xl justify-center mb-10">
        {list.map((cat) => (
          <button
            key={cat.id}
            onClick={() => toggle(cat.id)}
            className={`px-4 py-2 rounded-full border font-medium ${
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
        onClick={() => navigate('/home')}
        disabled={subscribed.length === 0}
        className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 px-8 py-3 rounded-lg font-semibold"
      >
        Continue
      </button>
    </div>
  );
}