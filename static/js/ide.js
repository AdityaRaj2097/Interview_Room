let editor;
//  set the property of editor while window just load
window.onload = function () {
  console.log(" ace is loadedd");
  editor = ace.edit("editor");
  //  set the theme
  editor.setTheme("ace/theme/tomorrow");

  editor.setOptions({
    fontFamily: "tahoma",
    fontSize: "1rem",
  });

  // console.log("Editor" + editor);

  //    for adding different theme
  editor.session.setMode("ace/mode/c_cpp");

  //   remove the mid the line which was coming bydefault
  editor.setShowPrintMargin(false);
};

//  for change the language of compiler
let language = document.querySelector(".language");

//  add event while changeging the programing lagugae
language.addEventListener("change", function (e) {
  // console.log(language + "Sdsf");
  let lang = e.target.value;

  if (lang === "c" || lang == "cpp") {
    editor.session.setMode((mode = "ace/mode/c_cpp"));
    // console.log(editor.session + "sasa");q
  } else if (lang == "python") {
    editor.session.setMode((mode = "ace/mode/python"));
    v: Date.now();
  } else if (lang == "java") {
    editor.session.setMode((mode = "ace/mode/java"));
  } else {
    // editor.session.setMode((mode = "ace/mode/javascript_expression"));
    editor.session.setMode((mode = "ace/mode/javascript"));
  }
});

let Theme = document.querySelector("#theme");
Theme.addEventListener("change", function (e) {
  let themecolor = e.target.value;
  themecolor = "ace/theme/" + themecolor;
  console.log(themecolor);

  editor.setTheme(themecolor);
});
// });
// let codeeditorAnchor = document.querySelector(".Codeditor");
// let codeEditorContent = document.querySelector(".editor");
// let openBoardAnchor = document.querySelector(".openBoard");
// let openBoardContent = document.querySelector(".nodepad");

// codeeditorAnchor.addEventListener("click", function () {
//   console.log(" click on the code editor");
//   // codeditor.style.display = "none";
//   console.log(" in 1");
//   // openBoard.style.display=""/
//   codeEditorContent.style.display = "";
//   openBoardContent.style.display = "none";
// });

// openBoardAnchor.addEventListener("click", function () {
//   console.log(" click on the code editor");
//   // codeditor.style.display = "none";
//   console.log(" in 2");
//   // openBoard.style.display=""/
//   codeEditorContent.style.display = "none";
//   openBoardContent.style.display = "";
// })
