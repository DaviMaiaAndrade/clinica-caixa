import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  ClipboardDocumentListIcon, 
  UserGroupIcon, 
  CalendarDaysIcon,
  ChartBarIcon 
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Especialidades', href: '/especialidades', icon: ClipboardDocumentListIcon },
  { name: 'Médicos', href: '/medicos', icon: UserGroupIcon },
  { name: 'Consultas', href: '/consultas', icon: CalendarDaysIcon },
  { name: 'Relatórios', href: '/relatorios', icon: ChartBarIcon },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex h-screen w-64 flex-col bg-gray-800">
      <div className="flex h-16 items-center justify-center bg-gray-900">
        <h1 className="text-xl font-bold text-white">Clínica Caixa</h1>
      </div>
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`
                group flex items-center px-2 py-2 text-sm font-medium rounded-md
                ${isActive 
                  ? 'bg-gray-900 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }
              `}
            >
              <item.icon
                className={`mr-3 h-6 w-6 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'}`}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}