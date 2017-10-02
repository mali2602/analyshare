import { NgModule } from '@angular/core';

import { ProfitlossComponent } from './profitloss.component';
import { DisplayModule } from '../display/display.module';

@NgModule({
    imports: [
        DisplayModule
    ],
    declarations: [
        ProfitlossComponent
    ],
    exports: [
        ProfitlossComponent
    ]
})
export class ProfitlossModule { }
