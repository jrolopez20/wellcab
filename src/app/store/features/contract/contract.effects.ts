import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as ContractActions from './contract.actions';
import {catchError, concatMap, map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';

@Injectable()
export class ContractEffects {

    constructor(private actions$: Actions, private http: HttpClient) {
    }

    public loadContracts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ContractActions.loadContractsRequest),
            concatMap(({licenseId, sort, order, page, limit, filter}) => {
                return this.http.get<any>(`licenses/${licenseId}/contracts?search=${filter}&sort=${sort}&order=${order}&page=${page}&limit=${limit}`).pipe(
                    map(response =>
                        ContractActions.loadContractsCompleted({contracts: response.data, total: response.pagination.total})
                    ),
                    catchError(error => of(ContractActions.contractsError({error})))
                );
            })
        )
    );

    public addContract$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ContractActions.addContractRequest),
            concatMap(({licenseId, contract}) => {
                return this.http.post<any>(`licenses/${licenseId}/contracts`, {
                    city: contract.city,
                    company: contract.company.id
                }).pipe(
                    map(response =>
                        ContractActions.addContractCompleted({contract: {...response}})
                    ),
                    catchError(error => of(ContractActions.contractsError({error})))
                );
            })
        )
    );

    public setContract$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ContractActions.setContractRequest),
            concatMap(({licenseId, contract}) => {
                return this.http.put<any>(`licenses/${licenseId}/contracts`, {
                    city: contract.city,
                    company: contract.company.id
                }).pipe(
                    map(response =>
                        ContractActions.setContractCompleted({contract: {...response}})
                    ),
                    catchError(error => of(ContractActions.contractsError({error})))
                );
            })
        )
    );

    public closeContract$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ContractActions.closeContractRequest),
            concatMap(({licenseId}) => {
                return this.http.patch<any>(`licenses/${licenseId}/contracts`, {
                    status: 'finished'
                }).pipe(
                    map(response =>
                        ContractActions.closeContractCompleted({contract: {...response}})
                    ),
                    catchError(error => of(ContractActions.contractsError({error})))
                );
            })
        )
    );

}
