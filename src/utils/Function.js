const formatIDR = (nominal) => {
  return nominal.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

const dateFormat = (tanggal) => {
  const date = new Date(tanggal);
  const day = date.getUTCDate();
  const month = date.toLocaleString("id-ID", { month: "long" });
  const year = date.getUTCFullYear();
  const formattedDate = `${day} ${month} ${year}`;
  return formattedDate;
};

const base64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

const AdminFee = (totalPayment, adminPercentage) =>
  (totalPayment * adminPercentage) / 100;

export { AdminFee, base64, dateFormat, formatIDR };
