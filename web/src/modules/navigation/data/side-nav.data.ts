import { SideNavItems, SideNavSection } from '@modules/navigation/models';

export const sideNavSections: SideNavSection[] = [
  {
    text: 'MAIN',
    items: ['dashboard'],
  },
  {
    text: 'DETAILS',
    items: ['charts', 'tables'],
  },
];

export const sideNavItems: SideNavItems = {
  dashboard: {
    icon: 'tachometer-alt',
    text: 'Dashboard',
    link: '/dashboard',
  },
  charts: {
    icon: 'chart-area',
    text: 'Charts',
    link: '/charts',
  },
  tables: {
    icon: 'table',
    text: 'Tests',
    link: '/tables',
  },
};
