class Api::Exposed::V1::SpreadsheetsController < Api::Exposed::V1::BaseController
  def index
    respond_with activities_for_students
  end

  private

  def course
    @course ||= current_user.courses.friendly.find(params[:course_id])
  end

  def activities
    @activities ||= course.activities.where(slug: params[:activity_slugs]).uniq.compact
  end

  def students
    @students ||= course.students.for_attendance_codes(params[:student_codes]).uniq.compact
  end

  def attendances_for_student(student)
    Attendance.includes([:activity]).where(
      student: student,
      activity: activities
    ).uniq.compact
  end

  def activities_for_students
    students.map do |student|
      code_to_check = params[:student_codes].find do |code|
        student.attendance_codes.include?(code)
      end

      {
        code_to_check => attendances_for_student(student).map(&:activity_slug).uniq
      }
    end.reduce({}, :merge)
  end

  def user
    @user ||= current_user
  end

  def spreadsheet_params
    params.permit(
      student_codes: [],
      activity_slugs: []
    )
  end
end
