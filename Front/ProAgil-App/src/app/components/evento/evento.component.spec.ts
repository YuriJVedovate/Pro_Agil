import {ComponentFixture, TestBed } from '@angular/core/testing';
import { EventoComponent } from './evento.component';
import { Component, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Evento } from '@app/models/Evento';
import { EventoService } from '@app/services/Evento.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormsModule } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-titulo',
  template: '',
})
export class TituloComponentMock {
  @Input() titulo: string = 'Editar Evento';
  @Input() iconClass: string = 'fa fa-user';
  @Input() subtitulo: string = ' Desde 2021';
}

class EventoServiceMock {
  constructor() {}

  public get() {
    return of();
  }

  public getAllEvento(): any {}

  public getEventoByTema(tema: string): any {}

  // public getEventoById(id: number): any {} 

  public getEventoById(id: number): Observable<Evento> {
    return of();
  }

  public postEvento(evento: Evento): any {}

  public postUpload(eventoId: number, file: any): any {}

  public putEvento(evento: Evento): any {}

  public deleteEvento(id: number): any {}
}
class BsModalServiceMock {}
class ToastrServiceMock {}

describe('EventoComponent', () => {
  let component: EventoComponent;
  let fixture: ComponentFixture<EventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventoComponent, TituloComponentMock ],
      providers: [
        FormBuilder,
        BsLocaleService,
        { provide: ToastrService, useClass: ToastrServiceMock},
        { provide: BsModalService, useClass: BsModalServiceMock},
        { provide: EventoService, useClass: EventoServiceMock}
      ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
