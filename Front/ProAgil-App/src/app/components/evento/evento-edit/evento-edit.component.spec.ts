import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input} from '@angular/core';
import { EventoEditComponent } from './evento-edit.component';
import { EventoService } from 'src/app/services/Evento.service';
import { of } from 'rxjs';
import { Evento } from '@app/models/Evento';
import { LoteService } from '@app/services/lote.service';
import { FormBuilder } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { MaskDirective, MaskService } from 'ngx-mask';


@Component({
    selector: 'app-titulo',
    template: ''
})
export class TituloComponentMock {
    @Input() titulo: string = 'Editar Evento';
    @Input() iconClass: string = 'fa fa-user';
    @Input() subtitulo: string = ' Desde 2021';
}

class EventoServiceMock {

  constructor() { }

  public get() {return of();}

  public getAllEvento(): any { }

  public getEventoByTema(tema : string): any { }

  public getEventoById(id : number): any { }

  public postEvento(evento: Evento): any { }

  public postUpload(eventoId: number, file: any): any { }

  public putEvento(evento: Evento): any { }

  public deleteEvento(id: number): any { }
}

class LoteServiceMock{}
class FormBuilderMock{}
class BsLocaleServiceMock{
  public use(locale : string) {}
}
class NgxSpinnerServiceMock{}
class ToastrServiceMock{}
class ActivatedRouteMock{}


describe('EventoEditComponent', () => {
  let component: EventoEditComponent;
  let fixture: ComponentFixture<EventoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        EventoEditComponent,
        TituloComponentMock,
        MaskDirective
      ],
      // imports: [
      //   NgxMask.forRoot(),
      // ],
      providers: [
        {
            provide : EventoService,
            useClass: EventoServiceMock
        },
        {
          provide : LoteService,
          useClass: LoteServiceMock
        },
        {
          provide : FormBuilder,
          useClass: FormBuilderMock
        },
        {
          provide : BsLocaleService,
          useClass: BsLocaleServiceMock
        },
        {
          provide : ToastrService,
          useClass: ToastrServiceMock
        },
        NgxSpinnerService,
        {
          provide : ActivatedRoute,
          useClass: ActivatedRouteMock
        },
        ActivatedRoute,
        MaskService
      ]
    }).compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(EventoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
