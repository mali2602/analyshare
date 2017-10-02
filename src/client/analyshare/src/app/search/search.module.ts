import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SearchComponent } from './search.component';
import { SearchRouteModule } from './search-route.module';

@NgModule({
    imports: [
        FormsModule,
        SearchRouteModule
    ],
    declarations: [
        SearchComponent
    ],
    exports: [
        SearchComponent
    ]
})
export class SearchModule { }
