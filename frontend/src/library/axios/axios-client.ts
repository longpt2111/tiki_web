import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: { loadingScreen: true },
});

const dispatchLoadingEvent = (eventName: string) => {
  const event = new Event(eventName, { bubbles: true });
  document.dispatchEvent(event);
};

axiosClient.interceptors.request.use((request) => {
  if (request.headers?.loadingScreen) {
    dispatchLoadingEvent("handleStartLoading");
  }
  return request;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response.config.headers?.loadingScreen) {
      dispatchLoadingEvent("handleEndLoading");
    }
    return response;
  },
  (error) => {
    if (error.config.headers?.loadingScreen) {
      dispatchLoadingEvent("handleEndLoading");
    }
    return Promise.reject(error);
  }
);

export const axiosAuth = axios.create();
export default axiosClient;
