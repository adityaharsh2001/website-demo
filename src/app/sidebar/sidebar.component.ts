import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard',    title: 'Dashboard',         icon:'nc-bank',       class: '' },
    { path: '/lectures',     title: 'Lectures',        icon:'nc-single-copy-04', class: '' },
    { path: '/workshop',     title: 'Workshops',             icon:'nc-briefcase-24',    class: '' },
    { path: '/teams',  title: 'Teams',             icon:'nc-badge',    class: '' },
    { path: '/sponsors',  title: 'Sponsors',             icon:'nc-mobile',    class: '' },

    { path: '/competition',  title: 'Competitions',             icon:'nc-single-02',    class: '' },
    // { path: '/maps',          title: 'Maps',              icon:'nc-pin-3',      class: '' },
    // { path: '/notifications', title: 'Notifications',     icon:'nc-bell-55',    class: '' },
    // { path: '/user',          title: 'User Profile',      icon:'nc-single-02',  class: '' },
    // { path: '/table',         title: 'Table List',        icon:'nc-tile-56',    class: '' },
    // { path: '/typography',    title: 'Typography',        icon:'nc-caps-small', class: '' },

];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
