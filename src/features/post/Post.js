import React from "react";

import { Button } from "../../components/atoms/Button";

export const Post = ({ name, store, description, deleteHandler, id }) => {
  return (
    <div className="bg-white rounded-lg shadow-md">
      <img
        src="https://popmenucloud.com/cdn-cgi/image/width=1200,height=630,format=auto,fit=cover/jtndxorq/18e22f3c-1347-41aa-8c83-c51c128d86fd.jpeg"
        alt="img"
        className="rounded-t-lg"
      />
      <div className="p-4">
        <h2>{name}</h2>
        <h3>{store}</h3>
        <p>{description}</p>
      </div>
      <div className="p-4">
        <Button content="Favorite" className="bg-pink-400" />
        <Button content="Edit" className="bg-blue-400" />
        <Button content="Delete" className="bg-danger" />
      </div>
    </div>
  );
};
