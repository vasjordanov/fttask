import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @Input() roles: string[];
  @Output() add: EventEmitter<User>;

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.add = new EventEmitter<User>();
  }

  ngOnInit(): void {
    this.form = this.generateFormGroup();
  }

  onSendInvitationButtonClicked(): void {
    if (this.form.valid) {
      let user = new User();
      user.email = this.form.get('email').value;
      user.role = this.form.get('role').value;

      this.add.next(user);

      this.form.reset();
    } else {
      this.form.markAllAsTouched();
    }
  }

  private generateFormGroup(): FormGroup {
    return this.formBuilder.group({
      email: this.formBuilder.control(null, [Validators.required, Validators.email]),
      role: this.formBuilder.control('NA PENKA ROLQTA', [Validators.required])
    });
  }

}
