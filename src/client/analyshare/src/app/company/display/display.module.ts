import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DisplayComponent } from './display.component';
import { DisplayService } from './display.service';
import { DisplayrowModule } from './display-row/display-row.module';

@NgModule({
    imports: [
        CommonModule,
        DisplayrowModule
    ],
    declarations: [
        DisplayComponent
    ],
    exports: [
        DisplayComponent
    ],
    providers: [
        DisplayService
    ]
})
export class DisplayModule { }
