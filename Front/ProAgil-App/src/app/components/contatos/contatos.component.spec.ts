/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, Input } from '@angular/core';

import { ContatosComponent } from './contatos.component';

@Component({
  selector: 'app-titulo',
  template: '',
})
export class TituloComponentMock {
  @Input() titulo: string = 'Editar Evento';
  @Input() iconClass: string = 'fa fa-user';
  @Input() subtitulo: string = ' Desde 2021';
}

describe('ContatosComponent', () => {
  let component: ContatosComponent;
  let fixture: ComponentFixture<ContatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContatosComponent, TituloComponentMock]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
