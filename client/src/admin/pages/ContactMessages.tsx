import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Mail, Eye, Trash2, Archive, Reply } from 'lucide-react';

export default function ContactMessages() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: contactsData = [], isLoading } = useQuery({
    queryKey: ['/api/contacts'],
    select: (data: any) => data?.contacts || []
  });

  // Filter messages based on search and status
  const filteredMessages = contactsData.filter((message: any) => {
    const matchesSearch = message.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.message?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || message.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredMessages.length / itemsPerPage);
  const paginatedMessages = filteredMessages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unread': return 'bg-red-600 text-red-100';
      case 'read': return 'bg-blue-600 text-blue-100';
      case 'replied': return 'bg-green-600 text-green-100';
      case 'archived': return 'bg-gray-600 text-gray-100';
      default: return 'bg-gray-600 text-gray-100';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'unread': return 'غير مقروءة';
      case 'read': return 'مقروءة';
      case 'replied': return 'تم الرد';
      case 'archived': return 'مؤرشفة';
      default: return 'غير محدد';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">جاري التحميل...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">رسائل التواصل</h1>
          <p className="text-gray-400 mt-1">إدارة رسائل المستخدمين والتواصل معهم</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-[#f3951e] hover:bg-[#e8891a] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <Archive size={20} />
            أرشفة المحددة
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-[#27272c] rounded-lg border border-gray-700 p-6">
          <div className="flex items-center gap-3">
            <Mail className="text-blue-400" size={24} />
            <div>
              <h3 className="text-white font-bold">إجمالي الرسائل</h3>
              <p className="text-2xl font-bold text-blue-400">{contactsData.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-[#27272c] rounded-lg border border-gray-700 p-6">
          <div className="flex items-center gap-3">
            <Mail className="text-red-400" size={24} />
            <div>
              <h3 className="text-white font-bold">غير مقروءة</h3>
              <p className="text-2xl font-bold text-red-400">
                {contactsData.filter((m: any) => m.status === 'unread' || !m.status).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#27272c] rounded-lg border border-gray-700 p-6">
          <div className="flex items-center gap-3">
            <Reply className="text-green-400" size={24} />
            <div>
              <h3 className="text-white font-bold">تم الرد عليها</h3>
              <p className="text-2xl font-bold text-green-400">
                {contactsData.filter((m: any) => m.status === 'replied').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#27272c] rounded-lg border border-gray-700 p-6">
          <div className="flex items-center gap-3">
            <Archive className="text-gray-400" size={24} />
            <div>
              <h3 className="text-white font-bold">مؤرشفة</h3>
              <p className="text-2xl font-bold text-gray-400">
                {contactsData.filter((m: any) => m.status === 'archived').length}
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
              placeholder="البحث في الرسائل..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#161619] text-white pl-10 pr-4 py-2 rounded-lg border border-gray-600 focus:border-[#f3951e] focus:outline-none"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-[#161619] text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-[#f3951e] focus:outline-none appearance-none min-w-[150px]"
          >
            <option value="all">جميع الحالات</option>
            <option value="unread">غير مقروءة</option>
            <option value="read">مقروءة</option>
            <option value="replied">تم الرد</option>
            <option value="archived">مؤرشفة</option>
          </select>
        </div>
      </div>

      {/* Messages Table */}
      <div className="bg-[#27272c] rounded-lg border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#161619]">
              <tr>
                <th className="text-right p-4 text-gray-300 font-medium">المرسل</th>
                <th className="text-right p-4 text-gray-300 font-medium">الموضوع</th>
                <th className="text-right p-4 text-gray-300 font-medium">الرسالة</th>
                <th className="text-right p-4 text-gray-300 font-medium">التاريخ</th>
                <th className="text-right p-4 text-gray-300 font-medium">الحالة</th>
                <th className="text-right p-4 text-gray-300 font-medium">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {paginatedMessages.map((message: any) => (
                <tr key={message.id} className="border-b border-gray-700 hover:bg-[#2a2a2f] transition-colors">
                  <td className="p-4">
                    <div>
                      <div className="text-white font-medium">{message.name}</div>
                      <div className="text-gray-400 text-sm">{message.email}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-white max-w-xs truncate">{message.subject}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-gray-300 max-w-md truncate">{message.message}</div>
                  </td>
                  <td className="p-4 text-gray-300">
                    {new Date(message.createdAt).toLocaleDateString('ar-SA')}
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(message.status || 'unread')}`}>
                      {getStatusLabel(message.status || 'unread')}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button 
                        className="text-blue-400 hover:text-blue-300 p-1 rounded hover:bg-blue-400/10 transition-colors"
                        title="عرض"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        className="text-green-400 hover:text-green-300 p-1 rounded hover:bg-green-400/10 transition-colors"
                        title="رد"
                      >
                        <Reply size={16} />
                      </button>
                      <button 
                        className="text-gray-400 hover:text-gray-300 p-1 rounded hover:bg-gray-400/10 transition-colors"
                        title="أرشفة"
                      >
                        <Archive size={16} />
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
              عرض {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, filteredMessages.length)} من {filteredMessages.length}
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

      {/* Empty State */}
      {filteredMessages.length === 0 && !isLoading && (
        <div className="bg-[#27272c] rounded-lg border border-gray-700 p-12 text-center">
          <Mail size={48} className="text-gray-400 mx-auto mb-4" />
          <h3 className="text-white font-bold text-lg mb-2">لا توجد رسائل</h3>
          <p className="text-gray-400 mb-4">
            {searchTerm || filterStatus !== 'all' 
              ? 'لم يتم العثور على رسائل مطابقة لمعايير البحث'
              : 'لم يتم استلام أي رسائل بعد'
            }
          </p>
        </div>
      )}
    </div>
  );
}