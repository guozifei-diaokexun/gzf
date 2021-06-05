import context from '@/main.js';

export default class KeyControl {
  constructor () {
    this.currEle = null;
    this.moveMap = {
      37: this.moveLeft.bind(this),
      38: this.moveUp.bind(this),
      39: this.moveRight.bind(this),
      40: this.moveDown.bind(this),
      46: this.deleteNode.bind(this),
    };

    this.keyDownHandler = this.keyDownHandler.bind(this);
    this.keyUpHandler = this.keyUpHandler.bind(this);
  }

  initEle(ele) {
    this.currEle = ele;
  }

  initListen() {
    document.addEventListener('keydown',this.keyDownHandler)
    document.addEventListener('keyup',this.keyUpHandler)
  }


  keyDownHandler(e) {
    if(!this.currEle) { return; }
    const { keyCode } = e;
    for(let key in this.moveMap) {
      if(Number(key) === keyCode) {
        this.moveMap[key]();
      }
    }
  }

  keyUpHandler() {
    document.removeEventListener('keydown',this.keyUpHandler)
    document.removeEventListener('keyup',this.keyUpHandler)
  }

  // 往左边移动，距离左边的值减少
  moveLeft() {
    let value = Number(this.currEle.style.left.split('px')[0]);
    value -= 1;
    this.currEle.style.left = `${value}px`;
  }

  // 往上移，距离上边的值减少
  moveUp() {
    let value = Number(this.currEle.style.top.split('px')[0]);
    value -= 1;
    this.currEle.style.top = `${value}px`;
  }

  // 往右移，距离左边的值变大
  moveRight() {
    let value = Number(this.currEle.style.left.split('px')[0]);
    value += 1;
    this.currEle.style.left = `${value}px`;
  }

  // 往下移，距离上边的值变大
  moveDown() {
    let value = Number(this.currEle.style.top.split('px')[0]);
    value += 1;
    this.currEle.style.top = `${value}px`;
  }

  // 删除节点
  deleteNode() {
    context.$store.dispatch('removeNode')
  }
}
