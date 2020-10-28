import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {ToastrService} from 'ngx-toastr'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  serverURL="http://localhost:8082/text-pdf"
  textForm:FormGroup
  constructor(private toastr:ToastrService,private formbuilder:FormBuilder,private http:HttpClient){}
  ngOnInit():void{

    this.textForm=this.formbuilder.group({
      text:new FormControl()
    })

  }
  saveAsPdf()
  {
    if(this.textForm.value.text==null  || this.textForm.value.text.trim().length<1)
    {
     this.toastr.warning('please provide some content')
    }
    else{
    this.http.post(this.serverURL,this.textForm.value,{responseType:'text' as 'json'}).subscribe(result=>{
      if(result=='success')
      {
        this.toastr.success('PDF conversion done successfully')
        this.textForm.reset()
      }
    },
    error=>
    {
      console.log('oops something went wrong')
      this.toastr.error('oops something went wrong')
    })
  }
}

}
