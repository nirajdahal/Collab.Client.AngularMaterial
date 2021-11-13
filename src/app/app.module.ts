import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JwtModule } from '@auth0/angular-jwt';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { ToastNoAnimationModule, ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './core/components/sidebar/sidebar.component';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { TestComponent } from './feature/components/test/test.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { KanbanComponent } from './shared/components/kanban/kanban.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    TestComponent,
    KanbanComponent
    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    DragDropModule,
    MatInputModule,
    MatSelectModule,
    BrowserAnimationsModule,
    NgMultiSelectDropDownModule.forRoot(),
    MatTooltipModule,
       NgHttpLoaderModule.forRoot(),
    ToastrModule.forRoot(),
    ToastNoAnimationModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:44385"]
      }
    })
  ],
  providers: [
   
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
