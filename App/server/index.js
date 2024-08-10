/* eslint-disable prettier/prettier */
import pkg from 'express';
import bodyParser from 'body-parser';
import { BigQuery } from "@google-cloud/bigquery";
import { Storage } from '@google-cloud/storage';
import {GoogleAuth} from 'google-auth-library';
import fs from 'fs';

// import { OAuth2Client } from 'google-auth-library';
// import http from 'http';
// import url from 'url';
// import open from 'open';
// import destroyer from 'server-destroy';

const app = pkg();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(pkg.urlencoded({ extended: true }));
app.use(pkg.json({ type: 'application/*+json' }));
app.use(bodyParser.json({ type: 'application/*+json' }));

app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});
app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);

const projectId = `hack-team-dbvolt-hacksquad`;

const bucketName = `dbvolt-hacksquad-dementia`;

// bigquery.query(query)
//   .then(data => {
//     console.log(data)
//         const rows = data[0];
//         //rows.forEach(row => console.log(rows));
//       })
//   .catch(err => console.log(err));

app.get('/api/bigquery',(req, res) => {

  //const query = `SELECT country_name, sum(population_male) as population_male, sum(population_female) population_female, sum(new_confirmed) new_confirmed FROM \`bigquery-public-data.covid19_open_data.covid19_open_data\` group by country_name LIMIT 10`;
  const query = `SELECT file_name, garnishing, manual, cast(score as BIGNUMERIC)*100 as score,
  case when garnishing='MAYBE' then 'action_required' else '' end as action FROM \`hack-team-dbvolthacksquad.hacksquad.doc_classification\` order by update_time desc LIMIT 10`;

  const bigquery = new BigQuery({
    projectId: projectId,
    keyFilename: `../App/src/application_default_credentials.json`,
  });

  bigquery.query(query)
  .then(data => {
    //console.log(data)
        const rows = data[0];
        const origin = req.headers.origin;
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Content-Type', 'application/json');
        res.send({rows});
      })
  .catch(err => console.log(err));
});

const storage = new Storage({
  projectId: projectId,
  keyFilename: `../App/src/application_default_credentials.json`,
});

function uploadFile (files) {
  const bucketName = `dementia-image-input`;
  const localfilePath = "C:/Users/Vishal/OneDrive/Desktop/";
  files?.map(async file => {
    console.log(file);
    try {
      storage.bucket(bucketName).upload(`${localfilePath}${file}`,{
        destination : file
      });
      console.log("done");
    }catch (error){
      console.log("error", error);
    }
  })
};

function ReadFile () {
  const bucketName = `dbvolt-hacksquad-dementia`;
    try {
      const contents = storage.bucket(bucketName).file("response/people_response.json").download();
      contents.then((res) => {
        const jsonContent = JSON.parse(res);
        console.log("jsonContent",jsonContent);
        return jsonContent;
      })
    }catch (error){
      console.log("error", error);
    }
};

// app.get('/api/storage', async(req, res) => {
//   let bucketName = `hack-team-dbvolthacksquad`

//   // Initiate a Storage client
//   const storage = new Storage();

//   // List files in the bucket and store their name in the array called 'result'
//   const [files] = await storage.bucket(bucketName).getFiles();
//   let result = [];
//   files.forEach(file => {
//     console.log(file.name);
//     result.push(file.name);
//   });

//   // Send the result upon a successful request
//   res.status(200).send(result).end();
// });

// const storage1 = new Storage({
//   projectId: projectId,
//   keyFilename: `../App/src/application_default_credentials.json`,
// });

// debugger;
// async function listFiles () {
//   const response = await storage1.object.list({
//     bucket: `hack-team-dbvolthacksquad`,
//   });

//   const files = response.data.items;
//   console.log('Files in bucket:');
//   files.forEach((file) => {
//     console.log(file.name);
//   });
// };

//listStorageFiles();
//uploadFile();
// listFiles();

app.post('/api/googlecloudupload', (req, res) =>{  
  var origin = req.headers.origin;
  console.log("Approvedata1",req.body)
  let data = Object.keys(req.body);
  let pData = data[0];
  let files = pData?.split(",");
  console.log("data 0 ",pData?.split(","))

  //Upload File 

  const bucketName = `dementia-image-input`;
  //const localfilePath = "C:/capturedImage/";
  const localfilePath = "C:/Users/Vishal/OneDrive/Desktop/";
  files?.map(async file => {
    console.log(file);
    try {
      storage.bucket(bucketName).upload(`${localfilePath}${file}`,{
        destination : file
      }).then(
        () =>{
          res.setHeader('Access-Control-Allow-Origin', origin);
          res.setHeader('Content-Type', 'application/json');
          res.send("ok");
        }
      )
      console.log("done");
    }catch (error){
      console.log("error", error);
    }
  })



  // uploadFile(files).then(
  //   () => {
  //     res.setHeader('Access-Control-Allow-Origin', origin);
  //     res.setHeader('Content-Type', 'application/json');
  //     //console.log('googlecloudFetchPeopleData',jsonContent);
  //     res.send(jsonContent);
  //   }
  // )
  })

  
app.get('/api/googlecloudFetchPeopleData', async (req, res) =>{
  const bucketName = `dbvolt-hacksquad-dementia`;
  let jsonContent = '';
  try {
    await storage.bucket(bucketName).file("response/people_response.json").download()
    .then((response) => {
      jsonContent = JSON.parse(response);
      //console.log("jsonContent",jsonContent);
      const origin = req.headers.origin;
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Content-Type', 'application/json');
      //console.log('googlecloudFetchPeopleData',jsonContent);
      res.send(jsonContent);
    })
  }catch (error){
    console.log("error", error);
  }
  

})


//readFilefromCloudStorage();


/**
* Instead of specifying the type of client you'd like to use (JWT, OAuth2, etc)
* this library will automatically choose the right client based on the environment.
*/
// async function main() {
//   const auth = new GoogleAuth({
//     scopes: 'https://www.googleapis.com/auth/cloud-platform'
//   });
//   const client = await auth.getClient();
//   //const projectId = await auth.getProjectId();,
//   console.log('auth',auth);
//   const url = `https://dns.googleapis.com/dns/v1/projects/${projectId}`;
//   const res = await client.request({ url });
//   console.log(res.data);
// }

// main().catch(console.error);


/**
* Instead of specifying the type of client you'd like to use (JWT, OAuth2, etc)
* this library will automatically choose the right client based on the environment.
*/
// async function main() {
//   const auth = new GoogleAuth({
//     scopes: 'https://www.googleapis.com/auth/cloud-platform'
//   });
//   const client = await auth.getClient();
//   const projectId = await auth.getProjectId();
//   const url = `https://dns.googleapis.com/dns/v1/projects/${projectId}`;
//   const res = await client.request({ url });
//   console.log(res.data);
// }

// main().catch(console.error);

async function readFilefromCloudStorage() {
  // const contents = await storage.bucket('hack-team-dbvolthacksquad').file('UI_UPLOAD.pdf').download();
  // const jsonContent = JSON.parse(contents);

  // storage
  // .bucket('hack-team-dbvolthacksquad')
  // .file('file-name')
  // .getMetadata()
  // .then(results => {
  //     console.log("results is", results[0])
  // })
  // .catch(err => {
  //     console.error('ERROR:', err);
  // });


   storage
  .bucket('hack-team-dbvolthacksquad-garnished-docs-processed')
  .getFiles({ prefix: '', autoPaginate: false })
  .then((files) => {
    console.log(files);
  })
  .catch(err => {
      console.error('ERROR:', err);
  });

  // storage.bucket('hack-team-dbvolthacksquad')
  //   .getFilesStream({ prefix: '' })
  //   .on('error', console.error)
  //   .on('data', function (file) {
  //     console.log("received 'data' event");
  //     console.log(file.name);
  //   })
  //   .on('end', function () {
  //     console.log("received 'end' event");
  //   });
}

app.get('/api/readStorage',(req, res) => {
  storage
  .bucket('hack-team-dbvolthacksquad-garnished-docs-processed')
  .getFiles({ prefix: '', autoPaginate: false })
  .then((files) => {
    console.log(files);
    const origin = req.headers.origin;
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Content-Type', 'application/json');
        res.send({files});
  })
  .catch(err => {
      console.error('ERROR:', err);
  });
});

app.get('/api/bigquerychart',(req, res) => {

  //const query = `SELECT country_name, sum(population_male) as population_male, sum(population_female) population_female, sum(new_confirmed) new_confirmed FROM \`bigquery-public-data.covid19_open_data.covid19_open_data\` group by country_name LIMIT 10`;
  const query = `SELECT garnishing as name,count(1) as y FROM \`hack-team-dbvolthacksquad.hacksquad.doc_classification\` group by garnishing`;

  const bigquery = new BigQuery({
    projectId: projectId,
    keyFilename: `../App/src/application_default_credentials.json`,
  });

  bigquery.query(query)
  .then(data => {
    //console.log(data)
        const rows = data[0];
        const origin = req.headers.origin;
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Content-Type', 'application/json');
        res.send({rows});
      })
  .catch(err => console.log(err));
});

app.get('/api/barquerychart',(req, res) => {

  //const query = `SELECT country_name, sum(population_male) as population_male, sum(population_female) population_female, sum(new_confirmed) new_confirmed FROM \`bigquery-public-data.covid19_open_data.covid19_open_data\` group by country_name LIMIT 10`;
  const query = `select Manual_Review, cnt from (select 'Total Reviewed' as Manual_Review, count(*) as cnt, 1 as sort_order from \`hack-team-dbvolthacksquad.hacksquad.doc_classification\` where manual is null
  union all
  select 'Reviewed Garnished' as Manual_Review, count(*) as cnt, 2 as sort_order from \`hack-team-dbvolthacksquad.hacksquad.doc_classification\` where upper(manual) ='APPROVED') a
  order by sort_order`;

  const bigquery = new BigQuery({
    projectId: projectId,
    keyFilename: `../App/src/application_default_credentials.json`,
  });

  bigquery.query(query)
  .then(data => {
    //console.log(data)
        const rows = data[0];
        const origin = req.headers.origin;
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Content-Type', 'application/json');
        res.send({rows});
      })
  .catch(err => console.log(err));
});

app.get('/api/columnquerychart',(req, res) => {

  //const query = `SELECT country_name, sum(population_male) as population_male, sum(population_female) population_female, sum(new_confirmed) new_confirmed FROM \`bigquery-public-data.covid19_open_data.covid19_open_data\` group by country_name LIMIT 10`;
  const query = ` select score, cnt from
  (select '0-20' as score, count(*) as cnt, 1 as sort_order from \`hack-team-dbvolthacksquad.hacksquad.doc_classification\` where  cast(score as BIGNUMERIC)*100>0 and  cast(score as BIGNUMERIC)*100<=20
  union all
  select '21-40' as score, count(*) as cnt, 2 as sort_order from \`hack-team-dbvolthacksquad.hacksquad.doc_classification\` where  cast(score as BIGNUMERIC)*100>20 and  cast(score as BIGNUMERIC)*100<=40
  union all
  select '41-60' as score, count(*) as cnt, 3 as sort_order from \`hack-team-dbvolthacksquad.hacksquad.doc_classification\` where  cast(score as BIGNUMERIC)*100>40 and  cast(score as BIGNUMERIC)*100<=60
  union all
  select '61-80' as score, count(*) as cnt, 4 as sort_order from \`hack-team-dbvolthacksquad.hacksquad.doc_classification\` where  cast(score as BIGNUMERIC)*100>60 and  cast(score as BIGNUMERIC)*100<=80
  union all
  select '81-100' as score, count(*) as cnt, 5 as sort_order from \`hack-team-dbvolthacksquad.hacksquad.doc_classification\` where  cast(score as BIGNUMERIC)*100>80 and  cast(score as BIGNUMERIC)*100<=100) b
  order by sort_order asc`;

  const bigquery = new BigQuery({
    projectId: projectId,
    keyFilename: `../App/src/application_default_credentials.json`,
  });

  bigquery.query(query)
  .then(data => {
    //console.log(data)
        const rows = data[0];
        const origin = req.headers.origin;
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Content-Type', 'application/json');
        res.send({rows});
      })
  .catch(err => console.log(err));
});



app.post('/api/approvegcp',(req, res) => {
  console.log("Approvedata2",req.body)
  let data = Object.keys(req.body);
  let pData = JSON.parse(data[0]);
  console.log("data 0 ",pData.file_name)
  const query = `update \`hack-team-dbvolthacksquad.hacksquad.doc_classification\` set manual='APPROVED', garnishing='TRUE' WHERE FILE_NAME IN ('${pData.file_name}')`;
console.log("query",query);
  const bigquery = new BigQuery({
    projectId: projectId,
    keyFilename: `../App/src/application_default_credentials.json`,
  });

  bigquery.query(query)
  .then(data => {
    //console.log(data)
        const rows = data[0];
        const origin = req.headers.origin;
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Content-Type', 'application/json');
        res.send({rows});
      })
  .catch(err => console.log(err));
});

app.post('/api/rejectgcp',(req, res) => {
  console.log("Approvedata3",req.body)
  let data = Object.keys(req.body);
  let pData = JSON.parse(data[0]);
  console.log("data 0 ",pData.file_name)
  const query = `update \`hack-team-dbvolthacksquad.hacksquad.doc_classification\` set manual='REJECTED', garnishing='TRUE' WHERE file_name IN ('${pData.file_name}')`;
console.log("query",query);
  const bigquery = new BigQuery({
    projectId: projectId,
    keyFilename: `../App/src/application_default_credentials.json`,
  });

  bigquery.query(query)
  .then(data => {
    //console.log(data)
        const rows = data[0];
        const origin = req.headers.origin;
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Content-Type', 'application/json');
        res.send({rows});
      })
  .catch(err => console.log(err));
});

app.post('/api/writeAndUploadFile',(req, res) => {
  const content = JSON.stringify(req.body.body);
  const file = req.body.file;
  const id = req.body.id;
  console.log("req.body", req.body);

  const path = "C:/Users/Vishal/OneDrive/Desktop/";

  //uploadImage
  try {
    storage.bucket(bucketName).upload(`${path}${file}`,{
      destination : `${id}.jpg`
    });
    console.log("uploaded Image");
  }catch (error){
    console.log("error uploading Image", error);
  }

  //write response json
  fs.writeFile('C:/Users/Vishal/OneDrive/Desktop/hackathon 2024/staticData/people_response.json', JSON.parse(content), (err) => {
    if (err) {
        console.error(err);
    } else {
      console.error("File written successfully");
      
      //upload response.json
      try {
        storage.bucket(bucketName).upload(`C:/Users/Vishal/OneDrive/Desktop/hackathon 2024/staticData/people_response.json`,{
          destination : `response/people_response.json`
        });
        console.log("uploaded response.json");
      }catch (error){
        console.log("error uploaded response.json", error);
      }
    }
  });
});

function getNewestFile(files, path) {
  var out = [];
  //files.filter(file => file.split('.').pop())
  files.forEach(function(file) {
    console.log('file',file);
      var stats = fs.statSync(path + "/" +file);
      if(stats.isFile()) {
          out.push({"file":file, "mtime": stats.mtime.getTime()});
      }
  });
  out.sort(function(a,b) {
      return b.mtime - a.mtime;
  })
  return (out.length>0) ? out[0].file : "";
}

app.get('/api/getRecentFile', (req, res) => {
// var downloadFolder = process.env.USERPROFILE + "/Downloads";
// console.log('downloadFolder',downloadFolder);
const bucketName = `dementia-image-input`;
const origin = req.headers.origin;
res.setHeader('Access-Control-Allow-Origin', origin);
res.setHeader('Content-Type', 'application/json');

var downloadFolder ='C:/Users/Vishal/OneDrive/Desktop/capturedImage/';
//var downloadFolder ='C:/capturedImage';

setTimeout(
  function (){
    fs.readdir(downloadFolder, function(err, files) {
      if (err) { throw err; }

      var latestFile = getNewestFile(files, downloadFolder);  
      console.log('latestFile',latestFile);

      try {
        storage.bucket(bucketName).upload(`${downloadFolder}\\${latestFile}`,{
          destination : `${latestFile}`
        }).then(() => {

          // fetch active id:

          const bucketName = 'dementia-image-output';
          
          setTimeout(
            function (){
              try {
                storage.bucket(bucketName).file("predictions/output.json").download()
                .then((response) => {      
                  const predictionData = JSON.parse(response);
                  console.log("prediction DAta", predictionData);
                  res.send(predictionData);
                })
              }catch (error){
                console.log("error", error);
              }  
            },8000
          )  

        }).catch(err => {
          // error upload latest image uploaded
        });
        console.log("uploaded captured image");
      }catch (error){
        console.log("error uploading captured image", error);
      }
  })
},2000
)
});


async function getPrediction() {
  const bucketName = 'dementia-image-output';
  try {
    await storage.bucket(bucketName).file("predictions/output.json").download()
    .then((response) => {      
      const prediction = JSON.parse(response);
      console.log("prediction DAta", prediction);
      return "3";
    })
  }catch (error){
    console.log("error", error);
  }
}


app.get('/api/getPredictionId', async (req, res) => {
  const bucketName = 'dementia-image-output';
  setTimeout(
    async function () {
      try {
        await storage.bucket(bucketName).file("predictions/output.json").download()
        .then((response) => {
          const origin = req.headers.origin;
          res.setHeader('Access-Control-Allow-Origin', origin);
          res.setHeader('Content-Type', 'application/json');
          const predictionData = JSON.parse(response);
          console.log("prediction DAta", predictionData);
          res.send(predictionData);
        })
      }catch (error){
        console.log("error", error);
      }
    }, 8000
  )
});


app.get('/api/getTimeLaps', async (req, res) => {
  const bucketName = 'dbvolt-hacksquad-dementia';
  try {

    debugger
    const [files] = await storage.bucket(bucketName).getFiles({prefix: 'ganesh/timelapse/',
      autoPaginate: false,})

    const fileNames = files.map(file => `https://storage.cloud.google.com/${bucketName}/${file.name}?authuser=1`)
    const origin = req.headers.origin;
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Content-Type', 'application/json');
    res.send(fileNames);
    console.log("fileNames", fileNames);

  }catch (error){
    console.log("error", error);
  }
});