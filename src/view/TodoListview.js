import { element } from "./html-util.js";
import { TodoItemView } from "./TodoItemView.js";

export class TodoListView {
  /**
   * `todoItem`に対応するTodoリストのHTML要素を作成して返す
   * @param {TodoItemModel[]} todoItems TodoItemModelの配列
   * @param {function({id:string, complete: boolean})} onUpdateTodo チェックボックスの更新イベントリスナー 
   * @param {function ({id:string})} onDeleteTodo 削除ボタンのクリックイベントリスナー
   * @param {function ({id:string})} onTimeStart スタートボタンのクリックイベントリスナー
   * @param {function ({id:string})} onTimeReset リセットボタンのクリックイベントリスナー
   * @param {function ({id:string})} onTimeStop ストップボタンのクリックイベントリスナー
   * @returns {Element} TodoItemModelの配列に対応したリストのHTML要素
   */
  createElement(todoItems, {onUpdateTodo, onDeleteTodo, onTimeStart, onTimeReset, onTimeStop }) {
    const todoListElement = element`<ul />`;
    // 各TodoItemモデルに対応したHTML要素を作成し、リスト要素へ追加する
    todoItems.forEach(todoItem => {
      const todoItemView = new TodoItemView();
      const todoItemElement = todoItemView.createElement(todoItem, {
        onDeleteTodo,
        onUpdateTodo,
        onTimeStart,
        onTimeReset,
        onTimeStop
      });
      todoListElement.appendChild(todoItemElement);
    });
    return todoListElement;

  }
}