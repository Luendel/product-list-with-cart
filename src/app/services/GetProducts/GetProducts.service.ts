import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs"

interface Product {
    image: object;
    name: string;
    category:string;
    price:number;
}

@Injectable({
    providedIn:"root"
})
export class GetProducts {
    private url = "assets/data/data.json"

    constructor(private http:HttpClient){ }

    getProducts(): Observable<Product[]>{
        return this.http.get<Product[]>(this.url);
    }
}