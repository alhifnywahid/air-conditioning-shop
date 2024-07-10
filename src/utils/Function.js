const formatIDR = (nominal) => {
	return nominal.toLocaleString("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0, maximumFractionDigits: 0 });
};

export { formatIDR };
