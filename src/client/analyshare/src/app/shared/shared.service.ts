import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {
    private searchDetails = null;

    getSearchDetails() {
        return this.searchDetails;
    }
    setSearchDetails(searchDetails) {
        this.searchDetails = searchDetails;
    }
}
