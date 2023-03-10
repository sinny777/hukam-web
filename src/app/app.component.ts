import { Router, ActivatedRoute } from '@angular/router';
import { Component, ViewChild, ElementRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { MyAuthService } from './services/auth.service';
import { environment } from '../environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  sub: any;
  currentUser: any;
  loginForm: FormGroup;
  post:any;
  CONFIG: any;
  showLogo: boolean = true;

  @ViewChild('closeBtn') closeBtn: ElementRef;

  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder){
        this.CONFIG = environment;
        // console.log("CONFIG: >>> ", this.CONFIG);
      this.loginForm = fb.group({
        'username' : [null, Validators.required],
        'password' : [null, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(20)])],
        'validate' : ''
      });
   }

   ngOnInit() {
      console.log("<<<<<< Inside Main App Component >>>> ")
      console.log("QUERY PARAMS: >>> ",this.route.snapshot.queryParamMap);
      // this.router.navigate([''])
      // this.myAuthService.getUserInfo(false).then( result => {
      //       this.currentUser = result;
      //       // console.log("In Init of AppComponent: >>>", this.myAuthService.authenticated);
      //       // console.log("In Init of AppComponent: >>>", this.currentUser);
      //  },
      //  error => {
      //     console.log("ERROR: >>> ", error);
      //  });
   }

   gotoRegister(){
     console.log("IN gotoRegister: >>> ");
   }

   signIn(provider){
     console.log("Handle SignIn for Provider: >>> ", provider);
   }

  handleLogin(post){
    // console.log("IN handleLogin: >>> ", JSON.stringify(post));
    console.log("IN handleLogin: >>> ", this.router.url);
    var params = {};
    if(post.username.indexOf('@') != -1){
      params = {
        "email": post.username,
        "password": post.password
      };
    }else{
      params = {
        "username": post.username,
        "password": post.password
      };
    }

    let loginReq = {
      "params": params
    }

    // this.myAuthService.login(loginReq).then( result => {
    //     this.currentUser = result;
    //     this.closeBtn.nativeElement.click();
    //     if(this.router.url == "/auth"){
          
    //     }
    //  },
    //  error => {
    //     console.log("ERROR: >>> ", error);
    //  });
  }

  logout(){
  //   this.myAuthService.logout().then( result => {
  //       this.currentUser = undefined;
  //       this.router.navigate(['/']);
  //  },
  //  error => {
  //     console.log("ERROR: >>> ", error);
  //  });
  }

}
