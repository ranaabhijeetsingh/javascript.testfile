import multer from "multer";

const strore = multer.diskStorage({
    destination:function(req,file,cd){
        cd(null,"./public/temp")
    },
    filename:function(req,file,cd){
        cd(null.file.originalname)
    }
})

export const upload = multer({
    storage,
})