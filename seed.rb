require 'pry'
require 'active_record'
require './models/user'
require './models/weight'
require './config'

today = Date.today

user = User.find_by(name: 'dt')
user.weights.create(date_log: today-10, weight: 60)
user.weights.create(date_log: today-9, weight: 61)
user.weights.create(date_log: today-8, weight: 61.5)
user.weights.create(date_log: today-7, weight: 62)
user.weights.create(date_log: today-6, weight: 61.6)
user.weights.create(date_log: today-5, weight: 61.3)
user.weights.create(date_log: today-4, weight: 61)
user.weights.create(date_log: today-3, weight: 60.5)
user.weights.create(date_log: today-2, weight: 60.4)
user.weights.create(date_log: today-1, weight: 60.7)