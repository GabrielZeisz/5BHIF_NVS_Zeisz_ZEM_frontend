import login from './components/login.vue';
import calendar from './components/calendar.vue';
import register from './components/register.vue';
import homescreen from './components/homescreen.vue';


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
  },
  {
    path: '/register',
    name: 'register',
    component: register,
    props: true
  },
  {
    path: '/',
    name: 'homescreen',
    component: homescreen,
    props: true
  }
];

export default routes;
