import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
import { CONTACT_METHODS, EXPERIENCE_OPTIONS, ROLES, REGIONS } from "../constants/formOptions.js";

dayjs.extend(customParseFormat);
const letter = /[\p{Script=Latin}\p{Script=Cyrillic}]/u;
const nameCharacters = /^[\p{Script=Latin}\p{Script=Cyrillic}\p{M} '-]+$/u;
const emailPattern = /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/;
const mimeByExtension = { jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", pdf: "application/pdf" };

export function validateForm(values, now = dayjs()) {
  const errors = {};
  const name = values.name.normalize("NFC");
  if (!name.trim()) errors.name = "กรุณากรอกชื่อ";
  else if ([...name].length < 2 || [...name].length > 50) errors.name = "ชื่อต้องมี 2–50 ตัวอักษร";
  else if (!nameCharacters.test(name) || !letter.test(name))
    errors.name = "ชื่อใช้ได้เฉพาะอักษร Latin/Cyrillic ช่องว่าง ขีดกลาง และ apostrophe ห้ามใช้ตัวเลข";
  if (!values.email.trim()) errors.email = "กรุณากรอกอีเมล";
  else if (values.email.length > 100) errors.email = "อีเมลยาวเกิน 100 ตัวอักษร";
  else if (!emailPattern.test(values.email)) errors.email = "รูปแบบอีเมลไม่ถูกต้อง เช่น test@example.com";
  if (!values.phone.trim()) errors.phone = "กรุณากรอกเบอร์โทร";
  else if (values.phone.length > 15 || !/^[0-9+ -]+$/.test(values.phone) || !/[0-9]/.test(values.phone))
    errors.phone = "เบอร์โทรต้องมีตัวเลข ใช้ได้เฉพาะตัวเลข + - และช่องว่าง ไม่เกิน 15 ตัวอักษร";
  else if (values.phone.replace(/[^0-9]/g, "").length !== 10)
    errors.phone = "กรุณากรอกเบอร์โทรให้ครบ 10 หลัก";
  const birth = dayjs.isDayjs(values.dob) ? values.dob :
    dayjs(values.dob || "", "DD/MM/YYYY", true);
  const today = dayjs(now).startOf("day");
  if (!values.dob) errors.dob = "กรุณากรอกวันเกิด";
  else if (!birth.isValid()) errors.dob = "วันที่ไม่ถูกต้อง กรุณาใช้รูปแบบ DD/MM/YYYY";
  else if (!birth.startOf("day").add(18, "year").isBefore(today))
    errors.dob = "อายุต่ำเกินไป (ต้องมากกว่า 18 ปี)";
  else if (!birth.startOf("day").add(70, "year").isAfter(today))
    errors.dob = "แก่เกินไป (ต้องน้อยกว่า 70 ปี)";
  if (!EXPERIENCE_OPTIONS.includes(values.exp)) errors.exp = "กรุณาเลือกระดับประสบการณ์";
  if (!Array.isArray(values.roles) || !values.roles.length || values.roles.some(role => !ROLES.includes(role)))
    errors.roles = "กรุณาเลือกบทบาทอย่างน้อย 1 รายการ";
  if (!REGIONS.includes(values.region)) errors.region = "กรุณาเลือกภูมิภาค 1 รายการ";
  if (!Number.isFinite(values.salary) || values.salary < 0 || values.salary > 1700 || values.salary % 10 !== 0)
    errors.salary = "เงินเดือนต้องอยู่ระหว่าง $0–$1700 เพิ่มทีละ $10";
  if (values.contact && !CONTACT_METHODS.includes(values.contact)) errors.contact = "กรุณาเลือกช่องทางติดต่อที่ถูกต้อง";
  if (!values.file) errors.file = "กรุณาเลือกไฟล์ JPG, PNG หรือ PDF";
  else {
    const extension = values.file.name.split(".").pop().toLowerCase();
    if (!mimeByExtension[extension] || (values.file.type && values.file.type !== mimeByExtension[extension]))
      errors.file = "ไฟล์ต้องเป็น JPG, PNG หรือ PDF";
    else if (!values.file.size) errors.file = "ไฟล์ว่าง กรุณาเลือกไฟล์ที่มีข้อมูล";
    else if (values.file.size > 5 * 1024 * 1024) errors.file = "ไฟล์มีขนาดเกิน 5 MB";
  }
  if ([...values.comments].length > 1000) errors.comments = "ความคิดเห็นต้องไม่เกิน 1000 ตัวอักษร";
  if (!values.terms) errors.terms = "กรุณายอมรับ Terms and Conditions";
  return errors;
}
