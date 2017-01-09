import 'hammerjs';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '@angular/material';
import { ViewportRuler } from '@angular/material/core/overlay/position/viewport-ruler'

// You can switch between the versions of the package you're testing.  Both versions should
// be testable and interchangeable.  Make sure to change the system config when you switch
// or you may not see expected results from it.
// import { Parallax } from 'ng2-parallax/system';
import { Parallax } from '../../../ng2-parallax/system';

import { AppComponent } from './app.component';
import { HomeComponent } from './routes/home/home.component';

import { RouteModule } from './routes/route.module';

@NgModule({
    imports: [
        BrowserModule,
        RouteModule,
        MaterialModule.forRoot()
    ],
    declarations: [ 
        AppComponent,
        Parallax,
        HomeComponent
    ],
    bootstrap: [ AppComponent ]
})
class AppModule {}

export { AppModule };
