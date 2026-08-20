import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createContent } from '../../features/content/contentSlice';
import { fetchCategories } from '../../features/categories/categorySlice';

const CONTENT_TYPES = ['article', 'video', 'podcast'];

export default function CreateContentPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list: categories } = useSelector((state) => state.categories);
  const { status } = useSelector((state) => state.content);

  const [title, setTitle] = useState('');
  const [type, setType] = useState('article');
  const [category, setCategory] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(
      createContent({ title, type, category, mediaUrl, body })
    );
    if (createContent.fulfilled.match(result)) {
      navigate('/writer/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-8 pb-24 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create content</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Title</label>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 outline-none focus:border-indigo-500"
            placeholder="An interesting title..."
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Type</label>
          <div className="flex gap-2">
            {CONTENT_TYPES.map((t) => (
              <button
                type="button"
                key={t}
                onClick={() => setType(t)}
                className={`flex-1 py-2 rounded-md border capitalize ${
                  type === t
                    ? 'border-indigo-500 bg-indigo-600/20 text-indigo-300'
                    : 'border-gray-700 text-gray-400'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Category</label>
          <select
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 outline-none focus:border-indigo-500"
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">
            Media URL (image, video, or audio link)
          </label>
          <input
            value={mediaUrl}
            onChange={(e) => setMediaUrl(e.target.value)}
            className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 outline-none focus:border-indigo-500"
            placeholder="https://..."
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Body</label>
          <textarea
            required
            rows={8}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 outline-none focus:border-indigo-500 resize-none"
            placeholder="Write your content here..."
          />
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-lg py-3 font-semibold"
        >
          {status === 'loading' ? 'Publishing...' : 'Submit for review'}
        </button>
      </form>
    </div>
  );
}