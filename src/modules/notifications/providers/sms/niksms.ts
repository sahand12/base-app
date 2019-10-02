import axios from 'axios';
import * as dotenv from 'dotenv';
import * as path from 'path';

import { niksmsEndpoints, niksmsSendSmsResult } from './niksms-config';
import {
  NotificationProviderInterface,
  NotificationProviderResponseInterface,
  SmsNotificationProviderInterface,
  SmsNotificationRequestInterface,
} from '../../notification.service';

dotenv.config({ path: path.resolve('../../../../../.env') });

const { NIKSMS_USERNAME, NIKSMS_PASSWORD, NIKSMS_SENDER_NUMBER } = process.env;

async function send(request: SmsNotificationRequestInterface): Promise<NotificationProviderResponseInterface> {
  try {
    const response = await _sendOne(request);
    const { data, status } = response;
    const responseMeaning = data.Status && niksmsSendSmsResult[data.Status];

    if (status >= 200 && status < 300 && data.Status === 1) {
      return {
        status: 'success',
        providerGeneratedId: Array.isArray(data && data.NikIds) ? data.NikIds[0] : undefined,
        raw: { ...data, meaning: responseMeaning },
      };
    } else {
      // @TODO: build an error based on the response status number
      return {
        status: 'error',
        raw: { ...data, meaning: responseMeaning },
      };
    }
  } catch (error) {
    return {
      status: 'error',
      errors: [error],
    };
  }
}

async function _sendOne(request: SmsNotificationRequestInterface) {
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

// @TODO: finish the implementation
async function checkDelivery(providerGeneratedId: string): Promise<boolean> {
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

  throw new Error('not implemented');
  return response.data;
}

const smsProviderNiksms: SmsNotificationProviderInterface = {
  send,
  checkDelivery,
  name: 'niksms',
  channel: 'sms',
};

export default smsProviderNiksms;
