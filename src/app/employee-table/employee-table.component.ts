import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';  
import { Employee } from '../../models/employee';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 

@Component({
  selector: 'employee-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css']
})
export class EmployeeTableComponent {
 employees: Employee[] = [];
 constructor(private employeeService: EmployeeService, private router: Router) {}
   ngOnInit() {
     this.employeeService.getEmployees().subscribe((data: Employee[]) => {
       this.employees = data;
       console.log(data);
     });
   }

   deleteEmployee(id: number): void {
     this.employeeService.deleteEmployee(id).subscribe({
      next: (response) => {
        this.employees = this.employees.filter(emp => emp.id !== id);
      },
      error: (error) => {
        console.error('Error deleting employee:', error);
      }
     });
   }
   editEmployee(employee: Employee): void {

    this.router.navigate(['/edit', employee.id]);
   }
}
