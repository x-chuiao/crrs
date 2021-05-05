const Mock = require('mockjs')

const data = Mock.mock({
  'items|10': [{
    title: '@sentence(5, 12)',
    content: '@paragraph(3,7)',
    sendTime: '@datetime'
  }]
})

data.items.push({
  title: '测试',
  content: `尊敬的admin:
              您好!
              如果你对我们的服务还满意,请给与五星好评!
此致 crrs项目组`
})

module.exports = [
  {
    url: '/message/list',
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
