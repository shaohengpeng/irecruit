import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Homeperson from '../views/Homeperson.vue'
import Homepage from '../components/Homepage.vue'
import Personmessage from '../components/Personmessage.vue'
import Resumemessage from '../components/Resumemessage.vue'
import UserPersonregist from '../views/UserPersonregist.vue'
import UserCompanyregist from '../views/UserCompanyregist.vue'
import ApplyInfoManage from '../components/ApplyInfoManage.vue'
import OrderInfoManage from '../components/OrderInfoManage.vue'
import Homecompany from '../views/Homecompany.vue'
import ApplyInfoManageCompany from '../components/company/ApplyInfoManage.vue'
import RecruitPublish from '../components/company/RecruitPublish.vue'
import RecruitInfoManage from '../components/company/RecruitInfoManage.vue'
import Homeadmin from '../views/Homeadmin.vue'
import Resourcemanage from '../components/admin/Resourcemanage.vue'
import Personusermanage from '../components/admin/Personusermanage.vue'
import Companyusermanage from '../components/admin/Companyusermanage.vue'
import Adminusermanage from '../components/admin/Adminusermanage.vue'
import Zhaopinginfomanage from '../components/admin/Zhaopinginfomanage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/userpersonregist',
    name: 'UserPersonregist',
    component: UserPersonregist
  },
  {
    path: '/usercompanyregist',
    name: 'UserCompanyregist',
    component: UserCompanyregist
  },
  {
    path: '/homeperson',
    name: 'Homeperson',
    component: Homeperson,
    children:[
      {
        path:'/homepage',
        name:'Homepage',
        component:Homepage
      },
      {
        path: '/personmessage',
        name: 'Personmessage',
        component: Personmessage
      },
      {
        path: '/resumemessage',
        name: 'Resumemessage',
        component: Resumemessage
      },
      {
        path: '/applyinfomanage',
        name: 'ApplyInfoManage',
        component: ApplyInfoManage
      },
      {
        path: '/orderinfomanage',
        name: 'OrderInfoManage',
        component: OrderInfoManage
      }
    ]
  },
  {
    path: '/homecompany',
    name: 'Homecompany',
    component: Homecompany,
    children:[
      {
        path: '/applyinfomanagecompany',
        name: 'ApplyInfoManageCompany',
        component: ApplyInfoManageCompany
      },
      {
        path: '/recruitpublish',
        name: 'RecruitPublish',
        component: RecruitPublish
      },
      {
        path: '/recruitInfoManage',
        name: 'RecruitInfoManage',
        component: RecruitInfoManage
      }
    ]
  },
  {
    path: '/homeadmin',
    name: 'Homeadmin',
    component: Homeadmin,
    children:[
      {
        path: '/resourcemanage',
        name: 'Resourcemanage',
        component: Resourcemanage
      },
      {
        path: '/personusermanage',
        name: 'Personusermanage',
        component: Personusermanage
      },
      {
        path: '/companyusermanage',
        name: 'Companyusermanage',
        component: Companyusermanage
      },
      {
        path: '/adminusermanage',
        name: 'Adminusermanage',
        component: Adminusermanage
      },
      {
        path: '/zhaopinginfomanage',
        name: 'Zhaopinginfomanage',
        component: Zhaopinginfomanage
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

//导航守卫
//使用一个router.beforeEach注册一个全局前置守卫，判断用户是否登录
router.beforeEach((to,from,next)=>{
  if(to.path === '/login' || to.path ==='/userpersonregist' || to.path ==='/usercompanyregist'){
    next();
  }else{
    let token = localStorage.getItem('Authorization'); 
    if(token === null || token ===''){
      alert("你还没有登录，请先登录");
      next('/login');
    }else{
      next();
    }
  }
})

export default router
