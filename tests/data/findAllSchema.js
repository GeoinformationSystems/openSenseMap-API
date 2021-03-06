module.exports = {
  '$schema': 'http://json-schema.org/draft-04/schema#',
  'type': 'array',
  'items': {
    'type': 'object',
    'properties': {
      '_id': {
        'type': 'string'
      },
      'createdAt': {
        'type': 'string'
      },
      'updatedAt': {
        'type': 'string'
      },
      'name': {
        'type': 'string'
      },
      'boxType': {
        'type': 'string'
      },
      'exposure': {
        'type': 'string'
      },
      'model': {
        'type': 'string'
      },
      'sensors': {
        'type': 'array',
        'items': {
          'type': 'object',
          'properties': {
            'title': {
              'type': 'string'
            },
            'unit': {
              'type': 'string'
            },
            'sensorType': {
              'type': 'string'
            },
            'icon': {
              'type': 'string'
            },
            '_id': {
              'type': 'string'
            },
            'lastMeasurement': {
              'type': 'object',
              'properties': {
                'value': {
                  'type': 'string'
                },
                'createdAt': {
                  'type': 'string'
                }
              },
              'required': [
                'value',
                'createdAt'
              ]
            }
          },
          'required': [
            'title',
            'unit',
            'sensorType',
            'icon',
            '_id',
            'lastMeasurement'
          ]
        }
      },
      'loc': {
        'type': 'array',
        'items': {
          'type': 'object',
          'properties': {
            'geometry': {
              'type': 'object',
              'properties': {
                'coordinates': {
                  'type': 'array',
                  'items': {
                    'type': 'number'
                  }
                },
                'type': {
                  'type': 'string'
                }
              },
              'required': [
                'coordinates',
                'type'
              ]
            },
            'type': {
              'type': 'string'
            }
          },
          'required': [
            'geometry',
            'type'
          ]
        }
      }
    },
    'required': [
      '_id',
      'createdAt',
      'updatedAt',
      'name',
      'boxType',
      'exposure',
      'model',
      'sensors',
      'loc'
    ]
  }
};
