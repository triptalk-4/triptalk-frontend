import React, { useState } from 'react';

export default function ImgEdit() {
  const [images, setImages] = useState<any[]>([]);
 // const maxImageCount = 5;

  const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nowSelectImageList = e.target.files;
    const nowImageList = [...images];

    if (nowSelectImageList) {
      for (let i = 0; i < nowSelectImageList.length; i += 1) {
        const nowImage = URL.createObjectURL(nowSelectImageList[i]);
        nowImageList.push(nowImage);
      }
      setImages(nowImageList);
    }
  };

  return (
    <>
      <div>
        <label htmlFor="input-file" className="ImageEdit">
          파일등록
        </label>
        <input
          type="file"
          multiple={true}
          id="input-file"
          style={{ display: 'none' }}
          accept=".jpg,.jpeg,.png"
          onChange={addImage}></input>
      </div>
    </>
  );
}
