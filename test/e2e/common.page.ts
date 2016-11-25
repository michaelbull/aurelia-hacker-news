import { browser } from 'protractor';

export const URL: string = 'http://localhost:8080';

export function pageTitle(): webdriver.promise.Promise<string> {
    return browser.getTitle();
}
