const { curl, getBase64, ToIntegers, PHONE_ADMIN } = require("../../../Tools");

exports.InstaStory = async (client, message) => {
  try {
    const username = message.body
      .toLowerCase()
      .split("$igs ")[1]
      .split("\n")
      .join(" ")
      .split(" ");
    if (username.length % 2 != 0) {
      client.reply(message.from, "Format Salah");
    } else {
      let data = new Array([], []);
      const angkaStr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
      for (let i = 0; i < username.length; i++) {
        if (username[i].includes(",")) {
          data[1].push(username[i]);
        } else if (angkaStr.find((angka) => angka == username[i])) {
          data[1].push(username[i]);
        } else {
          data[0].push(username[i]);
        }
      }
      for (let i = 0; i < data[0].length; i++) {
        const GetProfileID = await GetProfileInfo(client, data[0][i]);
        if (GetProfileID.graphql.user.is_private) {
          client.reply(message.from, `@${data[0][1]} Private Account`);
        } else {
          const story = await GetStory(client, GetProfileID.graphql.user.id);
          if (data[1][i].includes(",")) {
            const storylist = data[1][i].split(",");
            const list = storylist.filter((data) => angkaStr.includes(data));
            if (list.length > 10) {
              client.reply(
                message.from,
                `@${data[0][1]} Terlalu Banyak Story yang diambil, Maximal 10`
              );
            } else {
              for (let i = 0; i < list.length; i++) {
                const urutan = ToIntegers(list[i]) - 1;
                if (story[urutan].media_type == 1) {
                  const base64 = await getBase64(
                    story[urutan].image_versions2.candidates[0].url
                  );
                  client.sendImage(message.from, base64, `file.jpg`, "Sukses!");
                } else {
                  const base64 = await getBase64(
                    story[urutan].video_versions[0].url
                  );
                  client.sendImage(message.from, base64, `file.mp4`, "Sukses!");
                }
              }
            }
          } else {
            const urutan = ToIntegers(data[1][i]) - 1;
            if (story[urutan].media_type == 1) {
              const base64 = await getBase64(
                story[urutan].image_versions2.candidates[0].url
              );
              client.sendImage(message.from, base64, `file.jpg`, "Sukses!");
            } else {
              const base64 = await getBase64(
                story[urutan].video_versions[0].url
              );
              client.sendImage(message.from, base64, `file.mp4`, "Sukses!");
            }
          }
        }
      }
    }
  } catch (e) {
    client.sendText(
      PHONE_ADMIN,
      `Got an Error ${e.message} from Instagram/InstaStory`
    );
  }
};

const GetStory = (client, id) => {
  try {
    return curl(`https://i.instagram.com/api/v1/feed/user/${id}/reel_media/`, {
      method: "GET",
      headers: {
        "cache-control": "no-cache",
        cookie:
          "ig_did=760E3A27-27DE-4E88-B233-C81935506E15; mid=XouECwABAAFcgMFEhbfEwoEhaVOx; rur=FTW; csrftoken=MH2qLyyKuEGo9Zo75L1bi6KQw6pupipo; shbid=3222; shbts=1586201623.3489666; ds_user_id=7536877086; sessionid=7536877086%3AvzX9j4LCdF1Tpd%3A24",
        "user-agent":
          "Instagram 10.8.0 Android (18/4.3; 320dpi; 720x1280; Xiaomi; HM 1SW; armani; qcom; en_US)",
      },
      timeout: 5000,
    })
      .then((res) => res.json())
      .then((res) => res.items);
  } catch (e) {
    client.sendText(
      PHONE_ADMIN,
      `Got an Error ${e.message} from Instagram/GetStory`
    );
  }
};

const GetProfileInfo = async (client, username) => {
  try {
    return await curl(`https://instagram.com/${username}/?__a=1`, {
      headers: {
        method: "GET",
        Accept: "application/json",
        timeout: 5000,
      },
    }).then((res) => res.json());
  } catch (e) {
    client.sendText(
      PHONE_ADMIN,
      `Got an Error ${e.message} from Instagram/GetProfileInfo`
    );
  }
};
