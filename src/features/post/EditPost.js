import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

import { storage } from "../../firebase";
import { getPost, updatePost } from "../../app/servises/post.services";

import { Card } from "../../components/atoms/Card";
import { PostForm } from "../../components/organisms/PostForm";

export const EditPost = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [post, setPost] = useState(null);

  const editHandler = async (data) => {
    const { name, store, description } = data;

    // create file reference
    const uploadFile = data.file[0];
    const imgRef = ref(storage, `images/${uploadFile.name + v4()}`);

    try {
      // upload file to firebase storage
      await uploadBytes(imgRef, uploadFile);
      const imgUrl = await getDownloadURL(imgRef);
      const updatedPost = { name, store, description, imgUrl };

      // update data to firestore
      await updatePost(params.id, updatedPost);
      console.log("updated successfully!");
      navigate("/posts");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPost(params.id);
      setPost(data.data());
    };
    fetchData();
  }, []);

  return (
    <Card>
      <h1 className="text-center mb-4">Edit a post</h1>
      {post ? (
        <PostForm
          preloadValues={post}
          isAddMode={false}
          editHandler={editHandler}
        />
      ) : (
        <div>Loading...</div>
      )}
    </Card>
  );
};
