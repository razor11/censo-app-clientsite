import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenderPipe } from 'src/app/core/pipes/gender.pipe';
import { AvatarPipe } from 'src/app/core/pipes/avatar.pipe';
import { MunicipiosPipe } from 'src/app/core/pipes/municipios.pipe';
import { IDstatusPipe } from 'src/app/core/pipes/idstatus.pipe';



@NgModule({
  declarations: [GenderPipe, AvatarPipe, MunicipiosPipe, IDstatusPipe],
  imports: [
    CommonModule
  ],
  exports: [
    GenderPipe,
    AvatarPipe,
    MunicipiosPipe,
    IDstatusPipe
  ]
})
export class CustomPipesModule { }
