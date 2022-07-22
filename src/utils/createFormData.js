import FormData from "form-data";

const createFormData = (json) => {
  const form = new FormData();

  Object.keys(json).forEach((key) => {
    form.append(key, json[key]);
  });

  return form;
};

export default createFormData;
