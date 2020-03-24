import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-private',
  templateUrl: './private.page.html',
  styleUrls: ['./private.page.scss'],
})
export class PrivatePage implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Statistiques',
      url: '/private/stats',
      icon: 'stats-chart-outline'
    },
    {
      title: 'Parametres',
      url: '/private/params',
      icon: 'cog-outline'
    }
  ];
 coursier: any = {id: null, identifiant: '', password: '', nom: 'TEST', prenom: 'Test', photo: './assets/img/user.png', contact1: '90909090', salaire: 0, contact2: '99009900', createdAt: '', deletedAt:'',updatedAt:'' };

  constructor() { }

  ngOnInit() {
    
  }

}
