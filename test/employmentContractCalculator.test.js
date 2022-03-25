import EmploymentContractCalculator from "../src/logic/EmploymentContractCalculator";

var eccData = {
  sameSalaryInMonths: {
    salaryInMonths: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
  },
  sameSalaryInMonthsResults: {
    accSalaryinMonths: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200],
  }
};

test("If no input is specified, set the default value", () => {
  const ecc = new EmploymentContractCalculator();

  expect(ecc.salaryInMonths).toEqual(expect.arrayContaining([]));
  expect(ecc.accSalaryinMonths).toHaveLength(0);
});

test("If 'SalaryInMonths' input is specified, set the value", () => {
  const ecc = new EmploymentContractCalculator(eccData.sameSalaryInMonths);

  expect(ecc.salaryInMonths).toHaveLength(12);
  expect(ecc.accSalaryinMonths).toEqual(expect.arrayContaining(eccData.sameSalaryInMonthsResults.accSalaryinMonths));
});
