import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { gridOptionsProp } from './App'
import { generateDefColumns } from './App'
import { apiCall } from './App'
import url from './assets/ApiUrl';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import $ from 'jquery';
import { LicenseManager } from "ag-grid-enterprise";
LicenseManager.setLicenseKey("Foundation_Source_Philanthropic_Inc__Foundation_Source___3Devs2_SaaS_21_December_2019__MTU3Njg4NjQwMDAwMA==ee8b7707231e7b40f6e71ec9bf87a7f1");

class View extends Component {

  async defColumns() { // Get and generate the Ag-grid column structure
    //debugger;
    const colData = await apiCall('GetGridViewStructure').then(res => { return res });// Get Column Structure data from API
    return generateDefColumns(JSON.parse(colData));
  }
  async getGridData(param) { // Get Ag-grid data from API
    // debugger;
    const gridData = await apiCall('GetGridViewData?data=' + param).then(res => { return res });// Get Ag-Grid data from API
    return JSON.parse(gridData);
  }

  async applyFilter() {
    //Set RowData of Ag-Grid
    // var isPivotMode = this.state.gridOptions.columnApi.isPivotMode();
    // var colState = this.state.gridOptions.columnApi.getColumnState();
    // var groupState = this.state.gridOptions.columnApi.getColumnGroupState();
    // var sortState = this.state.gridOptions.api.getSortModel();
    // var filterState = this.state.gridOptions.api.getFilterModel();
    if(this.state.recordCount==1)
    {
      var data= this.state.gridviewState
 
      this.state.gridOptions.columnApi.setColumnState((JSON.parse(data[0].colState)));
      this.state.gridOptions.columnApi.setColumnGroupState(JSON.parse(data[1].groupState));
      this.state.gridOptions.api.setSortModel(JSON.parse(data[2].sortState));
      //this.state.gridOptions.api.setFilterModel(JSON.parse(data[0].filterState));
       this.state.gridOptions.columnApi.setPivotMode(data[4].isPivotMode)
    }
   
    this.showLoader();
    console.log(this.state.recordCount)
    const respGridData = await this.getGridData(this.state.recordCount);
    this.state.gridOptions.api.setRowData(respGridData)
    this.hideLoader();
  }

  handleChange = (e) => {
    this.setState({ recordCount: e.target.value });
  }

  constructor(props) {
    super(props);
    this.applyFilter = this.applyFilter.bind(this);
    //this.handleChange = this.handleChange.bind(this);
    this.rowGroupToggle = this.rowGroupToggle.bind(this);
    this.valueToggle = this.valueToggle.bind(this);
    this.colGroupToggle = this.colGroupToggle.bind(this);
    this.createViewList = this.createViewList.bind(this);
    // this.onPrivateViewChange = this.onPrivateViewChange.bind(this);
    //  this.onSystemViewChange = this.onSystemViewChange.bind(this);
    this.filterViewList = this.filterViewList.bind(this);
    this.createChildElements = this.createChildElements.bind(this);
    this.restoreState = this.restoreState.bind(this);
    this.restoreState0 = this.restoreState0.bind(this);
    this.restoreState1 = this.restoreState1.bind(this);
    this.getDefaultState = this.getDefaultState.bind(this);
    this.state = {
      // viewList: [
      //   { 'viewName': '18K', 'Id': 0 },
      //   { 'viewName': '2000K', 'Id': 1 }
      // ],
      myPrivateViewList: [],
      systemViewList: [],
      tmpmyPrivateViewList: [],
      tmpsystemViewList: [],
      myPrivateViewType: true,
      systemViewType: true,
      actuallistGroup: [],
      listGroup: [],
      completeViewList: [],
      childElements: [],
      viewList: [
        { 'id': 0, "viewName": "18K", "isPublic": true },
        { 'id': 1, "viewName": "2000K", "isPublic": true },
        // { 'id': 2, "viewName": "1K", "isPublic": false },
        // { 'id': 3, "viewName": "2K", "isPublic": false }
      ],
      gridviewState:
     // "[{"colId":"data_type","hide":true,"aggFunc":null,"width":200,"pivotIndex":null,"pinned":null,"rowGroupIndex":null},{"colId":"country","hide":true,"aggFunc":null,"width":200,"pivotIndex":null,"pinned":null,"rowGroupIndex":null},{"colId":"category","hide":true,"aggFunc":null,"width":200,"pivotIndex":null,"pinned":null,"rowGroupIndex":null},{"colId":"subcategory","hide":true,"aggFunc":null,"width":200,"pivotIndex":null,"pinned":null,"rowGroupIndex":null},{"colId":"sku_grouping","hide":true,"aggFunc":null,"width":200,"pivotIndex":null,"pinned":null,"rowGroupIndex":null},{"colId":"sku","hide":true,"aggFunc":null,"width":200,"pivotIndex":null,"pinned":null,"rowGroupIndex":null},{"colId":"total_cases","hide":true,"aggFunc":null,"width":200,"pivotIndex":null,"pinned":null,"rowGroupIndex":null},{"colId":"gross_sales","hide":true,"aggFunc":null,"width":200,"pivotIndex":null,"pinned":null,"rowGroupIndex":null},{"colId":"gtn","hide":true,"aggFunc":null,"width":200,"pivotIndex":null,"pinned":null,"rowGroupIndex":null},{"colId":"netsales","hide":true,"aggFunc":null,"width":200,"pivotIndex":null,"pinned":null,"rowGroupIndex":null},{"colId":"margin","hide":true,"aggFunc":null,"width":200,"pivotIndex":null,"pinned":null,"rowGroupIndex":null},{"colId":"margin_percentage","hide":true,"aggFunc":null,"width":200,"pivotIndex":null,"pinned":null,"rowGroupIndex":null}]
       // [{ "colState": "[{\"colId\":\"ag-Grid-AutoColumn-sku\",\"hide\":true,\"aggFunc\":null,\"width\":200,\"pivotIndex\":null,\"pinned\":null,\"rowGroupIndex\":null},{\"colId\":\"data_type\",\"hide\":true,\"aggFunc\":null,\"width\":200,\"pivotIndex\":null,\"pinned\":null,\"rowGroupIndex\":null},{\"colId\":\"country\",\"hide\":true,\"aggFunc\":null,\"width\":200,\"pivotIndex\":null,\"pinned\":null,\"rowGroupIndex\":null},{\"colId\":\"category\",\"hide\":true,\"aggFunc\":\"count\",\"width\":200,\"pivotIndex\":null,\"pinned\":null,\"rowGroupIndex\":null},{\"colId\":\"subcategory\",\"hide\":true,\"aggFunc\":\"count\",\"width\":200,\"pivotIndex\":null,\"pinned\":null,\"rowGroupIndex\":null},{\"colId\":\"sku_grouping\",\"hide\":true,\"aggFunc\":\"count\",\"width\":200,\"pivotIndex\":null,\"pinned\":null,\"rowGroupIndex\":null},{\"colId\":\"sku\",\"hide\":true,\"aggFunc\":null,\"width\":200,\"pivotIndex\":null,\"pinned\":null,\"rowGroupIndex\":0},{\"colId\":\"total_cases\",\"hide\":true,\"aggFunc\":null,\"width\":200,\"pivotIndex\":null,\"pinned\":null,\"rowGroupIndex\":null},{\"colId\":\"gross_sales\",\"hide\":true,\"aggFunc\":null,\"width\":200,\"pivotIndex\":null,\"pinned\":null,pIndex\":null},{\"colId\":\"gtn\",\"hide\":true,\"aggFunc\":null,\"width\":200,\"pivotIndex\":null,\"pinned\":null,\"rowGroupIndex\":null},{\"colId\":\"netsales\",\"hide\":true,\"aggFunc\":null,\"width\":200,\"pivotIndex\":null,\"pinned\":null,\"rowGroupIndex\":null},{\"colId\":\"margin\",\"hide\":true,\"aggFunc\":null,\"width\":200,\"pivotIndex\":null,\"pinned\":null,\"rowGroupIndex\":null},{\"colId\":\"margin_percentage\",\"hide\":true,\"aggFunc\":null,\"width\":200,\"pivotIndex\":null,\"pinned\":null,\"rowGroupIndex\":null}]" },
       [{ "colState": "[{\"colId\":\"ag-Grid-AutoColumn-sku\",\"hide\":false,\"aggFunc\":null,\"width\":200,\"pivotIndex\":null,\"pinned\":null,\"rowGroupIndex\":null},{\"colId\":\"data_type\",\"hide\":false,\"aggFunc\":\"count\",\"width\":200,\"pivotIndex\":null,\"pinned\":null,\"rowGroupIndex\":null},{\"colId\":\"country\",\"hide\":false,\"aggFunc\":\"count\",\"width\":200,\"pivotIndex\":null,\"pinned\":null,\"rowGroupIndex\":null}]"}, 
       { "groupState": "[{\"groupId\":\"0\",\"open\":false}]" },
        { "sortState": "[{\"colId\":\"data_type\",\"sort\":\"asc\"}]" },
        { "filterState": "{}" },
        { "isPivotMode": true }],
      columnDefs: [],
      rowData: [],
      gridOptions: gridOptionsProp(),
      error: null,
      recordCount: 0,
      appurl: url.appurl,
      //displayChoosedView: "My List Views",
      displayChoosedView: "18K",
      viewName: ""


    }
  }

  async componentDidMount() {
    // debugger;
    try {
      this.showLoader();
      this.aggridcss();
      const respDefColumns = await this.defColumns();

      this.setState({ columnDefs: respDefColumns });
      const respGridData = await this.getGridData(0);
      this.setState({ rowData: respGridData });
      this.hideLoader();
    } catch (error) {
      console.log(error);
    }
  }

  showLoader() {
    let eGridDiv = document.querySelector('#updateProgress');
    eGridDiv.style.display = "";
  }

  hideLoader() {
    let eGridDiv = document.querySelector('#updateProgress');
    eGridDiv.style.display = "none";
  }

  aggridcss() {

    $('.ag-pivot-mode-panel').each(function () {
      $(this).insertAfter($('.ag-column-drop-values'));
    })
    $('.ag-column-drop-pivot').each(function () {// ag-column-drop-values
      $(this).insertAfter($(this).parent().find('.ag-column-select-panel'));
    })

    $('#colGroupToggle').each(function () {
      $(this).insertAfter($('.ag-column-select-panel'));
    })
    $('#rowGroupToggle').each(function () {
      $(this).insertAfter($('.ag-column-drop-pivot')[1]);
    })
    $('#valueToggle').each(function () {
      $(this).insertAfter($('.ag-column-drop-row-group')[1]);
    })
  }

  valueToggle() {
    let x = $('#spnvalueToggle')
    $('.ag-column-panel > .ag-column-drop-values').toggle();
    if (x[0].className.indexOf('ag-icon-tree-closed') > 0) {
      $('#spnvalueToggle').addClass('ag-icon-tree-open')
      $('#spnvalueToggle').removeClass('ag-icon-tree-closed')
      $('#valueToggle').removeClass('border-bottom')
    } else {
      $('#spnvalueToggle').removeClass('ag-icon-tree-open')
      $('#spnvalueToggle').addClass('ag-icon-tree-closed')
      $('#valueToggle').addClass('border-bottom')

    }

  }

  rowGroupToggle() {
    let x = $('#spnrowGroupToggle')
    $('.ag-column-panel > .ag-column-drop-row-group').toggle();
    if (x[0].className.indexOf('ag-icon-tree-closed') > 0) {
      $('#spnrowGroupToggle').addClass('ag-icon-tree-open')
      $('#spnrowGroupToggle').removeClass('ag-icon-tree-closed')
      $('#rowGroupToggle').removeClass('border-bottom')
    } else {
      $('#spnrowGroupToggle').removeClass('ag-icon-tree-open')
      $('#spnrowGroupToggle').addClass('ag-icon-tree-closed')
      $('#rowGroupToggle').addClass('border-bottom')

    }
  }

  colGroupToggle() {
    let x = $('#spncolGroupToggle')
    $('.ag-column-panel > .ag-column-drop-pivot').toggle();
    if (x[0].className.indexOf('ag-icon-tree-closed') > 0) {
      $('#spncolGroupToggle').addClass('ag-icon-tree-open')
      $('#spncolGroupToggle').removeClass('ag-icon-tree-closed')
      $('#colGroupToggle').removeClass('border-bottom')
    } else {
      $('#spncolGroupToggle').removeClass('ag-icon-tree-open')
      $('#spncolGroupToggle').addClass('ag-icon-tree-closed')
      $('#colGroupToggle').addClass('border-bottom')

    }
  }
  createViewList() {
    this.state.myPrivateViewList = [];
    this.state.tmpmyPrivateViewList = [];
    this.state.systemViewList = [];
    this.state.tmpsystemViewList = [];
    for (var i = 0; i < this.state.viewList.length; i++) {
      if (this.state.viewList[i].isPublic == true) {
        this.state.systemViewList.push({ id: this.state.viewList[i].id, viewName: this.state.viewList[i].viewName, isPublic: this.state.viewList[i].isPublic })
      } else {
        this.state.myPrivateViewList.push({ id: this.state.viewList[i].id, viewName: this.state.viewList[i].viewName, isPublic: this.state.viewList[i].isPublic })
      }
    }
    this.state.tmpmyPrivateViewList = this.state.myPrivateViewList
    this.state.tmpsystemViewList = this.state.systemViewList
    //return systemViewList
  }

  filterViewList() {
    this.state.completeViewList = [];
    this.state.listGroup = [];
    if (this.state.myPrivateViewType == true) {
      if (this.state.myPrivateViewList.length > 0) {
        this.state.listGroup.push({ viewType: 'Private', viewList: this.state.myPrivateViewList })
        this.state.myPrivateViewList.forEach(element => this.state.completeViewList.push(element))
        this.state.tmpmyPrivateViewList = this.state.myPrivateViewList
      }
    } else {
      this.state.tmpmyPrivateViewList = [];
    }

    if (this.state.systemViewType == true) {
      if (this.state.systemViewList.length > 0) {
        this.state.listGroup.push({ viewType: 'System', viewList: this.state.systemViewList })
        this.state.systemViewList.forEach(element => this.state.completeViewList.push(element))
        this.state.tmpsystemViewList = this.state.systemViewList;
      }
    } else {
      this.state.tmpsystemViewList = [];
    }

    this.state.actuallistGroup = this.state.listGroup;
  }
  async restoreState(e) {
    alert('hi')
    console.log();
  }
  async getDefaultState() {
    this.setState({ recordCount: 0, displayChoosedView: "My List Views" });
  }
  async restoreState0(e) {
    //alert('hi')
    //console.log();
    this.setState({ recordCount: 0, displayChoosedView: "18K" });
  }
  async restoreState1(e) {
    // alert('hi')
    this.setState({ recordCount: 1, displayChoosedView: "200K" });
    //console.log();
  }

  onPrivateViewChange = (e) => {
    this.setState({ myPrivateViewType: !this.state.myPrivateViewType });
    this.filterViewList();
  }
  onSystemViewChange = (e) => {
    this.setState({ systemViewType: !this.state.systemViewType });
    this.filterViewList();
  }
  createChildElements() {
    var listChildElements = this.state.childElements
      .filter(function (view) { return view.viewName })
      .map(function (view) {
        return React.createElement('tr', { type: "tr", className: "saved-list-view-row" },

          React.createElement('td', { type: "td", className: "saved-list-view-option" },
            React.createElement('a', { style: { cursor: "pointer" } }, view.viewName)),

          React.createElement('td', { type: "td" },
            React.createElement('input', { type: "checkbox", style: { cursor: "pointer" } })),

          React.createElement('td', { type: "td", className: "saved-list-view-actions" },
            React.createElement('span', { style: { marginRight: "7px" } }),
            React.createElement('a', { className: "fa fa-save tag-icon-xs", style: { display: "none", cursor: "pointer", marginRight: "7px" } }),
            React.createElement('a', { className: "fa fa-trash tag-icon-xs", style: { cursor: "pointer" } }))


        )
      })
    return listChildElements
  }
  handleThatEvent = (e) => {
    //update state, etc.
    alert('o')
  }
  render() {
    this.createViewList();
    this.filterViewList();

    var privateListType = this.state.actuallistGroup
      .filter(function (view) { return view.viewType == 'Private' })
      .map(function (view) {
        return React.createElement('tr', { type: "tr" },
          React.createElement('td', { type: "td" },
            React.createElement('table', { type: "table" },
              React.createElement('tbody', { type: "tbody" },

                React.createElement('tr', { type: "tr" },
                  React.createElement('td', { className: "dv-padding view-type-group-label" }, "Private"))

              ))))
      })

    var systemListType = this.state.actuallistGroup
      .filter(function (view) { return view.viewType == 'System' })
      .map(function (view) {
        return React.createElement('tr', { type: "tr" },
          React.createElement('td', { type: "td" },
            React.createElement('table', { type: "table" },
              React.createElement('tbody', { type: "tbody" },

                React.createElement('tr', { type: "tr" },
                  React.createElement('td', { className: "dv-padding view-type-group-label" }, "System")),

              ))))
      })

    var privateList = this.state.tmpmyPrivateViewList
      .filter(function (view) { return view.viewName })
      .map(function (view) {
        return React.createElement('tr', { type: "tr", key: view.viewName, className: "saved-list-view-row" },

          React.createElement('td', { type: "td", className: "saved-list-view-option", style: { width: "100%" } },
            React.createElement('a', { onClick: (e) => { this.setState({ recordCount: view.id }); }, style: { cursor: "pointer" } }, view.viewName)),

          React.createElement('td', { type: "td" },
            React.createElement('input', { type: "checkbox", style: { cursor: "pointer" } })),

          React.createElement('td', { type: "td", className: "saved-list-view-actions" },
            React.createElement('span', { style: { marginRight: "7px" } }),
            React.createElement('a', { className: "fa fa-save tag-icon-xs", style: { display: "none", cursor: "pointer", marginRight: "7px" } }),
            React.createElement('a', { className: "fa fa-trash tag-icon-xs", style: { cursor: "pointer" } }))
        )


      })
    let handleClick = () => {
      //this.clickMenu(item.id);
      alert('hi')
    };

    var systemList = this.state.tmpsystemViewList
      .filter(function (view) { return view.viewName })
      .map(function (view) {
        return React.createElement('tr', { type: "tr", key: view.viewName, className: "saved-list-view-row" },

          React.createElement('td', { type: "td", className: "saved-list-view-option", style: { width: "100%" } },
            React.createElement('span', { type: "span", key: view.id, style: { cursor: "pointer" } }, view.viewName)),

          React.createElement('td', { type: "td" },
            React.createElement('input', { type: "checkbox", style: { cursor: "pointer" } })),

          React.createElement('td', { type: "td", className: "saved-list-view-actions" },
            React.createElement('span', { style: { marginRight: "7px" } }),
            React.createElement('a', { className: "fa fa-save tag-icon-xs", style: { display: "none", cursor: "pointer", marginRight: "7px" } }),
            React.createElement('a', { className: "fa fa-trash tag-icon-xs", style: { cursor: "pointer" } }))

        )


      })

    const saveView =
      React.createElement("div", {
        style: { float: "right" },
      }, React.createElement("div", {
        id: "ChoosedView",
        style: { paddingLeft: "3px" }
      }, React.createElement("div", {
        id: "dvChoosedView",
        className: "dvChoosedView ember-power-select-trigger saved-list-view-trigger",
        "data-toggle": "dropdown"
      },
        React.createElement("span", {
          id: "spChoosedView",
          type: "span",
          className: "ember-power-select-selected-item",

        }, this.state.displayChoosedView),
        React.createElement("span", {
          type: "span",
          style: { lineHeight: "24px", marginLeft: "1.3em" },
          className: "fa fa-caret-down fa-lg pull-right"
        }, "")),

        React.createElement("div", {
          style: { left: "0" },
          id: "savedview",
          className: "savedview dropdown-menu saved-list-view-dropdown ember-power-select-dropdown"
        }, React.createElement("div", {
          style: { float: "left" }
        }, React.createElement("div", {
          className: "dv-padding"
        },
          React.createElement("input", {
            // type: "text",
            //value: this.state.viewName,
            placeholder: "Save current view as...",
            className: "txtview form-control ember-power-select-search-input ember-text-field ember-view"
          }),
          React.createElement("input", {
            type: "checkbox",
          }),
          React.createElement("button", {
            type: "button",
            className: "btn btn-primary",
            style: { height: "34px", marginLeft: "10px" }

          },
            React.createElement("i", {
              className: "fa fa-save"
            }, "Add"))),

          React.createElement("table", {
            type: "table"
          },
            React.createElement("tbody", {
              type: "tbody"
            },
              React.createElement("tr", {
                className: "saved-list-view-row"
              }, React.createElement("td", {
                className: "dv-padding saved-list-view-option",
                colSpan: "2"
              },

                React.createElement("a", {
                  onClick: this.getDefaultState,
                  style: { cursor: "pointer" }
                }, "Clear Columns and Filters"
                ))),

              React.createElement("tr", {
                className: "view-type"
              },
                React.createElement("td", {
                  style: { paddingRight: "15px" },
                  colSpan: "2"
                },
                  React.createElement("span", {}, "private"),
                  React.createElement("input", { type: "checkbox", checked: this.state.myPrivateViewType, onChange: this.onPrivateViewChange }),

                  React.createElement("span", {}, "System"),
                  React.createElement("input", { type: "checkbox", checked: this.state.systemViewType, onChange: this.onSystemViewChange }),
                )),


              React.createElement("tr", {

              }, React.createElement("td", {
                className: "dv-padding",
                style: { paddingTop: "5px", paddingBottom: "7px" }
              },
                React.createElement("input", {
                  type: "text",
                  className: "txtview form-control ember-power-select-search-input ember-text-field ember-view",
                  style: { float: "left" },
                  placeholder: "Search..."
                }))),

              privateListType,
              React.createElement('tr', { type: "tr" },
                React.createElement('td', { type: "td", style: { paddingLeft: "25px" } },
                  React.createElement('table', { type: "table" },
                    React.createElement('tbody', { type: "tbody" },
                      privateList)))),

              systemListType,
              React.createElement('tr', { type: "tr" },
                React.createElement('td', { type: "td", style: { paddingLeft: "25px" } },
                  React.createElement('table', { type: "table" },
                    React.createElement('tbody', { type: "tbody" },

                      // React.createElement('tr', { type: "tr",className: "saved-list-view-row" },

                      // React.createElement('td', { type: "td", className: "saved-list-view-option",style:{width:"100%"}  },
                      // React.createElement('span', {  type: "span",onClick:this.restoreState, style: { cursor: "pointer" } }, "fire")
                      // )),

                      React.createElement('tr', { type: "tr", className: "saved-list-view-row" },

                        React.createElement('td', { type: "td", className: "saved-list-view-option", style: { width: "100%" } },
                          React.createElement('a', { onClick: this.restoreState0, value: 0, key: 0, style: { cursor: "pointer" } }, "18K")),

                        React.createElement('td', { type: "td" },
                          React.createElement('input', { type: "checkbox", style: { cursor: "pointer" } })),

                        React.createElement('td', { type: "td", className: "saved-list-view-actions" },
                          React.createElement('span', { style: { marginRight: "7px" } }),
                          React.createElement('a', { className: "fa fa-save tag-icon-xs", style: { display: "none", cursor: "pointer", marginRight: "7px" } }),
                          React.createElement('a', { className: "fa fa-trash tag-icon-xs", style: { cursor: "pointer" } }))

                      ),
                      React.createElement('tr', { type: "tr", className: "saved-list-view-row" },

                        React.createElement('td', { type: "td", className: "saved-list-view-option", style: { width: "100%" } },
                          React.createElement('a', { onClick: this.restoreState1, value: 1, key: 1, style: { cursor: "pointer" } }, "200K")),

                        React.createElement('td', { type: "td" },
                          React.createElement('input', { type: "checkbox", style: { cursor: "pointer" } })),

                        React.createElement('td', { type: "td", className: "saved-list-view-actions" },
                          React.createElement('span', { style: { marginRight: "7px" } }),
                          React.createElement('a', { className: "fa fa-save tag-icon-xs", style: { display: "none", cursor: "pointer", marginRight: "7px" } }),
                          React.createElement('a', { className: "fa fa-trash tag-icon-xs", style: { cursor: "pointer" } }))

                      )
                    ))))
              // systemList))))         

            ))))))

    const imgUpdateProgress =
      React.createElement("div", {
        id: "updateProgress",
        style: { display: 'none' },
        role: "status",
        "aria-hidden": "true"
      }, React.createElement("div", {
        className: "updateProgress"
      },
        React.createElement("img", {
          id: "imgUpdateProgress",
          title: "Loading ...",
          src: this.state.appurl + "loader.gif",
          alt: "Loading ...",
          className: "imgUpdateProgress"
        })));

    const headercontainer =
      React.createElement("div", {
        id: "headercontainer",
        className: "headercontainer"
      }, React.createElement("div", {
        className: "logo"
      }, React.createElement("img", {
        style: { height: '48px' },
        //src: "{{siteurl}}assets/medialogo.jpg"
      }), " "), React.createElement("div", {
        style: { float: 'right', marginRight: '30px', paddingTop: '10px', display: 'none' }
      }, React.createElement("button", {
        type: "button",
        click: "logout()",
        className: "btn btn-primary px-4 button-round-corners button-width"
      }, "Switch Foundation")))

    const toogleicon =
      React.createElement("div", { style: { display: 'none' } },
        React.createElement("div",
          {
            id: "valueToggle"
          },
          React.createElement("span", {
            id: "spnvalueToggle",
            type: "span",
            className: "ag-icon ag-icon-tree-open toggle",
            onClick: this.valueToggle
          }, ""),
          React.createElement("span", { className: "ag-icon ag-icon-aggregation ag-column-drop-icon spnag-column-drop-icon" }),
          React.createElement("span", { className: "ag-column-drop-title" }, "Values")),

        React.createElement("div",
          {
            id: "rowGroupToggle"
          },
          React.createElement("span", {
            id: "spnrowGroupToggle",
            type: "span",
            className: "ag-icon ag-icon-tree-open toggle",
            onClick: this.rowGroupToggle
          }, ""),
          React.createElement("span", { className: "ag-icon ag-icon-group ag-column-drop-icon spnag-column-drop-icon" }),
          React.createElement("span", { className: "ag-column-drop-title" }, "Row Groups")),

        React.createElement("div",
          {
            id: "colGroupToggle"
          },
          React.createElement("span", {
            id: "spncolGroupToggle",
            type: "span",
            className: "ag-icon ag-icon-tree-open toggle",
            onClick: this.colGroupToggle
          }, ""),
          React.createElement("span", { className: "ag-icon ag-icon-pivot ag-column-drop-icon spnag-column-drop-icon" }),
          React.createElement("span", { className: "ag-column-drop-title" }, "Column Labels"))
      )

    const filtercontainer =
      React.createElement("div", {
        id: "filtercontainer",
        className: "filtercontainer  ui-inputtext"
      }, React.createElement("div", {
        className: "card"
      }, React.createElement("div", {
        className: "card-header",
        id: "headingOne"
      }, React.createElement("div", {
        className: "grid-filter"
      }, React.createElement("ul", {
        id: "ember264",
        //className: "list-inline remove-style applied-filters ember-view",
        className: "list-inline remove-style ember-view",
        style: { marginBottom: '0px' }
      }, React.createElement("div", null, React.createElement("li", {
        className: "payment-date"
      },

        React.createElement("div", {
          style: { display: 'flex' }
        },

          saveView,

          React.createElement("div", {
            style: { marginLeft: '10px' }
          }, React.createElement("button", {
            tooltip: "Click apply to update the available data.",
            options: "toptooltipOptions",
            id: "btnapply",
            type: "button",
            className: "btn btn-primary button-round-corners button-width",
            onClick: this.applyFilter
          }, "Apply"),
            toogleicon
          ))))


      ))
        //,saveView
      )))

    const toggle =
      React.createElement("div", {
        id: "toggle",
        className: "toggle",
        style: { display: 'none' }
      }, "Filter")

    const tagContainer = React.createElement("div", {
      id: "tagContainer",
      className: "applied-box search-panel collapse show in",
      "aria-labelledby": "headingOne"
    }, React.createElement("div", {
      className: "filtercontent"
    }, React.createElement("ul", {
      id: "ember264",
      className: "list-inline remove-style applied-filters ember-view",
      style: { marginBottom: '0px' }
    }, React.createElement("div", {
      id: "divappliedFilter"
    }))))

    const myGrid =
      React.createElement(AgGridReact, {
        className: "row content myGrid ag-theme-balham showLoader",
        gridOptions: this.state.gridOptions,
        columnDefs: this.state.columnDefs,
        rowData: this.state.rowData
      })

    return React.createElement("div", null, imgUpdateProgress,
      React.createElement("div", {
        className: "box ag-theme-balham",
        style: {
          height: "100vh"
        }
      }, React.createElement("div", {
        className: "gridcontainer row header",
        "layout-xs": "column",
        layout: "row",
        style: { height: 'auto' }
      },
        headercontainer,
        filtercontainer,
        toggle,
        tagContainer
      ),
        myGrid
      ))
  }

}

export default View;
