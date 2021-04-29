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

        onSearchProducts: function (oEvent) {
            debugger;
            // build filter array
            var aFilter = [];
            var sQuery = oEvent.getParameter("newValue");
            if (sQuery) {
                aFilter.push(new Filter("Description", FilterOperator.Contains, sQuery));
            }

            // filter binding
            var oList = this.byId("products");
            var oBinding = oList.getBinding("items");
            oBinding.filter(aFilter);
        },




        getMainViewObject: function () {
            var oEntry = {
                storageKey: "",
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


        mainViewModel: function () {
            return new JSONModel(this.getMainViewObject());
        },

        _onRoutePoCreated: function () {
            debugger;
        },
    });
});