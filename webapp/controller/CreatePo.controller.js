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
                    { ProductId: "HT-1000", Category: "Laptops", MainCategory: "Computer Systems", TaxTarifCode: "1", Description: "HT-1000" ,SupplierName :  ""},

                    { ProductId: "HT-1001", Category: "Laptops", MainCategory: "Computer Systems", TaxTarifCode: "1", Description: "HT-1001" },
                    { ProductId: "HT-1002", Category: "Laptops", MainCategory: "Computer Systems", TaxTarifCode: "1", Description: "HT-1002" },
                    { ProductId: "HT-1003", Category: "Laptops", MainCategory: "Computer Systems", TaxTarifCode: "1", Description: "HT-1003" },
                    { ProductId: "HT-1007", Category: "Accessories", MainCategory: "Computer Components", TaxTarifCode: "1", Description: "HT-1004" },
                    { ProductId: "HT-1010", Category: "Accessories", MainCategory: "Computer Systems", TaxTarifCode: "1", Description: "HT-1005" },
                    { ProductId: "HT-1011", Category: "Laptops", MainCategory: "Computer Systems", TaxTarifCode: "1", Description: "HT-1006" },
                    { ProductId: "HT-1020", Category: "Accessories", MainCategory: "Computer Components", TaxTarifCode: "1", Description: "HT-1010" },
                    { ProductId: "HT-1021", Category: "Accessories", MainCategory: "Computer Components", TaxTarifCode: "1", Description: "HT-1011" },
                    { ProductId: "HT-1022", Category: "Accessories", MainCategory: "Computer Components", TaxTarifCode: "1", Description: "HT-1012" },
                    { ProductId: "HT-1023", Category: "Accessories", MainCategory: "Computer Components", TaxTarifCode: "1", Description: "HT-1013" },
                    { ProductId: "HT-1030", Category: "Flat Screen Monitors", MainCategory: "Computer Components", Description: "HT-1014" },
                    { ProductId: "HT-1031", Category: "Flat Screen Monitors", MainCategory: "Computer Components", Description: "HT-1015" },
                    { ProductId: "HT-1032", Category: "Flat Screen Monitors", MainCategory: "Computer Components", Description: "HT-1016" },
                    { ProductId: "HT-1035", Category: "Flat Screen Monitors", MainCategory: "Computer Components", Description: "HT-1017" },
                    { ProductId: "HT-1036", Category: "Flat Screen Monitors", MainCategory: "Computer Components", Description: "HT-1018" },
                    { ProductId: "HT-1037", Category: "Flat Screen Monitors", MainCategory: "Computer Components", Description: "HT-1019" },
                    { ProductId: "HT-1040", Category: "Printers", MainCategory: "Printers & Scanners", TaxTarifCode: "1", Description: "HT-1020" },
                    { ProductId: "HT-1041", Category: "Printers", MainCategory: "Printers & Scanners", TaxTarifCode: "1", Description: "HT-1021" },
                    { ProductId: "HT-1042", Category: "Printers", MainCategory: "Printers & Scanners", TaxTarifCode: "1", Description: "HT-1022" },
                    { ProductId: "HT-1050", Category: "Printers", MainCategory: "Printers & Scanners", TaxTarifCode: "1", Description: "HT-1023" },

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