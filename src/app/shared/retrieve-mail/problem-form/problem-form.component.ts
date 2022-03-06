import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { opacityAnimation } from '../../animations/opacity.animation';
import { MailService } from '../../services/mail.service';

@Component({
  selector: 'app-problem-form',
  templateUrl: './problem-form.component.html',
  styleUrls: ['./problem-form.component.scss'],
  animations: [
    opacityAnimation,
    opacityAnimation
  ]
})
export class ProblemFormComponent implements OnInit {

  isLoading: boolean = false;
  isProblemStored: boolean = false;
  isMailStored: boolean = false;
  storeProblemSubject: Subject<void> = new Subject<void>();

  @Output() problemStored = new EventEmitter<string>();

  reactiveForm = new FormGroup({
    message: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  get message() { return this.reactiveForm.get('message'); }

  problemSubscription: Subscription;

  constructor(
    public mailService: MailService
    ) { }

  ngOnInit(): void {
    this.problemSubscription = this.storeProblemSubject.pipe(debounceTime(800)).subscribe(data => {
      this.storeContactProblem();
    });
  }

  onSubmit() {
    if (!this.reactiveForm.valid) {
      return;
    }
    this.isLoading = true;
    this.storeProblemSubject.next();
  }

  storeContactProblem() {
    const values = this.reactiveForm.value;
    this.mailService.storeContactProblem(values.message).subscribe(data=> {
      this.isProblemStored = true;
      this.isLoading = false;
      this.reactiveForm.reset();
      this.mailService.$isProblemSotred.next(true);
      this.problemStored.next(values.message);
    });
  }

  ngDestroy() {
    this.problemSubscription?.unsubscribe();
  }

}
