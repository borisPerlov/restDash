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



<<<<<<< HEAD
=======
		createPo: function (oEntry) {


			var serviceUrl = "http://localhost:3000/" + 'po';

			return new Promise(function (resolve) {
				$.ajax({
					type: "POST",
					method: "POST",
					timeout: 5000000,
					url: serviceUrl,
					processData: true,
					data: oEntry,
					contentType: 'application/x-www-form-urlencoded; charset=UTF-8',



					success: function (data) {


						resolve(data);
					},

					error: function (error) {
						alert("po header promise is failed");
					}
				});
			});

		},
>>>>>>> ea69f291a83c1bc956d4089761aadb11a40301d8
	};
});