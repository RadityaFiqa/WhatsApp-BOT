const WhatsApp = require("@open-wa/wa-automate");
const Group = require("./src/Group");
const Feature = require("./src/Feature");

WhatsApp.create("BOT-RADITYA", {
  executablePath:
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  headless: false,
  autoRefresh: true,
}).then((client) => start(client));

async function start(client) {
  client.onStateChanged((state) => {
    if (state === "CONFLICT") client.forceRefocus();
  });

  client.onAddedToGroup(async (message) => {
    await Group.GroupCheck(client, message.id);
  });

  client.onMessage(async (message) => {
    const pesan = await message.body.toLowerCase();
    const isGroup = message.chat.isGroup;

    await console.log(pesan);
    if (pesan.startsWith("$admin ") && isGroup) {
      await Group.AdminTools(client, message);
    } else if (pesan.startsWith("$sticker") || pesan.startsWith("$stiker")) {
      await Feature.Sticker(client, message);
    } else if (pesan.startsWith("$igs")) {
      await Feature.InstaStory(client, message);
    } else if (pesan.startsWith("$ig")) {
      await Feature.DownloadPost(client, message);
    } else if (pesan.startsWith("$weton")) {
      await Feature.Weton(client, message);
    }
  });
}
