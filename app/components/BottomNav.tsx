import { FlexboxLayout, Label } from '@nativescript/core';

interface NavItem {
  icon: string;
  label: string;
  route: string;
  active?: boolean;
}

const navItems: NavItem[] = [
  { icon: 'anchor', label: 'Panyero', route: 'index', active: true },
  { icon: 'account_balance_wallet', label: 'Finance', route: 'wallet' },
  { icon: 'qr_code_scanner', label: 'Scan', route: 'scanqr' },
  { icon: 'dns', label: 'Services', route: 'services' },
  { icon: 'person', label: 'Profile', route: 'profile' }
];

export function BottomNav() {
  return (
    <FlexboxLayout className="bg-white border-t border-gray-200 justify-around items-center p-2">
      {navItems.map((item) => (
        <StackLayout className="items-center" key={item.label}>
          <Label 
            text={item.icon} 
            className={`material-icons text-[24] ${item.active ? 'text-[#6CBF41]' : 'text-gray-500'}`} 
          />
          <Label 
            text={item.label} 
            className={`text-[12] ${item.active ? 'text-[#6CBF41]' : 'text-gray-500'}`} 
          />
        </StackLayout>
      ))}
    </FlexboxLayout>
  );
}