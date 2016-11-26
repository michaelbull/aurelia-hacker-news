import { by, element } from 'protractor';

export function navBarTitle(): webdriver.promise.Promise<string> {
    return element(by.className('nav-bar__title')).getText();
}
