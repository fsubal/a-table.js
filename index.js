'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var aTemplate = require('a-template');
var $ = require('zepto-browserify').$;
var clone = require('clone');
var toMarkdown = require('./src/table2md.js');
var template = '<!-- BEGIN showMenu:exist -->\n<ul class="spread-table-menu" style="top:{menuY}px;left:{menuX}px;">\n\t<!-- BEGIN mode:touch#cell -->\n\t<li data-action-click="mergeCells"><!-- BEGIN lang:touch#ja -->\u30BB\u30EB\u306E\u7D50\u5408<!-- END lang:touch#ja --><!-- BEGIN lang:touch#en -->merge cells<!-- END lang:touch#en --></li>\n  <li data-action-click="splitCell()"><!-- BEGIN lang:touch#ja -->\u30BB\u30EB\u306E\u5206\u5272<!-- END lang:touch#ja --><!-- BEGIN lang:touch#en -->split cell<!-- END lang:touch#en --></li>\n\t<li data-action-click="changeCellTypeTo(th)"><!-- BEGIN lang:touch#ja -->th\u306B\u5909\u66F4\u3059\u308B<!-- END lang:touch#ja --><!-- BEGIN lang:touch#en -->change to th<!-- END lang:touch#en --></li>\n\t<li data-action-click="changeCellTypeTo(td)"><!-- BEGIN lang:touch#ja -->td\u306B\u5909\u66F4\u3059\u308B<!-- END lang:touch#ja --><!-- BEGIN lang:touch#en -->change to td<!-- END lang:touch#en --></li>\n\t<li data-action-click="align(left)"><!-- BEGIN lang:touch#ja -->\u5DE6\u5BC4\u305B<!-- END lang:touch#ja --><!-- BEGIN lang:touch#en -->align left<!-- END lang:touch#en --></li>\n\t<li data-action-click="align(center)"><!-- BEGIN lang:touch#ja -->\u4E2D\u592E\u5BC4\u305B<!-- END lang:touch#ja --><!-- BEGIN lang:touch#en -->align center<!-- END lang:touch#en --></li>\n\t<li data-action-click="align(right)"><!-- BEGIN lang:touch#ja -->\u53F3\u5BC4\u305B<!-- END lang:touch#ja --><!-- BEGIN lang:touch#en -->align right<!-- END lang:touch#en --></li>\n\t<!-- END mode:touch#cell -->\n\t<!-- BEGIN mode:touch#col -->\n\t<li data-action-click="insertColLeft({selectedRowNo})"><!-- BEGIN lang:touch#ja -->\u5DE6\u306B\u5217\u3092\u8FFD\u52A0<!-- END lang:touch#ja --><!-- BEGIN lang:touch#en -->insert column on the left<!-- END lang:touch#en --></li>\n\t<li data-action-click="insertColRight({selectedRowNo})"><!-- BEGIN lang:touch#ja -->\u53F3\u306B\u5217\u3092\u8FFD\u52A0<!-- END lang:touch#ja --><!-- BEGIN lang:touch#en -->insert column on the right<!-- END lang:touch#en --></li>\n\t<li data-action-click="removeCol({selectedRowNo})"><!-- BEGIN lang:touch#ja -->\u5217\u3092\u524A\u9664<!-- END lang:touch#ja --><!-- BEGIN lang:touch#en -->remove column<!-- END lang:touch#en --></li>\n\t<!-- END mode:touch#col -->\n\t<!-- BEGIN mode:touch#row -->\n\t<li data-action-click="insertRowAbove({selectedColNo})"><!-- BEGIN lang:touch#ja -->\u4E0A\u306B\u884C\u3092\u8FFD\u52A0<!-- END lang:touch#ja --><!-- BEGIN lang:touch#en -->insert row above<!-- END lang:touch#en --></li>\n\t<li data-action-click="insertRowBelow({selectedColNo})"><!-- BEGIN lang:touch#ja -->\u4E0B\u306B\u884C\u3092\u8FFD\u52A0<!-- END lang:touch#ja --><!-- BEGIN lang:touch#en -->insert row below<!-- END lang:touch#en --></li>\n\t<li data-action-click="removeRow({selectedColNo})"><!-- BEGIN lang:touch#ja -->\u884C\u3092\u524A\u9664<!-- END lang:touch#ja --><!-- BEGIN lang:touch#en -->remove row<!-- END lang:touch#en --></li>\n\t<!-- END mode:touch#row -->\n</ul>\n<!-- END showMenu:exist -->\n<!-- BEGIN showBtnList:exist -->\n  <div class="{mark.btn.group}">\n    <!-- BEGIN inputMode:touch#table -->\n    <button class="{mark.btn.item}" data-action-click="changeInputMode(source)">\u30BD\u30FC\u30B9</button>\n    <!-- END inputMode:touch#table -->\n    <!-- BEGIN inputMode:touch#source -->\n    <button class="{mark.btn.itemActive}" data-action-click="changeInputMode(table)">\u30BD\u30FC\u30B9</button>\n    <!-- END inputMode:touch#source -->\n  </div>\n  <div class="{mark.btn.group}">\n  \t<button class="{mark.btn.item}" data-action-click="mergeCells"><!-- BEGIN lang:touch#ja -->\u30BB\u30EB\u306E\u7D50\u5408<!-- END lang:touch#ja --><!-- BEGIN lang:touch#en -->merge cells<!-- END lang:touch#en --></button>\n  \t<button class="{mark.btn.item}" data-action-click="splitCell()"><!-- BEGIN lang:touch#ja -->\u30BB\u30EB\u306E\u5206\u5272<!-- END lang:touch#ja --><!-- BEGIN lang:touch#en -->split cell<!-- END lang:touch#en --></button>\n  \t<button class="{mark.btn.item}" data-action-click="undo()"><!-- BEGIN lang:touch#ja -->\u5143\u306B\u623B\u3059<!-- END lang:touch#ja --><!-- BEGIN lang:touch#en -->undo<!-- END lang:touch#en --></button>\n  </div>\n  <div class="{mark.btn.group}">\n  \t<button class="{mark.btn.item}" data-action-click="changeCellTypeTo(td)">td</button>\n  \t<button class="{mark.btn.item}" data-action-click="changeCellTypeTo(th)">th</button>\n  </div>\n  <div class="{mark.btn.group}">\n  \t<button class="{mark.btn.item}" data-action-click="align(left)"><i class="fa fa-align-left"></i></button>\n  \t<button class="{mark.btn.item}" data-action-click="align(center)"><i class="fa fa-align-center"></i></button>\n  \t<button class="{mark.btn.item}" data-action-click="align(right)"><i class="fa fa-align-right"></i></button>\n  </div>\n  <div class="{mark.btn.group}">\n    <select class="{mark.selector.self}" data-bind="cellClass" data-action-change="changeCellClass()">\n      <option value=""></option>\n      <!-- BEGIN selector.option:loop -->\n      <option value="{value}">{label}</option>\n      <!-- END selector.option:loop -->\n    </select>\n  </div>\n</div>\n<!-- END showBtnList:exist -->\n<div class="spread-table-wrapper">\n  <!-- BEGIN inputMode:touch#table -->\n\t<table class="spread-table">\n\t\t<tr class="spread-table-header js-table-header">\n\t\t\t<th class="spread-table-first"></th>\n\t\t\t<!-- BEGIN highestRow:loop -->\n\t\t\t<th data-action-click="selectRow({i})"<!-- BEGIN selectedRowNo:touch#{i} -->class="selected"<!-- END selectedRowNo:touch#{i} -->><span class="spread-table-toggle-btn"></span></th>\n\t\t\t<!-- END highestRow:loop -->\n\t\t</tr>\n\t\t<!-- BEGIN row:loop -->\n\t\t<tr>\n\t\t\t<th class="spread-table-side js-table-side<!-- BEGIN selectedColNo:touch#{i} --> selected<!-- END selectedColNo:touch#{i} -->" data-action-click="selectCol({i})"><span class="spread-table-toggle-btn"></span></th>\n\t\t\t<!-- BEGIN row.{i}.col:loop -->\n\t\t\t<td colspan="{colspan}" rowspan="{rowspan}" data-action="updateTable({i},{i})" data-cell-id="{i}-{i}" class="<!-- BEGIN selected:exist -->spread-table-selected<!-- END selected:exist --><!-- BEGIN type:touch#th --> spread-table-th<!-- END \type:touch#th --><!-- BEGIN mark.top:exist --> spread-table-border-top<!-- END mark.top:exist --><!-- BEGIN mark.right:exist --> spread-table-border-right<!-- END mark.right:exist --><!-- BEGIN mark.bottom:exist --> spread-table-border-bottom<!-- END mark.bottom:exist --><!-- BEGIN mark.left:exist --> spread-table-border-left<!-- END mark.left:exist --><!-- BEGIN cellClass:exist --> {cellClass}<!-- END cellClass:exist -->"><div class=\'spread-table-editable {align}\' contenteditable>{value}</div><div class=\'spread-table-pseudo\'></div></td>\n\t\t\t<!-- END row.{i}.col:loop -->\n\t\t</tr>\n\t\t<!-- END row:loop -->\n\t</table>\n  <!-- END inputMode:touch#table -->\n  <!-- BEGIN inputMode:touch#source -->\n  <textarea data-bind="tableResult" class="spread-table-textarea"></textarea>\n  <!-- END inputMode:touch#source -->\n</div>\n';
var returnTable = '<table>\n\t<!-- BEGIN row:loop -->\n\t<tr>\n\t\t<!-- BEGIN row.{i}.col:loop -->\n\t\t<!-- BEGIN type:touch#th -->\n\t\t<th<!-- BEGIN colspan:touchnot#1 --> colspan="{colspan}"<!-- END colspan:touchnot#1 --><!-- BEGIN rowspan:touchnot#1 --> rowspan="{rowspan}"<!-- END rowspan:touchnot#1 --><!-- BEGIN align:exist -->{align}[getStyleByAlign]<!-- END align:exist -->>{value}</th>\n\t\t<!-- END type:touch#th -->\n\t\t<!-- BEGIN type:touch#td -->\n\t\t<td<!-- BEGIN colspan:touchnot#1 --> colspan="{colspan}"<!-- END colspan:touchnot#1 --><!-- BEGIN rowspan:touchnot#1 --> rowspan="{rowspan}"<!-- END rowspan:touchnot#1 --><!-- BEGIN align:exist -->{align}[getStyleByAlign]<!-- END align:exist -->>{value}</td>\n\t\t<!-- END type:touch#td -->\n\t\t<!-- END row.{i}.col:loop -->\n\t</tr>\n\t<!-- END row:loop -->\n</table>\n';
var style = '.spread-table-wrapper {\n  position: relative;\n  z-index: 0;\n  width: 100%;\n}\n\n.spread-table-pseudo {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: -1;\n}\n\n.spread-table-wrapper {\n  width: 100%;\n  -ms-overflow-x: scroll;\n  overflow-x: scroll;\n}\n\n.spread-table {\n  border-collapse: collapse;\n  table-layout: fixed;\n  font-family: "Open Sans", Helvetica, Arial, sans-serif;\n}\n\n.spread-table input {\n  width: 100%;\n  height: 100%;\n  display: block;\n}\n\n.spread-table td,\n.spread-table th {\n  text-align: left;\n  width: 100px;\n  height: 27px;\n  white-space: nowrap;\n  /*  overflow: hidden;*/\n  position: relative;\n  z-index: 0;\n}\n\n.spread-table th {\n  border: 1px dashed #a7a7aa;\n  background-color: transparent;\n  font-weight: normal;\n  cursor: pointer;\n}\n\n.spread-table th:hover {\n  background-image: -webkit-linear-gradient(#f8f8f8 0%, #e1e1e1 100%);\n  background-image: -o-linear-gradient(#f8f8f8 0%, #e1e1e1 100%);\n  background-image: linear-gradient(#f8f8f8 0%, #e1e1e1 100%);\n  border: 1px solid #a7a7aa;\n}\n\n.spread-table td {\n  background-color: #fff;\n  border: 1px solid #cccccc;\n}\n\n.spread-table td:first-child,\n.spread-table th:first-child {\n  width: 30px;\n}\n\n.spread-table .left {\n  text-align: left;\n}\n\n.spread-table .right {\n  text-align: right;\n}\n\n.spread-table .center {\n  text-align: center;\n}\n\n.spread-table .spread-table-th {\n  background-color: #ddd;\n  font-weight: bold;\n}\n\n.spread-table .spread-table-selected {\n  background-color: #eaf2f9;\n}\n\n.spread-table-editable {\n  width: 100%;\n  height: 100%;\n}\n\n.spread-table-pseudo {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: -1;\n}\n\n.spread-table-menu {\n  display: block;\n  list-style-type: none;\n  padding: 0;\n  margin: 0;\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 999999;\n  background-color: #fff;\n  border: 1px solid #cccccc;\n  color: #474747;\n  font-size: 13px;\n  -webkit-box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);\n  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);\n}\n\n.spread-table-menu li {\n  display: block;\n  font-size: 13px;\n  padding: 9px 7px;\n  border-bottom: 1px solid #ddd;\n  cursor: pointer;\n}\n\n.spread-table-menu li:hover {\n  background-color: #ebf0f6;\n}\n\n.spread-table-header th {\n  text-align: center;\n  position: relative;\n}\n\n.spread-table-header .selected {\n  background-color: #eaf2f9;\n}\n\n.spread-table-side.selected {\n  background-color: #eaf2f9;\n}\n\n.spread-table .spread-table-side {\n  text-align: center;\n  position: relative;\n}\n\n.spread-table-btn-list {\n  margin-bottom: 10px;\n  display: table;\n}\n\n.spread-table-btn {\n  display: table-cell;\n  border-left: none;\n  border: 1px solid #d9d9d9;\n  background-color: #f2f2f2;\n  font-size: 12px;\n  padding: 3px 5px;\n}\n\n.spread-table-btn:first-child {\n  border-top-left-radius: 3px;\n  border-bottom-left-radius: 3px;\n}\n\n.spread-table-btn:last-child {\n  border-top-right-radius: 3px;\n  border-bottom-right-radius: 3px;\n}\n\n.spread-table-toggle-btn {\n  display: inline-block;\n  padding: 5px;\n  position: absolute;\n  cursor: pointer;\n  top: 50%;\n  left: 50%;\n  margin-top: -2.5px;\n  margin-left: -2.5px;\n}\n\n.spread-table-toggle-btn:after {\n  content: "";\n  display: block;\n  border: solid transparent;\n  content: " ";\n  height: 0;\n  width: 0;\n  border-color: rgba(136, 183, 213, 0);\n  border-top-color: #fff;\n  border-width: 5px;\n  margin-left: -5px;\n  position: absolute;\n  top: 2px;\n  left: 5px;\n}\n\n.spread-table-header th:hover .spread-table-toggle-btn:after {\n  border-top-color: #999;\n}\n\n.spread-table-first {\n  width: 15px;\n}\n\n.spread-table .spread-table-border-left .spread-table-pseudo {\n  border-left: 2px solid #006dec;\n}\n\n.spread-table .spread-table-border-top .spread-table-pseudo {\n  border-top: 2px solid #006dec;\n}\n\n.spread-table .spread-table-border-right .spread-table-pseudo {\n  border-right: 2px solid #006dec;\n}\n\n.spread-table .spread-table-border-bottom .spread-table-pseudo {\n  border-bottom: 2px solid #006dec;\n}\n\n.spread-table-border-top.spread-table-border-left .spread-table-pseudo:before {\n  content: "";\n  display: block;\n  position: absolute;\n  top: -3px;\n  left: -3px;\n  width: 6px;\n  height: 6px;\n  background-color: #006dec;\n  -webkit-border-radius: 5px;\n  border-radius: 5px;\n}\n\n.spread-table-border-bottom.spread-table-border-right .spread-table-pseudo:before {\n  content: "";\n  display: block;\n  position: absolute;\n  bottom: -3px;\n  right: -3px;\n  width: 6px;\n  height: 6px;\n  background-color: #006dec;\n  -webkit-border-radius: 5px;\n  border-radius: 5px;\n}\n\n.spread-table-textarea {\n  width: 100%;\n  height: 200px;\n  margin-bottom: 10px;\n  line-height: 1.7;\n  border: 1px solid #ccc;\n  -webkit-border-radius: 5px;\n  border-radius: 5px;\n}\n';
var ids = [];
$('body').append('<style>' + style + '</style>');
$('body').append("<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'>");
var defs = {
  showBtnList: true,
  lang: 'en',
  mark: {
    align: {
      default: 'left',
      left: 'class="left"',
      center: 'class="center"',
      right: 'class="right"'
    },
    btn: {
      group: 'spread-table-btn-list',
      item: 'spread-table-btn',
      itemActive: 'spread-table-btn-active'
    }
  }
};

var Spread = function (_aTemplate) {
  _inherits(Spread, _aTemplate);

  function Spread(ele, option) {
    _classCallCheck(this, Spread);

    var _this = _possibleConstructorReturn(this, (Spread.__proto__ || Object.getPrototypeOf(Spread)).call(this));

    _this.id = _this.getRandText(10);
    _this.addTemplate(template, _this.id);
    _this.data = $.extend(true, {}, defs, option);
    _this.data.point = { x: -1, y: -1 };
    _this.data.selectedRowNo = -1;
    _this.data.selectedColNo = -1;
    _this.data.showBtnList = true;
    _this.data.row = _this.parse($(ele).html());
    _this.data.highestRow = _this.highestRow;
    _this.data.history = [];
    _this.data.inputMode = "table";
    _this.data.cellClass = "";
    _this.data.history.push(clone(_this.data.row));
    _this.convert = {};
    _this.convert.getStyleByAlign = _this.getStyleByAlign;
    $(ele).wrap("<div data-id='" + _this.id + "'></div>");
    $(ele).remove();
    _this.update();
    return _this;
  }

  _createClass(Spread, [{
    key: 'highestRow',
    value: function highestRow() {
      var arr = [];
      this.data.row.forEach(function (item, i) {
        if (!item || !item.col) {
          return;
        }
        item.col.forEach(function (obj, t) {
          var length = parseInt(obj.colspan);
          for (var i = 0; i < length; i++) {
            arr.push(i);
          }
        });
      });
      return arr;
    }
  }, {
    key: 'getCellByIndex',
    value: function getCellByIndex(x, y) {
      return $("[data-id='" + this.id + "'] [data-cell-id='" + x + '-' + y + "']");
    }
  }, {
    key: 'getCellInfoByIndex',
    value: function getCellInfoByIndex(x, y) {
      var id = this.id;
      var $cell = this.getCellByIndex(x, y);
      if ($cell.length == 0) {
        return false;
      }
      var left = $cell.offset().left;
      var top = $cell.offset().top;
      var returnLeft = -1;
      var returnTop = -1;
      var width = parseInt($cell.attr('colspan'));
      var height = parseInt($cell.attr('rowspan'));
      $("[data-id='" + this.id + "'] .js-table-header th").each(function (i) {
        if ($(this).offset().left === left) {
          returnLeft = i;
        }
      });
      $("[data-id='" + this.id + "'] .js-table-side").each(function (i) {
        if ($(this).offset().top === top) {
          returnTop = i;
        }
      });
      return { x: returnLeft - 1, y: returnTop, width: width, height: height };
    }
  }, {
    key: 'getLargePoint',
    value: function getLargePoint() {
      var minXArr = [];
      var minYArr = [];
      var maxXArr = [];
      var maxYArr = [];
      for (var i = 0, n = arguments.length; i < n; i++) {
        minXArr.push(arguments[i].x);
        minYArr.push(arguments[i].y);
        maxXArr.push(arguments[i].x + arguments[i].width);
        maxYArr.push(arguments[i].y + arguments[i].height);
      }
      var minX = Math.min.apply(Math, minXArr);
      var minY = Math.min.apply(Math, minYArr);
      var maxX = Math.max.apply(Math, maxXArr);
      var maxY = Math.max.apply(Math, maxYArr);
      return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
    }
  }, {
    key: 'getSelectedPoints',
    value: function getSelectedPoints() {
      var arr = [];
      var self = this;
      this.data.row.forEach(function (item, i) {
        if (!item.col) {
          return false;
        }
        item.col.forEach(function (obj, t) {
          if (obj.selected) {
            var point = self.getCellInfoByIndex(t, i);
            if (point) {
              arr.push(point);
            }
          }
        });
      });
      return arr;
    }
  }, {
    key: 'getSelectedPoint',
    value: function getSelectedPoint() {
      var arr = this.getSelectedPoints();
      if (arr && arr[0]) {
        return arr[0];
      }
    }
  }, {
    key: 'getAllPoints',
    value: function getAllPoints() {
      var arr = [];
      var self = this;
      this.data.row.forEach(function (item, i) {
        if (!item || !item.col) {
          return;
        }
        item.col.forEach(function (obj, t) {
          var point = self.getCellInfoByIndex(t, i);
          if (point) {
            arr.push(point);
          }
        });
      });
      return arr;
    }
  }, {
    key: 'getCellIndexByPos',
    value: function getCellIndexByPos(x, y) {
      var a, b;
      var self = this;
      this.data.row.forEach(function (item, i) {
        if (!item || !item.col) {
          return;
        }
        item.col.forEach(function (obj, t) {
          var point = self.getCellInfoByIndex(t, i);
          if (point.x == x && point.y == y) {
            a = t;
            b = i;
          }
        });
      });
      return { row: b, col: a };
    }
  }, {
    key: 'getCellByPos',
    value: function getCellByPos(x, y) {
      var index = this.getCellIndexByPos(x, y);
      if (!this.data.row[index.row]) {
        return;
      }
      return this.data.row[index.row].col[index.col];
    }
  }, {
    key: 'hitTest',
    value: function hitTest(point1, point2) {
      if (point1.x < point2.x + point2.width && point2.x < point1.x + point1.width && point1.y < point2.y + point2.height && point2.y < point1.y + point1.height) {
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: 'markup',
    value: function markup() {
      if (this.data.splited) {
        this.data.splited = false;
        return;
      }
      var points = this.getSelectedPoints();
      var point1 = this.getLargePoint.apply(null, points);
      var self = this;
      this.data.row.forEach(function (item, i) {
        if (!item || !item.col) {
          return false;
        }
        item.col.forEach(function (obj, t) {
          var point = self.getCellInfoByIndex(t, i);
          var mark = {};
          if (obj.selected) {
            if (point.x == point1.x) {
              mark.left = true;
            }
            if (point.x + point.width == point1.x + point1.width) {
              mark.right = true;
            }
            if (point.y == point1.y) {
              mark.top = true;
            }
            if (point.y + point.height == point1.y + point1.height) {
              mark.bottom = true;
            }
          }
          obj.mark = mark;
        });
      });
    }
  }, {
    key: 'selectRange',
    value: function selectRange(a, b) {
      if (!this.data.point) {
        return;
      }
      var self = this;
      this.data.row[a].col[b].selected = true;
      var points = this.getSelectedPoints();
      var point3 = this.getLargePoint.apply(null, points);
      this.data.row.forEach(function (item, i) {
        if (!item || !item.col) {
          return false;
        }
        item.col.forEach(function (obj, t) {
          var point = self.getCellInfoByIndex(t, i);
          if (point && self.hitTest(point3, point)) {
            obj.selected = true;
          }
        });
      });
      if (points.length > 1) {
        this.update();
      }
    }
  }, {
    key: 'select',
    value: function select(a, b) {
      this.data.point = { x: b, y: a };
      this.data.row.forEach(function (item, i) {
        if (!item || !item.col) {
          return false;
        }
        item.col.forEach(function (obj, t) {
          if (i !== a || t !== b) {
            obj.selected = false;
          }
        });
      });
      if (!this.data.row[a].col[b].selected) {
        this.data.row[a].col[b].selected = true;
      }
    }
  }, {
    key: 'unselectCells',
    value: function unselectCells() {
      this.data.row.forEach(function (item, i) {
        if (!item || !item.col) {
          return false;
        }
        item.col.forEach(function (obj, t) {
          obj.selected = false;
        });
      });
    }
  }, {
    key: 'removeCell',
    value: function removeCell(cell) {
      var row = this.data.row;
      for (var i = 0, n = row.length; i < n; i++) {
        var col = row[i].col;
        for (var t = 0, m = col.length; t < m; t++) {
          var obj = col[t];
          if (obj === cell) {
            col.splice(t, 1);
            t--;
            m--;
          }
        }
      }
    }
  }, {
    key: 'removeSelectedCellExcept',
    value: function removeSelectedCellExcept(cell) {
      var row = this.data.row;
      for (var i = 0, n = row.length; i < n; i++) {
        var col = row[i].col;
        for (var t = 0, m = col.length; t < m; t++) {
          var obj = col[t];
          if (obj !== cell && obj.selected) {
            col.splice(t, 1);
            t--;
            m--;
          }
        }
      }
    }
  }, {
    key: 'contextmenu',
    value: function contextmenu() {
      var $ele = $("[data-id='" + this.id + "']");
      var $target = $(this.e.target);
      this.e.preventDefault();
      this.data.showMenu = true;
      this.data.menuX = this.e.clientX;
      this.data.menuY = this.e.clientY;
      this.update();
    }
  }, {
    key: 'parse',
    value: function parse(html) {
      var arr1 = [];
      $('tr', html).each(function () {
        var ret2 = {};
        var arr2 = [];
        ret2.col = arr2;
        $('th,td', this).each(function () {
          var obj = {};
          if ($(this).is('th')) {
            obj.type = 'th';
          } else {
            obj.type = 'td';
          }
          obj.colspan = $(this).attr('colspan') || 1;
          obj.rowspan = $(this).attr('rowspan') || 1;
          obj.value = $(this).html();
          arr2.push(obj);
        });
        arr1.push(ret2);
      });
      return arr1;
    }
  }, {
    key: 'getTable',
    value: function getTable() {
      return this.getHtml(returnTable, true);
    }
  }, {
    key: 'getMarkdown',
    value: function getMarkdown() {
      return toMarkdown(this.getHtml(returnTable, true));
    }
  }, {
    key: 'onUpdated',
    value: function onUpdated() {
      var points = this.getAllPoints();
      var point = this.getLargePoint.apply(null, points);
      var width = point.width;
      var $th = $('.js-table-header th', "[data-id='" + this.id + "']");
      $th.each(function (i) {
        if (i > width) {
          $(this).remove();
        }
      });
      if (this.afterRendered) {
        this.afterRendered();
      }
    }
  }, {
    key: 'undo',
    value: function undo() {
      var data = this.data.row;
      if (this.data.history.length === 0) {
        return;
      }

      while (JSON.stringify(data) === JSON.stringify(this.data.row)) {
        data = this.data.history.pop();
      }

      if (data) {
        if (this.data.history.length === 0) {
          this.data.history.push(clone(data));
        }
        this.data.row = data;
        this.update();
      }
    }
    // 行の追加

  }, {
    key: 'insertRow',
    value: function insertRow(a, row) {
      if (this.data.row[a]) {
        this.data.row.splice(a, 0, { col: row });
      } else if (this.data.row.length == a) {
        this.data.row.push({ col: row });
      }
    }
  }, {
    key: 'insertCellAt',
    value: function insertCellAt(a, b, item) {
      if (this.data.row[a] && this.data.row[a].col) {
        this.data.row[a].col.splice(b, 0, item);
      }
    }
  }, {
    key: 'selectRow',
    value: function selectRow(i) {
      this.unselectCells();
      this.data.showMenu = false;
      var points = this.getAllPoints();
      var point1 = this.getLargePoint.apply(null, points);
      var newpoint = { x: parseInt(i), y: 0, width: 1, height: point1.height };
      var targetPoints = [];
      var self = this;
      points.forEach(function (point) {
        if (self.hitTest(newpoint, point)) {
          targetPoints.push(point);
        }
      });
      targetPoints.forEach(function (point) {
        var index = self.getCellIndexByPos(point.x, point.y);
        var cell = self.getCellByPos(point.x, point.y);
        cell.selected = true;
      });
      this.data.mode = 'col';
      this.data.selectedColNo = -1;
      this.data.selectedRowNo = i;
      this.contextmenu();
      this.update();
    }
  }, {
    key: 'selectCol',
    value: function selectCol(i) {
      var points = this.getAllPoints();
      var point1 = this.getLargePoint.apply(null, points);
      var newpoint = { x: 0, y: parseInt(i), width: point1.width, height: 1 };
      var targetPoints = [];
      var self = this;
      this.unselectCells();
      this.data.showMenu = false;
      points.forEach(function (point) {
        if (self.hitTest(newpoint, point)) {
          targetPoints.push(point);
        }
      });
      targetPoints.forEach(function (point) {
        var index = self.getCellIndexByPos(point.x, point.y);
        var cell = self.getCellByPos(point.x, point.y);
        cell.selected = true;
      });
      this.data.mode = 'row';
      this.data.selectedRowNo = -1;
      this.data.selectedColNo = i;
      this.contextmenu();
      this.update();
    }
  }, {
    key: 'removeCol',
    value: function removeCol(selectedno) {
      this.data.showMenu = false;
      var self = this;
      var points = this.getAllPoints();
      var point1 = this.getLargePoint.apply(null, points);
      var newpoint = { x: parseInt(selectedno), y: 0, width: 1, height: point1.height };
      var targetPoints = [];
      points.forEach(function (point) {
        if (self.hitTest(newpoint, point)) {
          targetPoints.push(point);
        }
      });
      targetPoints.forEach(function (point) {
        var index = self.getCellIndexByPos(point.x, point.y);
        var cell = self.getCellByPos(point.x, point.y);
        if (cell.colspan == 1) {
          self.removeCell(cell);
        } else {
          cell.colspan = parseInt(cell.colspan) - 1;
        }
      });
      this.data.history.push(clone(this.data.row));
      this.update();
    }
  }, {
    key: 'removeRow',
    value: function removeRow(selectedno) {
      this.data.showMenu = false;
      var self = this;
      var points = this.getAllPoints();
      var point1 = this.getLargePoint.apply(null, points);
      selectedno = parseInt(selectedno);
      var newpoint = { x: 0, y: selectedno, width: point1.width, height: 1 };
      var nextpoint = { x: 0, y: selectedno + 1, width: point1.width, height: 1 };
      var targetPoints = [];
      var removeCells = [];
      var insertCells = [];
      points.forEach(function (point) {
        if (self.hitTest(newpoint, point)) {
          targetPoints.push(point);
        }
      });
      points.forEach(function (point) {
        if (self.hitTest(nextpoint, point)) {
          var cell = self.getCellByPos(point.x, point.y);
          cell.x = point.x;
          if (point.y == nextpoint.y) {
            insertCells.push(cell);
          }
        }
      });
      targetPoints.forEach(function (point) {
        var cell = self.getCellByPos(point.x, point.y);
        if (cell.rowspan == 1) {
          removeCells.push(cell);
        } else {
          cell.rowspan = parseInt(cell.rowspan) - 1;
          if (selectedno == point.y) {
            cell.x = point.x;
            insertCells.push(cell);
          }
        }
      });
      insertCells.sort(function (a, b) {
        if (a.x > b.x) {
          return 1;
        } else {
          return -1;
        }
      });
      removeCells.forEach(function (cell) {
        self.removeCell(cell);
      });
      this.data.row.splice(selectedno, 1);
      if (insertCells.length > 0) {
        this.data.row[selectedno] = { col: insertCells };
      }
      this.data.history.push(clone(this.data.row));
      this.update();
    }
  }, {
    key: 'updateTable',
    value: function updateTable(b, a) {
      if (this.e.type === 'mouseup' && this.data.showMenu) {
        return;
      }
      a = parseInt(a);
      b = parseInt(b);
      this.data.mode = 'cell';
      this.data.selectedRowNo = -1;
      this.data.selectedColNo = -1;
      this.data.showMenu = false;
      if (this.e.type == 'click') {
        if (this.e.shiftKey) {
          this.selectRange(a, b);
        }
      } else if (this.e.type == 'mousedown') {
        if (this.e.button !== 2 && !this.e.ctrlKey) {
          this.mousedown = true;
          if (!this.data.row[a].col[b].selected) {
            this.select(a, b);
            this.update();
          } else {
            this.select(a, b);
          }
        }
      } else if (this.e.type == 'mousemove') {
        if (this.mousedown) {
          this.selectRange(a, b);
        }
      } else if (this.e.type == 'mouseup') {
        this.mousedown = false;
        this.selectRange(a, b);
      } else if (this.e.type == 'contextmenu') {
        this.mousedown = false;
        this.contextmenu();
      } else {
        this.data.row[a].col[b].value = $(this.e.target).html();
        if (this.afterEntered) {
          this.afterEntered();
        }
      }
    }
  }, {
    key: 'insertColRight',
    value: function insertColRight(selectedno) {
      this.data.selectedRowNo = parseInt(selectedno);
      this.data.showMenu = false;
      var self = this;
      var points = this.getAllPoints();
      var point1 = this.getLargePoint.apply(null, points);
      var newpoint = { x: parseInt(selectedno), y: 0, width: 1, height: point1.height };
      var targetPoints = [];
      points.forEach(function (point) {
        if (self.hitTest(newpoint, point)) {
          targetPoints.push(point);
        }
      });
      targetPoints.forEach(function (point) {
        var index = self.getCellIndexByPos(point.x, point.y);
        var cell = self.getCellByPos(point.x, point.y);
        var newcell = { type: 'td', colspan: 1, rowspan: cell.rowspan, value: '' };
        if (typeof index.row !== 'undefined' && typeof index.col !== 'undefined') {
          if (point.width + point.x - newpoint.x > 1) {
            cell.colspan = parseInt(cell.colspan) + 1;
            cell.colspan += '';
          } else {
            self.insertCellAt(index.row, index.col + 1, newcell);
          }
        }
      });
      this.data.history.push(clone(this.data.row));
      this.update();
    }
  }, {
    key: 'insertColLeft',
    value: function insertColLeft(selectedno) {
      this.data.selectedRowNo = parseInt(selectedno) + 1;
      this.data.showMenu = false;
      var self = this;
      var points = this.getAllPoints();
      var point1 = this.getLargePoint.apply(null, points);
      var newpoint = { x: parseInt(selectedno) - 1, y: 0, width: 1, height: point1.height };
      var targetPoints = [];
      points.forEach(function (point) {
        if (self.hitTest(newpoint, point)) {
          targetPoints.push(point);
        }
      });
      if (selectedno == 0) {
        var length = point1.height;
        for (var i = 0; i < length; i++) {
          var newcell = { type: 'td', colspan: 1, rowspan: 1, value: '' };
          self.insertCellAt(i, 0, newcell);
        }
        self.update();
        return;
      }
      targetPoints.forEach(function (point) {
        var index = self.getCellIndexByPos(point.x, point.y);
        var cell = self.getCellByPos(point.x, point.y);
        var newcell = { type: 'td', colspan: 1, rowspan: cell.rowspan, value: '' };
        if (typeof index.row !== 'undefined' && typeof index.col !== 'undefined') {
          if (point.width + point.x - newpoint.x > 1) {
            cell.colspan = parseInt(cell.colspan) + 1;
            cell.colspan += '';
          } else {
            self.insertCellAt(index.row, index.col + 1, newcell);
          }
        }
      });
      this.data.history.push(clone(this.data.row));
      this.update();
    }
  }, {
    key: 'beforeUpdated',
    value: function beforeUpdated() {
      this.changeSelectOption();
      this.markup();
    }
  }, {
    key: 'insertRowBelow',
    value: function insertRowBelow(selectedno) {
      this.data.showMenu = false;
      this.data.selectedColNo = parseInt(selectedno);
      var self = this;
      var points = this.getAllPoints();
      var point1 = this.getLargePoint.apply(null, points);
      selectedno = parseInt(selectedno);
      var newpoint = { x: 0, y: selectedno + 1, width: point1.width, height: 1 };
      var targetPoints = [];
      var newRow = [];
      points.forEach(function (point) {
        if (self.hitTest(newpoint, point)) {
          targetPoints.push(point);
        }
      });
      if (targetPoints.length == 0) {
        var length = point1.width;
        for (var i = 0; i < length; i++) {
          var newcell = { type: 'td', colspan: 1, rowspan: 1, value: '' };
          newRow.push(newcell);
        }
        self.insertRow(selectedno + 1, newRow);
        self.update();
        return;
      }
      targetPoints.forEach(function (point) {
        var index = self.getCellIndexByPos(point.x, point.y);
        var cell = self.getCellByPos(point.x, point.y);
        if (!cell) {
          return;
        }
        var newcell = { type: 'td', colspan: 1, rowspan: 1, value: '' };
        if (typeof index.row !== 'undefined' && typeof index.col !== 'undefined') {
          if (point.height > 1 && point.y <= selectedno) {
            cell.rowspan = parseInt(cell.rowspan) + 1;
            cell.rowspan += '';
          } else if (index.row == selectedno + 1) {
            var length = parseInt(cell.colspan);
            for (var i = 0; i < length; i++) {
              newRow.push({ type: 'td', colspan: 1, rowspan: 1, value: '' });
            }
          } else {
            self.insertCellAt(index.row + 1, index.col, newcell);
          }
        }
      });
      this.insertRow(selectedno + 1, newRow);
      this.data.history.push(clone(this.data.row));
      this.update();
    }
  }, {
    key: 'insertRowAbove',
    value: function insertRowAbove(selectedno) {
      this.data.showMenu = false;
      this.data.selectedColNo = parseInt(selectedno) + 1;
      var self = this;
      var points = this.getAllPoints();
      var point1 = this.getLargePoint.apply(null, points);
      selectedno = parseInt(selectedno);
      var newpoint = { x: 0, y: selectedno - 1, width: point1.width, height: 1 };
      var targetPoints = [];
      var newRow = [];
      points.forEach(function (point) {
        if (self.hitTest(newpoint, point)) {
          targetPoints.push(point);
        }
      });
      if (selectedno == 0) {
        var length = point1.width;
        for (var i = 0; i < length; i++) {
          var newcell = { type: 'td', colspan: 1, rowspan: 1, value: '' };
          newRow.push(newcell);
        }
        self.insertRow(0, newRow);
        self.update();
        return;
      }
      targetPoints.forEach(function (point) {
        var index = self.getCellIndexByPos(point.x, point.y);
        var cell = self.getCellByPos(point.x, point.y);
        if (!cell) {
          return;
        }
        var newcell = { type: 'td', colspan: 1, rowspan: 1, value: '' };
        if (typeof index.row !== 'undefined' && typeof index.col !== 'undefined') {
          if (point.height > 1) {
            cell.rowspan = parseInt(cell.rowspan) + 1;
            cell.rowspan += '';
          } else if (index.row == selectedno - 1) {
            var length = parseInt(cell.colspan);
            for (var i = 0; i < length; i++) {
              newRow.push({ type: 'td', colspan: 1, rowspan: 1, value: '' });
            }
          } else {
            self.insertCellAt(index.row, index.col, newcell);
          }
        }
      });
      this.insertRow(selectedno, newRow);
      this.data.history.push(clone(this.data.row));
      this.update();
    }
  }, {
    key: 'mergeCells',
    value: function mergeCells() {
      if (!this.isSelectedCellsRectangle()) {
        alert("結合/結合解除するには、結合範囲のすべてのセルを選択する必要があります。");
        return;
      }
      var points = this.getSelectedPoints();
      var point = this.getLargePoint.apply(null, points);
      var cell = this.getCellByPos(point.x, point.y);
      this.removeSelectedCellExcept(cell);
      cell.colspan = point.width;
      cell.rowspan = point.height;
      this.data.showMenu = false;
      this.data.history.push(clone(this.data.row));
      this.update();
    }
  }, {
    key: 'splitCell',
    value: function splitCell() {
      var selectedPoint = this.getSelectedPoint();
      var bound = { x: 0, y: selectedPoint.y, width: selectedPoint.x, height: selectedPoint.height };
      var points = this.getAllPoints();
      var currentIndex = this.getCellIndexByPos(selectedPoint.x, selectedPoint.y);
      var currentCell = this.getCellByPos(selectedPoint.x, selectedPoint.y);
      var width = parseInt(currentCell.colspan);
      var height = parseInt(currentCell.rowspan);
      var self = this;
      var targets = [];
      var cells = [];
      var rows = [];
      points.forEach(function (point) {
        if (self.hitTest(bound, point)) {
          var index = self.getCellIndexByPos(point.x, point.y);
          var cell = self.getCellByPos(point.x, point.y);
          targets.push(index);
        }
      });
      targets.forEach(function (item) {
        var row = item.row;
        if (item.row < currentIndex.row) {
          return;
        }
        if (!rows[row]) {
          rows[row] = [];
        }
        rows[row].push(item);
      });
      for (var i = 1, n = rows.length; i < n; i++) {
        if (!rows[i]) {
          continue;
        }
        rows[i].sort(function (a, b) {
          if (a.col > b.col) {
            return 1;
          } else {
            return -1;
          }
        });
      }
      for (var i = selectedPoint.y, n = i + height; i < n; i++) {
        if (!rows[i]) {
          rows[i] = [];
          rows[i].push({ row: i, col: -1 });
        }
      }
      rows.forEach(function (row) {
        var index = row[row.length - 1];
        for (var i = 0; i < width; i++) {
          self.insertCellAt(index.row, index.col + 1, { type: 'td', colspan: 1, rowspan: 1, value: '', selected: true });
        }
      });
      this.removeCell(currentCell);
      this.data.showMenu = false;
      this.data.history.push(clone(this.data.row));
      this.data.splited = true;
      this.update();
    }
  }, {
    key: 'changeCellTypeTo',
    value: function changeCellTypeTo(type) {
      this.data.row.forEach(function (item, i) {
        item.col.forEach(function (obj, t) {
          if (obj.selected) {
            obj.type = type;
          }
        });
      });
      this.data.showMenu = false;
      this.data.history.push(clone(this.data.row));
      this.update();
    }
  }, {
    key: 'align',
    value: function align(_align) {
      this.data.row.forEach(function (item, i) {
        item.col.forEach(function (obj, t) {
          if (obj.selected) {
            obj.align = _align;
          }
        });
      });
      this.data.showMenu = false;
      this.data.history.push(clone(this.data.row));
      this.update();
    }
  }, {
    key: 'getStyleByAlign',
    value: function getStyleByAlign(align) {
      if (this.data.mark.align.default === align) {
        return '';
      }
      return ' ' + this.data.mark.align[align];
    }
  }, {
    key: 'isSelectedCellsRectangle',
    value: function isSelectedCellsRectangle() {
      var selectedPoints = this.getSelectedPoints();
      var largePoint = this.getLargePoint.apply(null, selectedPoints);
      var points = this.getAllPoints();
      var flag = true;
      var self = this;
      points.forEach(function (point) {
        if (self.hitTest(largePoint, point)) {
          var cell = self.getCellByPos(point.x, point.y);
          if (!cell.selected) {
            flag = false;
          }
        }
      });
      return flag;
    }
  }, {
    key: 'changeInputMode',
    value: function changeInputMode(source) {
      this.data.inputMode = source;
      if (source === "source") {
        this.data.tableResult = this.getTable();
      } else {
        this.data.row = this.parse(this.data.tableResult);
      }
      this.update();
    }
  }, {
    key: 'changeCellClass',
    value: function changeCellClass() {
      var cellClass = this.data.cellClass;
      this.data.row.forEach(function (item, i) {
        item.col.forEach(function (obj, t) {
          if (obj.selected) {
            obj.cellClass = cellClass;
          }
        });
      });
      this.data.history.push(clone(this.data.row));
      this.update();
    }
  }, {
    key: 'changeSelectOption',
    value: function changeSelectOption() {
      var cellClass;
      var flag = true;
      this.data.row.forEach(function (item, i) {
        item.col.forEach(function (obj, t) {
          if (obj.selected) {
            if (!cellClass) {
              cellClass = obj.cellClass;
            } else if (cellClass && cellClass != obj.cellClass) {
              flag = false;
            }
          }
        });
      });
      if (flag) {
        this.data.cellClass = cellClass;
      } else {
        this.data.cellClass = "";
      }
    }
  }]);

  return Spread;
}(aTemplate);

module.exports = Spread;
