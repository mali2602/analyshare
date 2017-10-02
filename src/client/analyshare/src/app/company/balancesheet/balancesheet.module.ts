import { NgModule } from '@angular/core';

import { BalanceSheetComponent } from './balancesheet.component';
import { DisplayModule } from '../display/display.module';

@NgModule({
    imports: [
        DisplayModule
    ],
    declarations: [
        BalanceSheetComponent
    ],
    exports: [
        BalanceSheetComponent
    ]
})
export class BalanceSheetModule { }
