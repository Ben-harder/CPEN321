const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
var isBase64 = require('is-base64');

// // test image
// const base64Test = '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';

// // test call
// uploadImage(base64Test);

/**
 * Uploads a base64-encoded image to aws s3 database and
 * returns a public URL to the image.
 * 
 * @param {string} base64String base64-encoded image
 */
exports.uploadImage =  function (base64String) {
  var result;

  if (!base64String) { // null check 
    result = 'Error: base64 string cannot be null'
  }
  else if (!isBase64(base64String)) { // validity check
    result = 'Error: base64 string is not valid'
  }
  else {
    //configuring the AWS environment
    AWS.config.update({
      accessKeyId: "AKIAI4HK6BIBMIFE4TXQ",
      secretAccessKey: "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"
    });

    var s3 = new AWS.S3(); 
    // var filePath = "./data/file.txt";
    var buf = new Buffer(base64String, 'base64');

    //configuring parameters
    var params = {
      Bucket: 'browser-emplorium-images',
      Body : buf,
      Key : "folder/"+Date.now()+"_"+path.basename('mySchedule')+'.png',
      ContentEncoding: 'base64',
      ContentType: 'image/png',
      // ACL: 'public-read'
    };

    s3.upload(params, function (err, data) {
      //handle error
      if (err) {
        console.log("Error", err);
        result = 'Error: upload failed';
        return result;
      }

      //success
      if (data) {
        console.log("Uploaded in:", data.Location);
        result = data.Location;
        // console.log(result);
        return result;
      }
    });
  }
  //console.log(result);
  return result;
}

// /**
//  * Determines if base64 string can be decoded
//  * 
//  * @param {string} str base 64 string
//  */
// function isBase64(str) {
//   try {
//     console.log(window.atob(str));
//     return btoa(atob(str)) == str;
//   } catch (err) {
//     console.log("invalid string");
//     return false;
//   }
// //   try {
// //     window.atob(str);
// // } catch(e) {
// //     // something failed
// //     console.log("invalid string");
// // }
// }




// //configuring the AWS environment
// AWS.config.update({
//   accessKeyId: "AKIAI4HK6BIBMIFE4TXQ",
//   secretAccessKey: "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"
// });

// var s3 = new AWS.S3(); 
// // var filePath = "./data/file.txt";
// var buf = new Buffer(base64String, 'base64');

// //configuring parameters
// var params = {
//   Bucket: 'browser-emplorium-images',
//   Body : buf,
//   Key : "folder/"+Date.now()+"_"+path.basename('mySchedule')+'.png',
//   ContentEncoding: 'base64',
//   ContentType: 'image/png',
//   // ACL: 'public-read'
// };

// s3.upload(params, function (err, data) {
// //handle error
// if (err) {
//   console.log("Error", err);
// }

// //success
// if (data) {
//   console.log("Uploaded in:", data.Location);
// }
// });






// /**
//  * Determines if string is valid base64
//  * 
//  * @param {string} str base 64 string
//  */
// function isBase64(str) {
//   try {
//     console.log("valid string");
//     return btoa(atob(str)) == str;
//   } catch (err) {
//     console.log("invalid string");
//     return false;
//   }
// }

// module.exports = {

//   /**
//    * Upload base64 encoded image to aws s3 database and
//    * return a URL to the image.
//    * Takes base64 image string.
//    */
//   uploadImage(req, res) {
//     let ret = {};
//     // check null string
//     if (!req.body.base64) {
//       ret.errorMessage = "base64 string cannot be null";
//       return res.status(400).send(ret);
//     }
//     // check valid base64 string
//     if (!isBase64(req.body.base64)) {
//       ret.errorMessage = "base64 string is invalid";
//       return res.status(400).send(ret);
//     }
//     // begin upload and return url
//     else {
//       //configuring the AWS environment
//       AWS.config.update({
//         accessKeyId: "AKIAI4HK6BIBMIFE4TXQ",
//         secretAccessKey: "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"
//       });

//       var s3 = new AWS.S3();
//       // var filePath = "./data/file.txt";
//       buf = new Buffer(res.body.base64, 'base64');

//       //configuring parameters
//       var params = {
//         Bucket: 'browser-emplorium-images',
//         Body : buf,
//         Key : "folder/"+Date.now()+"_"+path.basename('mySchedule')+'.png',
//         ContentEncoding: 'base64',
//         ContentType: 'image/png',
//         // ACL: 'public-read'
//       };

//       s3.upload(params, function (err, data) {
//       //handle error
//       if (err) {
//         console.log("Error", err);
//       }

//       //success
//       if (data) {
//         console.log("Uploaded in:", data.Location);
//         return res.status(200).send(data.Location);
//       }
//       });
//     }
//   }
// };