const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const https = require("https");

export default async function onlinePlayers(req, res) {
  let data = "";

  await new Promise((resolve) => {
    https
      .get("https://steamcharts.com/app/444090", (res) => {
        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", async () => {
          resolve(data);
        });
      })
      .on("error", (err) => {
        console.log("Error: " + err.message);
      });
  });

  const dom = new JSDOM(data);

  res.json(
    dom.window.document.querySelectorAll("#app-heading .app-stat .num")[0]
      .innerHTML
  );
}
