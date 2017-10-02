import { NgModule } from '@angular/core';

import { CompanyComponent } from './company.component';
import { CompanyRouteModule } from './company-route.module';
import { InfoModule } from './info/info.module';
import { BalanceSheetModule } from './balancesheet/balancesheet.module';
import { CashflowModule } from './cashflow/cashflow.module';
import { DisplayModule } from './display/display.module';
import { ProfitlossModule } from './profitloss/profitloss.module';

@NgModule({
    imports: [
        CompanyRouteModule,
        DisplayModule,
        InfoModule,
        BalanceSheetModule,
        CashflowModule,
        ProfitlossModule
    ],
    declarations: [
        CompanyComponent
    ],
    exports: [
        CompanyComponent
    ]
})
export class CompanyModule { }
