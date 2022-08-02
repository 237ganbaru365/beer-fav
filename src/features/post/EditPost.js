import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 } from "uuid";

import {
  addFileToStorage,
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
  const [isLoading, setIsLoading] = useState();

  const postId = params.id;

  const editHandler = async (data) => {
    setIsLoading(true);
    const { name, store, description } = data;

    // create file reference
    const fileData = data.file[0];
    const fileName = fileData.name + v4();

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
      setPost(data.data());
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
