import axiosClient from "src/library/axios/axios-client";
import { BaseResponse } from "src/types/api/response.model";
import { SampleRequest, SampleResponse } from "src/types/api/sample.model";
import { generateApiUrl } from "src/utils";
import { SAMPLE_URL } from "./endpoints";

export const getSampleData = async (params: SampleRequest) => {
  return axiosClient
    .get<BaseResponse<SampleResponse>>(generateApiUrl(SAMPLE_URL, params))
    .then((res) => {
      return {
        status: res.data.status,
        data: [res.data.data],
      };
    });
};
