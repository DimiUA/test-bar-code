routes = [
  {
    name: 'home',
    path: '/',
    url: './index.html',
  }, 
  {
    name: 'datails',
    path: '/request-details/code/:code/',
    async: function (routeTo, routeFrom, resolve, reject) {
      // Router instance
      var router = this;

      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // User ID from request
      var code = routeTo.params.code;

      // Simulate Ajax Request
      setTimeout(function () {
        // We got user data from request
        var user = {
          firstName: 'Dmitriy',
          lastName: 'Sat',
          about: 'Here will be displayed data from server',
          links: [
            {
              title: 'Framework7 Website',
              url: 'http://framework7.io',
            },
            {
              title: 'Framework7 Forum',
              url: 'http://forum.framework7.io',
            },
          ]
        };
        // Hide Preloader
        app.preloader.hide();

        // Resolve route to load page
        resolve(
          {
            componentUrl: './resources/pages/request-details.html',
          },
          {
            context: {
              user: user,
            }
          }
        );
      }, 1000);
    },
  },
 
  
  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];
