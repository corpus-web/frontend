import Mock from 'mockjs'
import news from './news.json'
Mock.mock("mock/news", 'post', { code: 200, data: news })