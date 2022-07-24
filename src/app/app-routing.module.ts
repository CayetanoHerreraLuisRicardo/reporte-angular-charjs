import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ServerErrorComponent } from './components/server.error/server.error.component';

const routes: Routes = [
  { path: 'home/:idcompany', component: HomeComponent },
  { path: '404', component: NotfoundComponent },
  { path: '500', component: ServerErrorComponent },
  { path: '', redirectTo: '404', pathMatch: 'full' },
  { path: '**', pathMatch: 'full', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }