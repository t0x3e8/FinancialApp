/* global test, expect */

import EmploymentContractCalculator from "../src/logic/employmentContractCalculator.js";

var eccData = {
  sameSalaryInMonthsResults: {
    salaryData: { salary: 5000, costOfGettingIncome: 300 },
    salaryinMonths: [5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000],
    accSalaryinMonths: [5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000, 55000, 60000],
    retirementInsurance: [488, 488, 488, 488, 488, 488, 488, 488, 488, 488, 488, 488],
    disabilityInsurance: [75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75],
    sicknessInsurance: [123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123],
    healthInsurance: [388, 388, 388, 388, 388, 388, 388, 388, 388, 388, 388, 388],
    total: [1074, 1074, 1074, 1074, 1074, 1074, 1074, 1074, 1074, 1074, 1074, 1074],
    costOfGettingIncome: [300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300],
  },
  zeroValues: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
};

test("If no input is specified, set the default values.", () => {
  const ecc = new EmploymentContractCalculator();

  expect(ecc.salaryInMonths).toEqual(expect.arrayContaining([]));
  expect(ecc.accSalaryinMonths).toHaveLength(0);
  expect(ecc.accSalaryinMonths).toHaveLength(0);
  expect(ecc.socialInsurance.retirementInsurance).toHaveLength(0);
  expect(ecc.socialInsurance.disabilityInsurance).toHaveLength(0);
  expect(ecc.socialInsurance.sicknessInsurance).toHaveLength(0);
  expect(ecc.socialInsurance.healthInsurance).toHaveLength(0);
  expect(ecc.socialInsurance.total).toHaveLength(0);
  expect(ecc.costOfGettingIncome).toHaveLength(0);
});

test("If 'SalaryInMonths' input is specified, set default values.", () => {
  const ecc = new EmploymentContractCalculator(eccData.sameSalaryInMonthsResults.salaryData);

  expect(ecc.salaryInMonths).toHaveLength(0);
  expect(ecc.accSalaryinMonths).toHaveLength(0);
  expect(ecc.socialInsurance.retirementInsurance).toHaveLength(0);
  expect(ecc.socialInsurance.disabilityInsurance).toHaveLength(0);
  expect(ecc.socialInsurance.sicknessInsurance).toHaveLength(0);
  expect(ecc.socialInsurance.healthInsurance).toHaveLength(0);
  expect(ecc.socialInsurance.total).toHaveLength(0);
  expect(ecc.costOfGettingIncome).toHaveLength(0);
});

test("If 'salaryData' input is undefined or null, then 0 values.", () => {
  const ecc = new EmploymentContractCalculator();
  ecc.setSalary(null);
  expect(ecc.salaryInMonths).toEqual(expect.arrayContaining(eccData.zeroValues));
  expect(ecc.costOfGettingIncome).toEqual(expect.arrayContaining(eccData.zeroValues));
  
  const ecc1 = new EmploymentContractCalculator();
  ecc1.setSalary(null);
  expect(ecc1.salaryInMonths).toEqual(expect.arrayContaining(eccData.zeroValues));
  expect(ecc1.costOfGettingIncome).toEqual(expect.arrayContaining(eccData.zeroValues));
  
  const ecc2 = new EmploymentContractCalculator();
  ecc2.setSalary({salary: null});
  expect(ecc2.salaryInMonths).toEqual(expect.arrayContaining(eccData.zeroValues));
  expect(ecc2.costOfGettingIncome).toEqual(expect.arrayContaining(eccData.zeroValues));
  
  const ecc3 = new EmploymentContractCalculator();
  ecc3.setSalary({salary: null});
  expect(ecc3.salaryInMonths).toEqual(expect.arrayContaining(eccData.zeroValues));
  expect(ecc3.costOfGettingIncome).toEqual(expect.arrayContaining(eccData.zeroValues));
  
  const ecc4 = new EmploymentContractCalculator();
  ecc4.setSalary({salary: undefined});
  expect(ecc4.salaryInMonths).toEqual(expect.arrayContaining(eccData.zeroValues));
  expect(ecc4.costOfGettingIncome).toEqual(expect.arrayContaining(eccData.zeroValues));
  
  const ecc5 = new EmploymentContractCalculator();
  ecc5.setSalary({salary: 100, costOfGettingIncome: null});
  expect(ecc5.salaryInMonths).toContain(100);
  expect(ecc5.costOfGettingIncome).toEqual(expect.arrayContaining(eccData.zeroValues));

  const ecc6 = new EmploymentContractCalculator();
  ecc6.setSalary({salary: 100, costOfGettingIncome: undefined});
  expect(ecc6.salaryInMonths).toContain(100);
  expect(ecc6.costOfGettingIncome).toEqual(expect.arrayContaining(eccData.zeroValues));
  
  const ecc7 = new EmploymentContractCalculator();
  ecc7.setSalary({salary: 100, costOfGettingIncome: 299});
  expect(ecc7.salaryInMonths).toContain(100);
  expect(ecc7.costOfGettingIncome).toContain(299);
});

test("If setSalary is define then calculate for each month values.", () => {
  const ecc = new EmploymentContractCalculator();
  ecc.setSalary(eccData.sameSalaryInMonthsResults.salaryData);
  expect(ecc.salaryInMonths).toHaveLength(12);
  expect(ecc.accSalaryinMonths).toHaveLength(0);
  expect(ecc.socialInsurance.retirementInsurance).toHaveLength(0);
  expect(ecc.socialInsurance.disabilityInsurance).toHaveLength(0);
  expect(ecc.socialInsurance.sicknessInsurance).toHaveLength(0);
  expect(ecc.socialInsurance.healthInsurance).toHaveLength(0);
  expect(ecc.socialInsurance.total).toHaveLength(0);
  expect(ecc.costOfGettingIncome).toHaveLength(12);

  ecc.calculate();
  expect(ecc.salaryInMonths).toEqual(expect.arrayContaining(eccData.sameSalaryInMonthsResults.salaryinMonths));
  expect(ecc.accSalaryinMonths).toEqual(expect.arrayContaining(eccData.sameSalaryInMonthsResults.accSalaryinMonths));
  expect(ecc.socialInsurance.retirementInsurance).toEqual(expect.arrayContaining(eccData.sameSalaryInMonthsResults.retirementInsurance));
  expect(ecc.socialInsurance.disabilityInsurance).toEqual(expect.arrayContaining(eccData.sameSalaryInMonthsResults.disabilityInsurance));
  expect(ecc.socialInsurance.sicknessInsurance).toEqual(expect.arrayContaining(eccData.sameSalaryInMonthsResults.sicknessInsurance));
  expect(ecc.socialInsurance.healthInsurance).toEqual(expect.arrayContaining(eccData.sameSalaryInMonthsResults.healthInsurance));
  expect(ecc.socialInsurance.total).toEqual(expect.arrayContaining(eccData.sameSalaryInMonthsResults.total));
  expect(ecc.costOfGettingIncome).toEqual(expect.arrayContaining(eccData.sameSalaryInMonthsResults.costOfGettingIncome));
});
