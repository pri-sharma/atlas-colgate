import React, { Component } from 'react';
// import { apiUrl } from './ApiUrl'
import logo from './logo.svg';
import './App.css';
import url from './assets/ApiUrl';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const apiurl = url.apiurl;
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentDidMount() {
  }

}

export default App;

export const apiCall = (obj) => {
  return fetch(apiurl + obj)
    .then(result => result.json())
}

export var gridOptionsProp = () => {
  return gridOptionsProp = {
    defaultColDef: {
      sortable: true,
      resizable: true,
      enableValue: true,
      //autoHeight: true,
      // lockPinned: true,
       hide: true,
       floatCell: true, 
       editable: false, 
       enablePivot: true,
       //enableRowGroup: true
    },
    autoGroupColumnDef: {
      enableValue: false,
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      cellRenderer: 'agGroupCellRenderer',
      cellClass: 'grouprow',
      cellStyle: { color: "#3c8dbc" },
      rowStyle: { color: "#3c8dbc" },
      cellRendererParams: {
        suppressCount: true,
        checkbox: false,
        footerValueGetter: '"Total"',
        // innerRenderer:this.customCellRendererFunc
  
      },
      filterValueGetter: function (params) {
        var colGettingGrouped = params.colDef.showRowGroup;
        var valueForOtherCol = params.api.getValue(colGettingGrouped.toString(), params.node);
        return valueForOtherCol;
      },
    },
    sideBar: true,
    pivotMode: true,
    suppressContextMenu: true,
    enableBrowserTooltips: false,
    groupIncludeTotalFooter: true,
    groupSuppressBlankHeader: true,
    rowDragManaged: true,
    accentedSort: true,
    suppressSetColumnStateEvents: true,
    floatingFilter: false,
    rowGroupPanelShow: 'always',
    pivotPanelShow: 'always',
    pivotColumnGroupTotals: 'before',
    pivotRowTotals: 'before',
    singleClickEdit: true,
    enterMovesDownAfterEdit: true,
    enterMovesDown: true,
    groupDefaultExpanded: '999',
    multiSortKey: 'ctrl',
    animateRows: true,
    enableRangeSelection: true,
    rowSelection: "multiple",
    rowDeselection: true,
    quickFilterText: null,
    groupSelectsChildren: false,
    pagination: true,
    suppressRowClickSelection: true,
    groupMultiAutoColumn: true,
    groupHideOpenParents: false,
    suppressMakeColumnVisibleAfterUnGroup: true
  }
}

export var generateDefColumns = (objData) => {
  const colData = objData;//await apiCall('gridViewStructure').then(res => { return res });// Get Column Structure data from API
  const uniqueAttCat = [];// Unique Attribute Category
  var childOfHeader = [];// Header child
  var categoryChild = [];// Category Child
  let coldef = []; // Column Definition
  let attributeCategory = []; // Final Column with header
  var gridId, headername, headerDataType, attributeCategoryName,
    attributeCategoryId, Isfilter, lowercaseFieldName;
  //const uniqueAtt = colData.filter((x, i, a) => a.indexOf(x) == i)
  const map = new Map();
  for (const item of colData) {
    if (!map.has(item.AttributeCategoryID)) {
      map.set(item.AttributeCategoryID, true);    // set any value to Map
      uniqueAttCat.push({
        AttributeCategoryID: item.AttributeCategoryID,
        AttributeCategory: item.AttributeCategory
      });
    }
  }
  var agfilter = "agSetColumnFilter"
  for (var j = 0; j < uniqueAttCat.length; j++) {
    childOfHeader = [];
    attributeCategory = [];
    var filterColDatavalues = colData.filter(item => item.AttributeCategoryID == uniqueAttCat[j].AttributeCategoryID)
    childOfHeader = filterColDatavalues
    for (var l = 0; l < childOfHeader.length; l++) {
      categoryChild = childOfHeader[l];
      attributeCategoryName = categoryChild["AttributeCategory"];
      attributeCategoryId = categoryChild["AttributeCategoryID"];
      headername = categoryChild["AttributeName"];
      headerDataType = categoryChild["DataType"];
      gridId = categoryChild["ID"];
      Isfilter = categoryChild["IsFilter"] == 'true' ? true : false;
      if (headerDataType == "Date") {
        agfilter = "agDateColumnFilter";
      } else if (headerDataType == "Amount" || headerDataType == "Numeric") {
        agfilter = "agNumberColumnFilter";
      }

      lowercaseFieldName = headername.toLowerCase();
      if (headerDataType == "Date") {

        attributeCategory.push({
          headerDataType: headerDataType,
          headerName: headername,
          field: lowercaseFieldName,
          suppressFilter: Isfilter,
          enableRowGroup: true,
          //cellClass: 'ag-grid-cellClass',
          cellStyle: function (params) {
            if (params.column.aggFunc == 'Count' && typeof params.value == 'object') {
              return { textAlign: "right" };
            } else {
              return { textAlign: "center" };
            }
          },
          allowedAggFuncs: ['min', 'max', 'count'],
          //, comparator: this.dateComparator
          filter: agfilter,
          filterParams: {
            filterOptions: [
              "equals",
              "greaterThan",
              "lessThan",
              "notEqual",
              "inRange",
              {
                displayKey: "BlankDate",
                displayName: "Blank Date",
                suppressAndOrCondition: true,
                hideFilterInput: true,
                test: function (filterValue, cellValue) {
                  if (cellValue == null || cellValue == "")
                    return true;
                }
              },

            ],

            comparator: function (filterLocalDateAtMidnight, cellValue) {

              if (cellValue == null) return -1;
              var dateParts = cellValue.split("/");

              var cellDate = new Date(Number(dateParts[2]), Number(dateParts[0] - 1), Number(dateParts[1]));

              if (filterLocalDateAtMidnight.getTime() == cellDate.getTime()) {
                return 0
              }

              if (cellDate < filterLocalDateAtMidnight) {
                return -1;
              }

              if (cellDate > filterLocalDateAtMidnight) {
                return 1;
              }
            },
            browserDatePicker: true
          }

        })
      }
      else if (headerDataType == "Amount") {

        attributeCategory.push({
          headerDataType: headerDataType,
          headerName: headername,
          field: lowercaseFieldName,
          suppressFilter: Isfilter,
          filter: agfilter,
          enableRowGroup: false,
         // cellClass: 'ag-grid-cellNumber',
          cellStyle: { textAlign: "right" },
          allowedAggFuncs: ['sum', 'min', 'max', 'count', 'avg'],
          //, valueFormatter: this.amountValueFormatter
          comparator: function (number1, number2) {
            if (number1 != null) {
              if (typeof number1 == "object") {
                number1 = number1.val;
              }

            }
            if (number2 != null) {
              if (typeof number2 == "object") {
                number2 = number2.val;
              }
            }

            if (number1 === null && number2 === null) {
              return 0;
            }
            if (number1 === null) {
              return -1;
            }
            if (number2 === null) {
              return 1;
            }
            return number1 - number2;
          },
          filterParams: {

            filterOptions: [
              {
                displayKey: "equals",
                displayName: "Equals",
                test: function (filterValue, cellValue) {
                  if (filterValue == cellValue)
                    return true;
                }
              },
              "notEqual",
              'lessThan',
              "lessThanOrEqual",
              "greaterThan",
              "greaterThanOrEqual",
              "inRange"
            ]
            ,
          }

        })

      }
      else if (headerDataType == "decimal") {

        attributeCategory.push({
          headerDataType: headerDataType,
          headerName: headername,
          field: lowercaseFieldName,
          suppressFilter: Isfilter,
          filter: agfilter,
          enableRowGroup: false,
          cellClass: 'ag-grid-cellNumber',
          cellStyle: { textAlign: "right" },
          allowedAggFuncs: ['sum', 'min', 'max', 'count', 'avg']
          //, valueFormatter: this.percentValueFormatter
          , comparator: function (number1, number2) {
            if (number1 != null) {
              if (typeof number1 == "object") {
                number1 = number1.val;
              }
            }
            if (number2 != null) {
              if (typeof number2 == "object") {
                number2 = number2.val;
              }
            }

            if (number1 === null && number2 === null) {
              return 0;
            }
            if (number1 === null) {
              return -1;
            }
            if (number2 === null) {
              return 1;
            }
            return number1 - number2;
          },
          filterParams: {

            filterOptions: [
              {
                displayKey: "equals",
                displayName: "Equals",
                test: function (filterValue, cellValue) {
                  if (filterValue == cellValue)
                    return true;
                }
              },
              "notEqual",
              'lessThan',
              "lessThanOrEqual",
              "greaterThan",
              "greaterThanOrEqual",
              "inRange"
            ]
            ,
          }
        })

      }
      else if (headerDataType == "Id" || headerDataType == "Key" || headerDataType == "int" ) {

        attributeCategory.push({
          headerDataType: headerDataType,
          headerName: headername,
          field: lowercaseFieldName,
          suppressFilter: Isfilter,
          filter: agfilter,
          enableRowGroup: true,
         // cellClass: 'ag-grid-cellClass',
          allowedAggFuncs: ['count'],
          //cellStyle: { textAlign: "right" },
          // , valueFormatter: this.valueFormatter
          comparator: function (number1, number2) {
            if (number1 != null) {
              if (typeof number1 == "object") {
                number1 = number1.val;
              }
            }
            if (number2 != null) {
              if (typeof number2 == "object") {
                number2 = number2.val;
              }
            }
            if (number1 === null && number2 === null) {
              return 0;
            }
            if (number1 === null) {
              return -1;
            }
            if (number2 === null) {
              return 1;
            }
            return number1 - number2;
          }
        })
      } else
        attributeCategory.push({
          headerDataType: headerDataType,
          headerName: headername,
          field: lowercaseFieldName,
          suppressFilter: Isfilter,
          filter: agfilter,
          enableRowGroup: true,
          //cellClass: 'ag-grid-cellClass',
          allowedAggFuncs: ['count'],
          // cellStyle: function (params) {
          //   if (params.column.aggFunc == 'Count' && typeof params.value == 'object') {
          //     return { textAlign: "right" };
          //   } else {
          //     return { textAlign: "left" };
          //   }
          // }
        })
    }
    coldef.push({ headerName: attributeCategoryName, id: attributeCategoryId, children: attributeCategory })
  }
  return coldef;
}



