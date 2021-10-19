/**
 * Excursion class model to keep excursions data 
 */
export default class Excursion {
    constructor(excursionName, selectedCar) {
        this.excursionKey = excursionName;
        this.car = selectedCar;

        this._Excursion =
        {
            EZBPC13H:
            {
                StretchLimo: 300,
                ChevroletSuburban: 200,
                MercedesBenz: 200
            },
            EZBPC45H:
            {
                StretchLimo: 450,
                ChevroletSuburban: 300,
                MercedesBenz: 250
            },
            EZBPC68H:
            {
                StretchLimo: 700,
                ChevroletSuburban: 350,
                MercedesBenz: 350
            },
            EMR45H:
            {
                StretchLimo: 425,
                ChevroletSuburban: 350,
                MercedesBenz: 350
            },
            EH45H:
            {
                StretchLimo: 400,
                ChevroletSuburban: 350,
                MercedesBenz: 350
            },
            ESAC:
            {
                StretchLimo: 500,
                ChevroletSuburban: 350,
                MercedesBenz: 350
            },
            ESD:
            {
                StretchLimo: 850,
                ChevroletSuburban: 390,
                MercedesBenz: 390
            },
            ESgo:
            {
                StretchLimo: 1800,
                ChevroletSuburban: 750,
                MercedesBenz: 750
            },
            ESna:
            {
                StretchLimo: 1800,
                ChevroletSuburban: 750,
                MercedesBenz: 750
            },
            EPP:
            {
                StretchLimo: 1800,
                ChevroletSuburban: 750,
                MercedesBenz: 750
            }
        }
    }

    // GETTERS
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
        let totalPrice =
            this._Excursion[this.excursionKey][this.car]

        return totalPrice;
    }
}