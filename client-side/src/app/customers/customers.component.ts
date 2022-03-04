import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ICustomers } from 'src/interfaces/customers';
import { CustomersService } from '../../services/customers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customerFormGroup: FormGroup = new FormGroup({
    customerId: new FormControl(),
    firstname: new FormControl(),
    lastname: new FormControl(),
    email: new FormControl(),
    phonenumber: new FormControl(),
    gender: new FormControl(),
    createdAt: new FormControl(),
    updatedAt: new FormControl()
  });

  customers: ICustomers[] = [];
  detail: any;
  fullname: string = '';
  isEditable: boolean = false;

  constructor(private service: CustomersService) { }

  ngOnInit(): void {
    this.onGetCustomers();
  }

  onGetCustomers() {
    this.service.getCustomers().subscribe(response => {
      this.customers = response;
    });
  }

  onGetCustomer(id: number) {
    this.isEditable = true;
    this.service.getCustomerbyId(id).subscribe(response => {
      this.detail = response;
      this.fullname = this.detail.firstname + ' ' + this.detail.lastname;
      this.customerFormGroup.setValue(this.detail);      
    });
  }

  onVoidCustomerForm() {
    this.isEditable = false;
    this.customerFormGroup.reset;
  }

  onPostPutClient() {
    let customerJSON = JSON.parse(JSON.stringify(this.customerFormGroup.value));

    if (!this.isEditable) {  
      this.service.createCustomer(customerJSON).subscribe(response => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 3500
        }).then(x => this.onGetCustomers());
        console.log(response);
      });
    }
    else if (this.isEditable) {
      this.service.updateCustomer(this.detail.customerId, customerJSON).subscribe(response => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 3500
        }).then(x => this.onGetCustomers());
        console.log(response);
      })
    }
  }

  onDeleteCustomer(id: number) {
    Swal.fire({
      title: '¿Are you sure you want to delete the client ' + id + ' ?',
      text: "It will not be allowed to reverse!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteCustomer(id)
          .subscribe(response => {
            Swal.fire(
              'Removed!',
              'You have successfully removed the client.',
              'success'
            )
          });
      }
    })
  }
}
