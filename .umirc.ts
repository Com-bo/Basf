import { defineConfig } from 'umi';

const pagePath = '';
// const pagePath = '/sites/DPA_DEV_Community/LevelRequest/SitePages/Portal.aspx';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  theme: {
    '@primary-color': '#65ac1e',
    '@link-color': '#231f20',
    '@border-radius-base': '5px',
    '@border-color-base': '#ebe8e5',
  },
  fastRefresh: {},
  routes: [
    {
      exact: true,
      path: `${pagePath}/`,
      redirect: `${pagePath}/home/index`,
    },
    {
      path: `${pagePath}/home/index`,
      component: '@/pages/home/index',
    },
    {
      path: `${pagePath}/readIT/index`,
      component: '@/pages/readIT/index',
    },
    {
      path: `${pagePath}/EventCalendar/index`,
      component: '@/pages/EventCalendar/index',
    },
    {
      path: `${pagePath}/newsManagement/index`,
      component: '@/pages/newsManagement/index',
    },
    {
      path: `${pagePath}/tagsManagement/index`,
      component: '@/pages/tagsManagement/index',
    },
    {
      path: `${pagePath}/EventManagement/index`,
      component: '@/pages/EventManagement/index',
    },
    // {
    //   path: `${pagePath}/DigitalAcademy/index`,
    //   component: '@/pages/DigitalAcademy/index',
    // },
    // {
    //   path: `${pagePath}/SolutionGallery/index`,
    //   component: '@/pages/SolutionGallery/index',
    // },
  ],
});
