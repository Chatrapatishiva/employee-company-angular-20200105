import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppserviceService } from './../appservice.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  dashBoardUrl: string = "dashboard";

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private appService: AppserviceService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      type: ['admin', Validators.required],

    });
  }

  ngOnInit(): void {}
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.appService
      .login(this.f.username.value, this.f.password.value, this.f.type.value)
      .pipe(first())
      .subscribe(
        (data) => {

          if(data.code != 400) {

          this.router.navigate([this.dashBoardUrl]);
          } else {
            alert(data.message);
          }
          this.loading = false;

        },
        (error) => {
          console.log(error)
          this.loading = false;
        }
      );
  }
}
