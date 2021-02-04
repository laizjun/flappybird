import { DataStore } from "./js/base/DataStore";
// 游戏开始的入口,初始化整个游戏的元素

import { ResourceLoader } from "./js/base/ResourceLoader";
import { Director } from "./js/Director";
import { Birds } from "./js/Player/Birds";
import { Background } from "./js/runtime/Background";
import { Land } from "./js/runtime/Land";

export class Main{//定义Main类
  constructor(){//定义构造函数(数据初始化用的 new的时候调用该方法)
    console.log("游戏开始");
    // 初始化游戏过程中用到的数据
    this.canvas = wx.createCanvas();//获取canvas
    this.ctx = this.canvas.getContext("2d");//获取ctx
    this.loader = new ResourceLoader();//创建资源加载器实例对象
    // console.log(this.loader);
    // 获取变量池(单列模式)
    this.store = DataStore.getInstance();
    // 获取导演(单例模式)
    this.director = Director.getInstance();
    // 调用ResourceLoader的onloaded方法，确保图片已经加载完成
    this.loader.onloaded().then(map=>this.onResourceLoaded(map));
  }
  // 图片加载完成后
  onResourceLoaded(map){
    // console.log(map);
    // 将游戏数据保存到变量池中
    // 这个用.的方式就是属性的方式,使用属性的方式保存数据,而不是调用dataStore中的put方法保存数据
    // 原因是：put方法保存的数据会在游戏结束时销毁
    // 而这些数据在游戏结束的时候不会销毁
    this.store.res = map;
    this.store.canvas = this.canvas;
    this.store.ctx = this.ctx;
    // 调用初始化游戏的方法
    this.init();

  }
  // 初始化游戏
  init(){
    // 将游戏数据初始化并保存到变量池中
    // 使用DataStore的put保存,因为这些数据在游戏结束后会被销毁
    this.store
            .put("background", new Background())
            .put("land", new Land())
            // pipes是多个水管,因为每次出现时,都是一组一组的出现的
            .put("pipes", [])
            .put("birds", new Birds())
            
    // 先调用一次创建水管的方法
    this.director.createPipes();
    // 调用导演的run方法来运行程序
    this.director.run();
    this.addEvent();
  }
            
  // 监听点击事件
  addEvent(){
    // 手机报错addEventListener is not a function
    // this.canvas.addEventListener("touchstart", ()=>{
      // 需要使用wx提供的api
      wx.onTouchStart(()=>{
      console.log(11);
      if(this.director.isGameOver){
        // 游戏结束,点击重新开始
      }else{
        // 游戏进行中,点击小鸟进行向上飞
        this.director.birdsUp();
      }
    })
  }
}