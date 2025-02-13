import { Component, inject, OnInit, signal } from '@angular/core';
import { HomeService } from '../home.service';

type INavItems = {
    name: string;
    color: string;
    icon: string;
};

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css',
})
export class NavbarComponent {}
