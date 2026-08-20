import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPendingContent, fetchUsers } from '../../features/moderation/moderationSlice';
import { fetchContent } from '../../features/content/contentSlice';
import { fetchCategories } from '../../features/categories/categorySlice';

export default function AdminDashboardPage() {
  const dispatch = useDispatch();
  const { pendingContent, users } = useSelector((state) => state.moderation);
  const { items } = useSelector((state) => state.content);
  const { list: categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchPendingContent());
    dispatch(fetchUsers());
    dispatch(fetchContent());
    dispatch(fetchCategories());
  }, [dispatch]);

  const stats = [
    { label: 'Total content', value: items.length },
    { label: 'Pending review', value: pendingContent.length },
    { label: 'Total users', value: users.length },
    { label: 'Categories', value: categories.length },
  ];

  const links = [
    { to: '/admin/moderation', label: 'Content moderation', desc: 'Approve or flag posts' },
    { to: '/admin/users', label: 'User management', desc: 'Deactivate or manage accounts' },
    { to: '/admin/categories', label: 'Categories', desc: 'Add or edit content categories' },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-8 pb-24">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-gray-900 border border-gray-800 rounded-xl p-4"
          >
            <p className="text-2xl font-bold text-lime-400">{s.value}</p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="bg-gray-900 border border-gray-800 rounded-xl p-4 hover:border-gray-600 flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold">{link.label}</h2>
              <p className="text-sm text-gray-500">{link.desc}</p>
            </div>
            <span className="text-gray-600">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}