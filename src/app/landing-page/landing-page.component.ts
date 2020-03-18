import { Component, OnInit, HostListener } from '@angular/core';
import { MailService } from '../services/mail.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(private userService: MailService) { }

  ngOnInit() {
  }

  /**
   * Scroll to the bottom
   */
  onClickBtnBonus(){
    let self = this;
    const rect = document.getElementById("secondElement").getBoundingClientRect();
    let height = window.scrollY;
    let scrollInt = setInterval(function scrollToBottom() {
      let self = this;
      if(height >= document.body.scrollHeight*(80/100)){
        clearInterval(scrollInt);
      }else{
        height += 20;
        window.scrollTo(0,height);
      }
    }, 10);
  }

  profile = {};

  /* loadUser() {
    this.userService.getUsers().subscribe(data => this.profile = data);
  } */
}
