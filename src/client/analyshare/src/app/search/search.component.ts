import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { SharedService } from '../shared/shared.service';

@Component({
    selector: 'as-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent {
    model = {};

    constructor(
        private sharedService: SharedService,
        private router: Router
    ) {
        this.sharedService = sharedService;
        this.router = router;
    }

    submit() {
        this.sharedService.setSearchDetails(this.model);
        this.router.navigate(['company/info']);
    }
}
