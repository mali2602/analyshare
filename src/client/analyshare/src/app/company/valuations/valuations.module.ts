import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ValuationsComponent } from './valuations.component';
@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ValuationsComponent
    ],
    exports: [
        ValuationsComponent
    ]
})
export class ValuationsModule { }
