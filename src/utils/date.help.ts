import * as dayJs from 'dayjs';

/**
 * 格式化日期
 * @param {*} date
 * @param {string} fmt
 * @returns
 * @example
 * impront {dateTimeFormatNoSpaces} from '@/utils/date.help.js'
 * const date = new Date();
 * const resultStr = dateFormat(date) // console -> 2023-04-26
 */
export function dateFormat(
  date: dayJs.ConfigType,
  fmt: string = FORMAT_TEMPLATE.DATE,
) {
  const tmpDate = dayJs(date);
  if (tmpDate.isValid()) {
    return tmpDate.format(fmt);
  } else {
    return '';
  }
}

/**
 * 格式化日期时间,带有时分秒
 * @param {*} date
 * @param {string} fmt
 * @returns
 * @example
 * impront {dateTimeFormatNoSpaces} from '@/utils/date.help.js'
 * const date = new Date();
 * const resultStr = dateTimeFormat(date) // console -> 2023-04-26 12:30:55
 */
export function dateTimeFormat(
  date: dayJs.ConfigType,
  fmt: string = FORMAT_TEMPLATE.DATE_TIME,
) {
  return dateFormat(date, fmt);
}

/**
 * 格式化日期时间，返回不带空格的字符串
 * @param {*} date
 * @param {string} fmt
 * @returns
 * @example
 * impront {dateTimeFormatNoSpaces} from '@/utils/date.help.js'
 * const date = new Date();
 * const resultStr = dateTimeFormatNoSpaces(date) // console -> 20230426123055
 */
export function dateTimeFormatNoSpaces(
  date: dayJs.ConfigType,
  fmt = 'YYYYMMDDHHmmss',
) {
  return dateFormat(date, fmt);
}

/**
 * 判断一个时间是否早于当前时间
 * @param {*} date
 * @returns
 */
export function isBeforeCurrentTime(date: any) {
  const validatorDate = dayJs(date);
  if (validatorDate.isValid()) {
    return validatorDate.isBefore(Date.now());
  } else {
    return false;
  }
}

/**
 * 日期时间格式化模板
 */
export const FORMAT_TEMPLATE = {
  /** 日期
   * @descript YYYY-MM-DD
   */
  DATE: 'YYYY-MM-DD',
  /** 日期 时间
   * @description  YYYY-MM-DD HH:mm:ss
   */
  DATE_TIME: 'YYYY-MM-DD HH:mm:ss',
  /** 日期 时间，不带秒
   * @description YYYY-MM-DD HH:mm
   */
  DATE_TIME_MINUTE: 'YYYY-MM-DD HH:mm',
  /** 日期 时间 凌晨零点
   * @description YYYY-MM-DD 00:00:00
   */
  DATE_TIME_ZERO: 'YYYY-MM-DD 00:00:00',
  /** 短日期时间，不带年和秒
   * @description MM-DD HH:mm
   */
  DATE_TIME_MONTH_MINUTE: 'MM-DD HH:mm',
  /** 时间
   * @description HH:mm:ss
   */
  TIME: 'HH:mm:ss',
  /** 短时间
   * @description HH:mm
   */
  TIME_MINUTE: 'HH:mm',
  /**
   * 当日最后时刻
   */
  DAY_LAST_TIME: 'YYYY-MM-DD 23:59:59',
};
