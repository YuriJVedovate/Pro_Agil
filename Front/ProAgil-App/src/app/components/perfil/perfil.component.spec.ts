import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { PerfilComponent } from './perfil.component';

@Component({
  selector: 'app-titulo',
  template: '',
})
export class TituloComponentMock {
  @Input() titulo: string = 'Editar Evento';
  @Input() iconClass: string = 'fa fa-user';
  @Input() subtitulo: string = ' Desde 2021';
}

describe('PerfilComponent', () => {
  let component: PerfilComponent;
  let fixture: ComponentFixture<PerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilComponent, TituloComponentMock ],
      providers: [
        FormBuilder
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
