import login from './components/login.vue';
import calendar from './components/calendar.vue';


const routes = [
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: calendar
  }
];

export default routes;
