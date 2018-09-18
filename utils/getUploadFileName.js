function getUploadFileName(filename,ext){
  // return `${Date.now()}${Number.parseInt(Math.random() * 10000)}.${ext}`;
  return `${filename.split(".")[0]}_${Date.now()}.${ext}`;
}
module.exports = getUploadFileName; 