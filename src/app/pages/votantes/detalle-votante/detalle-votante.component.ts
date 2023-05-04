import { concatMap } from 'rxjs';
import { VotantesService } from '../services/votantes.service';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {  Votante, Votantes } from 'src/app/core/models/votantes';

@Component({
  selector: 'app-detalle-votante',
  templateUrl: './detalle-votante.component.html',
  styleUrls: ['./detalle-votante.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class DetalleVotanteComponent implements OnInit {
  votante!: Votante;


  constructor(
    private route: ActivatedRoute,
    private votantesService: VotantesService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        concatMap((params) => this.votantesService.getVotante(params['id']))
      )
      .subscribe({
        next: (data) => { this.votante = data,
          console.log(data);
        }
          ,
        error: (e) =>  {throw new Error(e)}

      });
  }

}
