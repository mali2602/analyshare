import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../shared/api.service';

@Component({
    selector: 'as-valuations',
    templateUrl: './valuations.component.html',
    styleUrls: ['./valuations.component.css']
})
export class ValuationsComponent implements OnInit {
    valuations;
    constructor(private apiService: ApiService) {
        this.valuations = {
            growthRates: {}
        };
    }

    ngOnInit() {
        this.apiService.getValuations()
            .subscribe(data => {
                this.valuations = data;
            });
    }

}
