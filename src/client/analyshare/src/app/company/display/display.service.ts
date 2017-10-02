import { Injectable } from '@angular/core';
import _ from 'lodash';

@Injectable()
export class DisplayService {
    formDisplayValues(key, data) {
        return data.data.map(obj => _.get(obj, key));
    }
}
