import _ from "underscore";

const SocialInsuranceAnnualLimit = 177660;
const OldTaxThreshold = 85528;
const TaxThreshold = 120000;
const round = (number, decimalPlaces) => {
  if (isNaN(number)) return 0;

  const factor = Math.pow(10, decimalPlaces);
  return Math.round((number + Number.EPSILON) * factor) / factor;
};

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
        this.isTaxFreeAmountEnabled = true;
      }

      if (!_.isNull(data.isAbove26YearsOld) && !_.isUndefined(data.isAbove26YearsOld)) {
        this.isAbove26YearsOld = data.isAbove26YearsOld;
      } else {
        this.isAbove26YearsOld = true;
      }
    }

    for (var i = 0; i < 12; i++) {
      this.salaryInMonths[i] = salary;
      this.costOfGettingIncome[i] = costOfGettingIncome;
      this.employeeCapitalPlans[i] = round(salary * employeeCapitalPlans, 2) / 100;
      this.employerCapitalPlans[i] = round(salary * employerCapitalPlans, 2) / 100;
    }
  }

  calculateAccumulatedSalaries() {
    var salaryAcc = 0;

    _.each(this.salaryInMonths, (salary, index) => {
      salaryAcc += salary;
      this.accSalaryinMonths[index] = salaryAcc;
    });
  }

  calculateTax() {
    for (let i = 0; i < 12; i++) {
      this.firstIncomeTaxThreshold[i] = 0;
      this.secondIncomeTaxThreshold[i] = 0;
      let reliefTaxFree = 0;

      if (this.isAbove26YearsOld) {
        if (this.incomeAcc[i] < TaxThreshold) {
          this.firstIncomeTaxThreshold[i] = this.income[i];
        } else if (this.incomeAcc[i] >= TaxThreshold && this.incomeAcc[i] - TaxThreshold <= this.income[i]) {
          // month's income is split between 1st and 2nd tax threshold
          this.firstIncomeTaxThreshold[i] = this.income[i] + TaxThreshold - this.incomeAcc[i];
          this.secondIncomeTaxThreshold[i] = this.incomeAcc[i] - TaxThreshold;
        } else {
          this.secondIncomeTaxThreshold[i] = this.income[i];
        }
      } else {
        if (this.incomeAcc[i] >= OldTaxThreshold && this.incomeAcc[i] - OldTaxThreshold <= this.income[i]) {
          this.firstIncomeTaxThreshold[i] = this.incomeAcc[i] - OldTaxThreshold;
        }
        else if (this.incomeAcc[i] >= OldTaxThreshold) {
          this.firstIncomeTaxThreshold[i] = this.income[i];
        }
      }

      if (this.isTaxFreeAmountEnabled) {
        const sumOfTaxThreshold = this.firstIncomeTaxThreshold[i] + this.secondIncomeTaxThreshold[i];
        if (sumOfTaxThreshold > 0) {
          reliefTaxFree = 425;
        }
      }

      const taxPrepayment = round(this.firstIncomeTaxThreshold[i] * 0.17 + this.secondIncomeTaxThreshold[i] * 0.32 - reliefTaxFree, 2);
      this.taxPrepayment[i] = (taxPrepayment < 0) ? taxPrepayment + reliefTaxFree : taxPrepayment;
      this.reliefTaxFree[i] = reliefTaxFree;
    }
  }

  calculateRelief(salary) {
    if (salary >= 5701 && salary < 8549) {
      return round((salary * 0.0668 - 380.5) / 0.17, 2);
    } else if (salary >= 8549 && salary < 11141) {
      return round((salary * -0.0735 + 819.08) / 0.17, 2);
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

      // Fix: Extra rounding because for some numbers, it gives nasty ending of '.000000001'
      incomeAcc = round(incomeAcc + income, 2);
      this.reliefForMiddleClass[i] = relief;
      this.income[i] = income;
      this.incomeAcc[i] = incomeAcc;
    });
  }

  calculateSocialInsurance() {
    _.each(this.salaryInMonths, (salary, index) => {
      if (this.accSalaryinMonths[index] < SocialInsuranceAnnualLimit) {
        this.socialInsurance.retirementInsurance[index] = round(salary * 0.0976, 2);
        this.socialInsurance.disabilityInsurance[index] = round(salary * 0.015, 2);
      } else {
        var deltaSalary = this.accSalaryinMonths[index] - salary - SocialInsuranceAnnualLimit;
        if (deltaSalary > 0) {
          this.socialInsurance.retirementInsurance[index] = 0;
          this.socialInsurance.disabilityInsurance[index] = 0;
        } else {
          this.socialInsurance.retirementInsurance[index] = round(-deltaSalary * 0.0976, 2);
          this.socialInsurance.disabilityInsurance[index] = round(-deltaSalary * 0.015, 2);
        }
      }

      this.socialInsurance.sicknessInsurance[index] = round(salary * 0.0245, 2);
      this.socialInsurance.healthInsurance[index] = round(
        (salary - this.socialInsurance.retirementInsurance[index] - this.socialInsurance.disabilityInsurance[index] - this.socialInsurance.sicknessInsurance[index]) * 0.09,
        2
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
