import {AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Brand} from '@app/store/models/brand.model';
import {merge, Observable} from 'rxjs';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BrandService} from '@app/store/features/brand/brand.service';
import {DeleteConfirmDialogComponent} from '@app/shared/utils/delete-confirm-dialog/delete-confirm-dialog.component';
import {SelectionModel} from '@angular/cdk/collections';
import {BrandFormComponent} from '@app/shared/components/brand/brand-form/brand-form.component';

@Component({
    selector: 'app-brand-list',
    templateUrl: './brand-list.component.html',
    styleUrls: ['./brand-list.component.css']
})
export class BrandListComponent implements OnInit, AfterViewInit {
    @Output() onBrandSelectedChange = new EventEmitter<Brand>();
    public brandList$: Observable<Brand[]>;
    public brandsTotal$: Observable<number>;
    public isLoading$: Observable<boolean>;
    public error$: Observable<any>;

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    displayedColumns: string[] = ['select', 'name', 'action'];
    searchForm: FormGroup;

    private selection = new SelectionModel<Brand>(false, []);

    constructor(
        private formBuilder: FormBuilder,
        private brandService: BrandService,
        public dialog: MatDialog
    ) {
    }

    ngOnInit() {
        this.searchForm = this.formBuilder.group({
            filter: ['', Validators.maxLength(20)]
        });

        this.isLoading$ = this.brandService.getIsLoading$();
        this.brandList$ = this.brandService.getBrandsList$();
        this.brandsTotal$ = this.brandService.getBrandsTotal$();
        this.error$ = this.brandService.getError$();

        this.loadBrands();
        this.selection.changed.subscribe(value => {
            this.onBrandSelectedChange.emit(value.source.selected.shift());
        });
    }

    ngAfterViewInit() {
        // If the brand changes the sort order, reset back to the first page.
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        merge(this.sort.sortChange, this.paginator.page).subscribe(() => {
            this.loadBrands();
        });
    }

    loadBrands() {
        this.brandService.loadBrands({
            sort: this.sort.active,
            order: this.sort.direction,
            page: this.paginator.pageIndex,
            filter: this.searchForm.value.filter
        });
    }

    showDialog(brand?: Brand) {
        const dialogRef = this.dialog.open(BrandFormComponent, {
            minWidth: '340px',
            data: {
                title: brand ? 'Brand.Label.EditBrand' : 'Brand.Label.AddBrand',
                brand
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log('The edit dialog was closed', result);
        });
    }

    // TODO - Test it
    deleteBrand(brand: Brand): void {
        const dialogRef = this.dialog.open(DeleteConfirmDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                // this.brandService.deleteBrand(brand).subscribe((response) => {
                //     console.log(response);
                // }, error1 => {
                //     console.log(error1);
                // });
            }
        });
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: Brand): string {
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row`;
    }

}
