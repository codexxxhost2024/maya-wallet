import React from 'react';
import { Link } from 'react-router-dom';

const services = [
  { icon: '⛵', name: 'Maritime', route: '/maritime' },
  { icon: '💼', name: 'Finance', route: '/finance' },
  { icon: '🎓', name: 'Academy', route: '/academy' },
  { icon: '🎞', name: 'Media', route: '/media' },
  { icon: '🚘', name: 'Vehicle', route: '/vehicle' },
  { icon: '🎮', name: 'Games', route: '/games' },
  { icon: '🎟', name: 'Lottery', route: '/lottery' },
  { icon: '➕', name: 'More', route: '/more' }
];

export default function ServiceGrid() {
  return (
    <div className="grid grid-cols-4 gap-4 mb-4">
      {services.map((service) => (
        <Link
          to={service.route}
          key={service.name}
          className="bg-white p-3 rounded-lg shadow flex flex-col items-center"
        >
          <div className="text-2xl bg-gray-100 rounded-lg p-2 mb-2">{service.icon}</div>
          <div className="text-xs text-gray-700">{service.name}</div>
        </Link>
      ))}
    </div>
  );
}