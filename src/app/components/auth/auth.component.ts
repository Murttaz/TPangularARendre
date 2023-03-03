import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Authservice } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent  {
  namePerso!: string;
  password!: string;



  constructor( private router : Router, private authservice : Authservice){}


    async authentification(form: NgForm){
      if(form.valid ){
        const isUserValid =await this.authservice.isUserValid(this.namePerso,this.password);
        if(isUserValid){
          this.router.navigateByUrl('/home');
        }else {
        // Handle invalid authentication
          alert('Invalid username or password');
          this.namePerso = '';
          this.password = '';
          form.resetForm();
        }
      }
 
  }
}
