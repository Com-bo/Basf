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
      path: '/sites/DPA_DEV_Community/SitePages/Form.aspx/',
      component: '@/layouts/index',
      routes: [
        {
          path: '/sites/DPA_DEV_Community/SitePages/Form.aspx/leaseEstateContract',
          component: '@/pages/leaseEstateContract',
        },
        {
          path: '/sites/DPA_DEV_Community/SitePages/Form.aspx/subcontractContract',
          component: '@/pages/subcontractContract',
        },
      ],
    },
  ],
});
