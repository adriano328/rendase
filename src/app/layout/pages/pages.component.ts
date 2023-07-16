import {Component} from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {LoadingService} from "../../shared/services/loading.service";
import {StorageKeys} from "../../shared/constants/storage-key";

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent {

  loading!: boolean;
  isLogged: boolean;
  hideSidenav = false;
  darkTheme = localStorage.getItem(StorageKeys.THEME) === 'DARK';
  fullscreen = false;
  themes: any;
  user = {name: 'Nahyara Amanda', email: ''};

  constructor(
    private authService: AuthService,
    private loadingSrv: LoadingService,
  ) {
    if (this.darkTheme) {
      document.body.classList.add('dark-theme');
    }
    this.isLogged = this.authService.isLogged();
    this.loadingSrv.isLoading().subscribe(load => this.loading = load);
    this.themes = [
      { code: 0, active: false },
      { code: 20, active: false },
      { code: 39, active: false },
      { code: 105, active: false },
      { code: 165, active: false },
      { code: 195, active: false },
      { code: 229, active: true },
      { code: 270, active: false },
      { code: 315, active: false },
    ];
    const theme = localStorage.getItem(StorageKeys.HSL);
    if (theme && parseInt(theme) !== 229) {
      this.themes[6].active = false;
      this.changeTheme(this.themes.find((t: any) => t.code === parseInt(theme)));
    }
  }

  toggleTheme() {
    this.darkTheme = !this.darkTheme;
    localStorage.setItem(StorageKeys.THEME, this.darkTheme ? 'DARK' : 'LIGHT');

    if (this.darkTheme) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }

  toggleFullscreen() {
    const doc = window.document;
    const docEl = doc.documentElement;
    const requestFullScreen = docEl.requestFullscreen;
    const exitFullScreen = doc.exitFullscreen;

    if (!this.fullscreen) {
      if (requestFullScreen) {
        requestFullScreen.call(docEl);
      }
      this.fullscreen = true;
    } else {
      if (exitFullScreen) {
        exitFullScreen.call(doc);
      }
      this.fullscreen = false;
    }
  }

  calculeHslBackground(hslcode: number) {
    if (this.darkTheme) {
      return `hsl(${hslcode}, 29%, 16%)`;
    }
    return `hsl(${hslcode}, 24%, 28%)`;
  }

  changeTheme(theme: any) {
    this.themes.forEach((t: any) => t.active = false);
    theme.active = true;
    document.documentElement.style.setProperty('--hsl-color', `${theme.code}`);
    localStorage.setItem(StorageKeys.HSL, theme.code);
  }

}
