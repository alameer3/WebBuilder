import { useState } from 'react';
import { Save, Database, Key, Mail, Shield, Globe, Palette } from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    general: {
      siteName: 'YEMEN_FLIX',
      siteDescription: 'منصة مشاهدة الأفلام والمسلسلات العربية',
      siteUrl: 'https://yemenflix.com',
      adminEmail: 'admin@yemenflix.com',
      maintenance: false,
    },
    api: {
      tmdbApiKey: '***hidden***',
      enableTmdbSync: true,
      autoSync: true,
      syncInterval: 24,
    },
    security: {
      enableRegistration: true,
      requireEmailVerification: false,
      maxLoginAttempts: 5,
      sessionTimeout: 30,
    },
    appearance: {
      theme: 'dark',
      primaryColor: '#f3951e',
      secondaryColor: '#27272c',
      backgroundColor: '#161619',
    },
    notifications: {
      emailNotifications: true,
      newUserAlert: true,
      systemAlerts: true,
      contactFormAlert: true,
    }
  });

  const tabs = [
    { id: 'general', label: 'عام', icon: Globe },
    { id: 'api', label: 'API', icon: Key },
    { id: 'security', label: 'الأمان', icon: Shield },
    { id: 'appearance', label: 'المظهر', icon: Palette },
    { id: 'notifications', label: 'الإشعارات', icon: Mail },
  ];

  const handleSave = () => {
    console.log('Saving settings:', settings);
    // Here you would save to API
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-white font-medium mb-2">اسم الموقع</label>
        <input
          type="text"
          value={settings.general.siteName}
          onChange={(e) => setSettings(prev => ({
            ...prev,
            general: { ...prev.general, siteName: e.target.value }
          }))}
          className="w-full bg-[#161619] text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-[#f3951e] focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-white font-medium mb-2">وصف الموقع</label>
        <textarea
          value={settings.general.siteDescription}
          onChange={(e) => setSettings(prev => ({
            ...prev,
            general: { ...prev.general, siteDescription: e.target.value }
          }))}
          rows={3}
          className="w-full bg-[#161619] text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-[#f3951e] focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-white font-medium mb-2">رابط الموقع</label>
        <input
          type="url"
          value={settings.general.siteUrl}
          onChange={(e) => setSettings(prev => ({
            ...prev,
            general: { ...prev.general, siteUrl: e.target.value }
          }))}
          className="w-full bg-[#161619] text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-[#f3951e] focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-white font-medium mb-2">بريد المدير</label>
        <input
          type="email"
          value={settings.general.adminEmail}
          onChange={(e) => setSettings(prev => ({
            ...prev,
            general: { ...prev.general, adminEmail: e.target.value }
          }))}
          className="w-full bg-[#161619] text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-[#f3951e] focus:outline-none"
        />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <label className="block text-white font-medium">وضع الصيانة</label>
          <p className="text-gray-400 text-sm">تفعيل وضع الصيانة للموقع</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.general.maintenance}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              general: { ...prev.general, maintenance: e.target.checked }
            }))}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#f3951e]"></div>
        </label>
      </div>
    </div>
  );

  const renderApiSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-white font-medium mb-2">TMDB API Key</label>
        <input
          type="password"
          value={settings.api.tmdbApiKey}
          onChange={(e) => setSettings(prev => ({
            ...prev,
            api: { ...prev.api, tmdbApiKey: e.target.value }
          }))}
          className="w-full bg-[#161619] text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-[#f3951e] focus:outline-none"
        />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <label className="block text-white font-medium">تفعيل مزامنة TMDB</label>
          <p className="text-gray-400 text-sm">مزامنة البيانات مع TMDB تلقائياً</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.api.enableTmdbSync}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              api: { ...prev.api, enableTmdbSync: e.target.checked }
            }))}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#f3951e]"></div>
        </label>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <label className="block text-white font-medium">المزامنة التلقائية</label>
          <p className="text-gray-400 text-sm">مزامنة البيانات بشكل دوري</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.api.autoSync}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              api: { ...prev.api, autoSync: e.target.checked }
            }))}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#f3951e]"></div>
        </label>
      </div>

      <div>
        <label className="block text-white font-medium mb-2">فترة المزامنة (ساعة)</label>
        <input
          type="number"
          min="1"
          max="168"
          value={settings.api.syncInterval}
          onChange={(e) => setSettings(prev => ({
            ...prev,
            api: { ...prev.api, syncInterval: parseInt(e.target.value) }
          }))}
          className="w-full bg-[#161619] text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-[#f3951e] focus:outline-none"
        />
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-white font-medium">السماح بالتسجيل</label>
          <p className="text-gray-400 text-sm">السماح للمستخدمين الجدد بالتسجيل</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.security.enableRegistration}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              security: { ...prev.security, enableRegistration: e.target.checked }
            }))}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#f3951e]"></div>
        </label>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <label className="block text-white font-medium">تأكيد البريد الإلكتروني</label>
          <p className="text-gray-400 text-sm">طلب تأكيد البريد عند التسجيل</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.security.requireEmailVerification}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              security: { ...prev.security, requireEmailVerification: e.target.checked }
            }))}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#f3951e]"></div>
        </label>
      </div>

      <div>
        <label className="block text-white font-medium mb-2">عدد محاولات تسجيل الدخول</label>
        <input
          type="number"
          min="3"
          max="10"
          value={settings.security.maxLoginAttempts}
          onChange={(e) => setSettings(prev => ({
            ...prev,
            security: { ...prev.security, maxLoginAttempts: parseInt(e.target.value) }
          }))}
          className="w-full bg-[#161619] text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-[#f3951e] focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-white font-medium mb-2">مهلة الجلسة (دقيقة)</label>
        <input
          type="number"
          min="15"
          max="120"
          value={settings.security.sessionTimeout}
          onChange={(e) => setSettings(prev => ({
            ...prev,
            security: { ...prev.security, sessionTimeout: parseInt(e.target.value) }
          }))}
          className="w-full bg-[#161619] text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-[#f3951e] focus:outline-none"
        />
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-white font-medium mb-2">المظهر</label>
        <select
          value={settings.appearance.theme}
          onChange={(e) => setSettings(prev => ({
            ...prev,
            appearance: { ...prev.appearance, theme: e.target.value }
          }))}
          className="w-full bg-[#161619] text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-[#f3951e] focus:outline-none"
        >
          <option value="dark">المظهر الداكن</option>
          <option value="light">المظهر الفاتح</option>
          <option value="auto">تلقائي</option>
        </select>
      </div>

      <div>
        <label className="block text-white font-medium mb-2">اللون الأساسي</label>
        <input
          type="color"
          value={settings.appearance.primaryColor}
          onChange={(e) => setSettings(prev => ({
            ...prev,
            appearance: { ...prev.appearance, primaryColor: e.target.value }
          }))}
          className="w-full bg-[#161619] text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-[#f3951e] focus:outline-none h-12"
        />
      </div>

      <div>
        <label className="block text-white font-medium mb-2">اللون الثانوي</label>
        <input
          type="color"
          value={settings.appearance.secondaryColor}
          onChange={(e) => setSettings(prev => ({
            ...prev,
            appearance: { ...prev.appearance, secondaryColor: e.target.value }
          }))}
          className="w-full bg-[#161619] text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-[#f3951e] focus:outline-none h-12"
        />
      </div>

      <div>
        <label className="block text-white font-medium mb-2">لون الخلفية</label>
        <input
          type="color"
          value={settings.appearance.backgroundColor}
          onChange={(e) => setSettings(prev => ({
            ...prev,
            appearance: { ...prev.appearance, backgroundColor: e.target.value }
          }))}
          className="w-full bg-[#161619] text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-[#f3951e] focus:outline-none h-12"
        />
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-white font-medium">إشعارات البريد الإلكتروني</label>
          <p className="text-gray-400 text-sm">تفعيل إشعارات البريد الإلكتروني</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.notifications.emailNotifications}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              notifications: { ...prev.notifications, emailNotifications: e.target.checked }
            }))}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#f3951e]"></div>
        </label>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <label className="block text-white font-medium">تنبيه المستخدمين الجدد</label>
          <p className="text-gray-400 text-sm">إشعار عند تسجيل مستخدم جديد</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.notifications.newUserAlert}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              notifications: { ...prev.notifications, newUserAlert: e.target.checked }
            }))}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#f3951e]"></div>
        </label>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <label className="block text-white font-medium">تنبيهات النظام</label>
          <p className="text-gray-400 text-sm">إشعارات المشاكل التقنية</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.notifications.systemAlerts}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              notifications: { ...prev.notifications, systemAlerts: e.target.checked }
            }))}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#f3951e]"></div>
        </label>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <label className="block text-white font-medium">تنبيه نموذج التواصل</label>
          <p className="text-gray-400 text-sm">إشعار عند وصول رسالة جديدة</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.notifications.contactFormAlert}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              notifications: { ...prev.notifications, contactFormAlert: e.target.checked }
            }))}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#f3951e]"></div>
        </label>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general': return renderGeneralSettings();
      case 'api': return renderApiSettings();
      case 'security': return renderSecuritySettings();
      case 'appearance': return renderAppearanceSettings();
      case 'notifications': return renderNotificationSettings();
      default: return renderGeneralSettings();
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">إعدادات النظام</h1>
          <p className="text-gray-400 mt-1">تخصيص وإدارة إعدادات المنصة</p>
        </div>
        <button 
          onClick={handleSave}
          className="bg-[#f3951e] hover:bg-[#e8891a] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Save size={20} />
          حفظ التغييرات
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Tabs */}
        <div className="lg:col-span-1">
          <div className="bg-[#27272c] rounded-lg border border-gray-700 p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-right flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-[#f3951e] text-white'
                        : 'text-gray-400 hover:text-white hover:bg-[#161619]'
                    }`}
                  >
                    <Icon size={20} />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-[#27272c] rounded-lg border border-gray-700 p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
}