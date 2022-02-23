const md5 = require("md5");
const https = require("https");
const fs = require("fs/promises");
const path = require("path");
const datejs = require("datejs");
const API_URL = "https://api.paladins.com/paladinsapi.svc/";
const DEV_ID = "My secret DEV_ID";
const AUTH_KEY = "My secret AUTH_KEY";
const fifteenMinutesMS = 890000;

const createTimeStamp = () => {
  const time = new Date().toISOString().replace(/(\.\d{3})|[^\d]/g, "");
  return time;
};

const getSignature = (method) => {
  return md5(DEV_ID + method + AUTH_KEY + createTimeStamp());
};

const convertInUTC = (date) => {
  return Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );
};

const updateSession = async () => {
  const url =
    API_URL +
    "createsessionjson/" +
    DEV_ID +
    `/${getSignature("createsession")}/` +
    createTimeStamp();

  let data = "";

  return new Promise((resolve) => {
    https
      .get(url, (res) => {
        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", async () => {
          fs.writeFile(path.join(__dirname, "session.json"), data);
          resolve(data);
        });
      })
      .on("error", (err) => {
        console.log("Error: " + err.message);
      });
  });
};

const buildUrl = (method, info, sessionId) => {
  let params = "/";
  for (let i = 0; i < info.length; i++) {
    if (info[i] !== undefined) {
      params += info[i] + "/";
    }
  }
  params = params.slice(-0, -1);

  let url = "";
  if (method === "createsession") {
    url = `${API_URL}${method}json/${DEV_ID}/${getSignature(
      method
    )}/${createTimeStamp()}${params}`;
  } else {
    url = `${API_URL}${method}json/${DEV_ID}/${getSignature(
      method
    )}/${sessionId}/${createTimeStamp()}${params}`;
  }
  // console.log(url);
  return url;
};

const checkSession = async (method) => {
  let sessionData = JSON.parse(
    await fs
      .readFile(path.join(__dirname, "session.json"))
      .then((data) => data)
      .catch(async (err) => {
        if (err.code === "ENOENT") {
          return await updateSession();
        }
      })
  );
  sessionId = sessionData.session_id;
  previousTime = new Date(sessionData.timestamp + " UTC");
  currentTime = new Date();

  if (currentTime - previousTime >= fifteenMinutesMS) {
    sessionData = JSON.parse(await updateSession());

    return sessionData;
  } else {
    return sessionData;
  }
};

const dealWithRequest = async (method, ...info) => {
  if (method === "createsession") {
    return await checkSession(method);
  }

  let newData = "";

  if (method === "getChampionsInfo") {
    const champions = JSON.parse(await dealWithRequest("getchampions", 1));
    return champions;
  }

  const sessionId = (await checkSession(method)).session_id;
  if (method === "isPlayerExist") {
    const url = buildUrl("getplayer", info, sessionId);
    await new Promise((resolve) => {
      https
        .get(url, (res) => {
          res.on("data", (chunk) => {
            newData += chunk;
          });

          res.on("end", async () => {
            resolve(newData);
          });
        })
        .on("error", (err) => {
          console.log("Error: " + err.message);
        });
    });
    let parsedData = { error: "something went wrong" };
    try {
      parsedData = JSON.parse(newData);
    } catch (error) {
      return { error };
    }
    data = parsedData[0];
    if (data.ret_msg !== null) {
      return { error: data.ret_msg };
    }

    if (parsedData.length !== 0) {
      const siege = dealWithRequest(`getqueuestats`, data.Id, 424);
      const tdm = dealWithRequest(`getqueuestats`, data.Id, 469);
      const onslaught = dealWithRequest(`getqueuestats`, data.Id, 452);
      const competitive = dealWithRequest(`getqueuestats`, data.Id, 486);
      const status = dealWithRequest(`getplayerstatus`, data.Id);

      const arrayOfPromises = [];
      arrayOfPromises[0] = siege;
      arrayOfPromises[1] = tdm;
      arrayOfPromises[2] = onslaught;
      arrayOfPromises[3] = competitive;
      arrayOfPromises[4] = status;

      const fetchedData = await Promise.all(arrayOfPromises);

      data.Siege = JSON.parse(fetchedData[0]);
      data.TDM = JSON.parse(fetchedData[1]);
      data.Onslaught = JSON.parse(fetchedData[2]);
      data.Competitive = JSON.parse(fetchedData[3]);
      data.Status = JSON.parse(fetchedData[4]);
      return data;
    } else {
      return null;
    }
  } else {
    const url = buildUrl(method, info, sessionId);
    return new Promise((resolve, reject) => {
      https
        .get(url, (res) => {
          res.on("data", (chunk) => {
            newData += chunk;
          });

          res.on("end", async () => {
            resolve(newData);
          });
        })
        .on("error", (err) => {
          reject(console.log("Error: " + err.message));
        });
    });
  }
};

module.exports.dealWithRequest = dealWithRequest;
module.exports.DEV_ID = DEV_ID;
module.exports.convertInUTC = convertInUTC;
