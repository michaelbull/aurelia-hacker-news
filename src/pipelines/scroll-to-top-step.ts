import {
    NavigationInstruction,
    Next,
    PipelineStep
} from 'aurelia-router';

export class ScrollToTopStep implements PipelineStep {
    run(instruction: NavigationInstruction, next: Next): Promise<any> {
        if (instruction.router.isNavigatingNew) {
            window.scroll(0, 0);
        }
        return next();
    }
}
