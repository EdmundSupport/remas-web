import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ResponseInterceptor } from './shared/auth/infrastructure/interceptor/response.interceptor';
import { AuthInterceptor } from './shared/auth/infrastructure/interceptor/auth.interceptor';
import { ToolBarComponent } from './shared/component/tool_bar/infrastructure/component/tool_bar.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    ToolBarComponent,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
