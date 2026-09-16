import test from "node:test";
import assert from "node:assert/strict";
import dayjs from "dayjs";
import { validateForm } from "../src/utils/validateForm.js";
import { createInitialForm } from "../src/constants/formOptions.js";

const now = dayjs("2026-09-05");
const valid = () => ({ ...createInitialForm(), name: "Peter Ford", email: "test@example.com",
  phone: "+1234567890", dob: dayjs("2000-01-01"), roles: ["Researcher"], region: "Asia",
  file: { name: "id.pdf", type: "application/pdf", size: 100 }, terms: true });
test("valid submission and fresh initial arrays", () => {
  assert.deepEqual(validateForm(valid(), now), {});
  const initial = createInitialForm();
  initial.roles.push("Researcher");
  assert.deepEqual(createInitialForm().roles, []);
});
const bad = {
  name: ["", "   ", "12", "John123", "นายวีรพงศ์", "--", "A", "A".repeat(51), "John!"],
  email: ["", " ", "abc", "a@@example.com", ".a@example.com", "a..b@example.com", "a@-example.com", "a@site", "a".repeat(90) + "@example.com"],
  phone: ["", "   ", "+--", "12abc", "123\t456", "1".repeat(16), "081234567", "08123456789", "081-234-567", "+08123456789"],
  dob: [null, "31/02/2000", "1/1/2000", "2000-01-01", dayjs("invalid"), dayjs("2027-01-01"), dayjs("2008-09-05"), dayjs("2008-09-06"), dayjs("1956-09-05"), dayjs("1956-09-04")],
  exp: [""], roles: [[], ["Unknown"]], region: ["", ["Asia", "Europe"], "Unknown"],
  salary: [-10, 2000, 5, NaN], contact: ["LINE"], comments: ["a".repeat(1001)], terms: [false],
  file: [null, { name: "id.txt", type: "text/plain", size: 1 },
    { name: "id.pdf.exe", type: "application/pdf", size: 1 },
    { name: "id.jpg", type: "application/pdf", size: 1 },
    { name: "id.pdf", type: "application/pdf", size: 5242881 },
    { name: "id.pdf", type: "application/pdf", size: 0 }]
};
for (const [field, values] of Object.entries(bad)) {
  values.forEach((value, i) => test(field + " rejects invalid case " + i, () => {
    assert.ok(validateForm({ ...valid(), [field]: value }, now)[field]);
  }));
}
const good = {
  phone: ["0812345678", "081-234-5678", "081 234 5678", "+0812345678"],
  name: ["Élodie O'Connor", "Іван Петренко", "Anne-Marie", "Jo", "A".repeat(50)],
  dob: [dayjs("2008-09-04"), dayjs("1956-09-06"), "29/02/2000"],
  salary: [0, 1700, 700], roles: [["Medic", "Researcher"]], comments: ["😀".repeat(1000)], contact: [""],
  file: [{ name: "ID.PDF", type: "application/pdf", size: 5242880 }, { name: "id.png", type: "", size: 20 }]
};
for (const [field, values] of Object.entries(good)) {
  values.forEach((value, i) => test(field + " accepts boundary case " + i, () => {
    assert.equal(validateForm({ ...valid(), [field]: value }, now)[field], undefined);
  }));
}
test("leap-day birthday boundaries use calendar years", () => {
  const v = { ...valid(), dob: dayjs("2008-02-29") };
  assert.ok(validateForm(v, dayjs("2026-02-28")).dob);
  assert.equal(validateForm(v, dayjs("2026-03-01")).dob, undefined);
});
