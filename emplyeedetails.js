const company = {
    name: 'CEO',
    salary: 300000,
    subordinates: [
      {
        name: 'CTO',
        salary: 200000,
        subordinates: [
          { name: 'Dev1', salary: 100000, subordinates: [] },
          { name: 'Dev2', salary: 110000, subordinates: [] }
        ]
      },
      {
        name: 'CFO',
        salary: 190000,
        subordinates: [
          { name: 'Accountant1', salary: 90000, subordinates: [] },
          { name: 'Accountant2', salary: 95000, subordinates: [] }
        ]
      }
    ]
  };
  
  function analyzeCompany(company) {
    let highestPaidEmployee = { name: company.name, salary: company.salary };
    const departments = [];
  
    function traverse(employee, departmentName) {
      let totalSalary = employee.salary;
      let employeeList = [employee.name];
  
      if (employee.salary > highestPaidEmployee.salary) {
        highestPaidEmployee = { name: employee.name, salary: employee.salary };
      }
  
      for (const subordinate of employee.subordinates) {
        const result = traverse(subordinate, departmentName);
        totalSalary += result.totalSalary;
        employeeList = employeeList.concat(result.employeeList);
      }
  
      departments.push({ departmentName, totalSalary, employeeList });
      return { totalSalary, employeeList };
    }
  
    traverse(company, company.name);
  
    departments.sort((a, b) => b.totalSalary - a.totalSalary);
    const topDepartments = departments.slice(0, 3);
  
    console.log(`Highest Paid Employee: ${highestPaidEmployee.name}, Salary: ${highestPaidEmployee.salary}`);
    console.log('Top 3 Departments:');
    topDepartments.forEach((dept, index) => {
      console.log(`${index + 1}. Department: ${dept.departmentName}, Total Salary: ${dept.totalSalary}`);
      console.log(`Employees: ${dept.employeeList.join(', ')}`);
    });
  }
  
  analyzeCompany(company);
  