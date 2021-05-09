sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function (JSONModel, Device) {
	"use strict";

	return {

		createDeviceModel: function () {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},



		createPoHeader: function(oEntry){
									

		 var serviceUrl = "http://localhost:3000/" + 'po_header';							
									
			return new Promise(function (resolve) {
				$.ajax({
					type: "POST",
					method: "POST",
					timeout: 5000000,
					url: serviceUrl,
					processData: true,
					data: oEntry,



					success: function (data) {
						debugger;

						
					},

					error: function (error) {
						alert("po header promise is failed");
					}
				});
			});
									
								},
	};
});