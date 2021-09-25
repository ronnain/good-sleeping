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

        // Set cookie
        const expiracyDate = new Date();
        expiracyDate.setDate(expiracyDate.getDate() + 365); // Expire after one year
        document.cookie = `${this.isDarkThemeSelectedCookiesKey}=${isDarkTheme};expires=${expiracyDate.toUTCString()};path=/`;

        // Set colors

    }

    isDarkTheme() {
        return this.isDarkThemeSelected;
    }

    private retrieveDarkTheme() {
        const regexCookieAuthorisation = new RegExp(this.isDarkThemeSelectedCookiesKey+'=true');
        this.isDarkThemeSelected = regexCookieAuthorisation.test(document.cookie);
    }
}