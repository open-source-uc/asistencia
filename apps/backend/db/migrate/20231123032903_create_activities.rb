class CreateActivities < ActiveRecord::Migration[7.0]
  def change
    create_table :activities do |t|
      t.references :course, null: false, foreign_key: true
      t.string :name_ciphertext, null: false
      t.string :description_ciphertext, null: false
      t.date :date
      t.timestamps
    end
  end
end
