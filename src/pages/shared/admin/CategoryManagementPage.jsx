import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, createCategory } from '../../features/categories/categorySlice';

export default function CategoryManagementPage() {
  const dispatch = useDispatch();
  const { list, status } = useSelector((state) => state.categories);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    dispatch(createCategory(newCategory.trim()));
    setNewCategory('');
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-8 pb-24 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Categories</h1>

      <form onSubmit={handleAdd} className="flex gap-2 mb-6">
        <input
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New category name..."
          className="flex-1 bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 outline-none focus:border-indigo-500"
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 px-4 rounded-lg font-semibold"
        >
          Add
        </button>
      </form>

      {status === 'loading' && <p className="text-gray-500">Loading...</p>}

      <div className="flex flex-wrap gap-2">
        {list.map((cat) => (
          <span
            key={cat.id}
            className="px-4 py-2 rounded-full bg-gray-900 border border-gray-800 text-sm"
          >
            {cat.name}
          </span>
        ))}
      </div>
    </div>
  );
}