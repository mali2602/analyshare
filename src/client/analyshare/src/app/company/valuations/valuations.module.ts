import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {InlineEditorModule} from '@qontu/ngx-inline-editor';

import { ValuationsComponent } from './valuations.component';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        InlineEditorModule
    ],
    declarations: [
        ValuationsComponent
    ],
    exports: [
        ValuationsComponent
    ]
})
export class ValuationsModule { }
