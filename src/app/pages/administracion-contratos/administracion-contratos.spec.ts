import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministracionContratos } from './administracion-contratos';

describe('AdministracionContratos', () => {
  let component: AdministracionContratos;
  let fixture: ComponentFixture<AdministracionContratos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministracionContratos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministracionContratos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
