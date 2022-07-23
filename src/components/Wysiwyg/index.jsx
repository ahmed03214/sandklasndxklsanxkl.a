import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import useCookie from "../../hooks/useCookie";

const API = process.env.NEXT_PUBLIC_PUBLIC_URL;

const Wysiwyg = ({ onEditorStateChange, article }) => {
  const cookie = useCookie();

  const uploadAdapter = (loader) => {
    const UPLOAD_ENDPOINT = "share-img-article.php";

    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();

          loader.file.then((file) => {
            body.append("image", file);
            body.append("token", cookie.get("token"));

            axios
              .post(`${API}/${UPLOAD_ENDPOINT}`, body)
              .then(({ data }) => {
                resolve({
                  default: `${API}/${data.path}`,
                });
              })
              .catch((err) => {
                reject(err);
              });
          });
        });
      },
    };
  };

  const uploadPlugin = (editor) => {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  };

  return (
    <CKEditor
      editor={ClassicEditor}
      data={article}
      onChange={(_, e) => onEditorStateChange(e.getData())}
      className="pt-5"
      config={{
        extraPlugins: [uploadPlugin],
      }}
    />
  );
};

export default Wysiwyg;
