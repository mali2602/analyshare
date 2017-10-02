import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { SharedService } from './shared.service';
import { ApiService } from './api.service';

@NgModule({
    imports: [
        HttpClientModule
    ],
    providers: [
        SharedService,
        ApiService
    ]
})
export class SharedModule { }
