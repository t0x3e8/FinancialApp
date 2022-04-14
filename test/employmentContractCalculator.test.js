/* global test, expect */

import EmploymentContractCalculator from "../src/logic/employmentContractCalculator.js";

var eccData = {
  sets: [
    {
      salaryData: { salary: 5000, costOfGettingIncome: 300, employeeCapitalPlans: 1.5, employerCapitalPlans: 2 },
      salaryinMonths: [5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000],
      accSalaryinMonths: [5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000, 55000, 60000],
      retirementInsurance: [488, 488, 488, 488, 488, 488, 488, 488, 488, 488, 488, 488],
      disabilityInsurance: [75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75],
      sicknessInsurance: [123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123],
      healthInsurance: [388, 388, 388, 388, 388, 388, 388, 388, 388, 388, 388, 388],
      total: [1074, 1074, 1074, 1074, 1074, 1074, 1074, 1074, 1074, 1074, 1074, 1074],
      costOfGettingIncome: [300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300],
      employeeCapitalPlans: [75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75],
      employerCapitalPlans: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
      income: [4014, 4014, 4014, 4014, 4014, 4014, 4014, 4014, 4014, 4014, 4014, 4014],
      incomeAcc: [4014, 8028, 12042, 16056, 20070, 24084, 28098, 32112, 36126, 40140, 44154, 48168],
    },
    {
      salaryData: { salary: 20000, costOfGettingIncome: 250, employeeCapitalPlans: 0.5, employerCapitalPlans: 1 },
      salaryinMonths: [20000, 20000, 20000, 20000, 20000, 20000, 20000, 20000, 20000, 20000, 20000, 20000],
      accSalaryinMonths: [20000, 40000, 60000, 80000, 100000, 120000, 140000, 160000, 180000, 200000, 220000, 240000],
      retirementInsurance: [1952, 1952, 1952, 1952, 1952, 1952, 1952, 1952, 1724, 0, 0, 0],
      disabilityInsurance: [300, 300, 300, 300, 300, 300, 300, 300, 265, 0, 0, 0],
      sicknessInsurance: [490, 490, 490, 490, 490, 490, 490, 490, 490, 490, 490, 490],
      healthInsurance: [1553, 1553, 1553, 1553, 1553, 1553, 1553, 1553, 1553, 1576, 1755, 1755, 1755],
      total: [4295, 4295, 4295, 4295, 4295, 4295, 4295, 4295, 4055, 2245, 2245, 2245],
      costOfGettingIncome: [250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250],
      employeeCapitalPlans: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
      employerCapitalPlans: [200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200],
      income: [17008, 17008, 17008, 17008, 17008, 17008, 17008, 17008, 17271, 19260, 19260, 19260],
      incomeAcc: [17008, 34016, 51024, 68032, 85040, 102048, 119056, 136064, 153335, 172595, 191855, 211115],
    },
  ],
  zeroValues: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
  expect(ecc.employeeCapitalPlans).toHaveLength(0);
  expect(ecc.income).toHaveLength(0);
  expect(ecc.incomeAcc).toHaveLength(0);
});

test("If 'SalaryInMonths' input is specified, set default values.", () => {
  const ecc = new EmploymentContractCalculator(eccData.sets[0].salaryData);

  expect(ecc.salaryInMonths).toHaveLength(0);
  expect(ecc.accSalaryinMonths).toHaveLength(0);
  expect(ecc.socialInsurance.retirementInsurance).toHaveLength(0);
  expect(ecc.socialInsurance.disabilityInsurance).toHaveLength(0);
  expect(ecc.socialInsurance.sicknessInsurance).toHaveLength(0);
  expect(ecc.socialInsurance.healthInsurance).toHaveLength(0);
  expect(ecc.socialInsurance.total).toHaveLength(0);
  expect(ecc.costOfGettingIncome).toHaveLength(0);
  expect(ecc.employeeCapitalPlans).toHaveLength(0);
  expect(ecc.employerCapitalPlans).toHaveLength(0);
  expect(ecc.income).toHaveLength(0);
  expect(ecc.incomeAcc).toHaveLength(0);
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
  ecc2.setSalary({ salary: null });
  expect(ecc2.salaryInMonths).toEqual(expect.arrayContaining(eccData.zeroValues));
  expect(ecc2.costOfGettingIncome).toEqual(expect.arrayContaining(eccData.zeroValues));

  const ecc3 = new EmploymentContractCalculator();
  ecc3.setSalary({ salary: null });
  expect(ecc3.salaryInMonths).toEqual(expect.arrayContaining(eccData.zeroValues));
  expect(ecc3.costOfGettingIncome).toEqual(expect.arrayContaining(eccData.zeroValues));

  const ecc4 = new EmploymentContractCalculator();
  ecc4.setSalary({ salary: undefined });
  expect(ecc4.salaryInMonths).toEqual(expect.arrayContaining(eccData.zeroValues));
  expect(ecc4.costOfGettingIncome).toEqual(expect.arrayContaining(eccData.zeroValues));

  const ecc5 = new EmploymentContractCalculator();
  ecc5.setSalary({ salary: 100, costOfGettingIncome: null });
  expect(ecc5.salaryInMonths).toContain(100);
  expect(ecc5.costOfGettingIncome).toEqual(expect.arrayContaining(eccData.zeroValues));

  const ecc6 = new EmploymentContractCalculator();
  ecc6.setSalary({ salary: 100, costOfGettingIncome: undefined });
  expect(ecc6.salaryInMonths).toContain(100);
  expect(ecc6.costOfGettingIncome).toEqual(expect.arrayContaining(eccData.zeroValues));

  const ecc7 = new EmploymentContractCalculator();
  ecc7.setSalary({ salary: 100, costOfGettingIncome: 299 });
  expect(ecc7.salaryInMonths).toContain(100);
  expect(ecc7.costOfGettingIncome).toContain(299);

  const ecc8 = new EmploymentContractCalculator();
  ecc8.setSalary({ salary: 100, costOfGettingIncome: 299, employeeCapitalPlans: null, employerCapitalPlans: null });
  expect(ecc8.salaryInMonths).toContain(100);
  expect(ecc8.costOfGettingIncome).toContain(299);
  expect(ecc8.employeeCapitalPlans).toEqual(expect.arrayContaining(eccData.zeroValues));
  expect(ecc8.employerCapitalPlans).toEqual(expect.arrayContaining(eccData.zeroValues));

  const ecc9 = new EmploymentContractCalculator();
  ecc9.setSalary({ salary: 100, costOfGettingIncome: 299, employeeCapitalPlans: undefined, employerCapitalPlans: undefined });
  expect(ecc8.salaryInMonths).toContain(100);
  expect(ecc8.costOfGettingIncome).toContain(299);
  expect(ecc8.employeeCapitalPlans).toEqual(expect.arrayContaining(eccData.zeroValues));
  expect(ecc8.employerCapitalPlans).toEqual(expect.arrayContaining(eccData.zeroValues));

  const ecc10 = new EmploymentContractCalculator();
  ecc10.setSalary({ salary: 100, costOfGettingIncome: 299, employeeCapitalPlans: 1.5, employerCapitalPlans: 2 });
  expect(ecc10.salaryInMonths).toContain(100);
  expect(ecc10.costOfGettingIncome).toContain(299);
  expect(ecc10.employeeCapitalPlans).toContain(1.5);
  expect(ecc10.employerCapitalPlans).toContain(2);
});

test.each(eccData.sets)("If setSalary is define then calculate for each month values.", (eccInput) => {
  const ecc = new EmploymentContractCalculator();
  ecc.setSalary(eccInput.salaryData);
  expect(ecc.salaryInMonths).toHaveLength(12);
  expect(ecc.accSalaryinMonths).toHaveLength(0);
  expect(ecc.socialInsurance.retirementInsurance).toHaveLength(0);
  expect(ecc.socialInsurance.disabilityInsurance).toHaveLength(0);
  expect(ecc.socialInsurance.sicknessInsurance).toHaveLength(0);
  expect(ecc.socialInsurance.healthInsurance).toHaveLength(0);
  expect(ecc.socialInsurance.total).toHaveLength(0);
  expect(ecc.costOfGettingIncome).toHaveLength(12);
  expect(ecc.employeeCapitalPlans).toHaveLength(12);
  expect(ecc.employerCapitalPlans).toHaveLength(12);
  expect(ecc.income).toHaveLength(0);
  expect(ecc.incomeAcc).toHaveLength(0);

  ecc.calculate();
  expect(ecc.salaryInMonths).toEqual(expect.arrayContaining(eccInput.salaryinMonths));
  expect(ecc.accSalaryinMonths).toEqual(expect.arrayContaining(eccInput.accSalaryinMonths));
  expect(ecc.socialInsurance.retirementInsurance).toEqual(expect.arrayContaining(eccInput.retirementInsurance));
  expect(ecc.socialInsurance.disabilityInsurance).toEqual(expect.arrayContaining(eccInput.disabilityInsurance));
  expect(ecc.socialInsurance.sicknessInsurance).toEqual(expect.arrayContaining(eccInput.sicknessInsurance));
  expect(ecc.socialInsurance.healthInsurance).toEqual(expect.arrayContaining(eccInput.healthInsurance));
  expect(ecc.socialInsurance.total).toEqual(expect.arrayContaining(eccInput.total));
  expect(ecc.costOfGettingIncome).toEqual(expect.arrayContaining(eccInput.costOfGettingIncome));
  expect(ecc.employeeCapitalPlans).toEqual(expect.arrayContaining(eccInput.employeeCapitalPlans));
  expect(ecc.employerCapitalPlans).toEqual(expect.arrayContaining(eccInput.employerCapitalPlans));
  expect(ecc.income).toEqual(expect.arrayContaining(eccInput.income));
  expect(ecc.incomeAcc).toEqual(expect.arrayContaining(eccInput.incomeAcc));
});
