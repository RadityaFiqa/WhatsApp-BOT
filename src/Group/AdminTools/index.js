exports.AdminTools = async (client, message) => {
  await console.log("Called AdminTools");
  const getAdmin = await client.getGroupAdmins(message.chat.groupMetadata.id);
  console.log(getAdmin);
};
