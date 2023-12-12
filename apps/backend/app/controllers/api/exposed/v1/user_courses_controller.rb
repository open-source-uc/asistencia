class Api::Exposed::V1::UserCoursesController < Api::Exposed::V1::BaseController
  def index
    respond_with course.users
  end

  def me
    respond_with current_user.courses_with_roles
  end

  def create
    respond_with new_user.add_role(user_course_params[:role], course)
  end

  def batch_create
    new_users.map do |user|
      user.add_role(user_course_params[:role], course)
    end

    respond_with course.reload.users
  end

  def destroy
    respond_with new_user.remove_role(user_course_params[:role], course)
  end

  private

  def new_user
    @new_user ||= User.find_or_create_by(email: user_course_params[:email])
  end

  def new_users
    @new_users ||= user_course_params[:emails].map do |email|
      User.find_or_create_by(email: email)
    end
  end

  def course
    @course ||= current_user.courses.friendly.find(params[:course_id])
  end

  def user_course_params
    params.require(:user_course).permit(
      :email,
      :role,
      emails: []
    )
  end
end
