/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, Input } from '@angular/core';

import { PalestrantesComponent } from './palestrantes.component';

@Component({
  selector: 'app-titulo',
  template: '',
})
export class TituloComponentMock {
  @Input() titulo: string = 'Editar Evento';
  @Input() iconClass: string = 'fa fa-user';
  @Input() subtitulo: string = ' Desde 2021';
}

describe('PalestrantesComponent', () => {
  let component: PalestrantesComponent;
  let fixture: ComponentFixture<PalestrantesComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ PalestrantesComponent, TituloComponentMock ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PalestrantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
