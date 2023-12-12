class User < ApplicationRecord
  has_many :attendances, dependent: :nullify
  rolify
  acts_as_token_authenticatable
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :invitable, :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :invitable

  def courses_with_roles
    CourseRoles.all.map { |role| { role => Course.with_role(role, self) } }.reduce({}, :merge)
  end

  def courses
    Course.with_role(CourseRoles.with_read_access, self)
  end

  def self.find_or_invite_by(email:)
    find_by(email: email) ||
    create!(
      email: email,
      password: "#{email.split('@').first}.#{Time.zone.now.year}"
    )
  end

  def self.find_or_create_by(email:)
    find_by(email: email) ||
      create!(
        email: email,
        password: "#{email.split('@').first}.#{Time.zone.now.year}"
      )
  end
end

# == Schema Information
#
# Table name: users
#
#  id                     :bigint(8)        not null, primary key
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  authentication_token   :string(30)
#  invitation_token       :string
#  invitation_created_at  :datetime
#  invitation_sent_at     :datetime
#  invitation_accepted_at :datetime
#  invitation_limit       :integer
#  invited_by_type        :string
#  invited_by_id          :bigint(8)
#  invitations_count      :integer          default(0)
#
# Indexes
#
#  index_users_on_authentication_token  (authentication_token) UNIQUE
#  index_users_on_email                 (email) UNIQUE
#  index_users_on_invitation_token      (invitation_token) UNIQUE
#  index_users_on_invited_by            (invited_by_type,invited_by_id)
#  index_users_on_invited_by_id         (invited_by_id)
#  index_users_on_reset_password_token  (reset_password_token) UNIQUE
#
