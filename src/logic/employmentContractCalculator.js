import _ from "underscore";

const SocialInsuranceAnnualLimit = 177660;
const OldTaxThreshold = 85528;
const NewTaxThreshold = 120000;

class EmploymentContractCalculator {
  constructor(contractData) {
    if (_.isNull(contractData) || _.isUndefined(contractData)) {
      contractData = {};
    }

    this.isTaxFreeAmountEnabled = false;
    this.isAbove26YearsOld = false;
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
    this.reliefTaxFree = [];
    this.income = [];
    this.incomeAcc = [];
    this.firstIncomeTaxThreshold = [];
    this.secondIncomeTaxThreshold = [];
    this.taxPrepayment = [];
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

      if (!_.isNull(data.isTaxFreeAmountEnabled) && !_.isUndefined(data.isTaxFreeAmountEnabled)) {
        this.isTaxFreeAmountEnabled = data.isTaxFreeAmountEnabled;
      } else {
        this.isTaxFreeAmountEnabled = false;
      }

      if (!_.isNull(data.isAbove26YearsOld) && !_.isUndefined(data.isAbove26YearsOld)) {
        this.isAbove26YearsOld = data.isAbove26YearsOld;
      } else {
        this.isAbove26YearsOld = false;
      }
    }

    for (var i = 0; i < 12; i++) {
      this.salaryInMonths[i] = salary;
      this.costOfGettingIncome[i] = costOfGettingIncome;
      this.employeeCapitalPlans[i] = Math.round((salary * employeeCapitalPlans) / 100);
      this.employerCapitalPlans[i] = Math.round((salary * employerCapitalPlans) / 100);
    }
  }

  calculateAccumulatedSalaries() {
    var salaryAcc = 0;

    _.each(this.salaryInMonths, (salary, index) => {
      salaryAcc += salary;
      this.accSalaryinMonths[index] = salaryAcc;
    });
  }

  // IF(is26YearsOld && SalaryAcc<=85528+Salary)
  //   0;
  // else
  //   IF(incomeAcc<120000)
  //     Income;
  //   else
  //     IF(incomeAcc >= 120000 && (incomeAcc-120000)<=Income
  //       Income +120000-incomeAcc;
  //     else
  //       0

  // IF(incomeAcc>=120000;
  //   IF(incomeAcc>=120000 && incomeAcc-120000>=income);
  //     income;
  //   else
  //     incomeAcc-120000;
  // else
  //   0

  calculateTax() {
    for (let i = 0; i < 12; i++) {
      this.firstIncomeTaxThreshold[i] = 0;
      this.secondIncomeTaxThreshold[i] = 0;

      if (this.incomeAcc[i] < NewTaxThreshold) {
        this.firstIncomeTaxThreshold[i] = this.income[i];
      } else if (this.incomeAcc[i] >= NewTaxThreshold && this.incomeAcc[i] - NewTaxThreshold <= this.income[i]) {
        // month's income is split between 1st and 2nd tax threshold
        this.firstIncomeTaxThreshold[i] = this.income[i] + NewTaxThreshold - this.incomeAcc[i];
        this.secondIncomeTaxThreshold[i] = this.incomeAcc[i] - NewTaxThreshold;
      } else {
        this.secondIncomeTaxThreshold[i] = this.income[i];
      }

      var isTaxableIncomePositive = this.firstIncomeTaxThreshold[i] > 0 || this.secondIncomeTaxThreshold[i] > 0;
      if (this.isAbove26YearsOld) this.reliefTaxFree[i] = 425;
      else {
        // When age is below 26 and income for taxation is above 0 then relief is 425
        if (isTaxableIncomePositive) this.reliefTaxFree[i] = 425;
        else this.reliefTaxFree[i] = 0;
      }
    }
  }

  calculateRelief(salary) {
    if (salary >= 5701 && salary < 8549) {
      return Math.round((salary * 0.0668 - 380.5) / 0.17);
    } else if (salary >= 8549 && salary < 11141) {
      return Math.round((salary * -0.0735 + 819.08) / 0.17);
    } else {
      return 0;
    }
  }

  calculateIncome() {
    var incomeAcc = 0;
    var income = 0;
    var relief = 0;

    _.each(this.salaryInMonths, (salary, i) => {
      relief = this.calculateRelief(salary);
      income =
        salary -
        this.socialInsurance.retirementInsurance[i] -
        this.socialInsurance.disabilityInsurance[i] -
        this.socialInsurance.sicknessInsurance[i] -
        this.costOfGettingIncome[i] -
        relief;

      incomeAcc += income;
      this.reliefForMiddleClass[i] = relief;
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
    this.calculateTax();
  }
}

export default EmploymentContractCalculator;
