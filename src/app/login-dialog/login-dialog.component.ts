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
   isHidden: boolean = true;
  isLogin = true;
  sign() {
    this.isLogin = false;
  }
  log() {
    this.isLogin = true;
  }
  formErrors = {
    'username' : '',
    'password' : ''
  } 
  formErrors1 = {
    'username' : '',    
    'mailid' : '',
    'password' : ''
  }
  validationMsgs1 = {
    'username' : {
      'required' : 'Please enter your username'
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
    'username' : {
      'required' : 'Username is required'
    },
    'password' : {
      'required' : "Password is required"
    }
  }
  createForm() {
    this.login = this.fb.group({
      username : ['', [Validators.required]],
      password : ['', [Validators.required]]
    });
    this.login.valueChanges.subscribe(data => this.onValueChanged(data));

    this.signup = this.fb.group({
      username : ['', [Validators.required]],
      
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
    this.isHidden = false;
    console.log(this.signup.value);
    
    this.AuthService.register(this.signup.value)
    .subscribe(user =>{
      this.isHidden = true
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
    this.isHidden = false;
    // console.log('sent request to the server..', this.login.value)
    this.AuthService.login(this.login.value)
    .subscribe(user => {
      // console.log('got user from the server..', user);
      localStorage.setItem('JWT_TOKEN', user.token)
      localStorage.setItem('expiresIn', user.expiresIn);
      setTimeout(() => {        
        this.isHidden = true;
        this.dialogRef.close(true);
        this.snackbar.open("Logged in Successfully", 'close', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        })
      }, 2500);
      
    }, err => {
      console.log('got error from the server', err);
          
      this.dialogRef.close();
      this.snackbar.open(err.error.errorMessage, 'close', {
        duration: 2000,
        horizontalPosition: 'center', 
        verticalPosition: 'top'
      });
    })
  } 

  
}
