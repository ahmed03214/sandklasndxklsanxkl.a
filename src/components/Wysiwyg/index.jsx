import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const Wysiwyg = ({ onEditorStateChange, article }) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={article}
      onChange={(_, e) => onEditorStateChange(e.getData())}
      className="pt-5"
    />
  );
};

export default Wysiwyg;
