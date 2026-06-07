import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrocarASenhaComponent } from './trocar-a-senha.component';

describe('TrocarASenhaComponent', () => {
  let component: TrocarASenhaComponent;
  let fixture: ComponentFixture<TrocarASenhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrocarASenhaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrocarASenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
