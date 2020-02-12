import {Component, OnInit} from '@angular/core';
import {MenuCategory, MenuItems} from '@app/shared/menu-items/menu-items';
import {AuthService} from '@app/store/features/auth/auth.service';
import {User} from '@app/store/models/user.model';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    public menu: MenuCategory[];
    private user: User;

    constructor(
        public menuItems: MenuItems,
        private authService: AuthService
    ) {
    }

    ngOnInit(): void {
        this.authService.getAuthenticatedUser$().subscribe(user => {
            this.menu = this.menuItems.getCategories(user.roles[0]);
        });
    }
}
