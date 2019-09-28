import axios from 'axios';
import { niksmsEndpoints, niksmsSendSmsResult } from './niksms-config';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve('../../../../../.env') });

const { NIKSMS_USERNAME, NIKSMS_PASSWORD, NIKSMS_SENDER_NUMBER } = process.env;

async function send(request) {
  try {
    const response = await _sendOne(request);
    const { data } = response;
    const responseMeaning = data.Status && niksmsSendSmsResult[data.Status];

    if (data.Status === 1) {
      return {
        status: 'success',
        providerGeneratedId: Array.isArray(data && data.NikIds) ? data.NikIds[0] : undefined,
        raw: { ...data, meaning: responseMeaning },
      };
    } else {
      return {
        status: 'error',
        raw: { ...data, meaning: responseMeaning },
      };
    }
  } catch (error) {
    return {
      status: 'error',
      error,
    };
  }
}
send.provider = 'SMS_NIKSMS';

async function _sendOne(request) {
  const { to, text, textId, sendOn } = request;
  return axios({
    timeout: 10000,
    url: niksmsEndpoints.SEND_ONE,
    method: 'post',
    responseType: 'json',
    data: {
      username: NIKSMS_USERNAME,
      password: NIKSMS_PASSWORD,
      senderNumber: NIKSMS_SENDER_NUMBER,
      sendType: 1,
      message: text,
      numbers: to,
      ...(textId !== undefined ? { yourMessageId: textId } : null),
      ...(sendOn !== undefined ? { sendOn } : null),
    },
  });
}

async function checkDelivery(providerGeneratedId) {
  const response = await axios({
    timeout: 10e4,
    url: niksmsEndpoints.DELIVERY_STATUS,
    method: 'post',
    data: {
      username: NIKSMS_USERNAME,
      password: NIKSMS_PASSWORD,
      nikids: providerGeneratedId,
    },
  });

  return response.data;
}

export { send };
