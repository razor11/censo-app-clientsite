import { AuthenticationService } from '../core/services/authentication/authentication.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ParametersService } from 'src/app/core/services/parameters-service/parameters.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;
  paramsService = inject(ParametersService);
  params$ = this.paramsService.listBoxParams$.subscribe();

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private authenticationService: AuthenticationService,
    private iconRegestry: MatIconRegistry,
    private sanatizer: DomSanitizer
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    iconRegestry.addSvgIconSet(
      sanatizer.bypassSecurityTrustResourceUrl('../../assets/avatars.svg')
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logout() {
    this.authenticationService.logout();
  }
}
