import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 } from "uuid";

import {
  addFileToStorage,
  getFileDataFromStorage,
  getFileUrlFromStorage,
} from "../../app/servises/file.services";
import { getPost, updatePost } from "../../app/servises/post.services";

import { Card } from "../../components/atoms/Card";
import { PostForm } from "../../components/organisms/PostForm";
import CircularProgress from "@mui/material/CircularProgress";

export const EditPost = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [post, setPost] = useState(null);
  const [fileRef, setFileRef] = useState(null);
  const [isLoading, setIsLoading] = useState();

  const postId = params.id;

  const editHandler = async (data) => {
    setIsLoading(true);

    const { name, store, description } = data;

    // create file reference

    // TODO: もしも画像を変更しなければ、そのまま既存のfileデータを使用する。=> つまり、画像変更してない場合は、storageにaddしなくていい
    let fileData;
    let fileName;

    if (fileRef) {
      fileData = fileRef;
      fileName = fileRef.name;
    } else {
      fileData = data.file[0];
      fileName = fileData.name + v4();
    }

    try {
      // upload file to firebase storage
      await addFileToStorage(fileData, fileName);
      const imgUrl = await getFileUrlFromStorage(fileName);

      // update data to firestore
      const updatedPost = { name, store, description, imgUrl };
      await updatePost(postId, updatedPost);

      navigate("/posts");
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  //FIXME: ここuseCallbackつかうべき？
  useEffect(() => {
    const fetchData = async () => {
      const data = await getPost(postId);

      //TODO: postのデータだけじゃなくて、storageからfileのリファレンスを取得する必要がある
      const fileData = await getFileDataFromStorage(
        "me.jpg4aa2eb82-f058-48cf-b348-adf859b7ce3b"
      );

      console.log(fileData);

      setPost(data.data());
      setFileRef(fileData);
    };
    fetchData();
  }, [postId]);

  return (
    <section>
      <Card>
        <h1>Edit post</h1>
        {post ? (
          <PostForm
            isAddMode={false}
            preloadValues={post}
            editHandler={editHandler}
            isLoading={isLoading}
          />
        ) : (
          <div>
            <CircularProgress color="inherit" />
          </div>
        )}
      </Card>
    </section>
  );
};
