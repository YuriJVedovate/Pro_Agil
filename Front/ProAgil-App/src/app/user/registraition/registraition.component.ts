import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/User';

@Component({
  selector: 'app-registraition',
  templateUrl: './registraition.component.html',
  styleUrls: ['./registraition.component.css'],
})
export class RegistraitionComponent implements OnInit {
  registerForm: FormGroup;
  user: User;

  constructor(
    public fb: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.validation();
  }

  compararSenha(fb: FormGroup) {
    const confirmSenhaCtrl = fb.get('confirmPassword');
    if (
      confirmSenhaCtrl.errors == null ||
      'mismatch' in confirmSenhaCtrl.errors
    ) {
      if (fb.get('password').value !== confirmSenhaCtrl.value) {
        confirmSenhaCtrl.setErrors({ mismatch: true });
      } else {
        confirmSenhaCtrl.setErrors(null);
      }
    }
  }

  cadastrarUsuario() {
    if (this.registerForm.valid) {
      this.user = Object.assign(
        {
          password: this.registerForm.get('passwords.password').value,
        },
        this.registerForm.value
      );
      this.authService.register(this.user).subscribe(
        () => {
          this.router.navigate(['/user/login']);
          this.toastr.success('Cadastro Realizado');
        },
        (error: { error: any }) => {
          const erro = error.error;
          erro.forEach((element: { code: any }) => {
            switch (element.code) {
              case 'DuplicateUserName':
                this.toastr.error('cadastro Duplicado!');
                break;
              default:
                this.toastr.error(`Erro no cadastro! CODE: ${element.code}`);
                break;
            }
          });
        }
      );
    }
  }

  validation() {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      userName: ['', Validators.required],
      passwords: this.fb.group(
        {
          password: ['', [Validators.required, Validators.minLength(4)]],
          confirmPassword: ['', Validators.required],
        },
        { validator: this.compararSenha }
      ),
    });
  }
}
