import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { SearchModule } from './search/search.module';
import { SharedModule } from './shared/shared.module';
import { CompanyModule } from './company/company.module';
import { AppRouteModule } from './app-route.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        RouterModule,
        SharedModule,
        LayoutModule,
        SearchModule,
        CompanyModule,
        AppRouteModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
