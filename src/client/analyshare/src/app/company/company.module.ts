import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyComponent } from './company.component';
import { CompanyRouteModule } from './company-route.module';
import { InfoModule } from './info/info.module';
import { BalanceSheetModule } from './balancesheet/balancesheet.module';
import { CashflowModule } from './cashflow/cashflow.module';
import { DisplayModule } from './display/display.module';
import { ProfitlossModule } from './profitloss/profitloss.module';
import { ValuationsModule } from './valuations/valuations.module';

@NgModule({
    imports: [
        CommonModule,
        CompanyRouteModule,
        DisplayModule,
        InfoModule,
        BalanceSheetModule,
        CashflowModule,
        ProfitlossModule,
        ValuationsModule
    ],
    declarations: [
        CompanyComponent
    ],
    exports: [
        CompanyComponent
    ]
})
export class CompanyModule { }
