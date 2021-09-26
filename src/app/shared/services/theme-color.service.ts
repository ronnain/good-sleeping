import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})

export class ThemeColorService {

    isDarkThemeSelectedCookiesKey = "isDarkThemeSelected"
    isDarkThemeSelected: boolean = false;

    constructor() {
        this.retrieveDarkTheme();
     }

    setDarkTheme(isDarkTheme: boolean) {
        // Set local var
        this.isDarkThemeSelected = isDarkTheme;

        this.refreshTheme();

        // Set cookie
        const expiracyDate = new Date();
        expiracyDate.setDate(expiracyDate.getDate() + 365); // Expire after one year
        document.cookie = `${this.isDarkThemeSelectedCookiesKey}=${isDarkTheme};expires=${expiracyDate.toUTCString()};path=/`;
    }

    isDarkTheme() {
        return this.isDarkThemeSelected;
    }

    private retrieveDarkTheme() {
        const regexCookieAuthorisation = new RegExp(this.isDarkThemeSelectedCookiesKey+'=true');
        this.isDarkThemeSelected = regexCookieAuthorisation.test(document.cookie);
        this.refreshTheme();
    }

    private refreshTheme() {
        const targetTheme = this.isDarkThemeSelected ? 'dark' : '';
        document.documentElement.setAttribute('data-theme', targetTheme);

        const htmlElement = document.getElementsByTagName('html')[0];
        if (this.isDarkThemeSelected) {
            htmlElement.classList.add('dark-theme');
        } else {
            htmlElement.classList.remove('dark-theme');
        }
    }
}