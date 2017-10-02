import { Component, Input, OnInit } from '@angular/core';

import { DisplayService } from '../display.service';

@Component({
    selector: 'as-display-row',
    templateUrl: './display-row.component.html',
    styleUrls: ['./display-row.component.css']
})
export class DisplayrowComponent implements OnInit {
    @Input() keyMapping;
    @Input() data;

    values;
    constructor(private displayService: DisplayService) {}

    ngOnInit() {
        this.values = this.displayService.formDisplayValues(this.keyMapping.key, this.data);
    }
}
