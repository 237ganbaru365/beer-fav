import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";

import { auth } from "../../firebase";
import { addPost } from "../../app/servises/post.services";
import {
  addFileToStorage,
  getFileUrlFromStorage,
} from "../../app/servises/file.services";
import { updateUserMyPostIdList } from "../../app/servises/user.services";
import { addMyPostId } from "../user/userSlice";

import { Card } from "../../components/atoms/Card";
import { PostForm } from "../../components/organisms/PostForm";

export const CreatePost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState();

  // get current myPostIdList from redux state
  const { myPostIdList } = useSelector((state) => state.user.user);

  // check authenticated user
  const { uid, displayName } = auth.currentUser;

  // create function
  const createHandler = async (data) => {
    setIsLoading(true);

    const { name, store, description } = data;

    // create file reference
    const fileData = data.file[0];
    const fileName = fileData.name + v4();

    try {
      await addFileToStorage(fileData, fileName);
      const imgUrl = await getFileUrlFromStorage(fileName);

      // store post data to firestore
      const newPost = {
        name,
        store,
        description,
        imgUrl,
        userId: uid,
        username: displayName,
      };
      const postData = await addPost(newPost);

      // store user data to firestore
      const myPostId = postData.id;
      await updateUserMyPostIdList(uid, myPostIdList, myPostId);

      // set postid to user state
      dispatch(
        addMyPostId({
          myPostId,
        })
      );

      navigate("/posts");
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <section>
      <Card>
        <h1>Create new post</h1>
        <PostForm
          isAddMode={true}
          createHandler={createHandler}
          isLoading={isLoading}
        />
      </Card>
    </section>
  );
};
