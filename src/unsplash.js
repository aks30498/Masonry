import {createApi} from 'unsplash-js';

console.log(process.env.REACT_APP_ACCESS_KEY)

const unsplash = new createApi({
  accessKey: process.env.REACT_APP_ACCESS_KEY
});

export default unsplash;