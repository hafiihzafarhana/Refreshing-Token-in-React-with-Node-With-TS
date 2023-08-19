import App from "@/app";
import IndexRoute from "@api/index/index.route";
import AuthRoute from "@api/auth/auth.route";
import UserRoute from "@api/user/user.route";

const app = new App([new IndexRoute(), new AuthRoute(), new UserRoute()]);

app.listen();
