<template>
  <div>
    <form class="needs-validation" novalidate>
      <div class="form-row">
        <div class="col-md-4 mb-3">
          <label for="monthlySalary">Miesięczne wynagrodzenie brutto:</label>
          <input id="monthlySalary" v-model.number="grossSalary" type="number" class="form-control" placeholder="Wynagrodzenie brutto" required />
          <div class="valid-feedback">OK.</div>
        </div>
      </div>
      <button class="btn btn-primary" type="button" @click="calculate">Kalkuluj</button>
    </form>
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Miesiąc</th>
            <th scope="col">Wynagrodzenie</th>
            <th scope="col">Emerytalna</th>
            <th scope="col">Rentowa</th>
            <th scope="col">Chorobowa</th>
            <th scope="col">Zdrowotna</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in monthSalaryData" :key="item.id">
            <td scope="row">{{ item.month }}</td>
            <th>{{ item.salary }}</th>
            <td>{{ item.retirement }}</td>
            <td>{{ item.disability}}</td>
            <td>{{ item.sickness }}</td>
            <td>{{ item.health }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import { reactive, computed  } from "vue";
  import EmploymentContractCalculator from "../src/logic/employmentContractCalculator.js";

  export default {
    setup() {
      const calculator = reactive(new EmploymentContractCalculator());
      const grossSalary = reactive(3400);

      const calculate = () => {
        calculator.setSalary(grossSalary);
        
        console.log(calculator.accSalaryinMonths[2]);
      }

      const monthSalaryData = computed(() => {
        const data = [];
        const monthNames = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czewiec",
  "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"
];

        for(var i=0; i<12; i++) {
          data[i] = {
            month: monthNames[i],
            salary: calculator.salaryInMonths[i],
            retirement: calculator.socialInsurance.retirementInsurance[i],
            disability: calculator.socialInsurance.disabilityInsurance[i],
            sickness: calculator.socialInsurance.sicknessInsurance[i],
            health: calculator.socialInsurance.healthInsurance[i],
          }
        }
        return data;
      })

      return {
        monthSalaryData,
        grossSalary,
        calculate,
      };
    },
  };


  //   setup
  //   data() {
  //     return {
  //       calculator: new EmploymentContractCalculator()
  //     };
  //   },
  //   methods: {
  //    
  //     }
  //   }
  // };
</script>
