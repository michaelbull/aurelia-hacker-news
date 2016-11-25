import { by, element } from 'protractor';

export function heading(): webdriver.promise.Promise<string> {
    return element(by.tagName('h1')).getText();
}
