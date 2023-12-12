class ApplicationController < ActionController::Base
  include PowerTypes::Presentable
  protect_from_forgery unless: -> { request.format.json? }
  before_action :configure_permitted_parameters, if: :devise_controller?
  respond_to :json, :html

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(
      :sign_up,
      keys: [
        :email,
        :password,
        :password_confirmation
      ]
    )
  end
end
