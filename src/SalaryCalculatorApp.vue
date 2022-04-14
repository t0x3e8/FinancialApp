<template>
  <div>
    <form class="needs-validation" novalidate>
      <div class="form-group row mb-3">
        <label for="monthlySalary" class="col-md-4 col-12 col-form-label-lg">Miesięczne wynagrodzenie brutto:</label>
        <div class="col-md-2 col-sm-4 col-5 d-flex align-items-center">
          <currency-input id="monthlySalary" v-model="grossSalary" :options="{ currency: 'PLN' }" class="form-control form-control-lg" required />
        </div>
      </div>
      <div class="form-group row mb-3">
        <label for="costOfGettingIncome" class="col-12 col-md-4 col-form-label-lg">Koszty Uzyskania Przychodu (KUP):</label>
        <div class="col-md-2 col-sm-4 col-5 d-flex align-items-center">
          <select id="costOfGettingIncome" v-model="costOfGettingIncome" class="form-control form-control-lg">
            <option selected value="250">250 zł</option>
            <option value="300">300 zł</option>
          </select>
        </div>
        <div class="col-sm-1 col-2 p-0 m-1 d-flex justify-content-left">
          <button class="btn btn-sm" type="button" data-bs-toggle="collapse" data-bs-target="#costOfGettingIncomeCollapse" aria-controls="costOfGettingIncomeCollapse">
            <svg class="bi bi-exclamation-triangle text-secondary" width="24" height="24" fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.05.435zM5.495 6.033a.237.237 0 0 1-.24-.247C5.35 4.091 6.737 3.5 8.005 3.5c1.396 0 2.672.73 2.672 2.24 0 1.08-.635 1.594-1.244 2.057-.737.559-1.01.768-1.01 1.486v.105a.25.25 0 0 1-.25.25h-.81a.25.25 0 0 1-.25-.246l-.004-.217c-.038-.927.495-1.498 1.168-1.987.59-.444.965-.736.965-1.371 0-.825-.628-1.168-1.314-1.168-.803 0-1.253.478-1.342 1.134-.018.137-.128.25-.266.25h-.825zm2.325 6.443c-.584 0-1.009-.394-1.009-.927 0-.552.425-.94 1.01-.94.609 0 1.028.388 1.028.94 0 .533-.42.927-1.029.927z"
              />
            </svg>
          </button>
        </div>
        <div id="costOfGettingIncomeCollapse" class="row collapse">
          <p class="card card-body border-light">
            Pracownik mieszkający w miejscowości, w której wykonuje pracę zarobkową 250 zł miesięcznie. <br />
            Pracownik mieszkający – stale bądź tymczasowo – poza miejscowością, w której wykonuje pracę zarobkową 300 zł miesięcznie.
          </p>
        </div>
      </div>
      <div class="form-group row mb-3">
        <label for="26yearsoldCheckbox" class="col-md-4 col-6 col-form-label-lg">Czy ukończony 26 rok życia?</label>
        <div class="col-md-1 col-4 d-flex justify-content-left align-items-center">
          <div class="form-check">
            <input id="26yearsoldCheckbox" v-model="is26YearsOld" class="form-check-input position-static" type="checkbox" value="" />
          </div>
        </div>
      </div>
      <div class="form-group row mb-3">
        <label for="employeeCapitalPlansCheckbox" class="col-md-4 col-6 col-form-label-lg">Pracowniczy plan kapitałowy (PPK)?</label>
        <div class="col-md-1 col-4 d-flex justify-content-left align-items-center">
          <div class="form-check">
            <input id="employeeCapitalPlansCheckbox" v-model="isEmployeeCapitalPlans" class="form-check-input position-static" type="checkbox" value="" />
          </div>
        </div>

        <div v-show="isEmployeeCapitalPlans">
          <div class="form-group row mb-3 d-flex">
            <div class="justify-content-right col-md-2 col-12 offset-md-1">
              <label class="col-form-label-sm" for="employeeCapitalPlansRanger">% wymiar składki pracownika</label>
            </div>
            <div class="col-md-1 col-4 d-flex align-items-center">
              <input id="employeeCapitalPlansRanger" v-model="employeeCapitalPlansLevel" class="form-range" type="range" min="2" max="4" step="0.5" />
            </div>
            <output class="col-md-1 col-1 d-flex align-items-center">{{ employeeCapitalPlansLevel }}%</output>
            <div class="justify-content-right col-md-2 col-12">
              <label class="col-form-label-sm" for="employerCapitalPlansRanger">% wymiar składki pracodawcy</label>
            </div>
            <div class="col-md-1 col-4 d-flex align-items-center">
              <input id="employerCapitalPlansRanger" v-model="employerCapitalPlansLevel" class="form-range" type="range" min="1.5" max="4" step="0.5" />
            </div>
            <output class="col-md-1 col-1 d-flex align-items-center">{{ employerCapitalPlansLevel }}%</output>
          </div>
        </div>
      </div>
      <div class="col-md-4 col-12 offset-md-4 pb-2">
        <button class="btn btn-primary btn-lg" type="button" @click="calculate">Oblicz</button>
      </div>
      <hr />
    </form>

    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <!-- TODO: Add collapsing columns of social insurance -->
            <th scope="col">Miesiąc</th>
            <th scope="col">Wynagrodzenie</th>
            <th scope="col">Emerytalna</th>
            <th scope="col">Rentowa</th>
            <th scope="col">Chorobowa</th>
            <th scope="col">Zdrowotna</th>
            <th scope="col">KUP</th>
            <th scope="col">PPK</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in monthSalaryData" :key="item.id">
            <td scope="row">{{ item.month }}</td>
            <th>{{ item.salary }}</th>
            <td>{{ item.retirement }}</td>
            <td>{{ item.disability }}</td>
            <td>{{ item.sickness }}</td>
            <td>{{ item.health }}</td>
            <td>{{ item.costOfGettingIncome }}</td>
            <td>{{ item.employeeCapitalPlans }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import EmploymentContractCalculator from "../src/logic/employmentContractCalculator.js";
  import CurrencyInput from "./CurrencyInput.vue";

  export default {
    name: "SalaryCalculatorApp",
    components: { CurrencyInput },
    data() {
      return {
        grossSalary: 3400,
        costOfGettingIncome: 250,
        is26YearsOld: false,
        isEmployeeCapitalPlans: false,
        employeeCapitalPlansLevel: 2,
        employerCapitalPlansLevel: 1.5,
        formatter: new Intl.NumberFormat("pl-PL", {
          style: "currency",
          currency: "PLN",
        }),
        calculator: new EmploymentContractCalculator(),
      };
    },
    computed: {
      monthSalaryData() {
        const data = [];
        const monthNames = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czewiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];

        for (var i = 0; i < 12; i++) {
          data[i] = {
            month: monthNames[i],
            salary: this.formatter.format(this.calculator.salaryInMonths[i]),
            retirement: this.formatter.format(this.calculator.socialInsurance.retirementInsurance[i]),
            disability: this.formatter.format(this.calculator.socialInsurance.disabilityInsurance[i]),
            sickness: this.formatter.format(this.calculator.socialInsurance.sicknessInsurance[i]),
            health: this.formatter.format(this.calculator.socialInsurance.healthInsurance[i]),
            costOfGettingIncome: this.formatter.format(this.calculator.costOfGettingIncome[i]),
            employeeCapitalPlans: this.formatter.format(this.calculator.employeeCapitalPlans[i]),
          };
        }
        return data;
      },
    },
    mounted() {
      this.calculator.setSalary(this.buildSalaryData());
      this.calculator.calculate();
    },
    methods: {
      buildSalaryData() {
        const salaryData = {
          salary: this.grossSalary,
          costOfGettingIncome: this.costOfGettingIncome,
          employeeCapitalPlans: this.employeeCapitalPlansLevel,
          employerCapitalPlans: this.employerCapitalPlansLevel
        };

        return salaryData;
      },

      calculate() {
        this.calculator.setSalary(this.buildSalaryData());
        this.calculator.calculate();
      },
    },
  };
</script>
