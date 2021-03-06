/* global test, expect, describe */

import EmploymentContractCalculator from "../src/logic/employmentContractCalculator.js";
import _ from "underscore";

var eccData = {
  sets: [
    {
      salaryData: { salary: 5000, costOfGettingIncome: 300, employeeCapitalPlans: 1.5, employerCapitalPlans: 2 },
      salaryinMonths: [5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000],
      accSalaryinMonths: [5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000, 55000, 60000],
      retirementInsurance: [488, 488, 488, 488, 488, 488, 488, 488, 488, 488, 488, 488],
      disabilityInsurance: [75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75],
      sicknessInsurance: [122.5, 122.5, 122.5, 122.5, 122.5, 122.5, 122.5, 122.5, 122.5, 122.5, 122.5, 122.5],
      healthInsurance: [388.31, 388.31, 388.31, 388.31, 388.31, 388.31, 388.31, 388.31, 388.31, 388.31, 388.31, 388.31],
      total: [1073.81, 1073.81, 1073.81, 1073.81, 1073.81, 1073.81, 1073.81, 1073.81, 1073.81, 1073.81, 1073.81, 1073.81],
      costOfGettingIncome: [300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300],
      employeeCapitalPlans: [75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75],
      employerCapitalPlans: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
      reliefForMiddleClass: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      income: [4014.5, 4014.5, 4014.5, 4014.5, 4014.5, 4014.5, 4014.5, 4014.5, 4014.5, 4014.5, 4014.5, 4014.5],
      incomeAcc: [4014.5, 8029, 12043.5, 16058, 20072.5, 24087, 28101.5, 32116, 36130.5, 40145, 44159.5, 48174],
      firstIncomeTaxThreshold: [4014.5, 4014.5, 4014.5, 4014.5, 4014.5, 4014.5, 4014.5, 4014.5, 4014.5, 4014.5, 4014.5, 4014.5],
      secondIncomeTaxThreshold: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      taxPrepayment: [257.47, 257.47, 257.47, 257.47, 257.47, 257.47, 257.47, 257.47, 257.47, 257.47, 257.47, 257.47],
      salaryNet: [3593.72, 3593.72, 3593.72, 3593.72, 3593.72, 3593.72, 3593.72, 3593.72, 3593.72, 3593.72, 3593.72, 3593.72],
    },
    {
      salaryData: { salary: 10000, costOfGettingIncome: 300, employeeCapitalPlans: 1.5, employerCapitalPlans: 2 },
      salaryinMonths: [10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],
      accSalaryinMonths: [10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000, 110000, 120000],
      retirementInsurance: [976, 976, 976, 976, 976, 976, 976, 976, 976, 976, 976, 976],
      disabilityInsurance: [150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150],
      sicknessInsurance: [245, 245, 245, 245, 245, 245, 245, 245, 245, 245, 245, 245],
      healthInsurance: [776.61, 776.61, 776.61, 776.61, 776.61, 776.61, 776.61, 776.61, 776.61, 776.61, 776.61, 776.61],
      total: [2147.61, 2147.61, 2147.61, 2147.61, 2147.61, 2147.61, 2147.61, 2147.61, 2147.61, 2147.61, 2147.61, 2147.61],
      costOfGettingIncome: [300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300],
      employeeCapitalPlans: [150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150],
      employerCapitalPlans: [200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200],
      reliefForMiddleClass: [494.59, 494.59, 494.59, 494.59, 494.59, 494.59, 494.59, 494.59, 494.59, 494.59, 494.59, 494.59],
      income: [7834.41, 7834.41, 7834.41, 7834.41, 7834.41, 7834.41, 7834.41, 7834.41, 7834.41, 7834.41, 7834.41, 7834.41],
      incomeAcc: [7834.41, 15668.82, 23503.23, 31337.64, 39172.05, 47006.46, 54840.87, 62675.28, 70509.69, 78344.1, 86178.51, 94012.92],
      firstIncomeTaxThreshold: [7834.41, 7834.41, 7834.41, 7834.41, 7834.41, 7834.41, 7834.41, 7834.41, 7834.41, 7834.41, 7834.41, 7834.41],
      secondIncomeTaxThreshold: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      taxPrepayment: [906.85, 906.85, 906.85, 906.85, 906.85, 906.85, 906.85, 906.85, 906.85, 906.85, 906.85, 906.85],
      salaryNet: [6795.54, 6795.54, 6795.54, 6795.54, 6795.54, 6795.54, 6795.54, 6795.54, 6795.54, 6795.54, 6795.54, 6795.54],
    },
    {
      salaryData: { salary: 20000, costOfGettingIncome: 250, employeeCapitalPlans: 0.5, employerCapitalPlans: 1 },
      salaryinMonths: [20000, 20000, 20000, 20000, 20000, 20000, 20000, 20000, 20000, 20000, 20000, 20000],
      accSalaryinMonths: [20000, 40000, 60000, 80000, 100000, 120000, 140000, 160000, 180000, 200000, 220000, 240000],
      retirementInsurance: [1952, 1952, 1952, 1952, 1952, 1952, 1952, 1952, 1723.62, 0, 0, 0],
      disabilityInsurance: [300, 300, 300, 300, 300, 300, 300, 300, 264.9, 0, 0, 0],
      sicknessInsurance: [490, 490, 490, 490, 490, 490, 490, 490, 490, 490, 490, 490],
      healthInsurance: [1553.22, 1553.22, 1553.22, 1553.22, 1553.22, 1553.22, 1553.22, 1553.22, 1576.93, 1755.9, 1755.9, 1755.9],
      total: [4295.22, 4295.22, 4295.22, 4295.22, 4295.22, 4295.22, 4295.22, 4295.22, 4055.45, 2245.9, 2245.9, 2245.9],
      costOfGettingIncome: [250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250],
      employeeCapitalPlans: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
      employerCapitalPlans: [200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200],
      reliefForMiddleClass: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      income: [17008, 17008, 17008, 17008, 17008, 17008, 17008, 17008, 17271.48, 19260, 19260, 19260],
      incomeAcc: [17008, 34016, 51024, 68032, 85040, 102048, 119056, 136064, 153335.48, 172595.48, 191855.48, 211115.48],
      firstIncomeTaxThreshold: [17008, 17008, 17008, 17008, 17008, 17008, 17008, 944, 0, 0, 0, 0],
      secondIncomeTaxThreshold: [0, 0, 0, 0, 0, 0, 0, 16064, 17271.48, 19260, 19260, 19260],
      taxPrepayment: [2466.36, 2466.36, 2466.36, 2466.36, 2466.36, 2466.36, 2466.36, 4875.96, 5101.87, 5738.2, 5738.2, 5738.2],
      salaryNet: [13138.42, 13138.42, 13138.42, 13138.42, 13138.42, 13138.42, 13138.42, 10728.82, 10742.68, 11915.9, 11915.9, 11915.9],
    },
  ],
  taxSets: [
    {
      salaryData: { salary: 3500, costOfGettingIncome: 250 },
      sumOfFirstIncomeTaxThreshold: 33242,
      sumOfSecondIncomeTaxThreshold: 0,
      sumOfTaxPrepayment: 551,
    },
    {
      salaryData: { salary: 3500, costOfGettingIncome: 250, isTaxFreeAmountEnabled: false },
      sumOfFirstIncomeTaxThreshold: 33242,
      sumOfSecondIncomeTaxThreshold: 0,
      sumOfTaxPrepayment: 5651,
    },
    {
      salaryData: { salary: 3500, costOfGettingIncome: 250, isAbove26YearsOld: false, isTaxFreeAmountEnabled: false },
      sumOfFirstIncomeTaxThreshold: 0,
      sumOfSecondIncomeTaxThreshold: 0,
      sumOfTaxPrepayment: 0,
    },
    {
      salaryData: { salary: 7000, costOfGettingIncome: 300 },
      sumOfFirstIncomeTaxThreshold: 62735,
      sumOfSecondIncomeTaxThreshold: 0,
      sumOfTaxPrepayment: 5565,
    },
    {
      salaryData: { salary: 7000, costOfGettingIncome: 300, isTaxFreeAmountEnabled: false },
      sumOfFirstIncomeTaxThreshold: 62735,
      sumOfSecondIncomeTaxThreshold: 0,
      sumOfTaxPrepayment: 10665,
    },
    {
      salaryData: { salary: 7000, costOfGettingIncome: 300, isAbove26YearsOld: false, isTaxFreeAmountEnabled: false },
      sumOfFirstIncomeTaxThreshold: 0,
      sumOfSecondIncomeTaxThreshold: 0,
      sumOfTaxPrepayment: 0,
    },
    {
      salaryData: { salary: 10000, costOfGettingIncome: 300 },
      sumOfFirstIncomeTaxThreshold: 94013,
      sumOfSecondIncomeTaxThreshold: 0,
      sumOfTaxPrepayment: 10882,
    },
    {
      salaryData: { salary: 10000, costOfGettingIncome: 300, isTaxFreeAmountEnabled: false },
      sumOfFirstIncomeTaxThreshold: 94013,
      sumOfSecondIncomeTaxThreshold: 0,
      sumOfTaxPrepayment: 15982,
    },
    {
      salaryData: { salary: 10000, costOfGettingIncome: 300, isAbove26YearsOld: false, isTaxFreeAmountEnabled: false },
      sumOfFirstIncomeTaxThreshold: 8485,
      sumOfSecondIncomeTaxThreshold: 0,
      sumOfTaxPrepayment: 1442,
    },
    {
      salaryData: { salary: 20000, costOfGettingIncome: 300, isAbove26YearsOld: false },
      sumOfFirstIncomeTaxThreshold: 34472,
      sumOfSecondIncomeTaxThreshold: 90515,
      sumOfTaxPrepayment: 31850,
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
    expect(ecc.firstIncomeTaxThreshold).toHaveLength(0);
    expect(ecc.secondIncomeTaxThreshold).toHaveLength(0);
    expect(ecc.taxPrepayment).toHaveLength(0);
    expect(ecc.salaryNet).toHaveLength(0);
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
    expect(ecc.firstIncomeTaxThreshold).toHaveLength(0);
    expect(ecc.secondIncomeTaxThreshold).toHaveLength(0);
    expect(ecc.taxPrepayment).toHaveLength(0);
    expect(ecc.salaryNet).toHaveLength(0);
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
  test("Given salary of 7568  then I expect relief of 0.", () => expect(ecc.calculateRelief(7568)).toBe(735.54));
  test("Given salary of 8548 then I expect relief of 0.", () => expect(ecc.calculateRelief(8548)).toBe(1120.63));
  test("Given salary of 8549 then I expect relief of 0.", () => expect(ecc.calculateRelief(8549)).toBe(1121.93));
  test("Given salary of 10000 then I expect relief of 0.", () => expect(ecc.calculateRelief(10000)).toBe(494.59));
  test("Given salary of 11140 then I expect relief of 0.", () => expect(ecc.calculateRelief(11140)).toBe(1.71));
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
        expect(ecc.reliefForMiddleClass).toHaveLength(0);
        expect(ecc.income).toHaveLength(0);
        expect(ecc.incomeAcc).toHaveLength(0);
        expect(ecc.firstIncomeTaxThreshold).toHaveLength(0);
        expect(ecc.secondIncomeTaxThreshold).toHaveLength(0);
        expect(ecc.taxPrepayment).toHaveLength(0);
        expect(ecc.salaryNet).toHaveLength(0);
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
        expect(ecc.reliefForMiddleClass).toEqual(expect.arrayContaining(eccInput.reliefForMiddleClass));
        expect(ecc.income).toEqual(expect.arrayContaining(eccInput.income));
        expect(ecc.incomeAcc).toEqual(expect.arrayContaining(eccInput.incomeAcc));
        expect(ecc.firstIncomeTaxThreshold).toEqual(expect.arrayContaining(eccInput.firstIncomeTaxThreshold));
        expect(ecc.secondIncomeTaxThreshold).toEqual(expect.arrayContaining(eccInput.secondIncomeTaxThreshold));
        expect(ecc.taxPrepayment).toEqual(expect.arrayContaining(eccInput.taxPrepayment));
        expect(ecc.salaryNet).toEqual(expect.arrayContaining(eccInput.salaryNet));
      });
    });
  });
});

describe("calculateTax()", () => {
  const ecc = new EmploymentContractCalculator();
  const sum = (array) => Math.round(_.reduce(array, (a, b) => a + b));

  test.each(eccData.taxSets)("Given month's income with settings and Then I expect tax to be exact", (item) => {
    ecc.setSalary(item.salaryData);
    ecc.calculate();
    expect(sum(ecc.firstIncomeTaxThreshold)).toBe(item.sumOfFirstIncomeTaxThreshold);
    expect(sum(ecc.secondIncomeTaxThreshold)).toBe(item.sumOfSecondIncomeTaxThreshold);
    expect(sum(ecc.taxPrepayment)).toBe(item.sumOfTaxPrepayment);
  });
});
