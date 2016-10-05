import {AZApiMapsWrapperService} from "./az-api-maps-wrapper";
describe('AzApiMapsWrapper service', ()=> {
    it('should add a map to the page', (done)=> {
        let wrapper = new AZApiMapsWrapperService();
        let div = document.createElement('div');
        document.body.appendChild(div);
        expect(div.innerHTML).toBeFalsy();
        wrapper.loadMap(div, {center: {lat: 25.25, lng: 36.36}, zoom: 8});
        expect(div.innerHTML).toBeTruthy();
        waitForExpectation(() => div.getElementsByClassName('gm-style').length > 0, 20, done);
    });

    it('should increase returned loadMap index', () => {
        let wrapper = new AZApiMapsWrapperService();
        for (let i=0; i<3; i++){
            let div = document.createElement('div');
            document.body.appendChild(div);
            let index = wrapper.loadMap(div, {center: {lat: 25.25, lng: 36.36}, zoom: 8});
            expect(index).toEqual(i);
        }
    });

});

function waitForExpectation(expectationFunc: ()=>boolean, timer: number, done: ()=>any) {
    if (!expectationFunc()) {
        setTimeout(waitForExpectation.bind(null, expectationFunc, timer, done), timer);
        return;
    }
    expect(expectationFunc()).toBeTruthy();
    done();
}