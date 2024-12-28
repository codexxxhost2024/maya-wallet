import { GridLayout, Label } from '@nativescript/core';

const services = [
  { icon: '⛵', name: 'Maritime', route: 'maritime' },
  { icon: '💼', name: 'Finance', route: 'finance' },
  { icon: '🎓', name: 'Academy', route: 'academy' },
  { icon: '🎞', name: 'Media', route: 'media' },
  { icon: '🚘', name: 'Vehicle', route: 'vehicle' },
  { icon: '🎮', name: 'Games', route: 'games' },
  { icon: '🎟', name: 'Lottery', route: 'lottery' },
  { icon: '➕', name: 'More', route: 'more' }
];

export function ServiceGrid() {
  return (
    <GridLayout rows="auto, auto" columns="*, *, *, *" className="mx-4 gap-4">
      {services.map((service, index) => (
        <StackLayout 
          row={Math.floor(index / 4)} 
          col={index % 4}
          className="bg-white p-3 rounded-lg shadow items-center"
          key={service.name}
        >
          <Label text={service.icon} className="text-[24] bg-gray-100 rounded-lg p-2 mb-2" />
          <Label text={service.name} className="text-[12] text-gray-700" />
        </StackLayout>
      ))}
    </GridLayout>
  );
}