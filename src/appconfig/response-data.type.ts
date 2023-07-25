export interface ResponseData<T> {
  /**
   * 响应数据
   */
  data: T;

  /**
   * 处理是否成功
   */
  success: boolean;
  /**
   * 处理消息
   * 如果处理失败，将返回错误消息
   */
  msg: string;
}

/**
 * 分页查询返回的数据
 */
export interface PageData<T> {
  /**
   * 本次返回数据的行数
   */
  rows: T[];
  /**
   * 共有数据的行数
   */
  total: number;
}
