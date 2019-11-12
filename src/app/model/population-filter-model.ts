export class PopulationFilterModel {
    private amount$: number;
    private over$: boolean;

    get amount(): number {
        return this.amount$;
    }
    set amount(value: number) {
        this.amount$ = value;
    }
    get over(): boolean {
        return this.over$;
    }
    set over(value: boolean) {
        this.over$ = value;
    }
}
