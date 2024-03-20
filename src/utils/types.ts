import { images } from "./image";

export interface searchDataType {
    json(): any;
    aircraft: string;
    airline: string
    duration: string
    price: number
    destination: string
    flightNumber: string
    arrivalTime: string
    departureTime: string
    gate: string
    id: string
    origin: string
    seatsAvailable: number
}

export enum sortList {
    ASCENDING = "ascending",
    DESCENDING = "descending",
}
export const SearchJetImage = [
    {
        name: "IndiGo",
        image: images.indiGo
    },
    {
        name: "Air India",
        image: images.airIndia
    },
    {
        name: "SpiceJet",
        image: images.spiceJet
    },
    {
        name: "Vistara",
        image: images.vistara
    },
    {
        name: "GoAir",
        image: images.goAir
    },
    {
        name: "AirAsia",
        image: images.airAsia
    }
]