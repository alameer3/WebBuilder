import { Route, Switch, useLocation } from 'wouter';
import AdminLayout from './components/AdminLayout';
import Dashboard from './pages/Dashboard';
import Movies from './pages/Movies';
import Series from './pages/Series';
import Users from './pages/Users';
import Categories from './pages/Categories';
import Settings from './pages/Settings';
import Analytics from './pages/Analytics';
import DataManager from './pages/DataManager';
import ContactMessages from './pages/ContactMessages';

export default function AdminRouter() {
  const [location] = useLocation();
  
  // Only render admin layout for admin paths
  if (!location.startsWith('/admin')) {
    return null;
  }

  return (
    <AdminLayout>
      <Switch>
        <Route path="/admin" component={Dashboard} />
        <Route path="/admin/dashboard" component={Dashboard} />
        <Route path="/admin/movies" component={Movies} />
        <Route path="/admin/series" component={Series} />
        <Route path="/admin/users" component={Users} />
        <Route path="/admin/categories" component={Categories} />
        <Route path="/admin/analytics" component={Analytics} />
        <Route path="/admin/data-manager" component={DataManager} />
        <Route path="/admin/messages" component={ContactMessages} />
        <Route path="/admin/settings" component={Settings} />
      </Switch>
    </AdminLayout>
  );
}