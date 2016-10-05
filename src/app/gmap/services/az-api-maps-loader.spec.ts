import {AZApiMapsLoaderService} from "./az-api-maps-loader";
describe("AzApiMapsLoader service", ()=> {
    it('should load google maps script', (done)=> {
        let loader = new AZApiMapsLoaderService();
        loader.load().then(google => {
            expect(window).hasOwnProperty('google');
            expect([].some.call(document.scripts, (script: HTMLScriptElement) => script.src === 'https://maps.googleapis.com/maps/api/js')).toBeTruthy();
            expect(google).hasOwnProperty('maps');
            done();
        });
    });
});