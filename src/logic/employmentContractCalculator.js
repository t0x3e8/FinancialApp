import _ from "underscore";

const SocialInsuranceAnnualLimit = 177660;

class EmploymentContractCalculator {
  constructor(contractData) {
    if (_.isNull(contractData) || _.isUndefined(contractData)) {
      contractData = {};
    }

    this.salaryInMonths = [];
    this.accSalaryinMonths = [];
    this.socialInsurance = {
      retirementInsurance: [],
      disabilityInsurance: [],
      sicknessInsurance: [],
      healthInsurance: [],
      total: [],
    };
  }

  setSalary(salary) {
    if (_.isNull(salary) || _.isUndefined(salary)) {
      salary = 0;
    }

    for (var i = 0; i < 12; i++) {
      this.salaryInMonths[i] = salary;
    }

    this.calculate();
  }

  calculateAccumulatedSalaries() {
    var salaryAcc = 0;

    _.each(this.salaryInMonths, (salary, index) => {
      salaryAcc += salary;
      this.accSalaryinMonths[index] = salaryAcc;
    });
  }

  calculateSociatInsurance() {
    _.each(this.salaryInMonths, (salary, index) => {
      if (this.accSalaryinMonths[index] < SocialInsuranceAnnualLimit) {
        this.socialInsurance.retirementInsurance[index] = Math.round(salary * 0.0976);
        this.socialInsurance.disabilityInsurance[index] = Math.round(salary * 0.015);
      } else {
        var deltaSalary = salary - this.accSalaryinMonths[index] - SocialInsuranceAnnualLimit;
        if (deltaSalary < 0) {
          this.socialInsurance.retirementInsurance[index] = 0;
          this.socialInsurance.disabilityInsurance[index] = 0;
        } else {
          this.socialInsurance.retirementInsurance[index] = Math.round(deltaSalary * 0.0976);
          this.socialInsurance.disabilityInsurance[index] = Math.round(deltaSalary * 0.015);
        }
      }

      this.socialInsurance.sicknessInsurance[index] = Math.round(salary * 0.0245);
      this.socialInsurance.healthInsurance[index] = Math.floor(
        (salary - this.socialInsurance.retirementInsurance[index] - this.socialInsurance.disabilityInsurance[index] - this.socialInsurance.sicknessInsurance[index]) * 0.09
      );

      this.socialInsurance.total[index] =
        this.socialInsurance.retirementInsurance[index] +
        this.socialInsurance.disabilityInsurance[index] +
        this.socialInsurance.sicknessInsurance[index] +
        this.socialInsurance.healthInsurance[index];
    });
  }

  calculate() {
    this.calculateAccumulatedSalaries();
    this.calculateSociatInsurance();
  }
}

export default EmploymentContractCalculator;
