import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../shared/api.service';

@Component({
    selector: 'as-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
    details;
    constructor(
        private apiService: ApiService
    ) { }
    ngOnInit() {
        this.details = this.apiService.getCompanyInfo().subscribe(data => {
            this.details = data;
          });
    }
}
