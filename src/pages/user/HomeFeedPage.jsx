import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchContent } from '../../features/content/contentSlice';
import { fetchCategories } from '../../features/categories/categorySlice';

export default function HomeFeedPage() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.content);
  const { list: categories } = useSelector((state) => state.categories);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    dispatch(fetchContent());
    dispatch(fetchCategories());
  }, [dispatch]);

  const filtered =
    activeCategory === 'all'
      ? items
      : items.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-8 pb-24">
      <h1 className="text-2xl font-bold mb-4">For You</h1>

      <div className="flex gap-2 overflow-x-auto mb-6 pb-2">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-1.5 rounded-full whitespace-nowrap text-sm border ${
            activeCategory === 'all'
              ? 'bg-lime-400 text-black border-lime-400'
              : 'border-gray-700 text-gray-300'
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.name)}
            className={`px-4 py-1.5 rounded-full whitespace-nowrap text-sm border ${
              activeCategory === cat.name
                ? 'bg-lime-400 text-black border-lime-400'
                : 'border-gray-700 text-gray-300'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {status === 'loading' && <p className="text-gray-500">Loading feed...</p>}
      {status === 'succeeded' && filtered.length === 0 && (
        <p className="text-gray-500">No content in this category yet.</p>
      )}

      <div className="flex flex-col gap-4">
        {filtered.map((item) => (
          <Link
            to={`/content/${item.id}`}
            key={item.id}
            className="bg-gray-900 border border-gray-800 rounded-xl p-4 hover:border-gray-600"
          >
            <span className="text-xs uppercase text-lime-400 font-semibold">
              {item.category}
            </span>
            <h2 className="text-lg font-semibold mt-1">{item.title}</h2>
            <p className="text-gray-400 text-sm mt-1 line-clamp-2">
              {item.excerpt}
            </p>
            <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
              <span>{item.author}</span>
              <span>♥ {item.likes}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}