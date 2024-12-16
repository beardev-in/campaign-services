import axios from "axios";

const processConfig = {
  smsAuthKey: process.env.SMS_FAST2SMS_AUTH_KEY,
  smsSenderId: process.env.SMS_SENDER_HEADER,
  smsRoute: "dlt",
  smsMessageId: "170106",
};

async function checkpointReminder0xHackingFast(mobiles, checkpointNumber) {
  try {
    const head = {
      headers: {
        authorization: processConfig.smsAuthKey,
        "Content-Type": "application/json",
      },
    };
    const body = {
      route: processConfig.smsRoute,
      sender_id: processConfig.smsSenderId,
      message: processConfig.smsMessageId,
      variables_values: `${checkpointNumber}`,
      flash: 0,
      numbers: mobiles,
    };
    const { data } = await axios.post(
      "https://www.fast2sms.com/dev/bulkV2",
      body,
      head
    );
    return data;
  } catch (error) {
    return error.response ? error.response.data : error.message;
  }
}

export default checkpointReminder0xHackingFast;