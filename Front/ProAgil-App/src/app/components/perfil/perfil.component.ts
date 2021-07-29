import { Component, OnInit } from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ValidatorField } from '@app/helps/ValidatorField';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  public titulo: string = 'Perfil';
  public iconClass: string = 'fa fa-user';
  public subtitulo: string = ' ';

  registerForm: FormGroup;
  
  get f(): any {
    return this.registerForm.controls;
  }

  constructor(public fb: FormBuilder) {}

  ngOnInit(): void {
    this.validation();
  }

  validation() {
    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMach('password', 'confirmPassword'),
    };

    this.registerForm = this.fb.group(
      {
        titulo: ['', Validators.required],
        primeiroNome: ['', [Validators.required, Validators.minLength(4)]],
        ultimoNome: ['', [Validators.required, Validators.minLength(4)]],
        email: ['', [Validators.required, Validators.email]],
        telefone: ['', Validators.required],
        funcao: ['', Validators.required],
        descricao: ['', [Validators.required, Validators.minLength(4)]],
        password: ['', [Validators.required, Validators.minLength(4)]],
        confirmPassword: ['', Validators.required],
      },
      formOptions
    );
  }
}
