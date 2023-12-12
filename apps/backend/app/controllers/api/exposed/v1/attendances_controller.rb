class Api::Exposed::V1::AttendancesController < Api::Exposed::V1::BaseController
  def index
    respond_with course.attendances
  end

  def show
    respond_with attendance
  end

  def create
    respond_with activity.attendances.create!(
      student: student,
      activity: activity,
      user: user
    )
  end

  def update
    attendance.update!(attendance_params)
    respond_with attendance
  end

  def destroy
    respond_with attendance.destroy!
  end

  private

  def course
    @course ||= current_user.courses.friendly.find(params[:course_id])
  end

  def activity
    @activity ||= course.activities.by_slug_or_id(attendance_params[:activity_slug])
  end

  def user
    @user ||= current_user
  end

  def student
    @student ||= Student.by_attendance_code(attendance_params[:student_code]).first
  end

  def attendance
    @attendance ||= course.attendances.find_by(params[:id])
  end

  def attendance_params
    params.require(:attendance).permit(
      :student_code,
      :activity_slug
    )
  end
end
