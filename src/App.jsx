import { useRef, useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
  ROLES as roles,
  REGIONS as regions,
  createInitialForm,
} from "./constants/formOptions";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Slider,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
const card = {
  background: "rgba(255,255,255,.92)",
  border: "1px solid #e8e2d8",
  borderRadius: 2.5,
  p: { xs: 1.75, sm: 2.25 },
  mb: 2,
  transition: "all .2s ease",
  "&:focus-within": {
    borderColor: "#d55b3d",
    boxShadow: "0 8px 22px rgba(196,84,59,.14)",
    transform: "translateY(-1px)",
  },
};
dayjs.extend(customParseFormat);
const input = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 1.5,
    background: "#fff",
    transition: "box-shadow .2s",
  },
  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#e5dfd5" },
  "& .MuiOutlinedInput-root.Mui-focused": {
    boxShadow: "0 0 0 4px rgba(213,91,61,.12)",
  },
  "& .MuiInputBase-input": { fontSize: 14, py: 1.45 },
};
export default function App() {
  const formRef = useRef();
  const [v, setV] = useState({
    name: "",
    email: "",
    phone: "",
    dob: null,
    exp: "No experience",
    roles: [],
    region: "",
    salary: 700,
    contact: "Email",
    file: null,
    comments: "",
    terms: false,
  });
  const [errors, setErrors] = useState({});
  const [snack, setSnack] = useState(false);
  const [errorSnack, setErrorSnack] = useState("");
  const set = (k, x) => {
    setV((a) => ({ ...a, [k]: x }));
    setErrors((a) => ({ ...a, [k]: false }));
  };
  const toggleRole = (r) =>
    set(
      "roles",
      v.roles.includes(r) ? v.roles.filter((x) => x !== r) : [...v.roles, r],
    );
  function submit(e) {
    e.preventDefault();
    const er = {};
    if (!/^[A-Za-zА-Яа-яЁё0-9 '\-]{2,50}$/.test(v.name))
      er.name = "ชื่อไม่ถูกต้อง (2–50 ตัวอักษร)";
    if (v.email.length > 100) er.email = "อีเมลยาวเกิน 100 ตัวอักษร";
    if (!/^[0-9+\-\s]{1,15}$/.test(v.phone))
      er.phone = "เบอร์โทรไม่ถูกต้องหรือยาวเกิน 15 ตัวอักษร";
    const birth = v.dob && dayjs.isDayjs(v.dob) ? v.dob : dayjs("invalid");
    const age = birth.isValid() ? dayjs().diff(birth, "year") : 0;
    if (!birth.isValid()) er.dob = "กรุณากรอกวันที่ในรูปแบบ DD/MM/YYYY";
    else if (age <= 18) er.dob = "อายุต่ำเกินไป (ต้องมากกว่า 18 ปี)";
    else if (age >= 70) er.dob = "แก่เกินไป (ต้องน้อยกว่า 70 ปี)";
    if (!v.roles.length) er.roles = "กรุณาเลือกบทบาทอย่างน้อย 1 รายการ";
    if (!v.region) er.region = "กรุณาเลือกภูมิภาค 1 รายการ";
    if (
      !v.file ||
      v.file.size > 5242880 ||
      !["image/jpeg", "image/png", "application/pdf"].includes(v.file.type)
    )
      er.file = "ไฟล์ต้องเป็น JPG, PNG หรือ PDF และขนาดไม่เกิน 5 MB";
    if (!v.terms) er.terms = "กรุณายอมรับ Terms and Conditions";
    setErrors(er);
    if (Object.keys(er).length) {
      setErrorSnack(Object.values(er)[0]);
      const first = formRef.current.querySelector(".field-error");
      const target = first?.matches("input,textarea,select,button")
        ? first
        : first?.querySelector(
            "input,textarea,select,button,[role='radio'],[role='checkbox']",
          );
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
      target?.focus?.({ preventScroll: true });
      return;
    }
    setSnack(true);
  }
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f7f2ea",
        backgroundImage:
          "radial-gradient(circle at 6% 4%, #fff 0%, transparent 28%), radial-gradient(circle at 92% 11%, rgba(244,154,87,.30) 0%, transparent 25%), linear-gradient(135deg,#f9f5ee 0%,#f1e9de 100%)",
        fontFamily: "Arial,sans-serif",
        color: "#272522",
        position: "relative",
        overflow: "hidden",
        "&::before": { content: '""', position: "absolute", width: 620, height: 620, border: "1px solid rgba(19,35,59,.12)", borderRadius: "50%", right: -330, top: 135, pointerEvents: "none", boxShadow: "0 0 0 55px rgba(19,35,59,.025), 0 0 0 110px rgba(19,35,59,.018)" },
        "&::after": { content: '""', position: "absolute", width: 370, height: 370, background: "radial-gradient(circle, rgba(236,111,58,.20), transparent 68%)", borderRadius: "50%", left: -185, bottom: 50, pointerEvents: "none" },
      }}
    >
      <Box
        component="header"
        sx={{
          maxWidth: 1040,
          mx: "auto",
          pt: { xs: 3, sm: 5 },
          px: { xs: 2, sm: 4 },
          position: "relative",
          zIndex: 1,
        }}
      >
        <Typography
          sx={{
            fontFamily: "Georgia,serif",
            fontWeight: 700,
            fontSize: { xs: 31, sm: 38 },
            lineHeight: 0.8,
            letterSpacing: "-.04em",
            textShadow: "0 3px 10px rgba(38,32,28,.12)",
          }}
        >
          <Box component="span" sx={{ color: "#c4543b" }}>
            Software
          </Box>
          Tester
        </Typography>
        <Typography
          sx={{
            fontSize: 11,
            color: "#8b766c",
            mt: 0.6,
            letterSpacing: ".04em",
          }}
        >
          ไม่บอกหรอกอย่าหลอกถาม
        </Typography>
      </Box>
      <Box sx={{ maxWidth: 1040, mx: "auto", px: { xs: 2, sm: 4 } }}>
        <Typography
          sx={{
            fontSize: 14,
            border: "1px solid rgba(27,43,63,.16)",
            borderRadius: 2.5,
            background: "linear-gradient(135deg,rgba(255,255,255,.88),rgba(246,239,230,.78))",
            display: "flex",
            width: "max-content",
            maxWidth: "100%",
            ml: "auto",
            mt: 2,
            mr: 2,
            p: 1.25,
            pr: 2,
            boxShadow: "0 12px 28px rgba(28,38,53,.10)",
            backdropFilter: "blur(8px)",
          }}
        >
          จัดทำโดย | นายวีรพงศ์ วงศ์ชารี
          <br /> รหัส | 66040233126
        </Typography>
      </Box>
      <Box
        component="main"
        sx={{ maxWidth: 760, mx: "auto", mt: { xs: 3, sm: 5 }, px: 2, pb: 7, position: "relative", zIndex: 1 }}
      >
        <Box
          ref={formRef}
          component="form"
          onSubmit={submit}
          sx={{
            bgcolor: "rgba(255,253,249,.82)",
            border: "1px solid rgba(255,255,255,.9)",
            borderRadius: 5,
            p: { xs: 1.5, sm: 3.25 },
            boxShadow: "0 28px 65px rgba(30,38,50,.15), 0 2px 0 rgba(255,255,255,.9) inset",
            backdropFilter: "blur(14px)",
            position: "relative",
            overflow: "hidden",
            "&::before": { content: '""', position: "absolute", top: 0, left: 0, right: 0, height: 7, background: "linear-gradient(90deg,#15273f 0%,#d85e3e 44%,#f0ad75 65%,#15273f 100%)" },
            "& .MuiFormControlLabel-root": { transition: "transform .16s ease, color .16s ease", "&:hover": { transform: "translateX(4px)", color: "#c55337" } },
          }}
        >
          <Box sx={card}>
            <Typography sx={{ fontSize: 13, mb: 1 }}>Full Name*</Typography>
            <TextField
              className={errors.name ? "field-error" : ""}
              fullWidth
              placeholder="e.g., Peter Ford"
              value={v.name}
              required
              onChange={(e) => set("name", e.target.value)}
              error={!!errors.name}
              sx={input}
            />
          </Box>
          <Box sx={card}>
            <Typography sx={{ fontSize: 13, mb: 1 }}>Email*</Typography>
            <TextField
              className={errors.email ? "field-error" : ""}
              fullWidth
              placeholder="e.g., test@email.com"
              value={v.email}
              required
              onChange={(e) => set("email", e.target.value)}
              error={!!errors.email}
              sx={input}
            />
          </Box>
          <Box sx={card}>
            <Typography sx={{ fontSize: 13, mb: 1 }}>
              Contact Number*
            </Typography>
            <TextField
              className={errors.phone ? "field-error" : ""}
              fullWidth
              placeholder="e.g., +1234567890"
              value={v.phone}
              required
              onChange={(e) => set("phone", e.target.value)}
              error={!!errors.phone}
              inputProps={{ maxLength: 15 }}
              sx={input}
            />
          </Box>
          <Box sx={card} className={errors.dob ? "field-error" : ""}>
            <Typography sx={{ fontSize: 13, mb: 1 }}>Date of Birth*</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={v.dob}
                onChange={(date) => set("dob", date)}
                format="DD/MM/YYYY"
                slotProps={{
                  textField: {
                    fullWidth: true,
                    required: true,
                    error: !!errors.dob,
                    helperText: errors.dob || "",
                    placeholder: "DD/MM/YYYY",
                    sx: input,
                  },
                }}
              />
            </LocalizationProvider>
          </Box>
          <Box sx={card}>
            <Typography sx={{ fontSize: 13, mb: 1 }}>
              Archaeology Experience
            </Typography>
            <FormControl fullWidth sx={input}>
              <Select
                value={v.exp}
                onChange={(e) => set("exp", e.target.value)}
              >
                <MenuItem value="No experience">No experience</MenuItem>
                <MenuItem value="Some experience">Some experience</MenuItem>
                <MenuItem value="Expert">Expert</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={card} className={errors.roles ? "field-error" : ""}>
            <Typography sx={{ fontSize: 13, mb: 1 }}>
              Preferred Role in the Expedition*
            </Typography>
            {roles.map((r) => (
              <FormControlLabel
                key={r}
                control={
                  <Checkbox
                    checked={v.roles.includes(r)}
                    onChange={() => toggleRole(r)}
                    sx={{ p: 0.45 }}
                  />
                }
                label={r}
                sx={{ display: "flex", m: 0, fontSize: 14 }}
              />
            ))}
          </Box>
          <Box sx={card} className={errors.region ? "field-error" : ""}>
            <Typography sx={{ fontSize: 13, mb: 1 }}>
              Preferred Expedition Region*
            </Typography>
            <RadioGroup
              value={v.region}
              onChange={(e) => set("region", e.target.value)}
            >
              {regions.map((r) => (
                <FormControlLabel
                  key={r}
                  value={r}
                  control={<Radio sx={{ p: 0.45 }} />}
                  label={r}
                  sx={{ m: 0, fontSize: 14 }}
                />
              ))}
            </RadioGroup>
          </Box>
          <Box sx={card}>
            <Typography sx={{ fontSize: 13 }}>
              Select your desired salary per week ($): {v.salary}
            </Typography>
            <Slider
              value={v.salary}
              min={-10}
              max={2000}
              step={10}
              onChange={(_, x) => set("salary", x)}
              sx={{ color: "#c4543b", mt: 1.5 }}
            />
          </Box>
          <Box sx={card}>
            <Typography sx={{ fontSize: 13, mb: 1 }}>
              Preferred Contact Method
            </Typography>
            <RadioGroup
              row
              value={v.contact}
              onChange={(e) => set("contact", e.target.value)}
            >
              {["Email", "Phone", "WhatsApp", "SMS"].map((x) => (
                <FormControlLabel
                  key={x}
                  value={x}
                  control={<Radio sx={{ p: 0.45 }} />}
                  label={x}
                  sx={{ m: 0, mr: 2, fontSize: 14 }}
                />
              ))}
            </RadioGroup>
          </Box>
          <Box sx={card} className={errors.file ? "field-error" : ""}>
            <Typography sx={{ fontSize: 13, mb: 1 }}>
              Upload Passport/ID* (JPG, PNG, PDF)
            </Typography>
            <Button
              component="label"
              variant="outlined"
              sx={{
                color: "#333",
                borderColor: "#dedbd4",
                textTransform: "none",
                justifyContent: "flex-start",
                width: "100%",
                fontSize: 13,
              }}
            >
              {v.file ? v.file.name : "Choose File"}
              <input
                type="file"
                hidden
                accept="image/jpeg,image/png,application/pdf"
                onChange={(e) => set("file", e.target.files[0])}
              />
            </Button>
          </Box>
          <Box sx={card}>
            <Typography sx={{ fontSize: 13, mb: 1 }}>
              Additional Comments
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={v.comments}
              onChange={(e) => set("comments", e.target.value)}
              inputProps={{ maxLength: 1000 }}
              sx={input}
            />
          </Box>
          <Box sx={card} className={errors.terms ? "field-error" : ""}>
            <FormControlLabel
              control={
                <Checkbox
                  required
                  checked={v.terms}
                  onChange={(e) => set("terms", e.target.checked)}
                />
              }
              label="I Agree to Terms and Conditions*"
              sx={{ m: 0, fontSize: 14 }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1.5,
              mt: 2.5,
              pt: 2.5,
              borderTop: "1px solid #e8e2d8",
            }}
          >
            <Button
              type="submit"
              sx={{
                background: "linear-gradient(135deg,#d75d3d,#b6422c)",
                color: "#fff",
                fontWeight: 700,
                borderRadius: 2,
                px: 2.5,
                py: 1.15,
                boxShadow: "0 8px 16px rgba(196,84,59,.25)",
                "&:hover": {
                  background: "linear-gradient(135deg,#c94d31,#a93725)",
                  transform: "translateY(-1px)",
                  boxShadow: "0 11px 20px rgba(196,84,59,.3)",
                },
              }}
            >
              Submit Registration
            </Button>
            <Button
              onClick={() =>
                setV({
                  ...v,
                  name: "",
                  email: "",
                  phone: "",
                  dob: null,
                  roles: [],
                  region: "",
                  salary: 700,
                  file: null,
                  comments: "",
                  terms: false,
                })
              }
              sx={{
                background: "#fff",
                border: "1px solid #e0ddd5",
                color: "#7d7069",
                fontWeight: 600,
                borderRadius: 2,
                px: 2.25,
                "&:hover": { background: "#f3eee7", borderColor: "#c9bbae" },
              }}
            >
              Clear Form
            </Button>
          </Box>
        </Box>
      </Box>
      <Snackbar
        open={Boolean(errorSnack)}
        autoHideDuration={4000}
        onClose={() => setErrorSnack("")}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity="error"
          variant="filled"
          onClose={() => setErrorSnack("")}
        >
          {errorSnack}
        </Alert>
      </Snackbar>
      <Snackbar
        open={snack}
        autoHideDuration={3500}
        onClose={() => setSnack(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled">
          The form has been submitted!
        </Alert>
      </Snackbar>
    </Box>
  );
}
