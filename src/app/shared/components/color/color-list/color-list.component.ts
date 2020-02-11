import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {merge, Observable} from 'rxjs';
import {Color} from '@app/store/models/color.model';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ColorService} from '@app/store/features/color/color.service';
import {ConfirmDialogComponent} from '@app/shared/utils/delete-confirm-dialog/confirm-dialog.component';
import {Company} from '@app/store/models/company.model';

@Component({
    selector: 'app-color-list',
    templateUrl: './color-list.component.html',
    styleUrls: ['./color-list.component.css']
})
export class ColorListComponent implements OnInit, AfterViewInit {
    @Input() editable = true;
    @Input() selectable = false;
    @Output() onRowSelected = new EventEmitter<Company>();

    public colorList$: Observable<Color[]>;
    public colorsTotal$: Observable<number>;
    public isLoading$: Observable<boolean>;
    public error$: Observable<any>;

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    private filter: string;
    private initialPageSize = 25;
    private displayedColumns: string[] = ['name', 'value', 'action'];

    constructor(
        private formBuilder: FormBuilder,
        private colorService: ColorService,
        public dialog: MatDialog
    ) {
    }

    ngOnInit() {
        this.isLoading$ = this.colorService.getIsLoading$();
        this.colorList$ = this.colorService.getColorsList$();
        this.colorsTotal$ = this.colorService.getColorsTotal$();
        this.error$ = this.colorService.getError$();

        this.loadColors();
    }


    loadColors() {
        this.colorService.loadColors({
            sort: this.sort.active,
            order: this.sort.direction,
            page: this.paginator.pageIndex,
            limit: this.paginator.pageSize || this.initialPageSize,
            filter: this.filter
        });
    }

    ngAfterViewInit() {
        // If the user changes the sort order, reset back to the first page.
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        merge(this.sort.sortChange, this.paginator.page).subscribe(() => {
            this.loadColors();
        });
    }

    search(filter: string) {
        this.filter = filter;
        this.loadColors();
    }

}
