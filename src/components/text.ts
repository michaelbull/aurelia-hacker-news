import {
    bindable,
    bindingMode,
    Container,
    customElement,
    noView,
    View,
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

    @bindable({ defaultBindingMode: bindingMode.toView })
    value = '';

    private view?: View;

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
            let replacement = `<a href="#/item/${match[1]}">#${match[1]}</a>`;
            text = this.value.replace(URL_PATTERN, replacement);
        }

        let viewFactory = this.viewCompiler.compile(`<template>${text}</template>`, this.viewResources);
        this.view = viewFactory.create(this.container);
        this.viewSlot.add(this.view);
    }

    unbind(): void {
        if (this.view !== undefined) {
            this.viewSlot.remove(this.view);
        }
    }

    valueChanged(newValue: string, oldValue: string): void {
        if (oldValue !== undefined && newValue != oldValue) {
            this.unbind();
            this.bind();
        }
    }
}
