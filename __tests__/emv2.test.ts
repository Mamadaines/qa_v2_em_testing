import { EmployeeManager, Employee } from "./pageObjects/EmployeeManager";

import * as employees from "./employees.json";

describe("employee manager v2", () => {
  const page = new EmployeeManager({ browser: "chrome" });
  beforeEach(async () => {
    await page.navigate();
  });
  afterAll(async () => {
    await page.driver.quit();
  });
  test("Searching narrows the list", async () => {
    let originalList = await page.getEmployeeList();
    await page.searchFor("Bill");
    let resultList = await page.getEmployeeList();
    expect(originalList.length).toBeGreaterThanOrEqual(resultList.length);
  });

  test("Will take a screenshot of 'screenshot' employees", async () => {
    await page.searchFor("Screenshot");
    await page.takeScreenshot("Screenshots/screenshot");
  });
  //test to create a false positive 
  test("Searching for particular position", async () => {
    employees.forEach((position) => {
      const ceoPosition = position.title;
      if(ceoPosition === "CEO"){
        expect(position.name).toBe("Bernice Ortiz") 
      }else {
         console.log("No CEO")

      }
      })
    });
 
  //test to create a loop 
  test(`Can add and delete an employee(newEmployee.name)`, async () => {
   employees.forEach(async (newEmployee) => {
     //console.log("newemployee", newEmployee);
     await page.addEmployee(newEmployee);
    let employee = await page.getCurrentEmployee();
    expect(employee.name).toEqual(newEmployee.name);
    expect(employee.phone).toEqual(newEmployee.phone);
    expect(employee.email).toEqual(newEmployee.email);
    expect(employee.title).toEqual(newEmployee.title);
    await page.deleteEmployee(newEmployee.name);
    let employeeList = await page.getEmployeeList();
    expect(employeeList).not.toContain(newEmployee.name);
  });
});
});

