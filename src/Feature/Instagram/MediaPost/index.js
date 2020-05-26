const {
  curl,
  getBase64,
  base64MimeType,
  PHONE_ADMIN,
} = require("../../../Tools");

exports.DownloadPost = async (client, message) => {
  try {
    const link = message.body.match(
      /(https?:\/\/(.+?\.)?instagram\.com(\/[A-Za-z0-9\-\._~:\/\?#\[\]@!$&'\(\)\*\+,;\=]*)?)/gi
    );
    if (link.length == 0) {
      client.reply(message.from, "Tidak dapat menemukan link");
    } else if (link.length > 0 && link.length < 11) {
      for (let i = 0; i < link.length; i++) {
        const geturl = await GetMedia(client, link[i]);
        if (Array.isArray(geturl)) {
          for (let i = 0; i < geturl.length; i++) {
            const base64 = await getBase64(geturl[i]);
            client.sendImage(
              message.from,
              base64,
              `file.${base64MimeType(base64).split("/")[1]}`,
              "Sukses!",
              message.id
            );
          }
        } else if (geturl) {
          const base64 = await getBase64(geturl);
          client.sendImage(
            message.from,
            base64,
            `file.${base64MimeType(base64).split("/")[1]}`,
            "Sukses!",
            message.id
          );
        } else {
          client.reply(message.from, "Gagal, Maybe Private");
        }
      }
    } else {
      client.reply(message.from, "Terlalu banyak broh");
    }
  } catch (e) {
    client.sendText(
      PHONE_ADMIN,
      `Got an Error ${e.message} from Instagram/DownloadPost`
    );
  }
};

const GetMedia = async (client, url) => {
  try {
    const uri = url.includes("/?") ? url + "&__a=1" : url + "/?__a=1";
    const get = await curl(uri, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }).then((res) => res.json());
    if (get == undefined) {
      return false;
    } else if (get.graphql.shortcode_media.__typename == "GraphVideo") {
      return get.graphql.shortcode_media.video_url;
    } else if (get.graphql.shortcode_media.__typename == "GraphImage") {
      return get.graphql.shortcode_media.display_url;
    } else if (get.graphql.shortcode_media.__typename == "GraphSidecar") {
      let list = new Array();
      for (
        let i = 0;
        i < get.graphql.shortcode_media.edge_sidecar_to_children.edges.length;
        i++
      ) {
        const url =
          get.graphql.shortcode_media.edge_sidecar_to_children.edges[i].node
            .__typename == "GraphVideo"
            ? get.graphql.shortcode_media.edge_sidecar_to_children.edges[i].node
                .video_url
            : get.graphql.shortcode_media.edge_sidecar_to_children.edges[i].node
                .display_url;
        list.push(url);
      }
      return list;
    }
  } catch (e) {
    client.sendText(
      PHONE_ADMIN,
      `Got an Error ${e.message} from Instagram/GetMedia`
    );
    return false;
  }
};
