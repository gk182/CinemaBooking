// import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Film, 
  DoorOpen, 
  Calendar, 
  Users, 
  MapPin,
  Settings,
  LogOut,
  X,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar = ({ isOpen = true, onClose }: SidebarProps) => {
  const location = useLocation();
  const { user, logout } = useAuth();
  // const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const isAdmin = user?.role === 'ADMIN';
  // const isStaff = user?.role === 'STAFF';

  const adminMenuItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: LayoutDashboard, 
      path: '/admin' 
    },
    { 
      id: 'movies', 
      label: 'Movies', 
      icon: Film, 
      path: '/admin/movies' 
    },
    { 
      id: 'rooms', 
      label: 'Rooms', 
      icon: DoorOpen, 
      path: '/admin/rooms' 
    },
    { 
      id: 'showtimes', 
      label: 'Showtimes', 
      icon: Calendar, 
      path: '/admin/showtimes' 
    },
    { 
      id: 'cinemas', 
      label: 'Cinemas', 
      icon: MapPin, 
      path: '/admin/cinemas' 
    },
    { 
      id: 'staff', 
      label: 'Staff Accounts', 
      icon: Users, 
      path: '/admin/staff' 
    }
  ];

  const staffMenuItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: LayoutDashboard, 
      path: '/staff' 
    },
    { 
      id: 'showtimes', 
      label: 'Today Showtimes', 
      icon: Calendar, 
      path: '/staff/showtimes' 
    },
    { 
      id: 'checkin', 
      label: 'Check-in', 
      icon: Users, 
      path: '/staff/checkin' 
    },
    { 
      id: 'orders', 
      label: 'Search Orders', 
      icon: Film, 
      path: '/staff/orders' 
    }
  ];

  const menuItems = isAdmin ? adminMenuItems : staffMenuItems;

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && onClose && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-0 left-0 h-screen bg-white dark:bg-gray-800 
        border-r border-gray-200 dark:border-gray-700 w-64 z-50 
        transition-transform duration-300 flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Film className="w-8 h-8 text-red-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                CinemaBook
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {isAdmin ? 'Admin Panel' : 'Staff Panel'}
              </p>
            </div>
          </div>
          {onClose && (
            <button 
              onClick={onClose}
              className="lg:hidden p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          )}
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    onClick={onClose}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                      ${active
                        ? 'bg-red-600 text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium">{item.label}</span>
                    {active && <ChevronRight className="w-4 h-4 ml-auto" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Profile Section */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-purple-600 flex items-center justify-center text-white font-semibold">
              {user?.fullName.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {user?.fullName}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {user?.email}
              </p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Link
              to="/profile"
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>
            <button
              onClick={logout}
              className="flex items-center justify-center gap-2 px-3 py-2 text-sm bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;