const aws = require("aws-sdk");

aws.config.update({
    // Please uncomment these below lines and provide the credentials before use. 
    // accessKeyId: "",
    // secretAccessKey: "",
    region: "ap-south-1"
});

let uploadFile = async (file) => {
    try {
        return new Promise(function (resolve, reject) {

            let s3 = new aws.S3({ apiVersion: "2006-03-01" });

            var uploadParams = {
                ACL: "public-read",
                Bucket: "classroom-training-bucket",
                Key: "abc/" + file.originalname,
                Body: file.buffer,
            };

            s3.upload(uploadParams, function (err, data) {
                if (err) {
                    return reject({ error: err });
                }
                console.log("file uploaded succesfully");
                return resolve(data.Location);
            });
        });
    } catch (err) {
        console.log(err.message)
    }
};


module.exports = { uploadFile };