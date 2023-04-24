import { Pipe, PipeTransform, inject } from '@angular/core';
import { ParametersService } from '../services/authentication/parameters-service/parameters.service';
import { Param } from '../models/params';

@Pipe({
  name: 'municipios',
})
export class MunicipiosPipe implements PipeTransform {
  paramService = inject(ParametersService);
  municipios!: Param[];

  municipios$ = this.paramService.listBoxParams$.subscribe((data) => {
    this.municipios = data[1];
  });

  transform(municipioId: number): string {
    const municipio: Param = this.municipios.find((m) => m.id === municipioId)!;

    return municipio.description;
  }
}
