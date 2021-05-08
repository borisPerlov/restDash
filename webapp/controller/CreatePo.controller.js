sap.ui.define([
    "sap/suite/ui/commons/demo/tutorial/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
], function (
    Controller,
    JSONModel,
    Filter,
    FilterOperator
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
                aFilter.push(new Filter("Description", FilterOperator.Contains, sQuery));
                aFilter.push(new Filter("SupplierName", FilterOperator.Contains, sQuery));
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
                    { ProductId: "1000000", Category: "Laptops", SupplierName: "די.סי. פאק", Description: "הפוך גדול", },

                    { ProductId: "1000001", Category: "Laptops", SupplierName: "די.סי. פאק", Description: "הפוך קטן" },
                    { ProductId: "1000002", Category: "Laptops", SupplierName: "די.סי. פאק", Description: "אספרסו" },
                    { ProductId: "1000003", Category: "Laptops", SupplierName: "רונן", Description: "צלחות זכוכות קטן" },
                    { ProductId: "1000004", Category: "Accessories", SupplierName: "רונן", Description: "צלחות זכוכות גדול" },
                    { ProductId: "1000005", Category: "Accessories", SupplierName: "דפוס מאי", Description: "תחתית המבורגר" },
                    { ProductId: "1000006", Category: "Laptops", SupplierName: "דפוס מאי", Description: "מכסה המבורגר" },
                    { ProductId: "1000007", Category: "Accessories", SupplierName: "דפוס מאי", Description: "מארז שניצל" },
                    { ProductId: "1000008", Category: "Accessories", SupplierName: "רונן", Description: "קוקוטים" },
                    { ProductId: "1000009", Category: "Accessories", SupplierName: "רונן", Description: "קוקוטים קטנים " },
                    { ProductId: "1000010", Category: "Accessories", SupplierName: "רונן", Description: "בוחשני עץ 1" },

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

            debugger;
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
            debugger;
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

        onCreatePo : function (){
            
        },

        _onRoutePoCreated: function () {
            debugger;

            this.getView().setModel(this.mainViewModel(), "createPoView"); // clear model
        },


    });
});