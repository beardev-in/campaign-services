import axios from "axios";

const processConfig = {
  smsAuthKey: process.env.SMS_MSG91_AUTH_KEY,
  smsTemplateId: process.env.DAY_HACKING_CHECKPOINT_REMINDER_MSG_TEMPLATE_ID,
};

async function checkpointReminder0xHackingMsg(mobile, checkpointNumber) {
  try {
    const head = {
      headers: {
        authkey: processConfig.smsAuthKey,
        "content-type": "application/json",
        "accept": "application/json"
      },
    };
    const body = {
      template_id: processConfig.smsTemplateId,
      short_url: "0",
      recipients : [
        {
          mobiles: mobile,
          checkPoint: checkpointNumber,
        }
      ] 
    };
    const { data } = await axios.post(
      "https://control.msg91.com/api/v5/flow",
      body,
      head
    );
    return data;
  } catch (error) {
    // console.log(`error ${error.code}`);
    // return error;
    return error;

  }
}

export default checkpointReminder0xHackingMsg;
