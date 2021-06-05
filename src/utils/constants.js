//分别代表上中，右中，下中、左中、四个角的点(左上、右上、右下、左下）
export const pointList = ['t', 'r', 'b', 'l', 'lt', 'rt', 'rb', 'lb']


// 鼠标悬浮上去，可向哪里拖动，参照https://www.w3school.com.cn/cssref/pr_class_cursor.asp
/**
 *         N(北)
 *           |
 * W(西)-----|-----E(东)
 *          |
 *        S(南)
 */
export const resizeMap = {
  't': 'n',
  'r': 'e',
  'b': 's',
  'l': 'w',
  'lt': 'nw',
  'rt': 'ne',
  'rb': 'se',
  'lb': 'sw',
}
