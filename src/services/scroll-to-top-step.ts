import { autoinject } from 'aurelia-framework';
import {
    NavigationInstruction,
    Next,
    PipelineStep
} from 'aurelia-router';

@autoinject()
export class ScrollToTopStep implements PipelineStep {
    run(instruction: NavigationInstruction, next: Next): Promise<any> {
        window.scrollTo(0, 0);
        return next();
    }
}
