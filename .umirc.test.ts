export default {
  define: {
    'process.env.type': 'test',
    'process.env.host': 'https://serviceme.sharepoint.com',
    // 'process.env.relativePath': '/sites/DPA_DEV_Community/LevelRequest',
    // 'process.env.taskRelativePath': '/sites/DPA_DEV_Community/LevelRequest',
    'process.env.relativePath': '/sites/Gate2Digital',
    'process.env.taskRelativePath': '/sites/Gate2Digital',
    'process.env.token': null,
  },
  publicPath:
    'https://serviceme.sharepoint.com/sites/DPA_DEV_Community/LevelRequest/SitePages/',
  routes: [
    {
      exact: true,
      path: '/sites/DPA_DEV_Community/LevelRequest/SitePages/Portal.aspx/',
      redirect:
        '/sites/DPA_DEV_Community/LevelRequest/SitePages/Portal.aspx/home/index',
    },
    {
      path: '/sites/DPA_DEV_Community/LevelRequest/SitePages/Portal.aspx/home/index',
      component: '@/pages/home/index',
    },
    {
      path: '/sites/DPA_DEV_Community/LevelRequest/SitePages/Portal.aspx/readIT/index',
      component: '@/pages/readIT/index',
    },
    {
      path: '/sites/DPA_DEV_Community/LevelRequest/SitePages/Portal.aspx/EventCalendar/index',
      component: '@/pages/EventCalendar/index',
    },
    {
      path: '/sites/DPA_DEV_Community/LevelRequest/SitePages/Portal.aspx/DigitalAcademy/index',
      component: '@/pages/DigitalAcademy/index',
    },
    {
      path: '/sites/DPA_DEV_Community/LevelRequest/SitePages/Portal.aspx/SolutionGallery/index',
      component: '@/pages/SolutionGallery/index',
    },
  ],
};
