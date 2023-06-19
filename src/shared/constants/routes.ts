export const APP_ROUTES = [
  {
    path: '/',
    beforeRouteEnter: { type: '', code: '', request: '', function: '' },
    beforeRouteUpdate: {
      type: 'code',
      code:
        "return function({from,to,state}) {\n  // type here\n  console.log('UpdatedPage')\n}",
      request: '',
      function: '',
    },
    beforeRouteExit: { type: '', code: '', request: '', function: '' },
    title: '',
    fragment: {},
    meta: {},
    params: [],
    name: 'homePage',
  },
  {
    path: '/404',
    beforeRouteEnter: {},
    beforeRouteUpdate: {},
    beforeRouteExit: {},
    fragment: {},
    name: 'notFound',
  },
  {
    path: '/500',
    beforeRouteEnter: {},
    beforeRouteUpdate: {},
    beforeRouteExit: {},
    fragment: {},
    name: 'errorPage',
  },
  {
    path: '/dynamicroute/:id',
    beforeRouteEnter: {
      type: 'return function({from,to,state}) {\n  // type here\n}',
      code: '',
      request: '',
      function: '',
    },
    beforeRouteUpdate: {
      type: 'code',
      code:
        "return function({from,to,state}) {\n  // type here\n    console.log('UpdatedPage')\n}",
      request: '',
      function: '',
    },
    beforeRouteExit: {
      type: 'return function({from,to,state}) {\n  // type here\n}',
      code: '',
      request: '',
      function: '',
    },
    title: '',
    fragment: {},
    meta: {},
    params: [],
    name: 'dynamicRoute',
  },
];
