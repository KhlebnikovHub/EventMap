const router = require('express').Router();
const axios = require('axios');
const { User, Event } = require('../db/models');

router.route('/')
  .post(async (req, res) => {
    const { folder, photo } = req.body
    if(folder !== '') {
    const regularFolder = folder.match(/rs\/([\w]{0,})/gmi);
    const folderId = regularFolder?.map(el => el.slice(3, el.length))
    axios.get(`https://drive.google.com/embeddedfolderview?id=${folderId}#grid`).then((resp)=>{
      const site = resp.data;
      const regularId = site.match(/d\/([\w]{0,})/gmi);
      const imageId = regularId.map(el => el.slice(2, el.length))
      const imagePath = imageId.map(el => `https://drive.google.com/uc?export=view&id=${el}`)
      return res.json(imagePath)
      })
    }
  })

module.exports = router;
