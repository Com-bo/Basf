import { defineConfig } from 'umi';

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
  // publicPath:"https://serviceme.sharepoint.com/sites/DPA_DEV_Community/LevelRequest/SitePages/",
  fastRefresh: {},
  routes: [
    {
      exact: true,
      path: '/',
      redirect: '/home/index',
    },
    {
      path: '/home/index',
      component: '@/pages/home/index',
    },
    {
      path: '/readIT/index',
      component: '@/pages/readIT/index',
    },
    {
      path: '/EventCalendar/index',
      component: '@/pages/EventCalendar/index',
    },
    {
      path: '/DigitalAcademy/index',
      component: '@/pages/DigitalAcademy/index',
    },
    {
      path: '/SolutionGallery/index',
      component: '@/pages/SolutionGallery/index',
    },
  ],
  // routes: [
  //   {
  //     exact: true,
  //     path: '/sites/DPA_DEV_Community/LevelRequest/SitePages/Portal.aspx/',
  //     redirect: '/sites/DPA_DEV_Community/LevelRequest/SitePages/Portal.aspx/home/index',
  //   },
  //   {
  //     path: '/sites/DPA_DEV_Community/LevelRequest/SitePages/Portal.aspx/home/index',
  //     component: '@/pages/home/index',
  //   },
  //   {
  //     path: '/sites/DPA_DEV_Community/LevelRequest/SitePages/Portal.aspx/readIT/index',
  //     component: '@/pages/readIT/index',
  //   },
  //   {
  //     path: '/sites/DPA_DEV_Community/LevelRequest/SitePages/Portal.aspx/EventCalendar/index',
  //     component: '@/pages/EventCalendar/index',
  //   },
  //   {
  //     path: '/sites/DPA_DEV_Community/LevelRequest/SitePages/Portal.aspx/DigitalAcademy/index',
  //     component: '@/pages/DigitalAcademy/index',
  //   },
  //   {
  //     path: '/sites/DPA_DEV_Community/LevelRequest/SitePages/Portal.aspx/SolutionGallery/index',
  //     component: '@/pages/SolutionGallery/index',
  //   },
  // ]
});
