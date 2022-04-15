/* global test, expect, describe */

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
      healthInsurance: [1553, 1553, 1553, 1553, 1553, 1553, 1553, 1553, 1577, 1756, 1756, 1756],
      total: [4295, 4295, 4295, 4295, 4295, 4295, 4295, 4295, 4056, 2246, 2246, 2246],
      costOfGettingIncome: [250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250],
      employeeCapitalPlans: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
      employerCapitalPlans: [200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200],
      income: [17008, 17008, 17008, 17008, 17008, 17008, 17008, 17008, 17271, 19260, 19260, 19260],
      incomeAcc: [17008, 34016, 51024, 68032, 85040, 102048, 119056, 136064, 153335, 172595, 191855, 211115],
    },
  ],
  zeroValues: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
};

describe("ctor()", () => {
  test("Given null input for calculator initialization Then calculator should initialize empty collections.", () => {
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
    expect(ecc.reliefForMiddleClass).toHaveLength(0);
    expect(ecc.income).toHaveLength(0);
    expect(ecc.incomeAcc).toHaveLength(0);
  });
  
  test("Given correct input for calculator initialization Then calculator should initialize empty collections.", () => {
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
    expect(ecc.reliefForMiddleClass).toHaveLength(0);
    expect(ecc.income).toHaveLength(0);
    expect(ecc.incomeAcc).toHaveLength(0);
  });
});

describe("setSalary()", () => {
  const ecc = new EmploymentContractCalculator();

  test("Given null as function argument Then I expect zero values for SalaryInMonth", () => {
    ecc.setSalary(null);
    expect(ecc.salaryInMonths).toEqual(expect.arrayContaining(eccData.zeroValues));
    expect(ecc.costOfGettingIncome).toEqual(expect.arrayContaining(eccData.zeroValues));
    expect(ecc.employeeCapitalPlans).toEqual(expect.arrayContaining(eccData.zeroValues));
    expect(ecc.employerCapitalPlans).toEqual(expect.arrayContaining(eccData.zeroValues));
  });

  test("Given undefined as function input Then I expect zero values for SalaryInMonth", () => {
    ecc.setSalary(undefined);
    expect(ecc.salaryInMonths).toEqual(expect.arrayContaining(eccData.zeroValues));
    expect(ecc.costOfGettingIncome).toEqual(expect.arrayContaining(eccData.zeroValues));
    expect(ecc.employeeCapitalPlans).toEqual(expect.arrayContaining(eccData.zeroValues));
    expect(ecc.employerCapitalPlans).toEqual(expect.arrayContaining(eccData.zeroValues));
  });

  test("Given null salary input Then I expect zero values for SalaryInMonth", () => {
    ecc.setSalary({ salary: null });
    expect(ecc.salaryInMonths).toEqual(expect.arrayContaining(eccData.zeroValues));
  });

  test("Given undefined salary input Then I expect zero values for SalaryInMonth", () => {
    ecc.setSalary({ salary: undefined });
    expect(ecc.salaryInMonths).toEqual(expect.arrayContaining(eccData.zeroValues));
  });

  test("Given 12000 salary input Then I expect 12000 values for SalaryInMonth", () => {
    ecc.setSalary({ salary: 12000 });
    expect(ecc.salaryInMonths).toContain(12000);
  });

  test("Given null cost of getting income input Then I expect zero values for costOfGettingIncome", () => {
    ecc.setSalary({ costOfGettingIncome: null });
    expect(ecc.costOfGettingIncome).toEqual(expect.arrayContaining(eccData.zeroValues));
  });

  test("Given undefined cost of getting income input Then I expect zero values for costOfGettingIncome", () => {
    ecc.setSalary({ costOfGettingIncome: undefined });
    expect(ecc.costOfGettingIncome).toEqual(expect.arrayContaining(eccData.zeroValues));
  });

  test("Given 250 cost of getting income input Then I expect 250 values for costOfGettingIncome", () => {
    ecc.setSalary({ costOfGettingIncome: 250 });
    expect(ecc.costOfGettingIncome).toContain(250);
  });

  test("Given null employee capital plans input Then I expect zero values for employeeCapitalPlans", () => {
    ecc.setSalary({ employeeCapitalPlans: null });
    expect(ecc.employeeCapitalPlans).toEqual(expect.arrayContaining(eccData.zeroValues));
  });

  test("Given undefined employee capital plans income input Then I expect zero values for employeeCapitalPlans", () => {
    ecc.setSalary({ employeeCapitalPlans: undefined });
    expect(ecc.employeeCapitalPlans).toEqual(expect.arrayContaining(eccData.zeroValues));
  });

  test("Given 1% employee capital plans input Then I expect 10 values for employeeCapitalPlans", () => {
    ecc.setSalary({ employeeCapitalPlans: 1, salary: 1000 });
    expect(ecc.employeeCapitalPlans).toContain(10);
  });

  test("Given null employee capital plans input Then I expect zero values for employerCapitalPlans", () => {
    ecc.setSalary({ employerCapitalPlans: null });
    expect(ecc.employerCapitalPlans).toEqual(expect.arrayContaining(eccData.zeroValues));
  });

  test("Given undefined employee capital plans income input Then I expect zero values for employerCapitalPlans", () => {
    ecc.setSalary({ employerCapitalPlans: undefined });
    expect(ecc.employerCapitalPlans).toEqual(expect.arrayContaining(eccData.zeroValues));
  });

  test("Given 2% employee capital plans input Then I expect 20 values for employerCapitalPlans", () => {
    ecc.setSalary({ employerCapitalPlans: 2, salary: 1000 });
    expect(ecc.employerCapitalPlans).toContain(20);
  });
});

describe("calculateRelief()", () => {
  const ecc = new EmploymentContractCalculator();
  test("Given salary of 3400 then I expect relief of 0.", () => expect(ecc.calculateRelief(3400)).toBe(0));
  test("Given salary of 5700 then I expect relief of 0.", () => expect(ecc.calculateRelief(5700)).toBe(0));
  test("Given salary of 7568  then I expect relief of 0.", () => expect(ecc.calculateRelief(7568)).toBe(736));
  test("Given salary of 8548 then I expect relief of 0.", () => expect(ecc.calculateRelief(8548)).toBe(1121));
  test("Given salary of 8549 then I expect relief of 0.", () => expect(ecc.calculateRelief(8549)).toBe(1122));
  test("Given salary of 10000 then I expect relief of 0.", () => expect(ecc.calculateRelief(10000)).toBe(495));
  test("Given salary of 11140 then I expect relief of 0.", () => expect(ecc.calculateRelief(11140)).toBe(2));
  test("Given salary of 11141 then I expect relief of 0.", () => expect(ecc.calculateRelief(11141)).toBe(0));
  test("Given salary of 20000 then I expect relief of 0.", () => expect(ecc.calculateRelief(20000)).toBe(0));
});

describe("setSalary()", () => {
  eccData.sets.forEach((eccInput) => {
    const ecc = new EmploymentContractCalculator();
    test(
      "Given salary input (salary, cost of getting income and capital plans) " +
        "Then I expect arrays of salaryInMonths, costOfGettingIncome, employeeCapitalPlans, employerCapitalPlans to be initialized for each month " +
        "And other collection to be empty.",
      () => {
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
      }
    );

    describe("calculate()", () => {
      test("Given Calculator with salary's input data Then I expect result to be exact to precalculated values.", () => {
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
    });
  });
});
