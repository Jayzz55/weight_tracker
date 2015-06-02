ActiveRecord::Base.establish_connection(
  :adapter => 'postgresql',
  :database => 'weight_tracker'
)

local_db = {
  :adapter => 'postgresql',
  :database => 'weight_tracker'
}

ActiveRecord::Base.establish_connection(ENV['DATABASE_URL'] || local_db)
ActiveRecord::Base.logger = Logger.new(STDERR) #show sql in the terminal