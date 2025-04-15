import axios from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
    baseURL:  import.meta.env.VITE_BASE_URL||"http://localhost:5000",
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
});

const isAuthCheckRoute = () => {
    const path = window.location.pathname;
    return path === "/" || path === "/login" || path === "/signup";
};

axiosInstance.interceptors.request.use(
    async (config) => {
        if (!navigator.onLine) {
            toast.error("No internet connection. Please check your network.");
            return Promise.reject({ message: "No internet connection" });
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => {
        if (response.config.showToast) {
            toast.success(response.config.toastMessage || "Success!",{
                position: "bottom-right",
                autoClose: 3000,
                theme:"colored"
            });
        }
        return response;
    },
    (error) => {
        // console.log("bro error here--->",error);
        if (error.message === "No internet connection") return Promise.reject(error);
    
        if (error.response) {
            // Suppress toast only for /auth/me errors on specific pages
            // if (error.config?.url === "/api/auth/me" && isAuthCheckRoute()) {
            //     return Promise.reject(error);
            // }
            console.log("something went wrong")
            const errorMessge  = error.response.data?.message || "Something went wrong!" 
            toast.error(errorMessge);
        } else {
            toast.error("Server unreachable. Please try again later.");
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
