import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';

import { AdminLayout } from './_layouts/admin-layout/admin-layout';
import { MainLayout } from './_layouts/main-layout/main-layout';

import { Home } from './_main-components/home/home';

import { CommentForm } from './_main-components/comment-form/comment-form';
import { ContactMain } from './_main-components/contact-main/contact-main';
import { SendMessage } from './_main-components/send-message/send-message';
import { About } from './_main-components/about/about';

import { Category } from './_admin-components/category/category';
import { Blog } from './_admin-components/blog/blog';
import { Comment } from './_admin-components/comment/comment';
import { ContactInfo } from './_admin-components/contact-info/contact-info';
import { Message } from './_admin-components/message/message';
import { Social } from './_admin-components/social/social';
import { AboutAdmin } from './_admin-components/about/about';

import { Login } from './_main-components/login/login';

import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TokenInterceptor } from './_interceptors/token-interceptor';
import { Blogdetails } from './_main-components/blogdetails/blogdetails';

@NgModule({
  declarations: [
    App,
    AdminLayout,
    MainLayout,
    Home,
    Category,
    Blog,
    Login,
    Blogdetails,
    CommentForm,
    ContactMain,
    Comment,
    ContactInfo,
    Message,
    Social,
    SendMessage,
    About,
    AboutAdmin
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [App]
})
export class AppModule {}
