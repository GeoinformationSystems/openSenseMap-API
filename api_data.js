define({ "api": [
  {
    "type": "delete",
    "url": "/boxes/:senseBoxId",
    "title": "Delete a senseBox and its measurements",
    "name": "deleteBox",
    "group": "Boxes",
    "version": "0.1.0",
    "filename": "./app.js",
    "groupTitle": "Boxes",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-APIKey",
            "description": "<p>the secret API key which corresponds to the <code>senseBoxId</code> parameter.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "x-APIKey header example:",
          "content": "x-APIKey: 576efef4cb9b9ebe057bf7b4",
          "type": "String"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "403",
            "description": "<p>the request has invalid or missing credentials.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\"code\":\"NotAuthorized\",\"message\":\"ApiKey is invalid or missing\"}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":senseBoxId",
            "description": "<p>the ID of the senseBox you are referring to.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/boxes?date=:date&phenomenon=:phenomenon&format=:format",
    "title": "Get all senseBoxes",
    "description": "<p>With the optional <code>date</code> and <code>phenomenon</code> parameters you can find senseBoxes that have submitted data around that time, +/- 2 hours, or specify two dates separated by a comma.</p>",
    "name": "findAllBoxes",
    "group": "Boxes",
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "date",
            "description": "<p>A date or datetime (UTC) where a station should provide measurements. Use in combination with <code>phenomenon</code>.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phenomenon",
            "description": "<p>A sensor phenomenon (determined by sensor name) such as temperature, humidity or UV intensity. Use in combination with <code>date</code>.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"json\"",
              "\"geojson\""
            ],
            "optional": false,
            "field": "format",
            "defaultValue": "json",
            "description": "<p>the format the sensor data is returned in.</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "https://api.opensensemap.org/boxes"
      },
      {
        "url": "https://api.opensensemap.org/boxes?date=2015-03-07T02:50Z&phenomenon=Temperatur"
      },
      {
        "url": "https://api.opensensemap.org/boxes?date=2015-03-07T02:50Z,2015-04-07T02:50Z&phenomenon=Temperatur"
      }
    ],
    "filename": "./app.js",
    "groupTitle": "Boxes"
  },
  {
    "type": "get",
    "url": "/boxes/:boxId",
    "title": "Get one senseBox",
    "name": "findBox",
    "version": "0.0.1",
    "group": "Boxes",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"json\"",
              "\"geojson\""
            ],
            "optional": false,
            "field": "format",
            "defaultValue": "json",
            "description": "<p>the format the sensor data is returned in.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":senseBoxId",
            "description": "<p>the ID of the senseBox you are referring to.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Example data on success:",
          "content": "{\n  \"_id\": \"5386e44d5f08822009b8b614\",\n  \"name\": \"PHOBOS\",\n  \"boxType\": \"fixed\",\n  \"sensors\": [\n    {\n      \"_id\": \"5386e44d5f08822009b8b615\",\n      \"boxes_id\": \"5386e44d5f08822009b8b614\",\n      \"lastMeasurement\": {\n        \"_id\": \"5388d07f5f08822009b937b7\",\n        \"createdAt\": \"2014-05-30T18:39:59.353Z\",\n        \"updatedAt\": \"2014-05-30T18:39:59.353Z\",\n        \"value\": \"584\",\n        \"sensor_id\": \"5386e44d5f08822009b8b615\",\n      },\n      \"sensorType\": \"GL5528\",\n      \"title\": \"Helligkeit\",\n      \"unit\": \"Pegel\"\n    }\n  ],\n  \"loc\": [\n    {\n      \"_id\": \"5386e44d5f08822009b8b61a\",\n      \"geometry\": {\n        \"coordinates\": [\n          10.54555893642828,\n          49.61361673283691\n        ],\n        \"type\": \"Point\"\n      },\n      \"type\": \"feature\"\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./app.js",
    "groupTitle": "Boxes"
  },
  {
    "type": "get",
    "url": "/boxes/:senseBoxId/script",
    "title": "Download the Arduino script for your senseBox",
    "name": "getScript",
    "group": "Boxes",
    "version": "0.1.0",
    "filename": "./app.js",
    "groupTitle": "Boxes",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-APIKey",
            "description": "<p>the secret API key which corresponds to the <code>senseBoxId</code> parameter.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "x-APIKey header example:",
          "content": "x-APIKey: 576efef4cb9b9ebe057bf7b4",
          "type": "String"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "403",
            "description": "<p>the request has invalid or missing credentials.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\"code\":\"NotAuthorized\",\"message\":\"ApiKey is invalid or missing\"}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":senseBoxId",
            "description": "<p>the ID of the senseBox you are referring to.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/boxes",
    "title": "Post new senseBox",
    "description": "<p>Create a new senseBox.</p>",
    "version": "0.0.1",
    "group": "Boxes",
    "name": "postNewBox",
    "parameter": {
      "fields": {
        "JSON request body": [
          {
            "group": "RequestBody",
            "type": "String",
            "optional": false,
            "field": "firstname",
            "description": "<p>firstname of the user for the senseBox.</p>"
          },
          {
            "group": "RequestBody",
            "type": "String",
            "optional": false,
            "field": "lastname",
            "description": "<p>lastname of the user for the senseBox.</p>"
          },
          {
            "group": "RequestBody",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user for the senseBox.</p>"
          },
          {
            "group": "RequestBody",
            "type": "String",
            "optional": false,
            "field": "orderID",
            "description": "<p>the apiKey of the user for the senseBox.</p>"
          },
          {
            "group": "RequestBody",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>the name of this senseBox.</p>"
          },
          {
            "group": "RequestBody",
            "type": "String",
            "optional": false,
            "field": "grouptag",
            "description": "<p>the grouptag of this senseBox.</p>"
          },
          {
            "group": "RequestBody",
            "type": "String",
            "allowedValues": [
              "\"indoor\"",
              "\"outdoor\""
            ],
            "optional": false,
            "field": "exposure",
            "description": "<p>the exposure of this senseBox.</p>"
          },
          {
            "group": "RequestBody",
            "type": "String",
            "allowedValues": [
              "\"fixed\""
            ],
            "optional": false,
            "field": "boxType",
            "description": "<p>the type of the senseBox. Currently only 'fixed' is supported.</p>"
          },
          {
            "group": "RequestBody",
            "type": "Sensor[]",
            "optional": false,
            "field": "sensors",
            "description": "<p>an array containing the sensors of this senseBox.</p>"
          },
          {
            "group": "RequestBody",
            "type": "Location",
            "optional": false,
            "field": "loc",
            "description": "<p>the location of this senseBox. Must be a GeoJSON Point Feature. (RFC7946)</p>"
          }
        ],
        "A single sensor for the nested Sensor parameter": [
          {
            "group": "Sensor",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>the title of the phenomenon the sensor observes.</p>"
          },
          {
            "group": "Sensor",
            "type": "String",
            "optional": false,
            "field": "unit",
            "description": "<p>the unit of the phenomenon the sensor observes.</p>"
          },
          {
            "group": "Sensor",
            "type": "String",
            "optional": false,
            "field": "sensorType",
            "description": "<p>the type of the sensor.</p>"
          },
          {
            "group": "Sensor",
            "type": "String",
            "optional": false,
            "field": "icon",
            "description": "<p>the visual representation for the openSenseMap of this sensor.</p>"
          }
        ],
        "Settings for a senseBox connected through MQTT": [
          {
            "group": "MqttOption",
            "type": "String",
            "optional": false,
            "field": "url",
            "description": "<p>the url to the mqtt server.</p>"
          },
          {
            "group": "MqttOption",
            "type": "String",
            "optional": false,
            "field": "topic",
            "description": "<p>the topic to subscribe to.</p>"
          },
          {
            "group": "MqttOption",
            "type": "String",
            "allowedValues": [
              "\"json\"",
              "\"csv\""
            ],
            "optional": false,
            "field": "messageFormat",
            "description": "<p>the format the mqtt messages are in.</p>"
          },
          {
            "group": "MqttOption",
            "type": "String",
            "optional": false,
            "field": "decodeOptions",
            "description": "<p>a json encoded string with options for decoding the message. 'jsonPath' for 'json' messageFormat.</p>"
          },
          {
            "group": "MqttOption",
            "type": "String",
            "optional": false,
            "field": "connectionOptions",
            "description": "<p>a json encoded string with options to supply to the mqtt client (https://github.com/mqttjs/MQTT.js#client)</p>"
          }
        ]
      }
    },
    "filename": "./app.js",
    "groupTitle": "Boxes"
  },
  {
    "type": "put",
    "url": "/boxes/:senseBoxId",
    "title": "Update a senseBox: Image and sensor names",
    "description": "<p>Modify the specified senseBox.</p>",
    "parameter": {
      "fields": {
        "JSON request body": [
          {
            "group": "RequestBody",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>the updated description of this senseBox.</p>"
          },
          {
            "group": "RequestBody",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>the updated image of this senseBox encoded as base64 data uri.</p>"
          },
          {
            "group": "RequestBody",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>the name of this senseBox.</p>"
          },
          {
            "group": "RequestBody",
            "type": "String",
            "optional": false,
            "field": "grouptag",
            "description": "<p>the grouptag of this senseBox.</p>"
          },
          {
            "group": "RequestBody",
            "type": "String",
            "allowedValues": [
              "\"indoor\"",
              "\"outdoor\""
            ],
            "optional": false,
            "field": "exposure",
            "description": "<p>the exposure of this senseBox.</p>"
          },
          {
            "group": "RequestBody",
            "type": "String",
            "allowedValues": [
              "\"fixed\""
            ],
            "optional": false,
            "field": "boxType",
            "description": "<p>the type of the senseBox. Currently only 'fixed' is supported.</p>"
          },
          {
            "group": "RequestBody",
            "type": "Sensor[]",
            "optional": false,
            "field": "sensors",
            "description": "<p>an array containing the sensors of this senseBox.</p>"
          },
          {
            "group": "RequestBody",
            "type": "Location",
            "optional": false,
            "field": "loc",
            "description": "<p>the location of this senseBox. Must be a GeoJSON Point Feature. (RFC7946)</p>"
          }
        ],
        "A single sensor for the nested Sensor parameter": [
          {
            "group": "Sensor",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>the title of the phenomenon the sensor observes.</p>"
          },
          {
            "group": "Sensor",
            "type": "String",
            "optional": false,
            "field": "unit",
            "description": "<p>the unit of the phenomenon the sensor observes.</p>"
          },
          {
            "group": "Sensor",
            "type": "String",
            "optional": false,
            "field": "sensorType",
            "description": "<p>the type of the sensor.</p>"
          },
          {
            "group": "Sensor",
            "type": "String",
            "optional": false,
            "field": "icon",
            "description": "<p>the visual representation for the openSenseMap of this sensor.</p>"
          }
        ],
        "Settings for a senseBox connected through MQTT": [
          {
            "group": "MqttOption",
            "type": "String",
            "optional": false,
            "field": "url",
            "description": "<p>the url to the mqtt server.</p>"
          },
          {
            "group": "MqttOption",
            "type": "String",
            "optional": false,
            "field": "topic",
            "description": "<p>the topic to subscribe to.</p>"
          },
          {
            "group": "MqttOption",
            "type": "String",
            "allowedValues": [
              "\"json\"",
              "\"csv\""
            ],
            "optional": false,
            "field": "messageFormat",
            "description": "<p>the format the mqtt messages are in.</p>"
          },
          {
            "group": "MqttOption",
            "type": "String",
            "optional": false,
            "field": "decodeOptions",
            "description": "<p>a json encoded string with options for decoding the message. 'jsonPath' for 'json' messageFormat.</p>"
          },
          {
            "group": "MqttOption",
            "type": "String",
            "optional": false,
            "field": "connectionOptions",
            "description": "<p>a json encoded string with options to supply to the mqtt client (https://github.com/mqttjs/MQTT.js#client)</p>"
          }
        ],
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":senseBoxId",
            "description": "<p>the ID of the senseBox you are referring to.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n \"_id\": \"56e741ff933e450c0fe2f705\",\n \"name\": \"my senseBox\",\n \"description\": \"this is just a description\",\n \"weblink\": \"https://opensensemap.org/explore/561ce8acb3de1fe005d3d7bf\",\n \"grouptag\": \"senseBoxes99\",\n \"exposure\": \"indoor\",\n \"sensors\": [\n   {\n     \"_id\": \"56e741ff933e450c0fe2f707\",\n     \"title\": \"UV-Intensität\",\n     \"unit\": \"μW/cm²\",\n     \"sensorType\": \"VEML6070\",\n     \"icon\": \"osem-sprinkles\"\n   }\n ],\n \"loc\": {\n   \"lng\": 8.6956,\n   \"lat\": 50.0430\n },\n \"image\": \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAIVBMVEUAAABKrkMGteh0wW5Ixu931vKy3bO46fj/7hr/+J36/vyFw5EiAAAAAXRSTlMAQObYZgAAAF5JREFUeAFdjdECgzAIA1kIUvP/HzyhdrPe210L2GLYzhjj7VvRefmpn1MKFbdHUOzA9qRQEhIw3xMzEVeJDqkOrC9IJqWE7hFDLZ0Q6+zh7odsoU/j9qeDPXDf/cEX1xsDKIqAkK8AAAAASUVORK5CYII=\",\n \"mqtt\": {\n   \"url\": \"some url\",\n   \"topic\": \"some topic\",\n   \"messageFormat\": \"json\",\n   \"decodeOptions\": \"{\\\"jsonPath\\\":\\\"$.bla\\\"}\"\n }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.1",
    "group": "Boxes",
    "name": "updateBox",
    "filename": "./app.js",
    "groupTitle": "Boxes",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-APIKey",
            "description": "<p>the secret API key which corresponds to the <code>senseBoxId</code> parameter.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "x-APIKey header example:",
          "content": "x-APIKey: 576efef4cb9b9ebe057bf7b4",
          "type": "String"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "403",
            "description": "<p>the request has invalid or missing credentials.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\"code\":\"NotAuthorized\",\"message\":\"ApiKey is invalid or missing\"}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/users/:senseBoxId",
    "title": "Validate authorization",
    "group": "Boxes",
    "description": "<p>Validate authorization through API key and senseBoxId. Will return status code 403 if invalid, 200 if valid.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Response",
            "description": "<p>ApiKey is valid</p>"
          }
        ]
      }
    },
    "version": "0.0.1",
    "name": "validApiKey",
    "filename": "./app.js",
    "groupTitle": "Boxes",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-APIKey",
            "description": "<p>the secret API key which corresponds to the <code>senseBoxId</code> parameter.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "x-APIKey header example:",
          "content": "x-APIKey: 576efef4cb9b9ebe057bf7b4",
          "type": "String"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "403",
            "description": "<p>the request has invalid or missing credentials.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\"code\":\"NotAuthorized\",\"message\":\"ApiKey is invalid or missing\"}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":senseBoxId",
            "description": "<p>the ID of the senseBox you are referring to.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/boxes/:senseBoxId/data/:sensorId?from-date=fromDate&to-datetoDate&download=true&format=json",
    "title": "Get the 10000 latest measurements for a sensor",
    "description": "<p>Get up to 10000 measurements from a sensor for a specific time frame, parameters <code>from-date</code> and <code>to-date</code> are optional. If not set, the last 48 hours are used. The maximum time frame is 1 month. If <code>download=true</code> <code>Content-disposition</code> headers will be set. Allows for JSON or CSV format.</p>",
    "version": "0.0.1",
    "group": "Measurements",
    "name": "getData",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "from-date",
            "description": "<p>Beginning date of measurement data (default: 48 hours ago from now)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "to-date",
            "description": "<p>End date of measurement data (default: now)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"true\"",
              "\"false\""
            ],
            "optional": false,
            "field": "download",
            "description": "<p>If set, offer download to the user (default: false, always on if CSV is used)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"json\"",
              "\"csv\""
            ],
            "optional": false,
            "field": "format",
            "defaultValue": "json",
            "description": "<p>Can be 'json' (default) or 'csv' (default: json)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":senseBoxId",
            "description": "<p>the ID of the senseBox you are referring to.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":sensorId",
            "description": "<p>the ID of the sensor you are referring to.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "separator",
            "description": "<p>Only for csv: the separator for csv. Possible values: <code>comma</code> for comma as separator, everything else: semicolon. Per default a semicolon is used.</p>"
          }
        ]
      }
    },
    "filename": "./app.js",
    "groupTitle": "Measurements"
  },
  {
    "type": "get,post",
    "url": "/boxes/data?boxid=:senseBoxIds&from-date=:fromDate&to-date:toDate&phenomenon=:phenomenon",
    "title": "Get latest measurements for a phenomenon as CSV",
    "description": "<p>Download data of a given phenomenon from multiple selected senseBoxes as CSV</p>",
    "version": "0.1.0",
    "group": "Measurements",
    "name": "getDataMulti",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "senseBoxIds",
            "description": "<p>Comma separated list of senseBox IDs.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phenomenon",
            "description": "<p>the name of the phenomenon you want to download the data for.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "from-date",
            "description": "<p>Beginning date of measurement data (default: 15 days ago from now)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "to-date",
            "description": "<p>End date of measurement data (default: now)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "separator",
            "description": "<p>Only for csv: the separator for csv. Possible values: <code>comma</code> for comma as separator, everything else: semicolon. Per default a semicolon is used.</p>"
          }
        ]
      }
    },
    "filename": "./app.js",
    "groupTitle": "Measurements"
  },
  {
    "type": "get",
    "url": "/boxes/:senseBoxId/sensors",
    "title": "Get latest measurements of a senseBox",
    "description": "<p>Get the latest measurements of all sensors of the specified senseBox.</p>",
    "version": "0.0.1",
    "group": "Measurements",
    "name": "getMeasurements",
    "filename": "./app.js",
    "groupTitle": "Measurements",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":senseBoxId",
            "description": "<p>the ID of the senseBox you are referring to.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/boxes/:senseBoxId/:sensorId",
    "title": "Post new measurement",
    "description": "<p>Posts a new measurement to a specific sensor of a box.</p>",
    "version": "0.0.1",
    "group": "Measurements",
    "name": "postNewMeasurement",
    "parameter": {
      "fields": {
        "JSON request body": [
          {
            "group": "RequestBody",
            "type": "String",
            "optional": false,
            "field": "value",
            "description": "<p>the measured value of the sensor. Also accepts JSON float numbers.</p>"
          },
          {
            "group": "RequestBody",
            "type": "String",
            "optional": false,
            "field": "createdAt",
            "description": "<p>the timestamp of the measurement. Should be parseable by JavaScript.</p>"
          }
        ],
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":senseBoxId",
            "description": "<p>the ID of the senseBox you are referring to.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":sensorId",
            "description": "<p>the ID of the sensor you are referring to.</p>"
          }
        ]
      }
    },
    "filename": "./app.js",
    "groupTitle": "Measurements"
  },
  {
    "description": "<p>Post multiple new measurements as an JSON array to a box.</p>",
    "version": "0.1.0",
    "group": "Measurements",
    "name": "postNewMeasurements",
    "parameter": {
      "fields": {
        "JSON request body": [
          {
            "group": "RequestBody",
            "type": "Object[]",
            "optional": false,
            "field": "bla",
            "description": "<p>bla</p>"
          }
        ],
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":senseBoxId",
            "description": "<p>the ID of the senseBox you are referring to.</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "[{ \"sensor\": \"56cb7c25b66992a02fe389de\", \"value\": \"3\" },{ \"sensor\": \"56cb7c25b66992a02fe389df\", \"value\": \"2\" }]\ncurl -X POST -H 'Content-type:application/json' -d \"[{ \\\"sensor\\\": \\\"56cb7c25b66992a02fe389de\\\", \\\"value\\\": \\\"3\\\" },{ \\\"sensor\\\": \\\"56cb7c25b66992a02fe389df\\\", \\\"value\\\": \\\"2\\\" }]\" localhost:8000/boxes/56cb7c25b66992a02fe389d9/data"
      }
    ],
    "type": "",
    "url": "",
    "filename": "./app.js",
    "groupTitle": "Measurements"
  },
  {
    "type": "get",
    "url": "/stats",
    "title": "Get some statistics about the database",
    "description": "<p>8 boxes, 13 measurements in the database, 2 measurements in the last minute</p>",
    "name": "getStatistics",
    "group": "Misc",
    "version": "0.1.0",
    "success": {
      "examples": [
        {
          "title": "[8,13, 2]",
          "content": "[8,13, 2]",
          "type": "json"
        }
      ]
    },
    "filename": "./app.js",
    "groupTitle": "Misc"
  }
] });
