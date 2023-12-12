class Attendance < ApplicationRecord
  belongs_to :student
  belongs_to :activity
  belongs_to :user, optional: true

  delegate :slug, to: :activity, prefix: true
end

# == Schema Information
#
# Table name: attendances
#
#  id          :bigint(8)        not null, primary key
#  student_id  :bigint(8)        not null
#  activity_id :bigint(8)        not null
#  user_id     :bigint(8)
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
# Indexes
#
#  index_attendances_on_activity_id  (activity_id)
#  index_attendances_on_student_id   (student_id)
#  index_attendances_on_user_id      (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (activity_id => activities.id)
#  fk_rails_...  (student_id => students.id)
#  fk_rails_...  (user_id => users.id)
#
