class Student < ApplicationRecord
  belongs_to :course
  has_many :attendances, dependent: :destroy

  validates :attendance_codes,
            presence: true

  scope :by_attendance_code, ->(code) { where("attendance_codes @> ARRAY[?]::varchar[]", code) }

  def self.for_attendance_codes(codes)
    where('attendance_codes && ARRAY[?]::varchar[]', codes)
  end
end

# == Schema Information
#
# Table name: students
#
#  id               :bigint(8)        not null, primary key
#  course_id        :bigint(8)        not null
#  attendance_codes :string           default([]), is an Array
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#
# Indexes
#
#  index_students_on_course_id  (course_id)
#
# Foreign Keys
#
#  fk_rails_...  (course_id => courses.id)
#
