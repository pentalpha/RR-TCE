const uploadFile = require("../middleware/upload");
const fs = require("fs");
const baseUrl = "http://localhost:8080/files/";
const { Console } = require("console");

class FileEntry{
  constructor(id, name, owner){
    this.id = id;
    this.name = name;
    this.owner = owner;
  }
}

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({ files: [] })
  .write()

if (db.get('files').value().length == 0){
  console.log("Populating storage DB with default entries")
  db.get('files').push(new FileEntry(0, "tcc0.pdf", 0)).write()
  db.get('files').push(new FileEntry(1, "tcc1.pdf", 1)).write()
  db.get('files').push(new FileEntry(2, "tcc2.pdf", 4)).write()
  db.get('files').push(new FileEntry(3, "tcc3.pdf", 6)).write()
}

console.log("Files currently in storage DB:")
console.log(db.get('files').value())

const getUsedFileIDs = () => {
  id_set = new Set()
  files = db.get('files').value()
  for(file_entry of files){
    id_set.add(file_entry.id)
  }
  return id_set
}

const getUnusedFileID = () => {
  used_ids = getUsedFileIDs()
  new_id = 0
  while (used_ids.has(new_id)){
    new_id += 1
  }
  return new_id
}
const upload = async (req, res) => {
  try {
    await uploadFile(req, res);

    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    new_id = getUnusedFileID()
    new_file = new FileEntry(new_id, req.file.originalname, req.body.owner)
    result = db.get('files').push(new_file).write()
    
    res.status(200).send({
      message: "Uploaded the file successfully: " + req.file.originalname,
      newid: new_id,
    });


  } catch (err) {
    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

const getListFiles = (req, res) => {
  const directoryPath = __basedir + "/resources/static/assets/uploads/";

  console.log(db.get('files').value())
  let current_files = db.get('files').value()
  res.status(200).send(current_files)
};

const download = (req, res) => {
  const fileId = parseInt(req.params.name);
  let fileName = "."
  const directoryPath = __basedir + "/resources/static/assets/uploads/";

  let current_files = db.get('files').value()
  for(file_entry of current_files){
    if (file_entry.id == fileId){
      fileName = file_entry.name;
    }
  }
  if (fileName != "."){
    console.log("Found file"+fileId+": "+fileName)
  }else{
    console.log("Not found file"+fileId)
  }
  

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};

module.exports = {
  upload,
  getListFiles,
  download,
};
