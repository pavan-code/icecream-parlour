import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { feedback } from '../shared/feedback';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  feedbackCopy: feedback;
  display: boolean;

  constructor(private fb: FormBuilder,
    private feedbackService: FeedbackService) { }

  formErrors = {
    'firstName' : '',
    'lastName': '',
    'telNum': '',
    'email': '',
    'feedback': ''
  }

  validationMessages = {
    'firstName' :{
      'required': 'First name is required.',
      'minlength': 'First name must be atleast 2 characters long.',
      'maxlength': 'First name cannot be more than 20 characters.'
    }, 
    'lastName' : {
      'required': 'Last name is required.',
      'minlength': 'Last name must be atleast 2 characters long.',
      'maxlength': 'Last name cannot be more than 20 characters.'
    },
    'telNum': {
      'required': 'Telephone number is required',
      'pattern': 'Telephone number must contain only numbers'
    },
    'email': {
      'required': 'Email id is required',
      'email': 'Invalid email id'
    },
    'feedback' : {
      'required' : 'Feedback is required',
    }
  }
  ngOnInit(): void {
    this.createForm();
  }
  feedbackForm : FormGroup
  feedback: feedback;
  createForm() {
    this.feedbackForm = this.fb.group({
      firstName: ['', [Validators.required,Validators.minLength(2), Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      telNum: ['', [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      feedback: ['', [Validators.required]]
    })
    this.feedbackForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }
  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }   
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previuos error messages if any
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key];
            }
          }
        }
      }
    }
  }

  submit() {
    this.display = true;
    this.feedback = this.feedbackForm.value;
    this.feedbackService.submitFeedback(this.feedback)
    .subscribe(feedback => {
      this.feedbackCopy = feedback;
    })
    setTimeout(() => {
      this.feedbackCopy=null;
      this.display = false;
    }, 5000);
    this.feedbackForm.reset({
      firstName: '',
      lastName: '',
      telNum:'',
      email:'',
      feedback:''
    })
  }

}
