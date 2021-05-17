import { Component, OnInit } from '@angular/core';
import { Login } from '../models/login.model';
import { ToastController,LoadingController,NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
   Login = {} as Login;

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit() {

  }
  async login(Login:Login){
    console.log(Login);
    if(this.formValidation()){
      let loader = await this.loadingCtrl.create({
      message: "Por Favor Espere.."
      });
      loader.present();

      try{
        await this.afAuth.signInWithEmailAndPassword(Login.email,Login.senha).then(data => {
          console.log(data);
          this.navCtrl.navigateRoot("home");
        });
      }catch(e){
        this.showToast(e);
      }
      loader.dismiss();
    }
  }

  formValidation(){
    if(!this.Login.email){
      this.showToast("Digite seu e-mail");
      return false;
    }
    if(!this.Login.senha){
      this.showToast("Digite a senha");
      return false;
    }
    return true;
  }

  showToast(mensagem:string){
    this.toastCtrl.create({
      message: mensagem,
      duration: 5000
    }).then(toastData => toastData.present());
  }

}
