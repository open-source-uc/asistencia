class Api::Exposed::BaseController < Api::BaseController
  skip_before_action :verify_authenticity_token
end
