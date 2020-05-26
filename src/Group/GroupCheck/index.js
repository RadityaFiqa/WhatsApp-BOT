const { curl, sleep, PHONE_ADMIN } = require("../../Tools");

exports.GroupCheck = async (client, message) => {
  try {
    //   const check = await ApiCheck(message.id);
    const anu = "SUCCESS";
    if (anu == "SUCCESS") {
      client.sendText(
        message.from,
        `Terima kasih telah menambahkan BOT ini kedalam grup anda 
      Selamat menikmati fitur yang kami sediakan 
       
      #command 
      $𝗵𝗲𝗹𝗽 = 𝑢𝑛𝑡𝑢𝑘 𝑚𝑒𝑛𝑎𝑚𝑝𝑖𝑙𝑘𝑎𝑛 𝑠𝑒𝑙𝑢𝑟𝑢ℎ 𝑓𝑖𝑡𝑢𝑟 
      $𝗹𝗼𝗴 = 𝑢𝑛𝑡𝑢𝑘 𝑚𝑒𝑛𝑎𝑚𝑝𝑖𝑙𝑘𝑎𝑛 𝑝𝑒𝑚𝑏𝑎𝑟𝑢𝑎𝑛`
      );
    } else {
      client.sendText(
        PHONE_ADMIN,
        `Someone trying adding to ${id_group} from GroupCheck`
      );
      await sleep(1000);
      await client.leaveGroup(message.id);
      await sleep(1000);
      await client.clearChat(message.id);
      await sleep(1000);
      await client.deleteChat(message.id);
      await client.deleteChat(message.id);
    }
  } catch (e) {
    client.sendText(
      PHONE_ADMIN,
      `Got an Error ${e.message} from Group/GroupCheck`
    );
  }
};

const ApiCheck = async (id_group) => {
  try {
    return await curl(`${URL}/CheckGroup/${id_group}`, {
      method: "GET",
      timeout: 2000,
    }).then((res) => res.json());
  } catch (e) {
    client.sendText(
      PHONE_ADMIN,
      `Got an Error ${e.message} from Group/ApiCheckGroup`
    );
  }
};
