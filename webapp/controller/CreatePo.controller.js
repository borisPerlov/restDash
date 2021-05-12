sap.ui.define([
    "sap/suite/ui/commons/demo/tutorial/controller/BaseController",
    "sap/suite/ui/commons/demo/tutorial/model/models",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageBox",
], function (
    Controller,
    models,
    JSONModel,
    Filter,
    FilterOperator,
    MessageBox
) {
    "use strict";

    return Controller.extend("sap.suite.ui.commons.demo.tutorial.controller.CreatePo", {

        onInit: function () {
            this.getRouter().getRoute("createPo").attachPatternMatched(this._onRoutePoCreated, this);

            this.getView().setModel(this.mainViewModel(), "createPoView");


        },

        onStorageSelected: function () {
            debugger;
            var oWizard = this.getView().byId("CreatePoWizard");

            //next step
            oWizard.nextStep();

            //


        },

        onSearchProducts: function (oEvent) {
            debugger;
            // build filter array
            var aFilter = [];
            var sQuery = oEvent.getParameter("newValue");
            if (sQuery) {
                // aFilter.push(new Filter("Description", FilterOperator.Contains, sQuery));
                // aFilter.push(new Filter("SupplierName", FilterOperator.Contains, sQuery));

                aFilter = new Filter({
                    filters: [

                        new Filter({
                            path: 'Description',
                            operator: FilterOperator.Contains,
                            value1: sQuery
                        }),
                        new Filter({
                            path: 'SupplierName',
                            operator: FilterOperator.Contains,
                            value1: sQuery
                        })

                    ],
                    and: false
                });
            }

            // filter binding
            var oList = this.byId("products");
            var oBinding = oList.getBinding("items");
            oBinding.filter(aFilter);
        },




        getMainViewObject: function () {
            var oEntry = {
                storageKey: "",
                bSelected: false,
                ProductCollection: [
                    { MATNR: "1000000", Category: "Laptops", SupplierName: "די.סי. פאק", Description: "הפוך גדול", MEINS: "EA", Vendor: "0000000001" },

                    { MATNR: "1000001", Category: "Laptops", SupplierName: "די.סי. פאק", Description: "הפוך קטן", MEINS: "EA", Vendor: "0000000001" },
                    { MATNR: "1000002", Category: "Laptops", SupplierName: "די.סי. פאק", Description: "אספרסו", MEINS: "EA", Vendor: "0000000001" },
                    { MATNR: "1000003", Category: "Laptops", SupplierName: "רונן", Description: "צלחות זכוכות קטן", MEINS: "EA", Vendor: "0000000002" },
                    { MATNR: "1000004", Category: "Accessories", SupplierName: "רונן", Description: "צלחות זכוכות גדול", MEINS: "EA", Vendor: "0000000002" },
                    { MATNR: "1000005", Category: "Accessories", SupplierName: "דפוס מאי", Description: "תחתית המבורגר", MEINS: "EA", Vendor: "0000000003" },
                    { MATNR: "1000006", Category: "Laptops", SupplierName: "דפוס מאי", Description: "מכסה המבורגר", MEINS: "EA", Vendor: "0000000003" },
                    { MATNR: "1000007", Category: "Accessories", SupplierName: "דפוס מאי", Description: "מארז שניצל", MEINS: "EA", Vendor: "0000000003" },
                    { MATNR: "1000008", Category: "Accessories", SupplierName: "רונן", Description: "קוקוטים", MEINS: "EA", Vendor: "0000000002" },
                    { MATNR: "1000009", Category: "Accessories", SupplierName: "רונן", Description: "קוקוטים קטנים ", MEINS: "EA", Vendor: "0000000002" },
                    { MATNR: "1000010", Category: "Accessories", SupplierName: "רונן", Description: "בוחשני עץ 1", MEINS: "EA", Vendor: "0000000002" },

                ],
                StorageLocationList: [{
                    storageKey: "0010", storageDescription: "אריזות טק אווי",
                }, {
                    storageKey: "0020", storageDescription: "רשפון",
                }],



            };

            return oEntry;
        },

        onSelectedItems: function (bSelected) {

            var aFilter = [];

            if (bSelected) {
                aFilter.push(new Filter("isTouched", FilterOperator.EQ, bSelected));
            }

            // filter binding
            var oList = this.byId("products");
            var oBinding = oList.getBinding("items");
            oBinding.filter(aFilter);
        },

        inputQuant: function (oEvent, sType) {

            var oRowData = oEvent.getSource().getBindingContext("createPoView").getObject();
            var iCurrentQuant = oRowData.quantity;

            if (iCurrentQuant > 0 && sType === "minus") {
                iCurrentQuant = iCurrentQuant - 1;
            } else if (sType === "add") {
                iCurrentQuant = iCurrentQuant + 1;
            }

            oRowData.quantity = iCurrentQuant;

            //touched row
            if (iCurrentQuant > 0) {
                oRowData.isTouched = true;
            } else {
                oRowData.isTouched = false;
            }

            //refresh model

            this.getView().getModel("createPoView").refresh();
        },


        mainViewModel: function () {

            var oEntry = this.getMainViewObject();

            for (var i = 0; i < oEntry.ProductCollection.length; i++) {
                oEntry.ProductCollection[i].quantity = 0;
            }

            return new JSONModel(oEntry);
        },

        _checkError: function (aMessages) {

            var bError = false;

            for (var i = 0; i < aMessages.length; i++) {

                if (aMessages[i].type === "E") {
                    bError = true;
                    break;
                }

            }

            return bError;
        },

        onCreatePo: function () {

            var oPoViewData = this.getView().getModel("createPoView").getData();
            var oEntry = this.prepareCreatePoEntry(oPoViewData);
            var that = this;
            var oComponent = this.getOwnerComponent();
            var i18n = oComponent.getModel("i18n");
            models.createPo(oEntry).then(function (data) {

                var bError = that._checkError(data.aReturn);

                if (bError) {
                    alert("errors exist");
                } else {

                    debugger;
                    var msg = i18n.getProperty("poCreated") + "\n";

                    for (var i = 0; i < data.aReturn.length; i++) {
                        msg = msg + data.aReturn[i].message + "\n";
                    }

                    MessageBox.success(
                        msg,
                        {
                            actions: [sap.m.MessageBox.Action.OK],

                            onClose: function (sAction) {


                                that.getRouter().navTo("home", {}, true /*no history*/);
                            }
                        }
                    );




                }

            })["catch"](function () {

                alert("create Po is failed");

            });
        },

        prepareCreatePoEntry: function (oPoViewData) {


            var oEntry = {

            };

            //header

            oEntry.header = {
                "MANDT": "dev",
                "CLIENT": "001"
            }


            //items

            oEntry.items = [];
            for (var i = 0; i < oPoViewData.ProductCollection.length; i++) {
                if (oPoViewData.ProductCollection[i].quantity) {
                    oEntry.items.push({
                        MANDT: "dev",
                        CLIENT: "001",
                        MATNR: oPoViewData.ProductCollection[i].MATNR,
                        TXZ01: oPoViewData.ProductCollection[i].Description,
                        LGORT: oPoViewData.storageKey,
                        MENGE: oPoViewData.ProductCollection[i].quantity,
                        MEINS: oPoViewData.ProductCollection[i].MEINS,
                        VENDOR: oPoViewData.ProductCollection[i].Vendor,
                    });
                }

            }

            return oEntry;
        },

        _onRoutePoCreated: function () {
            debugger;

            this.getView().setModel(this.mainViewModel(), "createPoView"); // clear model
        },


    });
});