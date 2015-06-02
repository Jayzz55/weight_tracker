require 'pry'
require 'active_record'
require './models/user'
require './models/weight'
require './config'

ActiveRecord::Base.logger = Logger.new(STDERR) # show sql in the terminal

binding.pry

puts '.'