import axios from "axios";

export default axios.create({
  baseURL: "https://server.lura-services.com",
  responseType: "json",
});

/**
 * 
 *   params: {
    key: '1f3ab8f7-2103-4046-9cfc-0d6cf2756602',
    access:'admin'
  }
 */