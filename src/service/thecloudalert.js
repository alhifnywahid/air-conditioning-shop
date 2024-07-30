import axios from "axios";
const baseURL = "https://alamat.thecloudalert.com/api";
const URL = {
  provinsi: `${baseURL}/provinsi/get/`,
  kabKota: (id) => `${baseURL}/kabkota/get/?d_provinsi_id=${id}`,
  kecamatan: (id) => `${baseURL}/kecamatan/get/?d_kabkota_id=${id}`,
  kelurahan: (id) => `${baseURL}/kelurahan/get/?d_kecamatan_id=${id}`,
  kodePos: (kabId, kecId) =>
    `${baseURL}/kodepos/get/?d_kabkota_id=${kabId}&d_kecamatan_id=${kecId}`,
};
export async function getsAddress(provId, kabId, kecId) {
  const resprov = await axios.get(URL.provinsi);
  const reskot = await axios.get(
    URL.kabKota(provId || resprov.data.result[0].id),
  );
  const reskec = await axios.get(
    URL.kecamatan(kabId || reskot.data.result[0].id),
  );
  const reskel = await axios.get(
    URL.kelurahan(kecId || reskec.data.result[0].id),
  );
  const reskode = await axios.get(
    URL.kodePos(
      kabId || reskot.data.result[0].id,
      kecId || reskec.data.result[0].id,
    ),
  );
  const result = {
    provinsi: resprov.data.result,
    kabkota: reskot.data.result,
    kecamatan: reskec.data.result,
    kelurahan: reskel.data.result,
    kodepos: reskode.data.result,
  };
  return result;
}

// export async function getKabKota(id) {
// 	const res = await axios.get(url + "/kabkota/get/?d_provinsi_id=" + id);
// 	return res.data.result;
// }

// export async function getKecamatan(id) {
// 	const res = await axios.get(url + "/kecamatan/get/?d_kabkota_id=" + id);
// 	return res.data.result;
// }

// export async function getKelurahan(id) {
// 	const res = await axios.get(url + "/kelurahan/get/?d_kecamatan_id=" + id);
// 	return res.data.result;
// }

// export async function getKodePos(kotaId, kecId) {
// 	const res = await axios.get(`${url}/kodepos/get/?d_kabkota_id=${kotaId}&d_kecamatan_id=${kecId}`);
// 	return res.data.result;
// }
