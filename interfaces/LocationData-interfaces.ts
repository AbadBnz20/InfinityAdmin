import { City } from "./city-interfaces";
import { Countries } from "./countries-interfaces";
import { State } from "./state-interfaces";



export interface LocationData {
    countries:Countries[];
    states:State[];
    cities: City[];
}