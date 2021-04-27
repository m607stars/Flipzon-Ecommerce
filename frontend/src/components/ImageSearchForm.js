import React, { useState } from 'react';
import Axios from 'axios';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";


export default function ImageSearchBox() {
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');
  const [imagePath, setImagePath] = useState('');
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const history = useHistory();

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setLoadingUpload(true);
    try {
      var { data } = await Axios.post('/api/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImagePath(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
    if(!loadingUpload && !errorUpload){
      console.log(data);
      history.push(`/search/image`,{
        searchImagePath: data
      });
    }
  };

  return (
    <div>
      <input
        type="file"
        id="imageFile"
        onChange={uploadFileHandler}
      ></input>
      {loadingUpload && <LoadingBox></LoadingBox>}
      {errorUpload && (
        <MessageBox variant="danger">{errorUpload}</MessageBox>
      )}
    </div>
  );
}