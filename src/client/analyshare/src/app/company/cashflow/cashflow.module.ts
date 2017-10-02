import { NgModule } from '@angular/core';

import { CashflowComponent } from './cashflow.component';
import { DisplayModule } from '../display/display.module';

@NgModule({
    imports: [
        DisplayModule
    ],
    declarations: [
        CashflowComponent
    ],
    exports: [
        CashflowComponent
    ]
})
export class CashflowModule { }
