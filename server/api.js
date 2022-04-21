const { API } = require("pe-paladins.js");

const api = new API({
  devId: "4200",
  authKey: "2D45F3CCE08B4E4986536D88F2D18934",
  languageId: 1,
}); // API loaded and ready to go.

module.exports.getChampionsInfo = async () => {
  let data;
  try {
    data = await api.getChampions();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports.isPlayerExist = async (username) => {
  let data;
  try {
    data = await api.getPlayer(`${username}`);
    if (data === null) return null;
  } catch (error) {
    console.log(error);
    return null;
  }

  const siege = api.getPlayerQueueStats(data.Id, 424);
  const tdm = api.getPlayerQueueStats(data.Id, 469);
  const onslaught = api.getPlayerQueueStats(data.Id, 452);
  const competitive = api.getPlayerQueueStats(data.Id, 486);
  const beyond = api.getPlayerQueueStats(data.Id, 10260);
  const status = api.getPlayerStatus(data.Id);

  const fetchedData = await Promise.all([
    siege,
    tdm,
    onslaught,
    competitive,
    beyond,
    status,
  ]);

  data.Siege = fetchedData[0];
  data.TDM = fetchedData[1];
  data.Onslaught = fetchedData[2];
  data.Competitive = fetchedData[3];
  data.Beyond = fetchedData[4];
  data.Status = fetchedData[5];
  return data;
};
