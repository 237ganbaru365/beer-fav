import React from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import { Button } from "../../components/UI/Button";

export const Post = () => {
  return (
    <Card sx={{ maxWidth: 350 }}>
      <CardMedia
        component="img"
        height="100"
        image="https://popmenucloud.com/cdn-cgi/image/width=1200,height=630,format=auto,fit=cover/jtndxorq/18e22f3c-1347-41aa-8c83-c51c128d86fd.jpeg"
        alt="beer"
      />
      <CardContent>
        <h2>Westcoast IPA</h2>
        <h3>Storm Brewery</h3>
        <p>
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </p>
      </CardContent>
      <CardActions>
        <Button content="Favorite" />
        <Button content="Edit" />
        <Button content="Delete" />
      </CardActions>
    </Card>
  );
};
