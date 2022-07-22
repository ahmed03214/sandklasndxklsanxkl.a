import React, { useState, useEffect } from "react";

import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/router";

import FullLayout from "../../layouts/FullLayout";
import useAdminControler from "../../hooks/useAdminController";
import Swal from "sweetalert2";
import { Form, Label, Button } from "reactstrap";

const Wysiwyg = dynamic(() => import("../Wysiwyg"), {
  loading: () => (
    <div className="flex-center">
      <div className="spinner-border mx-auto d-block" role="status" />
    </div>
  ),
  ssr: false,
});

const requiredImg = {
  image: yup.mixed().test({
    message: `please add img for your article`,
    test: (file) => {
      return file[0];
    },
  }),
};

const ShareArticle = ({ article = "", adminData }) => {
  const [editorState, setEditorState] = useState("");
  const [disabled, setDisabled] = useState(true);
  const { Article } = useAdminControler();

  const router = useRouter();
  const { id } = router.query;

  const schema = yup.object({
    title: yup.string().required("please fill all the inputs"),
    hash: yup.string().required("please fill all the inputs"),
    keywords: yup.string().required("please fill all the inputs"),
    ...(id ? {} : requiredImg),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: article?.title,
      hash: article?.hash,
      keywords: article?.keywords,
    },
  });

  useEffect(() => {
    const { title, hash, image, keywords } = watch();

    // image required in new script only
    if (article.title) {
      if (title && hash && keywords && editorState) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    } else {
      if (title && hash && keywords && editorState && image.length) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }
  }, [watch(), editorState]);

  useEffect(() => {
    setEditorState(article.article);
  }, []);

  const onSubmit = (data) => {
    data.image = data.image?.[0] || null;
    data.article = editorState;
    data.hash = data.hash.replaceAll("#", "");

    if (!editorState) {
      register("editorState", { minLength: 30 });

      return setError("registerInput", {
        type: "editorState",
        message: "min size for article is 30 letter",
      });
    }

    const cb = (message) => {
      Swal.fire("Done!", message, "success");

      setTimeout(() => router.push("/articles"), 1500);
    };

    if (id) {
      data.id = id;
      Article.update({ data, cb });
    } //
    else {
      Article.share({ data, cb });
    }
  };

  return (
    <FullLayout adminData={adminData}>
      <main>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Label for="title">
            title{" "}
            <span className="small">
              The best abbreviation search results in the title
            </span>
          </Label>
          <input
            id="title"
            placeholder="type title"
            type="text"
            className="mb-3 form-control"
            {...register("title")}
          />

          <Label for="hash">
            hash <span className="small">like (news)</span>
          </Label>
          <input
            id="hash"
            className="mb-3 form-control"
            placeholder="type hash"
            type="text"
            {...register("hash")}
          />

          <Label for="keywords">
            keywords <span className="small">like (news, companies)</span>
          </Label>
          <input
            id="keywords"
            className="mb-4 form-control"
            placeholder="type keywords"
            type="text"
            {...register("keywords")}
          />

          <Label for="image">image: </Label>
          <input
            accept="image/*"
            id="image"
            className="ms-2 mb-3"
            type="file"
            {...register("image")}
          />

          <Label className="d-block mb-3">article body</Label>
          <Wysiwyg
            onEditorStateChange={setEditorState}
            article={article?.article}
          />

          {/* First error message */}
          <p className="error fw-bold mt-2 px-2 fs-5 text-danger">
            {errors[Object.keys(errors)[0]]?.message}
          </p>

          <Button disabled={disabled} className="btn mt-3" color="success">
            Save
          </Button>
        </Form>
      </main>
    </FullLayout>
  );
};

export default ShareArticle;
