import { useLayoutEffect, useRef, useState } from "react";
import { validateForm } from "./utils/validateForm.js";
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
  },
};

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
function FieldSection({ name, error, children }) {
  return (
    <Box
      data-field={name}
      role="group"
      aria-labelledby={name + "-label"}
      aria-describedby={error ? name + "-error" : undefined}
      tabIndex={-1}
      sx={{
        ...card,
        scrollMarginTop: 88,
        ...(error
          ? {
              borderColor: "error.main",
              "&:focus-within": { borderColor: "error.main" },
            }
          : {}),
      }}
    >
      {children}
      {error && (
        <Typography
          id={name + "-error"}
          sx={{ color: "error.main", fontSize: 13, mt: 1 }}
        >
          {error}
        </Typography>
      )}
    </Box>
  );
}
export default function App() {
  const formRef = useRef();
  const [v, setV] = useState(createInitialForm);
  const fileRef = useRef(null);
  const pendingFocus = useRef(null);
  const [errors, setErrors] = useState({});
  const [snack, setSnack] = useState(false);
  const [errorSnack, setErrorSnack] = useState("");
  const set = (k, x) => {
    setV((a) => ({ ...a, [k]: x }));
    setErrors((a) => ({ ...a, [k]: false }));
    setSnack(false);
    setErrorSnack("");
  };
  useLayoutEffect(() => {
    const key = pendingFocus.current;
    if (!key) return;
    const section = formRef.current?.querySelector(
      '[data-field="' + key + '"]',
    );
    const target = section?.querySelector(
      '[role="spinbutton"], input:not([type="hidden"]):not([hidden]), textarea, [role="combobox"], button',
    );
    section?.scrollIntoView({ behavior: "smooth", block: "center" });
    (target || section)?.focus({ preventScroll: true });
    pendingFocus.current = null;
  }, [errors]);
  function clearForm() {
    setV(createInitialForm());
    setErrors({});
    setSnack(false);
    setErrorSnack("");
    pendingFocus.current = null;
    if (fileRef.current) fileRef.current.value = "";
  }
  const toggleRole = (r) =>
    set(
      "roles",
      v.roles.includes(r) ? v.roles.filter((x) => x !== r) : [...v.roles, r],
    );
  function submit(e) {
    e.preventDefault();
    const er = validateForm(v);
    pendingFocus.current = Object.keys(er)[0] || null;
    setSnack(false);
    setErrorSnack("");
    setErrors(er);
    if (Object.keys(er).length) {
      setErrorSnack(Object.values(er)[0]);

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
        "&::before": {
          content: '""',
          position: "absolute",
          width: 620,
          height: 620,
          border: "1px solid rgba(19,35,59,.12)",
          borderRadius: "50%",
          right: -330,
          top: 135,
          pointerEvents: "none",
          boxShadow:
            "0 0 0 55px rgba(19,35,59,.025), 0 0 0 110px rgba(19,35,59,.018)",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          width: 370,
          height: 370,
          background:
            "radial-gradient(circle, rgba(236,111,58,.20), transparent 68%)",
          borderRadius: "50%",
          left: -185,
          bottom: 50,
          pointerEvents: "none",
        },
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
            background:
              "linear-gradient(135deg,rgba(255,255,255,.88),rgba(246,239,230,.78))",
            display: "block",
            overflowWrap: "anywhere",
            width: "fit-content",
            maxWidth: "100%",
            ml: "auto",
            mt: 2,
            mr: 0,
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
        sx={{
          maxWidth: 760,
          mx: "auto",
          mt: { xs: 3, sm: 5 },
          px: 2,
          pb: 7,
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box
          ref={formRef}
          component="form"
          onSubmit={submit}
          noValidate
          sx={{
            bgcolor: "rgba(255,253,249,.82)",
            border: "1px solid rgba(255,255,255,.9)",
            borderRadius: 5,
            p: { xs: 1.5, sm: 3.25 },
            boxShadow:
              "0 28px 65px rgba(30,38,50,.15), 0 2px 0 rgba(255,255,255,.9) inset",
            backdropFilter: "blur(14px)",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 7,
              background:
                "linear-gradient(90deg,#15273f 0%,#d85e3e 44%,#f0ad75 65%,#15273f 100%)",
            },
            "& .MuiFormControlLabel-root": {
              transition: "color .16s ease",
              "&:hover": { color: "#c55337" },
            },
          }}
        >
          <FieldSection name="name" error={errors.name}>
            <Typography id="name-label" sx={{ fontSize: 13, mb: 1 }}>
              Full Name*
            </Typography>
            <TextField
              className={errors.name ? "field-error" : ""}
              fullWidth
              placeholder="e.g., Peter Ford"
              value={v.name}
              slotProps={{
                htmlInput: {
                  "aria-labelledby": "name-label",
                  "aria-describedby": errors.name ? "name-error" : undefined,
                },
              }}
              required
              onChange={(e) => set("name", e.target.value)}
              error={!!errors.name}
              sx={input}
            />
          </FieldSection>
          <FieldSection name="email" error={errors.email}>
            <Typography id="email-label" sx={{ fontSize: 13, mb: 1 }}>
              Email*
            </Typography>
            <TextField
              className={errors.email ? "field-error" : ""}
              fullWidth
              placeholder="e.g., test@email.com"
              value={v.email}
              slotProps={{
                htmlInput: {
                  "aria-labelledby": "email-label",
                  "aria-describedby": errors.email ? "email-error" : undefined,
                  maxLength: 100,
                },
              }}
              required
              onChange={(e) => set("email", e.target.value)}
              error={!!errors.email}
              sx={input}
            />
          </FieldSection>
          <FieldSection name="phone" error={errors.phone}>
            <Typography id="phone-label" sx={{ fontSize: 13, mb: 1 }}>
              Contact Number*
            </Typography>
            <TextField
              className={errors.phone ? "field-error" : ""}
              fullWidth
              placeholder="e.g., 0812345678"
              type="tel"
              value={v.phone}
              slotProps={{
                htmlInput: {
                  "aria-labelledby": "phone-label",
                  "aria-describedby": errors.phone ? "phone-error" : undefined,
                  maxLength: 15,
                },
              }}
              required
              onChange={(e) => set("phone", e.target.value)}
              error={!!errors.phone}
              sx={input}
            />
          </FieldSection>
          <FieldSection name="dob" error={errors.dob}>
            <Typography id="dob-label" sx={{ fontSize: 13, mb: 1 }}>
              Date of Birth*
            </Typography>
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
                    slotProps: {
                      htmlInput: {
                        "aria-labelledby": "dob-label",
                        "aria-describedby": errors.dob
                          ? "dob-error"
                          : undefined,
                      },
                    },
                    placeholder: "DD/MM/YYYY",
                    sx: input,
                  },
                }}
              />
            </LocalizationProvider>
          </FieldSection>
          <FieldSection name="exp" error={errors.exp}>
            <Typography id="exp-label" sx={{ fontSize: 13, mb: 1 }}>
              Archaeology Experience
            </Typography>
            <FormControl fullWidth sx={input}>
              <Select
                value={v.exp}
                labelId="exp-label"
                error={!!errors.exp}
                onChange={(e) => set("exp", e.target.value)}
              >
                <MenuItem value="No experience">No experience</MenuItem>
                <MenuItem value="Some experience">Some experience</MenuItem>
                <MenuItem value="Expert">Expert</MenuItem>
              </Select>
            </FormControl>
          </FieldSection>
          <FieldSection name="roles" error={errors.roles}>
            <Typography id="roles-label" sx={{ fontSize: 13, mb: 1 }}>
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
          </FieldSection>
          <FieldSection name="region" error={errors.region}>
            <Typography id="region-label" sx={{ fontSize: 13, mb: 1 }}>
              Preferred Expedition Region*
            </Typography>
            <RadioGroup
              value={v.region}
              aria-labelledby="region-label"
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
          </FieldSection>
          <FieldSection name="salary" error={errors.salary}>
            <Typography id="salary-label" sx={{ fontSize: 13 }}>
              Select your desired salary per week ($): {v.salary}
            </Typography>
            <Slider
              value={v.salary}
              aria-labelledby="salary-label"
              valueLabelDisplay="auto"
              min={0}
              max={1700}
              step={10}
              onChange={(_, x) => set("salary", x)}
              sx={{ color: "#c4543b", mt: 1.5 }}
            />
          </FieldSection>
          <FieldSection name="contact" error={errors.contact}>
            <Typography id="contact-label" sx={{ fontSize: 13, mb: 1 }}>
              Preferred Contact Method
            </Typography>
            <RadioGroup
              row
              value={v.contact}
              aria-labelledby="contact-label"
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
          </FieldSection>
          <FieldSection name="file" error={errors.file}>
            <Typography id="file-label" sx={{ fontSize: 13, mb: 1 }}>
              Upload Passport/ID* (JPG, PNG, PDF)
            </Typography>
            <Button
              component="button"
              type="button"
              onClick={() => fileRef.current?.click()}
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
            </Button>
            <input
              ref={fileRef}
              type="file"
              hidden
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={(e) => {
                const selected = e.target.files?.[0];
                if (selected) set("file", selected);
              }}
            />
          </FieldSection>
          <FieldSection name="comments" error={errors.comments}>
            <Typography id="comments-label" sx={{ fontSize: 13, mb: 1 }}>
              Additional Comments
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={v.comments}
              slotProps={{
                htmlInput: {
                  "aria-labelledby": "comments-label",
                  "aria-describedby": errors.comments
                    ? "comments-error"
                    : undefined,
                },
              }}
              onChange={(e) => set("comments", e.target.value)}
              sx={input}
            />
          </FieldSection>
          <FieldSection name="terms" error={errors.terms}>
            <FormControlLabel
              id="terms-label"
              control={
                <Checkbox
                  checked={v.terms}
                  onChange={(e) => set("terms", e.target.checked)}
                />
              }
              label="I Agree to Terms and Conditions*"
              sx={{ m: 0, fontSize: 14 }}
            />
          </FieldSection>
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
              onClick={clearForm}
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
