import { Router } from "express";
var router = Router();

/* GET home page. */
router.get("/", function (req, res) {
  res.render("index", { title: "Salary Calculator" });
});

router.get("/SalaryCalculator", function (req, res) {
  res.render("salarycalculator", { title: "Kalkulator wynagrodzenia 2022" });
});

router.get("/privacypolicy", function (req, res) {
  res.render("privacypolicy", { title: "Privacy Policy" });
});

router.get("/termsandconditions", function (req, res) {
  res.render("termsandconditions", { title: "Terms & Conditions" });
});

export default router;
