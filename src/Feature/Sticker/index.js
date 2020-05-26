const { PHONE_ADMIN } = require("../../Tools");
const { decryptMedia } = require("@open-wa/wa-automate");

exports.Sticker = async (client, message) => {
  try {
    const isCaption = message.caption;
    if (isCaption) {
      if (message.mimetype == "image/jpeg") {
        const sticker = await ImageToSticker(message);
        client.sendImageAsSticker(message.from, sticker);
      } else {
        client.reply(
          message.from,
          "Hanya dapat Mengubah gambar menjadi Sticker"
        );
      }
    } else {
      if (message.quotedMsgObj.type == "image") {
        const sticker = await ImageToSticker(message.quotedMsgObj);
        client.sendImageAsSticker(message.from, sticker);
      } else {
        client.reply(
          message.from,
          "Hanya dapat Mengubah gambar menjadi Sticker"
        );
      }
    }
  } catch (e) {
    client.sendText(PHONE_ADMIN, `Got an Error ${e.message} from Sticker`);
  }
};

const ImageToSticker = async (gambar) => {
  const image = await decryptMedia(gambar);
  const imageBase64 = `data:image/jpeg;base64,${image.toString("base64")}`;
  return imageBase64;
};
