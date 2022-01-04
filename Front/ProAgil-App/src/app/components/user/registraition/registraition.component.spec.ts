import {  ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistraitionComponent } from './registraition.component';
import { FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '@app/services/auth.service';

class ToastrServiceMock {}
class AuthServiceMock {}

describe('RegistraitionComponent', () => {
  let component: RegistraitionComponent;
  let fixture: ComponentFixture<RegistraitionComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ RegistraitionComponent],
      providers: [
        FormBuilder,
        { provide: AuthService,useClass: AuthServiceMock},
        { provide: ToastrService, useClass: ToastrServiceMock},
      ],
      imports: [FormsModule, FormsModule, ReactiveFormsModule, RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistraitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
