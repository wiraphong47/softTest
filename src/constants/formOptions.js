export const ROLES = ["Researcher", "Photographer", "Drone Operator", "Cartographer", "Medic", "Logistician"];
export const REGIONS = ["South America", "Africa", "Asia", "Europe", "Australia"];
export const CONTACT_METHODS = ["Email", "Phone", "WhatsApp", "SMS"];
export const EXPERIENCE_OPTIONS = ["No experience", "Some experience", "Expert"];
export const FILE_TYPES = ["image/jpeg", "image/png", "application/pdf"];

export const createInitialForm = () => ({
  name: "", email: "", phone: "", dob: null, exp: "No experience", roles: [], region: "",
  salary: 700, contact: "Email", file: null, comments: "", terms: false,
});
