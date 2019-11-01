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
    const gridData = await apiCall('GetGridViewData?data='+param).then(res => { return res });// Get Ag-Grid data from API
    return  JSON.parse(gridData);
  }

  async applyFilter() {  //Set RowData of Ag-Grid
    this.showLoader();
    console.log(this.state.recordCount)
    const respGridData = await this.getGridData(this.state.recordCount);
    this.state.gridOptions.api.setRowData(respGridData)
    this.hideLoader();
  }

  handleChange(e) {
    this.setState({ recordCount: e.target.value });
  }

  constructor(props) {
    super(props);
    this.applyFilter = this.applyFilter.bind(this);
    this.handleChange = this.handleChange.bind(this);
    
    this.state = {
      columnDefs: [],
      rowData: [],
      gridOptions: gridOptionsProp(),
      error: null,
      recordCount: 0,
      appurl: url.appurl
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
    $('.ag-column-drop-row-group').each(function () {// ag-column-drop-values
      $(this).insertAfter($(this).parent().find('.ag-column-select-panel'));
    })
    $('.ag-pivot-mode-panel').each(function () {
      $(this).insertAfter($('.ag-column-drop-values'));
    })
    //this.placeToolTip()
  }
  render() {
    return React.createElement("div", null, React.createElement("div", {
      id: "updateProgress",
      style: { display: 'none' },
      role: "status",
      "aria-hidden": "true"
    }, React.createElement("div", {
      className: "updateProgress"
    }, React.createElement("img", {
      id: "imgUpdateProgress",
      title: "Loading ...",
      src:this.state.appurl + "loader.gif",
      alt: "Loading ...",
      className: "imgUpdateProgress"
    }))), React.createElement("div", {
      className: "box ag-theme-balham"
    }, React.createElement("div", {
      className: "gridcontainer row header",
      "layout-xs": "column",
      layout: "row",
      style: { height: 'auto' }
    }, React.createElement("div", {
      id: "headercontainer",
      className: "headercontainer"
    }, React.createElement("div", {
      className: "logo"
    }, React.createElement("img", {
      style: { height: '48px' },
      //src: "{{siteurl}}assets/medialogo.jpg"
    }), " "), React.createElement("div", {
      style: { float: 'right', marginRight: '30px', paddingtop: '10px', display: 'none' }
    }, React.createElement("button", {
      type: "button",
      click: "logout()",
      className: "btn btn-primary px-4 button-round-corners button-width"
    }, "Switch Foundation"))), React.createElement("div", {
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
      className: "list-inline remove-style applied-filters ember-view",
      style: { marginBottom: '0px' }
    }, React.createElement("div", null, React.createElement("li", {
      className: "payment-date"
    }, React.createElement("div", {
      style: { display: 'flex' }
    }, React.createElement("span", {
      style: { display: 'flex', marginTop: '7px' }
    }, "Records #:"), React.createElement("div", {
      id: "reportrange"
    }, React.createElement("select", {
      value:this.state.recordCount ,
      onChange:this.handleChange,
      id: "drillDown",
      // ngModel: "selectedRecords",
      style: { width: '88px', height: '30px' }
    }, React.createElement("option", {
      value: "0"
    }, "18k"), React.createElement("option", {
      value: "1"
    }, "200k"))), React.createElement("div", {
      style: { marginLeft: '10px' }
    }, React.createElement("button", {
      tooltip: "Click apply to update the available data.",
      options: "toptooltipOptions",
      id: "btnapply",
      type: "button",
      className: "btn btn-primary button-round-corners button-width",
      onClick: this.applyFilter
    }, "Apply")))))))))), React.createElement("div", {
      id: "toggle",
      className: "toggle",
      style: { display: 'none' }
    }, "Filter"), React.createElement("div", {
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
    }))))),
      React.createElement(AgGridReact, {
        className: "row content myGrid ag-theme-balham showLoader",
        gridOptions: this.state.gridOptions,
        columnDefs: this.state.columnDefs,
        rowData: this.state.rowData
      })))
  }
}

export default View;
