import { Aurelia } from 'aurelia-framework';
import { PLATFORM } from 'aurelia-pal';

export function configure(aurelia: Aurelia): void {
  aurelia.use
    .standardConfiguration()
    .plugin(PLATFORM.moduleName("aurelia-fontawesome"))
    .plugin(PLATFORM.moduleName('aurelia-fontawesome-loader'));


  if (process.env.NODE_ENV == 'development') {
    console.log("Development mode on");
    aurelia.use.developmentLogging('debug');
  }

  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
