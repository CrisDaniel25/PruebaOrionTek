import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdressesService } from 'src/services/adresses.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adresses',
  templateUrl: './adresses.component.html',
  styleUrls: ['./adresses.component.css']
})
export class AdressesComponent implements OnInit {

  @Input() Customers: any;

  adressFormGroup: FormGroup = new FormGroup({
    addressId: new FormControl(),
    country: new FormControl(),
    city: new FormControl(),
    street: new FormControl(),
    building: new FormControl(),
    zip: new FormControl(),
    customerId: new FormControl(),
    createdAt: new FormControl(),
    updatedAt: new FormControl()
  });

  isEditable: boolean = false;
  UpdateIdAdress: number = 0;

  constructor(private service: AdressesService) { }

  ngOnInit(): void { }

  onEditAdress(adress: any) {
    this.isEditable = true;
    this.UpdateIdAdress = adress.addressId;
    console.log(adress)
    this.adressFormGroup.setValue(adress);
  }

  onPostPutAdress() {

    if (!this.isEditable) this.adressFormGroup.get('customerId')?.setValue(this.Customers.customerId);
    let AdressJSON = JSON.parse(JSON.stringify(this.adressFormGroup.value));

    if (!this.isEditable) {  
      this.service.createAdress(AdressJSON).subscribe(response => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 3500
        }).then(x => window.location.reload());
        console.log(response);
      });
    }
    else if (this.isEditable) {
      this.service.updateAdress(this.UpdateIdAdress, AdressJSON).subscribe(response => {        
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your work has been updated',
          showConfirmButton: false,
          timer: 3500
        });
        console.log(response);        
      })
    }
  }

  onDeleteAdress(id: number) {
    Swal.fire({
      title: '¿Are you sure you want to delete the adress ' + id + ' ?',
      text: "It will not be allowed to reverse!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteAdress(id)
          .subscribe(response => {
            Swal.fire(
              'Removed!',
              'You have successfully removed the adress.',
              'success'
            )
          });
      }
    })
  }
}
