import { DataStore } from "../base/DataStore";
import { Sprite } from "../base/Sprite";
// 下半部分的水管

import { Pipe } from "./Pipe";

export class DownPipe extends Pipe{
  constructor(top){
    let img = Sprite.getImage("downPie");//获取下水管的图片对象
    // 重写父类构造
    super(img, top);
  }

  draw(){
    let gap = DataStore.getInstance().canvas.height/5;//设置上下水管直接的间隙
    this.y = this.top + gap;//实际下水管出现时的初始y坐标
    super.draw();
  }
}