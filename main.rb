require 'sinatra'
require 'sinatra/reloader'
require 'json'
require 'active_record'
require 'bcrypt'
require './models/user'
require './models/weight'
require './config'

enable :sessions
set :session_secret, 'This is a secret key'

after do
  ActiveRecord::Base.connection.close
end

# Sessions

post '/session' do
  @user = User.where(name: params[:name]).first
  if @user && @user.authenticate(params[:password])
    session[:user_id] = @user.id
    redirect to '/app'
  else
    erb :"index/index", :layout => :"index/index_layout"
  end
end

delete '/session' do
  session[:user_id] = nil
  redirect to '/'
end

helpers do
  def logged_in?
    !!current_user
  end

  def current_user
    User.find_by(id: session[:user_id])
  end
end


get '/' do
  erb :"index/index", :layout => :"index/index_layout"
  # erb :"app/app", :layout => :"app/app_layout"
end

get '/app' do
  redirect to '/' unless current_user
  @user = current_user
  erb :"app/app", :layout => :"app/app_layout"
end


# Create new user

post '/users' do
  @user = User.create(name: params[:name], height: params[:height], password: params[:password])
  session[:user_id] = @user.id
  
  redirect to '/app'
end

# User API route and controller

get '/api/users' do
  content_type :json
  current_user.to_json
end

put '/api/users/:id' do
  request_body = JSON.parse(request.body.read.to_s)
  user_params = request_body["user"]
  user = User.find(params[:id])
  user.update(height: user_params['height'], current_weight: user_params['current_weight'], goal_weight: user_params['goal_weight'], goal_start_date: user_params['goal_start_date'], goal_end_date: user_params['goal_end_date'])
  content_type :json
  user.to_json
end

# Expense API route and controller

get '/api/weights' do
  content_type :json
  current_user.weights.order(:date_log).all.limit(100).to_json
end

put '/api/weights/:id' do
  request_body = JSON.parse(request.body.read.to_s)
  weight_params = request_body["weight"]
  weight_weight = weight_params["weight"]

  # binding.pry
  weight = Weight.find(params[:id])
  weight.update(weight: weight_weight)
  content_type :json
  weight.to_json
end

post '/api/weights' do
  request_body = JSON.parse(request.body.read.to_s)
  weight_params = request_body["weight"]
  weight_weight = weight_params["weight"]
  weight_date = weight_params["date_log"]
  weight_user_id = weight_params["user_id"]

  weight = Weight.create(weight: weight_weight, date_log: Time.now, user_id: weight_user_id)
  content_type :json
  weight.to_json
end

delete '/api/weights/:id' do
  weight = Weight.find(params[:id])
  weight.delete
  content_type :json
  weight.to_json
end
