import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import jwt_decode from "jwt-decode";

const RefreshToken = () => {
  const auth = secureLocalStorage.getItem("acessToken");
  const refresh = secureLocalStorage.getItem("refreshToken");
  // jika token belum ada maka kebalikan false
  if (!auth || !refresh) {
    return Promise.resolve(false);
  }
  const exp = new Date(jwt_decode(auth).exp * 1000);
  // jika token expired
  if (exp <= new Date()) {
    console.log("Jalan ke process refresh token xxx");
    return new Promise(async (resolve, reject) => {
      try {
        const refresh = await axios.get("/api/users/refresh", {
          headers: {
            Authorization:
              "Bearer " + secureLocalStorage.getItem("refreshToken"),
          },
        });
        // jika tidak ada response kembaikan false
        if (!refresh.request.response) {
          resolve(false);
        }
        // jika procvess berhasil simpan token baru
        resolve(true);
        const data = JSON.parse(refresh.request.response);
        secureLocalStorage.setItem("acessToken", data.acessToken);
        secureLocalStorage.setItem("refreshToken", data.refreshToken);
        secureLocalStorage.setItem("user", data.data);
      } catch (error) {
        resolve(false);
      }
    });
  } else {
    // jika belum expire kembalikan masih ok (true)
    return Promise.resolve(true);
  }
};

export default RefreshToken;
