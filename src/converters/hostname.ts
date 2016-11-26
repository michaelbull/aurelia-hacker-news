export class HostnameValueConverter {
    private readonly anchor: HTMLAnchorElement = document.createElement('a');

    toView(url: string): string | undefined {
        this.anchor.href = url;

        let result: string = this.anchor.hostname.replace('www.', '');

        if (result === 'localhost') {
            return undefined;
        } else {
            return '(' + result + ')';
        }
    }
}
