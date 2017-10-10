import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { SharedService } from './shared.service';
import { ApiService } from './api.service';
import { DcfService } from './dcf.service';

@NgModule({
    imports: [
        HttpClientModule
    ],
    providers: [
        SharedService,
        ApiService,
        DcfService
    ]
})
export class SharedModule { }
