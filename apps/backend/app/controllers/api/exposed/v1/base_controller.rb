class Api::Exposed::V1::BaseController < Api::Exposed::BaseController
  acts_as_token_authentication_handler_for User, fallback: :exception

  before_action do
    self.namespace_for_serializer = ::Api::Exposed::V1
  end
end
