class Api::Exposed::V1::StudentSerializer < ActiveModel::Serializer
  type :student

  attributes(
    :id,
    :course_id,
    :attendance_codes,
    :created_at,
    :updated_at
  )
end
