require 'rails_helper'

RSpec.describe ModeratedModel, type: :model do
  describe 'moderate_content' do
    let(:moderated_model) { ModeratedModel.new(title: 'Positive Title', content: 'Positive content') }

    before do
      allow(moderated_model).to receive(:moderation_result).and_return(true)
      moderated_model.save
    end

    it 'moderates title and updates is_title_accepted column' do
      expect(moderated_model.is_title_accepted).to be_truthy
    end

    it 'moderates content and updates is_content_accepted column' do
      expect(moderated_model.is_content_accepted).to be_truthy
    end
  end
end
