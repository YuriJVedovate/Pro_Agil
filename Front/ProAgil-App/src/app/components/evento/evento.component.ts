import { Evento } from './../../models/Evento';
import { EventoService } from './../../services/Evento.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css'],
})
export class EventoComponent implements OnInit {
  public titulo: string = 'Eventos';
  public iconClass: string = 'fa fa-calendar-alt';
  public subtitulo: string = 'Desde 2021';

  public eventosFiltrados: Evento[] = [];
  public eventos: Evento[] = [];
  public evento: Evento;
  public eventoId : number;

  public imagemLargura: number = 50;
  public imagemMargem: number = 2;
  public mostrarImagem: boolean = false;

  public registerForm: FormGroup = new FormGroup({});
  public modoSalvar: string = 'post';
  public bodyDeletarEvento: string = '';
  public file: File;
  public fileNameToUpdate: string;
  public dataAtual: string;

  public _filtroLista: string = '';

  get f(): any {
    return this.registerForm.controls;
  }

  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    this.localeService.use('pt-br');
  }

  public ngOnInit() {
    this.validation();
    this.getEventos();
    this.spinner.show();
  }

  get filtroLista(): string {
    return this._filtroLista;
  }
  set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista
      ? this.filtrarEvento(this.filtroLista)
      : this.eventos;
  }

  public filtrarEvento(filtrarPor: string): Evento[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      (evento: any) =>
        evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  public editarEvento(evento: Evento, template: any) {
    this.modoSalvar = 'put';
    this.openModal(template);
    this.evento = Object.assign({}, evento);
    this.fileNameToUpdate = evento.imagemURL.toString();
    this.evento.imagemURL = '';
    this.registerForm.patchValue(this.evento);
  }

  public novoEvento(template: any) {
    this.modoSalvar = 'post';
    this.openModal(template);
  }

  public openModal(template: any) {
    this.registerForm.reset();
    template.show();
  }

  public alternarImagem(): void {
    this.mostrarImagem = !this.mostrarImagem;
  }

  public validation(): void {
    this.registerForm = this.fb.group({
      tema: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50),
        ],
      ],
      local: ['', Validators.required],
      dataEvento: ['', Validators.required],
      quantidadePessoas: ['', [Validators.required, Validators.max(10000)]],
      imagemURL: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  public onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      this.file = event.target.files;
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  public uploadImagem() {
    if (this.modoSalvar === 'post') {
      this.eventoService.postUpload(this.eventoId, this.file).subscribe(() => {
        this.getEventos();
      });
    } else {
      this.eventoService.postUpload(this.evento.id, this.file).subscribe(() => {
        this.getEventos();
      });
    }
  }

  public salvarAlteracao(template: any) {
    if (this.registerForm.valid) {
      if (this.modoSalvar === 'post') {
        this.evento = Object.assign({}, this.registerForm.value);
        this.eventoService.postEvento(this.evento).subscribe(
          (evento: Evento) => {
            this.spinner.show();
            this.eventoId = evento.id;
            this.uploadImagem();
            this.toastr.success('Evento adicionado com sucesso', 'Adicionado');
            this.getEventos();
            template.hide();
            this.spinner.hide();
          },
          (error) => {
            this.toastr.error('Falha em adicionar evento ', 'Falha');
          }
        );
      } else if (this.modoSalvar == 'put') {
        this.evento = Object.assign(
          { id: this.evento.id },
          this.registerForm.value
        );

        this.uploadImagem();

        this.eventoService.putEvento(this.evento).subscribe(
          () => {
            template.hide();
            this.getEventos();
            this.toastr.success('Evento alterado com sucesso', 'Alterado');
          },
          (error) => {
            this.toastr.error('Falha em alterar evento ', 'Falha');
          }
        );
      }
    }
  }

  public excluirEvento(evento: Evento, template: any) {
    template.show();
    this.evento = evento;
    this.bodyDeletarEvento = `Tem certeza que deseja excluir o ${evento.tema} Evento: ${evento.tema}, Código: ${evento.id}`;
  }

  public confirmeDelete(template: any) {
    this.eventoService.deleteEvento(this.evento.id).subscribe(
      (result: any) => {
        template.hide();
        this.toastr.success('Evento deletado com sucesso', 'Deletado');
        this.getEventos();
      },
      (error) => {
        console.error(error);
        this.toastr.error('Erro ao tentar deletar', 'Deletado');
      }
    );
  }

  public getEventos() {
    this.dataAtual = new Date().getMilliseconds().toString();
    this.eventoService.getAllEvento().subscribe(
      (_eventos: Evento[]) => {
        this.eventos = _eventos;
        this.eventosFiltrados = this.eventos;
        this.spinner.hide();
      },
      (error) => {
        console.error(error);
        this.toastr.error('Falha em carregar eventos ', 'Falha');
        this.spinner.hide();
      }
    );
  }
}
