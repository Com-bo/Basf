import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  theme: {
    '@primary-color': '#bd1738',
    '@link-color': '#231f20',
    '@border-radius-base': '5px',
    '@border-color-base': '#ebe8e5',
  },
  fastRefresh: {},
  routes: [
    {
      exact: true,
      path: '/',
      redirect: '/home/index',
    },
    {
      // path: '/generalPurchase',
      path: '/home',
      component: '@/pages/home',
    },
    {
      path: '/home/index',
      component: '@/pages/home/index',
    },
  ],
});
