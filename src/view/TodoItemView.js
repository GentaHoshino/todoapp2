import { element } from "./html-util.js";

export class TodoItemView {
  /**
   * `todoItem`に対応するTodoアイテムのHTML要素を作成して返す
   * @param {TodoItemModel } todoItem
   * @param {function ({id: string, completed: boolean}) } onUpdateTodo チェックボックスのイベント更新リスナー
   * @param {function ({id: string}) } onDeleteTodo 削除ボタンのイベントリスナー
   * @returns {Element}
   */
  createElement(todoItem, { onUpdateTodo, onDeleteTodo, onTimeStart, onTimeReset, onTimeStop }){
    const todoItemElement = todoItem.completed
    ? element`<li><input type="checkbox" class="checkbox" checked>
        <s>${todoItem.title}</s>
        <div class="timer">${todoItem.timer}</div>
        <button class="start">start</button>
        <button class="reset">reset</button>
        <button class="stop">stop</button>
        <button class="delete">x</button>
    </li>`
    : element`<li><input type="checkbox" class="checkbox">
        ${todoItem.title}
        <div class="timer">${todoItem.timer}</div>
        <button class="start">start</button>
        <button class="reset">reset</button>
        <button class="stop">stop</button>
        <button class="delete">x</button>
    </li>`;
    const inputCheckboxElement = todoItemElement.querySelector(".checkbox");
    inputCheckboxElement.addEventListener("change", () => {
      // コールバック関数に変更
      onUpdateTodo({
        id: todoItem.id,
        completed: !todoItem.completed
      });
    });
    const deleteButtonElement = todoItemElement.querySelector(".delete");
    deleteButtonElement.addEventListener("click", () => {
      // コールバック関数に変更
      onDeleteTodo({
        id: todoItem.id
      });
    });
    const startButtonElement = todoItemElement.querySelector(".start");
    startButtonElement.addEventListener("click", () => {
      // コールバック関数に変更
      onTimeStart({
        id: todoItem.id
      });
      console.log("start");
    });
    const resetButtonElement = todoItemElement.querySelector(".reset");
    resetButtonElement.addEventListener("click", () => {
      // コールバック関数に変更
      onTimeReset({
        id: todoItem.id
      });
      console.log("reset");
    });
    const stopButtonElement = todoItemElement.querySelector(".stop");
    stopButtonElement.addEventListener("click", () => {
      // コールバック関数に変更
      onTimeStop({
        id: todoItem.id
      });
      console.log("stop");
    });
    // 作成したTodoアイテムのHTML要素を返す
    return todoItemElement;
  }
}