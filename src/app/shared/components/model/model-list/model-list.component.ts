import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {Model} from '@app/store/models/model.model';
import { merge, Observable} from 'rxjs';
import {MatDialog, MatPaginator, MatSnackBar, MatSort} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModelService} from '@app/store/features/model/model.service';
import {DeleteConfirmDialogComponent} from '@app/shared/utils/delete-confirm-dialog/delete-confirm-dialog.component';
import {Brand} from '@app/store/models/brand.model';
import {ModelFormComponent} from '@app/shared/components/model/model-form/model-form.component';
import {SnackBarComponent} from '@app/shared/utils/snack-bar/snack-bar.component';

@Component({
    selector: 'app-model-list',
    templateUrl: './model-list.component.html',
    styleUrls: ['./model-list.component.css']
})
export class ModelListComponent implements OnInit, AfterViewInit {
    @Input() brand: Observable<Brand>;
    private currentBrand = null;
    public modelList$: Observable<Model[]>;
    public modelsTotal$: Observable<number>;
    public isLoading$: Observable<boolean>;
    public error$: Observable<any>;

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    displayedColumns: string[] = ['name', 'action'];
    searchForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private modelService: ModelService,
        public dialog: MatDialog,
        private snackBar: MatSnackBar
    ) {
    }

    ngOnInit() {
        this.searchForm = this.formBuilder.group({
            filter: ['', Validators.maxLength(20)]
        });

        this.isLoading$ = this.modelService.getIsLoading$();
        this.modelList$ = this.modelService.getModelsList$();
        this.modelsTotal$ = this.modelService.getModelsTotal$();
        this.error$ = this.modelService.getError$();

        this.brand.subscribe(brand => {
            this.currentBrand = brand;
            this.loadModels();
        });
        this.loadModels();
    }

    ngAfterViewInit() {
        // If the model changes the sort order, reset back to the first page.
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        merge(this.sort.sortChange, this.paginator.page).subscribe(() => {
            this.loadModels();
        });
    }

    loadModels() {
        if (this.currentBrand) {
            this.modelService.loadModels({
                sort: this.sort.active,
                order: this.sort.direction,
                page: this.paginator.pageIndex,
                filter: this.searchForm.value.filter
            });
        } else {
            this.modelService.clearStore();
        }
    }

    showDialog(model?: Model) {
        const dialogRef = this.dialog.open(ModelFormComponent, {
            minWidth: '340px',
            data: {
                title: model ? 'Model.Label.EditModel' : 'Model.Label.AddModel',
                brand: this.currentBrand,
                model
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log('The edit dialog was closed', result);
        });
    }

    // TODO - Test it
    deleteModel(model: Model): void {
        const dialogRef = this.dialog.open(DeleteConfirmDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                // this.modelService.deleteModel(model).subscribe((response) => {
                //     console.log(response);
                // }, error1 => {
                //     console.log(error1);
                // });
            }
        });
    }

}
