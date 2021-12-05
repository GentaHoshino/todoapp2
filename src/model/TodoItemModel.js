'use strict'
let todoIdx = 0;


export class TodoItemModel {
  /**
   * @param {string} title Todoアイテムのタイトル
   * @param {boolean} completed Todoアイテムが完了済みならばtrue、そうでない場合はfalse
   * @param {string} timer アイテムの実行時間
   */
  constructor({title, completed}){
    // idは自動的に連番とないそれぞれのインスタンスごとに異なるものとする
    this.id = todoIdx++;
    this.title = title;
    this.timer = "00:00:000";
    //クリック時の時間を保持するための変数定義
    this.startTime = 0;
    //経過時刻を更新するための変数。 初めはだから0で初期化
    this.elapsedTime = 0;
    //タイマーを止めるにはclearTimeoutを使う必要があり、そのためにはclearTimeoutの引数に渡すためのタイマーのidが必要
    this.timerId = 0;
    //タイマーをストップ -> 再開させたら0になってしまうのを避けるための変数。
    this.timeToadd = 0;
    this.completed = completed;
  }
    /**
   * ストップウォッチを開始する
   */
  startStopWatch(){
    // 現在時刻を示すDate.nowを代入
    this.startTime = Date.now();
    this.countUp();
  }

  /**
   * ストップウォッチを止める
   */
  stopStopWatch(){
    //タイマーを止めるにはclearTimeoutを使う必要があり、そのためにはclearTimeoutの引数に渡すためのタイマーのidが必要
    clearTimeout(this.timerId);
    //タイマーに表示される時間elapsedTimeが現在時刻からスタートボタンを押した時刻を引いたものなので、
    //タイマーを再開させたら0になってしまう。elapsedTime = Date.now - startTime
    //それを回避するためには過去のスタート時間からストップ時間までの経過時間を足してあげなければならない。elapsedTime = Date.now - startTime + timeToadd (timeToadd = ストップを押した時刻(Date.now)から直近のスタート時刻(startTime)を引く)
    this.timeToadd += Date.now() - this.startTime;
  }
  /**
   * ストップウォッチをリセットする
   */
  resetStopWatch(){
    //経過時刻を更新するための変数elapsedTimeを0にしてあげつつ、updateTimetTextで0になったタイムを表示。
    this.elapsedTime = 0;

    //リセット時に0に初期化したいのでリセットを押した際に0を代入してあげる
    this.timeToadd = 0;

    //updateTimetTextで0になったタイムを表示
    this.updateTimeText();

  }

  //ミリ秒の表示ではなく、分とか秒に直すための関数, 他のところからも呼び出すので別関数として作る
  //計算方法として135200ミリ秒経過したとしてそれを分とか秒に直すと -> 02:15:200
  updateTimeText(){

    //m(分) = 135200 / 60000ミリ秒で割った数の商　-> 2分
    let m = Math.floor(this.elapsedTime / 60000);

    //s(秒) = 135200 % 60000ミリ秒で / 1000 (ミリ秒なので1000で割ってやる) -> 15秒
    let s = Math.floor(this.elapsedTime % 60000 / 1000);

    //ms(ミリ秒) = 135200ミリ秒を % 1000ミリ秒で割った数の余り
    let ms = this.elapsedTime % 1000;


    //HTML 上で表示の際の桁数を固定する　例）3 => 03　、 12 -> 012
    //javascriptでは文字列数列を連結すると文字列になる
    //文字列の末尾2桁を表示したいのでsliceで負の値(-2)引数で渡してやる。
    m = ('0' + m).slice(-2); 
    s = ('0' + s).slice(-2);
    ms = ('0' + ms).slice(-3);

    //HTMLのid　timer部分に表示させる　
    this.timer = m + ':' + s + ':' + ms;
  }
  // 再帰的に使う用の関数
  countUp(){
    // thisを変数selfに代入
    let self = this;
    // timerId変数はsetTimeoutの返り値になるので代入する
    this.timerId = setTimeout(function() {

      // 経過時刻は現在時刻をミリ秒で示すDate.now()からstartを押したときの時刻(startTime)を引く
      self.elapsedTime = Date.now() - self.startTime  + self.timeToadd;
      self.updateTimeText();

      //countUp関数自身を呼ぶことで10ミリ秒ごとに以下の計算を始める
      self.countUp();
      // 1秒以下の時間を表示するために10ミリ秒後に始めるよう宣言
    },10);
  }
}

