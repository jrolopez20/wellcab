import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Lang, User} from '../../../store/models/user.model';
import {TranslateService} from '@ngx-translate/core';


@Component({
    selector: 'app-language-picker',
    templateUrl: './language-picker.component.html',
    styleUrls: ['./language-picker.component.css']
})
export class LanguagePickerComponent {
    @Input() public user: User;
    @Output() public langPicked = new EventEmitter<Lang>();
    public langs: Lang[];

    constructor(private translateService: TranslateService) {
        this.langs = [Lang.en, Lang.es];
    }

    changeLang(language: Lang): void {
        if (language !== this.user.lang) {
            this.translateService.use(language);
            this.langPicked.emit(language);
        }
    }

}
