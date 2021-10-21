import About from "../components/About/About";
import Account from "../components/Account/Account"
import Activity from "../components/Activity/Activity";
import Coupon from "../components/Coupon/Coupon";
import Setting from "../components/Setting/Setting";

export const Routes = [
    {
        path: '/account',
        component: Account
    },
    {
        path: '/activity',
        component: Activity
    },
    {
        path: '/coupon',
        component: Coupon
    },
    {
        path: '/setting',
        component: Setting
    },
    {
        path: '/about',
        component: About
    }
];
