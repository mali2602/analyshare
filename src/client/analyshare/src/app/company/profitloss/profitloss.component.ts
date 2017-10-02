import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../shared/api.service';

@Component({
    selector: 'as-profitloss',
    templateUrl: './profitloss.component.html',
    styleUrls: ['./profitloss.component.css']
})
export class ProfitlossComponent implements OnInit {
    profitloss;
    properties;
    constructor(private apiService: ApiService) {
        this.properties = [
            {
                key: 'revenues.totaloperatingrevenues',
                name: 'Revenue from operations'
            },
            {
                key: 'revenues.otherincome',
                name: 'Other income'
            },
            {
                key: 'revenues.totalrevenue',
                name: 'Total Revenue',
                bold: true
            },
            {
                key: 'expenses.costofmaterialsconsumed',
                name: 'Cost of materials consumed'
            },
            {
                key: 'expenses.purchaseofstockintrade',
                name: 'Purchases of Stock-in-Trade'
            },
            {
                key: 'expenses.changesininventoriesoffgwipandstockintrade',
                name: 'Changes in inventories of finished goods work-in-progress and Stock-in-Trade'
            },
            {
                key: 'expenses.employeebenefitexpenses',
                name: 'Employee benefits expense Finance costs'
            },
            {
                key: 'expenses.depreciationandamortisationexpenses',
                name: 'Depreciation and amortization expense'
            },
            {
                key: 'expenses.financecosts',
                name: 'Finance costs'
            },
            {
                key: 'expenses.otherexpenses',
                name: 'Other expenses'
            },
            {
                key: 'expenses.totalexpenses',
                name: 'Total Expenses',
                bold: true
            },
            {
                key: 'profitlossbeforeexceptionalextraordinaryitemsandtax',
                name: 'Profit before exceptional and extraordinary items and tax',
                bold: true
            },
            {
                key: 'exceptionalitems',
                name: 'Exceptional items'
            },
            {
                key: 'profitlossbeforetax',
                name: 'Profit before tax',
                bold: true
            },
            {
                key: 'totaltaxexpenses',
                name: 'Tax expense'
            },
            {
                key: 'profitlossfortheperiod',
                name: 'Profit (Loss) for the period',
                bold: true
            },
            {
                key: '',
                name: 'Earnings per equity share:'
            },
            {
                key: 'basicepsrs',
                name: 'Basic'
            },
            {
                key: 'dilutedepsrs',
                name: 'Diluted'
            }
        ]
    }

    ngOnInit() {
        this.apiService.getProfitLoss()
            .subscribe(data => {
                this.profitloss = data;
            });
    }

}
