import { DataStore } from "../base/DataStore";
// 背景图
// 它是一个图片类,只要是图片类就要继承Script图片基类

import { Sprite } from "../base/Sprite";

export class Background extends Sprite{
  constructor(){
    // 获取背景图
    let img = Sprite.getImage("background");
    // 获取画布
    let canvas = DataStore.getInstance().canvas;
    let w = canvas.width;//画布的宽
    let h = canvas.height;//画布的高
    // 调用重写父类构造方法
    // 子类继承父类,必须要重写父类构造
    super(img,0,0,img.width,img.height,0,0,w,h);
  }
}