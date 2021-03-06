import { TodoListModel } from "./model/TodoListModel.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { render } from "./view/html-util.js";
import { TodoListView } from "./view/TodoListview.js";
console.log("App.js: loaded");

export class App{
    constructor({ formElement, formInputElement, todoListContainerElement, todoCountElement }) {
      console.log("ok");
      this.todoListModel = new TodoListModel();
      this.todoListView = new TodoListView();
      // bind to Element
      this.formElement = formElement;
      this.formInputElement = formInputElement;
      this.todoListContainerElement = todoListContainerElement;
      this.todoCountElement = todoCountElement;
      // ハンドラ呼び出しで`this`が変わらないように固定する
      // `this`が常に`App`のインスタンスを示すようにする
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }

    /**
     *Todoを追加するときに呼ばれるリスナー関数
     @param {string} title 
     *
     */
    handleAdd(title) {
      this.todoListModel.addTodo(new TodoItemModel({title, completed: false }));
    }

    /**
     * Todoの状態を更新したときに呼ばれるリスナー関数
     * @param {{ id:number, completed: boolean }}
     */
    handleUpdate({ id, completed }) {
      this.todoListModel.updateTodo( { id, completed });
    }
    /**
     * Todoを削除したときに呼ばれるリスナー関数
     * @param {{ id:number}}
     */
    handleDelete({id}) {
      this.todoListModel.deleteTodo( { id });
    }
    /**
     * Startボタンを押したときに呼ばれるリスナー関数
     * @param {{ id:number}}
     */
     handleTimeStart({id}) {
      this.todoListModel.timeStart( { id });
    }
    /**
     * Resetボタンを押したときに呼ばれるリスナー関数
     * @param {{ id:number}}
     */
     handleTimeReset({id}) {
      this.todoListModel.timeReset( { id });
    }
    /**
     * Stopボタンを押したときに呼ばれるリスナー関数
     * @param {{ id:number}}
     */
     handleTimeStop({id}) {
      this.todoListModel.timeStop( { id });
    }

    /**
     * Todoが変更されたときに呼ばれる関数
     * 
     */
    handleChange() {
      const todoCountElement = this.todoCountElement;
      const todoListContainerElement = this.todoListContainerElement;
      const todoItems = this.todoListModel.getTotalItems();
        // todoItemに対するtodoListViewを作成する
        const todoListElement = this.todoListView.createElement(todoItems, {
          // Todoアイテムが更新イベントを発生したときに呼ばれるリスナー関数
          onUpdateTodo: ({ id, completed }) => {
            this.handleUpdate({ id, completed });
          },
          // Todoアイテムが削除イベントを発生したときに呼ばれるリスナー関数
          onDeleteTodo: ( { id }) => {
            this.handleDelete({ id });
          },
          // Startボタンを押したときに呼ばれるリスナー関数
          onTimeStart: ( { id }) => {
            this.handleTimeStart({ id });
          },
          // Resetボタンを押したときに呼ばれるリスナー関数
          onTimeReset: ( { id }) => {
            this.handleTimeReset({ id });
          },
          // Stopボタンを押したときに呼ばれるリスナー関数
          onTimeStop: ( { id }) => {
            this.handleTimeStop({ id });
          }                    
        });
        //containerElementの中身をtodoListElementで上書(きする
        render(todoListElement, todoListContainerElement);
        // アイテム数の表示を更新
        todoCountElement.textContent = `Todoアイテム数: ${this.todoListModel.getTotalCount()}`;
      
    }
    /**
     * formが更新されたときに呼ばれる関数
     * @param{Event} event
     */
    handleSubmit(event) {
        // ducumentイベントの本来の動作を止める
        event.preventDefault();
        // 新しいTodoItemをTodoListへ追加する
        // inputElementが空白じゃないか判定する
        const inputElement = this.formInputElement;
        if(inputElement.value !== ""){
          this.handleAdd(inputElement.value);
          console.log(`入力欄の値: ${inputElement.value}`);
          inputElement.value = "";
        }
      }
    /**
     * アプリとDOMの紐づけを登録する関数
     */
    mount(){
      this.todoListModel.onChange(this.handleChange);
      this.formElement.addEventListener("submit", this.handleSubmit);
      // ボタン、モダル、モダルの閉じるボタン、オーバーレイを変数に格納
      const btn = document.querySelector('.btn');
      const modal = document.querySelector('.modal');
      const closeBtn = document.querySelector('.close');
      const overlay = document.querySelector('.overlay');

      // ボタンをクリックしたら、モダルとオーバーレイに.activeを付ける
      btn.addEventListener('click', function(e){
        // aタグのデフォルトの機能を停止する
        e.preventDefault();
        　// モーダルとオーバーレイにactiveクラスを付与する
        modal.classList.add('active');
        overlay.classList.add('active');
      });

      // モダルの閉じるボタンをクリックしたら、モダルとオーバーレイのactiveクラスを外す
      closeBtn.addEventListener('click', function(){
        modal.classList.remove('active');
        overlay.classList.remove('active');
      });

      // オーバーレイをクリックしたら、モダルとオーバーレイのactiveクラスを外す
      overlay.addEventListener('click', function() {
        modal.classList.remove('active');
        overlay.classList.remove('active');
});

    }
    /**
     * アプリとDOMの紐づけを解除する関数
     */
     unmount() {
      this.todoListModel.offChange(this.handleChange);
      this.formElement.removeEventListener("submit", this.handleSubmit);
  }
}