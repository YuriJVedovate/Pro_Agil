import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ToastrService } from 'ngx-toastr';
import { Evento } from 'src/app/models/Evento';
import { EventoService } from 'src/app/services/Evento.service';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoteService } from '@app/services/lote.service';

defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-evento-edit',
  templateUrl: './evento-edit.component.html',
  styleUrls: ['./evento-edit.component.css'],
})
export class EventoEditComponent implements OnInit {
  titulo = 'Editar Evento';
  registerForm: FormGroup = new FormGroup({});
  evento: Evento = new Evento();
  file: File;
  imagemURL = '@app/assets/img/upload.png';
  fileNameToUpdate: string;
  dataAtual: string;
  idEvento : number;
  idLoteAtual: number;
  indiceLoteAtual: number;

  get lotes(): FormArray {
    return <FormArray>this.registerForm.get('lotes');
  }

  get redesSociais(): FormArray {
    return <FormArray>this.registerForm.get('redesSociais');
  }

  get f(): any {
    return this.registerForm.controls;
  }

  constructor(
    private eventoService: EventoService,
    private loteService : LoteService,
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private toastr: ToastrService,
    private router: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {
    this.localeService.use('pt-br');
  }

  ngOnInit(): void {
    this.validation();
    this.carregarEvento();
  }

  carregarEvento() {
    this.idEvento = +this.router.snapshot.paramMap.get('id');
    this.spinner.show();
    this.eventoService.getEventoById(this.idEvento).subscribe((evento: Evento) => {
      this.evento = Object.assign({}, evento);
      this.fileNameToUpdate = evento.imagemURL.toString();
      this.imagemURL = `http://localhost:5000/resources/images/${this.evento.imagemURL}`;
      this.evento.imagemURL = '';
      this.registerForm.patchValue(this.evento);

      this.evento.lotes.forEach((lote) => {
        this.lotes.push(this.criarLote(lote));
      });
      this.evento.redesSociais.forEach((redeSociail) => {
        this.redesSociais.push(this.criaRedesSociais(redeSociail));
      });
    });
    this.spinner.hide();
  }
 
  salvarEvento() {
    this.evento = Object.assign(
      { id: this.evento.id },
      this.registerForm.value
    );
    this.uploadImagem();

    this.eventoService.putEvento(this.evento).subscribe(
      () => {
        this.toastr.success('Evento alterado com sucesso', 'Alterado');
      },
      (error) => {
        this.toastr.error(`Falha em alterar evento: ${error.message}`);
      }
    );
  }

  validation() {
    this.registerForm = this.fb.group({
      id: [],
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
      imagemURL: [''],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      lotes: this.fb.array([]),
      redesSociais: this.fb.array([]),
    });
  }

  criarLote(lote: any): FormGroup {
    return this.fb.group({
      id: [lote.id],
      nome: [lote.nome, Validators.required],
      quantidade: [lote.quantidade, Validators.required],
      preco: [lote.preco, Validators.required],
      dataInicio: [lote.dataInicio],
      dataFim: [lote.dataFim],
    });
  }

  adicionarLote() {
    this.lotes.push(this.criarLote({ id: 0 }));
  }

  removerLote(id: number, template: any) {

    const loteId = this.lotes.get(id + '.id').value;
    this.idLoteAtual = loteId;
    this.indiceLoteAtual = id;
    template.show();
  }

  confirmeDelete(template: any){
    this.lotes.removeAt(this.idLoteAtual);

    this.loteService.deleteLote(this.evento.id, this.idLoteAtual).subscribe(
      () =>{
        this.toastr.success('Lote deletado com sucesso', 'Sucesso');
        this.lotes.removeAt(this.indiceLoteAtual);
        template.hide();
      },
      (error: any) => {
        this.toastr.error('Falha ao tentar deletar lote!', 'Erro');
        console.log(error);
      }
    );
  }

  criaRedesSociais(redeSocial: any): FormGroup {
    return this.fb.group({
      id: [redeSocial.id],
      nome: [redeSocial.nome, Validators.required],
      url: [redeSocial.url, Validators.required],
    });
  }

  adicionarRedesSociais() {
    this.redesSociais.push(this.criaRedesSociais({ id: 0 }));
  }

  removerRedesSociais(id: number) {
    this.redesSociais.removeAt(id);
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      reader.onload = (event: any) => (this.imagemURL = event.target.result);
      this.file = event.target.files;
      reader.readAsDataURL(event.target.files[0]);

      this.uploadImagem();
    }
  }

  uploadImagem() {
    if (
      this.registerForm.get('imagemURL').value != '' ||
      this.registerForm.get('imagemURL').value != '' ||
      this.registerForm.get('imagemURL').value != null
    ) {
      const nomeArquivo = this.evento.imagemURL.split('\\', 3);
      this.evento.imagemURL = nomeArquivo[2];
      this.eventoService
        .postUpload(this.idEvento ,this.file)
        .subscribe(() => {
          this.carregarEvento();
        });
    }
  }
}
