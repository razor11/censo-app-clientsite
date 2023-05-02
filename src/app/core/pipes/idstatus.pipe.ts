import { Pipe, PipeTransform, inject } from '@angular/core';
import { ParametersService } from '../services/parameters-service/parameters.service';
import { Param } from '../models/params';

@Pipe({
  name: 'IDstatus',
})
export class IDstatusPipe implements PipeTransform {
  paramService = inject(ParametersService);
  status!: Param[];

  statuses$ = this.paramService.listBoxParams$.subscribe((data) => {
    this.status = data.idStatus;
  });

  transform(statusId: number): string {
    const status: Param = this.status.find((m) => m.id === statusId)!;
    return status.description;
  }
}
