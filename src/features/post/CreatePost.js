import React from "react";

import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

import { auth, db, storage } from "../../firebase";
import { addPost } from "../../app/servises/post.services";

import { Card } from "../../components/atoms/Card";
import { PostForm } from "../../components/organisms/PostForm";
import { useDispatch, useSelector } from "react-redux";
import { addMyPostId } from "../user/userSlice";
import { doc, updateDoc } from "firebase/firestore";

export const CreatePost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { myPostIdList } = useSelector((state) => state.user.user);

  // check authenticated user
  const { uid, displayName } = auth.currentUser;

  // processing on submit
  const createHandler = async (data) => {
    const { name, store, description } = data;

    // create file reference
    const uploadFile = data.file[0];
    const imgRef = ref(storage, `images/${uploadFile.name + v4()}`);

    try {
      // upload file to firebase storage
      await uploadBytes(imgRef, uploadFile);
      const imgUrl = await getDownloadURL(imgRef);
      const newPost = {
        name,
        store,
        description,
        imgUrl,
        userId: uid,
        username: displayName,
      };

      // store post data to firestore
      const postData = await addPost(newPost);
      console.log("created post successfully!", postData);

      const myPostId = postData.id;

      // store user data to firestore
      const userDocRef = doc(db, "users", uid);

      updateDoc(userDocRef, {
        myPostIdList: [...myPostIdList, myPostId],
      })
        .then((res) => console.log(res))
        .catch((err) => console.error(err));

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
  };

  return (
    <Card>
      <h1 className="text-center mb-4">Create a new post</h1>
      <PostForm isAddMode={true} createHandler={createHandler} />
    </Card>
  );
};
