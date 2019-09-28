interface NiksmsSendOneResponseInterface {
  Status: keyof typeof niksmsSendSmsResult;
  Id: number | null;
  WarningMessage: string | null;
  NikIds: number[] | null;
}
type NikSmsCheckDeliveryResponseInterface = Array<keyof typeof niksmsCheckDeliveryResult>;

const niksmsEndpoints = {
  base: 'https://niksms.com/fa/publicapi',
  SEND_MANY: 'https://niksms.com/fa/publicapi/groupSms',
  SEND_ONE: 'https://niksms.com/fa/publicapi/ptpsms',
  DELIVERY_STATUS: 'https://niksms.com/fa/publicapi/GetSmsDelivery',
  DELIVERY_STATUS_WITH_CLIENT_ID: 'https://niksms.com/fa/publicapi/GetSmsDeliveryWithClientId',
  GET_CREDIT: 'https://niksms.com/fa/publicapi/GetCredit',
  GET_PANEL_EXPIRATION_DATE: 'https://niksms.com/fa/publicapi/GetPanelExpireDate',
};

const niksmsSendSmsResult = {
  1: {
    number: 1,
    name: 'Successful',
    description: 'پیام شما با موفقیت ارسال شده است.',
  },
  2: {
    number: 2,
    name: 'UnknownError',
    description:
      'خطای نا مشخصی رخ داده است که پیش بینی نشده بوده و باید با پشتیبانی فنی تماس بگیرید. (احتمال رخ دادن این خطا نزدیک به صفر بوده ولی جهت اطمینان، در مستندات ارائه می شود)',
  },
  3: {
    number: 3,
    name: 'InsufficientCredit',
    description: 'موجودی یا اعتبار شما برای انجام عملیات کافی نیست.',
  },
  4: {
    number: 4,
    name: 'ForbiddenHours',
    description: 'شما مجاز به ارسال در این ساعت نمی باشید.',
  },
  5: {
    number: 5,
    name: 'Filtered',
    description: 'پیام شما از نظر متنی مشکلی داشته که باعث فیلتر شدن آن شده است.',
  },
  6: {
    number: 6,
    name: 'NoFilters',
    description: 'شماره اختصاصی که برای ارسال پیام خود انتخاب کرده اید، غیر فعال شده است.',
  },
  7: {
    number: 7,
    name: 'PrivateNumberIsDisable',
    description: 'شماره اختصاصی که برای ارسال پیام خود انتخاب کرده اید، غیر فعال شده است.',
  },
  8: {
    number: 8,
    name: 'ArgumentIsNullOrIncorrect',
    description: 'پارامترهای هایی که برای ارسال پیام خود به سیستم فرستاده اید، اشتباه است.',
  },
  9: {
    number: 9,
    name: 'descriptionBodyIsNullOrEmpty',
    description: 'پیام ارسالی شما دارای متن نبوده است، متن پیام را باید حتما وارد نمایید.',
  },
  10: {
    number: 10,
    name: 'PrivateNumberIsIncorrect',
    description: 'شماره اختصاصی وارد شده اشتباه است و یا به شما تعلق ندارد.',
  },
  11: {
    number: 11,
    name: 'ReceptionNumberIsIncorrect',
    description: 'شماره موبایل های ارسالی اشتباه است.',
  },
  12: {
    number: 12,
    name: 'SentTypeIsIncorrect',
    description: 'نوع ارسالی که انتخاب کرده اید با محتوای ارسالی شما مطابقت نداشته و اشتباه است.',
  },
  13: {
    number: 13,
    name: 'Warning',
    description: 'متن شما هشداری را به همراه داشته است ولی عملیات ارسال شما صورت گرفته است.',
  },
  14: {
    number: 14,
    name: 'PanelIsBlocked',
    description: 'پنل کاربری شما مسدود شده است و باید با پشتیبانی تماس بگیرید.',
  },
  15: {
    number: 15,
    name: 'SiteUpdating',
    description:
      'سایت در حال عملیات به روزرسانی می باشد لطفا دقایقی دیگیر مجددا اقدام به ارسال نمایید.',
  },
  16: {
    number: 16,
    name: 'AudioDescriptionNotAllowed',
    description: 'مجوز تایید نشده در پنل موجود است.',
  },
  17: {
    number: 17,
    name: 'AudioDescriptionFileSizeNotAllowed',
    description: 'حجم فایل صوتی بیش از حد مجاز می باشد.',
  },
  18: {
    number: 18,
    name: 'PanelExpired',
    description: 'پنل کاربری شما منقضی شده است',
  },
  19: {
    number: 19,
    name: 'InvalidUserNameOrPass',
    description: 'نام کاربری و یا رمز عبور وارد شده اشتباه است',
  },
};
const niksmsCheckDeliveryResult = {
  0: {
    number: 0,
    name: 'NotFound',
    description:
      'هنگامی که کاربر درخواست مشاهده نتیجه پیامی را دارد که قبلا برای ما ارسال نکرده و در دیتابیس وجود ندارد.',
  },
  1: {
    number: 1,
    name: 'DoNotSend',
    description: 'پیام شما هنوز ارسال نشده است.',
  },
  2: {
    number: 2,
    name: 'InQueue',
    description: 'پیام شما در صف ارسال است.',
  },
  3: {
    number: 3,
    name: 'Sent',
    description: 'پیام شما ارسال شده است.',
  },
  4: {
    number: 4,
    name: 'InsufficientCredit',
    description: 'موجودی ناکافی است. ارسال شده است.',
  },

  6: {
    number: 6,
    name: 'Block',
    description: 'پیام شما مسدود شده است.',
  },
  8: {
    number: 8,
    name: 'NotDeliveredCanceled',
    description: 'به دلیل لغو ارسال دستی توسط کاربر، ارسال متوقف و برگشت خورده است.',
  },
  9: {
    number: 9,
    name: 'NotDeliveredSmsAdvertisingBlock',
    description: 'به علت مسدودی پیامک تبلیغاتی، تحویل نشده است .',
  },
  10: {
    number: 10,
    name: 'NotDeliveredBlackList',
    description: 'به علت وجود شماره مخاطب در لیست سیاه کاربر، پیامک تحویل نشده است.',
  },
  11: {
    number: 11,
    name: 'NotDeliveredDelay',
    description:
      'به علت طولانی تر شدن مدت زمان انتظار ارسال از حداکثر میزان تاخیر مجاز تعیین شده توسط کاربر، ارسال متوقف و بازگشت خورده است.',
  },
  14: {
    number: 14,
    name: 'NotDeliveredFiltering',
    description:
      'به علت استفاده از کلمه/کلمات غیر قابل قبول از سوی مخابرات، فیلتر و متوقف شده است.',
  },
  15: {
    number: 15,
    name: 'WaitingForRecheckInOperator',
    description:
      'به دلیل قطع شدن اینترنت یا .. این بسته نامشخص باقی مانده و باید تک تک پیامک هایش با اپراتور بررسی شود که تکراری ارسال نشود',
  },
  16: {
    number: 16,
    name: 'OperatorFault',
    description:
      'اپراتور انتخابی برای ارسال پیامک شما جوابی به سرورهای ما ارسال نمی کند، احتمالا دچار نقص در سیستم ارسال خود شده است، با برطرف شدن این مشکل ارسال ها به روال عادی خود بر خواهند گشت.',
  },
  17: {
    number: 17,
    name: 'NotDeliveredBlocked',
    description: 'ارسال نشده است.',
  },
  18: {
    number: 18,
    name: 'SentButStatusNotUpdated',
    description:
      'در قسمت کنترل مجدد اپراتور مشخص شد که ارسال شده ولی وضعیتش هنوز به روزرسانی نشده.',
  },
  19: {
    number: 19,
    name: 'NotDeliveredDuplicate',
    description: 'تکراری بوده مخصوصا در ارسال منطقه ای.',
  },
  20: {
    number: 20,
    name: 'NotDeliveredBlockPanel',
    description: 'تحویل نشده - مسدودی پنل',
  },
  21: {
    number: 21,
    name: 'NotDeliveredUnknownNumber',
    description: 'تحویل نشده - شماره نادرست',
  },
  22: {
    number: 22,
    name: 'WaitingForDeliveryBeforeSend',
    description: 'در صف ارسال مخابرات',
  },
  23: {
    number: 23,
    name: 'NotDeliveredUnAccessible',
    description: 'تحویل نشده - عدم دسترسی',
  },
  24: {
    number: 24,
    name: 'NotDeliveredNotAnswered',
    description: 'تحویل نشده - عدم پاسخ',
  },
  25: {
    number: 25,
    name: 'NotDeliveredLineIsBusy',
    description: 'تحویل نشده - مشغولی',
  },
};

export { NikSmsCheckDeliveryResponseInterface, NiksmsSendOneResponseInterface, niksmsEndpoints, niksmsCheckDeliveryResult, niksmsSendSmsResult};
