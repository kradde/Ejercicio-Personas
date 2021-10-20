import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: []
})
export class AppComponent implements OnInit{

    public personas = <any[]>[];
    public fileToUpload: File | null = null;
    public name = '';
    public saved = false;

    @ViewChild('fileBtn') fileBtn: ElementRef<HTMLElement> | undefined;

    constructor(private mainService: MainService){}

    ngOnInit(): void {
        this.mainService.getData().toPromise().then(data => {
            this.personas = (data as any).results[0].personas;
        });
    }

    handle(event:any): void {
        this.fileToUpload = event.target.files.item(0);
        console.log(this.fileToUpload);
    }

    triggerClick(event:any) {
        let el: HTMLElement = (this.fileBtn as any).nativeElement; 
        el.click();
        event.preventDefault();
    }

    save(event:any){
        this.personas.push({name: this.name, gender: '', age: '', document: (this.fileToUpload as any).name});

        localStorage.setItem('datos', JSON.stringify({file: this.fileToUpload, name: this.name}));
        localStorage.clear();
        event.preventDefault();

        this.fileToUpload = null;
        this.name = '';
        this.saved = true;
    }
}
