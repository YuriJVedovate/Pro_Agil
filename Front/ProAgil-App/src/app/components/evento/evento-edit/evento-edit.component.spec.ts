import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { EventoEditComponent } from './evento-edit.component';
import { EventoService } from 'src/app/services/Evento.service';
import { Observable, of } from 'rxjs';
import { Evento } from '@app/models/Evento';
import { LoteService } from '@app/services/lote.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { MaskDirective, MaskService, NgxMaskModule } from 'ngx-mask';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { TabsetComponent } from 'ngx-bootstrap/tabs';

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

class LoteServiceMock {}
class FormBuilderMock {
  public array() {}
  public group() {}
}
class BsLocaleServiceMock {
  public use(locale: string) {}
}
class NgxSpinnerServiceMock {}
class ToastrServiceMock {}
class ActivatedRouteMock {
  queryParams = of({
    act: 'd518581f-853e-4114-91db-66324defae4f',
  });
}

describe('EventoEditComponent', () => {
  let component: EventoEditComponent;
  let fixture: ComponentFixture<EventoEditComponent>;
  var activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventoEditComponent, TituloComponentMock, MaskDirective, TabsetComponent],
      imports: [NgxMaskModule.forRoot(), ModalModule.forRoot(), FormsModule, ReactiveFormsModule],
      providers: [
        MaskService,
        NgxSpinnerService,
        BsModalRef,
        {
          provide: EventoService,
          useClass: EventoServiceMock,
        },
        {
          provide: LoteService,
          useClass: LoteServiceMock,
        },
        {
          provide: FormBuilder,
          useClass: FormBuilderMock,
        },
        {
          provide: BsLocaleService,
          useClass: BsLocaleServiceMock,
        },
        {
          provide: ToastrService,
          useClass: ToastrServiceMock,
        },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: convertToParamMap({ id: '1' })}},
          useClass: ActivatedRouteMock,
        }
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    activatedRoute = Object.assign(new ActivatedRoute());
    component.ngOnInit();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
