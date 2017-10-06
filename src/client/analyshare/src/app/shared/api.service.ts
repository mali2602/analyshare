import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { SharedService } from './shared.service';

@Injectable()
export class ApiService {
    private basePath = 'http://localhost:8888/api';

    constructor(
        private http: HttpClient,
        private sharedService: SharedService
    ) {
        this.http = http;
    }
    private getUrl(path) {
        return `${this.basePath}/${path}`;
    }
    getParams() {
        const details = this.sharedService.getSearchDetails();
        const params = new HttpParams().set('sessionid', details.sessionid)
            .set('mccode', details.mccode);
        return { params };
    }
    getCompanyInfo() {
        const details = this.sharedService.getSearchDetails();
        return this.http.get(this.getUrl(`data/${details.stockcode}`), this.getParams());
    }
    getCashflow() {
        const details = this.sharedService.getSearchDetails();
        return this.http.get(this.getUrl(`cashflow/${details.stockcode}`), this.getParams());
    }
    getBalanceSheet() {
        const details = this.sharedService.getSearchDetails();
        return this.http.get(this.getUrl(`balancesheet/${details.mccode}`), this.getParams());
    }
    getProfitLoss() {
        const details = this.sharedService.getSearchDetails();
        return this.http.get(this.getUrl(`profitloss/${details.mccode}`), this.getParams());
    }
}
