import {Injectable} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Injectable({
    providedIn: 'root'
})
export class PageTitleService {
    private _title = '';
    private _originalTitle = 'Gestvtc';

    constructor(private bodyTitle: Title) {
    }

    get title(): string {
        return this._title;
    }

    set title(title: string) {
        this._title = title;
        if (title !== '') {
            title = `${title} | Gestvtc`;
        } else {
            title = this._originalTitle;
        }
        this.bodyTitle.setTitle(title);
    }
}
