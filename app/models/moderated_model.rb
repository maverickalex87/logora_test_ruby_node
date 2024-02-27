require_relative 'moderable'

class ModeratedModel < ApplicationRecord
  include Moderable
  attribute :title, :string
  attribute :content, :text
end
