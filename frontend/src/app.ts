import { PLATFORM } from 'aurelia-framework';
import { Router, RouteConfig, RouterConfiguration, NavigationInstruction, Next, Redirect } from 'aurelia-router';

export class App {

  public static KEY_LANGUAGE = 'language';
  public static DEFAULT_LANGUAGE = 'it';

  router: Router;

  constructor() { }

  configureRouter(config: RouterConfiguration, router: Router) {

    const handleUnknownRoutes = (instruction: NavigationInstruction): RouteConfig => {
      return { route: 'not-found', moduleId: PLATFORM.moduleName('misc/not-found/index'), title: 'Not found', settings: { auth: false } };
    }

    config.title = 'Shiva';
    config.options.pushState = true;
    config.options.root = '/';
    config.map([
      { route: '', name: 'home', redirect: 'home' },
      { route: 'home', moduleId: PLATFORM.moduleName('home/index'), title: 'Home'},

    ])
      .mapUnknownRoutes(handleUnknownRoutes);

    this.router = router;
  }

}

