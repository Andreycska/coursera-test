$(function (){ //ТОже самое что и в обычно js document.addEvenListener(DOMContentLoader)...
//ТОже самое что в обычном js document.querySelector("#navbarToggle").document.addEventListener("blur",...
    $(".navbar-toggler").blur(function(event){  //функция закрытия бургер меню
        let screenWidth = window.innerWidth;
        if(screenWidth < 768) {
            $(".collapse").collapse('hide'); //collapse модуль бутстрапа
        }
    });
    //Для Safari и Firefox
    $(".navbar-toggler").click(function (event) {
        $(event.target).focus();
  });
});

//для динамической загрузки страницы
(function (global) {

var dc = {};

var homeHtml = "snippets/home-snippet.html";
var allCategoriesUrl = "https://davids-restaurant.herokuapp.com/categories.json";
var categoriesTitleHtml = "snippets/categories-title-snippet.html";
var categoryHtml = "snippets/category-snippet.html";

// функция для вставки innerHTML для 'select'
var insertHtml = function (selector, html) {
  var targetElem = document.querySelector(selector);
  targetElem.innerHTML = html;
};

// Показываtn значок загрузки внутри элемента, обозначенного «селектором».
var showLoading = function (selector) {
  var html = "<div class='text-center'>";
  html += "<img src='img/ajax-loader.gif'></div>";
  insertHtml(selector, html);
};

//Вернуть замену '{{propName}}' с propValue в заданной строке

var insertProperty = function (string, propName, propValue) {
  var propToReplace = "{{" + propName + "}}";
  string = string
    .replace(new RegExp(propToReplace, "g"), propValue);
  return string;
}


// При загрузке страницы (перед изображениями или CSS)
document.addEventListener("DOMContentLoaded", function (event) {

// При первой загрузке показать главный экран
showLoading("#main-content");
$ajaxUtils.sendGetRequest(
  homeHtml,
  function (responseText) {
    document.querySelector("#main-content")
      .innerHTML = responseText;
  },
  false);
});

// Загрузка представления категорий меню
dc.loadMenuCategories = function () {
  showLoading("#main-content");
  $ajaxUtils.sendGetRequest(
    allCategoriesUrl,
    buildAndShowCategoriesHTML);
};


// Создает HTML для страницы категорий на основе данных с сервера
function buildAndShowCategoriesHTML (categories) {
  // Загрузить фрагмент заголовка страницы категорий
  $ajaxUtils.sendGetRequest(
    categoriesTitleHtml,
    function (categoriesTitleHtml) {
      // Retrieve single category snippet
      $ajaxUtils.sendGetRequest(
        categoryHtml,
        function (categoryHtml) {
          var categoriesViewHtml =
            buildCategoriesViewHtml(categories,
                                    categoriesTitleHtml,
                                    categoryHtml);
          insertHtml("#main-content", categoriesViewHtml);
        },
        false);
    },
    false);
}


// Используя данные категорий и фрагменты, HTML строит категории просматривает HTML, который нужно вставить на страницу.
function buildCategoriesViewHtml(categories,
                                 categoriesTitleHtml,
                                 categoryHtml) {

  var finalHtml = categoriesTitleHtml;
  finalHtml += "<section class='row'>";

  // Перебирает категории
  for (var i = 0; i < categories.length; i++) {
    // Вставляет значения категорий
    var html = categoryHtml;
    var name = "" + categories[i].name;
    var short_name = categories[i].short_name;
    html =
      insertProperty(html, "name", name);
    html =
      insertProperty(html,
                     "short_name",
                     short_name);
    finalHtml += html;
  }

  finalHtml += "</section>";
  return finalHtml;
}


global.$dc = dc;

})(window);

