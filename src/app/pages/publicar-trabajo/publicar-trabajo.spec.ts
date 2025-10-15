import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicarTrabajo } from './publicar-trabajo';

describe('PublicarTrabajo', () => {
  let component: PublicarTrabajo;
  let fixture: ComponentFixture<PublicarTrabajo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicarTrabajo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicarTrabajo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
