import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarChamadosComponent } from './adicionar-chamados.component';

describe('AdicionarChamadosComponent', () => {
  let component: AdicionarChamadosComponent;
  let fixture: ComponentFixture<AdicionarChamadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdicionarChamadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdicionarChamadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
