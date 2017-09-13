// Copyright (c) 2017 Tracktunes Inc

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { FS } from '../../models';

const REQUEST_SIZE: number = 1024 * 1024 * 1024;
const WAIT_MSEC: number = 25;

/**
 * @name AppFileSystem
 * @description
 */
@Injectable()
export class AppFS {
    public fileSystem: FileSystem;
    public unfiledDirectory: DirectoryEntry;

    /**
     * @constructor
     */
    constructor() {
        console.log('constructor():AppFileSystem');
        this.fileSystem = null;
        // get the filesystem
        FS.getFileSystem(true, REQUEST_SIZE).subscribe(
            (fileSystem: FileSystem) => {
                // remember the filesystem you got
                this.fileSystem = fileSystem;
                // create the /Unfiled/ folder if not already there
                FS.getPathEntry(fileSystem, '/Unfiled/', true).subscribe(
                    (directoryEntry: DirectoryEntry) => {
                        console.log('Created /Unfiled/');
                        this.unfiledDirectory = directoryEntry;
                    });
            });
    }

    /**
     * Wait indefinitely until DB is ready for use, via an observable.
     * @returns {Observable<IDBDatabase>} Observable that emits the database
     * when it's ready for use.
     */
    public getFileSystem(): Observable<FileSystem> {
        let source: Observable<FileSystem> = Observable.create((observer) => {
            let repeat: () => void = () => {
                console.log('!!!WAIT_FOR_FS!!!');
                if (this.fileSystem) {
                    observer.next(this.fileSystem);
                    observer.complete();
                }
                else {
                    setTimeout(repeat, WAIT_MSEC);
                }
            };
            repeat();
        });
        return source;
    }

    public getPathEntry(path: string, bCreate: boolean): Observable<Entry> {
        let source: Observable<Entry> = Observable.create((observer) => {
            this.getFileSystem().subscribe(
                (fileSystem: FileSystem) => {
                    FS.getPathEntry(fileSystem, path, bCreate).subscribe(
                        (entry: Entry) => {
                            observer.next(entry);
                            observer.complete();
                        },
                        (err1: any) => {
                            observer.error(err1);
                        }
                    );
                },
                (err2: any) => {
                    observer.error(err2);
                }
            );
        });
        return source;
    }

    public getEntriesFromPaths(paths: string[]): Observable<Entry[]> {
        let source: Observable<Entry[]> = Observable.create((observer) => {
            this.getFileSystem().subscribe(
                (fileSystem: FileSystem) => {
                    FS.getEntriesFromPaths(fileSystem, paths).subscribe(
                        (entries: Entry[]) => {
                            observer.next(entries);
                            observer.complete();
                        },
                        (err1: any) => {
                            observer.error(err1);
                        }
                    );
                },
                (err2: any) => {
                    observer.error(err2);
                }
            );
        });
        return source;
    }
}