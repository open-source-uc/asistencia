class CreateStudents < ActiveRecord::Migration[7.0]
  def change
    create_table :students do |t|
      t.references :course, null: false, foreign_key: true
      t.string :attendance_codes, array: true, default: []
      t.timestamps
    end
  end
end
