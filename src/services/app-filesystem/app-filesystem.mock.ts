// Copyright (c) 2017 Tracktunes Inc

export class AppFileSystemMock {
    public getProperty(key: string): Promise<any> {
        return new Promise((resolve, reject) => {
            resolve(null);
        });
    }
    public updateProperty(key: string, value: any): Promise<any> {
        return new Promise((resolve, reject) => {
            resolve(null);
        });
    }
}