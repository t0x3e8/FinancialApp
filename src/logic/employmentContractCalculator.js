import _ from "underscore";

class EmploymentContractCalculator {
  constructor(contractData) {
    if (_.isNull(contractData) || _.isUndefined(contractData)) {
      contractData = {};
    }

    this.salaryInMonths =
      _.isNull(contractData.salaryInMonths) || _.isUndefined(contractData.salaryInMonths)
        ? []
        : contractData.salaryInMonths;
    this.accSalaryinMonths = [];

    this.calculate();
  }

  calculateAccumulatedSalaries() {
    var salaryAcc = 0;

    _.each(this.salaryInMonths, (salary, index) => {
      salaryAcc += salary;
      this.accSalaryinMonths[index] = salaryAcc;
    });
  }

  calculate() {
    this.calculateAccumulatedSalaries();
  }
}

export default EmploymentContractCalculator;
