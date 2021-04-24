// import { UserController } from './controllers/UserController';
import { UserController } from "./controllers/UserController";
const appElement = document.querySelector('#app');
console.log('login form');
if (appElement) {
    let Usercontroller = new UserController(appElement);
}
