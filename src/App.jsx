import { useRef, useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
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
const roles = [
    "Researcher",
    "Photographer",
    "Drone Operator",
    "Cartographer",
    "Medic",
    "Logistician",
  ],
  regions = ["South America", "Africa", "Asia", "Europe", "Australia"];
const card = {
  background: "#fffdfb",
  border: "1px solid #4d4d45",
  borderRadius: 1,
  p: 2,
  mb: 1.75,
  transition: "all .2s ease",
  "&:focus-within": {
    borderColor: "#c4543b",
    boxShadow: "0 4px 14px rgba(196,84,59,.10)",
  },
};
dayjs.extend(customParseFormat);
const input = {
  "& .MuiOutlinedInput-root": { borderRadius: 0.7, background: "#fff" },
  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#dedbd4" },
  "& .MuiInputBase-input": { fontSize: 14 },
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
    if (!/^[A-Za-zА-Яа-яЁё0-9 '\-]{2,50}$/.test(v.name)) er.name = "ชื่อไม่ถูกต้อง (2–50 ตัวอักษร)";
    if (v.email.length > 100) er.email = "อีเมลยาวเกิน 100 ตัวอักษร";
    if (!/^[0-9+\-\s]{1,15}$/.test(v.phone)) er.phone = "เบอร์โทรไม่ถูกต้องหรือยาวเกิน 15 ตัวอักษร";
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
        bgcolor: "#faf8f3",
        backgroundImage:
          "radial-gradient(circle at 50% -20%, #ffffff 0%, transparent 55%)",
        fontFamily: "Arial,sans-serif",
        color: "#272522",
      }}
    >
      <Box
        component="header"
        sx={{
          maxWidth: 1040,
          mx: "auto",
          pt: 2.5,
          px: { xs: 2, sm: 4 },
          position: "relative",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Georgia,serif",
            fontWeight: 700,
            fontSize: 34,
            lineHeight: 0.8,
          }}
        >
          <Box component="span" sx={{ color: "#c4543b" }}>
            Software
          </Box>
          Tester
        </Typography>
        <Typography sx={{ fontSize: 10, color: "#777" }}>
          ไม่บอกหรอกอย่าหลอกถาม
        </Typography>
      </Box>
      <Box>
        <Typography
          sx={{
            fontSize: 16,
            border: "2px solid #e4e1d9",
            borderRadius: 1,
            backgroundColor: "#f6f4ee",
            width: 300,
            ml: "auto",
            mt: 2,
            mr: 2,
            p: 1,
          }}
        >
          จัดทำโดย | นายวีรพงศ์ วงศ์ชารี
          <br /> รหัส | 66040233126
        </Typography>
      </Box>
      <Box
        component="main"
        sx={{ maxWidth: 740, mx: "auto", mt: 4, px: 2, pb: 5 }}
      >
        <Box
          ref={formRef}
          component="form"
          onSubmit={submit}
          sx={{
            bgcolor: "#f6f4ee",
            border: "1px solid #0099ff",
            borderRadius: 1,
            p: { xs: 1.5, sm: 3 },
            boxShadow: "0 10px 24px #5b4b3910",
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
          <Box sx={{ display: "flex", gap: 1.5, mt: 2 }}>
            <Button
              type="submit"
              sx={{
                background: "#fff",
                border: "1px solid #e0ddd5",
                color: "#db0859",
                fontWeight: 600,
                px: 2,
                "&:hover": { background: "#fffaf7", borderColor: "#c4543b" },
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
                color: "#db0859",
                fontWeight: 600,
                px: 2,
              }}
            >
              Clear Form
            </Button>
          </Box>
        </Box>
      </Box>
      <Snackbar open={Boolean(errorSnack)} autoHideDuration={4000} onClose={() => setErrorSnack("")} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert severity="error" variant="filled" onClose={() => setErrorSnack("")}>{errorSnack}</Alert>
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
