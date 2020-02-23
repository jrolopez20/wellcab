import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

/**
 * Custom Component for Single Search Input
 */

@Component({
    selector: 'app-search-box',
    templateUrl: './search-box.component.html',
    styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
    @Output() onSubmit = new EventEmitter<string>();
    public searchForm: FormGroup;

    constructor(private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.searchForm = this.formBuilder.group({
            filter: ['', Validators.maxLength(30)]
        });
    }

    submit() {
        if (this.searchForm.valid) {
            this.onSubmit.emit(this.searchForm.getRawValue().filter);
        }
    }

}
