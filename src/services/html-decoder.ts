export class HtmlDecoder {
    decode(html: string): string {
        let element = document.createElement('textarea');
        element.innerHTML = html;
        return element.value;
    }
}
