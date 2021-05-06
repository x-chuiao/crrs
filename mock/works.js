const Mock = require('mockjs')

const data = Mock.mock({
  'items|10': [{
    'title': '@sentence(5, 12)',
    'mainFile': '@word',
    'supplyFile': 'word',
    'description': '@paragraph(1)',
    'author': '@last'
  }]
})

module.exports = [
  {
    url: '/works/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: items
      }
    }
  }
]
