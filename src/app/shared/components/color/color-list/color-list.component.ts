import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {merge, Observable} from 'rxjs';
import {Color} from '@app/store/models/color.model';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ColorService} from '@app/store/features/color/color.service';
import {Router} from '@angular/router';
import {DeleteConfirmDialogComponent} from '@app/shared/components/delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
  selector: 'app-color-list',
  templateUrl: './color-list.component.html',
  styleUrls: ['./color-list.component.css']
})
export class ColorListComponent implements OnInit , AfterViewInit {
  public colorList$: Observable<Color[]>;
  public colorsTotal$: Observable<number>;
  public isLoading$: Observable<boolean>;
  public error$: Observable<any>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[] = ['name', 'value', 'action'];
  searchForm: FormGroup;

  constructor(
      private formBuilder: FormBuilder,
      private colorService: ColorService,
      public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      filter: ['', Validators.maxLength(20)]
    });

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
      filter: this.searchForm.value.filter
    });
  }

  ngAfterViewInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page).subscribe(() => {
      this.loadColors();
    });
  }

  deleteColor(color: Color): void {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.colorService.deleteColor(color);
      }
    });
  }

}
