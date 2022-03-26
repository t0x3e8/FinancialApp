import EmploymentContractCalculator from "../src/logic/employmentContractCalculator.js";

var eccData = {
  sameSalaryInMonths: {
    salaryInMonths: [5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000],
  },
  sameSalaryInMonthsResults: {
    accSalaryinMonths: [5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000, 55000, 60000],
    retirementInsurance: [488, 488, 488, 488, 488, 488, 488, 488, 488, 488, 488, 488],
    disabilityInsurance: [75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75],
    sicknessInsurance: [123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123],
    healthInsurance: [388, 388, 388, 388, 388, 388, 388, 388, 388, 388, 388, 388],
    total: [1074, 1074, 1074, 1074, 1074, 1074, 1074, 1074, 1074, 1074, 1074, 1074],
  },
};

test("If no input is specified, set the default values.", () => {
  const ecc = new EmploymentContractCalculator();

  expect(ecc.salaryInMonths).toEqual(expect.arrayContaining([]));
  expect(ecc.accSalaryinMonths).toHaveLength(0);
});

test("If 'SalaryInMonths' input is specified, calculate 'accSalaryinMonths', 'socialInsurance'.", () => {
  const ecc = new EmploymentContractCalculator(eccData.sameSalaryInMonths);

  expect(ecc.salaryInMonths).toHaveLength(12);
  expect(ecc.accSalaryinMonths).toEqual(expect.arrayContaining(eccData.sameSalaryInMonthsResults.accSalaryinMonths));
  expect(ecc.socialInsurance.retirementInsurance).toEqual(expect.arrayContaining(eccData.sameSalaryInMonthsResults.retirementInsurance));
  expect(ecc.socialInsurance.disabilityInsurance).toEqual(expect.arrayContaining(eccData.sameSalaryInMonthsResults.disabilityInsurance));
  expect(ecc.socialInsurance.sicknessInsurance).toEqual(expect.arrayContaining(eccData.sameSalaryInMonthsResults.sicknessInsurance));
  expect(ecc.socialInsurance.healthInsurance).toEqual(expect.arrayContaining(eccData.sameSalaryInMonthsResults.healthInsurance));
  expect(ecc.socialInsurance.total).toEqual(expect.arrayContaining(eccData.sameSalaryInMonthsResults.total));
});
