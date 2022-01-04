/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '@app/services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

class ToastrServiceMock {}
class AuthServiceMock {}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        { 
          provide: AuthService,
          useClass: AuthServiceMock
        },
        {
          provide: ToastrService,
          useClass: ToastrServiceMock
        },
      ],
      imports: [
        RouterTestingModule,
        FormsModule,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
