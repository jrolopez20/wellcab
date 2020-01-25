import {MediaMatcher} from '@angular/cdk/layout';
import {
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit
} from '@angular/core';
import {MenuCategory, MenuItems} from '@app/shared/menu-items/menu-items';
import {PageTitleService} from '../services/page-title.service';
import {AuthService} from '@app/store/features/auth/auth.service';
import {Observable} from 'rxjs';
import {User} from '@app/store/models/user.model';
import {first} from 'rxjs/operators';

/** @title Responsive sidenav */
@Component({
    selector: 'app-master-layout',
    templateUrl: 'master.component.html',
    styleUrls: []
})
export class MasterComponent implements OnDestroy, OnInit {
    mobileQuery: MediaQueryList;
    private _mobileQueryListener: () => void;
    public user$: Observable<User>;
    menu: MenuCategory[];

    constructor(
        changeDetectorRef: ChangeDetectorRef,
        media: MediaMatcher,
        private pageTitleService: PageTitleService,
        public menuItems: MenuItems,
        public authService: AuthService
    ) {
        this.mobileQuery = media.matchMedia('(min-width: 768px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
        /*this.authService.getAuthenticatedUser$().subscribe(user => {
            this.menu = this.menuItems.getCategories(user.roles[0]);
        });*/
        this.authService.getAuthenticatedUser$().pipe(first())
            .subscribe(user => {
                this.menu = this.menuItems.getCategories(user.roles[0]);
            });
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }

    ngOnInit() {
        this.pageTitleService.title = 'Dashboard';
        this.user$ = this.authService.getAuthenticatedUser$();
    }
}
