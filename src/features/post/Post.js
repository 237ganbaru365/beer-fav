import React, { useEffect, useState } from "react";

import {
  addUserFavorite,
  getUserByAuthId,
  removeUserFavorite,
} from "../../app/servises/user.services";
import { auth } from "../../firebase";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { DotLine } from "../../components/atoms/DotLine";
import { OnlyAuthActions } from "../../components/organisms/OnlyAuthActions";

export const Post = ({
  name,
  store,
  description,
  imgUrl,
  author,
  deleteHandler,
  postId,
}) => {
  const [isFav, setIsFav] = useState(false);

  // react側でuserがもつfavListを更新する
  // FIXME: ここでstateもつべきじゃないので、後でけします
  // const [favList, setFavList] = useState([]);

  // get auth user
  const authUser = auth.currentUser;
  const authId = authUser.uid;

  // user のfavorites 配列をdbから取得
  const getFavList = async () => {
    try {
      const data = await getUserByAuthId(authId);

      const userFavList = await data.data().favorites;

      console.log("userFavList", userFavList);

      setFavList([...userFavList]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFavList();
    // console.log("first render: favlist", favList);
  }, []);

  console.log("favlist", favList);

  const addFavHandler = async () => {
    // setFavList([...favList, postId]);

    // 自分自身に新たな要素を追加するときは、アロー関数つかったやり方じゃないとバグる
    setFavList((prev) => {
      return [...prev, postId];
    });

    // try {
    //   await addUserFavorite(authId, ...favList);
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const removeFavHandler = async () => {
    setFavList(favList.filter((fav) => fav !== postId));
    console.log("render when remove fav: favlist", favList);
    try {
      await removeUserFavorite(authId, ...favList);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div>
        <img
          src={imgUrl}
          alt="img"
          className="rounded-t-lg object-cover h-32 w-full opacity-70"
        />
      </div>
      <p className="text-right p-2 text-sm">
        created by: <span className="font-bold">{author}</span>
      </p>
      <div className="px-4">
        <h2>{name}</h2>
        <h4>{store}</h4>
        <DotLine />
        <p>{description}</p>
        <DotLine />
      </div>
      <div className="p-2 text-right">
        {isFav ? (
          <FavoriteIcon className="text-primary" onClick={removeFavHandler} />
        ) : (
          <FavoriteBorderIcon
            className="text-primary"
            onClick={addFavHandler}
          />
        )}
        <OnlyAuthActions
          deleteHandler={deleteHandler}
          postId={postId}
          author={author}
          authUser={authUser}
        />
      </div>
    </div>
  );
};
