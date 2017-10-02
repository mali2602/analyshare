import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CompanyComponent } from './company.component';
import { CompanyGuard } from './company-guard.service';
import { InfoComponent } from './info/info.component';
import { CashflowComponent } from './cashflow/cashflow.component';
import { BalanceSheetComponent } from './balancesheet/balancesheet.component';
import { ProfitlossComponent } from './profitloss/profitloss.component';

const routes: Routes = [
    {
        path: 'company',
        component: CompanyComponent,
        canActivate: [CompanyGuard],
        children: [
            {
                path: 'info',
                component: InfoComponent
            },
            {
                path: 'balancesheet',
                component: BalanceSheetComponent
            },
            {
                path: 'cashflow',
                component: CashflowComponent
            },
            {
                path: 'profitloss',
                component: ProfitlossComponent
            }
        ]
    }
];
@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        CompanyGuard
    ]
})
export class CompanyRouteModule { }
