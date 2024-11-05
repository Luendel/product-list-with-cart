import { Injectable } from "@angular/core";


@Injectable({
    providedIn:"root"
})
export class SessionStorage {

    setItem(key:string, value:any):void {
        sessionStorage.setItem(key,JSON.stringify(value))
    }

    getItem<T>(key:string): T | null {
        const item = sessionStorage.getItem(key)

        return item ? JSON.parse(item) : null
    }

    removeItem(key:string):void {
        sessionStorage.removeItem(key)
    }

    clear(){
        sessionStorage.clear()
    }
}