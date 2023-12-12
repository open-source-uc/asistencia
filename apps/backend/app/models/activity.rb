class Activity < ApplicationRecord
  belongs_to :course
  has_many :attendances, dependent: :destroy
  validates :slug, uniqueness: { scope: :course_id }

  def self.by_slug_or_id(slug_or_id)
    find_by(slug: slug_or_id) || find(slug_or_id)
  end

  has_encrypted :name, :description
end

# == Schema Information
#
# Table name: activities
#
#  id                     :bigint(8)        not null, primary key
#  course_id              :bigint(8)        not null
#  name_ciphertext        :string           not null
#  description_ciphertext :string
#  date                   :date
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  slug                   :string
#
# Indexes
#
#  index_activities_on_course_id           (course_id)
#  index_activities_on_course_id_and_slug  (course_id,slug) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (course_id => courses.id)
#
