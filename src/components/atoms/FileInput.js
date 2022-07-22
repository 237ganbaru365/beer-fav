import React, { useEffect, useState } from "react";

import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

export const FileInput = ({ register }) => {
  const [imgRef, setImgRef] = useState(null);

  const uploadHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setImgRef({
        fileName: file.name,
        previewPhoto: e.target.result,
      });
    };
    reader.readAsDataURL(file);
  };

  const resetHandler = (e) => {
    setImgRef(null);
  };

  useEffect(() => {
    console.log(imgRef);
  }, [imgRef]);

  return (
    <>
      <div className="FlexCenter mb-8">
        <div className="h-12 w-12 rounded-full overflow-hidden FlexCenter bg-slate-300 mr-4">
          {imgRef ? (
            <img
              src={imgRef.previewPhoto}
              alt=""
              className="object-cover h-12 w- w-full"
            />
          ) : (
            <InsertPhotoIcon sx={{ opacity: "70%" }} />
          )}
        </div>
        <div className="FlexCenter">
          <input
            type="file"
            id="file"
            hidden
            accept="image/*, caputure=camera"
            {...register("file")}
            onChange={uploadHandler}
          />
          <label
            htmlFor="file"
            className="py-2 px-3 border border-gray-300 rounded-md text-sm leading-4 font-medium text-gray-700 hover:text-secondary hover:border-secondary focus:outline-none focus:border-secondary focus:shadow-outline-indigo active:bg-gray-50 active:text-secondary transition duration-150 ease-in-out"
          >
            Upload Photo
          </label>
          <div className="text-gray-500 text-xs FlexCenter ml-2">
            {imgRef ? (
              <>
                <small>{imgRef.fileName}</small>
                <p onClick={resetHandler}>
                  <CancelRoundedIcon />
                </p>
              </>
            ) : (
              <small>No File Chosen</small>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
