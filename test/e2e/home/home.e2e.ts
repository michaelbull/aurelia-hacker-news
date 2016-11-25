import { browser } from 'protractor';
import { URL, pageTitle } from '../common.page';
import { heading } from './home.page';

describe('homepage', () => {
    beforeEach(() => {
        browser.loadAndWaitForAureliaPage(URL);
    });

    it('should have the correct page title', () => {
        expect(pageTitle()).toBe('Hacker News');
    });

    it('should have the correct page heading', () => {
        expect(heading()).toBe('Home');
    });
});
