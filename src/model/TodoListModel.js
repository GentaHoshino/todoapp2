import {EventEmitter} from "../EventEmitter.js";

export class TodoListModel extends EventEmitter {
  /**
   * @param {TodoItemModel[]} [items] 初期アイテム一覧(デフォルトは空の配列)
   */
  constructor(items = []){
    super();
    this.items = items;
  }

  /**
   * TodoItemの合計個数を返す
   * @returns {number}
   */
  getTotalCount(){
    return this.items.length;
  }

  /**
   * 表示できるTodoItemの配列を返す
   * @returns {TodoItemModel[]}
   */
  getTotalItems(){
    return this.items;
  }
  /**
   * TodoListの状態が更新されたときに呼び出されるリスナー関数を登録する
   * @param {Function}listener
   */
  onChange(listener){
    this.addEventListener("change", listener);
  }

  /**
   * onChangeのイベントリスナーを解除する
   * @param {Functtion} listener
   */
  offChange(listener){
    this.removeEventlistener("change", listener);
  }

  /**
   * 状態が変更されたときに呼ぶ。登録済みのリスナー関数を呼び出す
   */
  emitChange(){
    this.emit("change");
  }

  /**
   * TodoItemを追加する
   * @apram {TodoItemModel} todoItem
   */
  addTodo(todoitem){
    this.items.push(todoitem);
    this.emitChange();
  }

  /**
   * 指定したidのTodoItemのcompletedを更新する
   * @param {{id, completed: boolean }}
   */
  updateTodo({id, completed}) {
    // `id`が一致するTodoItemを見つけ、あるなら完了状態の値を更新する
    const todoItem = this.items.find(todo => todo.id === id);
    if(!todoItem){
      return;
    }
    todoItem.completed = completed;
    this.emitChange();
  }

  /**
   * 指定したidのTodoItemを削除する
   * @param {{id: number}}
   * 
   */
  deleteTodo({id}) {
    //`id`が一致しないTodoItemだけを残すことで`id`に一致するTodoItemを削除する
    this.items = this.items.filter(todo => {
      return todo.id !== id;
    });
    this.emitChange();
    
  }
    /**
   * 指定したidのTodoItemのタイマーをスタートする
   * @param {{id: number}}
   * 
   */
     timeStart({id}) {
    // `id`が一致するTodoItemを見つけ、タイマーをスタートする
    const todoItem = this.items.find(todo => todo.id === id);
    if(!todoItem){
      return;
    }
    todoItem.startStopWatch();
    this.emitChange();
    }
   /**
   * 指定したidのTodoItemのタイマーをリセットする
   * @param {{id: number}}
   * 
   */
    timeReset({id}) {
      // `id`が一致するTodoItemを見つけ、タイマーをスタートする
      const todoItem = this.items.find(todo => todo.id === id);
      if(!todoItem){
        return;
      }
      todoItem.resetStopWatch();
      this.emitChange();
    }
   /**
   * 指定したidのTodoItemのタイマーをストップする
   * @param {{id: number}}
   * 
   */
    timeStop({id}) {
      // `id`が一致するTodoItemを見つけ、タイマーをスタートする
      const todoItem = this.items.find(todo => todo.id === id);
      if(!todoItem){
        return;
      }
      todoItem.stopStopWatch();
      this.emitChange();
    }
}