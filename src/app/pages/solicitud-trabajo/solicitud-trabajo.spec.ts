import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudTrabajo } from './solicitud-trabajo';

describe('SolicitudTrabajo', () => {
  let component: SolicitudTrabajo;
  let fixture: ComponentFixture<SolicitudTrabajo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudTrabajo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudTrabajo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
