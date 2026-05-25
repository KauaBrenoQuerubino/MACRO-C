import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescricaoChamadoComponent } from './descricao-chamado.component';

describe('DescricaoChamadoComponent', () => {
  let component: DescricaoChamadoComponent;
  let fixture: ComponentFixture<DescricaoChamadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DescricaoChamadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescricaoChamadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
