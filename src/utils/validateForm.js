import dayjs from "dayjs";
import { FILE_TYPES } from "../constants/formOptions";

export function validateForm(values) {
  const errors = {};
  if (!/^[A-Za-zА-Яа-яЁё0-9 '\-]{2,50}$/.test(values.name)) errors.name = "ชื่อไม่ถูกต้อง (2–50 ตัวอักษร)";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) || values.email.length > 100) errors.email = "อีเมลไม่ถูกต้องหรือยาวเกิน 100 ตัวอักษร";
  if (!/^[0-9+\-\s]{1,15}$/.test(values.phone)) errors.phone = "เบอร์โทรไม่ถูกต้องหรือยาวเกิน 15 ตัวอักษร";
  const birth = values.dob && dayjs.isDayjs(values.dob) ? values.dob : dayjs("invalid");
  const age = birth.isValid() ? dayjs().diff(birth, "year") : 0;
  if (!birth.isValid()) errors.dob = "กรุณากรอกวันที่ในรูปแบบ DD/MM/YYYY";
  else if (age <= 18) errors.dob = "อายุต่ำเกินไป (ต้องมากกว่า 18 ปี)";
  else if (age >= 70) errors.dob = "แก่เกินไป (ต้องน้อยกว่า 70 ปี)";
  if (!values.roles.length) errors.roles = "กรุณาเลือกบทบาทอย่างน้อย 1 รายการ";
  if (!values.region) errors.region = "กรุณาเลือกภูมิภาค 1 รายการ";
  if (!values.file || values.file.size > 5242880 || !FILE_TYPES.includes(values.file.type)) errors.file = "ไฟล์ต้องเป็น JPG, PNG หรือ PDF และขนาดไม่เกิน 5 MB";
  if (!values.terms) errors.terms = "กรุณายอมรับ Terms and Conditions";
  return errors;
}
