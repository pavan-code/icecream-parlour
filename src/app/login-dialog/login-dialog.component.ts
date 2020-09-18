import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css'],
})
export class LoginDialogComponent implements OnInit {
  constructor(private fb: FormBuilder, private AuthService: AuthService,
    private dialogRef: MatDialogRef<LoginDialogComponent>,
    private snackbar: MatSnackBar) {}

  ngOnInit(): void {
    this.createForm();
  }
  login: FormGroup;
  signup: FormGroup;
   
  isLogin = true;
  sign() {
    this.isLogin = false;
  }
  log() {
    this.isLogin = true;
  }
  formErrors = {
    'mailid' : '',
    'password' : ''
  } 
  formErrors1 = {
    'firstname' : '',
    'lastname' : '',
    'mailid' : '',
    'password' : ''
  }
  validationMsgs1 = {
    'firstname' : {
      'required' : 'Please enter your firstname'
    },
    'lastname' : {
      'required' : 'Please enter your lastname'
    },
    'mailid' : {
      'required' : 'Please enter your mail id',
      'email' : 'Please provide a valid mail'
    },
    'password' : {
      'required' : 'Please enter your password',
      'minlength' : 'Password should be atleast 8 chars long'
    }
  }
  validationMsgs = {
    'mailid' : {
      'required' : 'Mail ID is required'
    },
    'password' : {
      'required' : "Password is required"
    }
  }
  createForm() {
    this.login = this.fb.group({
      mailid : ['', [Validators.required]],
      password : ['', [Validators.required]]
    });
    this.login.valueChanges.subscribe(data => this.onValueChanged(data));

    this.signup = this.fb.group({
      firstname : ['', [Validators.required]],
      lastname : ['', [Validators.required]],
      mailid : ['', [Validators.required, Validators.email]], 
      password : ['', [Validators.required, Validators.minLength(8)]]
    })
    this.signup.valueChanges.subscribe(data => this.onValueChanged1(data));
  }
  onValueChanged(data? : any) {
    if (!this.login) { return; }   
    const form = this.login;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previuos error messages if any
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMsgs[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key];
            }
          }
        }
      }
    }
  }
  onValueChanged1(data? : any) {
    if (!this.signup) { return; }   
    const form = this.signup;
    for (const field in this.formErrors1) {
      if (this.formErrors1.hasOwnProperty(field)) {
        // clear previuos error messages if any
        this.formErrors1[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMsgs1[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors1[field] += messages[key];
            }
          }
        }
      }
    }
  }

  register() {
    console.log(this.signup.value);
    
    this.AuthService.register(this.signup.value)
    .subscribe(user =>{
      console.log(user);   
         this.dialogRef.close();
         this.snackbar.open("Signed up Successfully", 'close', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        })
    }, err => {
      console.log(err);
      
    }
    
    )
  }
  logIn() {
    this.AuthService.login(this.login.value)
    .subscribe(user => {
      console.log(user);
      this.dialogRef.close();
      this.snackbar.open("Logged in Successfully", 'close', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      })
    }, err => {
      console.log(err)
      this.dialogRef.close();
      this.snackbar.open(err.error.errorMessage, 'close', {
        duration: 2000,
        horizontalPosition: 'center', 
        verticalPosition: 'top'
      });
    })
  } 

  
}
