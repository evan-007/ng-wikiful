module Api
  module V1
    class UsersController < ApplicationController
      def index
        @articles = current_user.articles
        render json: @articles, status: 200
      end
    end
  end
end