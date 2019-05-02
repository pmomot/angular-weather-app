import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <wr-header></wr-header>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}
