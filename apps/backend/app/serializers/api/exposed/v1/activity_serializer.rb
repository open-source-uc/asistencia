class Api::Exposed::V1::ActivitySerializer < ActiveModel::Serializer
  type :activity

  attributes(
    :id,
    :course_id,
    :name,
    :description,
    :date,
    :created_at,
    :updated_at,
    :slug
  )
end
