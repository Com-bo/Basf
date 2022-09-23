export default {
  define: {
    'process.env.type': 'test',
    'process.env.host': 'https://basf.sharepoint.com',
    // 'process.env.relativePath': '/sites/gate2digital',
    // 'process.env.taskRelativePath': '/sites/gate2digital',
    'process.env.relativePath': '/sites/gate2digital',
    'process.env.taskRelativePath': '/sites/gate2digital',
    'process.env.token': null,
    'process.env.pagePath': '/sites/gate2digital/SitePages/Portal.aspx',

    'process.env.listId': 'f48c88c1-dbeb-4269-a126-764716d31251',
    'process.env.fieldId': '23018294-6c50-4fac-8362-46dc36e700cb',
  },
  publicPath: 'https://basf.sharepoint.com/sites/gate2digital/Style Library/',
  routes: [
    {
      exact: true,
      path: '/sites/gate2digital/SitePages/Portal.aspx/',
      redirect: '/sites/gate2digital/SitePages/Portal.aspx/home/index',
    },
    {
      path: '/sites/gate2digital/SitePages/Portal.aspx/home/index',
      component: '@/pages/home/index',
    },
    {
      path: '/sites/gate2digital/SitePages/Portal.aspx/readIT/index',
      component: '@/pages/readIT/index',
    },
    {
      path: '/sites/gate2digital/SitePages/Portal.aspx/EventCalendar/index',
      component: '@/pages/EventCalendar/index',
    },
    {
      path: '/sites/gate2digital/SitePages/Portal.aspx/DigitalAcademy/index',
      component: '@/pages/DigitalAcademy/index',
    },
    {
      path: '/sites/gate2digital/SitePages/Portal.aspx/SolutionGallery/index',
      component: '@/pages/SolutionGallery/index',
    },
    {
      path: '/sites/gate2digital/SitePages/Portal.aspx/EventManagement/index',
      component: '@/pages/EventManagement/index',
    },
    {
      path: '/sites/gate2digital/SitePages/Portal.aspx/tagsManagement/index',
      component: '@/pages/tagsManagement/index',
    },
    {
      path: '/sites/gate2digital/SitePages/Portal.aspx/newsManagement/index',
      component: '@/pages/newsManagement/index',
    },
    {
      path: '/sites/gate2digital/SitePages/Portal.aspx/newsDetail/index',
      component: '@/pages/newsDetail/index',
    },
  ],
};
