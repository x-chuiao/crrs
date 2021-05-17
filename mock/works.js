const Mock = require('mockjs')
const pics = [
  'https://wpimg.wallstcn.com/9679ffb0-9e0b-4451-9916-e21992218054.jpg',
  'https://wpimg.wallstcn.com/bcce3734-0837-4b9f-9261-351ef384f75a.jpg',
  'https://wpimg.wallstcn.com/d1d7b033-d75e-4cd6-ae39-fcd5f1c0a7c5.jpg',
  'https://wpimg.wallstcn.com/50530061-851b-4ca5-9dc5-2fead928a939.jpg'
]
const data = Mock.mock({
  'items|10': [{
    title: '@sentence(5, 12)',
    mainFile: '@word',
    supplyFile: 'word',
    description: '@paragraph(1)',
    'author|1-5': [{ authorName: '@last' }],
    time: '@datetime',
    update: 'Posted 4 photos - 2 days ago',
    pics
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
