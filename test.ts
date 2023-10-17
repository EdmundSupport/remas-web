const example2 = {
  "uuid": "11bafe9e-11b0-48d7-a867-f27dd9eb942c",
  "number": "0",
  "dateStartScheduled": "2023-10-17T00:50:11.553Z",
  "dateEndScheduled": "2023-10-17T00:50:11.553Z",
  "dateStart": "2023-10-17T00:50:11.553Z",
  "dateEnd": "2023-10-17T00:50:11.553Z",
  "userUuid": "9bc38dd5-3b8e-4b82-be86-3c8564c842d0",
  "maintenanceStatusUuid": "a486b514-42e6-47e9-843a-9756ddc62672",
  "productUuid": "f1a114cd-bb82-45b8-b999-0da095243b12",
  "condition": true,
  "createdAt": "2023-10-17T02:09:21.181Z",
  "updatedAt": "2023-10-17T02:09:21.181Z",
  "maintenanceSteps": [
    {
      "uuid": "a0cefd37-7319-4d3d-882c-e4fc1ad70b77",
      "maintenanceUuid": "11bafe9e-11b0-48d7-a867-f27dd9eb942c",
      "productMaintenanceStepUuid": "dba57362-4098-4aa2-b2c7-7915c37b1b28",
      "condition": true,
      "createdAt": "2023-10-17T02:09:21.194Z",
      "updatedAt": "2023-10-17T02:09:21.194Z",
      "maintenanceStepDetails": [
        {
          "uuid": "7a8217ec-7245-40c2-bf3e-4dedb6d5c916",
          "amount": "22.0000000000",
          "price": "33.00",
          "maintenanceStepUuid": "a0cefd37-7319-4d3d-882c-e4fc1ad70b77",
          "productMaintenanceStepD": "c61f4fa1-b386-4db0-ab46-c320cfbd97c5",
          "measureUnitUuid": "d703d6eb-6b4a-4ef8-897b-3303e9523741",
          "condition": true,
          "createdAt": "2023-10-17T02:09:21.201Z",
          "updatedAt": "2023-10-17T02:09:21.201Z"
        }
      ]
    },
    {
      "uuid": "6c275363-e7db-45b7-a6f0-5cac853855df",
      "maintenanceUuid": "11bafe9e-11b0-48d7-a867-f27dd9eb942c",
      "productMaintenanceStepUuid": "b7367d82-a4f4-4f51-92ff-232144689c35",
      "condition": true,
      "createdAt": "2023-10-17T02:09:21.198Z",
      "updatedAt": "2023-10-17T02:09:21.198Z",
      "maintenanceStepDetails": []
    }
  ]
};

const example = {
  "uuid": "new",
  "number": "",
  "dateStartScheduled": "2023-10-17T00:50:11.553Z",
  "dateEndScheduled": "2023-10-17T00:50:11.553Z",
  "dateStart": "2023-10-17T00:50:11.553Z",
  "dateEnd": "2023-10-17T00:50:11.553Z",
  "userUuid": "",
  "productUuid": "f1a114cd-bb82-45b8-b999-0da095243b12",
  "product": {
    "uuid": "f1a114cd-bb82-45b8-b999-0da095243b12",
    "sku": "COCOUN8856NN",
    "name": "Unico",
    "description": "Unico y generico.",
    "parentUuid": null,
    "measureUuid": "49929867-21a8-4685-8519-b6eab3822a1e",
    "productTypeUuid": "508d4ecf-99ee-455f-8a31-91cf7bac0e7d",
    "condition": true,
    "createdAt": "2023-10-09T10:06:17.523Z",
    "updatedAt": "2023-10-09T10:06:17.523Z",
    "productMaintenanceSteps": [
      {
        "uuid": "dba57362-4098-4aa2-b2c7-7915c37b1b28",
        "order": "1",
        "description": "Prueba",
        "productUuid": "f1a114cd-bb82-45b8-b999-0da095243b12",
        "condition": true,
        "createdAt": "2023-10-15T19:54:38.176Z",
        "updatedAt": "2023-10-15T19:54:38.176Z",
        "productMaintenanceStepDetails": [
          {
            "uuid": "c61f4fa1-b386-4db0-ab46-c320cfbd97c5",
            "amount": "50.0000000000",
            "price": "30.00",
            "productMaintenanceStepUuid": "dba57362-4098-4aa2-b2c7-7915c37b1b28",
            "productUuid": "f1a114cd-bb82-45b8-b999-0da095243b12",
            "measureUnitUuid": "d703d6eb-6b4a-4ef8-897b-3303e9523741",
            "condition": true,
            "createdAt": "2023-10-15T20:45:11.425Z",
            "updatedAt": "2023-10-15T20:45:11.425Z",
            "maintenanceStepDetails": [
              {
                "productMaintenanceStepDetailUuid": "c61f4fa1-b386-4db0-ab46-c320cfbd97c5",
                "measureUnitUuid": "d703d6eb-6b4a-4ef8-897b-3303e9523741",
                "amount": 22,
                "price": 33
              }
            ],
            "product": {
              "uuid": "f1a114cd-bb82-45b8-b999-0da095243b12",
              "sku": "COCOUN8856NN",
              "name": "Unico",
              "description": "Unico y generico.",
              "parentUuid": null,
              "measureUuid": "49929867-21a8-4685-8519-b6eab3822a1e",
              "productTypeUuid": "508d4ecf-99ee-455f-8a31-91cf7bac0e7d",
              "condition": true,
              "createdAt": "2023-10-09T10:06:17.523Z",
              "updatedAt": "2023-10-09T10:06:17.523Z",
              "productMaintenanceSteps": [
                {
                  "uuid": "dba57362-4098-4aa2-b2c7-7915c37b1b28",
                  "order": "1",
                  "description": "Prueba",
                  "productUuid": "f1a114cd-bb82-45b8-b999-0da095243b12",
                  "condition": true,
                  "createdAt": "2023-10-15T19:54:38.176Z",
                  "updatedAt": "2023-10-15T19:54:38.176Z",
                  "productMaintenanceStepDetails": [
                    {
                      "uuid": "c61f4fa1-b386-4db0-ab46-c320cfbd97c5",
                      "amount": "50.0000000000",
                      "price": "30.00",
                      "productMaintenanceStepUuid": "dba57362-4098-4aa2-b2c7-7915c37b1b28",
                      "productUuid": "f1a114cd-bb82-45b8-b999-0da095243b12",
                      "measureUnitUuid": "d703d6eb-6b4a-4ef8-897b-3303e9523741",
                      "condition": true,
                      "createdAt": "2023-10-15T20:45:11.425Z",
                      "updatedAt": "2023-10-15T20:45:11.425Z"
                    }
                  ]
                },
                {
                  "uuid": "b7367d82-a4f4-4f51-92ff-232144689c35",
                  "order": "2",
                  "description": "Prueba",
                  "productUuid": "f1a114cd-bb82-45b8-b999-0da095243b12",
                  "condition": true,
                  "createdAt": "2023-10-15T19:54:50.764Z",
                  "updatedAt": "2023-10-15T19:54:50.764Z",
                  "productMaintenanceStepDetails": []
                }
              ]
            },
            "measureUnit": {
              "uuid": "d703d6eb-6b4a-4ef8-897b-3303e9523741",
              "keyName": "unique",
              "name": "Unica",
              "factorConversion": "1.0000000000",
              "parentUuid": null,
              "measureUuid": "49929867-21a8-4685-8519-b6eab3822a1e",
              "condition": true,
              "createdAt": "2023-10-09T09:54:41.834Z",
              "updatedAt": "2023-10-09T09:54:41.834Z"
            }
          }
        ]
      },
      {
        "uuid": "b7367d82-a4f4-4f51-92ff-232144689c35",
        "order": "2",
        "description": "Prueba",
        "productUuid": "f1a114cd-bb82-45b8-b999-0da095243b12",
        "condition": true,
        "createdAt": "2023-10-15T19:54:50.764Z",
        "updatedAt": "2023-10-15T19:54:50.764Z",
        "productMaintenanceStepDetails": []
      }
    ]
  },
  "maintenanceStatusUuid": "",
  "maintenanceSteps": []
};

example.maintenanceSteps = example.product.productMaintenanceSteps.map((productMaintenanceStep) => {
  const maintenanceStep = {};
  maintenanceStep['productMaintenanceStepUuid'] = productMaintenanceStep.uuid;
  maintenanceStep['maintenanceStepDetails'] = productMaintenanceStep.productMaintenanceStepDetails.map((productMaintenanceStepDetail) => {
    console.log("🚀 ~ file: test.ts:131 ~ maintenanceStep['maintenanceStepDetails']=productMaintenanceStep.productMaintenanceStepDetails.map ~ productMaintenanceStepDetail:", productMaintenanceStepDetail)
    return productMaintenanceStepDetail.maintenanceStepDetails;
  }).flat();
  return maintenanceStep;
});

delete example.product;

console.log("🚀 ~ file: test.ts:136 ~ example:", JSON.stringify(example))
console.log("🚀 ~ file: test.ts:136 ~ maintenanceSteps:", example.maintenanceSteps)
console.log("🚀 ~ file: test.ts:136 ~ maintenanceSteps:", example.maintenanceSteps[0])
