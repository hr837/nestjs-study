declare interface ResponseData<T> {
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
