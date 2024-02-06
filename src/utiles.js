export const isNum = (e) => {
  //credit for  https://stackoverflow.com/questions/43067719/how-to-allow-only-numbers-in-textbox-in-reactjs
  //Autor : Mayank Shukla
  // https://stackoverflow.com/users/5185595/mayank-shukla

  const re = /^[0-9\b]+$/;
  if (e.target.value === "" || re.test(e.target.value)) {
    return true;
  }
  return false;
};

export const shortFileName = (file_name) => {
  if (file_name.length > 10) {
    return file_name.substr(0, 7) + "..." + file_name.substr(-7);
  }
  return file_name;
};

export const getDates = () => {
  let startDay = new Date();
  let fthMonth = new Date(startDay);
  let sixMonth = new Date(startDay);
  let lastMonth = new Date(startDay);

  fthMonth.setMonth(fthMonth.getMonth() + 5);
  sixMonth.setMonth(sixMonth.getMonth() + 6);
  lastMonth.setMonth(lastMonth.getMonth() + 12);

  return {
    startDay,
    fthMonth,
    sixMonth,
    lastMonth,
  };
};
export const formatDate = (date) => {
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = month < 10 ? "0" + month : month;
  let day = date.getDate();
  day = day < 10 ? "0" + day : day;

  return `${year}-${month}-${day}`;
};
export const shortEmail = (email) => {
  let splitemail = email.split("@");
  let sizedom = splitemail[1].length;
  return (
    splitemail[0].substr(0, 3) +
    "****" +
    "@" +
    splitemail[1].substr(0, 3) +
    "***" +
    splitemail[1].substr(sizedom - 4, sizedom)
  );
};

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    let value = (hash >> (i * 8)) & 0xff;

    // Ajusta el valor para limitarlo a un rango de colores pastel oscuros
    let darkPastelValue = Math.floor(100 + (value % 56));

    color += `00${darkPastelValue.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export const datecontrol = (selectedDate) => {
  let today = new Date();
  let yearsAgo_18 = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );
  let yearsAgo_100 = new Date(
    today.getFullYear() - 100,
    today.getMonth(),
    today.getDate()
  );
  return yearsAgo_100 <= selectedDate && selectedDate <= yearsAgo_18;
};

export const stringAvatar = (name) => {
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: 56,
      height: 56,
    },
    children: obtenerIniciales(name),
  };
};
function obtenerIniciales(nombre) {
  const partes = nombre.split(", ");
  const inicialNombre = partes[0][0];
  const apellido = partes.length > 1 ? partes[1] : "";
  const inicialApellido = apellido ? apellido.split(" ")[0][0] : "";
  return `${inicialNombre}${inicialApellido}`;
}
export const doformatCUIL = (inputValue) => {
  const sanitizedValue = inputValue.replace(/\D/g, "");
  const truncatedValue = sanitizedValue.slice(0, 11);

  // Formatear según tu criterio: XX-XXXXXXXX-X
  let formatted = truncatedValue;

  if (truncatedValue.length > 2) {
    formatted = truncatedValue
      .replace(/^(\d{2})/, "$1-")
      .replace(/(\d{8})(\d{1,2})/, "$1-$2");
  }
  return formatted;
};

export const doPostalCode = (inputValue) => {
  const sanitizedValue = inputValue.replace(/\D/g, "");
  const truncatedValue = sanitizedValue.slice(0, 4);
  let formatted = truncatedValue;
  return formatted;
};
export const doFloor = (value) => {
  const floorNumber = parseInt(value, 10) || 0;
  return Math.min(Math.max(floorNumber, 0), 50).toString();
};

export const doApartment = (value) => {
  const sanitizedValue = value.replace(/[^A-Z0-9]/gi, "").toUpperCase();
  return sanitizedValue.length > 0 ? sanitizedValue.charAt(0) : "";
};

export const doEmail = (email) => {
  const trimmedEmail = email.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(trimmedEmail)) {
    const formattedEmail = trimmedEmail.toLowerCase();
    return formattedEmail;
  } else {
    return trimmedEmail;
  }
};

export const doPhone = (phonein) => {
  let phone = phonein.replace(/\D/g, "");
  if (phone.length > 10) {
    phone = phone.substring(2, 12);
  }
  if (phone.length < 10) {
    return phone;
  }
  if (phone.length == 10) {
    return `+54 (${phone.slice(0, 2)}) ${phone.slice(2, 6)}-${phone.slice(
      6,
      10
    )}`;
  }
};

export const testpassword = (password1, password2) => {
  let re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  return password1 === password2 ? re.test(password1) : false;
};

export default {
  isNum,
  testpassword,
  shortFileName,
  getDates,
  stringAvatar,
  doformatCUIL,
  datecontrol,
  doPostalCode,
  doFloor,
  doApartment,
  doPhone,
  doEmail,
  formatDate,
};
