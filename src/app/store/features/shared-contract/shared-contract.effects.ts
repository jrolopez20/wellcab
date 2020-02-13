import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as SharedContractActions from './shared-contract.actions';
import {catchError, concatMap, map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';
import {SharedContract} from '@app/store/models/shared-contract.model';

@Injectable()
export class SharedContractEffects {

    constructor(private actions$: Actions, private http: HttpClient) {
    }

    public loadSharedContracts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SharedContractActions.loadSharedContractsRequest),
            concatMap(({licenseId, contractId, sort, order, page, limit, filter}) => {
                return this.http.get<any>(`licenses/${licenseId}/contracts/${contractId}/shared-contracts?search=${filter}&sort=${sort}&order=${order}&page=${page}&limit=${limit}`).pipe(
                    map(response =>
                        SharedContractActions.loadSharedContractsCompleted({
                            sharedContracts: response.data,
                            total: response.pagination.total
                        })
                    ),
                    catchError(error => of(SharedContractActions.sharedContractsError({error})))
                );
            })
        )
    );

    public addSharedContract$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SharedContractActions.addSharedContractRequest),
            concatMap(({licenseId, sharedContract}) => {
                return this.http.post<SharedContract>(`licenses/${licenseId}/shared-contract`, {
                    ownerUser: sharedContract.ownerUser.id
                }).pipe(
                    map(response =>
                        SharedContractActions.addSharedContractCompleted({sharedContract: {...response}})
                    ),
                    catchError(error => of(SharedContractActions.sharedContractsError({error})))
                );
            })
        )
    );

    public setSharedContract$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SharedContractActions.setSharedContractRequest),
            concatMap(({licenseId, sharedContract}) => {
                const {id, ...sharedContractCopy} = sharedContract;
                return this.http.put<SharedContract>(`licenses/${licenseId}/shared-contract`, {
                    ownerUser: sharedContract.ownerUser.id
                }).pipe(
                    map(response =>
                        SharedContractActions.setSharedContractCompleted({sharedContract: {...response}})
                    ),
                    catchError(error => of(SharedContractActions.sharedContractsError({error})))
                );
            })
        )
    );

    public closeSharedContract$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SharedContractActions.closeSharedContractRequest),
            concatMap(({licenseId}) => {
                return this.http.patch<SharedContract>(`licenses/${licenseId}/shared-contract`, {
                    status: 'finished'
                }).pipe(
                    map(response =>
                        SharedContractActions.closeSharedContractCompleted({sharedContract: {...response}})
                    ),
                    catchError(error => of(SharedContractActions.sharedContractsError({error})))
                );
            })
        )
    );

}
