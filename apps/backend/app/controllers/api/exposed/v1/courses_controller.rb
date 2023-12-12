class Api::Exposed::V1::CoursesController < Api::Exposed::V1::BaseController
  def index
    respond_with current_user.courses.uniq, each_serializer: Api::Exposed::V1::CourseSerializer
  end

  def show
    respond_with course
  end

  def create
    course = Course.create!(course_params)
    current_user.add_role :admin, course

    respond_with course
  end

  def update
    course.update!(course_params)
    respond_with course
  end

  def destroy
    respond_with course.destroy!
  end

  private

  def course
    @course ||= current_user.courses.friendly.find(params[:id])
  end

  def course_params
    params.require(:course).permit(
      :name,
      :enabled,
      :slug
    )
  end
end
