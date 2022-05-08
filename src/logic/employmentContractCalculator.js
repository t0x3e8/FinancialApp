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

    this.resetData();
  }

  resetData() {
    this.isTaxFreeAmountEnabled = false;
    this.isAbove26YearsOld = true;
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
    this.salaryNet = [];
  }

  setSalary(data) {
    this.resetData();
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
    let zeroIncomeTaxThreshold = [];

    const calcZeroTaxThreshold = (incomeAcc, income, threshold) => {
      if ((threshold - incomeAcc) >= 0) return income;
      else {
        if (income + threshold - incomeAcc < 0) return 0;
        else return income + threshold - incomeAcc;
      }
    };

    const calcFirstTaxThreshold = (incomeAcc, income, incomeInZeroThreshold, threshold) => {
      if ((incomeAcc - income) >= threshold) return 0;
      else {
        if (incomeAcc - threshold < 0) return income - incomeInZeroThreshold;
        else return income - (incomeAcc - threshold);
      }
    };

    const calcSecondTaxThreshold = (incomeAcc, income, incomeInFirstThreshold, threshold) => {
      if ((incomeAcc - threshold) < 0) return 0;
      else {
        if ((incomeAcc - threshold) > income) return income;
        else return income - incomeInFirstThreshold;
      }
    };

    for (let i = 0; i < 12; i++) {
      let reliefTaxFree = 0;

      zeroIncomeTaxThreshold[i] = calcZeroTaxThreshold(this.incomeAcc[i], this.income[i], OldTaxThreshold);
      this.firstIncomeTaxThreshold[i] = calcFirstTaxThreshold(this.incomeAcc[i], this.income[i], zeroIncomeTaxThreshold[i], TaxThreshold);
      this.secondIncomeTaxThreshold[i] = calcSecondTaxThreshold(this.incomeAcc[i], this.income[i], this.firstIncomeTaxThreshold[i], TaxThreshold);

      if (this.isAbove26YearsOld) {
        this.firstIncomeTaxThreshold[i] = this.firstIncomeTaxThreshold[i] + zeroIncomeTaxThreshold[i];
      }

      if (this.isTaxFreeAmountEnabled) {
        const sumOfTaxThreshold = this.firstIncomeTaxThreshold[i] + this.secondIncomeTaxThreshold[i];
        if (sumOfTaxThreshold > 0) {
          reliefTaxFree = 425;
        }
      }

      const taxPrepayment = round(this.firstIncomeTaxThreshold[i] * 0.17 + this.secondIncomeTaxThreshold[i] * 0.32 - reliefTaxFree, 2);
      this.taxPrepayment[i] = taxPrepayment < 0 ? taxPrepayment + reliefTaxFree : taxPrepayment;
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

  calculateSalaryNet() {
    for (let i = 0; i < 12; i++) {
      this.salaryNet[i] = round(this.salaryInMonths[i] - this.socialInsurance.total[i] - this.employeeCapitalPlans[i] - this.taxPrepayment[i], 2)
    }
  }

  calculate() {
    this.calculateAccumulatedSalaries();
    this.calculateSocialInsurance();
    this.calculateIncome();
    this.calculateTax();
    this.calculateSalaryNet();
  }
}

export default EmploymentContractCalculator;
