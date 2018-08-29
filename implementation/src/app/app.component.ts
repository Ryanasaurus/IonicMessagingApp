import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { SplashPage } from '../pages/splash/splash';
import { ChannelPage } from '../pages/channel/channel';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs-compat';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = ChannelPage;

  pages: Array<{title: string, component: any}>;

  channels;
  _chatSubscription;

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Login', component: LoginPage },      
      { title: 'Register', component: RegisterPage },
      { title: 'Splash', component: SplashPage },
      { title: 'Channel', component: ChannelPage }
    ];

    this._chatSubscription = db.list('channels/').valueChanges().subscribe(data => {
      this.channels = data;
      console.log(this.channels);
    }),(err) => {
      console.log('error: ', err)
    };

  }

  goToChannel(channel: string) {
    console.log(channel);
    this.nav.setRoot(ChannelPage, {
      channelName: channel
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  signOut() {
    this.afAuth.auth.signOut();
    this.nav.setRoot(HomePage);
  }
}
