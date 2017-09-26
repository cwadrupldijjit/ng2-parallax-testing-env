import { Component } from '@angular/core';
import { ParallaxConfig } from '../../../ng2-parallax/dist';
@Component({
    selector: 'my-app',
    templateUrl: '/app/app.template.html'
})
export class AppComponent {
    public parallaxConfig: ParallaxConfig = {
        ratio: -.4,
        initialValue: -10,
        cssUnit: '%'
    }
}
