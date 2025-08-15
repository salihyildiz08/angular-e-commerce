export interface NavigationModel {
  title: string;
  url: string;
  icon?: string;
}

export const navigations: NavigationModel[] = [
  {
    title: 'Home',
    url: '/',
    icon: 'home',
  },
    {
    title: 'Products',
    url: '/products',
    icon: 'deployed_code',
  },
];
