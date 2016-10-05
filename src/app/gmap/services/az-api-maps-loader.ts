import {Injectable} from '@angular/core';
@Injectable()
export class AZApiMapsLoaderService {

    private _instance: Promise<void>;
    private _progressStarted = false;

    public load() {
        this._instance = this._instance || new Promise<void>(resolve => {
            if (!this._progressStarted){
                let script = document.createElement('script');
                document.body.appendChild(script);
                script.src = 'https://maps.googleapis.com/maps/api/js';
                this._progressStarted = true;
            }
                (function loaded() {
                    if (typeof window['google'] !== 'undefined') {
                        resolve(window['google']);
                        return;
                    }
                    setTimeout(loaded, 100);
                })();

            });
        return this._instance;
    }

}