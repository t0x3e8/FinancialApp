import _ from "underscore";

const SocialInsuranceAnnualLimit = 177660;

class EmploymentContractCalculator {
  constructor(contractData) {
    if (_.isNull(contractData) || _.isUndefined(contractData)) {
      contractData = {};
    }

    this.salaryInMonths = [];
    this.accSalaryinMonths = [];
    this.costOfGettingIncome = [];
    this.socialInsurance = {
      retirementInsurance: [],
      disabilityInsurance: [],
      sicknessInsurance: [],
      healthInsurance: [],
      total: [],
    };
    this.employeeCapitalPlans = [];
    this.employerCapitalPlans = [];
    this.reliefForMiddleClass = [];
    this.income = [];
    this.incomeAcc = [];
  }

  setSalary(data) {
    var salary = 0;
    var costOfGettingIncome = 0;
    var employeeCapitalPlans = 0;
    var employerCapitalPlans = 0;

    if (!_.isNull(data) && !_.isUndefined(data)) {
      if (!_.isNull(data.salary) && !_.isUndefined(data.salary)) {
        salary = data.salary;
      }

      if (!_.isNull(data.costOfGettingIncome) && !_.isUndefined(data.costOfGettingIncome)) {
        costOfGettingIncome = data.costOfGettingIncome;
      }

      if (!_.isNull(data.employeeCapitalPlans) && !_.isUndefined(data.employeeCapitalPlans)) {
        employeeCapitalPlans = data.employeeCapitalPlans;
      }

      if (!_.isNull(data.employerCapitalPlans) && !_.isUndefined(data.employerCapitalPlans)) {
        employerCapitalPlans = data.employerCapitalPlans;
      }
    }

    for (var i = 0; i < 12; i++) {
      this.salaryInMonths[i] = salary;
      this.costOfGettingIncome[i] = costOfGettingIncome;
      this.employeeCapitalPlans[i] = (salary * employeeCapitalPlans) / 100;
      this.employerCapitalPlans[i] = (salary * employerCapitalPlans) / 100;
    }
  }

  calculateAccumulatedSalaries() {
    var salaryAcc = 0;

    _.each(this.salaryInMonths, (salary, index) => {
      salaryAcc += salary;
      this.accSalaryinMonths[index] = salaryAcc;
    });
  }
  
  calculateRelief(salary) {
    if (salary >= 5701 && salary < 8549) {
      return Math.round(((salary * 0.0668) - 380.5) / 0.17);
    }
    else if (salary >= 8549 && salary < 11141) {
      return Math.round(((salary * - 0.0735) + 819.08) / 0.17);
    }
    else { 
      return 0;
    }
  }

  calculateIncome() {
    var incomeAcc = 0;
    var income = 0;

    _.each(this.salaryInMonths, (salary, i) => {
      income =
        salary -
        this.socialInsurance.retirementInsurance[i] -
        this.socialInsurance.disabilityInsurance[i] -
        this.socialInsurance.sicknessInsurance[i] -
        this.costOfGettingIncome[i];

      incomeAcc += income;
      this.reliefForMiddleClass[i] = this.calculateRelief(salary);
      this.income[i] = income;
      this.incomeAcc[i] = incomeAcc;
    });
  }

  calculateSocialInsurance() {
    _.each(this.salaryInMonths, (salary, index) => {
      if (this.accSalaryinMonths[index] < SocialInsuranceAnnualLimit) {
        this.socialInsurance.retirementInsurance[index] = Math.round(salary * 0.0976);
        this.socialInsurance.disabilityInsurance[index] = Math.round(salary * 0.015);
      } else {
        var deltaSalary = this.accSalaryinMonths[index] - salary - SocialInsuranceAnnualLimit;
        if (deltaSalary > 0) {
          this.socialInsurance.retirementInsurance[index] = 0;
          this.socialInsurance.disabilityInsurance[index] = 0;
        } else {
          this.socialInsurance.retirementInsurance[index] = -Math.round(deltaSalary * 0.0976);
          this.socialInsurance.disabilityInsurance[index] = -Math.round(deltaSalary * 0.015);
        }
      }

      this.socialInsurance.sicknessInsurance[index] = Math.round(salary * 0.0245);
      this.socialInsurance.healthInsurance[index] = Math.round(
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
    this.calculateSocialInsurance();
    this.calculateIncome();
  }
}

export default EmploymentContractCalculator;
