export class PopulationFilterModel {
    private _amount: number = 0;
    private _over: boolean = false;
    get amount(): number {
        return this._amount;
    }
    set amount(value: number) {
        this._amount = value;
    }
    get over(): boolean {
        return this._over;
    }
    set over(value: boolean) {
        this._over = value;
    }
}
