import {
    bindable,
    bindingMode,
    Container,
    customElement,
    noView,
    ViewCompiler,
    ViewResources,
    ViewSlot
} from 'aurelia-framework';

const URL_PATTERN = new RegExp(
    '<a href="https:&#x2F;&#x2F;news\.ycombinator\.com&#x2F;item\\?id=(\\d+)" rel="nofollow">' +
    'https:&#x2F;&#x2F;news\.ycombinator\.com&#x2F;item\\?id=\\d+' +
    '<\/a>',
    'g'
);

@noView()
@customElement('hn-text')
export class Text {

    @bindable({ defaultBindingMode: bindingMode.oneTime })
    value = '';

    private readonly container: Container;
    private readonly viewCompiler: ViewCompiler;
    private readonly viewResources: ViewResources;
    private readonly viewSlot: ViewSlot;

    constructor(container: Container, viewCompiler: ViewCompiler, viewResources: ViewResources, viewSlot: ViewSlot) {
        this.container = container;
        this.viewCompiler = viewCompiler;
        this.viewResources = viewResources;
        this.viewSlot = viewSlot;
    }

    bind(): void {
        let text = this.value;
        let match = URL_PATTERN.exec(text);

        if (match !== null) {
            let replacement = `<a route-href="route: item; params.bind: { id: ${match[1]} }">#${match[1]}</a>`;
            text = this.value.replace(URL_PATTERN, replacement);
        }

        let viewFactory = this.viewCompiler.compile(`<template>${text}</template>`, this.viewResources);
        let view = viewFactory.create(this.container);
        this.viewSlot.add(view);
    }
}
