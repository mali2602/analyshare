import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../shared/api.service';

@Component({
    selector: 'as-cashflow',
    templateUrl: './cashflow.component.html',
    styleUrls: ['./cashflow.component.css']
})
export class CashflowComponent implements OnInit {
    cashflow;
    properties;
    constructor(private apiService: ApiService) {
        this.properties = [
            {
                key: 'cashfromoperatingactivity',
                name: 'Cash from Operating Activity'
            },
            {
                key: 'cashfrominvestingactivity',
                name: 'Cash from Investing Activity'
            },
            {
                key: 'cashfromfinancingactivity',
                name: 'Cash from Financing Activity'
            },
            {
                key: 'netcashflow',
                name: 'Net Cash Flow',
                bold: true
            },
            {
                key: 'fcf',
                name: 'Free Cash Flow',
                bold: true
            }
        ]
    }

    ngOnInit() {
        this.apiService.getCashflow()
            .subscribe(data => {
                this.cashflow = data;
            });
    }

}
