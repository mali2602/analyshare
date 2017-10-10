import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../shared/api.service';
import { DcfService } from '../../shared/dcf.service';

@Component({
    selector: 'as-valuations',
    templateUrl: './valuations.component.html',
    styleUrls: ['./valuations.component.css']
})
export class ValuationsComponent implements OnInit {
    valuations;
    constructor(private apiService: ApiService,
        private dcfService: DcfService) {
            this.valuations = {};
    }

    ngOnInit() {
        this.apiService.getValuations()
            .subscribe(data => {
                this.valuations = data;
            });
    }
    calculateDcf() {
        this.valuations = this.dcfService.calculateDcf(this.valuations);
    }
}
