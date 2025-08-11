import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../employee.service';
import { Router,ActivatedRoute } from '@angular/router';
import {CommonModule} from '@angular/common';
@Component({
  selector: 'app-employee-form', 
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent  implements OnInit{

employee: Employee = {
  id: 0,
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  position: ''
}

isEditing: boolean = false;
errorMessage: string = ''; 
constructor(private employeeService: EmployeeService, private router: Router, private route: ActivatedRoute) {}

ngOnInit(): void {
  this.route.paramMap.subscribe((result) => {
    const id = result.get('id');
    if(id){
      this.isEditing = true;
      console.log('Editing employee with ID:', id);
      this.employeeService.getEmployeesById(Number(id)).subscribe({
        next: (result) => this.employee = result,
        error: (err) => {
          console.error('Error fetching employee:', err);
          this.errorMessage = `Error fetching employee: ${err.status}`;
        }
      });
    } else {
      this.isEditing = false;
      console.log('Creating new employee');
    }

  });
  // Initialization logic can go here if needed
}
onsubmit(): void {
  if (this.isEditing) {
    // Call update (PUT)
    this.employeeService.editemployee(this.employee.id, this.employee).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => {
        console.error('Error editing employee:', err);
        this.errorMessage = `Error occurred: ${err.status}`;
      }
    });
  } else {
    // Call create (POST)
    this.employeeService.createEmployee(this.employee).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => {
        console.error('Error creating employee:', err);
        this.errorMessage = `Error occurred: ${err.status}`;
      }
    });
  }
}
}
