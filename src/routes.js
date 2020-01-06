import login from './components/login.vue';
import calendar from './components/calendar.vue';


const routes = [
  {
    path: '/login',
    name: 'login',
    component: login,
    props: true
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: calendar,
    props: true
  }
];

export default routes;
