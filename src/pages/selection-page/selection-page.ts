// Copyright (c) 2017 Tracktunes Inc

import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { AppFS } from '../../services';

/**
 * Page to see or edit all currently selected items.
 * @class SelectionPage
 */
@Component({
    selector: 'selection-page',
    templateUrl: 'selection-page.html'
})
export class SelectionPage {
    public appFS: AppFS;
    public selectedEntries: Entry[];
    private viewController: ViewController;

    /**
     * @constructor
     * @param {AppFS} appFS -
     * @param {ViewController} viewController -
     */
    constructor(appFS: AppFS, viewController: ViewController) {
        console.log('constructor():SelectionPage');
        this.appFS = appFS;
        this.viewController = viewController;
        this.selectedEntries = [];
        appFS.getSelectedEntries().subscribe(
            (entries: Entry[]) => {
                this.selectedEntries = entries;
            }
        );
    }

    public dismiss(data?: any): void {
        // using the injected ViewController this page
        // can "dismiss" itself and pass back data
        this.viewController.dismiss(data);
    }

    /**
     * @param {any} indexes
     */
    public reorderEntries(indexes: any): void {
        console.log('reorderEntries(' + indexes + ')');
        console.log(typeof(indexes));
        console.dir(indexes);
        const entry: Entry = this.selectedEntries[indexes.from];
        this.selectedEntries.splice(indexes.from, 1);
        this.selectedEntries.splice(indexes.to, 0, entry);
    }
}
