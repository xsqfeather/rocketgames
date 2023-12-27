import {
  CreateParams,
  Identifier,
  RaRecord,
  UpdateParams,
  fetchUtils,
} from "react-admin";
import restProviderFactory from "./restProviderFactory";

const endpoint = "http://localhost:8083/rest";

const baseDataProvider = restProviderFactory(endpoint);

function createPostFormData<T extends RaRecord<Identifier>>(
  params: CreateParams<T> | UpdateParams<T>
) {
  const formData = new FormData();
  params.data.image?.rawFile &&
    formData.append("image", params.data.image.rawFile);
  params.data.name && formData.append("name", params.data.name);

  return formData;
}

export const restProvider = {
  ...baseDataProvider,
  create: async (resource: string, params: CreateParams) => {
    if (resource === "categories") {
      const formData = createPostFormData(params);
      const { json } = await fetchUtils.fetchJson(`${endpoint}/${resource}`, {
        method: "POST",
        body: formData,
      });
      return { data: json };
    }

    return baseDataProvider.create(resource, params);
  },
  update: async (resource: string, params: UpdateParams) => {
    if (resource === "categories") {
      const formData = createPostFormData(params);
      formData.append("id", params.id);
      const { json } = await fetchUtils.fetchJson(`${endpoint}/${resource}`, {
        method: "PUT",
        body: formData,
      });
      return { data: json };
    }
    return baseDataProvider.update(resource, params);
  },
};
