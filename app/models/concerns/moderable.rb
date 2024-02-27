require 'net/http'
require 'json'



module Moderable
  require 'active_support/concern'

  extend ActiveSupport::Concern

  included do
    before_save :moderate_content
  end

  def moderate_content
    columns_to_moderate.each do |column|
      content = send(column)
      is_accepted = moderation_result(content)
      send("is_#{column}_accepted=", is_accepted)
    end
  end

  def moderation_result(content)
    moderation_api_url = URI.parse('https://moderation.logora.fr/predict')
    http = Net::HTTP.new(moderation_api_url.host, moderation_api_url.port)
    http.use_ssl = true

    request = Net::HTTP::Post.new(moderation_api_url.path, { 'Content-Type' => 'application/json' })
    request.body = { content: content }.to_json
    response = http.request(request)
    moderation_result = JSON.parse(response.body)
    moderation_result['is_accepted']
  end


  def columns_to_moderate
    [:title, :content]
  end
end
