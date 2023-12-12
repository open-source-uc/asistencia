class AddActivityCourseIdSlugUniquenessValidation < ActiveRecord::Migration[7.0]
  disable_ddl_transaction!

  def change
    add_index :activities, [:course_id, :slug], unique: true, algorithm: :concurrently
  end
end
