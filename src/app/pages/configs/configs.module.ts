import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigsComponent } from './configs.component';
import { ConfigsRoutingModule } from './configs-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatInputModule} from '@angular/material/input'; 
import {MatButtonModule} from '@angular/material/button'; 
import { HttpClientModule } from '@angular/common/http';
import { ConfigsService } from './services/configs.service';


@NgModule({
  declarations: [
    ConfigsComponent
  ],
  imports: [
    CommonModule,
    ConfigsRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule
  ],
  providers: [
    ConfigsService
  ]
})
export class ConfigsModule { }
