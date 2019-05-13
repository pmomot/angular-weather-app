import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'wr-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./header.component.scss'],
  template: `
    <header>
      <img
        src="./assets/images/logo.svg"
        alt="App logo"
        routerLink="/"
      >
      My weather app
    </header>
  `
})
export class HeaderComponent {}
