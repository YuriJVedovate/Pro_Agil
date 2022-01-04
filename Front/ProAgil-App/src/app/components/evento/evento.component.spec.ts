import {ComponentFixture, TestBed } from '@angular/core/testing';
import { EventoComponent } from './evento.component';
import { TituloComponent } from './../../_shared/titulo/titulo.component';

describe('EventoComponent', () => {
  let component: EventoComponent;
  let fixture: ComponentFixture<EventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventoComponent, , TituloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
