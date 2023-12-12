class Api::Exposed::V1::AttendanceSerializer < ActiveModel::Serializer
  type :attendance

  belongs_to :student
  belongs_to :activity
  belongs_to :user

  attributes(
    :id,
    :created_at,
    :updated_at
  )
end
