import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {registerLicense} from "@syncfusion/ej2-base";

import { AppModule } from './app/app.module';
import { enableProdMode } from '@angular/core';

registerLicense('Ngo9BigBOggjHTQxAR8/V1NBaF5cXmZCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWXpcdnVRQ2JeUUF2V0Y=');
enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
