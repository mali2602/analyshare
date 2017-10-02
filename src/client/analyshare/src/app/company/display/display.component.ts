import { Component, Input } from '@angular/core';
import { DisplayService } from './display.service';

@Component({
    selector: 'as-display',
    templateUrl: './display.component.html',
    styleUrls: ['./display.component.css']
})
export class DisplayComponent {
    @Input() properties;
    @Input() data;

    constructor(private displayService: DisplayService) {}

    getPropertyValues(prop) {
        return this.displayService.formDisplayValues(prop.key, this.data);
    }

}
