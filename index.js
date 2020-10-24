// ノードの取得
const $input = document.querySelector("#input");
const $placeInput = document.querySelector("#placeInput");
const $textArea = document.querySelector("#textarea");
const $btn = document.querySelector("#submit");

// localStorage.clear();

// localStrageに値があるなら
if(localStorage) {

  // localStrageにある値分回す
  for(let i = 0; i <= localStorage.length; i++){
    const getkey = localStorage.key(i);
    const getJson = localStorage.getItem(getkey);
    const jsonMapTacticses = JSON.parse(getJson);

    // nullではないものを取得し表示
    if(jsonMapTacticses !== null){
      view(jsonMapTacticses.name, jsonMapTacticses.place, jsonMapTacticses.tactics);
    }
  }
}

$btn.addEventListener("click", () => {

  // 連想配列の宣言
  let array = {};

  // 連想配列で追加
  array.name = $input.value;
  array.place = $placeInput.value;
  array.tactics = $textArea.value;

  // localStrageに追加
  const setJson = JSON.stringify(array);
  localStorage.setItem(`${array.name}${array.place}`, setJson);
  console.log(localStorage);

  // 表示の初期化
  $input.value = "";
  $placeInput.value = "";
  $textArea.value = "";

  // 表示
  view(array.name, array.place, array.tactics);
});

function view(map, place, tactics) {
  // ノード取得
  const $display = document.querySelector(".display");

  // 要素の作成
  const div = document.createElement("div");
  const h2 = document.createElement("h2");
  const h3 = document.createElement("h3");
  const p = document.createElement("p");
  const deleteBtn = document.createElement("button");

  // テキストのセット
  h2.textContent = map;
  h3.textContent = place;
  p.textContent = tactics;
  deleteBtn.textContent = "X";

  // 表示
  $display.appendChild(div);
  div.appendChild(h2);
  div.appendChild(h3);
  div.appendChild(p);
  div.appendChild(deleteBtn);

  // deleteBtnにイベントを追加
  deleteBtn.addEventListener("click", (e) => {
    // h2のテキストの取得
    const text1 = e.target.parentNode.querySelector("h2").textContent;
    const text2 = e.target.parentNode.querySelector("h3").textContent;
    const text = text1 + text2;

    // localStorage分回す
    for(let i = 0; i <= localStorage.length; i++) {

      // localStorageの値の取得
      const getKey = localStorage.key(i);
      const get = localStorage.getItem(getKey);
      const parse = JSON.parse(get);

      // localStorageと表示からh2h3と一致するものを消去
      if(parse !== null){
        if(text === parse.name + parse.place) {
          localStorage.removeItem(getKey);
          $display.removeChild(div);
        }
      }
    }
  });
};

