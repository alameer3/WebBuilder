import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Plus, Edit, Trash2, Eye, Shield, User, Ban } from 'lucide-react';

export default function Users() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Mock users data - in real app this would come from API
  const usersData = [
    { id: '1', username: 'admin', email: 'admin@yemenflix.com', role: 'admin', isActive: true, lastLogin: '2025-02-18', joinDate: '2025-01-01' },
    { id: '2', username: 'محمد_أحمد', email: 'mohamed@example.com', role: 'user', isActive: true, lastLogin: '2025-02-17', joinDate: '2025-02-01' },
    { id: '3', username: 'فاطمة_علي', email: 'fatima@example.com', role: 'user', isActive: true, lastLogin: '2025-02-16', joinDate: '2025-02-05' },
    { id: '4', username: 'أحمد_سالم', email: 'ahmed@example.com', role: 'moderator', isActive: false, lastLogin: '2025-02-10', joinDate: '2025-01-15' },
    { id: '5', username: 'مريم_حسن', email: 'mariam@example.com', role: 'user', isActive: true, lastLogin: '2025-02-18', joinDate: '2025-02-08' },
  ];

  // Filter users based on search and role
  const filteredUsers = usersData.filter((user) => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Shield className="text-red-400" size={16} />;
      case 'moderator': return <Eye className="text-yellow-400" size={16} />;
      default: return <User className="text-blue-400" size={16} />;
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'مدير';
      case 'moderator': return 'مشرف';
      default: return 'مستخدم';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">إدارة المستخدمين</h1>
          <p className="text-gray-400 mt-1">إدارة المستخدمين والصلاحيات</p>
        </div>
        <button className="bg-[#f3951e] hover:bg-[#e8891a] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <Plus size={20} />
          إضافة مستخدم جديد
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-[#27272c] rounded-lg border border-gray-700 p-6">
          <div className="flex items-center gap-3">
            <User className="text-blue-400" size={24} />
            <div>
              <h3 className="text-white font-bold">إجمالي المستخدمين</h3>
              <p className="text-2xl font-bold text-blue-400">{usersData.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-[#27272c] rounded-lg border border-gray-700 p-6">
          <div className="flex items-center gap-3">
            <Shield className="text-red-400" size={24} />
            <div>
              <h3 className="text-white font-bold">المديرون</h3>
              <p className="text-2xl font-bold text-red-400">
                {usersData.filter(u => u.role === 'admin').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#27272c] rounded-lg border border-gray-700 p-6">
          <div className="flex items-center gap-3">
            <Eye className="text-yellow-400" size={24} />
            <div>
              <h3 className="text-white font-bold">المشرفون</h3>
              <p className="text-2xl font-bold text-yellow-400">
                {usersData.filter(u => u.role === 'moderator').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#27272c] rounded-lg border border-gray-700 p-6">
          <div className="flex items-center gap-3">
            <Ban className="text-red-500" size={24} />
            <div>
              <h3 className="text-white font-bold">المحظورون</h3>
              <p className="text-2xl font-bold text-red-500">
                {usersData.filter(u => !u.isActive).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-[#27272c] rounded-lg border border-gray-700 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="البحث في المستخدمين..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#161619] text-white pl-10 pr-4 py-2 rounded-lg border border-gray-600 focus:border-[#f3951e] focus:outline-none"
            />
          </div>

          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="bg-[#161619] text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-[#f3951e] focus:outline-none appearance-none min-w-[150px]"
          >
            <option value="all">جميع الأدوار</option>
            <option value="admin">مديرون</option>
            <option value="moderator">مشرفون</option>
            <option value="user">مستخدمون</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-[#27272c] rounded-lg border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#161619]">
              <tr>
                <th className="text-right p-4 text-gray-300 font-medium">المستخدم</th>
                <th className="text-right p-4 text-gray-300 font-medium">البريد الإلكتروني</th>
                <th className="text-right p-4 text-gray-300 font-medium">الدور</th>
                <th className="text-right p-4 text-gray-300 font-medium">تاريخ الانضمام</th>
                <th className="text-right p-4 text-gray-300 font-medium">آخر تسجيل دخول</th>
                <th className="text-right p-4 text-gray-300 font-medium">الحالة</th>
                <th className="text-right p-4 text-gray-300 font-medium">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-700 hover:bg-[#2a2a2f] transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#f3951e] rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {user.username.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="text-white font-medium">{user.username}</div>
                        <div className="text-gray-400 text-sm">ID: {user.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-gray-300">{user.email}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {getRoleIcon(user.role)}
                      <span className="text-white">{getRoleLabel(user.role)}</span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-300">{user.joinDate}</td>
                  <td className="p-4 text-gray-300">{user.lastLogin}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      user.isActive 
                        ? 'bg-green-600 text-green-100' 
                        : 'bg-red-600 text-red-100'
                    }`}>
                      {user.isActive ? 'نشط' : 'محظور'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button 
                        className="text-blue-400 hover:text-blue-300 p-1 rounded hover:bg-blue-400/10 transition-colors"
                        title="تعديل"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        className={`p-1 rounded transition-colors ${
                          user.isActive 
                            ? 'text-red-400 hover:text-red-300 hover:bg-red-400/10' 
                            : 'text-green-400 hover:text-green-300 hover:bg-green-400/10'
                        }`}
                        title={user.isActive ? 'حظر' : 'إلغاء الحظر'}
                      >
                        <Ban size={16} />
                      </button>
                      <button 
                        className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-red-400/10 transition-colors"
                        title="حذف"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-gray-700 flex items-center justify-between">
            <div className="text-sm text-gray-400">
              عرض {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, filteredUsers.length)} من {filteredUsers.length}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-[#161619] text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2a2a2f] transition-colors"
              >
                السابق
              </button>
              <span className="px-3 py-1 text-gray-300">
                {currentPage} من {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-[#161619] text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2a2a2f] transition-colors"
              >
                التالي
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}