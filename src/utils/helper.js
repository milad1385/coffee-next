import swal from "sweetalert";

const showSwal = (title, icon, buttons, callBack) => {
  swal({
    title,
    icon,
    buttons,
  }).then((res) => callBack());
};

const setToLocalStorage = (data, key) => {
  const ISSERVER = typeof window === "undefined";
  if (ISSERVER) return null;
  localStorage.setItem(key, JSON.stringify(data));
};

const getLocalStorage = (key) => {
  const ISSERVER = typeof window === "undefined";
  if (ISSERVER) return null;
  const data = JSON.parse(localStorage.getItem(key));
  return data;
};

const calculateTotalPrice = (data) => {
  let totalPrice = data.reduce(
    (prev, current) => prev + current.price * current.count,
    0
  );

  return totalPrice;
};

export { showSwal, setToLocalStorage, getLocalStorage, calculateTotalPrice };
