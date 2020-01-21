import {Component} from '@angular/core';
import {AuthService} from '@app/store/features/auth/auth.service';

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
