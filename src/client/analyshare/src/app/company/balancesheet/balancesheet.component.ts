import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../shared/api.service';

@Component({
    selector: 'as-balancesheet',
    templateUrl: './balancesheet.component.html'
})
export class BalanceSheetComponent implements OnInit {
    balancesheet;
    properties;
    constructor(private apiService: ApiService) {
        this.properties = [
            {
                key: '',
                name: 'EQUITY AND LIABILITIES',
                bold: true
            },
            {
                key: 'shareholdersfunds.totalsharecapital',
                name: 'Share Capital'
            },
            {
                key: 'shareholdersfunds.totalreservesandsurplus',
                name: 'Reserves and surplus'
            },
            {
                key: 'shareholdersfunds.totalshareholdersfunds',
                name: 'Shareholders funds',
                bold: true
            },
            {
                key: 'noncurrentliabilities.longtermborrowings',
                name: 'Long-term borrowings'
            },
            {
                key: 'noncurrentliabilities.deferredtaxliabilitiesnet',
                name: 'Deferred tax liabilities (Net)'
            },
            {
                key: 'noncurrentliabilities.otherlongtermliabilities',
                name: 'Other Long term liabilities'
            },
            {
                key: 'noncurrentliabilities.longtermprovisions',
                name: ' Long-term provisions'
            },
            {
                key: 'noncurrentliabilities.totalnoncurrentliabilities',
                name: 'Non-current liabilities',
                bold: true
            },
            {
                key: 'currentliabilities.shorttermborrowings',
                name: 'Short-term borrowings'
            },
            {
                key: 'currentliabilities.tradepayables',
                name: 'Trade payables'
            },
            {
                key: 'currentliabilities.othercurrentliabilities',
                name: 'Other current liabilities'
            },
            {
                key: 'currentliabilities.shorttermprovisions',
                name: 'Short-term provisions'
            },
            {
                key: 'currentliabilities.totalcurrentliabilities',
                name: 'Current liabilities',
                bold: true
            },
            {
                key: '',
                name: 'ASSETS',
                bold: true
            },
            {
                key: 'noncurrentassets.fixedassets.fixedassets',
                name: 'Fixed assets'
            },
            {
                key: 'noncurrentassets.noncurrentinvestments',
                name: 'Non-current investments'
            },
            {
                key: 'noncurrentassets.deferredtaxassetsnet',
                name: 'Deferred tax assets (net)'
            },
            {
                key: 'noncurrentassets.longtermloansandadvances',
                name: 'Long-term loans and advances'
            },
            {
                key: 'noncurrentassets.othernoncurrentassets',
                name: 'Other non-current assets'
            },
            {
                key: 'noncurrentassets.totalnoncurrentassets',
                name: 'Non-current assets',
                bold: true
            },
            {
                key: 'currentassets.currentinvestments',
                name: 'Current investments'
            },
            {
                key: 'currentassets.inventories',
                name: 'Inventories'
            },
            {
                key: 'currentassets.tradereceivables',
                name: 'Trade receivables'
            },
            {
                key: 'currentassets.cashandcashequivalents',
                name: 'Cash and cash equivalents'
            },
            {
                key: 'currentassets.shorttermloansandadvances',
                name: 'Short-term loans and advances'
            },
            {
                key: 'currentassets.othercurrentassets',
                name: 'Other current assets'
            },
            {
                key: 'currentassets.totalcurrentassets',
                name: 'Current assets',
                bold: true
            }
        ]
    }
    ngOnInit() {
        this.apiService.getBalanceSheet()
            .subscribe(data => {
                this.balancesheet = data;
            });
    }
}
