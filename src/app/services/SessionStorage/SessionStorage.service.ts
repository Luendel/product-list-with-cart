import { isPlatformBrowser } from "@angular/common";
import { Injectable, PLATFORM_ID, Inject } from "@angular/core";


@Injectable({
    providedIn:"root"
})
export class SessionStorage {

    constructor(@Inject(PLATFORM_ID) private platformID:object){}

    setItem(key:string, value:any):void {
        if(isPlatformBrowser(this.platformID)){
            sessionStorage.setItem(key,JSON.stringify(value))
        } 
    }

    getItem<T>(key:string): T | null {
        if(isPlatformBrowser(this.platformID)){
            const item = sessionStorage.getItem(key)

            return item ? JSON.parse(item) : null
        }
        return null
    }

    removeItem(key:string):void {
        if(isPlatformBrowser(this.platformID)){
            sessionStorage.removeItem(key)
        }
        
    }

    clear(){
        if(isPlatformBrowser(this.platformID)){
            sessionStorage.clear()
        }
        
    }
}