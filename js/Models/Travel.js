/**
 * Travel class model to keep travels data 
 */
export default class Travel {
    constructor(startPnt, destinyPnt, selectedCar) {
        this.startKey = startPnt;
        this.destinyKey = destinyPnt;
        this.car = selectedCar;

        // Travels database
        this._Travels =
        {
            PUJ:
            {
                HZBPC:
                {
                    StretchLimo: 105,
                    ChevroletSuburban: 60,
                    MercedesBenz: 60
                },
                HUA:
                {
                    StretchLimo: 135,
                    ChevroletSuburban: 90,
                    MercedesBenz: 90
                },
                HLR:
                {
                    StretchLimo: 225,
                    ChevroletSuburban: 200,
                    MercedesBenz: 200
                },
                SPM:
                {
                    StretchLimo: 350,
                    ChevroletSuburban: 275,
                    MercedesBenz: 275
                },
                Sbo:
                {
                    StretchLimo: 300,
                    ChevroletSuburban: 225,
                    MercedesBenz: 225
                },
                BC:
                {
                    StretchLimo: 400,
                    ChevroletSuburban: 250,
                    MercedesBenz: 250
                },
                SD:
                {
                    StretchLimo: 450,
                    ChevroletSuburban: 300,
                    MercedesBenz: 300
                },
                Sgo:
                {
                    StretchLimo: 900,
                    ChevroletSuburban: 450,
                    MercedesBenz: 450
                },
                Sna:
                {
                    StretchLimo: 1100,
                    ChevroletSuburban: 480,
                    MercedesBenz: 480
                },
                PP:
                {
                    StretchLimo: 1100,
                    ChevroletSuburban: 550,
                    MercedesBenz: 550
                }
            }
        }
    }

    getStartKey() {
        return this.startKey;
    }

    getDestinyKey() {
        return this.destinyKey;
    }

    getCar() {
        return this.car;
    }

    getTotalPrice() {
        // If the start point selected is not the root (PUJ)
        // We can change the destiny for start and get the same
        // result.
        if (this.startKey != Object.keys(this._Travels)[0]) {
            const temp = this.startKey;
            this.startKey = this.destinyKey;
            this.destinyKey = temp;
        }

        // Get total price using JSON database
        let totalPrice =
            this._Travels[this.startKey][this.destinyKey][this.car]

        return totalPrice;
    }
}