class User < ActiveRecord::Base
  validates :name, uniqueness: true
  has_many :weights, dependent: :destroy
  has_secure_password
end