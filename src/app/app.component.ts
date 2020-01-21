import {ChangeDetectorRef, Component} from '@angular/core';
import {AuthService} from '@app/store/features/auth/auth.service';
import {Observable, of} from 'rxjs';
import {MediaMatcher} from '@angular/cdk/layout';
import {PageTitleService} from '@app/core/services/page-title.service';
import {MenuItems} from '@app/shared/menu-items/menu-items';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor(private authService: AuthService) {
        this.authService.checkIfLoggedIn();
    }


}
