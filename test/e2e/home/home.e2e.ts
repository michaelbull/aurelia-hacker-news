import { browser } from 'protractor';
import { URL, pageTitle } from '../common.page';
import { navBarTitle } from './home.page';

describe('homepage', () => {
    beforeEach(() => {
        browser.loadAndWaitForAureliaPage(URL);
    });

    it('should have the correct page title', () => {
        expect(pageTitle()).toBe('Aurelia HN');
    });

    it('should have the correct nav bar title', () => {
        expect(navBarTitle()).toBe('Hacker News');
    });
});
