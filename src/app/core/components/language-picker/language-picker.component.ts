import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Lang, User} from '../../../store/models/user.model';
import {TranslateService} from '@ngx-translate/core';


@Component({
    selector: 'app-language-picker',
    templateUrl: './language-picker.component.html',
    styleUrls: ['./language-picker.component.css']
})
export class LanguagePickerComponent implements OnInit {
    @Input() public user: User;
    @Output() public langPicked = new EventEmitter<Lang>();
    public langs: Lang[];
    public preferences: any;
    // Local storage preferences key
    private preferencesKey: string;

    constructor(private translateService: TranslateService) {
        this.langs = [Lang.en, Lang.es];
    }

    ngOnInit(): void {
        this.preferencesKey = `${this.user.username}Preferences`;
        // window.localStorage.setItem('token', JSON.stringify(response.token));
        this.preferences = JSON.parse(window.localStorage.getItem(this.preferencesKey));
        if (!this.preferences) {
            this.changeLang(Lang.es);
        }
    }

    /**
     * Change the preferred user language
     * @param lang
     */
    changeLang(lang: Lang): void {
        this.preferences = {
            ...this.preferences,
            lang
        };
        this.translateService.use(lang);
        window.localStorage.setItem(this.preferencesKey, JSON.stringify(this.preferences));
        this.langPicked.emit(lang);
    }

}
