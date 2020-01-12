import {
    ChangeDetectorRef,
    Component,
    OnDestroy, OnInit
} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {MenuItems} from '../../../shared/menu-items/menu-items';
import {Params, Router} from '@angular/router';
import { Subject} from 'rxjs';
import {trigger, animate, state, style, transition} from '@angular/animations';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
    animations: [
        trigger('bodyExpansion', [
            state('collapsed', style({height: '0px', display: 'none'})),
            state('expanded', style({height: '*', display: 'block'})),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4,0.0,0.2,1)')),
        ]),
    ],
})
export class AppSidebarComponent implements OnDestroy, OnInit {
    mobileQuery: MediaQueryList;
    private _mobileQueryListener: () => void;

    section = 'ADMIN'; // TODO - Recive authenticate user role
    expansions: { [key: string]: boolean } = {};
    private _onDestroy = new Subject<void>();

    constructor(
        changeDetectorRef: ChangeDetectorRef,
        media: MediaMatcher,
        public menuItems: MenuItems,
        private _router: Router
    ) {
        this.mobileQuery = media.matchMedia('(min-width: 768px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);

    }

    ngOnInit(): void {
        // this._router.events.pipe(
        //     startWith(null),
        //     switchMap(() => this.params),
        //     takeUntil(this._onDestroy)
        // ).subscribe(p => this.setExpansions(p));
    }

    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    /** Set the expansions based on the route url */
    setExpansions(params: Params) {
        const categories = this.menuItems.getCategories(params.section);
        for (const category of (categories || [])) {
            if (this.expansions[category.id]) {
                continue;
            }

            let match = false;
            for (const item of category.items) {
                if (this._router.url.indexOf(item.id) > -1) {
                    match = true;
                    break;
                }
            }

            if (!this.expansions[category.id]) {
                this.expansions[category.id] = match;
            }
        }
    }

    /** Gets the expanded state */
    _getExpandedState(category: string) {
        return this.getExpanded(category) ? 'expanded' : 'collapsed';
    }

    /** Toggles the expanded state */
    toggleExpand(category: string) {
        this.expansions[category] = !this.expansions[category];
    }

    /** Gets whether expanded or not */
    getExpanded(category: string): boolean {
        return this.expansions[category] === undefined ? true : this.expansions[category];
    }

    // ngOnDestroy(): void {
    //     this.mobileQuery.removeListener(this._mobileQueryListener);
    // }
}
